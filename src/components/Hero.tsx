/**
 * Hero section.
 *
 * The landing viewport: animated FloatingLines backdrop, portrait, name,
 * rotating tagline, primary calls to action, and a strip of headline metrics.
 *
 * This is the only section that mounts a WebGL canvas. Every section below it
 * renders against the shared static `.site-backdrop`, which keeps the page to a
 * single animated surface instead of one per section.
 *
 * Copy and metrics come from `src/data/portfolio.ts`.
 */

import TextType from './reactbits/TextType';
import FloatingLines from './reactbits/FloatingLines';
import TiltedCard from './reactbits/TiltedCard';
import selfImage from './self.jpeg';
import { heroTaglines, profile, statistics } from '../data/portfolio';

/** Props for {@link HeroLink}. */
interface HeroLinkProps {
  /** Destination URL or path. */
  href: string;
  /** Visible label. */
  label: string;
  /**
   * `true` for the filled accent treatment, `false` for the outlined one.
   * Exactly one hero link should be primary.
   */
  isPrimary: boolean;
  /** Whether the link should download rather than navigate. */
  shouldDownload?: boolean;
  /** Whether to open in a new tab. */
  opensInNewTab?: boolean;
  /** Leading icon, rendered before the label. */
  icon: React.ReactNode;
}

/**
 * A call-to-action button in the hero.
 *
 * @param props - See {@link HeroLinkProps}.
 * @returns An anchor styled as a primary or secondary button.
 */
function HeroLink({
  href,
  label,
  isPrimary,
  shouldDownload = false,
  opensInNewTab = false,
  icon,
}: HeroLinkProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400';
  // Secondary buttons sit directly over the animated backdrop, whose light
  // streaks are near-white at their peak. They need an opaque dark base rather
  // than a translucent white one, or the label disappears as a streak passes.
  const variantClasses = isPrimary
    ? 'bg-violet-600 text-white shadow-lg shadow-violet-950/50 hover:bg-violet-500 hover:shadow-[0_12px_30px_-10px_rgba(139,92,246,0.8)]'
    : 'border border-white/25 bg-[#05040a]/85 text-white shadow-lg shadow-black/40 backdrop-blur-md hover:border-violet-400/70 hover:bg-[#05040a]/95 hover:text-violet-200';

  return (
    <a
      href={href}
      download={shouldDownload || undefined}
      target={opensInNewTab ? '_blank' : undefined}
      rel={opensInNewTab ? 'noopener noreferrer' : undefined}
      className={`${baseClasses} ${variantClasses}`}
    >
      {icon}
      {label}
    </a>
  );
}

/**
 * The landing hero.
 *
 * Renders full-viewport on large screens and stacks to a single column on
 * mobile, where the portrait appears above the text.
 *
 * Side effects: mounts the FloatingLines WebGL canvas for as long as the page
 * is open.
 *
 * @returns The hero section element.
 */
export function Hero() {
  return (
    <section id="hero" className="relative w-full overflow-hidden">
      {/* Animated backdrop, confined to the hero. */}
      <div className="pointer-events-none absolute inset-0">
        <FloatingLines
          linesGradient={['#7c3aed', '#a78bfa', '#c4b5fd']}
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[10, 7, 5]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={false}
          parallax={true}
        />
      </div>

      {/* Contrast scrim. The FloatingLines streaks peak at near-white, which
          washes out anything layered over them. This knocks the backdrop back
          far enough for text and buttons to hold contrast while leaving the
          animation clearly visible. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#05040a]/55" />

      {/* Extra darkening behind the text column specifically, where the
          smallest type sits. Angled so the portrait side stays brighter. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05040a]/70 via-[#05040a]/30 to-[#05040a]/70"
      />

      {/* Fade the hero into the static backdrop below it so the seam between
          the animated canvas and the rest of the page is invisible. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#05040a]"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-16 pt-32 sm:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          {/* Portrait */}
          <div className="shrink-0">
            <TiltedCard
              imageSrc={selfImage}
              altText={`Portrait of ${profile.name}`}
              captionText={profile.name}
              containerHeight="340px"
              containerWidth="340px"
              imageHeight="340px"
              imageWidth="340px"
              rotateAmplitude={0}
              scaleOnHover={1.08}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={false}
            />
          </div>

          {/* Introduction */}
          <div className="max-w-xl text-center lg:text-left">
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-violet-300">
              {profile.location}
            </p>

            <h1 className="mt-4 font-mono text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {profile.name}
            </h1>

            <p className="mt-3 text-xl font-medium text-neutral-300 sm:text-2xl">{profile.title}</p>

            {/* Fixed min-height prevents the buttons below from jumping as the
                typed line changes length. Kept at neutral-200 rather than a
                dimmer grey: this is the smallest type over the brightest part
                of the animated backdrop. */}
            <div className="mt-5 min-h-14 text-base text-neutral-200 sm:text-lg">
              <TextType
                text={[...heroTaglines]}
                typingSpeed={55}
                pauseDuration={2200}
                showCursor={true}
                cursorCharacter="|"
              />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <HeroLink
                href={profile.resumePath}
                label="Download Résumé"
                isPrimary
                shouldDownload
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                }
              />
              <HeroLink
                href={profile.github}
                label="GitHub"
                isPrimary={false}
                opensInNewTab
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                }
              />
              <HeroLink
                href="#contact"
                label="Get in Touch"
                isPrimary={false}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </div>

        {/* Headline metrics */}
        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md lg:grid-cols-4">
          {statistics.map((statistic) => (
            <div key={statistic.label} className="bg-[#05040a]/80 px-5 py-6 text-center">
              <dt className="sr-only">{statistic.label}</dt>
              <dd>
                <span className="block font-mono text-2xl font-bold text-violet-300 sm:text-3xl">
                  {statistic.value}
                </span>
                <span className="mt-2 block text-xs leading-snug text-neutral-400">
                  {statistic.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
