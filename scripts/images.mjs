/**
 * Generate the web-sized BellyDSP images from the full-size PNGs in public/.
 *
 *   npm run images
 *
 * Writes, next to each source PNG:
 *   - `<name>-<width>.webp` at each width in WIDTHS (never upscaled), used by
 *     the site's `srcset` (see src/data/screens.ts);
 *   - `bellydsp-cover.webp`, the small square the sleeve's halftone cover is
 *     sampled from, cropped from the main screen at COVER_CROP.
 *
 * Re-run after replacing a screenshot or changing the cover crop, then commit
 * the generated files. The full-size PNGs stay as the source of truth and as
 * what the link-preview cards in og/ render from.
 */

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (name) => path.join(root, 'public', name);

/** Widths to generate for every screenshot. Keep in sync with screens.ts. */
const WIDTHS = [800, 1280, 1920];

/** Screenshots to resize. */
const SCREENSHOTS = ['bellydsp-main-screen', 'bellydsp-eight-heads', 'bellydsp-board-post-fx'];

/**
 * The cover crop, in pixels of bellydsp-main-screen.png. Keep in sync with
 * `coverCrop` in src/data/screens.ts. Output is COVER_SIZE square: the
 * halftone samples one pixel per 7px cell, so a 460px sleeve needs well
 * under 512px of source even on a 2x screen.
 */
const COVER_CROP = { left: 600, top: 890, width: 510, height: 510 };
const COVER_SIZE = 512;

/** WebP quality: 82 is visually lossless for flat UI screenshots. */
const QUALITY = 82;

for (const name of SCREENSHOTS) {
  const source = pub(`${name}.png`);
  const { width: sourceWidth } = await sharp(source).metadata();
  for (const width of WIDTHS) {
    if (width > sourceWidth) continue;
    const out = pub(`${name}-${width}.webp`);
    const info = await sharp(source).resize({ width }).webp({ quality: QUALITY }).toFile(out);
    console.log(`${path.basename(out)}  ${Math.round(info.size / 1024)} KB`);
  }
}

const cover = pub('bellydsp-cover.webp');
const info = await sharp(pub('bellydsp-main-screen.png'))
  .extract(COVER_CROP)
  .resize(COVER_SIZE, COVER_SIZE)
  .webp({ quality: QUALITY })
  .toFile(cover);
console.log(`${path.basename(cover)}  ${Math.round(info.size / 1024)} KB`);
