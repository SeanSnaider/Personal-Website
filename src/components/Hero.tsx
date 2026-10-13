/**
 * The first viewport: the record and its back cover.
 *
 * Left is the record object (sleeve, platter, vinyl, tonearm). Right is the
 * back cover: name, role, a one-line intro, the tracklist, and the two
 * actions a recruiter came for. The tracklist is the page's real table of
 * contents; hovering or focusing a track cues it on the record, and choosing
 * it jumps to that track's liner notes.
 *
 * Copy comes from `src/data/portfolio.ts`; tracks from `src/data/tracks.ts`.
 */

import { useState } from 'react';
import { Turntable } from './Turntable';
import { LinkButton } from './primitives';
import { cn } from '../lib/utils';
import { tracksBySide, type Side, type Track } from '../data/tracks';
import { heroIntro, profile } from '../data/portfolio';

/** What each side holds, printed beside its letter. */
const SIDE_NAMES: Readonly<Record<Side, string>> = { A: 'Projects', B: 'Experience' };

/** Props for {@link Tracklist}. */
interface TracklistProps {
  /** The cued track, if any. */
  cued: Track | null;
  /** Cue a track, or clear the cue. */
  onCue: (track: Track | null) => void;
}

/**
 * The back-cover tracklist: main tracks only (bonus tracks are listed in
 * each side's section), one link per track.
 *
 * @param props - See {@link TracklistProps}.
 * @returns The tracklist nav.
 */
function Tracklist({ cued, onCue }: TracklistProps) {
  return (
    <nav aria-label="Tracklist" className="mt-8 space-y-5" onPointerLeave={() => onCue(null)}>
      {(['A', 'B'] as const).map((side) => (
        <div key={side}>
          <p className="flex items-baseline gap-3 border-b border-rule pb-2 text-sm text-slate">
            <span className="font-expanded font-extrabold uppercase tracking-[0.14em] text-ink">
              Side {side}
            </span>
            {SIDE_NAMES[side]}
          </p>
          <ol>
            {tracksBySide[side]
              .filter((track) => !track.isBonus)
              .map((track) => {
                const isCued = track.code === cued?.code;
                return (
                  <li key={track.code}>
                    <a
                      href={`#${track.anchor}`}
                      onPointerEnter={() => onCue(track)}
                      onFocus={() => onCue(track)}
                      onBlur={() => onCue(null)}
                      className="group grid grid-cols-[2.75rem_1fr_auto] items-baseline gap-x-3 border-b border-rule py-2"
                    >
                      <span className="font-expanded text-sm font-extrabold text-label-text">{track.code}</span>
                      {/* The subtitle sits beside the title when it fits and
                          drops under it when it does not; it is never cut. */}
                      <span className="flex min-w-0 flex-wrap items-baseline gap-x-2">
                        <span
                          className={cn(
                            'max-w-full shrink-0 font-semi-expanded text-[17px] font-semibold text-ink decoration-label decoration-2 underline-offset-[5px] group-hover:underline',
                            isCued && 'underline',
                          )}
                        >
                          {track.title}
                        </span>
                        <span className="hidden text-sm text-slate sm:inline">{track.subtitle}</span>
                      </span>
                      <span className="text-sm tabular-nums text-slate">{track.year}</span>
                    </a>
                  </li>
                );
              })}
          </ol>
        </div>
      ))}
    </nav>
  );
}

/**
 * The landing viewport.
 *
 * Two columns from `lg` (record left, back cover right); below that the
 * record sits above the back cover, wider than the screen so the vinyl runs
 * off the right edge.
 *
 * @returns The hero section element.
 */
export function Hero() {
  const [cued, setCued] = useState<Track | null>(null);

  return (
    <section id="top" className="w-full overflow-x-clip px-4 pb-20 pt-24 sm:px-8 lg:pb-28 lg:pt-28">
      <div className="mx-auto grid max-w-[1312px] items-center gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,780fr)_minmax(0,500fr)]">
        <div className="w-[115%] max-w-[780px] sm:w-[108%] lg:w-full">
          <Turntable cued={cued} onCue={setCued} />
        </div>

        <div className="min-w-0">
          <h1 className="font-expanded text-[clamp(2.5rem,4.4vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg text-ink-soft">
            {profile.title} · {profile.location}
          </p>
          <p className="mt-3 max-w-[34rem] text-[17px] leading-relaxed text-ink-soft">{heroIntro}</p>

          {/* Actions sit above the tracklist so the résumé is in the first
              viewport at common laptop heights. */}
          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href={profile.resumePath} variant="primary" opensInNewTab>
              Résumé (PDF)
            </LinkButton>
            <LinkButton href={`mailto:${profile.email}`}>Email</LinkButton>
            <LinkButton href={profile.github} opensInNewTab>
              GitHub
            </LinkButton>
            <LinkButton href={profile.linkedin} opensInNewTab>
              LinkedIn
            </LinkButton>
          </div>

          <Tracklist cued={cued} onCue={setCued} />
        </div>
      </div>
    </section>
  );
}
