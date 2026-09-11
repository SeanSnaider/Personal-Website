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
import { aboutParagraphs, education, profile } from '../data/portfolio';

/**
 * Education summary card.
 *
 * Displays the institution, degree, graduation timing, GPA, and honors.
 *
 * @returns The education card element.
 */
function EducationCard() {
  return (
    <aside className="surface-card rounded-2xl p-6">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-400">Education</p>

      <h3 className="mt-4 font-mono text-lg font-semibold text-white">{education.school}</h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-300">{education.degree}</p>

      <dl className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-neutral-500">Graduation</dt>
          <dd className="text-right font-mono text-neutral-200">{education.graduation}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-neutral-500">GPA</dt>
          <dd className="text-right font-mono text-violet-300">{education.gpa}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-neutral-500">Honors</dt>
          <dd className="text-right font-mono text-neutral-200">{education.honors.join(', ')}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-neutral-500">Location</dt>
          <dd className="text-right font-mono text-neutral-200">{education.location}</dd>
        </div>
      </dl>

      <a
        href={profile.resumePath}
        download
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-violet-300 transition-colors hover:text-violet-200"
      >
        View full résumé
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </aside>
  );
}

/**
 * The About section: narrative copy plus an education card.
 *
 * Lays out as a two-column grid on large screens, stacking on mobile with the
 * narrative first.
 *
 * @returns The about section element.
 */
export function About() {
  return (
    <Section
      id="about"
      eyebrow="01 / About"
      title="About Me"
      subtitle="What I build, and why I keep ending up in the same kinds of problems."
    >
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        <div className="space-y-6">
          {aboutParagraphs.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 40)} delayMs={index * 90}>
              <p className="text-base leading-relaxed text-neutral-300 sm:text-lg">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={120}>
          <EducationCard />
        </Reveal>
      </div>
    </Section>
  );
}
