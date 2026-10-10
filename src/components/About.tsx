/**
 * About section.
 *
 * Renders the personal narrative from `portfolio.aboutParagraphs` alongside a
 * compact education card built from `portfolio.education`.
 *
 * Education lives here rather than in its own top-level section: it is a single
 * entry, and giving it a full section would pad the page without adding
 * scannable information.
 */

import { Reveal, Section } from './Section';
import { TextLink } from './primitives';
import { aboutParagraphs, education, profile } from '../data/portfolio';

/**
 * Education summary card.
 *
 * Displays the institution, degree, graduation timing, GPA, and honors.
 *
 * @returns The education card element.
 */
function EducationCard() {
  const rows: readonly { label: string; value: string }[] = [
    { label: 'Graduation', value: education.graduation },
    { label: 'GPA', value: education.gpa },
    { label: 'Honors', value: education.honors.join(', ') },
  ];

  return (
    <aside className="rounded-xl border border-line bg-surface p-6 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.04)]">
      <p className="font-mono text-xs uppercase tracking-wider text-ink-faint">Education</p>

      <h3 className="mt-3 font-semibold text-ink">{education.school}</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-muted">{education.degree}</p>

      <dl className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4">
            <dt className="text-ink-faint">{row.label}</dt>
            <dd className="text-right text-ink tabular-nums">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5">
        <TextLink href={profile.resumePath} isExternal>
          View résumé
        </TextLink>
      </div>
    </aside>
  );
}

/**
 * The About section: narrative copy plus an education card.
 *
 * Lays out as two columns on extra-large screens, stacking on smaller ones
 * with the narrative first.
 *
 * @returns The about section element.
 */
export function About() {
  return (
    <Section id="about" number="01" title="About">
      <div className="grid gap-10 xl:grid-cols-[1fr_18.5rem]">
        <Reveal className="space-y-5">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-ink-muted sm:text-[17px]">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delayMs={100}>
          <EducationCard />
        </Reveal>
      </div>
    </Section>
  );
}
