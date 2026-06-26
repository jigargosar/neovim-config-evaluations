import { useState } from 'react'
import { QUIZ } from '../data/jump2d'

type Answers = Record<string, number>

export function QuizSection() {
  const [answers, setAnswers] = useState<Answers>({})

  const select = (id: string, optionIndex: number) => {
    setAnswers((prev) => (prev[id] !== undefined ? prev : { ...prev, [id]: optionIndex }))
  }

  const correct = QUIZ.filter((q) => answers[q.id] === q.answerIndex).length
  const answered = Object.keys(answers).length
  const done = answered === QUIZ.length

  return (
    <div className="space-y-6">
      <p className="text-slate-300">
        Pick an answer for each question. You will see immediately whether it is right, with a short
        explanation.
      </p>

      {QUIZ.map((q, qi) => {
        const chosen = answers[q.id]
        const isAnswered = chosen !== undefined
        return (
          <div key={q.id} className="rounded-lg border border-slate-700 bg-slate-800/40 p-4">
            <p className="mb-3 font-medium text-slate-100">
              {qi + 1}. {q.prompt}
            </p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isChosen = chosen === oi
                const isAnswer = oi === q.answerIndex
                const reveal = isAnswered && (isChosen || isAnswer)
                const tone = !reveal
                  ? 'border-slate-600 hover:bg-slate-700'
                  : isAnswer
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-200'
                    : 'border-rose-500 bg-rose-500/10 text-rose-200'
                return (
                  <button
                    key={oi}
                    disabled={isAnswered}
                    onClick={() => select(q.id, oi)}
                    className={`block w-full rounded-md border px-3 py-2 text-left text-sm text-slate-200 transition ${tone} disabled:cursor-default`}
                  >
                    <span className="mr-2 font-mono text-slate-400">
                      {String.fromCharCode(97 + oi)})
                    </span>
                    {opt}
                    {reveal && isAnswer && <span className="ml-2">✓</span>}
                    {reveal && isChosen && !isAnswer && <span className="ml-2">✗</span>}
                  </button>
                )
              })}
            </div>
            {isAnswered && (
              <p className="mt-3 rounded-md bg-slate-900/60 p-3 text-sm text-slate-300">
                {q.explanation}
              </p>
            )}
          </div>
        )
      })}

      <div className="rounded-lg border border-slate-700 bg-slate-800/60 p-4 text-slate-200">
        Score: <span className="font-semibold text-emerald-400">{correct}</span> / {QUIZ.length}
        {done && correct === QUIZ.length && (
          <span className="ml-2 text-emerald-300">— perfect, chapter complete! 🎉</span>
        )}
        {done && correct < QUIZ.length && (
          <span className="ml-2 text-amber-300">— review the explanations above.</span>
        )}
      </div>
    </div>
  )
}
