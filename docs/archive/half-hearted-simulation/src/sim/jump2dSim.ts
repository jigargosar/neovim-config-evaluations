import type { Terminal } from '@xterm/xterm'
import { assignLabels, computeSpots, type LabeledSpot } from './spotter'
import { assertNever } from '../lib/assertNever'

interface Cursor {
  line: number
  col: number
}

type Mode = { tag: 'normal' } | { tag: 'jump' }

const ESC = '\x1b['
const RESET = ESC + '0m'
const STYLE = {
  gutter: ESC + '90m', // bright black
  label: ESC + '1;30;43m', // bold, black on yellow
  cursor: ESC + '7m', // inverse
  spotHint: ESC + '35m', // magenta (reveal-spots mode)
  modeNormal: ESC + '1;36m', // bold cyan
  modeJump: ESC + '1;33m', // bold yellow
  dim: ESC + '90m',
}

export interface Jump2dCallbacks {
  onJump?: (target: { line: number; col: number; label: string }) => void
}

/** Drives an xterm.js terminal to simulate mini.jump2d on a fixed buffer. */
export class Jump2dSim {
  private mode: Mode = { tag: 'normal' }
  private cursor: Cursor = { line: 0, col: 0 }
  private labeled: LabeledSpot[] = []
  private typed = ''
  private showSpots = false

  private readonly term: Terminal
  private readonly lines: string[]
  private readonly cb: Jump2dCallbacks

  constructor(term: Terminal, lines: string[], cb: Jump2dCallbacks = {}) {
    this.term = term
    this.lines = lines
    this.cb = cb
  }

  // --- public API ----------------------------------------------------------

  start(): void {
    this.render()
  }

  reset(): void {
    this.mode = { tag: 'normal' }
    this.cursor = { line: 0, col: 0 }
    this.typed = ''
    this.render()
  }

  setShowSpots(value: boolean): void {
    this.showSpots = value
    this.render()
  }

  handleKey(data: string): void {
    switch (this.mode.tag) {
      case 'normal':
        this.handleNormalKey(data)
        return
      case 'jump':
        this.handleJumpKey(data)
        return
      default:
        return assertNever(this.mode)
    }
  }

  // --- input handling ------------------------------------------------------

  private handleNormalKey(data: string): void {
    if (data === '\r' || data === '\n') {
      this.startJump()
      return
    }
    switch (data) {
      case 'h':
        this.moveCursor(0, -1)
        break
      case 'l':
        this.moveCursor(0, 1)
        break
      case 'j':
        this.moveCursor(1, 0)
        break
      case 'k':
        this.moveCursor(-1, 0)
        break
      default:
        return
    }
    this.render()
  }

  private handleJumpKey(data: string): void {
    if (data === '\x1b') {
      this.endJump()
      this.render()
      return
    }
    if (!/^[a-z]$/.test(data)) return

    const nextTyped = this.typed + data
    const candidates = this.labeled.filter((s) => s.label.startsWith(nextTyped))
    if (candidates.length === 0) return // no spot matches; ignore keystroke
    if (candidates.length === 1) {
      this.jumpTo(candidates[0])
      return
    }
    this.typed = nextTyped
    this.render()
  }

  private startJump(): void {
    const spots = computeSpots(this.lines)
    if (spots.length === 0) return
    this.labeled = assignLabels(spots)
    this.typed = ''
    this.mode = { tag: 'jump' }
    this.render()
  }

  private endJump(): void {
    this.mode = { tag: 'normal' }
    this.typed = ''
  }

  private jumpTo(spot: LabeledSpot): void {
    this.cursor = { line: spot.line, col: spot.col }
    this.endJump()
    this.render()
    this.cb.onJump?.({ line: spot.line, col: spot.col, label: spot.label })
  }

  private moveCursor(dLine: number, dCol: number): void {
    const line = clamp(this.cursor.line + dLine, 0, this.lines.length - 1)
    const maxCol = Math.max(0, this.lines[line].length - 1)
    const col = clamp(this.cursor.col + dCol, 0, maxCol)
    this.cursor = { line, col }
  }

  // --- rendering -----------------------------------------------------------

  private candidateLabelAt(line: number, col: number): string | undefined {
    if (this.mode.tag !== 'jump') return undefined
    for (const s of this.labeled) {
      if (s.line === line && s.col === col && s.label.startsWith(this.typed)) {
        return s.label[this.typed.length]
      }
    }
    return undefined
  }

  private isSpot(line: number, col: number): boolean {
    return this.labeled.some((s) => s.line === line && s.col === col)
  }

  private render(): void {
    const out: string[] = []
    this.lines.forEach((line, li) => {
      const gutter = STYLE.gutter + String(li + 1).padStart(3, ' ') + ' ' + RESET
      const width = Math.max(line.length, li === this.cursor.line ? this.cursor.col + 1 : 0)
      let body = ''
      for (let i = 0; i < width; i++) {
        const ch = i < line.length ? line[i] : ' '
        const label = this.candidateLabelAt(li, i)
        if (label !== undefined) {
          body += STYLE.label + label + RESET
        } else if (this.mode.tag === 'normal' && li === this.cursor.line && i === this.cursor.col) {
          body += STYLE.cursor + ch + RESET
        } else if (this.mode.tag === 'normal' && this.showSpots && this.isSpotForReveal(li, i)) {
          body += STYLE.spotHint + ch + RESET
        } else {
          body += ch
        }
      }
      out.push(gutter + body)
    })
    out.push('')
    out.push(this.statusLine())
    this.term.write(ESC + '2J' + ESC + 'H' + out.join('\r\n'))
  }

  private isSpotForReveal(line: number, col: number): boolean {
    // In reveal mode (normal), compute spots lazily so it works before <CR>.
    if (this.labeled.length === 0) this.labeled = assignLabels(computeSpots(this.lines))
    return this.isSpot(line, col)
  }

  private statusLine(): string {
    if (this.mode.tag === 'jump') {
      const remaining = this.labeled.filter((s) => s.label.startsWith(this.typed)).length
      const typed = this.typed.length > 0 ? `"${this.typed}"` : '(none yet)'
      return (
        STYLE.modeJump + ' JUMP ' + RESET +
        STYLE.dim + `  typed ${typed}   ${remaining} spots left   ·   type labels to narrow, Esc to cancel` + RESET
      )
    }
    return (
      STYLE.modeNormal + ' NORMAL ' + RESET +
      STYLE.dim + '  press <CR> to start a jump   ·   hjkl to move the cursor' + RESET
    )
  }
}

function clamp(value: number, min: number, max: number): number {
  if (max < min) return min
  return Math.min(Math.max(value, min), max)
}
