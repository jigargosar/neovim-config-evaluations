// Pure re-implementation of mini.jump2d's DEFAULT spotter + label assignment.
//
// Sources of truth (verified against the live MiniMax config and official docs):
//   - start key: <CR>            (mappings.start_jumping default)
//   - labels:    a..z            (labels default)
//   - default_spotter spots at:
//       * start OR end of a non-whitespace character group
//       * an alphanumeric char immediately next to punctuation (snake_case)
//       * the start of an uppercase group (camelCase)
//   - labels are distributed equally across spots; with more spots than labels
//     some get multi-key labels, narrowed by iterative filtering.

export const DEFAULT_LABELS = 'abcdefghijklmnopqrstuvwxyz'

export type SpotReason =
  | 'group-start'
  | 'group-end'
  | 'punct-adjacent'
  | 'upper-start'

export interface Spot {
  line: number
  col: number
  reasons: SpotReason[]
}

export interface LabeledSpot extends Spot {
  label: string
}

const isWS = (c: string): boolean => c === ' ' || c === '\t'
const isAlnum = (c: string): boolean => /[0-9A-Za-z]/.test(c)
const isUpper = (c: string): boolean => /[A-Z]/.test(c)
const nonWS = (c: string): boolean => c !== '' && !isWS(c)
const isPunct = (c: string): boolean => nonWS(c) && !isAlnum(c)

/** Compute the spots mini.jump2d's default spotter would place on `lines`. */
export function computeSpots(lines: string[]): Spot[] {
  const spots: Spot[] = []
  lines.forEach((line, lineIdx) => {
    for (let i = 0; i < line.length; i++) {
      const c = line[i]
      if (isWS(c)) continue
      const prev = i > 0 ? line[i - 1] : ''
      const next = i < line.length - 1 ? line[i + 1] : ''
      const reasons: SpotReason[] = []
      if (!nonWS(prev)) reasons.push('group-start')
      if (!nonWS(next)) reasons.push('group-end')
      if (isAlnum(c) && (isPunct(prev) || isPunct(next))) reasons.push('punct-adjacent')
      if (isUpper(c) && !isUpper(prev)) reasons.push('upper-start')
      if (reasons.length > 0) spots.push({ line: lineIdx, col: i, reasons })
    }
  })
  return spots
}

/**
 * Build prefix-free label strings for `n` spots from `labels`, matching
 * mini.jump2d's equal distribution. Example (n=10, labels="abc"):
 * first chars "aaaabbbccc"; the four "a" spots then carry "aabc".
 */
function buildLabelStrings(n: number, labels: string[]): string[] {
  if (n <= 0) return []
  if (n <= labels.length) return labels.slice(0, n)
  const k = labels.length
  const base = Math.floor(n / k)
  const rem = n % k
  const out: string[] = []
  for (let i = 0; i < k; i++) {
    const size = base + (i < rem ? 1 : 0)
    if (size <= 0) continue
    for (const sub of buildLabelStrings(size, labels)) out.push(labels[i] + sub)
  }
  return out
}

/** Assign mini.jump2d-style labels to spots in reading order. */
export function assignLabels(spots: Spot[], alphabet: string = DEFAULT_LABELS): LabeledSpot[] {
  const labels = buildLabelStrings(spots.length, alphabet.split(''))
  return spots.map((spot, i) => ({ ...spot, label: labels[i] }))
}
