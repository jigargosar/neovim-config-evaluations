function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-slate-500 bg-slate-800 px-1.5 py-0.5 font-mono text-xs text-slate-100">
      {children}
    </kbd>
  )
}

export function ExplainSection() {
  return (
    <div className="space-y-5 text-slate-300 leading-relaxed">
      <p>
        <strong className="text-slate-100">mini.jump2d</strong> lets you move the cursor to almost
        any visible spot in two or three keystrokes. Instead of counting words or repeating{' '}
        <Kbd>f</Kbd>, you press one key, glance at the labels that appear over every candidate, and
        type the label.
      </p>

      <div>
        <h3 className="mb-2 font-semibold text-slate-100">How a jump works</h3>
        <ol className="list-decimal space-y-1 pl-5">
          <li>
            Lock your eyes on where you want to go and press <Kbd>&lt;CR&gt;</Kbd> (Enter) — the
            default trigger in MiniMax.
          </li>
          <li>Character labels appear over every spot the spotter found.</li>
          <li>Type label characters until your target is unique; the cursor jumps there.</li>
        </ol>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-slate-100">What gets a label (the default spotter)</h3>
        <p className="mb-2">
          The default spotter is tuned for code. It places a spot at:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>the start or end of a non-whitespace group (word boundaries),</li>
          <li>
            an alphanumeric character next to punctuation — e.g. either side of{' '}
            <code className="rounded bg-slate-800 px-1 font-mono text-sm">_</code> in{' '}
            <code className="rounded bg-slate-800 px-1 font-mono text-sm">setup_jump</code>,
          </li>
          <li>
            the start of an uppercase group — e.g. the{' '}
            <code className="rounded bg-slate-800 px-1 font-mono text-sm">J</code> in{' '}
            <code className="rounded bg-slate-800 px-1 font-mono text-sm">MiniJump2d</code>.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-slate-100">When there are more spots than labels</h3>
        <p>
          There are 26 labels (<code className="rounded bg-slate-800 px-1 font-mono text-sm">a–z</code>).
          When the screen has more spots than that, labels are distributed equally and some spots
          share a first key. Typing it filters the candidates down, then you type the next key. This
          is <em>iterative label filtering</em> — you will see it live in the simulator.
        </p>
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
        <h3 className="mb-1 font-semibold text-slate-100">mini.jump2d vs mini.jump</h3>
        <p className="text-sm">
          MiniMax enables both. <strong>mini.jump</strong> makes <Kbd>f</Kbd> <Kbd>F</Kbd>{' '}
          <Kbd>t</Kbd> <Kbd>T</Kbd> smarter (work across lines, repeat without <Kbd>;</Kbd>).{' '}
          <strong>mini.jump2d</strong> is the 2D labelled jump to anywhere on screen, started with{' '}
          <Kbd>&lt;CR&gt;</Kbd>.
        </p>
      </div>
    </div>
  )
}
