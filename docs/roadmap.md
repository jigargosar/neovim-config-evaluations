# Neovim Config Evaluations — Roadmap

## Goal
Evaluate my two Neovim configs and settle on one daily driver.

## Configs
- **nvim-minimax** (active) — MINI-based, uses Neovim's built-in `vim.pack`.
  Path: `~/AppData/Local/nvim-minimax/`, data: `~/AppData/Local/nvim-minimax-data/`
- **nvim** (other) — to evaluate.

## Open blocker
Treesitter parsers won't compile. Only `zig` (0.16) is available as a compiler,
and the Windows user env `CC="zig cc"` has a space → `tree-sitter build` tries to
spawn a program literally named `"zig cc"` → `ENOENT`.
Fix: single-token `zig-cc` wrapper, point `CC` at it, rebuild lua/vimdoc/markdown.

## Next
- [ ] Fix parser build (zig-cc wrapper)
- [ ] Document each config's plugin manager + update flow
- [ ] Decide daily driver
