import { useState } from 'react'
import { assertNever } from '../lib/assertNever'
import { ExplainSection } from './ExplainSection'
import { SimulateSection } from './SimulateSection'
import { QuizSection } from './QuizSection'

type SectionTag = 'explain' | 'simulate' | 'quiz'

const SECTIONS: { tag: SectionTag; label: string }[] = [
  { tag: 'explain', label: '1 · Learn' },
  { tag: 'simulate', label: '2 · Try it' },
  { tag: 'quiz', label: '3 · Quiz' },
]

function renderSection(tag: SectionTag) {
  switch (tag) {
    case 'explain':
      return <ExplainSection />
    case 'simulate':
      return <SimulateSection />
    case 'quiz':
      return <QuizSection />
    default:
      return assertNever(tag)
  }
}

export function Chapter() {
  const [section, setSection] = useState<SectionTag>('explain')
  const index = SECTIONS.findIndex((s) => s.tag === section)

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wider text-sky-400">
          MiniMax Tutorial · Chapter 1
        </p>
        <h1 className="mt-1 text-3xl font-bold text-slate-100">
          Jump anywhere on screen with mini.jump2d
        </h1>
        <p className="mt-2 text-slate-400">
          Learn the feature, practice it in a simulated Neovim, then check yourself.
        </p>
      </header>

      <nav className="mb-8 flex gap-2">
        {SECTIONS.map((s) => (
          <button
            key={s.tag}
            onClick={() => setSection(s.tag)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              s.tag === section
                ? 'bg-sky-500 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <main className="min-h-[20rem]">{renderSection(section)}</main>

      <footer className="mt-10 flex justify-between border-t border-slate-800 pt-5">
        <button
          disabled={index === 0}
          onClick={() => setSection(SECTIONS[index - 1].tag)}
          className="rounded-md px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 disabled:opacity-30"
        >
          ← Back
        </button>
        <button
          disabled={index === SECTIONS.length - 1}
          onClick={() => setSection(SECTIONS[index + 1].tag)}
          className="rounded-md bg-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-600 disabled:opacity-30"
        >
          Next →
        </button>
      </footer>
    </div>
  )
}
