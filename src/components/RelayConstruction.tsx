import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, RotateCcw, Info, CheckCircle2 } from 'lucide-react'
import { RELAY_PARTS } from '../data/labData'

export const RelayConstruction: React.FC = () => {
  const [exploded, setExploded] = useState<boolean>(false)
  const [selectedPartId, setSelectedPartId] = useState<string>('coil')

  const selectedPart = RELAY_PARTS.find((p) => p.id === selectedPartId) || RELAY_PARTS[0]

  return (
    <section id="section-relay-construction" className="py-20 px-4 max-w-7xl mx-auto border-b border-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            SECTION 02 • MAIN SYLLABUS DEVICE
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Inside an Electromechanical Relay
          </h2>
          <p className="text-slate-400 mt-2 max-w-2xl text-base">
            Detailed electromechanical construction of the SPDT (Single Pole Double Throw) switching mechanism.
            Interact with the schematic below to explore internal components.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setExploded(!exploded)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg ${
              exploded
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-amber-500/20'
                : 'bg-slate-800 text-amber-400 border border-amber-500/40 hover:bg-slate-750'
            }`}
          >
            <Layers className="w-4 h-4" />
            {exploded ? 'ASSEMBLE RELAY' : 'EXPLODE RELAY'}
          </button>
          {exploded && (
            <button
              onClick={() => setExploded(false)}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium bg-slate-800 text-slate-300 border border-slate-700 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Relay Diagram SVG */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur shadow-2xl tech-grid">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-xs text-slate-400">SCHEMATIC: SPDT RELAY SUB-ASSEMBLY</span>
            </div>
            <div className="font-mono text-xs text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2 py-0.5 rounded">
              {exploded ? 'VIEW: EXPLODED' : 'VIEW: ASSEMBLED'}
            </div>
          </div>

          <div className="relative w-full aspect-[16/10] max-h-[480px] flex items-center justify-center">
            <svg viewBox="0 0 800 500" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
              {/* Definitions */}
              <defs>
                <linearGradient id="coilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </linearGradient>
                <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="50%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
                <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Protective Relay Case / Chassis outline */}
              <rect
                x="40"
                y="40"
                width="720"
                height="420"
                rx="16"
                fill="#0b1329"
                stroke={exploded ? '#1e293b' : '#334155'}
                strokeWidth="2"
                strokeDasharray={exploded ? '6,6' : 'none'}
              />

              {/* BASE / YOKE */}
              <motion.g
                animate={{ y: exploded ? 40 : 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="cursor-pointer"
                onClick={() => setSelectedPartId('core')}
              >
                <path
                  d="M 120 400 L 420 400 L 420 370 L 150 370 L 150 180 L 120 180 Z"
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth="2"
                />
                <text x="260" y="420" fill="#64748b" fontSize="12" fontFamily="monospace">FERROMAGNETIC YOKE / BASE</text>
              </motion.g>

              {/* IRON CORE */}
              <motion.g
                animate={{
                  y: exploded ? 15 : 0,
                  opacity: 1
                }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="cursor-pointer"
                onClick={() => setSelectedPartId('core')}
              >
                <rect
                  x="200"
                  y="200"
                  width="140"
                  height="170"
                  rx="6"
                  fill="url(#coreGrad)"
                  stroke={selectedPartId === 'core' ? '#38bdf8' : '#64748b'}
                  strokeWidth={selectedPartId === 'core' ? '3' : '1.5'}
                />
                {/* Core pole piece */}
                <path
                  d="M 190 200 L 350 200 L 340 180 L 200 180 Z"
                  fill="#64748b"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
                <text x="235" y="290" fill="#0f172a" fontWeight="bold" fontSize="14" fontFamily="monospace">IRON CORE</text>
              </motion.g>

              {/* COIL WINDINGS */}
              <motion.g
                animate={{
                  y: exploded ? -50 : 0,
                  scale: exploded ? 1.05 : 1
                }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="cursor-pointer"
                onClick={() => setSelectedPartId('coil')}
              >
                <rect
                  x="180"
                  y="230"
                  width="180"
                  height="110"
                  rx="8"
                  fill="url(#coilGrad)"
                  stroke={selectedPartId === 'coil' ? '#fbbf24' : '#d97706'}
                  strokeWidth={selectedPartId === 'coil' ? '3' : '2'}
                  filter={selectedPartId === 'coil' ? 'url(#glowGold)' : undefined}
                />
                {/* Copper winding ridges */}
                {[245, 260, 275, 290, 305, 320].map((yVal, i) => (
                  <line
                    key={i}
                    x1="180"
                    y1={yVal}
                    x2="360"
                    y2={yVal}
                    stroke="#78350f"
                    strokeWidth="2"
                    strokeDasharray="8,4"
                  />
                ))}
                <text x="220" y="285" fill="#fef3c7" fontWeight="bold" fontSize="14" fontFamily="monospace">
                  COPPER COIL
                </text>
                {/* Coil pin connectors */}
                <line x1="180" y1="330" x2="130" y2="440" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4,2" />
                <line x1="360" y1="330" x2="400" y2="440" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4,2" />
                <circle cx="130" cy="440" r="5" fill="#f59e0b" />
                <circle cx="400" cy="440" r="5" fill="#f59e0b" />
                <text x="90" y="455" fill="#f59e0b" fontSize="11" fontFamily="monospace">COIL PIN 1 (IN)</text>
                <text x="375" y="455" fill="#f59e0b" fontSize="11" fontFamily="monospace">COIL PIN 2 (GND)</text>
              </motion.g>

              {/* MOVABLE ARMATURE */}
              <motion.g
                animate={{
                  y: exploded ? -90 : 0,
                  rotate: exploded ? -10 : 0,
                  originX: '150px',
                  originY: '170px'
                }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="cursor-pointer"
                onClick={() => setSelectedPartId('armature')}
              >
                {/* Armature Bar */}
                <path
                  d="M 150 170 L 400 150 L 400 135 L 145 155 Z"
                  fill="#38bdf8"
                  stroke={selectedPartId === 'armature' ? '#7dd3fc' : '#0284c7'}
                  strokeWidth={selectedPartId === 'armature' ? '3' : '2'}
                />
                {/* Pivot hinge */}
                <circle cx="150" cy="165" r="9" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                <text x="210" y="140" fill="#e0f2fe" fontWeight="bold" fontSize="12" fontFamily="monospace">
                  MOVABLE ARMATURE
                </text>
              </motion.g>

              {/* RETURN SPRING */}
              <motion.g
                animate={{
                  y: exploded ? -60 : 0,
                  scaleY: exploded ? 1.3 : 1
                }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="cursor-pointer"
                onClick={() => setSelectedPartId('spring')}
              >
                <path
                  d="M 160 165 C 150 130, 170 110, 160 85"
                  fill="none"
                  stroke={selectedPartId === 'spring' ? '#f472b6' : '#ec4899'}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="160" cy="85" r="4" fill="#ec4899" />
                <text x="175" y="105" fill="#f472b6" fontSize="11" fontFamily="monospace">RETURN SPRING</text>
              </motion.g>

              {/* MOVABLE CONTACT BLADE & TIP */}
              <motion.g
                animate={{
                  y: exploded ? -90 : 0,
                  x: exploded ? 30 : 0
                }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="cursor-pointer"
                onClick={() => setSelectedPartId('contacts')}
              >
                {/* Copper flex arm from Armature to contact tip */}
                <line x1="400" y1="145" x2="520" y2="175" stroke="#38bdf8" strokeWidth="4" />
                {/* Silver contact button */}
                <circle
                  cx="520"
                  cy="175"
                  r="7"
                  fill="#e2e8f0"
                  stroke={selectedPartId === 'contacts' ? '#38bdf8' : '#94a3b8'}
                  strokeWidth="2"
                />
                {/* Wire to COM terminal */}
                <path
                  d="M 400 145 C 440 120, 500 100, 620 90"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3"
                  strokeDasharray="4,2"
                />
              </motion.g>

              {/* STATIONARY CONTACTS (NC & NO) and COM */}
              {/* COM Terminal */}
              <motion.g
                animate={{ x: exploded ? 60 : 0 }}
                transition={{ duration: 0.6 }}
                className="cursor-pointer"
                onClick={() => setSelectedPartId('com')}
              >
                <rect
                  x="620"
                  y="75"
                  width="100"
                  height="34"
                  rx="6"
                  fill="#581c87"
                  stroke={selectedPartId === 'com' ? '#c084fc' : '#a855f7'}
                  strokeWidth={selectedPartId === 'com' ? '3' : '1.5'}
                />
                <text x="645" y="97" fill="#f3e8ff" fontWeight="bold" fontSize="13" fontFamily="monospace">COM</text>
                <circle cx="620" cy="92" r="5" fill="#c084fc" />
              </motion.g>

              {/* NC Contact (Upper) */}
              <motion.g
                animate={{ x: exploded ? 60 : 0, y: exploded ? -30 : 0 }}
                transition={{ duration: 0.6 }}
                className="cursor-pointer"
                onClick={() => setSelectedPartId('nc')}
              >
                <line x1="520" y1="168" x2="620" y2="168" stroke="#ef4444" strokeWidth="3" />
                <circle cx="520" cy="168" r="7" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
                <rect
                  x="620"
                  y="150"
                  width="100"
                  height="34"
                  rx="6"
                  fill="#7f1d1d"
                  stroke={selectedPartId === 'nc' ? '#f87171' : '#ef4444'}
                  strokeWidth={selectedPartId === 'nc' ? '3' : '1.5'}
                />
                <text x="650" y="172" fill="#fee2e2" fontWeight="bold" fontSize="13" fontFamily="monospace">NC</text>
              </motion.g>

              {/* NO Contact (Lower) */}
              <motion.g
                animate={{ x: exploded ? 60 : 0, y: exploded ? 30 : 0 }}
                transition={{ duration: 0.6 }}
                className="cursor-pointer"
                onClick={() => setSelectedPartId('no')}
              >
                <line x1="520" y1="230" x2="620" y2="230" stroke="#10b981" strokeWidth="3" />
                <circle cx="520" cy="230" r="7" fill="#10b981" stroke="#6ee7b7" strokeWidth="2" />
                <rect
                  x="620"
                  y="215"
                  width="100"
                  height="34"
                  rx="6"
                  fill="#064e3b"
                  stroke={selectedPartId === 'no' ? '#34d399' : '#10b981'}
                  strokeWidth={selectedPartId === 'no' ? '3' : '1.5'}
                />
                <text x="650" y="237" fill="#d1fae5" fontWeight="bold" fontSize="13" fontFamily="monospace">NO</text>
              </motion.g>

              {/* Air Gap Indicator */}
              <line x1="520" y1="178" x2="520" y2="222" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
              <text x="532" y="204" fill="#94a3b8" fontSize="10" fontFamily="monospace">CONTACT AIR GAP</text>
            </svg>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
            <span>💡 Click any component in diagram or select from parts list</span>
            <span className="font-mono text-cyan-400">STATUS: {exploded ? 'DISASSEMBLED COMPONENT VIEW' : 'NORMAL ASSEMBLED STATE'}</span>
          </div>
        </div>

        {/* Right: Component Detail Cards & Selector */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400" />
              SELECT COMPONENT TO INSPECT
            </h3>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {RELAY_PARTS.map((part) => (
                <button
                  key={part.id}
                  onClick={() => setSelectedPartId(part.id)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all border ${
                    selectedPartId === part.id
                      ? 'bg-slate-800 text-white border-amber-500/80 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: part.color }}
                    />
                    <span className="truncate">{part.name.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPart.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedPart.color }}
                  />
                  <h4 className="font-bold text-white text-base">{selectedPart.name}</h4>
                </div>
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-3">
                  “{selectedPart.shortDesc}”
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {selectedPart.detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Terminal Guide Box */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4">
            <h4 className="text-xs font-mono font-bold text-slate-400 mb-2 uppercase">Relay Contacts Summary</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/60">
                <span className="text-purple-400 font-mono font-bold">COM (Common)</span>
                <span className="text-slate-400">Pivot point connected to power source</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/60">
                <span className="text-red-400 font-mono font-bold">NC (Normally Closed)</span>
                <span className="text-slate-400">Conducts at rest (Relay OFF)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800/60">
                <span className="text-emerald-400 font-mono font-bold">NO (Normally Open)</span>
                <span className="text-slate-400">Conducts when energized (Relay ON)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
