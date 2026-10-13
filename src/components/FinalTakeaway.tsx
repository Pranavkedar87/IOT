import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, CheckCircle2, BookOpen } from 'lucide-react'

export const FinalTakeaway: React.FC = () => {
  const steps = [
    { title: 'RELAY CONSTRUCTION', sub: 'Coil, Iron Core, Armature, Spring, COM, NC, NO' },
    { title: 'RELAY OPERATION', sub: 'Electromagnetic Field attracts Armature (COM ➔ NO)' },
    { title: 'FLOW SENSOR INPUT', sub: 'Fluid motion generates discrete Hall-effect pulses' },
    { title: 'ARDUINO DECISION', sub: 'Interrupt counting evaluates target volume limit' },
    { title: 'RELAY SWITCHING', sub: 'Low logic triggers spring return, opening contact' },
    { title: 'PUMP CONTROL', sub: 'DC pump safely disconnected with zero fluid overflow' },
    { title: 'REAL HARDWARE', sub: 'Classroom demonstration benchtop prototype' }
  ]

  return (
    <section id="section-takeaway" className="py-20 px-4 max-w-7xl mx-auto border-b border-slate-800">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          SECTION 14 • SUMMARY & REFERENCES
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Concept ➔ Simulation ➔ Hardware
        </h2>
        <p className="text-slate-400 mt-2 text-base">
          End-to-end synergy: from the fundamental physics of electromechanical relays to real-world embedded fluid automation.
        </p>
      </div>

      {/* Vertical Concept Flow Architecture */}
      <div className="max-w-xl mx-auto mb-14">
        {steps.map((s, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-center shadow-lg transition-transform hover:scale-[1.02]">
              <div className="text-xs font-mono font-bold text-amber-400">{s.title}</div>
              <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>
            </div>

            {idx < steps.length - 1 && (
              <div className="py-2 flex items-center justify-center text-cyan-400">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Final Statement Card */}
      <div className="max-w-3xl mx-auto bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-cyan-500/30 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden mb-12">
        <div className="text-lg md:text-xl font-bold text-white leading-relaxed mb-4">
          “Sensor-based automation can make water-pumping systems safer, simpler, and less dependent on manual operation.”
        </div>
        <p className="text-xs font-mono text-cyan-400">
          Small Control Signal (5V Arduino) ➔ Relay Switching (Galvanic Isolation) ➔ High-Power Motor Control
        </p>
      </div>

      {/* College Presentation References */}
      <div className="max-w-3xl mx-auto bg-slate-950 border border-slate-800 rounded-2xl p-6 text-xs text-slate-400 space-y-2">
        <div className="font-mono font-bold text-slate-300 uppercase mb-2">SYLLABUS & TECHNICAL REFERENCES:</div>
        <ul className="list-disc list-inside space-y-1.5 font-mono text-[11px]">
          <li>Unit IV & V: Sensors and Actuation Systems — Topic 18: Automatic Motor Switching Using a Relay</li>
          <li>W. Bolton, <em>Mechatronics: Electronic Control Systems in Mechanical and Electrical Engineering</em>, Pearson Education.</li>
          <li>Paul Horowitz & Winfield Hill, <em>The Art of Electronics (3rd Edition)</em> — Relays & Transistor Coil Snubbers.</li>
          <li>ATmega328P 8-bit AVR Microcontroller Datasheet — External Interrupts & GPIO Current Ratings.</li>
        </ul>
      </div>

      <div className="mt-14 text-center">
        <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Thank You</h3>
        <p className="text-slate-400 text-sm">Questions & Discussion Welcome</p>
      </div>
    </section>
  )
}
