export interface QuizQuestion {
  id: string
  prompt: string
  options: string[]
  answerIndex: number
  explanation: string
}

/** Buffer the simulator renders. Mixes snake_case, camelCase and punctuation
 *  so the default spotter has plenty of variety to label. */
export const SAMPLE_BUFFER: string[] = [
  'local function setup_jump(target_window)',
  '  local spots = MiniJump2d.start()',
  '  for i, spot in ipairs(spots) do',
  '    spot.label = pick_label(i, spots)',
  '  end',
  '  return spots, target_window',
  'end',
]

export const QUIZ: QuizQuestion[] = [
  {
    id: 'start-key',
    prompt: 'In MiniMax, which key starts a mini.jump2d jump?',
    options: ['f', '<CR> (Enter)', 's', '<Leader>j'],
    answerIndex: 1,
    explanation:
      'MiniMax uses mini.jump2d defaults, where mappings.start_jumping is <CR>. Press Enter in Normal mode to label every spot on screen.',
  },
  {
    id: 'spotter',
    prompt: 'By default, where does mini.jump2d place its labels?',
    options: [
      'On every single character on screen',
      'Only at the start of each line',
      'At word-group starts/ends, alphanumerics next to punctuation, and uppercase starts',
      'Only on the word under the cursor',
    ],
    answerIndex: 2,
    explanation:
      'default_spotter targets start/end of non-whitespace groups, alphanumerics adjacent to punctuation (great for snake_case), and the start of uppercase groups (great for camelCase).',
  },
  {
    id: 'labels',
    prompt: 'There are 26 labels (a–z) but the screen has ~40 spots. What happens?',
    options: [
      'Only the first 26 spots are jumpable',
      'Some spots get two-key labels; typing the first key filters them down',
      'It refuses to start and shows an error',
      'It switches to numbers instead of letters',
    ],
    answerIndex: 1,
    explanation:
      'Labels are distributed equally. With more spots than labels, some spots share a first key. Typing it filters the candidates, then you type the next key — iterative label filtering.',
  },
  {
    id: 'commit',
    prompt: 'After the labels appear, how do you actually jump?',
    options: [
      'Press <CR> again',
      'Type label characters until the target spot is unique',
      'Move with hjkl to the label',
      'Click the spot with the mouse',
    ],
    answerIndex: 1,
    explanation:
      'You keep typing label characters. As soon as the typed prefix identifies a unique spot, the cursor jumps there.',
  },
  {
    id: 'vs-mini-jump',
    prompt: 'How does mini.jump2d differ from mini.jump?',
    options: [
      'They are the same module with two names',
      'mini.jump2d only works in Insert mode',
      'mini.jump2d labels many spots across the screen; mini.jump enhances single-char f/F/t/T across lines',
      'mini.jump is for windows, mini.jump2d is for buffers',
    ],
    answerIndex: 2,
    explanation:
      'mini.jump makes f/F/t/T smarter (multi-line, repeatable). mini.jump2d is the 2D labelled-jump to any visible spot, started with <CR>.',
  },
]
