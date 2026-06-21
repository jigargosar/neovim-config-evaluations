import { useEffect, useRef, useState } from 'react'
import { Terminal } from '@xterm/xterm'
import { Jump2dSim } from '../sim/jump2dSim'
import { SAMPLE_BUFFER } from '../data/jump2d'

export function SimulateSection() {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const simRef = useRef<Jump2dSim | null>(null)
  const [showSpots, setShowSpots] = useState(false)
  const [jumps, setJumps] = useState(0)
  const [lastLabel, setLastLabel] = useState<string | null>(null)

  useEffect(() => {
    const host = hostRef.current
    if (host === null) return

    const term = new Terminal({
      rows: SAMPLE_BUFFER.length + 3,
      cols: 56,
      cursorBlink: false,
      cursorStyle: 'bar',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
      fontSize: 15,
      theme: {
        background: '#1e1e2e',
        foreground: '#cdd6f4',
        black: '#45475a',
        brightBlack: '#6c7086',
      },
    })
    term.open(host)

    const sim = new Jump2dSim(term, SAMPLE_BUFFER, {
      onJump: (target) => {
        setJumps((n) => n + 1)
        setLastLabel(target.label)
      },
    })
    simRef.current = sim
    sim.start()

    const sub = term.onData((data) => sim.handleKey(data))
    term.focus()

    return () => {
      sub.dispose()
      term.dispose()
      simRef.current = null
    }
  }, [])

  const onToggleSpots = () => {
    const next = !showSpots
    setShowSpots(next)
    simRef.current?.setShowSpots(next)
  }

  const onReset = () => {
    setJumps(0)
    setLastLabel(null)
    simRef.current?.reset()
  }

  return (
    <div className="space-y-4">
      <p className="text-slate-300">
        Click the buffer to focus it, then press <Kbd>Enter</Kbd> to label every spot. Type the
        label characters to jump. Try <Kbd>h</Kbd> <Kbd>j</Kbd> <Kbd>k</Kbd> <Kbd>l</Kbd> to move
        first, then jump back.
      </p>

      <div
        ref={hostRef}
        className="inline-block rounded-lg border border-slate-700 bg-[#1e1e2e] p-3 shadow-lg"
      />

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onToggleSpots}
          className="rounded-md border border-slate-600 px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-700"
        >
          {showSpots ? 'Hide spotter targets' : 'Reveal spotter targets'}
        </button>
        <button
          onClick={onReset}
          className="rounded-md border border-slate-600 px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-700"
        >
          Reset
        </button>
        <span className="text-sm text-slate-400">
          Jumps: <span className="font-semibold text-emerald-400">{jumps}</span>
          {lastLabel !== null && (
            <>
              {' '}
              · last label{' '}
              <span className="rounded bg-yellow-300 px-1.5 font-mono font-bold text-slate-900">
                {lastLabel}
              </span>
            </>
          )}
        </span>
      </div>

      {jumps === 0 && (
        <p className="text-sm text-amber-300/90">
          Goal: perform at least one jump. The magenta highlights (Reveal) show exactly the spots
          the default spotter targets.
        </p>
      )}
    </div>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-slate-500 bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-slate-100">
      {children}
    </kbd>
  )
}
