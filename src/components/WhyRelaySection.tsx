import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, ShieldAlert, ShieldCheck, Cpu, Zap } from 'lucide-react'

export const WhyRelaySection: React.FC = () => {
  return (
    <section id="section-why-relay" className="py-20 px-4 max-w-7xl mx-auto border-b border-slate-800">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          SECTION 04 • SYSTEM RATIONALE
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Why Not Drive the Pump Directly from Arduino?
        </h2>
        <p className="text-slate-400 mt-2 text-base">
          A fundamental syllabus question: Can microcontrollers power electric motors directly from their output pins?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-10">
        {/* Direct Drive - UNSAFE / FAILED */}
        <div className="bg-red-950/20 border-2 border-red-500/30 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="absolute top-4 right-4 bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-mono px-2.5 py-1 rounded-full flex items-center gap-1.5 font-bold">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            DIRECT DRIVE: DANGEROUS / BURNOUT
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/40 flex items-center justify-center text-red-400 font-bold">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-200">Direct Arduino ➔ DC Pump</h3>
                <p className="text-red-400/80 text-xs font-mono">Attempting GPIO direct motor power</p>
              </div>
            </div>

            {/* Visual Diagram Direct */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-red-900/40 mb-6 font-mono text-xs flex items-center justify-center gap-3 text-slate-300">
              <div className="text-center p-2 rounded bg-slate-900 border border-slate-700">
                <div className="text-cyan-400 font-bold">Arduino Pin</div>
                <div className="text-[10px] text-slate-400">Max 20–40mA @ 5V</div>
              </div>
              <div className="text-red-500 font-bold text-lg animate-pulse">➔ ✕ ➔</div>
              <div className="text-center p-2 rounded bg-slate-900 border border-slate-700">
                <div className="text-amber-400 font-bold">DC Motor Pump</div>
                <div className="text-[10px] text-slate-400">Needs 500mA–2000mA</div>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕ Current Overload:</span>
                <span>Arduino ATmega328P pins can safely supply max <strong>20 mA</strong> (absolute max 40 mA). Pumps draw <strong>500 mA to 2000 mA</strong> or more.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕ Inductive Kickback (Back-EMF):</span>
                <span>Motor coils generate destructive high-voltage inductive spikes when switching off, destroying the microcontroller pin transistors instantly.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">✕ Voltage Mismatch:</span>
                <span>Pumps often require 12V DC or 24V DC, which an Arduino 5V logic pin cannot directly supply.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-red-900/30 border border-red-800/50 text-red-300 text-xs font-mono">
            <strong>RESULT:</strong> Microcontroller pin burns out permanently; motor fails to spin.
          </div>
        </div>

        {/* Relay Isolated Drive - PROPER ENGINEERING */}
        <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="absolute top-4 right-4 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-mono px-2.5 py-1 rounded-full flex items-center gap-1.5 font-bold">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            ENGINEERED WITH RELAY INTERFACE
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-200">Arduino ➔ Relay Module ➔ Pump</h3>
                <p className="text-emerald-400/80 text-xs font-mono">Galvanically isolated switching interface</p>
              </div>
            </div>

            {/* Visual Diagram Relay */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-900/40 mb-6 font-mono text-xs flex items-center justify-center gap-2 text-slate-300">
              <div className="text-center p-2 rounded bg-slate-900 border border-slate-700">
                <div className="text-cyan-400 font-bold">Arduino</div>
                <div className="text-[10px] text-slate-400">5V Logic Signal</div>
              </div>
              <div className="text-emerald-400 font-bold text-base">➔</div>
              <div className="text-center p-2 rounded bg-amber-950/60 border border-amber-600/60">
                <div className="text-amber-400 font-bold">Relay Interface</div>
                <div className="text-[10px] text-slate-300">Galvanic Isolation</div>
              </div>
              <div className="text-emerald-400 font-bold text-base">➔</div>
              <div className="text-center p-2 rounded bg-slate-900 border border-slate-700">
                <div className="text-emerald-400 font-bold">DC Pump</div>
                <div className="text-[10px] text-slate-400">External Power</div>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓ Complete Galvanic Isolation:</span>
                <span>The low-voltage control circuit and the high-current load circuit share no direct electrical connection. Physical air gaps prevent electrical interference.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓ High Current & Voltage Handling:</span>
                <span>Relay contacts are rated to switch 10A at 250V AC or 30V DC, easily managing the pump motor inrush current.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓ Integrated Flyback Protection:</span>
                <span>Relay driver modules feature flyback freewheeling diodes and optocouplers to suppress back-EMF spikes safely.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-emerald-900/30 border border-emerald-800/50 text-emerald-300 text-xs font-mono">
            <strong>RESULT:</strong> Microcontroller remains fully protected; motor operates reliably at full rated power.
          </div>
        </div>
      </div>

      {/* Low-Power vs Switched-Load Architecture Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
        <div className="border-l-4 border-cyan-500 pl-4">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase">LOW-POWER CONTROL SIDE</div>
          <div className="text-sm font-semibold text-white mt-1">Arduino Uno ➔ Relay Input Terminal (IN, VCC, GND)</div>
          <p className="text-xs text-slate-400 mt-1">
            Operates at 5V DC TTL logic level with negligible current draw (~15-20mA to trigger driver transistor).
          </p>
        </div>

        <div className="border-l-4 border-amber-500 pl-4">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase">SWITCHED LOAD SIDE</div>
          <div className="text-sm font-semibold text-white mt-1">Relay Contacts (COM, NO) ➔ External Supply & DC Pump</div>
          <p className="text-xs text-slate-400 mt-1">
            Dedicated circuit powered by an external 12V DC power supply capable of providing continuous operating current.
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-xs text-center">
        ⚠️ <strong>Engineering Safety Note:</strong> Always ensure the relay module contact rating (e.g. 10A 250VAC / 10A 30VDC) comfortably exceeds the maximum startup stall current of the connected pump motor.
      </div>
    </section>
  )
}
