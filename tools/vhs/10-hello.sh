#!/usr/bin/env bash
# Run inside WSL2 Ubuntu after 00-setup.sh. Renders a trivial hello-world gif.
set -euo pipefail
cd "$(dirname "$0")"

cat > hello.tape <<'TAPE'
Output hello.gif
Set Shell bash
Set Width 800
Set Height 240
Set FontSize 18
Set Padding 12
Type "echo hello world from vhs in wsl2"
Sleep 500ms
Enter
Sleep 1s
TAPE

echo "== running vhs (first run downloads a headless chromium into ~/.cache/rod) =="
vhs hello.tape

ls -la hello.gif
echo "Done. Open from Windows: tools\\vhs\\hello.gif"
