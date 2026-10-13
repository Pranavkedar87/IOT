import React from 'react'
import { Zap, Power } from 'lucide-react'

interface RelayLabProps {
  relayEnergized: boolean
  onToggleEnergize: (energized: boolean) => void
}

export const RelayLab: React.FC<RelayLabProps> = ({
  relayEnergized,
  onToggleEnergize
}) => {
  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch mb-3">
      {/* ================= MAIN INTERACTIVE WORKSPACE (ENLARGED RELAY RIG) ================= */}
      <div className="lg:col-span-9 flex flex-col">
        <div className="relative w-full aspect-[16/10] max-h-[620px] bg-[#141a24] bench-mat rounded-xl border border-[#232d3d] shadow-2xl overflow-hidden p-3 flex items-center justify-center">
          <svg
            viewBox="0 0 1000 600"
            className="w-full h-full select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="relayIronCoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>

              <linearGradient id="relayCoilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="50%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>

              <radialGradient id="lampGlowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
                <stop offset="40%" stopColor="#facc15" stopOpacity="0.8" />
                <stop offset="80%" stopColor="#eab308" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
              </radialGradient>

              <filter id="naturalShadowRelay" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* Background Engineering Markings */}
            <g opacity="0.35">
              <text x="35" y="35" fill="#64748b" fontSize="11" fontFamily="monospace" fontWeight="bold">
                ELECTROMECHANICAL RELAY LABORATORY — TOPIC 18
              </text>
              <text x="35" y="50" fill="#475569" fontSize="9" fontFamily="monospace">
                CHANGEOVER (SPDT) CONTACT MECHANISM & LOW-VOLTAGE LAMP CIRCUIT
              </text>
            </g>

            {/* ================= LEFT SECTION: PHYSICAL RELAY MODULE REPRESENTATION ================= */}
            <g filter="url(#naturalShadowRelay)" transform="translate(60, 110)">
              {/* Outer PCB Base Plate */}
              <rect x="0" y="0" width="220" height="340" rx="8" fill="#0f1722" stroke="#2563eb" strokeWidth="2" />
              <text x="110" y="30" fill="#60a5fa" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
                RELAY MODULE
              </text>
              <text x="110" y="44" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                MODULE BOARD LAYOUT
              </text>

              {/* Blue Relay Enclosure Cube */}
              <rect x="25" y="65" width="170" height="150" rx="5" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="110" y="98" fill="#ffffff" fontSize="13" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                RELAY MODULE
              </text>
              <text x="110" y="118" fill="#e0f2fe" fontSize="9.5" fontFamily="monospace" textAnchor="middle">
                SPDT CHANGEOVER
              </text>
              <text x="110" y="195" fill="#fef08a" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                {relayEnergized ? 'COIL ENERGIZED' : 'COIL DE-ENERGIZED'}
              </text>

              {/* Status Indicator LEDs on Module PCB */}
              <g transform="translate(45, 235)">
                <circle cx="10" cy="10" r="4" fill="#ef4444" />
                <text x="22" y="13" fill="#f87171" fontSize="8" fontFamily="monospace">PWR LED</text>

                <circle
                  cx="90"
                  cy="10"
                  r="5"
                  fill={relayEnergized ? '#10b981' : '#334155'}
                  stroke={relayEnergized ? '#34d399' : '#1e293b'}
                  strokeWidth="1"
                />
                <text
                  x="102"
                  y="13"
                  fill={relayEnergized ? '#34d399' : '#64748b'}
                  fontSize="8"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  STATE: {relayEnergized ? 'ON' : 'OFF'}
                </text>
              </g>

              {/* Control Input Header Pins */}
              <g transform="translate(45, 280)">
                <rect x="0" y="0" width="130" height="34" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                <circle cx="25" cy="17" r="3" fill="#facc15" />
                <text x="25" y="30" fill="#facc15" fontSize="7" fontFamily="monospace" textAnchor="middle">VCC</text>

                <circle cx="65" cy="17" r="3" fill="#38bdf8" />
                <text x="65" y="30" fill="#38bdf8" fontSize="7" fontFamily="monospace" textAnchor="middle">GND</text>

                <circle cx="105" cy="17" r="3" fill={relayEnergized ? '#10b981' : '#64748b'} />
                <text x="105" y="30" fill={relayEnergized ? '#10b981' : '#64748b'} fontSize="7" fontFamily="monospace" textAnchor="middle">IN</text>
              </g>
            </g>

            {/* ================= CENTER SECTION: ENLARGED INTERNAL RELAY MECHANISM ================= */}
            <g filter="url(#naturalShadowRelay)" transform="translate(330, 80)">
              {/* Internal Chamber Cutout Frame */}
              <rect x="0" y="0" width="370" height="420" rx="10" fill="#0b111c" stroke="#334155" strokeWidth="2" />
              <text x="185" y="28" fill="#e2e8f0" fontSize="12" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
                SIMPLIFIED CHANGEOVER CONTACT MECHANISM
              </text>
              <text x="185" y="44" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">
                (SCHEMATIC REPRESENTATION · NOT AN EXACT MODULE CUTAWAY)
              </text>

              {/* Ferromagnetic Iron Core and Yoke */}
              <rect x="50" y="110" width="40" height="190" rx="4" fill="url(#relayIronCoreGrad)" stroke="#475569" strokeWidth="1.5" />
              <rect x="40" y="90" width="60" height="20" rx="3" fill="#475569" stroke="#64748b" strokeWidth="1" />
              <rect x="40" y="300" width="140" height="20" rx="3" fill="#334155" stroke="#475569" strokeWidth="1" />
              <text x="70" y="210" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle" transform="rotate(-90 70 210)">
                IRON CORE
              </text>

              {/* Copper Solenoid Coil windings around core */}
              <g>
                <rect
                  x="35"
                  y="125"
                  width="70"
                  height="160"
                  rx="6"
                  fill="url(#relayCoilGrad)"
                  stroke={relayEnergized ? '#f59e0b' : '#92400e'}
                  strokeWidth="2"
                />
                {[140, 155, 170, 185, 200, 215, 230, 245, 260].map((y) => (
                  <line
                    key={y}
                    x1="35"
                    y1={y}
                    x2="105"
                    y2={y}
                    stroke={relayEnergized ? '#fbbf24' : '#78350f'}
                    strokeWidth="2.5"
                    strokeDasharray={relayEnergized ? '6,3' : 'none'}
                  />
                ))}
                <text x="70" y="295" fill={relayEnergized ? '#fbbf24' : '#d97706'} fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                  COIL {relayEnergized ? '[ENERGIZED]' : '[DE-ENERGIZED]'}
                </text>
              </g>

              {/* Magnetic Field Flux lines when energized */}
              {relayEnergized && (
                <g opacity="0.85">
                  <path
                    d="M 110 120 C 160 120, 160 280, 110 280"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                  <path
                    d="M 110 140 C 145 140, 145 260, 110 260"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                  />
                  <text x="145" y="205" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                    MAGNETIC FLUX
                  </text>
                </g>
              )}

              {/* Pivoted Movable Armature */}
              <g>
                {/* Armature Pivot Point */}
                <circle cx="170" cy="300" r="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="170" y="325" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  PIVOT
                </text>

                {/* Return Spring (Restores armature to NC rest position) */}
                <path
                  d={
                    relayEnergized
                      ? 'M 190 200 C 220 200, 230 250, 235 290'
                      : 'M 205 200 C 225 200, 230 250, 235 290'
                  }
                  fill="none"
                  stroke="#f472b6"
                  strokeWidth="2.5"
                  strokeDasharray="3,3"
                />
                <text x="245" y="245" fill="#f472b6" fontSize="8" fontFamily="monospace">
                  SPRING
                </text>

                {/* Movable Armature Bar: At rest = COM to NC; When energized = COM to NO */}
                <line
                  x1="170"
                  y1="300"
                  x2={relayEnergized ? '120' : '170'}
                  y2="90"
                  stroke="#cbd5e1"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />

                {/* Movable Contact Blade extending to terminals */}
                <line
                  x1={relayEnergized ? '120' : '170'}
                  y1="90"
                  x2="275"
                  y2={relayEnergized ? 170 : 100}
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />

                {/* Moving Contact Silver Tip */}
                <circle
                  cx="275"
                  cy={relayEnergized ? 170 : 100}
                  r="5.5"
                  fill="#ffffff"
                  stroke="#0284c7"
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />
              </g>

              {/* Station Contacts and Terminals Block */}
              {/* COM (Common Terminal) */}
              <g transform="translate(290, 220)">
                <rect x="0" y="0" width="70" height="30" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <circle cx="15" cy="15" r="4" fill="#38bdf8" />
                <text x="26" y="19" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold">COM</text>
                {/* Flexible wire to moving contact */}
                <path
                  d={`M 0 15 C -40 15, -40 ${relayEnergized ? 170 - 220 : 100 - 220}, -15 ${relayEnergized ? 170 - 220 : 100 - 220}`}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeDasharray="4,2"
                />
              </g>

              {/* NC Contact (Normally Closed - Top Rest Position) */}
              <g transform="translate(290, 85)">
                <rect
                  x="0"
                  y="0"
                  width="70"
                  height="30"
                  rx="3"
                  fill="#1e293b"
                  stroke={!relayEnergized ? '#ef4444' : '#475569'}
                  strokeWidth="1.5"
                />
                <circle cx="15" cy="15" r="4" fill={!relayEnergized ? '#ef4444' : '#64748b'} />
                <text x="26" y="19" fill={!relayEnergized ? '#ef4444' : '#94a3b8'} fontSize="10" fontFamily="monospace" fontWeight="bold">NC</text>
                <circle cx="-15" cy="15" r="5" fill="#ffffff" stroke={!relayEnergized ? '#ef4444' : '#64748b'} strokeWidth="1" />
                <text x="-40" y="10" fill="#94a3b8" fontSize="7" fontFamily="monospace">REST</text>
              </g>

              {/* NO Contact (Normally Open - Bottom Active Position) */}
              <g transform="translate(290, 155)">
                <rect
                  x="0"
                  y="0"
                  width="70"
                  height="30"
                  rx="3"
                  fill="#1e293b"
                  stroke={relayEnergized ? '#10b981' : '#475569'}
                  strokeWidth="1.5"
                />
                <circle cx="15" cy="15" r="4" fill={relayEnergized ? '#10b981' : '#64748b'} />
                <text x="26" y="19" fill={relayEnergized ? '#10b981' : '#94a3b8'} fontSize="10" fontFamily="monospace" fontWeight="bold">NO</text>
                <circle cx="-15" cy="15" r="5" fill="#ffffff" stroke={relayEnergized ? '#10b981' : '#64748b'} strokeWidth="1" />
                <text x="-40" y="24" fill={relayEnergized ? '#34d399' : '#64748b'} fontSize="7" fontFamily="monospace">ACTIVE</text>
              </g>
            </g>

            {/* ================= RIGHT SECTION: LOW-VOLTAGE INDICATOR LAMP CIRCUIT ================= */}
            <g filter="url(#naturalShadowRelay)" transform="translate(740, 100)">
              {/* Circuit Panel Enclosure */}
              <rect x="0" y="0" width="220" height="380" rx="8" fill="#0f1722" stroke="#334155" strokeWidth="1.5" />
              <text x="110" y="30" fill="#e2e8f0" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
                LOW-VOLTAGE LOAD CIRCUIT
              </text>
              <text x="110" y="44" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                (ISOLATED DC LAMP)
              </text>

              {/* Isolated DC Power Supply */}
              <g transform="translate(35, 70)">
                <rect x="0" y="0" width="150" height="60" rx="5" fill="#1e293b" stroke="#475569" strokeWidth="1" />
                <text x="75" y="25" fill="#cbd5e1" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
                  DC POWER SUPPLY
                </text>
                <text x="75" y="38" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  (ISOLATED LOAD SUPPLY)
                </text>
                {/* Terminals (+) & GND */}
                <circle cx="30" cy="48" r="4" fill="#ef4444" />
                <text x="30" y="58" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle">(+)</text>
                <circle cx="120" cy="48" r="4" fill="#334155" />
                <text x="120" y="58" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="middle">GND</text>
              </g>

              {/* Indicator Lamp Representation */}
              <g transform="translate(55, 175)">
                {/* Lamp glow effect when energized */}
                {relayEnergized && (
                  <circle cx="55" cy="45" r="45" fill="url(#lampGlowGrad)" />
                )}

                {/* Lamp Glass Bulb */}
                <circle
                  cx="55"
                  cy="45"
                  r="30"
                  fill={relayEnergized ? '#fef08a' : '#1e293b'}
                  stroke={relayEnergized ? '#facc15' : '#64748b'}
                  strokeWidth="2"
                />

                {/* Filament inside bulb */}
                <path
                  d="M 45 55 L 50 35 L 60 35 L 65 55"
                  fill="none"
                  stroke={relayEnergized ? '#ca8a04' : '#475569'}
                  strokeWidth="2"
                />

                {/* Lamp Base Collar */}
                <rect x="42" y="75" width="26" height="18" rx="2" fill="#64748b" stroke="#475569" strokeWidth="1" />
                <rect x="46" y="93" width="18" height="6" rx="1" fill="#334155" />

                <text x="55" y="125" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
                  INDICATOR LAMP
                </text>
                <text
                  x="55"
                  y="140"
                  fill={relayEnergized ? '#facc15' : '#64748b'}
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {relayEnergized ? '● ILLUMINATED (ON)' : '○ OFF (UNPOWERED)'}
                </text>
              </g>
            </g>

            {/* ================= CONNECTIVE WIRING ================= */}
            {/* Supply (+) connects to Relay COM */}
            <path
              d="M 805 218 C 760 270, 710 315, 660 315"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
            />
            <text x="735" y="305" fill="#f87171" fontSize="7.5" fontFamily="monospace">
              SUPPLY (+) ➔ COM
            </text>

            {/* Relay NO Contact connects to Lamp Lead */}
            <path
              d="M 660 250 C 720 250, 750 250, 795 250"
              fill="none"
              stroke={relayEnergized ? '#10b981' : '#475569'}
              strokeWidth="3"
              strokeDasharray={relayEnergized ? '5,3' : 'none'}
            />
            <text x="715" y="242" fill={relayEnergized ? '#34d399' : '#64748b'} fontSize="7.5" fontFamily="monospace" fontWeight="bold">
              NO ➔ LAMP
            </text>

            {/* Relay NC Contact connects to clearly labelled unused test post */}
            <path
              d="M 660 180 C 690 180, 710 180, 725 180"
              fill="none"
              stroke="#64748b"
              strokeWidth="1.5"
              strokeDasharray="3,3"
            />
            <text x="685" y="172" fill="#94a3b8" fontSize="7" fontFamily="monospace">
              NC (OPEN CIRCUIT)
            </text>

            {/* Lamp Return Lead connects to Supply GND */}
            <path
              d="M 850 350 C 890 350, 890 160, 895 160"
              fill="none"
              stroke="#334155"
              strokeWidth="2.5"
            />
          </svg>
        </div>

        {/* Informative Legend Bar beneath Relay Lab workbench */}
        <div className="mt-2 px-3 py-2 bg-[#121822] rounded-lg border border-[#1f2937] text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="text-slate-300">
              Changeover Principle: <span className="text-amber-400">Rest = COM➔NC</span> · <span className="text-emerald-400">Energized = COM➔NO</span>
            </span>
            <span className="text-slate-400">
              Galvanic Separation: Control Coil Isolated from Switched Load Circuit
            </span>
          </div>
          <div className="text-slate-400">
            Topic 18: Automatic Motor Switching Using a Relay
          </div>
        </div>
      </div>

      {/* ================= RIGHT CONTROLS & COMPACT STATUS TELEMETRY ================= */}
      <div className="lg:col-span-3 flex flex-col gap-3 justify-start max-h-[660px] overflow-y-auto pr-0.5">
        {/* Interactive Controls Panel */}
        <div className="bg-[#131922] border border-[#222e3f] rounded-xl p-4 shadow-lg">
          <div className="text-xs font-mono font-bold text-slate-300 uppercase mb-3 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Relay Actuation Controls
          </div>

          <div className="space-y-2">
            <button
              onClick={() => onToggleEnergize(true)}
              disabled={relayEnergized}
              className={`w-full py-3 px-4 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                relayEnergized
                  ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  : 'bg-amber-600 hover:bg-amber-500 text-slate-950 border border-amber-400'
              }`}
            >
              <Power className="w-4 h-4 fill-current" />
              ENERGIZE RELAY
            </button>

            <button
              onClick={() => onToggleEnergize(false)}
              disabled={!relayEnergized}
              className={`w-full py-3 px-4 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 border transition-all ${
                !relayEnergized
                  ? 'bg-[#18212e] text-slate-600 border-[#222e3f] cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-600'
              }`}
            >
              <Power className="w-4 h-4" />
              DE-ENERGIZE RELAY
            </button>
          </div>
        </div>

        {/* Compact Live Status Telemetry Box */}
        <div className="bg-[#131922] border border-[#222e3f] rounded-xl p-4 shadow-lg">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase mb-3">
            Compact Live Status
          </div>

          <div className="space-y-2 text-xs font-mono">
            {/* Coil State */}
            <div className="p-2.5 rounded bg-[#0e131b] border border-[#1b2533] flex items-center justify-between">
              <span className="text-slate-400">Coil State:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                  relayEnergized
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}
              >
                {relayEnergized ? 'ENERGIZED' : 'DE-ENERGIZED'}
              </span>
            </div>

            {/* Contact Position */}
            <div className="p-2.5 rounded bg-[#0e131b] border border-[#1b2533] flex items-center justify-between">
              <span className="text-slate-400">Contact Position:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                  relayEnergized
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                }`}
              >
                {relayEnergized ? 'COM ➔ NO' : 'COM ➔ NC'}
              </span>
            </div>

            {/* Indicator Lamp State */}
            <div className="p-2.5 rounded bg-[#0e131b] border border-[#1b2533] flex items-center justify-between">
              <span className="text-slate-400">Indicator Lamp:</span>
              <span
                className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                  relayEnergized
                    ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                    : 'bg-slate-800 text-slate-500 border border-slate-700'
                }`}
              >
                {relayEnergized ? 'ON (ILLUMINATED)' : 'OFF'}
              </span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-[#1b2533] text-[10px] text-slate-500 font-mono">
            At rest: COM connects to NC. Energized: COM connects to NO.
          </div>
        </div>
      </div>
    </div>
  )
}
