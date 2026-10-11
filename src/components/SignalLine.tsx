/**
 * A thin, slowly scrolling waveform used as a divider: a nod to the audio work
 * without turning into a background effect.
 *
 * How it loops seamlessly: the waveform is built only from sines whose periods
 * divide PERIOD evenly, so it repeats exactly every PERIOD units. The path
 * spans two periods inside a strip twice the container's width, and CSS
 * (`.signal-strip` in index.css) slides the strip left by half its width on a
 * loop. At the end of each cycle the second period sits exactly where the first
 * started, so the jump back is invisible.
 */

import { cn } from '../lib/utils';

/** Length of one repeat of the waveform, in SVG user units. */
const PERIOD = 1200;
/** Height of the SVG viewBox, in user units. */
const HEIGHT = 48;
/** Horizontal distance between sampled points, in user units. */
const STEP = 4;

/**
 * Partials of the waveform as [cycles per PERIOD, relative amplitude].
 * Integer cycle counts are what make the waveform periodic in PERIOD.
 */
const PARTIALS: readonly (readonly [number, number])[] = [
  [7, 1],
  [14, 0.45],
  [21, 0.22],
  [38, 0.1],
];

/**
 * Build the SVG path for two periods of the waveform.
 *
 * Each sample is the sum of the partials, scaled by a slow envelope (one cycle
 * per PERIOD, so it is periodic too) that makes the line swell and settle
 * rather than buzz at a constant level.
 *
 * @returns An SVG path `d` string.
 */
function buildPath(): string {
  const amplitudeSum = PARTIALS.reduce((sum, [, amplitude]) => sum + amplitude, 0);
  const halfHeight = HEIGHT / 2;
  const points: string[] = [];

  for (let x = 0; x <= PERIOD * 2; x += STEP) {
    const phase = (2 * Math.PI * x) / PERIOD;
    const envelope = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(phase - Math.PI / 2));
    const signal = PARTIALS.reduce(
      (sum, [cycles, amplitude]) => sum + amplitude * Math.sin(cycles * phase),
      0,
    );
    const y = halfHeight - (signal / amplitudeSum) * envelope * (halfHeight - 2);
    points.push(`${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(2)}`);
  }

  return points.join(' ');
}

/** Computed once at module load; the shape never changes. */
const WAVE_PATH = buildPath();

/** Props for {@link SignalLine}. */
interface SignalLineProps {
  /** Additional classes merged onto the wrapper, e.g. for height or margin. */
  className?: string;
}

/**
 * The animated waveform divider. Purely decorative and hidden from assistive
 * technology. Freezes in place for users who prefer reduced motion.
 *
 * @param props - See {@link SignalLineProps}.
 * @returns The divider element.
 */
export function SignalLine({ className }: SignalLineProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative h-12 overflow-hidden',
        // Fade both ends so the line emerges from and dissolves into the page.
        '[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]',
        className,
      )}
    >
      {/* Flat baseline under the waveform, like a scope's zero line. */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-line" />

      <div className="signal-strip absolute inset-y-0 left-0 w-[200%]">
        <svg
          viewBox={`0 0 ${PERIOD * 2} ${HEIGHT}`}
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d={WAVE_PATH}
            fill="none"
            stroke="var(--color-accent)"
            strokeOpacity={0.7}
            strokeWidth={1.25}
            // Keeps the stroke 1.25px thick even though the SVG is stretched.
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}
