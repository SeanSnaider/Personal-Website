#!/bin/sh
# Render the link-preview cards in og/ to the PNGs the site's Open Graph tags
# point at. Needs Google Chrome and a network connection (the cards load
# Archivo from Google Fonts).
#
#   sh og/render.sh
#
# Re-run after editing og/home.html, og/bellydsp.html, og/card.css, or
# og/halftone.js, then commit the PNGs in public/.
set -eu

cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PROFILE="$(mktemp -d)"
trap 'rm -rf "$PROFILE"' EXIT

render() {
  # --virtual-time-budget lets web fonts and halftone.js finish before capture.
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
    --allow-file-access-from-files --user-data-dir="$PROFILE" \
    --window-size=1200,630 --force-device-scale-factor=1 \
    --virtual-time-budget=5000 --screenshot="$2" "file://$PWD/og/$1" >/dev/null 2>&1
  echo "wrote $2"
}

render home.html public/og-card.png
render bellydsp.html public/og-bellydsp.png

# Re-rendering replaces the PNGs, which drops the provenance note embedded in
# them. When the impeccable CLI is available, stamp it back.
IMPECCABLE="${IMPECCABLE:-$HOME/.claude/skills/impeccable/scripts/impeccable}"
if [ -x "$IMPECCABLE" ]; then
  "$IMPECCABLE" embed-prompt public/og-card.png --prompt "Origin: rendered from og/home.html (with og/card.css and og/halftone.js) by og/render.sh in headless Chrome at 1200x630. No image generation; the halftone cover is computed on a canvas from public/bellydsp-main-screen.png, a real BellyDSP screenshot supplied by Sean Snaider, and the vinyl and type are CSS."
  "$IMPECCABLE" embed-prompt public/og-bellydsp.png --prompt "Origin: rendered from og/bellydsp.html (with og/card.css) by og/render.sh in headless Chrome at 1200x630. Contains a CSS crop of public/bellydsp-main-screen.png, a real BellyDSP screenshot supplied by Sean Snaider. No image generation."
fi
