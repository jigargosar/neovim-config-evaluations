# Scratchpad — resume notes

**State (2026-06-21):** Neovim config eval in progress. Building a React tutorial
app for Mini.jump2d; blocked on Treesitter parsers failing to compile (zig-cc
wrapper fix pending — see roadmap "Open blocker").

## In flight
- `apps/tutorial/` — Vite + React 19 + Tailwind v4 interactive jump2d tutorial.
- pnpm monorepo root (`pnpm-workspace.yaml`, `apps/*`).

## Resume here
- [ ] Apply zig-cc wrapper fix, rebuild lua/vimdoc/markdown parsers.
- [ ] Document each config's plugin manager + update flow.
- [ ] Decide daily driver.

## Notes
- Local LLM for coding on RTX 3070 8GB + 32GB RAM: Qwen2.5-Coder 7B Q4_K_M
  (FIM/completion); Qwen3.6-35B-A3B for chat. Keep ctx 4-8K, full GPU offload.
