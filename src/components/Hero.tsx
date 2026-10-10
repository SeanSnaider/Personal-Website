/**
 * Hero section.
 *
 * The landing viewport: an announcement pill, name, title, a short
 * introduction, contact links, the portrait, and a strip of headline metrics
 * under an animated waveform divider.
 *
 * Copy and metrics come from `src/data/portfolio.ts`.
 */

import { ArrowRight, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { LinkButton } from './primitives';
import { SignalLine } from './SignalLine';
import selfImage from './self.jpeg';
import { heroAnnouncement, heroIntro, profile, statistics } from '../data/portfolio';

const iconClasses = 'h-4 w-4';

/**
 * The announcement pill above the name, linking to whatever is newest.
 *
 * @returns The pill link, or `null` when there is no announcement.
 */
function AnnouncementPill() {
  if (!heroAnnouncement) return null;

  return (
    <a
      href={heroAnnouncement.href}
      className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/70 py-1 pl-1 pr-3 text-sm text-ink-muted backdrop-blur-sm transition-colors hover:border-accent/40 hover:text-ink"
    >
      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5 font-mono text-xs font-medium text-accent">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        {heroAnnouncement.tag}
      </span>
      {heroAnnouncement.text}
      <ArrowRight
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
      />
    </a>
  );
}

/**
 * The landing hero.
 *
 * Two columns on `md` and up (text left, portrait right); below that the
 * portrait stacks above the text.
 *
 * @returns The hero section element.
 */
export function Hero() {
  return (
    <section id="hero" className="w-full px-4 pt-28 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col-reverse gap-10 md:flex-row md:items-center md:justify-between md:gap-16">
          <div className="max-w-2xl">
            <AnnouncementPill />

            <h1 className="mt-7 bg-gradient-to-b from-white to-ink-muted bg-clip-text pb-1 text-5xl font-semibold tracking-tight text-transparent sm:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-2 text-lg text-ink-muted sm:text-xl">
              {profile.title}
              <span className="text-ink-faint"> · {profile.location}</span>
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {heroIntro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton
                href={profile.resumePath}
                variant="primary"
                opensInNewTab
                icon={<FileText aria-hidden="true" className={iconClasses} />}
              >
                Résumé
              </LinkButton>
              <LinkButton
                href={profile.github}
                opensInNewTab
                icon={<Github aria-hidden="true" className={iconClasses} />}
              >
                GitHub
              </LinkButton>
              <LinkButton
                href={profile.linkedin}
                opensInNewTab
                icon={<Linkedin aria-hidden="true" className={iconClasses} />}
              >
                LinkedIn
              </LinkButton>
              <LinkButton
                href={`mailto:${profile.email}`}
                icon={<Mail aria-hidden="true" className={iconClasses} />}
              >
                Email
              </LinkButton>
            </div>
          </div>

          {/* Portrait with an offset accent frame behind it. The right/bottom
              margin reserves room for the frame's offset so it never touches
              the container edge. */}
          <div className="relative mb-3 mr-3 w-40 shrink-0 sm:w-52 md:w-60">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-accent/40"
            />
            <img
              src={selfImage}
              alt={`Portrait of ${profile.name}`}
              width={706}
              height={913}
              className="relative w-full rounded-2xl border border-line object-cover"
            />
          </div>
        </div>

        <SignalLine className="mt-16 sm:mt-20" />

        {/* Headline metrics */}
        <dl className="grid grid-cols-2 gap-y-8 pb-10 pt-8 lg:grid-cols-4">
          {statistics.map((statistic) => (
            // dd is moved above dt visually with order-first, so values share a
            // top line regardless of how many lines each label wraps to.
            <div key={statistic.label} className="flex flex-col gap-1 pr-4">
              <dt className="text-sm leading-snug text-ink-faint">{statistic.label}</dt>
              <dd className="order-first text-2xl font-semibold tracking-tight text-ink tabular-nums sm:text-3xl">
                {statistic.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
