import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Trophy, Award, ArrowRight } from 'lucide-react'
import { VIVA_QUESTIONS } from '../data/labData'

export const VivaChallenge: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showExplanation, setShowExplanation] = useState<boolean>(false)
  const [isFinished, setIsFinished] = useState<boolean>(false)

  const currentQ = VIVA_QUESTIONS[currentIdx]
  const totalQuestions = VIVA_QUESTIONS.length

  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[currentQ.id] !== undefined) return // already answered
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }))
    setShowExplanation(true)
  }

  const handleNext = () => {
    setShowExplanation(false)
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx((prev) => prev + 1)
    } else {
      setIsFinished(true)
    }
  }

  const handleRestart = () => {
    setSelectedAnswers({})
    setCurrentIdx(0)
    setShowExplanation(false)
    setIsFinished(false)
  }

  // Calculate score
  const score = VIVA_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc
  }, 0)

  return (
    <section id="section-viva-challenge" className="py-20 px-4 max-w-7xl mx-auto border-b border-slate-800">
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          SECTION 13 • CLASSROOM VIVA PREPARATION
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Viva Challenge
        </h2>
        <p className="text-slate-400 mt-2 text-base">
          Interactive quiz designed specifically for examiner viva evaluation on relay actuation, sensor integration, and system architecture.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {!isFinished ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
              <span>QUESTION {currentIdx + 1} OF {totalQuestions}</span>
              <span className="text-cyan-400 font-bold">SCORE: {score}</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-6 border border-slate-800">
              <div
                className="bg-cyan-500 h-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-snug">
              {currentQ.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((option: string, optIdx: number) => {
                const isSelected = selectedAnswers[currentQ.id] === optIdx
                const isCorrect = optIdx === currentQ.correctIndex
                const hasAnswered = selectedAnswers[currentQ.id] !== undefined

                let optionClass = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                if (hasAnswered) {
                  if (isCorrect) {
                    optionClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                  } else if (isSelected) {
                    optionClass = 'bg-red-950/80 border-red-500 text-red-200'
                  } else {
                    optionClass = 'bg-slate-950/50 border-slate-900 text-slate-600'
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${optionClass}`}
                  >
                    <span>{option}</span>
                    {hasAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />}
                    {hasAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-2" />}
                  </button>
                )
              })}
            </div>

            {/* Explanation box after answer */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs text-slate-300 font-mono leading-relaxed"
                >
                  <span className="text-cyan-400 font-bold block mb-1">EXPLANATION:</span>
                  {currentQ.explanation}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Question / Skip Button */}
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQ.id] === undefined}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
              >
                {currentIdx + 1 === totalQuestions ? 'SEE FINAL SCORE' : 'NEXT QUESTION'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Results Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Viva Evaluation Complete!</h3>
            <p className="text-slate-400 text-sm mb-6">
              You scored <span className="text-amber-400 font-bold font-mono text-lg">{score}</span> out of{' '}
              <span className="text-white font-bold font-mono text-lg">{totalQuestions}</span>
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-md mx-auto mb-8 text-xs font-mono text-slate-300">
              {score >= 9 ? (
                <span className="text-emerald-400 font-bold">Outstanding! Full mastery of Relay Actuation & Flow System. Ready for university viva!</span>
              ) : score >= 7 ? (
                <span className="text-cyan-400 font-bold">Great engineering grasp! Review relay terminal pinout and calibration equations.</span>
              ) : (
                <span className="text-amber-400 font-bold">Good effort! Re-explore the Relay Construction and Operation simulators above.</span>
              )}
            </div>

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/25"
            >
              <RotateCcw className="w-4 h-4" />
              RETAKE VIVA CHALLENGE
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
