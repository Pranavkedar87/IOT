import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight, ListOrdered } from 'lucide-react'
import { TEN_STEP_PROCESS } from '../data/labData'

export const StepByStepWorking: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1)

  return (
    <section id="section-step-working" className="py-20 px-4 max-w-7xl mx-auto border-b border-slate-800">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          <ListOrdered className="w-3.5 h-3.5 text-cyan-400" />
          SECTION 10 • SEQUENCE OF OPERATIONS
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          10-Step Working Sequence
        </h2>
        <p className="text-slate-400 mt-2 text-base">
          End-to-end chronological execution sequence from user start command to automatic electromagnetic relay shutoff.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step Selector Timeline List */}
        <div className="lg:col-span-7 space-y-3">
          {TEN_STEP_PROCESS.map((item) => {
            const isActive = activeStep === item.step
            const isCompleted = activeStep > item.step

            return (
              <motion.div
                key={item.step}
                whileHover={{ x: 4 }}
                onClick={() => setActiveStep(item.step)}
                className={`cursor-pointer p-4 rounded-xl border transition-all flex items-start gap-4 ${
                  isActive
                    ? 'bg-slate-900 border-amber-500/80 shadow-lg shadow-amber-500/10'
                    : isCompleted
                      ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-950/40 border-slate-900 text-slate-500 hover:border-slate-800'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950'
                      : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-900 text-slate-500'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : item.step}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`font-semibold text-sm ${
                        isActive ? 'text-amber-400 font-bold' : isCompleted ? 'text-slate-200' : 'text-slate-400'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90 text-amber-400' : 'text-slate-600'}`} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Dynamic Detail Card for selected step */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="font-mono text-xs text-cyan-400 font-bold">
                STEP {activeStep} OF 10 DETAIL
              </span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                {activeStep <= 2 ? 'PHASE 1: STARTUP' : activeStep <= 7 ? 'PHASE 2: FLUID & SENSING' : 'PHASE 3: TRIP & CUTOFF'}
              </span>
            </div>

            <div className="text-lg font-bold text-white mb-2">
              {TEN_STEP_PROCESS[activeStep - 1].title}
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {TEN_STEP_PROCESS[activeStep - 1].desc}
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">RELAY COIL:</span>
                <span className={activeStep >= 2 && activeStep <= 8 ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {activeStep >= 2 && activeStep <= 8 ? 'ENERGIZED (5V ACTIVE)' : 'DE-ENERGIZED (0V)'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">CONTACT STATE:</span>
                <span className={activeStep >= 2 && activeStep <= 8 ? 'text-amber-400 font-bold' : 'text-slate-500'}>
                  {activeStep >= 2 && activeStep <= 8 ? 'COM ➔ NO (PUMP ON)' : 'COM ➔ NC (REST)'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">DC WATER PUMP:</span>
                <span className={activeStep >= 2 && activeStep <= 8 ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                  {activeStep >= 2 && activeStep <= 8 ? 'PUMP RUNNING' : 'PUMP OFF'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">FLOW SENSOR:</span>
                <span className={activeStep >= 3 && activeStep <= 8 ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                  {activeStep >= 3 && activeStep <= 8 ? 'PULSING ACTIVE' : 'NO FLOW'}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                disabled={activeStep <= 1}
                onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 disabled:opacity-30"
              >
                ◀ PREV STEP
              </button>
              <span className="text-xs font-mono text-slate-500">{activeStep}/10</span>
              <button
                disabled={activeStep >= 10}
                onClick={() => setActiveStep((s) => Math.min(10, s + 1))}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-mono font-bold hover:bg-amber-400 disabled:opacity-30"
              >
                NEXT STEP ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
