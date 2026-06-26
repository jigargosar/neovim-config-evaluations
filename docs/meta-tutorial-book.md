# Meta — MiniMax tutorial book (design decisions)

Captures *how* we decided to teach the MiniMax plugins, and why other approaches
were rejected. This is the design record for the tutorial; not the content itself.

## Goal

Learn all MiniMax plugins (~35 MINI modules + 5 external). For each: understand
what it does visually, cross-reference the official `:h`, self-test with a quiz,
and keep a reusable cheatsheet.

## Approaches tried and rejected

1. **Chat back-and-forth tutoring** (Claude narrates, user performs, reports back).
   Rejected: too much ping-pong; wrong medium for muscle memory.
2. **Native `:Tutor` files** (.tutor in config's `tutor/` dir, self-grading).
   Considered; rejected with the other options below — not visual.
3. **Per-module browser emulator** (simulate each plugin's logic in JS).
   Rejected: doesn't scale — one bespoke simulator per module (~40). The original
   `apps/tutorial/sim/jump2dSim.ts` is exactly this dead end.
4. **Real nvim streamed to browser** (xterm.js + node-pty spawning real config).
   Faithful and scales, but needs a local server (not static) — set aside.
5. **Generic vim emulator** (codemirror-vim / vim.wasm).
   Rejected: emulates *core vim only* — has no mini.files / jump2d, which are the
   exact things to learn.
6. **Scripted snapshot playback** (pre-recorded screen frames, advance on key).
   Rejected: fake; only the recorded path works.

Core lesson: emulation (full or per-part) is the trap. A **book with real demo
visuals** removes the simulator entirely, so it scales.

## Chosen design — data-driven book

7. Vehicle: the existing `apps/tutorial/` React app (Vite + React 19 + Tailwind v4).
   Earlier rejection was about the *simulator*, not the app; a book has none.
8. A chapter = one data object:
   `{ id, module, video, oneLiner, help[], cheatsheet[], quiz[] }`.
9. Reuse `QuizSection` (already fully data-driven). Generalize `ExplainSection`
   (currently hardcoded jump2d prose) to render from chapter data.
10. `cheatsheet[]` is the **single source** → renders in-app *and* exports to
    `docs/reference/cheatsheet.md`. App and reference never drift.
11. Delete the dead emulation layer: `sim/spotter.ts`, `sim/jump2dSim.ts`,
    `SimulateSection.tsx`; drop the `@xterm/xterm` dependency.

## Verified facts (checked, not assumed)

12. Official demos are **MP4 videos, not GIFs**: `demo-files.mp4`,
    `demo-jump2d.mp4`, etc.
13. They live in a **separate repo** `nvim-mini/assets`, `demo/` folder (project
    moved from `echasnovski` org to `nvim-mini`).
14. `nvim-mini/assets` is **MIT licensed** → we may vendor/embed the videos.
15. Visual = `<video autoplay loop muted playsinline>` (MP4), not GIF.
16. Decision pending: **vendor** MP4s into `apps/tutorial/public/demo/`
    (recommended — offline, robust) vs hotlink raw GitHub.
17. NOT verified: whether all ~40 modules have a demo video. Confirmed only for
    files + jump2d. Check per-chapter while scaling; record a clip where upstream
    has none.

## Plugin inventory (from `docs/reference/minimax/configs/nvim-0.13/plugin/`)

18. MINI enabled (~35): basics, icons, notify, sessions, starter, statusline,
    tabline, completion, files, misc, extra, ai, align, bracketed, bufremove,
    clue, cmdline, comment, diff, git, hipatterns, indentscope, jump, jump2d,
    keymap, map, move, operators, pairs, pick, snippets, splitjoin, surround,
    trailspace, visits.
19. MINI present but OFF (opt-in via `gcc`): animate, colors, cursorword.
20. External (5): nvim-treesitter, nvim-treesitter-textobjects, nvim-lspconfig,
    conform.nvim, friendly-snippets.
21. `30_mini.lua` already documents each module (purpose + example keys + `:h`) —
    it is the source material for chapter prose and cheatsheets.

## Next steps

22. Decide vendor-vs-hotlink for MP4s.
23. Build first two chapters (files + jump2d) to prove the format.
24. Generalize `ExplainSection`, add chapter-list nav (replace single `<Chapter/>`).
25. Wire `cheatsheet[]` → `docs/reference/cheatsheet.md` export.
26. Scale to remaining modules, sourcing `30_mini.lua` + official `:h`.
