import React from 'react'

interface RelayContactViewerProps {
  energized: boolean
}

export const RelayContactViewer: React.FC<RelayContactViewerProps> = ({ energized }) => {
  return (
    <div className="bg-[#131922] border border-[#263345] rounded-lg p-3 text-xs shadow-md">
      <div className="flex items-center justify-between border-b border-[#222d3d] pb-2 mb-2">
        <span className="font-mono text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              energized ? 'bg-amber-400 shadow-[0_0_6px_#f59e0b]' : 'bg-slate-600'
            }`}
          />
          Relay Contact Mechanism
        </span>
        <span
          className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-bold transition-colors ${
            energized
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          {energized ? 'ENERGIZED (COM ➔ NO)' : 'IDLE / REST (COM ➔ NC)'}
        </span>
      </div>

      {/* Conventional Changeover Contact Schematic */}
      <div className="relative w-full h-24 bg-[#0a0e14] rounded border border-[#1b2430] p-1 overflow-hidden">
        <svg viewBox="0 0 280 90" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
          {/* Internal Solenoid Coil */}
          <g>
            <rect
              x="16"
              y="22"
              width="44"
              height="46"
              rx="3"
              fill={energized ? '#3b2506' : '#1a202c'}
              stroke={energized ? '#d97706' : '#334155'}
              strokeWidth="1.5"
            />
            {/* Coil wire turns */}
            {[30, 38, 46, 54, 62].map((y) => (
              <line
                key={y}
                x1="18"
                y1={y}
                x2="58"
                y2={y}
                stroke={energized ? '#f59e0b' : '#475569'}
                strokeWidth="1.5"
                strokeDasharray={energized ? '4,2' : 'none'}
              />
            ))}
            <text
              x="38"
              y="16"
              fill={energized ? '#fbbf24' : '#64748b'}
              fontSize="8"
              fontFamily="monospace"
              textAnchor="middle"
              fontWeight="bold"
            >
              COIL
            </text>
          </g>

          {/* Magnetic flux lines when active */}
          {energized && (
            <path
              d="M 62 30 C 72 30, 72 60, 62 60"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeDasharray="2,2"
            />
          )}

          {/* Pivoted Armature Spring */}
          <line x1="88" y1="20" x2="88" y2="35" stroke="#94a3b8" strokeWidth="1" strokeDasharray="1,1" />

          {/* COM Terminal & Pivot */}
          <g>
            <circle cx="95" cy="45" r="4" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="75" y1="45" x2="95" y2="45" stroke="#38bdf8" strokeWidth="2" />
            <text x="70" y="48" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="end" fontWeight="bold">
              COM
            </text>
          </g>

          {/* Movable Armature Contact Arm: Rest connects to NC, Energized connects to NO */}
          <line
            x1="95"
            y1="45"
            x2="185"
            y2={energized ? 65 : 25}
            stroke="#e2e8f0"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="transition-all duration-200"
          />

          {/* Movable contact tip */}
          <circle
            cx="185"
            cy={energized ? 65 : 25}
            r="3.5"
            fill="#f8fafc"
            stroke="#94a3b8"
            strokeWidth="1"
            className="transition-all duration-200"
          />

          {/* NC Contact (Normally Closed - Rest Position) */}
          <g>
            <circle cx="190" cy="25" r="4" fill={!energized ? '#ef4444' : '#475569'} stroke="#64748b" strokeWidth="1.5" />
            <line x1="194" y1="25" x2="225" y2="25" stroke="#64748b" strokeWidth="2" />
            <text x="230" y="28" fill="#94a3b8" fontSize="8" fontFamily="monospace" fontWeight="bold">
              NC (Rest)
            </text>
          </g>

          {/* NO Contact (Normally Open - Active Position, connected to Pump load) */}
          <g>
            <circle
              cx="190"
              cy="65"
              r="4"
              fill={energized ? '#10b981' : '#1e293b'}
              stroke={energized ? '#34d399' : '#475569'}
              strokeWidth="1.5"
            />
            <line
              x1="194"
              y1="65"
              x2="225"
              y2="65"
              stroke={energized ? '#10b981' : '#475569'}
              strokeWidth="2"
            />
            <text
              x="230"
              y="68"
              fill={energized ? '#34d399' : '#64748b'}
              fontSize="8"
              fontFamily="monospace"
              fontWeight="bold"
            >
              NO ➔ PUMP
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center justify-between">
        <span>Load Path:</span>
        <span className={energized ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
          {energized ? 'CLOSED (Switched to Motor)' : 'OPEN CIRCUIT (Motor Disconnected)'}
        </span>
      </div>
    </div>
  )
}
