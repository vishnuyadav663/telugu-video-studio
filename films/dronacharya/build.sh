#!/usr/bin/env bash
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
LIB="${LIB:-$(cd "$HERE/../.." && pwd)/.lemo-opuscar}"
export LIB
PY="$LIB/.venv/bin/python"
mkdir -p "$HERE/out/voice"
cd "$LIB"
sh plugin/skills/lemo-opuscar/scripts/setup.sh deps voice music
PY="$LIB/.venv/bin/python"
"$PY" core/tts/tts_zh.py "$HERE/lines.json" "$HERE/out/voice" --voice te-IN-MohanNeural --rate +3%
node core/render/events.mjs "$HERE"
node core/render/still.mjs "$HERE" 2 9 16 23 28 --size 1080x1920 --out "$HERE/out/stills"
node core/render/video.mjs "$HERE" --fps 30 --size 1080x1920 --workers 2 --out "$HERE/out/picture.mp4"
"$PY" "$HERE/mix.py"
sh core/render/mux.sh "$HERE/out/picture.mp4" "$HERE/out/mix.wav" "$HERE/out/dronacharya-telugu.mp4" 30 0
