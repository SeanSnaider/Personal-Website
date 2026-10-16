/**
 * BellyDSP screenshots: the one place the site learns what the app looks like.
 *
 * When BellyDSP's interface changes, replace the files in `public/` (or point
 * `src` at new ones), update the sizes, alt text and caption here, and re-pick
 * the two crops below by eye against the new image. Everything on the site
 * reads from this file:
 *
 *   - `app`: the Side A track photo and the case study's main screenshot.
 *   - `amps`: the eight amp heads, in the case study's "The redesign".
 *   - `board`: the Post FX board, in the case study's "The redesign".
 *   - `coverCrop`: the square the sleeve's halftone cover is made from
 *     (Turntable.tsx). Pick a close, high-contrast detail; it is screened
 *     into dots, so large flat areas print as plain tone.
 *   - `ampHeadCrop`: the window shown on the BellyDSP link-preview card.
 *
 * Web sizes: `npm run images` (scripts/images.mjs) turns each full-size PNG
 * into WebP files at SCREEN_WIDTHS and cuts the small `cover` square. Re-run it
 * after replacing a screenshot or moving `coverCrop`, and keep the crop and
 * widths there in sync with this file.
 *
 * The link-preview cards in `og/` are plain HTML and cannot import this file:
 * after changing a crop, copy `coverCrop` into og/home.html's `data-crop` and
 * `ampHeadCrop` into og/bellydsp.html's `.plate div` background (the comment
 * there shows the scaling math), then run `sh og/render.sh`.
 */

/** Widths `npm run images` generates for every screenshot, smallest first. */
export const SCREEN_WIDTHS = [800, 1280, 1920] as const;

/** A screenshot and how to describe it. */
export interface Screenshot {
  /** Site-root-relative path to the full-size PNG in `public/`. */
  readonly src: string;
  /** Intrinsic size in pixels, used for layout before the image loads. */
  readonly width: number;
  readonly height: number;
  /** Alt text: what the screenshot shows. */
  readonly alt: string;
  /** Caption shown under it where captions are used. */
  readonly caption: string;
}

/** A square crop, in source-image pixels. */
export interface SquareCrop {
  readonly x: number;
  readonly y: number;
  readonly size: number;
}

/** A rectangular crop, in source-image pixels. */
export interface RectCrop {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

/**
 * The responsive WebP set for a screenshot, from the naming convention
 * `name.png` gives `name-<width>.webp`.
 *
 * @returns `src` (the middle width, the fallback) and `srcSet` for an `<img>`.
 */
export function webSizes(screenshot: Screenshot): { src: string; srcSet: string } {
  const base = screenshot.src.replace(/\.png$/, '');
  const widths = SCREEN_WIDTHS.filter((width) => width <= screenshot.width);
  return {
    src: `${base}-${widths[Math.floor(widths.length / 2)]}.webp`,
    srcSet: widths.map((width) => `${base}-${width}.webp ${width}w`).join(', '),
  };
}

/** The current BellyDSP screenshots and crops (v0.3.0 interface). */
export const bellyDspScreens = {
  app: {
    src: '/bellydsp-main-screen.png',
    width: 2560,
    height: 1520,
    alt: 'The BellyDSP main screen, with the Monolith amp head on a dark stage, a shelf of eight amps above it, a board of drawn pedals in tabs under it, the amp\'s controls at the right, and eight scenes along the bottom',
    caption: 'The main screen in v0.3.0: the Monolith head on the stage, the Pre FX tab of the board, and the inspector at the right.',
  },
  amps: {
    src: '/bellydsp-eight-heads.png',
    width: 1920,
    height: 1005,
    alt: 'The eight built-in amps with their redrawn heads: Glass, Ember, Monolith, Lantern, Basalt, Comet, Forge, and Quartz',
    caption: 'The eight built-in amps with their redrawn heads.',
  },
  board: {
    src: '/bellydsp-board-post-fx.png',
    width: 2560,
    height: 1520,
    alt: "The BellyDSP main screen with the board's Post FX tab open: EQ, compressor, harmonizer, multivoicer, Bloom, chorus, delay, and reverb pedals",
    caption: "The board's Post FX tab.",
  },
  /**
   * The Boost and Overdrive pedals on the Pre FX board, close up: the crop
   * of the main screen that `npm run images` cuts into `cover`.
   */
  coverCrop: { x: 600, y: 890, size: 510 },
  /** The pre-cut cover square (512px WebP) the sleeve's halftone samples. */
  cover: { src: '/bellydsp-cover.webp', size: 512 },
  /** The Monolith amp head with an even 24px margin. */
  ampHeadCrop: { x: 136, y: 226, width: 1693, height: 496 },
} as const satisfies {
  app: Screenshot;
  amps: Screenshot;
  board: Screenshot;
  coverCrop: SquareCrop;
  cover: { src: string; size: number };
  ampHeadCrop: RectCrop;
};
