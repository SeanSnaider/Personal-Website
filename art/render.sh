#!/bin/sh
# Render the project illustrations in art/ to the PNGs the site shows for
# Sanguine and Systems Programming. Needs Google Chrome and a network
# connection (the art loads Archivo from Google Fonts).
#
#   sh art/render.sh
set -eu

cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PROFILE="$(mktemp -d)"
trap 'rm -rf "$PROFILE"' EXIT

render() {
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
    --allow-file-access-from-files --user-data-dir="$PROFILE" \
    --window-size=1600,800 --force-device-scale-factor=1 \
    --virtual-time-budget=5000 --screenshot="$2" "file://$PWD/art/$1" >/dev/null 2>&1
  echo "wrote $2"
}

render sanguine.html public/project-sanguine-art.png
render systems.html public/project-systems-art.png

IMPECCABLE="${IMPECCABLE:-$HOME/.claude/skills/impeccable/scripts/impeccable}"
if [ -x "$IMPECCABLE" ]; then
  "$IMPECCABLE" embed-prompt public/project-sanguine-art.png --prompt "Origin: illustration rendered from art/sanguine.html by art/render.sh in headless Chrome at 1600x800, drawn in HTML/CSS in the site palette after the Sanguine game's real board layout. No image generation."
  "$IMPECCABLE" embed-prompt public/project-systems-art.png --prompt "Origin: illustration rendered from art/systems.html by art/render.sh in headless Chrome at 1600x800, a diagram of the FUSE filesystem's 1 MB disk image drawn in HTML/CSS in the site palette. No image generation."
fi
