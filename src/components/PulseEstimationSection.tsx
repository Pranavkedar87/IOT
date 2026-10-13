import React from 'react'
import { motion } from 'framer-motion'
import { Calculator, ArrowRight, Info, Scale, Variable } from 'lucide-react'

export const PulseEstimationSection: React.FC = () => {
  return (
    <section id="section-pulse-estimation" className="py-20 px-4 max-w-7xl mx-auto border-b border-slate-800">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          <Calculator className="w-3.5 h-3.5 text-cyan-400" />
          SECTION 09 • TECHNICAL RELATIONSHIP & EQUATION
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          How the Quantity is Estimated
        </h2>
        <p className="text-slate-400 mt-2 text-base">
          Converting discrete microcontroller pulse counts to calibrated volumetric quantity delivered.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-8">
        {/* Core Equation 1 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase mb-4">
              <Variable className="w-4 h-4" />
              PRIMARY DISPENSING FORMULA
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center my-4">
              <div className="text-xl md:text-2xl font-mono font-bold text-cyan-300">
                Quantity (L) ≈ <span className="text-white">Pulses Counted</span> ÷ <span className="text-amber-400">K</span>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-2">
                where <span className="text-amber-400 font-bold">K</span> = Calibration Factor (Pulses per Litre)
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mt-4">
              The internal Hall sensor generates a fixed number of digital pulses per full rotation of the turbine pinwheel. The total accumulated volume is obtained by dividing the interrupt counter register by the empirical calibration constant.
            </p>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
            <strong>Arduino Logic:</strong> <code className="text-white bg-slate-900 px-1 py-0.5 rounded">float volume = (float)pulseCount / CALIBRATION_FACTOR;</code>
          </div>
        </div>

        {/* Core Equation 2 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase mb-4">
              <Scale className="w-4 h-4" />
              FLOW RATE INTEGRATION OVER TIME
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center my-4">
              <div className="text-xl md:text-2xl font-mono font-bold text-amber-300">
                Accumulated Quantity ≈ <span className="text-white">Flow Rate (Q)</span> × <span className="text-cyan-400">Δt</span>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-2">
                or in continuous calculus: <span className="text-white">V = ∫ Q(t) dt</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mt-4">
              Alternatively, the instantaneous flow velocity can be calculated from pulse frequency (Hz), and integrated over dispensing time.
            </p>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-amber-300 text-xs font-mono">
            <strong>Flow Rate:</strong> <code className="text-white bg-slate-900 px-1 py-0.5 rounded">float flowRate = (pulseFrequency / 7.5); // L/min illustrative</code>
          </div>
        </div>
      </div>

      {/* Illustrative Numerical Example Box */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="text-sm font-mono font-bold text-slate-300 uppercase flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400" />
            WORKED CALCULATION BENCHMARK
          </h3>
          <span className="text-xs font-mono px-3 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
            ILLUSTRATIVE EXAMPLE — NOT ACTUAL MEASURED DATA
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block">TARGET PRESET VOLUME:</span>
            <span className="text-lg font-bold text-white mt-1 block">1.00 Litre</span>
            <span className="text-slate-400 text-[11px]">Operator threshold limit</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block">ILLUSTRATIVE FLOW VELOCITY:</span>
            <span className="text-lg font-bold text-cyan-400 mt-1 block">~0.50 L/min</span>
            <span className="text-slate-400 text-[11px]">Fluid transit through sensor</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-slate-400 block">APPROXIMATE RUN DURATION:</span>
            <span className="text-lg font-bold text-emerald-400 mt-1 block">~2.00 Minutes (120 s)</span>
            <span className="text-slate-400 text-[11px]">Before automatic relay cutoff</span>
          </div>
        </div>

        <p className="text-slate-400 text-xs mt-4 italic">
          * Engineering Reality Note: Actual sensor behavior depends significantly on fluid viscosity, pipe diameter, laminar vs turbulent flow conditions, and mechanical installation orientation. Calibration must be carried out for each physical setup.
        </p>
      </div>
    </section>
  )
}
