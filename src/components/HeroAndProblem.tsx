import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, UserCheck, ShieldAlert, Cpu, CheckCircle2, Droplets, Zap, Gauge } from 'lucide-react'

export const HeroAndProblem: React.FC<{
  onEnterLab: () => void
  onSeeRelayWork: () => void
}> = ({ onEnterLab, onSeeRelayWork }) => {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 px-4 max-w-7xl mx-auto border-b border-slate-800 tech-grid">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            UNIT IV & V • SENSORS AND ACTUATION SYSTEMS • TOPIC 18
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Automatic Motor Switching <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
              Using a Relay
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Interactive Relay & Water Pump Control Laboratory
          </p>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mt-2">
            Real-World Application: Automatic Water Pump Control Using a Water Flow Sensor and Relay
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={onEnterLab}
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
            >
              ENTER RELAY LAB
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onSeeRelayWork}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-bold text-sm tracking-wide transition-all shadow-md flex items-center gap-2"
            >
              SEE HOW THE RELAY WORKS
              <Zap className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>

        {/* Hero Visual: Arduino -> Relay -> Water Pump with animated signals */}
        <div className="max-w-4xl mx-auto my-10 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-4">
            {/* 1. Arduino */}
            <div className="w-full sm:w-1/3 p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">CONTROLLER</span>
              <div className="font-bold text-white text-base mt-1">Arduino Uno</div>
              <span className="text-xs text-slate-400 mt-1">5V Digital Logic (Pin 8)</span>
            </div>

            {/* Signal Arrow 1 */}
            <div className="flex flex-col items-center text-amber-400">
              <span className="text-[10px] font-mono text-slate-400 mb-1">5V TRIGGER</span>
              <div className="w-16 h-1 bg-amber-500/40 relative overflow-hidden rounded">
                <div className="w-8 h-full bg-amber-400 animate-flow-dash" />
              </div>
              <span className="text-xs font-mono font-bold">➔</span>
            </div>

            {/* 2. Relay (Highlighted Main Device) */}
            <div className="w-full sm:w-1/3 p-5 rounded-2xl bg-amber-950/40 border-2 border-amber-500 text-center flex flex-col items-center shadow-lg shadow-amber-500/10 scale-105">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                <Zap className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">MAIN SYLLABUS DEVICE</span>
              <div className="font-bold text-amber-300 text-base mt-1">5V Relay Module</div>
              <span className="text-xs text-amber-200/80 mt-1">Electromechanical Switch</span>
            </div>

            {/* Signal Arrow 2 */}
            <div className="flex flex-col items-center text-emerald-400">
              <span className="text-[10px] font-mono text-slate-400 mb-1">12V POWER</span>
              <div className="w-16 h-1 bg-emerald-500/40 relative overflow-hidden rounded">
                <div className="w-8 h-full bg-emerald-400 animate-flow-dash" />
              </div>
              <span className="text-xs font-mono font-bold">➔</span>
            </div>

            {/* 3. Water Pump */}
            <div className="w-full sm:w-1/3 p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <Droplets className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">LOAD / ACTUATOR</span>
              <div className="font-bold text-white text-base mt-1">DC Water Pump</div>
              <span className="text-xs text-slate-400 mt-1">High-Current Switched Motor</span>
            </div>
          </div>
        </div>

        {/* 4 Compact Hierarchy Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-center">
            <span className="text-[11px] font-mono text-amber-400 font-bold block">RELAY</span>
            <span className="text-xs text-slate-300 font-semibold">MAIN SYLLABUS DEVICE</span>
          </div>

          <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-center">
            <span className="text-[11px] font-mono text-cyan-400 font-bold block">FLOW SENSOR</span>
            <span className="text-xs text-slate-300 font-semibold">SUPPORTING INPUT</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[11px] font-mono text-cyan-300 font-bold block">ARDUINO</span>
            <span className="text-xs text-slate-300 font-semibold">CONTROLLER</span>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center">
            <span className="text-[11px] font-mono text-emerald-400 font-bold block">DC PUMP</span>
            <span className="text-xs text-slate-300 font-semibold">LOAD / ACTUATOR</span>
          </div>
        </div>
      </section>

      {/* ================= SECTION 1: THE REAL-WORLD PROBLEM ================= */}
      <section id="section-problem" className="py-20 px-4 max-w-7xl mx-auto border-b border-slate-800">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            SECTION 01 • REAL-WORLD MOTIVATION
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            The Problem: Manual vs Automatic Water Delivery
          </h2>
          <p className="text-slate-400 mt-2 text-base">
            Manual pump operation requires continuous human vigilance. Pumps often continue running after delivery, causing catastrophic tank overflows and dry-run motor burnouts.
          </p>
        </div>

        {/* Interactive Manual vs Automatic Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-8">
          {/* LEFT: MANUAL SYSTEM */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Manual System</h3>
                  <span className="text-xs text-red-400 font-mono">High error risk • Wasteful</span>
                </div>
              </div>

              {/* Chain */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono mb-6 text-slate-300">
                <span>Person</span>
                <span className="text-slate-500">➔</span>
                <span>Pump Switch</span>
                <span className="text-slate-500">➔</span>
                <span>Water Flow</span>
              </div>

              <div className="space-y-3 text-sm text-slate-400">
                <div className="p-3 rounded-lg bg-red-950/30 border border-red-900/40 text-red-300 text-xs font-mono">
                  “Human must continuously monitor and manually stop the pump.”
                </div>
                <p>• Inevitable fluid overflow due to human distraction or absence.</p>
                <p>• Inaccurate volume estimates; high freshwater wastage.</p>
                <p>• Risk of pump overheating and motor stator burnout.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-mono text-slate-400">
              DISADVANTAGE: Fully dependent on continuous human attention.
            </div>
          </div>

          {/* RIGHT: AUTOMATIC SYSTEM */}
          <div className="bg-slate-900/90 border-2 border-cyan-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Automatic Closed-Loop System</h3>
                  <span className="text-xs text-cyan-400 font-mono">Precise • Relay-controlled</span>
                </div>
              </div>

              {/* Chain */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs font-mono mb-6 text-cyan-300">
                <span>Flow Sensor</span>
                <span className="text-slate-500">➔</span>
                <span>Arduino</span>
                <span className="text-slate-500">➔</span>
                <span className="text-amber-400 font-bold">Relay</span>
                <span className="text-slate-500">➔</span>
                <span>DC Pump</span>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                  “System automatically stops the pump when preset quantity is delivered.”
                </div>
                <p>• Zero human supervision needed during active liquid pumping.</p>
                <p>• Hardware interrupt counts pulses for millimeter-level precision.</p>
                <p>• Relay provides robust galvanic break, isolating inductive spikes.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-mono text-emerald-400">
              ADVANTAGE: 100% Autonomous, repeatable, and water-conserving.
            </div>
          </div>
        </div>

        {/* Highlighted Objective Box */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold text-amber-400 uppercase block mb-1">
            CORE PROJECT OBJECTIVE
          </span>
          <p className="text-base sm:text-lg font-bold text-white">
            “Automatically stop the water pump when the predefined water quantity is reached using an electromechanical relay interface.”
          </p>
        </div>
      </section>
    </>
  )
}
