# Scratchpad — resume notes

**Two tracks (don't conflate):**
1. **Skill / CLAUDE.md development** (meta/tooling) — see "Modes idea" below + `docs/claude-md-eval.md`.
2. **Vim / MiniMax learning** — Neovim config eval + `apps/tutorial/` (jump2d tutorial).

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


---



## Modes idea (meta / tooling)

Premise:
7. Modes beat inline rules: a mode is a small, named, hard-enforced state (few degrees of freedom → near-100% compliance). `/d` discuss = no-tools, works every time. Inline CLAUDE.md rules erode; hard constraints don't.
8. TMI/tldr loop already produces good succinct output — because the *second* pass has a draft to cut toward. First pass bloats (generating + judging at once). Make that second pass the default.

Succinct mode spec:
9. Reply = tldr only + `(N items withheld)` line, then STOP; user pulls more.
10. Skipped-count is an honesty signal — terse never silently hides; user can audit omission ("expand item N" / "expand all" / "exit").
11. Decision: generate-then-suppress (not regenerate) so expansion is faithful and the withheld count is accurate.

Candidate minimum mode set (overlap → succinct may be a modifier, not its own mode):
12. [ ] discuss (exists), succinct, advise (recommend not do), bug-finding, review. Settle the *minimum* set + which are hard-enforced vs tonal.

Related:
13. [ ] Rule 4 (verify-before-fact) stays. Failure seen this session: one instance → universal "Fact:" leap (rules-always-loaded). Label tiers: observation vs hypothesis vs verified.
14. [ ] "How to write CLAUDE.md" rule → global `~/.claude/rules/`, not this project's CLAUDE.md (cross-project scope). Omit-by-default: cheap to add a doc line later, costly to keep a stale one.
https://github.com/Aider-AI/aider.git


---

1. We have onlyh sub account
2. many software need api key and we are stull cant uses tools.
3. lm studo can help by converting sub into an api.
4. aider is a lmstudio plugin that can expose our subased to api based.
5. we have multiple pages that maket is happen
6. Now we have to figure what the final consolidated plain.


7. ==== To be filled by AI====

8. Plan — expose Claude Code CLI as a local API:
9. Write HTTP server that:
   9.1 listens on a port (8787),
   9.2 accepts POST /v1/messages,
   9.3 runs `claude -p "<prompt>" --output-format json` (or Agent SDK),
   9.4 returns `{ content: [{ type: "text", text: "..." }] }`.
10. Start the server
11. Point tools at it: `ANTHROPIC_BASE_URL=http://localhost:8787`.
    
vim.pack.add { { src = "https://github.com/catppuccin/nvim", name = "catppuccin" } }
vim.pack.add { { src = "https://github.com/folke/tokyonight.nvim", name = "tokyonight" } }

