/**
 * The record: sleeve, vinyl, and tonearm, drawn as one object.
 *
 * Seen from above: the sleeve lies on the left edge of a turntable, and the
 * record sits on the platter, slid out of the sleeve on load. The sleeve's
 * cover is a real halftone of the BellyDSP Amp page, rendered on a canvas at
 * mount. The vinyl is SVG: grooves, a lighter gap between tracks, and one band
 * per track sized by `Track.weight`. The tonearm swings to the cued track's
 * band, so hovering the tracklist visibly "finds" each track.
 *
 * Three stacked SVGs share one coordinate system: the platter (static), the
 * disc (the only part that slides in), and the tonearm (static, on top).
 *
 * Layout is in percentages of a 780x600 stage, so the whole object scales with
 * its container and keeps its proportions on every screen.
 */

import { useEffect, useMemo, useRef } from 'react';
import { cn } from '../lib/utils';
import { tracksBySide, type Side, type Track } from '../data/tracks';
import { catalogNumber, heroAnnouncement, profile } from '../data/portfolio';
import { bellyDspScreens } from '../data/screens';

/* -------------------------------------------------------------------------
   Vinyl and tonearm geometry, in the SVG's own units (viewBox 720 x 640).
   ------------------------------------------------------------------------- */

const VIEW_W = 720;
const VIEW_H = 640;
/** Center of the disc. */
const CX = 300;
const CY = 340;
/** Outer edge of the disc, and of the platter under it. */
const R_DISC = 296;
const R_PLATTER = 308;
/** Outermost and innermost recorded groove; the label sits inside R_RUNOUT. */
const R_LEAD_IN = 284;
const R_RUNOUT = 118;
const R_LABEL = 100;
/** Unrecorded gap between two tracks, cut as a lighter ring. */
const TRACK_GAP = 4;

/** Tonearm pivot, and the distance from the pivot to the stylus. */
const PIVOT_X = 590;
const PIVOT_Y = 60;
const ARM_LENGTH = 380;
/** Where the stylus rests when no track is cued: just off the disc. */
const R_REST = 330;

/**
 * The tonearm angle (degrees, from +x toward +y) that puts the stylus at
 * distance `r` from the disc center.
 *
 * The stylus sits at pivot + L(cos φ, sin φ). With P the vector from the disc
 * center to the pivot, we need |P + L·u| = r, which expands to
 *   |P|² + L² + 2L(P·u) = r²   so   P·u = (r² − |P|² − L²) / 2L.
 * Writing P·u = |P| cos(φ − α), where α is P's angle, gives
 *   φ = α + acos((r² − |P|² − L²) / (2L|P|)).
 * The "+" root is the one where the arm hangs over the record and swings
 * inward as r shrinks, like a real arm. Clamped so it never goes NaN.
 */
function tonearmAngle(r: number): number {
  const px = PIVOT_X - CX;
  const py = PIVOT_Y - CY;
  const pLength = Math.hypot(px, py);
  const alpha = Math.atan2(py, px);
  const cosine = (r * r - pLength * pLength - ARM_LENGTH * ARM_LENGTH) / (2 * ARM_LENGTH * pLength);
  const phi = alpha + Math.acos(Math.max(-1, Math.min(1, cosine)));
  return (phi * 180) / Math.PI;
}

/**
 * Where every stage SVG sits on the 780x600 stage.
 *
 * The sleeve is 460 stage px square (58.974% wide, top 70px). A 12-inch record
 * is about 97% of its sleeve, so the disc's diameter is 0.97 · 460 = 446 stage
 * px, which scales the 592-unit disc by s = 0.754. The disc is pulled out far
 * enough that the whole center label clears the sleeve with a 16px margin:
 *   center x = 460 + 16 + R_LABEL · s = 551,  center y = 70 + 230 = 300.
 * The viewBox origin then lands at (551 − 300s, 300 − 340s) = (325, 44), and
 * the box is 720s by 640s = 543 by 483, all expressed as stage percentages.
 * In SVG units the sleeve edge is at x = (460 − 325) / s = 179, left of every
 * band the stylus can land on (x 410 to 561), so every cue lands in view.
 */
const STAGE_SVG = 'absolute left-[41.64%] top-[7.27%] h-[80.43%] w-[69.6%] overflow-visible';

/** A track's band on the vinyl: its outer and inner radius. */
interface Band {
  readonly track: Track;
  readonly outer: number;
  readonly inner: number;
}

/**
 * Split the recorded area of one side into bands, widths proportional to each
 * track's weight, with an unrecorded gap between neighbours.
 */
function bandsFor(tracks: readonly Track[]): Band[] {
  const totalWeight = tracks.reduce((sum, track) => sum + track.weight, 0);
  const usable = R_LEAD_IN - R_RUNOUT - TRACK_GAP * (tracks.length - 1);
  let outer = R_LEAD_IN;
  return tracks.map((track) => {
    const width = (usable * track.weight) / totalWeight;
    const band = { track, outer, inner: outer - width };
    outer = band.inner - TRACK_GAP;
    return band;
  });
}

/* -------------------------------------------------------------------------
   Sleeve cover: halftone of the real Amp page screenshot.
   ------------------------------------------------------------------------- */

/**
 * The image the cover is made from: an 18 KB pre-cut square rather than the
 * 1.5 MB full screenshot, so the first viewport's centerpiece loads fast.
 * Defined in `src/data/screens.ts`.
 */
const COVER_SOURCE = bellyDspScreens.cover.src;
/** The whole pre-cut cover square (already cropped by `npm run images`). */
const COVER_CROP = { x: 0, y: 0, size: bellyDspScreens.cover.size };
/**
 * Halftone cell size, in CSS pixels: a coarse screen on large sleeves and a
 * finer one on phones, so the cover's detail (knobs, lettering) keeps enough dots to
 * read at about 270px.
 */
function halftoneCell(sleeveSize: number): number {
  return sleeveSize < 360 ? 4.5 : 7;
}

/**
 * Minimum ink density. Real halftone screens never print a solid void in
 * the shadows; a small floor keeps the screenshot's flat dark bands reading
 * as deep tone instead of as empty UI stripes.
 */
const TONE_FLOOR = 0.14;

/**
 * Turn the crop into per-cell tones in 0..1, ready to screen.
 *
 * The source is a flat UI screenshot, so two corrections make it read as a
 * photograph of an object rather than a dot-matrix of a screen:
 *   1. Contrast stretch: map the 4th to 96th percentile of luminance onto
 *      0..1, so the knob faces and rings span the full tonal range.
 *   2. Light falloff: multiply by a soft radial falloff (brightest a little
 *      above center, 45% at the corners), the way a lit product shot does.
 * Luminance uses the Rec. 709 weights.
 */
function toneMap(pixels: Uint8ClampedArray, cells: number): Float32Array {
  const tones = new Float32Array(cells * cells);
  for (let index = 0; index < tones.length; index += 1) {
    const offset = index * 4;
    tones[index] = (0.2126 * pixels[offset] + 0.7152 * pixels[offset + 1] + 0.0722 * pixels[offset + 2]) / 255;
  }

  const sorted = Float32Array.from(tones).sort();
  const low = sorted[Math.floor(sorted.length * 0.04)];
  const high = sorted[Math.floor(sorted.length * 0.96)];
  const span = Math.max(high - low, 1e-3);

  for (let row = 0; row < cells; row += 1) {
    for (let col = 0; col < cells; col += 1) {
      const dx = (col + 0.5) / cells - 0.5;
      const dy = (row + 0.5) / cells - 0.42;
      const falloff = 1 - 0.55 * Math.min(1, (dx * dx + dy * dy) / 0.5);
      const index = row * cells + col;
      const stretched = Math.min(1, Math.max(0, (tones[index] - low) / span));
      tones[index] = (TONE_FLOOR + (1 - TONE_FLOOR) * stretched) * falloff;
    }
  }
  return tones;
}

/**
 * Draw the cover as a two-ink, amplitude-modulated halftone (a duotone).
 *
 * Ink one, label red, screens every tone on the main grid. Ink two, sleeve
 * ink, screens only the highlights (tone above 0.6) on a second grid offset by
 * half a cell, the way a second plate is screened at a different angle so the
 * two dot patterns interleave instead of stacking. In both, a dot's radius is
 * maxRadius · sqrt(tone), because dot *area* (∝ r²) is what the eye reads as
 * tone. Sampling draws the crop one pixel per cell, so the browser's own
 * downscaling averages each cell.
 */
function useHalftone(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    const image = new Image();
    image.src = COVER_SOURCE;

    const draw = () => {
      if (cancelled || !canvas.isConnected) return;
      const cssSize = canvas.getBoundingClientRect().width;
      if (cssSize === 0) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssSize * ratio);
      canvas.height = Math.round(cssSize * ratio);
      const context = canvas.getContext('2d');
      if (!context) return;

      const cell = halftoneCell(cssSize);
      const cells = Math.ceil(cssSize / cell);
      const sampler = document.createElement('canvas');
      sampler.width = cells;
      sampler.height = cells;
      const sample = sampler.getContext('2d', { willReadFrequently: true });
      if (!sample) return;
      sample.imageSmoothingQuality = 'high';
      sample.drawImage(image, COVER_CROP.x, COVER_CROP.y, COVER_CROP.size, COVER_CROP.size, 0, 0, cells, cells);
      const tones = toneMap(sample.getImageData(0, 0, cells, cells).data, cells);

      const styles = getComputedStyle(canvas);
      const firstInk = styles.color;
      const secondInk = styles.getPropertyValue('--second-ink').trim() || '#e8e5de';
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, cssSize, cssSize);

      const dot = (x: number, y: number, radius: number) => {
        if (radius < 0.35) return;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill();
      };

      context.fillStyle = firstInk;
      for (let row = 0; row < cells; row += 1) {
        for (let col = 0; col < cells; col += 1) {
          const tone = tones[row * cells + col];
          dot((col + 0.5) * cell, (row + 0.5) * cell, cell * 0.6 * Math.sqrt(tone));
        }
      }

      context.fillStyle = secondInk;
      for (let row = 0; row < cells - 1; row += 1) {
        for (let col = 0; col < cells - 1; col += 1) {
          // Highlights sampled between four cells, drawn on the offset grid.
          const tone =
            (tones[row * cells + col] +
              tones[row * cells + col + 1] +
              tones[(row + 1) * cells + col] +
              tones[(row + 1) * cells + col + 1]) /
            4;
          const highlight = Math.max(0, (tone - 0.6) / 0.4);
          dot((col + 1) * cell, (row + 1) * cell, cell * 0.42 * Math.sqrt(highlight));
        }
      }
    };

    image.addEventListener('load', draw);
    const observer = new ResizeObserver(() => image.complete && draw());
    observer.observe(canvas);
    return () => {
      cancelled = true;
      image.removeEventListener('load', draw);
      observer.disconnect();
    };
  }, [canvasRef]);
}

/** The square sleeve front. */
function Sleeve() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHalftone(canvasRef);

  return (
    <div className="absolute left-0 top-[11.667%] z-10 aspect-square w-[58.974%] overflow-hidden bg-board-raised shadow-[0_28px_60px_-24px_rgb(0_0_0/0.8)]">
      {/* The halftone takes its first ink from `color` and its second from
          `--second-ink`. */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full text-label [--second-ink:var(--color-ink)]"
      />

      {/* Ring wear: the faint circle a record presses into its sleeve over
          years on a shelf. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0_43.5%,rgb(232_229_222/0.07)_44.5%_46%,transparent_47%)]"
      />

      <p className="absolute left-[6%] top-[5.5%] font-expanded text-[clamp(10px,1.35vw,15px)] font-bold uppercase tracking-[0.2em] text-ink">
        {profile.name}
      </p>
      <p className="absolute bottom-[5.5%] left-[6%] font-expanded text-[clamp(24px,3.6vw,46px)] font-extrabold leading-[0.92] tracking-[-0.02em] text-ink">
        Selected
        <br />
        Works
      </p>
      <p className="absolute bottom-[6%] right-[6%] font-expanded text-[clamp(9px,1.05vw,12px)] font-semibold tracking-[0.18em] text-ink">
        {catalogNumber}
      </p>

      {/* Hype sticker on the shrink-wrap, pointing at the newest release. */}
      {heroAnnouncement && (
        <a
          href={heroAnnouncement.href}
          className="absolute right-[4%] top-[4%] flex aspect-square w-[36%] -rotate-[9deg] sm:right-[5%] sm:top-[5%] sm:w-[29%] flex-col items-center justify-center rounded-full bg-ink p-[3%] text-center text-board shadow-[0_6px_14px_-6px_rgb(0_0_0/0.6)] transition-transform duration-300 hover:-rotate-[4deg] hover:scale-[1.04]"
        >
          <span className="font-expanded text-[clamp(10px,1vw,12px)] font-extrabold uppercase tracking-[0.12em] text-label-deep">
            {heroAnnouncement.tag}
          </span>
          <span className="mt-[4%] font-semi-expanded text-[clamp(11px,0.95vw,12.5px)] font-bold leading-[1.15]">
            {heroAnnouncement.text}
          </span>
        </a>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   Vinyl and tonearm.
   ------------------------------------------------------------------------- */

/** Props for {@link Vinyl}. */
interface VinylProps {
  /** The cued track, or `null` when the arm is at rest. */
  cued: Track | null;
  /** Which side faces up. Follows the cued track. */
  side: Side;
  /** Called when a band is hovered (or `null` when the pointer leaves). */
  onCue: (track: Track | null) => void;
}

/** The disc, its bands, the center label, and the tonearm. */
function Vinyl({ cued, side, onCue }: VinylProps) {
  const bands = useMemo(() => bandsFor(tracksBySide[side]), [side]);
  const cuedBand = bands.find((band) => band.track.code === cued?.code);
  // The stylus lands just inside the band's outer edge, where the track starts.
  const armAngle = tonearmAngle(cuedBand ? cuedBand.outer - 5 : R_REST);

  return (
    <>
      {/* Platter: the rim the record sits on. */}
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className={STAGE_SVG} aria-hidden="true">
        <circle cx={CX} cy={CY} r={R_PLATTER} style={{ fill: 'var(--color-board-raised)' }} />
        <circle cx={CX} cy={CY} r={R_PLATTER - 1} fill="none" style={{ stroke: 'var(--color-ink)' }} strokeOpacity="0.1" />
        {/* Strobe dots on the platter rim, as on a direct-drive deck. */}
        <circle
          cx={CX}
          cy={CY}
          r={R_PLATTER - 5}
          fill="none"
          style={{ stroke: 'var(--color-ink)' }}
          strokeOpacity="0.18"
          strokeWidth="3"
          strokeDasharray="2 6"
        />
      </svg>

      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className={cn(STAGE_SVG, 'record-slide')}
        role="img"
        aria-label={`A record, side ${side}${cued ? `, with ${cued.code} ${cued.title} cued` : ''}`}
      >
        <defs>
          {/* Grooves: a radial gradient repeating every 3 units. */}
          <radialGradient id="grooves" cx={CX} cy={CY} r="3" gradientUnits="userSpaceOnUse" spreadMethod="repeat">
            <stop offset="0" style={{ stopColor: 'var(--color-groove)' }} />
            <stop offset="0.5" style={{ stopColor: 'var(--color-groove-ridge)' }} />
            <stop offset="1" style={{ stopColor: 'var(--color-groove)' }} />
          </radialGradient>
          {/* Light raking across the disc: the two bright wedges vinyl shows.
            Pure white at low opacity on purpose; it is light, not a palette
            color. */}
          <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0.18" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.36" stopColor="#fff" stopOpacity="0.07" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.64" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="0.82" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <path id="label-top" d={`M ${CX - 74} ${CY} A 74 74 0 0 1 ${CX + 74} ${CY}`} />
          <path id="label-bottom" d={`M ${CX - 82} ${CY} A 82 82 0 0 0 ${CX + 82} ${CY}`} />
        </defs>

        <circle cx={CX} cy={CY} r={R_DISC} style={{ fill: 'var(--color-groove)' }} />
        <circle cx={CX} cy={CY} r={R_LEAD_IN} fill="url(#grooves)" />

        {/* Track bands: hit areas, and the lit band for the cued track. */}
        {bands.map((band) => {
          const isCued = band.track.code === cued?.code;
          return (
            <circle
              key={band.track.code}
              cx={CX}
              cy={CY}
              r={(band.outer + band.inner) / 2}
              fill="none"
              style={{ stroke: 'var(--color-ink)' }}
              strokeOpacity={isCued ? 0.11 : 0}
              strokeWidth={band.outer - band.inner}
              pointerEvents="stroke"
              className="cursor-pointer transition-[stroke-opacity] duration-300"
              onPointerEnter={() => onCue(band.track)}
              onPointerLeave={() => onCue(null)}
              onClick={() =>
              document.getElementById(band.track.anchor)?.scrollIntoView({
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
              })
            }
            />
          );
        })}

        {/* Unrecorded gaps between tracks, which read lighter and smoother. */}
        {bands.slice(1).map((band) => (
          <circle
            key={`gap-${band.track.code}`}
            cx={CX}
            cy={CY}
            r={band.outer + TRACK_GAP / 2}
            fill="none"
            style={{ stroke: 'var(--color-track-gap)' }}
            strokeWidth={TRACK_GAP - 1}
            pointerEvents="none"
          />
        ))}
        <circle cx={CX} cy={CY} r={R_RUNOUT - 2} style={{ fill: 'var(--color-runout)' }} pointerEvents="none" />
        <circle cx={CX} cy={CY} r={R_DISC} fill="url(#sheen)" pointerEvents="none" />

        {/* Center label. It turns while a track is cued. */}
        <g
          className={cn(cued && 'label-turning')}
          style={{ transformOrigin: `${CX}px ${CY}px`, transformBox: 'view-box' }}
          pointerEvents="none"
        >
          <circle cx={CX} cy={CY} r={R_LABEL} style={{ fill: 'var(--color-label)' }} />
          <circle cx={CX} cy={CY} r={R_LABEL - 8} fill="none" style={{ stroke: 'var(--color-board)' }} strokeOpacity="0.35" />
          <text className="font-expanded" fontSize="13" fontWeight="800" letterSpacing="3" style={{ fill: 'var(--color-board)' }}>
            <textPath href="#label-top" startOffset="50%" textAnchor="middle">
              {profile.name.toUpperCase()}
            </textPath>
          </text>
          <text className="font-expanded" fontSize="9.5" fontWeight="700" letterSpacing="2.4" style={{ fill: 'var(--color-board)' }}>
            <textPath href="#label-bottom" startOffset="50%" textAnchor="middle">
              {`SIDE ${side} · 33⅓ RPM · ${catalogNumber}`}
            </textPath>
          </text>
          <text
            x={CX}
            y={CY + 30}
            textAnchor="middle"
            className="font-expanded"
            fontSize="30"
            fontWeight="800"
            style={{ fill: 'var(--color-board)' }}
          >
            {side}
          </text>
        </g>
        <circle cx={CX} cy={CY} r="5" style={{ fill: 'var(--color-board)' }} pointerEvents="none" />
      </svg>

      {/* Tonearm. Drawn pointing along +x from the pivot, then rotated so the
          stylus (at x = ARM_LENGTH) lands on the cued band. Hidden on small
          screens, where nothing hovers and the arm would crowd the cover. */}
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className={cn(STAGE_SVG, 'pointer-events-none hidden md:block')}
        aria-hidden="true"
      >
        <circle cx={PIVOT_X} cy={PIVOT_Y} r="34" style={{ fill: 'var(--color-board-raised)', stroke: 'var(--color-ink)' }} strokeOpacity="0.14" />
        <g
          className="tonearm"
          style={{ transform: `translate(${PIVOT_X}px, ${PIVOT_Y}px) rotate(${armAngle}deg)` }}
        >
          <rect x="-62" y="-11" width="30" height="22" rx="4" style={{ fill: 'var(--color-arm-shade)' }} />
          <path
            d={`M -32 0 L ${ARM_LENGTH - 70} 0 L ${ARM_LENGTH - 30} 10`}
            fill="none"
            style={{ stroke: 'var(--color-arm)' }}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x={ARM_LENGTH - 36}
            y="0"
            width="40"
            height="16"
            rx="2"
            style={{ fill: 'var(--color-arm)' }}
            transform={`rotate(14 ${ARM_LENGTH - 30} 10)`}
          />
          <circle cx={ARM_LENGTH} cy="0" r="2.5" style={{ fill: 'var(--color-label)' }} />
        </g>
        <circle cx={PIVOT_X} cy={PIVOT_Y} r="12" style={{ fill: 'var(--color-arm)' }} />
      </svg>
    </>
  );
}

/** Props for {@link Turntable}. */
interface TurntableProps {
  /** The cued track, or `null`. */
  cued: Track | null;
  /** Cue a track (or clear the cue). */
  onCue: (track: Track | null) => void;
}

/**
 * The full record object: vinyl half out of the sleeve, with the tonearm.
 *
 * @param props - See {@link TurntableProps}.
 * @returns The record stage.
 */
export function Turntable({ cued, onCue }: TurntableProps) {
  const side: Side = cued?.side ?? 'A';
  return (
    <div className="relative aspect-[780/600] w-full">
      <Vinyl cued={cued} side={side} onCue={onCue} />
      <Sleeve />
    </div>
  );
}
