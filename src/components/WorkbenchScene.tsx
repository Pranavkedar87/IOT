import React from 'react'

interface WorkbenchSceneProps {
  isRunning: boolean
  pumpRunning: boolean
  relayEnergized: boolean
  deliveredMl: number
  targetMl: number
  flowRateLpm: number
  pulseCount: number
}

export const WorkbenchScene: React.FC<WorkbenchSceneProps> = ({
  pumpRunning,
  relayEnergized,
  deliveredMl,
  targetMl,
  pulseCount
}) => {
  // Container fill height percentages
  const targetPercent = Math.min(100, Math.max(0, (deliveredMl / targetMl) * 100))
  // Reservoir drops slightly as water is pumped out
  const sourceRemainingMl = Math.max(0, 1500 - deliveredMl)
  const sourcePercent = Math.min(100, Math.max(10, (sourceRemainingMl / 1500) * 100))

  return (
    <div className="relative w-full aspect-[16/10] max-h-[620px] bg-[#141a24] bench-mat rounded-xl border border-[#232d3d] shadow-2xl overflow-hidden p-2 flex items-center justify-center">
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle natural gradients */}
          <linearGradient id="arduinoPcbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d5c75" />
            <stop offset="50%" stopColor="#08485e" />
            <stop offset="100%" stopColor="#06384a" />
          </linearGradient>

          <linearGradient id="relayModulePcb" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a2536" />
            <stop offset="50%" stopColor="#0f1722" />
          </linearGradient>

          <linearGradient id="srdRelayCube" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="70%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>

          <linearGradient id="pumpBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2c3540" />
            <stop offset="50%" stopColor="#1e2530" />
            <stop offset="100%" stopColor="#141922" />
          </linearGradient>

          <linearGradient id="flowSensorBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2b333e" />
            <stop offset="50%" stopColor="#1f2630" />
            <stop offset="100%" stopColor="#151b24" />
          </linearGradient>

          <linearGradient id="waterFluidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.95" />
          </linearGradient>

          <filter id="naturalShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* ================= LAB BENCH DETAILS & LABELS ================= */}
        <g opacity="0.35">
          <text x="30" y="35" fill="#64748b" fontSize="11" fontFamily="monospace" fontWeight="bold">
            AUTOMATIC WATER PUMP TEST BENCH
          </text>
          <text x="30" y="50" fill="#475569" fontSize="9" fontFamily="monospace">
            ARDUINO UNO · RELAY MODULE · FLOW SENSOR · DC PUMP LOAD CIRCUIT
          </text>
        </g>

        {/* ================= HYDRAULIC PATH: TUBING LAYER (PHYSICAL WATER CONDUIT) ================= */}
        {/* Outer Transparent PVC Hose */}
        <g filter="url(#naturalShadow)">
          {/* Section A: Reservoir to Pump Inlet */}
          <path
            d="M 120 280 L 220 280"
            fill="none"
            stroke="#94a3b8"
            strokeOpacity="0.45"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Section B: Pump Outlet to Flow Sensor Inlet */}
          <path
            d="M 270 260 L 460 260"
            fill="none"
            stroke="#94a3b8"
            strokeOpacity="0.45"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Section C: Flow Sensor Outlet into Collection Container */}
          <path
            d="M 570 260 L 780 260 C 820 260, 840 230, 840 210"
            fill="none"
            stroke="#94a3b8"
            strokeOpacity="0.45"
            strokeWidth="14"
            strokeLinecap="round"
          />
        </g>

        {/* Inner Water Stream (Only animated with water-flowing class when pump is RUNNING) */}
        <g>
          {/* Water stream inside Tube Section A */}
          <path
            d="M 120 280 L 220 280"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="8"
            className={pumpRunning ? 'water-flowing' : undefined}
          />
          {/* Water stream inside Tube Section B */}
          <path
            d="M 270 260 L 460 260"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="8"
            className={pumpRunning ? 'water-flowing' : undefined}
          />
          {/* Water stream inside Tube Section C */}
          <path
            d="M 570 260 L 780 260 C 820 260, 840 230, 840 210"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="8"
            className={pumpRunning ? 'water-flowing' : undefined}
          />
        </g>

        {/* Static flow direction indicator arrows along the tubing */}
        <g opacity={pumpRunning ? '0.9' : '0.45'}>
          <path d="M 160 280 L 170 280 M 166 276 L 172 280 L 166 284" fill="none" stroke="#e0f2fe" strokeWidth="1.5" />
          <path d="M 360 260 L 370 260 M 366 256 L 372 260 L 366 264" fill="none" stroke="#e0f2fe" strokeWidth="1.5" />
          <path d="M 670 260 L 680 260 M 676 256 L 682 260 L 676 264" fill="none" stroke="#e0f2fe" strokeWidth="1.5" />
        </g>

        {/* Hose Clamps at joints */}
        {[
          { x: 125, y: 280 },
          { x: 215, y: 280 },
          { x: 275, y: 260 },
          { x: 465, y: 260 },
          { x: 565, y: 260 }
        ].map((pt, i) => (
          <rect
            key={i}
            x={pt.x - 3}
            y={pt.y - 8}
            width="6"
            height="16"
            rx="1.5"
            fill="#cbd5e1"
            stroke="#64748b"
            strokeWidth="1"
          />
        ))}

        {/* ================= COMPONENT 1: WATER SOURCE RESERVOIR ================= */}
        <g filter="url(#naturalShadow)" transform="translate(30, 160)">
          {/* Acrylic Reservoir Tank Body */}
          <rect
            x="0"
            y="0"
            width="100"
            height="180"
            rx="8"
            fill="#0f1722"
            fillOpacity="0.7"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeOpacity="0.6"
          />
          {/* Water level inside source */}
          <rect
            x="4"
            y={176 - (sourcePercent / 100) * 160}
            width="92"
            height={(sourcePercent / 100) * 160}
            rx="4"
            fill="url(#waterFluidGrad)"
            fillOpacity="0.5"
          />
          {/* Source Outlet Spigot Fitting */}
          <rect x="98" y="112" width="16" height="16" rx="2" fill="#64748b" stroke="#334155" strokeWidth="1" />

          {/* Labels & Graduations */}
          <text x="50" y="25" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
            WATER SOURCE
          </text>
          <text x="50" y="38" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
            RESERVOIR
          </text>
          <line x1="10" y1="60" x2="25" y2="60" stroke="#64748b" strokeWidth="1" />
          <text x="30" y="63" fill="#64748b" fontSize="7" fontFamily="monospace">1500 mL</text>
          <line x1="10" y1="100" x2="25" y2="100" stroke="#64748b" strokeWidth="1" />
          <text x="30" y="103" fill="#64748b" fontSize="7" fontFamily="monospace">1000 mL</text>
          <line x1="10" y1="140" x2="25" y2="140" stroke="#64748b" strokeWidth="1" />
          <text x="30" y="143" fill="#64748b" fontSize="7" fontFamily="monospace">500 mL</text>
        </g>

        {/* ================= COMPONENT 2: DC WATER PUMP ================= */}
        <g filter="url(#naturalShadow)" transform="translate(195, 220)">
          {/* Motor Body Mount Bracket */}
          <rect x="10" y="70" width="75" height="10" rx="2" fill="#334155" stroke="#1e293b" strokeWidth="1" />

          {/* Cylindrical DC Motor Can */}
          <rect
            x="15"
            y="15"
            width="65"
            height="58"
            rx="5"
            fill="url(#pumpBodyGrad)"
            stroke="#475569"
            strokeWidth="1.5"
          />

          {/* Pump Impeller Housing Head */}
          <rect
            x="55"
            y="22"
            width="35"
            height="44"
            rx="4"
            fill="#18202a"
            stroke="#334155"
            strokeWidth="1.5"
          />

          {/* Pump Inlet Port */}
          <rect x="0" y="34" width="22" height="18" rx="2" fill="#2d3748" stroke="#4a5568" strokeWidth="1" />

          {/* Pump Outlet Port */}
          <rect x="75" y="34" width="20" height="16" rx="2" fill="#2d3748" stroke="#4a5568" strokeWidth="1" />

          {/* Internal Impeller spinning indicator inside pump head (active ONLY when running) */}
          <circle cx="72" cy="42" r="14" fill="#111620" stroke="#334155" strokeWidth="1" />
          <g transform={`rotate(${pumpRunning ? (pulseCount * 25) % 360 : 0} 72 42)`}>
            <line x1="72" y1="32" x2="72" y2="52" stroke={pumpRunning ? '#38bdf8' : '#64748b'} strokeWidth="2.5" />
            <line x1="62" y1="42" x2="82" y2="42" stroke={pumpRunning ? '#38bdf8' : '#64748b'} strokeWidth="2.5" />
          </g>

          {/* Label on motor can */}
          <rect x="22" y="24" width="30" height="16" rx="1.5" fill="#f8fafc" fillOpacity="0.85" />
          <text x="37" y="34" fill="#0f172a" fontSize="6.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            DC MOTOR
          </text>

          {/* Running LED indicator */}
          <circle
            cx="48"
            cy="58"
            r="3"
            fill={pumpRunning ? '#10b981' : '#475569'}
            stroke={pumpRunning ? '#34d399' : '#1e293b'}
            strokeWidth="1"
          />

          {/* Label below pump */}
          <text x="45" y="93" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
            DC WATER PUMP
          </text>
          <text
            x="45"
            y="104"
            fill={pumpRunning ? '#34d399' : '#94a3b8'}
            fontSize="8"
            fontFamily="monospace"
            textAnchor="middle"
            fontWeight="bold"
          >
            {pumpRunning ? '● RUNNING' : '○ STOPPED'}
          </text>
        </g>

        {/* ================= COMPONENT 3: WATER FLOW SENSOR ================= */}
        <g filter="url(#naturalShadow)" transform="translate(455, 215)">
          {/* Inlet & Outlet Barbs */}
          <rect x="0" y="38" width="24" height="18" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />
          <rect x="86" y="38" width="24" height="18" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />

          {/* Circular Turbine Body */}
          <circle
            cx="55"
            cy="47"
            r="35"
            fill="url(#flowSensorBodyGrad)"
            stroke="#475569"
            strokeWidth="2"
          />

          {/* Top Hall Sensor IC Cavity Cover */}
          <circle cx="55" cy="47" r="23" fill="#151c26" stroke="#334155" strokeWidth="1.5" />

          {/* 6-Blade Turbine Pinwheel Rotor (active ONLY when running) */}
          <g transform={`rotate(${pumpRunning ? (pulseCount * 18) % 360 : 0} 55 47)`}>
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <line
                key={deg}
                x1="55"
                y1="47"
                x2={55 + 17 * Math.cos((deg * Math.PI) / 180)}
                y2={47 + 17 * Math.sin((deg * Math.PI) / 180)}
                stroke={pumpRunning ? '#38bdf8' : '#64748b'}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            ))}
            <circle cx="55" cy="47" r="5" fill="#0284c7" />
          </g>

          {/* Integrated Pulse Blink Indicator (blinks strictly when pump is active) */}
          <circle
            cx="55"
            cy="27"
            r="2.5"
            fill={pumpRunning && Math.round(pulseCount) % 2 === 0 ? '#38bdf8' : '#1e293b'}
            stroke="#475569"
            strokeWidth="0.5"
          />

          {/* Label on sensor body */}
          <text x="55" y="94" fill="#e2e8f0" fontSize="9" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
            FLOW SENSOR
          </text>
          <text x="55" y="105" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
            (Turbine Pulse Output)
          </text>
        </g>

        {/* ================= COMPONENT 4: RECEIVING CONTAINER ================= */}
        <g filter="url(#naturalShadow)" transform="translate(775, 170)">
          {/* Clear Beaker Body */}
          <path
            d="M 10 0 L 10 190 Q 10 200, 20 200 L 110 200 Q 120 200, 120 190 L 120 0 Z"
            fill="#0f1724"
            fillOpacity="0.65"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeOpacity="0.6"
          />

          {/* Delivered Water Column inside Beaker */}
          {deliveredMl > 0 && (
            <rect
              x="13"
              y={196 - (targetPercent / 100) * 160}
              width="104"
              height={(targetPercent / 100) * 160}
              rx="4"
              fill="url(#waterFluidGrad)"
            />
          )}

          {/* Water stream dripping from tube outlet (active ONLY when pump is running) */}
          {pumpRunning && (
            <line
              x1="65"
              y1="40"
              x2="65"
              y2={196 - (targetPercent / 100) * 160}
              stroke="#38bdf8"
              strokeWidth="5"
              className="water-flowing-fast"
            />
          )}

          {/* Graduated markings (250, 500, 750, 1000 mL) */}
          {[
            { ml: 250, y: 156 },
            { ml: 500, y: 116 },
            { ml: 750, y: 76 },
            { ml: 1000, y: 36 }
          ].map((mark) => (
            <g key={mark.ml}>
              <line x1="15" y1={mark.y} x2="35" y2={mark.y} stroke="#94a3b8" strokeWidth="1.5" />
              <text x="40" y={mark.y + 3} fill="#cbd5e1" fontSize="8" fontFamily="monospace">
                {mark.ml} mL
              </text>
            </g>
          ))}

          {/* Header Label */}
          <text x="65" y="-12" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
            WATER CONTAINER
          </text>
          <text x="65" y="215" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            {Math.round(deliveredMl)} / {targetMl} mL
          </text>
        </g>

        {/* ================= COMPONENT 5: ARDUINO UNO R3 ================= */}
        <g filter="url(#naturalShadow)" transform="translate(180, 390)">
          {/* Blue PCB Board */}
          <rect
            x="0"
            y="0"
            width="220"
            height="150"
            rx="6"
            fill="url(#arduinoPcbGrad)"
            stroke="#0ea5e9"
            strokeWidth="1.5"
          />

          {/* Mounting holes */}
          <circle cx="14" cy="14" r="3.5" fill="#141a24" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="206" cy="14" r="3.5" fill="#141a24" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="206" cy="136" r="3.5" fill="#141a24" stroke="#e2e8f0" strokeWidth="1" />
          <circle cx="14" cy="136" r="3.5" fill="#141a24" stroke="#e2e8f0" strokeWidth="1" />

          {/* USB Connector */}
          <rect x="-10" y="25" width="30" height="34" rx="2" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
          <rect x="-4" y="32" width="16" height="20" rx="1" fill="#475569" />

          {/* DC Barrel Jack */}
          <rect x="-8" y="90" width="34" height="42" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <circle cx="2" cy="111" r="5" fill="#0f172a" />

          {/* ATmega328P DIP-28 IC */}
          <rect x="75" y="70" width="85" height="28" rx="2" fill="#111827" stroke="#374151" strokeWidth="1" />
          <path d="M 75 80 A 4 4 0 0 1 75 88" fill="#1f2937" />
          <text x="117" y="87" fill="#9ca3af" fontSize="8" fontFamily="monospace" textAnchor="middle">
            ATmega328P
          </text>

          {/* Digital Pin Headers */}
          <rect x="60" y="5" width="145" height="14" rx="1.5" fill="#111827" stroke="#374151" strokeWidth="1" />
          {[...Array(14)].map((_, i) => (
            <rect key={i} x={66 + i * 9.8} y="8" width="5" height="7" rx="0.5" fill="#000000" />
          ))}

          {/* Pin Labels for Project */}
          <text x="78" y="27" fill="#facc15" fontSize="7" fontFamily="monospace" fontWeight="bold">
            D2 (Pulse In)
          </text>
          <text x="135" y="27" fill="#38bdf8" fontSize="7" fontFamily="monospace" fontWeight="bold">
            D8 (Relay Out)
          </text>

          {/* Power Header */}
          <rect x="70" y="131" width="135" height="14" rx="1.5" fill="#111827" stroke="#374151" strokeWidth="1" />
          <text x="135" y="125" fill="#bae6fd" fontSize="7" fontFamily="monospace" textAnchor="middle">
            POWER / ANALOG IN
          </text>

          {/* Status LEDs */}
          <circle cx="50" cy="40" r="2" fill="#10b981" />
          <text x="56" y="42" fill="#6ee7b7" fontSize="6" fontFamily="monospace">ON</text>

          <circle cx="165" cy="40" r="2" fill={relayEnergized ? '#f59e0b' : '#334155'} />
          <text x="172" y="42" fill="#fbbf24" fontSize="6" fontFamily="monospace">L (D8)</text>

          {/* Board Title */}
          <text x="110" y="55" fill="#ffffff" fontSize="13" fontFamily="sans-serif" fontWeight="extrabold">
            ARDUINO
          </text>
          <text x="175" y="55" fill="#38bdf8" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
            UNO
          </text>
        </g>

        {/* ================= COMPONENT 6: RELAY MODULE ================= */}
        <g filter="url(#naturalShadow)" transform="translate(500, 395)">
          {/* Module PCB */}
          <rect
            x="0"
            y="0"
            width="170"
            height="140"
            rx="6"
            fill="url(#relayModulePcb)"
            stroke="#3b82f6"
            strokeWidth="1.5"
          />

          {/* Blue Relay Cube with Clear, Unfabricated Labeling */}
          <rect
            x="25"
            y="15"
            width="105"
            height="75"
            rx="4"
            fill="url(#srdRelayCube)"
            stroke="#38bdf8"
            strokeWidth="1"
          />
          <text x="77" y="38" fill="#ffffff" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            RELAY MODULE
          </text>
          <text x="77" y="54" fill="#e0f2fe" fontSize="8" fontFamily="monospace" textAnchor="middle">
            SPDT CHANGEOVER
          </text>
          <text x="77" y="72" fill="#fef08a" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            {relayEnergized ? 'COIL ENERGIZED' : 'COIL IDLE'}
          </text>

          {/* 3-Position Screw Terminal Block (NO, COM, NC) */}
          <rect x="135" y="15" width="28" height="75" rx="3" fill="#15803d" stroke="#166534" strokeWidth="1" />
          <circle cx="149" cy="28" r="5" fill="#475569" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="146" y1="28" x2="152" y2="28" stroke="#cbd5e1" strokeWidth="1" />
          <text x="127" y="31" fill="#34d399" fontSize="7" fontFamily="monospace" textAnchor="end" fontWeight="bold">
            NO
          </text>

          <circle cx="149" cy="52" r="5" fill="#475569" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="146" y1="52" x2="152" y2="52" stroke="#cbd5e1" strokeWidth="1" />
          <text x="127" y="55" fill="#38bdf8" fontSize="7" fontFamily="monospace" textAnchor="end" fontWeight="bold">
            COM
          </text>

          <circle cx="149" cy="76" r="5" fill="#475569" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="146" y1="76" x2="152" y2="76" stroke="#cbd5e1" strokeWidth="1" />
          <text x="127" y="79" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="end" fontWeight="bold">
            NC
          </text>

          {/* Control Header Pins (VCC, GND, IN) */}
          <rect x="35" y="112" width="45" height="16" rx="2" fill="#111827" stroke="#374151" strokeWidth="1" />
          <circle cx="43" cy="120" r="2" fill="#facc15" />
          <circle cx="57" cy="120" r="2" fill="#38bdf8" />
          <circle cx="71" cy="120" r="2" fill="#94a3b8" />
          <text x="57" y="106" fill="#cbd5e1" fontSize="7" fontFamily="monospace" textAnchor="middle">
            VCC GND IN
          </text>

          {/* Module Indicator LEDs */}
          <circle cx="100" cy="108" r="2.5" fill="#ef4444" />
          <text x="106" y="110" fill="#f87171" fontSize="6" fontFamily="monospace">PWR</text>

          <circle
            cx="100"
            cy="122"
            r="3"
            fill={relayEnergized ? '#10b981' : '#334155'}
            stroke={relayEnergized ? '#34d399' : '#1e293b'}
            strokeWidth="0.8"
          />
          <text
            x="106"
            y="125"
            fill={relayEnergized ? '#34d399' : '#64748b'}
            fontSize="6"
            fontFamily="monospace"
            fontWeight="bold"
          >
            RELAY {relayEnergized ? 'ON' : 'OFF'}
          </text>

          {/* Module Header Title */}
          <text x="85" y="-8" fill="#f59e0b" fontSize="9.5" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
            RELAY MODULE
          </text>
        </g>

        {/* ================= COMPONENT 7: PUMP POWER SUPPLY ================= */}
        <g filter="url(#naturalShadow)" transform="translate(735, 420)">
          <rect
            x="0"
            y="0"
            width="120"
            height="90"
            rx="6"
            fill="#1e2530"
            stroke="#334155"
            strokeWidth="1.5"
          />
          {/* DC output terminal block */}
          <rect x="18" y="15" width="40" height="20" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="1" />
          <circle cx="28" cy="25" r="3" fill="#ef4444" />
          <text x="28" y="45" fill="#f87171" fontSize="7" fontFamily="monospace" textAnchor="middle">(+)</text>

          <circle cx="48" cy="25" r="3" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
          <text x="48" y="45" fill="#94a3b8" fontSize="7" fontFamily="monospace" textAnchor="middle">GND</text>

          {/* Power on LED */}
          <circle cx="95" cy="25" r="2.5" fill="#10b981" />

          {/* Label */}
          <text x="60" y="66" fill="#e2e8f0" fontSize="8.5" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
            PUMP POWER SUPPLY
          </text>
          <text x="60" y="78" fill="#94a3b8" fontSize="7.5" fontFamily="monospace" textAnchor="middle">
            (ISOLATED DC LOAD)
          </text>
        </g>

        {/* ================= ELECTRICAL WIRING & CONTROL PATHS ================= */}
        {/* PATH 1: Flow Sensor Signal to Arduino Uno Pin D2 */}
        <g>
          <path
            d="M 505 295 C 460 340, 310 330, 260 395"
            fill="none"
            stroke={pumpRunning ? '#facc15' : '#854d0e'}
            strokeWidth="2.5"
            strokeDasharray={pumpRunning ? '4,3' : 'none'}
          />
          <text x="360" y="335" fill="#facc15" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            PULSE SIGNAL ➔ ARDUINO D2
          </text>
        </g>

        {/* PATH 2: Arduino Pin D8 Control Trigger to Relay Module IN Pin */}
        <g>
          <path
            d="M 315 395 C 360 470, 480 500, 555 525"
            fill="none"
            stroke={relayEnergized ? '#38bdf8' : '#0369a1'}
            strokeWidth="2.5"
            strokeDasharray={relayEnergized ? '4,2' : 'none'}
          />
          <text x="420" y="475" fill="#38bdf8" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            CONTROL SIGNAL (D8) ➔ RELAY IN
          </text>
        </g>

        {/* PATH 3: Switched Load Circuit through Relay Contacts */}
        <g>
          {/* Wire 3A: Supply (+) to Relay COM */}
          <path
            d="M 763 445 C 720 440, 680 447, 649 447"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
          />
          <text x="705" y="435" fill="#f87171" fontSize="7" fontFamily="monospace">
            SUPPLY (+) ➔ COM
          </text>

          {/* Wire 3B: Relay NO to Pump (+) via switched contact */}
          <path
            d="M 649 423 C 580 340, 340 330, 255 310"
            fill="none"
            stroke={relayEnergized ? '#10b981' : '#475569'}
            strokeWidth="3"
            strokeDasharray={relayEnergized ? '5,3' : 'none'}
          />
          <text x="420" y="375" fill={relayEnergized ? '#34d399' : '#64748b'} fontSize="7.5" fontFamily="monospace" fontWeight="bold">
            SWITCHED LOAD ➔ PUMP (+)
          </text>

          {/* Wire 3C: Pump Motor (-) Return to Supply GND */}
          <path
            d="M 235 310 C 230 380, 720 540, 783 445"
            fill="none"
            stroke="#334155"
            strokeWidth="2.5"
          />
        </g>
      </svg>
    </div>
  )
}
