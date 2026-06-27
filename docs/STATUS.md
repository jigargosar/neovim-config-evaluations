# STATUS

Living snapshot — **where we are now** and **where to go next**. Overwrite this
file as things change; do not append history (git holds history). For *what/why*,
read `../CLAUDE.md`.

## Where we are now

- **Phase 2 of 5** (generate first real demo — jump2d). Phase 1 (prove pipeline)
  is done. See "Workflow → Phases" in `../CLAUDE.md`.
- Format is decided: a data-driven **book** (demo visual + `:h` + quiz + cheatsheet).
- Visual pipeline = **VHS in WSL2**. It is **proven for a trivial bash `echo` only**
  (`tools/vhs/hello.gif`). Rendering **real Neovim + a mini plugin is NOT yet
  verified** — this is the next thing to prove.
- WSL2 Ubuntu has `vhs`, `ttyd`, `ffmpeg`, `nvim` installed (`tools/vhs/00-setup.sh`).
- The old React simulator app is archived under
  `docs/archive/half-hearted-simulation/`; the repo is now docs + tools.
- Nothing of the book itself is built yet (no chapters, no vehicle).

## Where to go next

1. **Generate the jump2d demo** (this also proves real nvim+mini rendering):
   - `tools/vhs/jump2d-init.lua` — minimal init loading only `mini.jump2d`
     (+ miniwinter colors); bootstrap `mini.nvim` via `vim.pack` or point at the
     existing MiniMax plugin dir.
   - `tools/vhs/sample.lua` — small buffer with snake_case/camelCase for varied spots.
   - `tools/vhs/20-jump2d.sh` — tape: open sample, `<Enter>` to label, pause so
     labels are readable, type a label, jump. Output `tools/vhs/jump2d.gif`.
   - Run inside WSL: `cd /mnt/c/Users/jigar/projects/neovim-config-evaluations/tools/vhs && bash 20-jump2d.sh`
2. Once a demo renders well: write the **jump2d chapter** (visual + `:h` + quiz +
   cheatsheet), then choose the book vehicle and generalize.

## Open gaps

- Real nvim+mini render unproven (see above).
- `mini.nvim` not yet available to a minimal WSL init.
- No book vehicle chosen or built; no chapter content for any module.
- Scale unproven: ~40 modules each need a tape + timing tuning.
- Cheatsheet "single source → `docs/` export" is designed, not built.
- Track 1 (daily-driver decision; Treesitter `zig-cc` parser blocker) untouched.

## Open decisions

- Book vehicle: plain **markdown** vs a new **React app**.
- Demo format: **GIF** (simple, larger) vs **MP4** (smaller, sharper).
- Demo init: bootstrap `mini.nvim` fresh vs reuse the installed MiniMax config.

## Dead-ends (do not revisit)

- Chat back-and-forth tutoring — wrong medium.
- Per-module / generic browser emulators — don't scale / lack mini plugins.
- Scripted snapshot playback — fake; only one path works.
- VHS on **Windows** — hangs at the headless-Chromium render step; use WSL2.
- Downloading official demo MP4s — we want generated, faithful demos (and they'd
  bloat git); generate instead.
