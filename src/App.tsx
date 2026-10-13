import React, { useState, useEffect, useRef } from 'react'
import { Play, Square, RotateCcw, Activity, Droplets, Zap } from 'lucide-react'
import { WorkbenchScene } from './components/WorkbenchScene'
import { RelayContactViewer } from './components/RelayContactViewer'
import { RelayLab } from './components/RelayLab'
import type { SimulationState } from './types'

// Calibration constant for software simulation: 450 pulses per Litre (0.45 pulses/mL)
const CALIBRATION_PULSES_PER_LITRE = 450

export function App() {
  // Navigation: Exactly two primary tabs
  const [activeTab, setActiveTab] = useState<'water-pump' | 'relay-lab'>('water-pump')

  // State 1: Water Pump Simulation State
  const [pumpSimState, setPumpSimState] = useState<SimulationState>({
    isRunning: false,
    targetMl: 500,
    deliveredMl: 0,
    pulseCount: 0,
    relayEnergized: false,
    pumpRunning: false,
    flowRateLpm: 1.5,
    statusMessage: 'IDLE — Ready to start simulation',
    statusType: 'idle'
  })

  // State 2: Standalone Relay Lab State (Independent from water pump simulation)
  const [relayLabEnergized, setRelayLabEnergized] = useState<boolean>(false)

  // Timer reference for the active water pump simulation loop
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // Start water pump simulation handler
  const handleStartPump = () => {
    if (pumpSimState.isRunning) return

    // If already at or above target, start fresh run
    const startingDelivered = pumpSimState.deliveredMl >= pumpSimState.targetMl ? 0 : pumpSimState.deliveredMl
    const startingPulses = pumpSimState.deliveredMl >= pumpSimState.targetMl ? 0 : pumpSimState.pulseCount

    setPumpSimState((prev) => ({
      ...prev,
      isRunning: true,
      deliveredMl: startingDelivered,
      pulseCount: startingPulses,
      relayEnergized: true,
      pumpRunning: true,
      statusMessage: `PUMP RUNNING — Dispensing towards ${prev.targetMl} mL`,
      statusType: 'running'
    }))

    if (timerRef.current) clearInterval(timerRef.current)

    const intervalMs = 50 // 20 updates per second for smooth, realistic flow

    timerRef.current = setInterval(() => {
      setPumpSimState((prev) => {
        if (!prev.isRunning) return prev

        // Flow rate: 1.5 L/min = 1500 mL/min = 25 mL/sec
        // In 50ms (0.05s), delta volume = 25 * 0.05 = 1.25 mL
        const deltaMl = (prev.flowRateLpm * 1000 / 60) * (intervalMs / 1000)
        const nextDelivered = prev.deliveredMl + deltaMl

        // Calibrated pulse accumulation based on formula:
        // pulses = (volume in litres) * CALIBRATION_PULSES_PER_LITRE
        const deltaPulses = deltaMl * (CALIBRATION_PULSES_PER_LITRE / 1000)
        const nextPulses = prev.pulseCount + deltaPulses

        // Automatic threshold trip logic (based strictly on accumulated pulses / volume)
        if (nextDelivered >= prev.targetMl) {
          if (timerRef.current) {
            clearInterval(timerRef.current)
            timerRef.current = null
          }

          const finalPulses = Math.round((prev.targetMl / 1000) * CALIBRATION_PULSES_PER_LITRE)

          return {
            ...prev,
            isRunning: false,
            deliveredMl: prev.targetMl,
            pulseCount: finalPulses,
            relayEnergized: false,
            pumpRunning: false,
            statusMessage: 'TARGET REACHED — PUMP STOPPED',
            statusType: 'completed'
          }
        }

        return {
          ...prev,
          deliveredMl: nextDelivered,
          pulseCount: nextPulses
        }
      })
    }, intervalMs)
  }

  // Stop water pump simulation handler
  const handleStopPump = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    setPumpSimState((prev) => ({
      ...prev,
      isRunning: false,
      relayEnergized: false,
      pumpRunning: false,
      statusMessage: 'PAUSED — Pumping stopped by user',
      statusType: 'stopped'
    }))
  }

  // Reset water pump simulation handler
  const handleResetPump = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    setPumpSimState((prev) => ({
      ...prev,
      isRunning: false,
      deliveredMl: 0,
      pulseCount: 0,
      relayEnergized: false,
      pumpRunning: false,
      statusMessage: 'IDLE — Ready to start simulation',
      statusType: 'idle'
    }))
  }

  // Change target volume handler
  const handleSelectTarget = (target: number) => {
    if (pumpSimState.isRunning) return

    setPumpSimState((prev) => ({
      ...prev,
      targetMl: target,
      deliveredMl: 0,
      pulseCount: 0,
      statusMessage: `TARGET SET TO ${target} mL — Press START to begin`,
      statusType: 'idle'
    }))
  }

  return (
    <div className="min-h-screen bg-[#0d121a] text-slate-100 flex flex-col font-sans p-2 sm:p-3 md:p-4 justify-between">
      {/* ================= COMPACT HEADER WITH DYNAMIC ACTIVE TITLE ================= */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between pb-2.5 mb-2.5 border-b border-[#212d3d] gap-2.5 shrink-0">
        <div className="flex flex-wrap items-center gap-3 md:gap-5">
          <div className="shrink-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              {activeTab === 'water-pump'
                ? 'Automatic Water Pump Simulation'
                : 'Relay Lab — Relay Switching Simulation'}
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {activeTab === 'water-pump'
                ? 'Arduino Uno · Flow Sensor · Relay Control'
                : 'Topic 18 — Automatic Motor Switching Using a Relay'}
            </p>
          </div>

          {/* Primary 2-Tab Navigation Bar */}
          <nav className="flex items-center bg-[#131924] p-1 rounded-xl border border-[#232f42] shrink-0">
            <button
              onClick={() => setActiveTab('water-pump')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === 'water-pump'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              Water Pump Simulation
            </button>

            <button
              onClick={() => setActiveTab('relay-lab')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                activeTab === 'relay-lab'
                  ? 'bg-amber-600 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Relay Lab
            </button>
          </nav>
        </div>

        {/* Live Status Pill */}
        <div
          className={`self-start lg:self-auto px-3 py-1.5 rounded-lg border font-mono text-xs font-bold flex items-center gap-2 transition-colors shrink-0 ${
            activeTab === 'relay-lab'
              ? relayLabEnergized
                ? 'bg-amber-950/60 border-amber-500/60 text-amber-300'
                : 'bg-[#151c27] border-[#253245] text-slate-300'
              : pumpSimState.statusType === 'running'
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                : pumpSimState.statusType === 'completed'
                  ? 'bg-amber-950/60 border-amber-500/60 text-amber-300'
                  : pumpSimState.statusType === 'stopped'
                    ? 'bg-red-950/50 border-red-500/40 text-red-300'
                    : 'bg-[#151c27] border-[#253245] text-slate-300'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              activeTab === 'relay-lab'
                ? relayLabEnergized
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-slate-500'
                : pumpSimState.isRunning
                  ? 'bg-emerald-400 animate-ping'
                  : pumpSimState.statusType === 'completed'
                    ? 'bg-amber-400'
                    : 'bg-slate-500'
            }`}
          />
          {activeTab === 'relay-lab'
            ? relayLabEnergized
              ? 'RELAY LAB: COIL ENERGIZED (COM ➔ NO)'
              : 'RELAY LAB: COIL IDLE (COM ➔ NC)'
            : pumpSimState.statusMessage}
        </div>
      </header>

      {/* ================= TAB 1: WATER PUMP SIMULATION ================= */}
      {activeTab === 'water-pump' && (
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 items-stretch mb-2">
          {/* Central Workbench Scene Canvas */}
          <div className="lg:col-span-9 flex flex-col justify-between">
            <WorkbenchScene
              isRunning={pumpSimState.isRunning}
              pumpRunning={pumpSimState.pumpRunning}
              relayEnergized={pumpSimState.relayEnergized}
              deliveredMl={pumpSimState.deliveredMl}
              targetMl={pumpSimState.targetMl}
              flowRateLpm={pumpSimState.flowRateLpm}
              pulseCount={Math.round(pumpSimState.pulseCount)}
            />

            {/* Quick Path Legend bar directly beneath workbench */}
            <div className="mt-2 px-3 py-1.5 bg-[#121822] rounded-lg border border-[#1f2937] text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 bg-[#38bdf8] rounded" />
                  <span className="text-slate-300">Hydraulic Path:</span> Water Source ➔ Pump ➔ Sensor ➔ Container
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 bg-[#ef4444] rounded" />
                  <span className="text-slate-300">Switched Power:</span> Pump Power Supply ➔ Relay Module ➔ Pump
                </span>
              </div>
              <div className="text-slate-400">
                Calibration: ~450 pulses/L (simulation setting)
              </div>
            </div>
          </div>

          {/* Small Convenient Controls & Telemetry Panel (Independently scrollable to easily fit any viewport) */}
          <div className="lg:col-span-3 flex flex-col gap-2.5 justify-start max-h-[580px] lg:max-h-[620px] overflow-y-auto pr-0.5">
            {/* Target Selection & Action Buttons Panel */}
            <div className="bg-[#131922] border border-[#222e3f] rounded-xl p-3 sm:p-3.5 shadow-lg shrink-0">
              <div className="text-xs font-mono font-bold text-slate-300 uppercase mb-2">
                Water Quantity Target
              </div>

              {/* Target Selectors */}
              <div className="grid grid-cols-2 gap-1.5 mb-3">
                {[250, 500, 750, 1000].map((vol) => (
                  <button
                    key={vol}
                    onClick={() => handleSelectTarget(vol)}
                    disabled={pumpSimState.isRunning}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold transition-all border ${
                      pumpSimState.targetMl === vol
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-[#18212e] text-slate-300 border-[#2a374a] hover:bg-[#202b3c] disabled:opacity-50'
                    }`}
                  >
                    {vol} mL
                  </button>
                ))}
              </div>

              {/* Simulation Action Buttons */}
              <div className="space-y-1.5">
                <button
                  onClick={handleStartPump}
                  disabled={pumpSimState.isRunning}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                    pumpSimState.isRunning
                      ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  START PUMP
                </button>

                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={handleStopPump}
                    disabled={!pumpSimState.isRunning}
                    className={`py-1.5 px-2.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 border transition-all ${
                      !pumpSimState.isRunning
                        ? 'bg-[#18212e] text-slate-600 border-[#222e3f] cursor-not-allowed'
                        : 'bg-red-900/40 hover:bg-red-800/60 text-red-200 border-red-500/50'
                    }`}
                  >
                    <Square className="w-3.5 h-3.5" />
                    STOP
                  </button>

                  <button
                    onClick={handleResetPump}
                    className="py-1.5 px-2.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1.5 bg-[#18212e] hover:bg-[#202b3c] text-slate-300 border border-[#2a374a] transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    RESET
                  </button>
                </div>
              </div>

              {/* Flow Rate Slider (Demonstrate operating conditions) */}
              <div className="mt-3 pt-2.5 border-t border-[#202c3d]">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span>Flow Rate:</span>
                  <span className="text-cyan-400 font-bold">{pumpSimState.flowRateLpm.toFixed(1)} L/min</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="2.5"
                  step="0.1"
                  value={pumpSimState.flowRateLpm}
                  onChange={(e) =>
                    setPumpSimState((prev) => ({ ...prev, flowRateLpm: Number(e.target.value) }))
                  }
                  className="w-full accent-cyan-400 h-1.5 bg-[#1f2937] rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Real-Time Numeric Indicators */}
            <div className="bg-[#131922] border border-[#222e3f] rounded-xl p-3 shadow-lg shrink-0">
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-cyan-400" />
                Live Telemetry Readout
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="bg-[#0e131b] p-2 rounded border border-[#1b2533]">
                  <div className="text-[10px] text-slate-400 uppercase">Target</div>
                  <div className="text-sm font-bold text-white">{pumpSimState.targetMl} mL</div>
                </div>

                <div className="bg-[#0e131b] p-2 rounded border border-[#1b2533]">
                  <div className="text-[10px] text-cyan-400 uppercase">Delivered</div>
                  <div className="text-sm font-bold text-cyan-300">{Math.round(pumpSimState.deliveredMl)} mL</div>
                </div>

                <div className="bg-[#0e131b] p-2 rounded border border-[#1b2533]">
                  <div className="text-[10px] text-amber-400 uppercase">Pulses</div>
                  <div className="text-sm font-bold text-amber-300">{Math.round(pumpSimState.pulseCount)}</div>
                </div>

                <div className="bg-[#0e131b] p-2 rounded border border-[#1b2533]">
                  <div className="text-[10px] text-slate-400 uppercase">Relay State</div>
                  <div
                    className={`text-sm font-bold ${
                      pumpSimState.relayEnergized ? 'text-emerald-400' : 'text-slate-400'
                    }`}
                  >
                    {pumpSimState.relayEnergized ? 'ON (NO)' : 'OFF (NC)'}
                  </div>
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-[#1b2533] flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Pump Actuator:</span>
                <span
                  className={`font-bold ${
                    pumpSimState.pumpRunning ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                >
                  {pumpSimState.pumpRunning ? 'RUNNING' : 'STOPPED'}
                </span>
              </div>
            </div>

            {/* Relay Internal Contact Mechanism State Viewer */}
            <div className="shrink-0">
              <RelayContactViewer energized={pumpSimState.relayEnergized} />
            </div>
          </div>
        </main>
      )}

      {/* ================= TAB 2: STANDALONE RELAY LAB ================= */}
      {activeTab === 'relay-lab' && (
        <RelayLab
          relayEnergized={relayLabEnergized}
          onToggleEnergize={setRelayLabEnergized}
        />
      )}

      {/* ================= COMPACT FOOTER NOTE ================= */}
      <footer className="text-center text-[11px] font-mono text-slate-400 pt-1.5 border-t border-[#1c2635] shrink-0">
        Interactive software simulation — does not control the physical hardware.
      </footer>
    </div>
  )
}

export default App
