/**
 * Experience section.
 *
 * Renders the résumé roles from `portfolio.experiences` in full, most recent
 * first, followed by a compact "Earlier" list from
 * `portfolio.earlierExperiences`.
 *
 * Each role is a two-column row on `sm` and up: dates on the left, details on
 * the right, so the timeline scans down the left edge. A rail runs down the
 * gap between the columns with a dot at each role (accent for current roles).
 */

import { Reveal, Section } from './Section';
import { BulletList, StackLine } from './primitives';
import { cn } from '../lib/utils';
import {
  earlierExperiences,
  experiences,
  type Experience as ExperienceEntry,
} from '../data/portfolio';

/**
 * Horizontal position of the timeline rail on `sm` and up: the 10.5rem date
 * column plus half of the 1.5rem column gap, so it sits centred in the gap.
 * Shared by the rail and the dots so they always line up.
 */
const RAIL_POSITION = 'sm:left-[11.25rem]';

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
    <article className="relative grid gap-2 sm:grid-cols-[10.5rem_1fr] sm:gap-6">
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-[0.4rem] hidden h-2 w-2 -translate-x-1/2 rounded-full ring-4 ring-bg sm:block',
          RAIL_POSITION,
          isCurrent ? 'bg-accent shadow-[0_0_12px_rgb(61_220_151/0.6)]' : 'bg-ink-faint',
        )}
      />

      <div className="font-mono text-[13px] text-ink-faint sm:pt-0.5">
        <p>{period}</p>
        {isCurrent && (
          <p className="mt-1 text-accent">Current</p>
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
      <div className="relative space-y-12">
        {/* The rail. Fades out at the bottom so the timeline trails off rather
            than stopping at a hard edge. */}
        <div
          aria-hidden="true"
          className={cn(
            'absolute bottom-0 top-2 hidden w-px bg-gradient-to-b from-accent/50 via-line-strong to-transparent sm:block',
            RAIL_POSITION,
          )}
        />
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
              <li key={entry.id} className="grid gap-1 py-4 sm:grid-cols-[10.5rem_1fr] sm:gap-6">
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
