/**
 * Skills section.
 *
 * Renders `portfolio.skillCategories` as a definition list, one row per
 * category, mirroring the résumé's structure so the two read the same way side
 * by side.
 */

import { Reveal, Section } from './Section';
import { skillCategories } from '../data/portfolio';

/**
 * The Skills section: technologies grouped by category.
 *
 * @returns The skills section element.
 */
export function Skills() {
  return (
    <Section id="skills" number="04" title="Skills">
      <Reveal>
        <dl className="divide-y divide-line border-y border-line">
          {skillCategories.map((category) => (
            <div key={category.title} className="grid gap-1 py-4 sm:grid-cols-[11.5rem_1fr] sm:gap-6">
              <dt className="font-mono text-[13px] text-ink-faint">{category.title}</dt>
              <dd className="text-[15px] leading-relaxed text-ink">{category.skills.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
