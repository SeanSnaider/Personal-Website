/**
 * Skills section.
 *
 * Renders `portfolio.skillCategories` as a responsive grid of grouped chip
 * lists, mirroring the category structure of the résumé so the two read the
 * same way side by side.
 */

import { Reveal, Section } from './Section';
import { skillCategories } from '../data/portfolio';

/**
 * The Skills section: technologies grouped by category.
 *
 * Categories are rendered as cards in a masonry-ish grid that collapses to a
 * single column on mobile. Each card reveals with a slight stagger.
 *
 * @returns The skills section element.
 */
export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="04 / Skills"
      title="Tools I Work With"
      subtitle="Grouped the same way as my résumé, so the two are easy to cross-reference."
      maxWidth="max-w-6xl"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <Reveal key={category.title} delayMs={index * 70}>
            <div className="surface-card h-full rounded-2xl p-6">
              <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.15em] text-violet-300">
                {category.title}
              </h3>

              <ul className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-neutral-300 transition-colors duration-200 hover:border-violet-400/50 hover:bg-violet-500/10 hover:text-white"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
