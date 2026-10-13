import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertTriangle, Lightbulb, SlidersHorizontal, ShieldAlert, Sparkles } from 'lucide-react'

export const AdvantagesLimitations: React.FC = () => {
  return (
    <section id="section-advantages" className="py-20 px-4 max-w-7xl mx-auto border-b border-slate-800">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
          SECTION 12 • ENGINEERING ANALYSIS
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Advantages, Limitations & Applications
        </h2>
        <p className="text-slate-400 mt-2 text-base">
          Balanced engineering evaluation of automatic relay-based motor switching and turbine flow sensing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-10">
        {/* ADVANTAGES */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-emerald-300">Advantages</h3>
            </div>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Automated Delivery:</strong> Completely eliminates continuous human monitoring and manual pump shutoff.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Galvanic Isolation:</strong> Relay contacts protect sensitive Arduino logic from high pump voltage/current spikes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Simplicity & Low Cost:</strong> Simple controller architecture utilizing accessible, modular standard electronics.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Modular & Scalable:</strong> Easily adapted to larger agricultural pumps, solonoid valves, or AC mains motors.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-emerald-900/30 border border-emerald-800/40 text-emerald-300 text-xs font-mono">
            Key Benefit: Reliable preset volume cutoff without water waste.
          </div>
        </div>

        {/* LIMITATIONS */}
        <div className="bg-red-950/20 border border-red-500/30 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-red-300">Limitations</h3>
            </div>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span><strong>Calibration Dependent:</strong> Pulse constant varies with viscosity, pipe diameter, and installation orientation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span><strong>Mechanical Wear:</strong> Relay spring and contacts experience mechanical wear over hundred-thousands of cycles.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span><strong>Flow Fluctuations:</strong> Air bubbles, cavitation, or pulsating flow can introduce pulse count inaccuracies.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕</span>
                <span><strong>Inertial Overrun:</strong> Fluid in transit right as the pump cuts off may add slight unmetered residual volume.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-red-900/30 border border-red-800/40 text-red-300 text-xs font-mono">
            Key Constraint: Must be calibrated in-situ for precise dosing.
          </div>
        </div>

        {/* APPLICATIONS */}
        <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-cyan-300">Applications</h3>
            </div>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Smart Water Dispensers:</strong> Touch-free automated filling of glasses, jugs, or containers to exact volume.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Batch Tank Filling:</strong> Automatically pumping a precise batch of liquid into mixing vessels.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Precision Irrigation:</strong> Supplying calibrated liters of water to agricultural rows or greenhouse pots.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Industrial Process Control:</strong> Dosing chemical solutions into wash tanks or treatment units.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-cyan-900/30 border border-cyan-800/40 text-cyan-300 text-xs font-mono">
            Practical Impact: Conserves clean water & protects motors.
          </div>
        </div>
      </div>

      {/* SELECTION FACTORS TABLE */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h3 className="text-sm font-mono font-bold text-slate-300 uppercase mb-4 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-amber-400" />
          KEY ENGINEERING SELECTION CRITERIA
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-amber-400 font-mono font-bold block mb-1">1. RELAY CONTACT RATING</span>
            <p className="text-slate-400">
              Ensure contact voltage/current (e.g. 10A @ 250VAC) exceeds inductive startup motor inrush current by at least 2-3x factor.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-cyan-400 font-mono font-bold block mb-1">2. SENSOR FLOW VELOCITY RANGE</span>
            <p className="text-slate-400">
              Sensor operational envelope (e.g., 1-30 L/min) must match pump flow discharge; below min flow, turbine stalls.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-emerald-400 font-mono font-bold block mb-1">3. FLOW STABILITY & TURBULENCE</span>
            <p className="text-slate-400">
              Provide straight pipe runs before and after flow meter to avoid vortices and false pulse counts.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-purple-400 font-mono font-bold block mb-1">4. PUMP ELECTRICAL RATINGS</span>
            <p className="text-slate-400">
              Verify DC pump operating voltage (12V vs 5V) and power source ampacity; do not power pump directly from Arduino 5V rail.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-pink-400 font-mono font-bold block mb-1">5. TUBING & FITTING COMPATIBILITY</span>
            <p className="text-slate-400">
              Check pipe internal diameter (ID), hose barbs, and clamp tightness to prevent air ingress and hydraulic leaks.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-blue-400 font-mono font-bold block mb-1">6. CALIBRATION CONSTANT (K-FACTOR)</span>
            <p className="text-slate-400">
              Empirically calibrate pulses-per-litre using a graduated cylinder for the exact fluid and hardware assembly.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
