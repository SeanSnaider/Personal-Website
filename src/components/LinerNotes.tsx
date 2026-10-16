/**
 * Liner notes (About), Instruments (Skills), and Booking (Contact).
 *
 * Set the way the inside of a gatefold is: an essay in columns with a band
 * photo, the pressing details (education), the personnel list (skills), and
 * the booking contact on the back. All copy comes from
 * `src/data/portfolio.ts`.
 */

import type { ReactNode } from 'react';
import { LinkButton, TextLink } from './primitives';
import selfImage from './self.jpeg';
import { aboutParagraphs, availabilityNote, education, profile, skillCategories } from '../data/portfolio';

/** Props for {@link PlainSection}. */
interface PlainSectionProps {
  /** DOM id for in-page navigation. */
  id: string;
  /** Section heading. */
  title: string;
  /** Section body. */
  children: ReactNode;
}

/**
 * A section that is not a record side: a heavy rule, then a heading.
 *
 * @param props - See {@link PlainSectionProps}.
 * @returns The section element.
 */
function PlainSection({ id, title, children }: PlainSectionProps) {
  return (
    <section id={id} className="w-full scroll-mt-16 px-4 sm:px-8">
      <div className="mx-auto max-w-[1312px] border-t-2 border-ink pt-6">
        <h2 className="font-expanded text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-none tracking-[-0.03em] text-ink">
          {title}
        </h2>
        <div className="mt-10 lg:mt-14">{children}</div>
      </div>
    </section>
  );
}

/**
 * Liner notes: the About essay, band photo, and pressing details.
 *
 * @returns The section element.
 */
export function LinerNotes() {
  const pressing: readonly { label: string; value: string }[] = [
    { label: 'Pressed at', value: education.school },
    { label: 'Degree', value: education.degree },
    { label: 'Release', value: education.graduation },
    { label: 'GPA', value: education.gpa },
    { label: 'Honors', value: education.honors.join(', ') },
  ];

  return (
    <PlainSection id="liner-notes" title="Liner notes">
      {/* Same split as the track spreads above: who and where on the left
          (photo, then the pressing details), the story on the right in one
          readable column. */}
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <aside className="max-w-[24rem]">
          <figure>
            <img
              src={selfImage}
              alt={`Portrait of ${profile.name}`}
              width={706}
              height={913}
              loading="lazy"
              className="w-full max-w-[16rem]"
            />
            <figcaption className="mt-3 text-sm text-slate">
              {profile.name}, {profile.location}
            </figcaption>
          </figure>

          <dl className="mt-8 space-y-3 text-[15px]">
            {pressing.map((row) => (
              <div key={row.label} className="grid grid-cols-[6.5rem_1fr] gap-4">
                <dt className="text-slate">{row.label}</dt>
                <dd className="text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <div className="max-w-[38rem] space-y-6 text-lg leading-relaxed text-ink-soft">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </PlainSection>
  );
}

/**
 * Instruments: the skills, printed like a personnel list.
 *
 * @returns The section element.
 */
export function Instruments() {
  return (
    <PlainSection id="instruments" title="Instruments">
      <dl className="border-t border-rule">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="grid gap-1 border-b border-rule py-5 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-16"
          >
            <dt className="font-semi-expanded text-[15px] font-bold uppercase tracking-[0.08em] text-slate">
              {category.title}
            </dt>
            <dd className="text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-relaxed text-ink">
              {category.skills.join(', ')}
            </dd>
          </div>
        ))}
      </dl>
    </PlainSection>
  );
}

/**
 * Booking: how to reach Sean.
 *
 * @returns The section element.
 */
export function Booking() {
  const [emailUser, emailDomain] = profile.email.split('@');
  return (
    <PlainSection id="booking" title="Booking">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <p className="max-w-[30rem] text-[17px] leading-relaxed text-ink-soft">{availabilityNote}</p>

        <div>
          {/* Sized to fit its column on one line from tablet up; on phones it
              may break only after the "@", never inside the domain. */}
          <a
            href={`mailto:${profile.email}`}
            className="block font-expanded text-[clamp(1.375rem,2.5vw,2.25rem)] font-extrabold leading-tight tracking-[-0.02em] text-ink underline decoration-label decoration-2 underline-offset-[8px] transition-colors [overflow-wrap:normal] hover:text-white"
          >
            {emailUser}@<wbr />
            {emailDomain}
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <LinkButton href={profile.resumePath} variant="primary" opensInNewTab>
              Résumé (PDF)
            </LinkButton>
            <TextLink href={profile.linkedin} isExternal>
              LinkedIn
            </TextLink>
            <TextLink href={profile.github} isExternal>
              GitHub
            </TextLink>
          </div>
        </div>
      </div>
    </PlainSection>
  );
}
