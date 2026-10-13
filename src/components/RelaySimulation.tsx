import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Power, Activity, ArrowRight, Gauge, CheckCircle2, XCircle } from 'lucide-react'

export const RelaySimulation: React.FC = () => {
  const [isEnergized, setIsEnergized] = useState<boolean>(false)

  return (
    <section id="section-relay-simulation" className="py-20 px-4 max-w-7xl mx-auto border-b border-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            SECTION 03 • DYNAMIC SIMULATION
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Relay Operation Simulator
          </h2>
          <p className="text-slate-400 mt-2 max-w-2xl text-base">
            Observe electromechanical switching in real time. Switch between Normal State and Energized State to watch the armature swing from NC to NO contact.
          </p>
        </div>

        {/* State Toggle Tabs */}
        <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setIsEnergized(false)}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              !isEnergized
                ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            NORMAL STATE (OFF)
          </button>
          <button
            onClick={() => setIsEnergized(true)}
            className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              isEnergized
                ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ENERGIZED STATE (ON)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Main Interactive Canvas Area */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between backdrop-blur tech-grid shadow-2xl">
          {/* Header Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <span className={`w-3.5 h-3.5 rounded-full ${isEnergized ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
              <span className="font-mono text-sm font-semibold text-slate-200">
                RELAY COIL: {isEnergized ? 'ENERGIZED (5V ACTIVE)' : 'DE-ENERGIZED (0V IDLE)'}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-slate-400">ACTIVE PATH:</span>
              <span className={`px-2.5 py-1 rounded font-bold ${isEnergized ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'}`}>
                {isEnergized ? 'COM ➔ NO (PUMP POWERED)' : 'COM ➔ NC (PUMP DISCONNECTED)'}
              </span>
            </div>
          </div>

          {/* SVG Real-time electromechanical simulator */}
          <div className="relative w-full aspect-[16/10] max-h-[460px] flex items-center justify-center my-2">
            <svg viewBox="0 0 800 480" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="magneticFieldGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background Frame */}
              <rect x="20" y="20" width="760" height="440" rx="16" fill="#090e1d" stroke="#1e293b" strokeWidth="2" />

              {/* Arduino Signal Cable Input */}
              <g>
                <path d="M 40 400 L 170 400" stroke={isEnergized ? '#10b981' : '#64748b'} strokeWidth="4" strokeDasharray={isEnergized ? '6,3' : 'none'} />
                <path d="M 40 425 L 170 425" stroke="#475569" strokeWidth="4" />
                <rect x="35" y="380" width="90" height="60" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="45" y="405" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">ARDUINO</text>
                <text x="45" y="423" fill={isEnergized ? '#10b981' : '#ef4444'} fontSize="10" fontFamily="monospace">
                  {isEnergized ? 'D8: HIGH (5V)' : 'D8: LOW (0V)'}
                </text>
              </g>

              {/* Electromagnetic Field Lines (Only visible when energized) */}
              {isEnergized && (
                <g className="animate-pulse-glow">
                  <ellipse cx="260" cy="270" rx="140" ry="110" fill="url(#magneticFieldGrad)" />
                  <ellipse cx="260" cy="270" rx="100" ry="80" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6,4" />
                  <ellipse cx="260" cy="270" rx="60" ry="50" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4,4" />
                  <text x="180" y="160" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold">
                    ⚡ MAGNETIC FLUX ESTABLISHED
                  </text>
                </g>
              )}

              {/* Iron Core */}
              <rect x="210" y="200" width="100" height="170" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
              <text x="225" y="290" fill="#94a3b8" fontSize="12" fontFamily="monospace">IRON CORE</text>

              {/* Coil Assembly */}
              <g>
                <rect
                  x="180"
                  y="225"
                  width="160"
                  height="120"
                  rx="6"
                  fill={isEnergized ? '#d97706' : '#78350f'}
                  stroke={isEnergized ? '#f59e0b' : '#b45309'}
                  strokeWidth="2"
                />
                {[240, 255, 270, 285, 300, 315, 330].map((y, i) => (
                  <line
                    key={i}
                    x1="180"
                    y1={y}
                    x2="340"
                    y2={y}
                    stroke={isEnergized ? '#fbbf24' : '#92400e'}
                    strokeWidth="2.5"
                    strokeDasharray={isEnergized ? '8,4' : 'none'}
                  />
                ))}
                <text x="215" y="275" fill="#fef08a" fontSize="14" fontFamily="monospace" fontWeight="bold">
                  {isEnergized ? 'COIL [ON]' : 'COIL [OFF]'}
                </text>
              </g>

              {/* Core Pole Tip */}
              <rect x="200" y="180" width="120" height="20" rx="2" fill="#64748b" stroke="#94a3b8" strokeWidth="1.5" />

              {/* Return Spring */}
              <g>
                <path
                  d={isEnergized ? 'M 170 170 C 160 140, 180 120, 170 85' : 'M 165 150 C 155 125, 175 110, 165 85'}
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="165" cy="85" r="4" fill="#ec4899" />
                <text x="105" y="110" fill="#ec4899" fontSize="10" fontFamily="monospace">
                  {isEnergized ? 'TENSIONED' : 'AT REST'}
                </text>
              </g>

              {/* Movable Armature with Contact Arm */}
              <motion.g
                animate={{
                  rotate: isEnergized ? 11 : -2,
                  originX: '150px',
                  originY: '155px'
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                {/* Armature lever */}
                <path d="M 150 155 L 420 140 L 420 125 L 145 140 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
                <circle cx="150" cy="150" r="8" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />

                {/* Movable Contact Tip */}
                <line x1="420" y1="132" x2="550" y2="175" stroke="#38bdf8" strokeWidth="4" />
                <circle cx="550" cy="175" r="8" fill="#e2e8f0" stroke="#0284c7" strokeWidth="2.5" />

                {/* Flexible lead to COM */}
                <path d="M 420 132 C 460 90, 520 70, 640 60" fill="none" stroke="#a855f7" strokeWidth="3" strokeDasharray="4,2" />
              </motion.g>

              {/* STATIONARY CONTACTS */}

              {/* COM Terminal (Power Source side) */}
              <g>
                <rect x="640" y="45" width="110" height="36" rx="6" fill="#581c87" stroke="#a855f7" strokeWidth="2" />
                <text x="655" y="68" fill="#f3e8ff" fontSize="13" fontFamily="monospace" fontWeight="bold">COM (+12V)</text>
                <circle cx="640" cy="63" r="5" fill="#c084fc" />
              </g>

              {/* NC Contact (Upper) */}
              <g>
                <line x1="550" y1="150" x2="640" y2="150" stroke="#ef4444" strokeWidth="4" />
                <circle cx="550" cy="150" r="8" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
                <rect x="640" y="132" width="110" height="36" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
                <text x="660" y="155" fill="#fee2e2" fontSize="13" fontFamily="monospace" fontWeight="bold">NC (OPEN)</text>
              </g>

              {/* NO Contact (Lower) */}
              <g>
                <line x1="550" y1="215" x2="640" y2="215" stroke="#10b981" strokeWidth="4" />
                <circle cx="550" cy="215" r="8" fill="#10b981" stroke="#6ee7b7" strokeWidth="2" />
                <rect x="640" y="198" width="110" height="36" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="660" y="221" fill="#d1fae5" fontSize="13" fontFamily="monospace" fontWeight="bold">NO (PUMP)</text>
              </g>

              {/* Current Flow Animation Lines to PUMP */}
              {isEnergized ? (
                <g>
                  <path
                    d="M 640 215 L 750 215 L 750 350 L 680 350"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeDasharray="6,4"
                    className="animate-flow-dash"
                  />
                  <text x="690" y="290" fill="#10b981" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    POWER APPLIED
                  </text>
                </g>
              ) : (
                <path d="M 640 215 L 750 215 L 750 350 L 680 350" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />
              )}

              {/* Water Pump Symbol / Module */}
              <g>
                <rect
                  x="560"
                  y="320"
                  width="170"
                  height="110"
                  rx="10"
                  fill={isEnergized ? '#064e3b' : '#0f172a'}
                  stroke={isEnergized ? '#10b981' : '#334155'}
                  strokeWidth="2.5"
                />
                <circle
                  cx="645"
                  cy="365"
                  r="30"
                  fill="#022c22"
                  stroke={isEnergized ? '#34d399' : '#475569'}
                  strokeWidth="3"
                />
                {/* Impeller blades */}
                <motion.g
                  animate={{ rotate: isEnergized ? 360 : 0 }}
                  transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
                  style={{ originX: '645px', originY: '365px' }}
                >
                  <line x1="645" y1="345" x2="645" y2="385" stroke={isEnergized ? '#6ee7b7' : '#64748b'} strokeWidth="4" />
                  <line x1="625" y1="365" x2="665" y2="365" stroke={isEnergized ? '#6ee7b7' : '#64748b'} strokeWidth="4" />
                </motion.g>
                <text x="590" y="415" fill={isEnergized ? '#6ee7b7' : '#94a3b8'} fontSize="13" fontFamily="monospace" fontWeight="bold">
                  {isEnergized ? 'DC PUMP: RUNNING' : 'DC PUMP: STOPPED'}
                </text>
              </g>
            </svg>
          </div>

          {/* Interactive Toggle Button Bar */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => setIsEnergized(!isEnergized)}
              className={`flex items-center gap-3 px-6 py-3.5 rounded-xl text-base font-bold transition-all shadow-xl ${
                isEnergized
                  ? 'bg-red-500 hover:bg-red-400 text-white shadow-red-500/25 ring-2 ring-red-400/50'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25 ring-2 ring-amber-400/50'
              }`}
            >
              <Power className="w-5 h-5" />
              {isEnergized ? 'DE-ENERGIZE RELAY (CUT SIGNAL)' : 'ENERGIZE RELAY (5V SIGNAL)'}
            </button>

            <span className="text-xs text-slate-400 font-mono">
              CLICK BUTTON TO TRIGGER ELECTROMAGNETIC SWITCHING
            </span>
          </div>
        </div>

        {/* Right Info Telemetry Panel */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 mb-4 flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-400" />
              LIVE TELEMETRY READOUT
            </h3>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">RELAY STATE</span>
                <span className={`text-sm font-mono font-bold flex items-center gap-1.5 ${isEnergized ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {isEnergized ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {isEnergized ? 'ON (ENERGIZED)' : 'OFF (DE-ENERGIZED)'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">CONTACT CONFIG</span>
                <span className="text-sm font-mono font-bold text-amber-400">
                  {isEnergized ? 'COM ➔ NO (CLOSED)' : 'COM ➔ NC (REST)'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">LOAD ACTUATOR</span>
                <span className={`text-sm font-mono font-bold ${isEnergized ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isEnergized ? 'DC PUMP: ACTIVE' : 'DC PUMP: INACTIVE'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">MAGNETIC FIELD</span>
                <span className={`text-sm font-mono font-bold ${isEnergized ? 'text-cyan-400' : 'text-slate-500'}`}>
                  {isEnergized ? 'ACTIVE (ATTRACTING)' : 'ZERO (SPRING PULL)'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase text-slate-400 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                ELECTROMECHANICAL CYCLE EXPLANATION
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                {isEnergized ? (
                  <>
                    <strong className="text-emerald-400">Coil is energized:</strong> Current passes through the solenoid coil, generating a concentrated magnetic field across the iron core. The magnetic flux overcomes the spring tension, physically pulling the armature toward the core. The wiping contact shifts from NC and firmly mates with the <span className="text-emerald-400 font-bold">NO terminal</span>, completing the pump power loop.
                  </>
                ) : (
                  <>
                    <strong className="text-amber-400">Coil is unpowered:</strong> Without current, the electromagnetic field collapses instantly. The mechanical return spring snaps the armature back to its default position, reconnecting <span className="text-purple-400 font-bold">COM to NC</span> and breaking electrical continuity with the pump.
                  </>
                )}
              </p>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
              <strong>CORE SYLLABUS INSIGHT:</strong> Galvanic isolation separates the low-power 5V MCU logic from the heavy load pump circuit.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
