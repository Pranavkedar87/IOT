import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Zap, Radio, Clock, ChevronDown, Check } from 'lucide-react'

interface RelayTypeItem {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  headline: string
  operatingPrinciple: string
  typicalApplications: string
  advantages: string
}

const RELAY_TYPES: RelayTypeItem[] = [
  {
    id: 'emr',
    name: 'Electromechanical Relay (EMR)',
    icon: Zap,
    badge: 'OUR PROJECT SELECTION',
    headline: 'Physical movable armature triggered by magnetic coil',
    operatingPrinciple: 'Electromagnetic coil pulls a ferromagnetic armature to physically close or open electrical spring contacts (COM, NO, NC).',
    typicalApplications: 'Power motor switching, pump control systems, home automation, automotive starter relays.',
    advantages: 'True air-gap isolation, handles AC & DC loads, high surge tolerance, audible feedback, cost-effective.'
  },
  {
    id: 'ssr',
    name: 'Solid State Relay (SSR)',
    icon: Cpu,
    headline: 'Semiconductor switching using optocouplers and TRIACs/MOSFETs',
    operatingPrinciple: 'Uses optocoupled infrared LEDs and phototriacs/phototransistors to switch current with zero moving parts.',
    typicalApplications: 'High-frequency PWM heaters, industrial robotics, precision CNC machinery, medical electronics.',
    advantages: 'Completely silent, zero mechanical contact bounce, extremely fast microsecond switching speeds, long life.'
  },
  {
    id: 'reed',
    name: 'Reed Relay',
    icon: Radio,
    headline: 'Hermetically sealed ferromagnetic blades inside inert gas tube',
    operatingPrinciple: 'Two tiny overlapping magnetic reed contacts sealed in a glass envelope become magnetized and snap together when a coil energizes.',
    typicalApplications: 'RF test equipment, instrumentation matrices, telecommunications switching, low-signal audio routing.',
    advantages: 'Fast actuation (~0.5ms), immune to environmental contamination/corrosion, handles very low signal levels.'
  },
  {
    id: 'timer',
    name: 'Time / Delay Relay',
    icon: Clock,
    headline: 'Integrated timing circuit controlling contact activation delay',
    operatingPrinciple: 'Contains internal analog RC or digital micro-timer delays before switching contact positions (ON-delay or OFF-delay).',
    typicalApplications: 'HVAC compressor delay cycles, emergency generator startup sequences, conveyor belt sequencing.',
    advantages: 'Prevents motor short-cycling, sequences multi-stage industrial machinery without complex external timers.'
  }
]

export const RelayTypesSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('emr')

  return (
    <section id="section-relay-types" className="py-20 px-4 max-w-7xl mx-auto border-b border-slate-800">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          SECTION 05 • SUPPORTING KNOWLEDGE
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Types of Relays
        </h2>
        <p className="text-slate-400 mt-2 text-base">
          Comparison of modern relay topologies. Our syllabus benchmark utilizes the industry-standard Electromechanical Relay (EMR) module.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {RELAY_TYPES.map((type) => {
          const Icon = type.icon
          const isSelected = selectedId === type.id
          const isProject = type.id === 'emr'

          return (
            <motion.div
              key={type.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedId(type.id)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isProject
                  ? isSelected
                    ? 'bg-slate-900 border-amber-500 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-900/80 border-amber-500/50 hover:border-amber-400'
                  : isSelected
                    ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      isProject ? 'bg-amber-500/10 text-amber-400' : 'bg-cyan-500/10 text-cyan-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  {type.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {type.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{type.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{type.headline}</p>
              </div>

              <div>
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-slate-800 pt-3 mt-2 space-y-2 text-xs"
                    >
                      <div>
                        <span className="text-slate-400 font-semibold block text-[11px]">Principle:</span>
                        <p className="text-slate-300 text-xs">{type.operatingPrinciple}</p>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block text-[11px]">Key Advantages:</span>
                        <p className="text-slate-300 text-xs">{type.advantages}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-4 pt-2 border-t border-slate-800/60">
                  <span>{isSelected ? 'Expanded details' : 'Click to inspect'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-180 text-amber-400' : ''}`} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
