export interface SimulationState {
  isRunning: boolean
  targetMl: number
  deliveredMl: number
  pulseCount: number
  relayEnergized: boolean
  pumpRunning: boolean
  flowRateLpm: number
  statusMessage: string
  statusType: 'idle' | 'running' | 'completed' | 'stopped'
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface RelayComponentPart {
  id: string
  name: string
  shortDesc: string
  detail: string
  color: string
}

export interface SimulationLog {
  id: string
  timestamp: string
  message: string
  type: 'info' | 'success' | 'warn' | 'action'
}
