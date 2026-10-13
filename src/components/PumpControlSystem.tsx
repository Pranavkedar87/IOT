import React from 'react'
import { motion } from 'framer-motion'
import { GitBranch, Cpu, ArrowRight, Droplets, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react'

export const PumpControlSystem: React.FC = () => {
  return (
    <section id="section-system-architecture" className="py-20 px-4 max-w-7xl mx-auto border-b border-slate-800">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
          SECTION 07 • COMPLETE ARCHITECTURE
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Complete System Integration Diagram
        </h2>
        <p className="text-slate-400 mt-2 text-base">
          Dual-path architecture isolating the hydraulic water path from the electronic microcontroller feedback loop.
        </p>
      </div>

      {/* Interactive System Block Diagram Canvas */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur tech-grid shadow-2xl overflow-x-auto">
        <div className="min-w-[760px]">
          {/* Top: 2-Tier Path Header Badges */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan-400 flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                HYDRAULIC / WATER FLOW PATH
              </span>
              <span className="text-[11px] text-cyan-300 font-mono">PHYSICAL FLUID TRANSFER</span>
            </div>

            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                ELECTRONIC / DIGITAL CONTROL PATH
              </span>
              <span className="text-[11px] text-amber-300 font-mono">SENSING & SWITCHING LOOP</span>
            </div>
          </div>

          {/* SVG Complete Block Diagram with animated signal and fluid flow lines */}
          <div className="relative w-full aspect-[2/1] max-h-[460px]">
            <svg viewBox="0 0 900 450" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
              {/* Definitions */}
              <defs>
                <marker id="arrowCyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                </marker>
                <marker id="arrowAmber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                </marker>
                <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                </marker>
              </defs>

              {/* Water Path Connective Pipe (Top Track) */}
              <path
                d="M 120 120 L 310 120 L 580 120 L 780 120"
                fill="none"
                stroke="#0284c7"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 120 120 L 310 120 L 580 120 L 780 120"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4"
                strokeDasharray="8,6"
                className="animate-flow-dash"
              />

              {/* Control Path Connective Wires (Bottom Loop) */}
              {/* Sensor to Arduino */}
              <path
                d="M 580 160 L 580 280 L 480 280"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
                strokeDasharray="6,4"
                markerEnd="url(#arrowCyan)"
                className="animate-flow-dash"
              />
              {/* Arduino to Relay */}
              <path
                d="M 360 280 L 260 280"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3.5"
                strokeDasharray="6,4"
                markerEnd="url(#arrowAmber)"
                className="animate-flow-dash"
              />
              {/* Relay to DC Pump */}
              <path
                d="M 210 240 L 210 160"
                fill="none"
                stroke="#10b981"
                strokeWidth="4"
                strokeDasharray="6,4"
                markerEnd="url(#arrowGreen)"
                className="animate-flow-dash"
              />

              {/* BLOCK 1: WATER RESERVOIR */}
              <g>
                <rect x="30" y="70" width="120" height="100" rx="10" fill="#0b1736" stroke="#0284c7" strokeWidth="2" />
                <text x="50" y="110" fill="#bae6fd" fontSize="13" fontFamily="monospace" fontWeight="bold">RESERVOIR</text>
                <text x="60" y="130" fill="#7dd3fc" fontSize="11" fontFamily="monospace">Water Tank</text>
              </g>

              {/* BLOCK 2: DC WATER PUMP (ACTUATOR / LOAD) */}
              <g>
                <rect x="210" y="70" width="140" height="100" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
                <rect x="220" y="80" width="120" height="20" rx="4" fill="#047857" />
                <text x="235" y="94" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold">LOAD / ACTUATOR</text>
                <text x="230" y="125" fill="#ecfdf5" fontSize="13" fontFamily="monospace" fontWeight="bold">DC WATER PUMP</text>
                <text x="235" y="145" fill="#6ee7b7" fontSize="10" fontFamily="monospace">Submersible / Inline</text>
              </g>

              {/* BLOCK 3: WATER FLOW SENSOR (INPUT SENSOR) */}
              <g>
                <rect x="510" y="70" width="150" height="100" rx="10" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2.5" />
                <rect x="520" y="80" width="130" height="20" rx="4" fill="#0369a1" />
                <text x="530" y="94" fill="#bae6fd" fontSize="10" fontFamily="monospace" fontWeight="bold">INPUT SENSOR</text>
                <text x="525" y="125" fill="#f0f9ff" fontSize="13" fontFamily="monospace" fontWeight="bold">FLOW SENSOR</text>
                <text x="535" y="145" fill="#7dd3fc" fontSize="10" fontFamily="monospace">Hall Turbine (Pulses)</text>
              </g>

              {/* BLOCK 4: WATER OUTLET */}
              <g>
                <rect x="740" y="70" width="120" height="100" rx="10" fill="#0b1736" stroke="#0284c7" strokeWidth="2" />
                <text x="765" y="110" fill="#bae6fd" fontSize="13" fontFamily="monospace" fontWeight="bold">OUTLET</text>
                <text x="755" y="130" fill="#7dd3fc" fontSize="11" fontFamily="monospace">Target Container</text>
              </g>

              {/* BLOCK 5: ARDUINO UNO (CONTROLLER) */}
              <g>
                <rect x="360" y="230" width="160" height="100" rx="12" fill="#082f49" stroke="#0ea5e9" strokeWidth="2.5" />
                <rect x="370" y="240" width="140" height="20" rx="4" fill="#0369a1" />
                <text x="405" y="254" fill="#bae6fd" fontSize="10" fontFamily="monospace" fontWeight="bold">CONTROLLER</text>
                <text x="385" y="285" fill="#e0f2fe" fontSize="14" fontFamily="monospace" fontWeight="bold">ARDUINO UNO</text>
                <text x="380" y="305" fill="#7dd3fc" fontSize="10" fontFamily="monospace">Interrupt Pulse Counter</text>
                <text x="385" y="320" fill="#38bdf8" fontSize="9" fontFamily="monospace">Logic: Target Threshold</text>
              </g>

              {/* BLOCK 6: RELAY MODULE (MAIN SYLLABUS DEVICE) */}
              <g>
                <rect x="150" y="230" width="160" height="100" rx="12" fill="#451a03" stroke="#f59e0b" strokeWidth="3" />
                <rect x="160" y="240" width="140" height="20" rx="4" fill="#b45309" />
                <text x="175" y="254" fill="#fef3c7" fontSize="10" fontFamily="monospace" fontWeight="bold">MAIN SYLLABUS DEVICE</text>
                <text x="175" y="285" fill="#fffbeb" fontSize="14" fontFamily="monospace" fontWeight="bold">RELAY MODULE</text>
                <text x="175" y="305" fill="#fde68a" fontSize="10" fontFamily="monospace">Electromechanical SPDT</text>
                <text x="175" y="320" fill="#fbbf24" fontSize="9" fontFamily="monospace">Galvanic Power Switch</text>
              </g>

              {/* Labels on signals */}
              <text x="590" y="220" fill="#38bdf8" fontSize="11" fontFamily="monospace">Digital Pulses (Pin 2)</text>
              <text x="270" y="305" fill="#f59e0b" fontSize="11" fontFamily="monospace">Control Signal (Pin 8)</text>
              <text x="110" y="195" fill="#10b981" fontSize="11" fontFamily="monospace">Switched 12V Power</text>
            </svg>
          </div>
        </div>

        {/* 5-Column Syllabus Hierarchy Cards */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase">1. INPUT</span>
            <div className="font-bold text-white text-sm mt-1">Water Flow</div>
            <div className="text-[11px] text-slate-400 mt-1">Dynamic kinetic liquid movement</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase">2. SENSOR</span>
            <div className="font-bold text-white text-sm mt-1">Flow Sensor</div>
            <div className="text-[11px] text-slate-400 mt-1">Turbine Hall transducer (pulses)</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] font-mono text-cyan-400 font-bold block uppercase">3. CONTROLLER</span>
            <div className="font-bold text-white text-sm mt-1">Arduino Uno</div>
            <div className="text-[11px] text-slate-400 mt-1">Interrupt counting & logic check</div>
          </div>

          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/50">
            <span className="text-[10px] font-mono text-amber-400 font-bold block uppercase">4. MAIN SWITCHING</span>
            <div className="font-bold text-amber-300 text-sm mt-1">Relay Module</div>
            <div className="text-[11px] text-amber-200/70 mt-1">Galvanic isolation & load break</div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50">
            <span className="text-[10px] font-mono text-emerald-400 font-bold block uppercase">5. ACTUATOR / LOAD</span>
            <div className="font-bold text-emerald-300 text-sm mt-1">DC Water Pump</div>
            <div className="text-[11px] text-emerald-200/70 mt-1">Controlled electric motor</div>
          </div>
        </div>
      </div>
    </section>
  )
}
