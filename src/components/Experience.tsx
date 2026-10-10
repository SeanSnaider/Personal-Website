/**
 * Experience section.
 *
 * Renders the résumé roles from `portfolio.experiences` in full, most recent
 * first, followed by a compact "Earlier" list from
 * `portfolio.earlierExperiences`.
 *
 * Each role is a two-column row on `sm` and up: dates on the left, details on
 * the right, so the timeline scans down the left edge.
 */

import { Reveal, Section } from './Section';
import { BulletList, StackLine } from './primitives';
import {
  earlierExperiences,
  experiences,
  type Experience as ExperienceEntry,
} from '../data/portfolio';

/** Props for {@link RoleEntry}. */
interface RoleEntryProps {
  /** The role to render. */
  experience: ExperienceEntry;
}

/**
 * A single full role: dates, title, organization, bullets, and stack.
 *
 * @param props - See {@link RoleEntryProps}.
 * @returns The role's article element.
 */
function RoleEntry({ experience }: RoleEntryProps) {
  const { organization, role, location, period, isCurrent, highlights, technologies } = experience;

  return (
    <article className="grid gap-2 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
      <div className="font-mono text-[13px] text-ink-faint sm:pt-0.5">
        <p>{period}</p>
        {isCurrent && (
          <p className="mt-1 inline-flex items-center gap-1.5 text-accent">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            Current
          </p>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-ink">{role}</h3>
        <p className="mt-0.5 text-sm text-ink-muted">
          {organization}
          <span className="text-ink-faint"> · {location}</span>
        </p>

        <BulletList items={highlights} className="mt-4" />
        <StackLine technologies={technologies} className="mt-4" />
      </div>
    </article>
  );
}

/**
 * The Experience section.
 *
 * Reads from `portfolio.experiences` and `portfolio.earlierExperiences`;
 * contains no résumé copy of its own.
 *
 * @returns The experience section element.
 */
export function Experience() {
  return (
    <Section id="experience" number="02" title="Experience">
      <div className="space-y-12">
        {experiences.map((experience) => (
          <Reveal key={experience.id}>
            <RoleEntry experience={experience} />
          </Reveal>
        ))}
      </div>

      {earlierExperiences.length > 0 && (
        <Reveal className="mt-14">
          <h3 className="font-mono text-xs uppercase tracking-wider text-ink-faint">Earlier</h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {earlierExperiences.map((entry) => (
              <li key={entry.id} className="grid gap-1 py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
                <p className="font-mono text-[13px] text-ink-faint">{entry.period}</p>
                <div>
                  <p className="text-sm text-ink">
                    <span className="font-medium">{entry.role}</span>
                    <span className="text-ink-muted">, {entry.organization}</span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{entry.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}
