import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Droplet, Play, Pause, Waves, Compass, Activity, Info } from 'lucide-react'

export const WaterFlowSensorSection: React.FC = () => {
  const [flowing, setFlowing] = useState<boolean>(true)
  const [flowSpeed, setFlowSpeed] = useState<number>(3) // 1 to 5

  return (
    <section id="section-water-flow-sensor" className="py-20 px-4 max-w-7xl mx-auto border-b border-slate-800">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
            <Droplet className="w-3.5 h-3.5 text-cyan-400" />
            SECTION 06 • SUPPORTING SENSOR
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Supporting Sensor — Water Flow Sensor
          </h2>
          <p className="text-slate-400 mt-2 max-w-2xl text-base">
            The water flow sensor is <strong>NOT</strong> the main syllabus device; it is the sensing and input interface providing pulse feedback to the controller.
          </p>
        </div>

        <div className="p-3 bg-amber-950/30 border border-amber-600/30 rounded-xl text-amber-300 text-xs font-mono max-w-xs">
          ⚠️ <strong>Key Syllabus Distinction:</strong> Measures dynamic liquid volumetric flow / velocity — <strong>NOT</strong> static water level!
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Animated Flow Sensor Pipe Chamber */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between backdrop-blur tech-grid shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <span className="font-mono text-xs text-slate-400">CUTAWAY VIEW: TURBINE HALL SENSOR CHAMBER</span>
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${flowing ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'}`} />
              <span className="font-mono text-xs text-cyan-300">
                {flowing ? `PULSING ACTIVE (${flowSpeed * 15} Hz)` : 'FLOW HALTED (0 Hz)'}
              </span>
            </div>
          </div>

          {/* SVG Pipe cutaway */}
          <div className="relative w-full aspect-[16/9] max-h-[420px] flex items-center justify-center">
            <svg viewBox="0 0 800 400" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="pipeWall" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="50%" stopColor="#64748b" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>

              {/* Outer Pipe Body */}
              <rect x="40" y="140" width="720" height="120" rx="14" fill="#0f172a" stroke="#334155" strokeWidth="4" />
              {/* Pipe flanges */}
              <rect x="20" y="125" width="30" height="150" rx="4" fill="url(#pipeWall)" stroke="#475569" strokeWidth="2" />
              <rect x="750" y="125" width="30" height="150" rx="4" fill="url(#pipeWall)" stroke="#475569" strokeWidth="2" />

              {/* Water Channel Stream */}
              {flowing && (
                <rect x="50" y="155" width="700" height="90" fill="url(#waterGrad)" rx="6" />
              )}

              {/* Flow direction animated arrows */}
              {flowing && (
                <g className="animate-flow-dash">
                  {[100, 180, 260, 540, 620, 700].map((x, i) => (
                    <path
                      key={i}
                      d={`M ${x} 200 L ${x + 25} 200 M ${x + 15} 190 L ${x + 25} 200 L ${x + 15} 210`}
                      fill="none"
                      stroke="#bae6fd"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  ))}
                </g>
              )}

              {/* Rotor Housing Chamber (Center bulb) */}
              <circle cx="400" cy="200" r="95" fill="#0b1329" stroke="#0284c7" strokeWidth="3" />
              <circle cx="400" cy="200" r="85" fill="#0369a1" fillOpacity={flowing ? '0.35' : '0.1'} />

              {/* Hall-Effect Sensor IC Block on top of chamber */}
              <g>
                <rect x="360" y="60" width="80" height="45" rx="6" fill="#090e17" stroke="#38bdf8" strokeWidth="2" />
                <text x="368" y="85" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">HALL IC</text>
                <text x="368" y="98" fill="#94a3b8" fontSize="8" fontFamily="monospace">DETECTOR</text>

                {/* Signal output wire to Arduino */}
                <path
                  d="M 440 82 L 560 82 L 560 40 L 680 40"
                  fill="none"
                  stroke={flowing ? '#38bdf8' : '#475569'}
                  strokeWidth="3"
                  strokeDasharray={flowing ? '5,3' : 'none'}
                />
                <circle cx="680" cy="40" r="4" fill="#38bdf8" />
                <text x="570" y="32" fill="#38bdf8" fontSize="11" fontFamily="monospace">
                  {flowing ? 'DIGITAL PULSES (0-5V)' : 'NO PULSES (0V)'}
                </text>
              </g>

              {/* Pinwheel Rotor & Blades */}
              <motion.g
                animate={{ rotate: flowing ? 360 : 0 }}
                transition={{
                  repeat: Infinity,
                  duration: flowing ? 1.8 / flowSpeed : 0,
                  ease: 'linear'
                }}
                style={{ originX: '400px', originY: '200px' }}
              >
                {/* 6 Turbine Blades */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <g key={i} transform={`rotate(${deg} 400 200)`}>
                    <path
                      d="M 400 200 C 420 170, 440 140, 435 125 C 420 130, 410 150, 400 200"
                      fill="#38bdf8"
                      stroke="#bae6fd"
                      strokeWidth="1.5"
                    />
                  </g>
                ))}

                {/* Central Rotor Hub */}
                <circle cx="400" cy="200" r="28" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />

                {/* Permanent Magnet embedded in one blade tip */}
                <circle cx="430" cy="130" r="7" fill="#ef4444" stroke="#fecaca" strokeWidth="2" />
                <text x="440" y="132" fill="#ef4444" fontSize="9" fontFamily="monospace" fontWeight="bold">N-S</text>
              </motion.g>

              {/* Label Water Flow Direction */}
              <text x="90" y="245" fill="#7dd3fc" fontSize="12" fontFamily="monospace" fontWeight="bold">
                WATER INLET ➔
              </text>
              <text x="640" y="245" fill="#7dd3fc" fontSize="12" fontFamily="monospace" fontWeight="bold">
                ➔ OUTLET
              </text>
            </svg>
          </div>

          {/* Controls Bar */}
          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFlowing(!flowing)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  flowing
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
                    : 'bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400'
                }`}
              >
                {flowing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {flowing ? 'HALT FLUID FLOW' : 'RESUME WATER FLOW'}
              </button>

              <div className="flex items-center gap-2 pl-4 border-l border-slate-800 text-xs">
                <span className="text-slate-400">Flow Velocity:</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={flowSpeed}
                  onChange={(e) => setFlowSpeed(Number(e.target.value))}
                  disabled={!flowing}
                  className="w-24 accent-cyan-400 cursor-pointer"
                />
                <span className="font-mono text-cyan-300 w-8">{flowSpeed}x</span>
              </div>
            </div>

            <div className="text-xs font-mono text-slate-400">
              PULSE FREQUENCY: <span className="text-cyan-400 font-bold">{flowing ? flowSpeed * 15 : 0} Hz</span>
            </div>
          </div>
        </div>

        {/* Right: Working Principle Flow & Explanations */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              TRANSLATION PIPELINE
            </h3>

            {/* Step Pipeline Box */}
            <div className="space-y-2">
              {[
                { title: '1. WATER FLOW', desc: 'Moving liquid creates dynamic kinetic pressure' },
                { title: '2. ROTOR ROTATION', desc: 'Internal pinwheel turbine spins proportionally to flow rate' },
                { title: '3. MAGNETIC TRIGGER', desc: 'Embedded permanent magnet sweeps past Hall IC sensor' },
                { title: '4. SQUARE-WAVE PULSES', desc: 'Hall effect produces discrete 5V logic pulses' },
                { title: '5. ARDUINO INTERRUPT', desc: 'Microcontroller hardware interrupt counts pulse frequency' }
              ].map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white font-mono">{step.title}</div>
                    <div className="text-[11px] text-slate-400">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400" />
              ENGINEERING NOTE
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed">
              Higher fluid flow produces more pulses per unit time. The Arduino accumulates these pulses and divides by the calibration factor to estimate real-time dispensed liquid volume.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
