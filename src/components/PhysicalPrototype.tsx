import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Play, Info, CheckCircle2, Cpu, Zap, Droplet } from 'lucide-react'

interface Hotspot {
  id: string
  title: string
  x: number // percentage
  y: number // percentage
  role: string
  specs: string
  color: string
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'arduino',
    title: 'ARDUINO UNO R3',
    x: 28,
    y: 58,
    role: 'Central Processing & Logic Controller',
    specs: 'ATmega328P MCU, 16 MHz, Pin 2 (External Interrupt for Flow Sensor), Pin 8 (Relay Trigger)',
    color: '#38bdf8'
  },
  {
    id: 'relay',
    title: '5V RELAY MODULE (MAIN DEVICE)',
    x: 52,
    y: 42,
    role: 'Syllabus Main Switching Interface & Galvanic Isolation',
    specs: 'Single-channel SPDT relay, 5V coil rating, 10A 250VAC / 10A 30VDC contact rating, onboard flyback diode & transistor switch',
    color: '#f59e0b'
  },
  {
    id: 'sensor',
    title: 'WATER FLOW SENSOR',
    x: 75,
    y: 65,
    role: 'Supporting Sensing Transducer (Input Pulses)',
    specs: 'YF-S201 / Hall-effect turbine flowmeter, 1-30 L/min range, ~450 pulses/L calibration, 5V DC supply',
    color: '#06b6d4'
  },
  {
    id: 'pump',
    title: 'DC WATER PUMP',
    x: 18,
    y: 30,
    role: 'System Actuator / Electrical Load',
    specs: '12V DC mini submersible/inline centrifugal pump, ~250-500 mA operating current',
    color: '#10b981'
  },
  {
    id: 'tubing',
    title: 'PULSE / FLUID TUBING',
    x: 65,
    y: 25,
    role: 'Hydraulic Transport Conduit',
    specs: 'Flexible food-grade silicone tubing (8mm ID) routing water through flow turbine chamber',
    color: '#a855f7'
  }
]

export const PhysicalPrototype: React.FC<{ onRunSimulation: () => void }> = ({ onRunSimulation }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(HOTSPOTS[1]) // Default to Relay

  return (
    <section id="section-physical-prototype" className="py-20 px-4 max-w-7xl mx-auto border-b border-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            SECTION 11 • CLASSROOM HARDWARE DEMONSTRATION
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Our Physical Prototype
          </h2>
          <p className="text-slate-400 mt-2 max-w-2xl text-base">
            Actual working prototype used for classroom demonstration with interactive component telemetry hotspots.
          </p>
        </div>

        <button
          onClick={onRunSimulation}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-sm shadow-lg shadow-amber-500/20 transition-all"
        >
          <Play className="w-4 h-4 fill-current" />
          RUN DIGITAL SIMULATION
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Prototype Image & Interactive Hotspot Canvas */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative backdrop-blur tech-grid shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <span className="font-mono text-xs text-slate-400">BENCHTOP TEST RIG • ASSEMBLED ARDUINO & RELAY SYSTEM</span>
            <span className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
              VERIFIED WORKING MODEL
            </span>
          </div>

          {/* Prototype Display Box */}
          <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center">
            {/* Visual Technical Schematic Mockup of Physical Rig */}
            <svg viewBox="0 0 800 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
              {/* Lab workbench surface pattern */}
              <rect width="800" height="500" fill="#070c18" />
              <g opacity="0.1">
                {[...Array(20)].map((_, i) => (
                  <line key={`x-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="500" stroke="#38bdf8" strokeWidth="1" />
                ))}
                {[...Array(13)].map((_, i) => (
                  <line key={`y-${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40} stroke="#38bdf8" strokeWidth="1" />
                ))}
              </g>

              {/* Silicon Tubing */}
              <path
                d="M 170 170 C 250 80, 520 80, 580 140 C 620 180, 620 280, 600 330"
                fill="none"
                stroke="#64748b"
                strokeWidth="22"
                strokeLinecap="round"
                opacity="0.4"
              />
              <path
                d="M 170 170 C 250 80, 520 80, 580 140 C 620 180, 620 280, 600 330"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="10"
                strokeDasharray="6,6"
                strokeLinecap="round"
                className="animate-flow-dash"
              />

              {/* DC Water Pump (Left) */}
              <g transform="translate(100, 120)">
                <rect width="110" height="90" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
                <circle cx="55" cy="45" r="22" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                <text x="25" y="80" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold">DC PUMP (12V)</text>
              </g>

              {/* Arduino Uno (Center Left) */}
              <g transform="translate(160, 240)">
                <rect width="180" height="130" rx="8" fill="#0369a1" stroke="#38bdf8" strokeWidth="2.5" />
                <rect x="20" y="20" width="40" height="30" rx="3" fill="#cbd5e1" />
                <rect x="80" y="50" width="70" height="25" rx="3" fill="#0f172a" />
                <text x="85" y="66" fill="#f8fafc" fontSize="10" fontFamily="monospace">ATmega328P</text>
                <text x="40" y="115" fill="#f0f9ff" fontSize="13" fontFamily="monospace" fontWeight="bold">ARDUINO UNO</text>
              </g>

              {/* Relay Module (Center) */}
              <g transform="translate(380, 180)">
                <rect width="130" height="110" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="3" />
                {/* Blue SRD Relay Cube */}
                <rect x="25" y="15" width="80" height="60" rx="4" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="35" y="42" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold">5V RELAY</text>
                <text x="35" y="55" fill="#bae6fd" fontSize="8" fontFamily="monospace">10A 250VAC</text>
                {/* Terminal blocks */}
                <rect x="15" y="82" width="100" height="18" rx="2" fill="#15803d" />
                <text x="25" y="94" fill="#f0fdf4" fontSize="8" fontFamily="monospace">NO  COM  NC</text>
                {/* Glowing LED */}
                <circle cx="100" cy="25" r="3" fill="#ef4444" />
              </g>

              {/* Water Flow Sensor (Right) */}
              <g transform="translate(550, 270)">
                <rect width="130" height="90" rx="10" fill="#0c4a6e" stroke="#06b6d4" strokeWidth="2.5" />
                <circle cx="65" cy="45" r="24" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="20" y="80" fill="#e0f2fe" fontSize="10" fontFamily="monospace" fontWeight="bold">FLOW SENSOR</text>
              </g>

              {/* Jumper Wires interconnecting */}
              <path d="M 320 270 Q 350 250, 390 260" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
              <path d="M 330 320 Q 420 370, 560 330" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
              <path d="M 450 180 Q 400 130, 210 160" fill="none" stroke="#10b981" strokeWidth="2.5" />
            </svg>

            {/* Interactive Hotspot Buttons overlaid on image */}
            {HOTSPOTS.map((spot) => {
              const isSelected = selectedHotspot.id === spot.id
              return (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot)}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-transform ${
                    isSelected ? 'scale-125' : 'hover:scale-110'
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <span
                      className="absolute w-8 h-8 rounded-full animate-ping opacity-75"
                      style={{ backgroundColor: spot.color }}
                    />
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: spot.color }}
                    >
                      <span className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                  <div
                    className="mt-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap shadow-md"
                    style={{ backgroundColor: '#020617', color: spot.color, border: `1px solid ${spot.color}` }}
                  >
                    {spot.title.split(' ')[0]}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>📷 Actual physical prototype used for classroom demonstration</span>
            <span className="font-mono text-cyan-400">CLICK ANY HOTSPOT TO INSPECT ROLE & PINOUT</span>
          </div>
        </div>

        {/* Selected Component Inspection Panel */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              HOTSPOT HARDWARE SPECIFICATION
            </h3>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHotspot.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedHotspot.color }} />
                  <h4 className="font-bold text-white text-base">{selectedHotspot.title}</h4>
                </div>

                <div className="text-xs text-slate-300 font-semibold mb-2 text-cyan-400">
                  Role: {selectedHotspot.role}
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed">
                  {selectedHotspot.specs}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 space-y-2 text-xs">
              <div className="text-slate-400 font-mono font-bold">ALL PROTOTYPE COMPONENTS:</div>
              {HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHotspot(h)}
                  className={`w-full text-left px-3 py-2 rounded-lg border font-mono transition-all flex items-center justify-between ${
                    selectedHotspot.id === h.id
                      ? 'bg-slate-800 text-white border-amber-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span className="text-[11px] truncate">{h.title}</span>
                  <span className="w-2 h-2 rounded-full shrink-0 ml-2" style={{ backgroundColor: h.color }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
