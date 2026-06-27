#!/usr/bin/env bash
# Run inside WSL2 Ubuntu. Installs the only missing VHS deps and verifies tools.
set -euo pipefail

echo "== apt update =="
sudo apt-get update -y

echo "== install ttyd, ffmpeg, fonts, and headless-chromium shared libs =="
sudo apt-get install -y \
  ttyd ffmpeg fonts-dejavu-core \
  libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 \
  libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 \
  libpango-1.0-0 libcairo2 libasound2t64

echo "== versions =="
vhs --version
ttyd --version
ffmpeg -version | head -1
nvim --version | head -1

echo "setup OK"
