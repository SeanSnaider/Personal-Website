/**
 * Experience section.
 *
 * Renders professional roles from `portfolio.experiences` as a vertical
 * timeline: a single accent rail with one dated card per role, most recent
 * first. Ongoing roles are flagged with a pulsing "Current" badge.
 *
 * This section is the primary answer to "what has this person actually done",
 * so it sits immediately after About and before Projects.
 *
 * Side effects: each entry registers an IntersectionObserver via `Reveal`.
 */

import { Reveal, Section } from './Section';
import { experiences, type Experience as ExperienceEntry } from '../data/portfolio';

/** Props for {@link TimelineEntry}. */
interface TimelineEntryProps {
  /** The role to render. */
  experience: ExperienceEntry;
  /** Stagger delay in milliseconds, so entries reveal in sequence. */
  delayMs: number;
}

/**
 * A single role on the experience timeline.
 *
 * Renders the rail marker plus a card containing the role, organization,
 * period, location, accomplishment bullets, and technology chips.
 *
 * @param props - See {@link TimelineEntryProps}.
 * @returns The timeline entry list item.
 */
function TimelineEntry({ experience, delayMs }: TimelineEntryProps) {
  const { organization, role, location, period, isCurrent, highlights, technologies } = experience;

  return (
    <li className="relative pl-10 sm:pl-14">
      {/* Rail marker. Sits on top of the vertical line drawn by the parent. */}
      <span
        aria-hidden="true"
        className={[
          'absolute left-0 top-7 h-3 w-3 -translate-x-1/2 rounded-full ring-4',
          isCurrent
            ? 'bg-violet-400 ring-violet-500/20'
            : 'bg-neutral-600 ring-neutral-800/60',
        ].join(' ')}
      />

      <Reveal delayMs={delayMs}>
        <article className="surface-card rounded-2xl p-6 sm:p-7">
          <header className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
            <div className="min-w-0">
              <h3 className="font-mono text-lg font-semibold text-white sm:text-xl">{role}</h3>
              <p className="mt-1 text-sm font-medium text-violet-300">{organization}</p>
            </div>

            <div className="shrink-0 md:text-right">
              <p className="font-mono text-xs tracking-wide text-neutral-400">{period}</p>
              <p className="mt-1 text-xs text-neutral-500">{location}</p>
            </div>
          </header>

          {isCurrent && (
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-400" />
              </span>
              Current
            </span>
          )}

          <ul className="mt-5 space-y-3">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-neutral-300">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-500" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-neutral-300"
              >
                {technology}
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </li>
  );
}

/**
 * The Experience section: a reverse-chronological timeline of roles.
 *
 * Reads from `portfolio.experiences`; contains no résumé copy of its own.
 *
 * @returns The experience section element.
 */
export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="02 / Experience"
      title="Where I've Worked"
      subtitle="Co-op, campus engineering, and teaching roles, most recent first."
    >
      {/* The rail: a single gradient line behind all markers, faded at the tail
          so the timeline ends softly rather than being cut off. */}
      <ol className="relative space-y-8 before:absolute before:bottom-8 before:left-0 before:top-8 before:w-px before:bg-gradient-to-b before:from-violet-500/60 before:via-violet-500/25 before:to-transparent sm:before:left-0">
        {experiences.map((experience, index) => (
          <TimelineEntry
            key={experience.id}
            experience={experience}
            delayMs={index * 80}
          />
        ))}
      </ol>
    </Section>
  );
}
