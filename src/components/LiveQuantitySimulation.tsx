import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Square, RotateCcw, CheckCircle2, Terminal, Gauge } from 'lucide-react'
import type { SimulationLog } from '../types'

export const LiveQuantitySimulation: React.FC = () => {
  // Preset target volume in Litres
  const [targetVolume, setTargetVolume] = useState<number>(1.0)
  const [customInput, setCustomInput] = useState<string>('1.0')
  const [isCustom, setIsCustom] = useState<boolean>(false)

  // Simulation operational state
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [deliveredVolume, setDeliveredVolume] = useState<number>(0.0)
  const [flowRateSpeed, setFlowRateSpeed] = useState<number>(1.5) // L/min
  const [pulseCount, setPulseCount] = useState<number>(0)
  const [limitReached, setLimitReached] = useState<boolean>(false)

  // System Logs
  const [logs, setLogs] = useState<SimulationLog[]>([
    {
      id: 'init-1',
      timestamp: '00:00:00',
      message: 'System initialized. Waiting for operator start trigger.',
      type: 'info'
    }
  ])

  const logContainerRef = useRef<HTMLDivElement>(null)

  const addLog = (message: string, type: 'info' | 'success' | 'warn' | 'action' = 'info') => {
    const now = new Date()
    const ts = now.toTimeString().split(' ')[0]
    setLogs((prev) => [
      ...prev.slice(-25), // keep last 25 entries
      { id: Math.random().toString(36).substring(7), timestamp: ts, message, type }
    ])
  }

  // Auto-scroll logs to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs])

  // Simulation interval loop
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null

    if (isRunning) {
      const intervalMs = 100 // 10 updates per second
      timer = setInterval(() => {
        setDeliveredVolume((prev) => {
          // flow rate L/min converted to L per interval
          const deltaL = (flowRateSpeed / 60) * (intervalMs / 1000)
          const nextVal = prev + deltaL

          // Pulses: ~450 pulses per Litre
          setPulseCount((p) => p + Math.round(deltaL * 450))

          if (nextVal >= targetVolume) {
            // Target Limit reached!
            setIsRunning(false)
            setLimitReached(true)
            addLog(`PRESET LIMIT REACHED (${targetVolume.toFixed(2)} L)!`, 'warn')
            addLog('Arduino changed relay control pin (Pin 8 ➔ LOW)', 'action')
            addLog('Electromechanical Relay switched OFF (COM ➔ NC)', 'action')
            addLog('DC Water Pump power isolated. Fluid flow stopped.', 'success')
            return targetVolume
          }

          return nextVal
        })
      }, intervalMs)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isRunning, targetVolume, flowRateSpeed])

  const handleStart = () => {
    if (deliveredVolume >= targetVolume) {
      // Auto reset if already completed
      setDeliveredVolume(0)
      setPulseCount(0)
      setLimitReached(false)
    }
    setIsRunning(true)
    setLimitReached(false)
    addLog(`Operator clicked START. Arduino sets Pin 8 ➔ HIGH`, 'action')
    addLog(`Relay energized (COM ➔ NO). DC Pump turned ON`, 'action')
    addLog(`Water flowing at ~${flowRateSpeed.toFixed(1)} L/min. Hall pulses incrementing`, 'info')
  }

  const handleStop = () => {
    setIsRunning(false)
    addLog('Manual emergency stop triggered. Pump stopped.', 'warn')
  }

  const handleReset = () => {
    setIsRunning(false)
    setDeliveredVolume(0)
    setPulseCount(0)
    setLimitReached(false)
    addLog('System counters reset to zero.', 'info')
  }

  const handlePresetSelect = (vol: number) => {
    setIsCustom(false)
    setTargetVolume(vol)
    if (!isRunning) {
      setDeliveredVolume(0)
      setPulseCount(0)
      setLimitReached(false)
    }
    addLog(`Target volume set to ${vol.toFixed(2)} L`, 'info')
  }

  const handleCustomApply = () => {
    const val = parseFloat(customInput)
    if (!isNaN(val) && val > 0 && val <= 10) {
      setTargetVolume(val)
      setIsCustom(true)
      if (!isRunning) {
        setDeliveredVolume(0)
        setPulseCount(0)
        setLimitReached(false)
      }
      addLog(`Custom target volume set to ${val.toFixed(2)} L`, 'info')
    }
  }

  const remaining = Math.max(0, targetVolume - deliveredVolume)
  const progressPercent = Math.min(100, (deliveredVolume / targetVolume) * 100)

  return (
    <section id="section-live-simulation" className="py-20 px-4 max-w-7xl mx-auto border-b border-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            SECTION 08 • SHOWCASE LIVE SIMULATOR
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Live Automatic Pump Control Simulation
          </h2>
          <p className="text-slate-400 mt-2 max-w-2xl text-base">
            Set target water volume and start the pump. Observe real-time pulse accumulation and automatic relay shutdown upon reaching threshold.
          </p>
        </div>

        {/* Live System Status Pill */}
        <div className={`px-4 py-2 rounded-xl border flex items-center gap-3 ${
          isRunning
            ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300'
            : limitReached
              ? 'bg-cyan-950/60 border-cyan-500/60 text-cyan-300'
              : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}>
          <span className={`w-3 h-3 rounded-full ${isRunning ? 'bg-emerald-400 animate-pulse' : limitReached ? 'bg-cyan-400' : 'bg-slate-600'}`} />
          <span className="font-mono text-xs font-bold">
            {isRunning ? 'PUMP ACTIVE • WATER DISPENSING' : limitReached ? 'TARGET REACHED • RELAY OFF' : 'STANDBY IDLE'}
          </span>
        </div>
      </div>

      {/* Target Volume Selection Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase text-slate-400 mr-2 font-bold">PRESET QUANTITY:</span>
          {[0.5, 1.0, 2.0].map((vol) => (
            <button
              key={vol}
              onClick={() => handlePresetSelect(vol)}
              disabled={isRunning}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                !isCustom && targetVolume === vol
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
              } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {vol.toFixed(1)} L
            </button>
          ))}

          <div className="flex items-center gap-1.5 ml-2">
            <input
              type="number"
              step="0.1"
              min="0.1"
              max="10"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              disabled={isRunning}
              className="w-20 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white text-center focus:outline-none focus:border-cyan-400"
              placeholder="Custom"
            />
            <button
              onClick={handleCustomApply}
              disabled={isRunning}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border ${
                isCustom
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              SET
            </button>
          </div>
        </div>

        {/* Flow Speed Slider */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase text-slate-400 font-bold">FLOW RATE:</span>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={flowRateSpeed}
            onChange={(e) => setFlowRateSpeed(Number(e.target.value))}
            className="w-32 accent-cyan-400 cursor-pointer"
          />
          <span className="font-mono text-xs font-bold text-cyan-300 w-16">
            {flowRateSpeed.toFixed(1)} L/min
          </span>
        </div>
      </div>

      {/* Main Simulation Viewport & Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Left: Graphic Rig (Pump, Tubing, Flow Sensor & Graduated Cylinder) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between backdrop-blur tech-grid shadow-2xl">
          {/* Automatic Shutoff Success Banner */}
          <AnimatePresence>
            {limitReached && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-4 rounded-xl bg-emerald-950/80 border-2 border-emerald-400/80 text-emerald-200 flex items-center justify-between shadow-2xl shadow-emerald-500/20"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-mono font-bold text-sm text-emerald-300">
                      ✓ PREDEFINED LIMIT REACHED ({targetVolume.toFixed(2)} L)
                    </div>
                    <div className="text-xs text-emerald-400/80 font-mono">
                      ✓ ARDUINO RELAY OUTPUT ➔ LOW • ✓ CONTACTS TRIPPED (NC) • ✓ PUMP SAFELY STOPPED
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleStart}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono text-xs"
                >
                  RUN AGAIN
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SVG Animated Rig */}
          <div className="relative w-full aspect-[16/9] max-h-[420px] flex items-center justify-center">
            <svg viewBox="0 0 800 420" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="cylinderWater" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#0369a1" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>

              {/* Lab Bench Surface */}
              <rect x="20" y="370" width="760" height="20" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />

              {/* RESERVOIR TANK (LEFT) */}
              <rect x="50" y="160" width="130" height="210" rx="10" fill="#0b1736" stroke="#0284c7" strokeWidth="2.5" />
              {/* Water level in reservoir */}
              <rect x="55" y="200" width="120" height="165" rx="6" fill="#0284c7" fillOpacity="0.4" />
              <text x="75" y="190" fill="#93c5fd" fontSize="12" fontFamily="monospace" fontWeight="bold">SOURCE TANK</text>

              {/* DC WATER PUMP (SUBMERSIBLE INSIDE / MOUNTED) */}
              <g>
                <rect
                  x="80"
                  y="280"
                  width="70"
                  height="80"
                  rx="8"
                  fill={isRunning ? '#064e3b' : '#0f172a'}
                  stroke={isRunning ? '#10b981' : '#334155'}
                  strokeWidth="2.5"
                />
                <circle cx="115" cy="320" r="18" fill="#022c22" stroke={isRunning ? '#34d399' : '#475569'} strokeWidth="2" />
                {/* Impeller */}
                <motion.g
                  animate={{ rotate: isRunning ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }}
                  style={{ originX: '115px', originY: '320px' }}
                >
                  <line x1="115" y1="306" x2="115" y2="334" stroke={isRunning ? '#6ee7b7' : '#64748b'} strokeWidth="3" />
                  <line x1="101" y1="320" x2="129" y2="320" stroke={isRunning ? '#6ee7b7' : '#64748b'} strokeWidth="3" />
                </motion.g>
                <text x="82" y="350" fill={isRunning ? '#6ee7b7' : '#64748b'} fontSize="9" fontFamily="monospace" fontWeight="bold">
                  DC PUMP
                </text>
              </g>

              {/* CLEAR TUBING CONNECTING PUMP TO SENSOR TO MEASURING FLASK */}
              <path
                d="M 115 280 L 115 110 L 320 110 L 460 110 L 610 110 L 610 170"
                fill="none"
                stroke="#1e293b"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <path
                d="M 115 280 L 115 110 L 320 110 L 460 110 L 610 110 L 610 170"
                fill="none"
                stroke={isRunning ? '#38bdf8' : '#0f172a'}
                strokeWidth="8"
                strokeDasharray={isRunning ? '8,6' : 'none'}
                className={isRunning ? 'animate-flow-dash' : undefined}
              />

              {/* WATER FLOW SENSOR UNIT (CENTER INLINE) */}
              <g>
                <rect
                  x="330"
                  y="75"
                  width="110"
                  height="70"
                  rx="10"
                  fill="#0c4a6e"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />
                <circle cx="385" cy="110" r="22" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                {/* Rotating turbine blades */}
                <motion.g
                  animate={{ rotate: isRunning ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
                  style={{ originX: '385px', originY: '110px' }}
                >
                  <line x1="385" y1="92" x2="385" y2="128" stroke="#7dd3fc" strokeWidth="3" />
                  <line x1="367" y1="110" x2="403" y2="110" stroke="#7dd3fc" strokeWidth="3" />
                </motion.g>
                <text x="345" y="65" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  FLOW SENSOR
                </text>
                {/* Pulse signal wire dropping down */}
                <path d="M 385 145 L 385 240 L 320 240" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,2" />
              </g>

              {/* ARDUINO UNO CONTROLLER BOX */}
              <g>
                <rect x="220" y="210" width="100" height="70" rx="8" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
                <text x="235" y="240" fill="#f0f9ff" fontSize="11" fontFamily="monospace" fontWeight="bold">ARDUINO</text>
                <text x="235" y="258" fill="#bae6fd" fontSize="9" fontFamily="monospace">Count: {pulseCount}</text>
              </g>

              {/* RELAY MODULE BOX */}
              <g>
                <rect
                  x="220"
                  y="300"
                  width="100"
                  height="60"
                  rx="8"
                  fill={isRunning ? '#b45309' : '#451a03'}
                  stroke={isRunning ? '#fbbf24' : '#d97706'}
                  strokeWidth="2.5"
                />
                <text x="232" y="325" fill="#fef3c7" fontSize="11" fontFamily="monospace" fontWeight="bold">RELAY MOD</text>
                <text x="232" y="342" fill={isRunning ? '#34d399' : '#f87171'} fontSize="9" fontFamily="monospace" fontWeight="bold">
                  {isRunning ? 'COIL ON (NO)' : 'COIL OFF (NC)'}
                </text>
              </g>

              {/* Wire Arduino to Relay */}
              <line x1="270" y1="280" x2="270" y2="300" stroke={isRunning ? '#10b981' : '#64748b'} strokeWidth="3" />

              {/* GRADUATED COLLECTION CONTAINER (RIGHT) */}
              <g>
                <rect x="550" y="160" width="120" height="210" rx="8" fill="#09132b" stroke="#64748b" strokeWidth="2.5" />
                {/* Measuring tick marks */}
                {[190, 220, 250, 280, 310, 340].map((y, i) => (
                  <g key={i}>
                    <line x1="550" y1={y} x2="565" y2={y} stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="655" y1={y} x2="670" y2={y} stroke="#94a3b8" strokeWidth="1.5" />
                  </g>
                ))}

                {/* Filled Water Column inside container based on progress */}
                {deliveredVolume > 0 && (
                  <motion.rect
                    x="555"
                    y={365 - (progressPercent / 100) * 190}
                    width="110"
                    height={(progressPercent / 100) * 190}
                    rx="4"
                    fill="url(#cylinderWater)"
                    fillOpacity="0.8"
                  />
                )}

                {/* Stream dripping into container */}
                {isRunning && (
                  <line
                    x1="610"
                    y1="170"
                    x2="610"
                    y2={365 - (progressPercent / 100) * 190}
                    stroke="#38bdf8"
                    strokeWidth="6"
                    strokeDasharray="4,4"
                    className="animate-flow-dash"
                  />
                )}

                <text x="575" y="185" fill="#bae6fd" fontSize="11" fontFamily="monospace" fontWeight="bold">TARGET</text>
                <text x="570" y="200" fill="#38bdf8" fontSize="10" fontFamily="monospace">{targetVolume.toFixed(2)} L</text>
              </g>
            </svg>
          </div>

          {/* Execution Controls Buttons */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={handleStart}
                disabled={isRunning}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-xl ${
                  isRunning
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25 ring-2 ring-emerald-400/40'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                START PUMP
              </button>

              <button
                onClick={handleStop}
                disabled={!isRunning}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold border transition-all ${
                  !isRunning
                    ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30'
                }`}
              >
                <Square className="w-4 h-4" />
                STOP
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
                RESET
              </button>
            </div>

            <div className="text-xs font-mono text-slate-400">
              PROGRESS: <span className="text-white font-bold">{progressPercent.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Right: Telemetry Digital Displays & Logs */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Key Metrics Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 mb-3 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-cyan-400" />
              PROCESS INSTRUMENTATION
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">PRESET TARGET</span>
                <span className="text-xl font-mono font-bold text-white">{targetVolume.toFixed(2)} L</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-cyan-400 block uppercase">DELIVERED</span>
                <span className="text-xl font-mono font-bold text-cyan-400">{deliveredVolume.toFixed(2)} L</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-amber-400 block uppercase">REMAINING</span>
                <span className="text-xl font-mono font-bold text-amber-400">{remaining.toFixed(2)} L</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono text-emerald-400 block uppercase">PULSE COUNT</span>
                <span className="text-xl font-mono font-bold text-emerald-400">{pulseCount}</span>
              </div>
            </div>

            {/* Binary Component States */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">RELAY CONTROL (PIN 8):</span>
                <span className={`font-bold ${isRunning ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {isRunning ? 'HIGH (5V)' : 'LOW (0V)'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">RELAY SWITCHING:</span>
                <span className={`font-bold ${isRunning ? 'text-amber-400' : 'text-slate-500'}`}>
                  {isRunning ? 'COM ➔ NO (ON)' : 'COM ➔ NC (OFF)'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">DC WATER PUMP:</span>
                <span className={`font-bold ${isRunning ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isRunning ? 'MOTOR RUNNING' : 'MOTOR STOPPED'}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-400">FLOW SENSOR PULSES:</span>
                <span className={`font-bold ${isRunning ? 'text-cyan-400' : 'text-slate-500'}`}>
                  {isRunning ? 'GENERATING PULSES' : 'INACTIVE'}
                </span>
              </div>
            </div>
          </div>

          {/* System Terminal Log Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex-1 flex flex-col">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-400" />
                SYSTEM EXECUTION LOG
              </span>
              <span className="text-[10px] text-slate-500">LIVE FEED</span>
            </h3>

            <div
              ref={logContainerRef}
              className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-[11px] h-48 overflow-y-auto space-y-1.5"
            >
              {logs.map((log) => (
                <div key={log.id} className="leading-snug">
                  <span className="text-slate-500">[{log.timestamp}]</span>{' '}
                  <span
                    className={
                      log.type === 'success'
                        ? 'text-emerald-400 font-bold'
                        : log.type === 'warn'
                          ? 'text-amber-400 font-bold'
                          : log.type === 'action'
                            ? 'text-cyan-400'
                            : 'text-slate-300'
                    }
                  >
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
