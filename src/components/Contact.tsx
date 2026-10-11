/**
 * Contact section.
 *
 * The closing call to action: the availability note, the email address as the
 * primary action, and LinkedIn and GitHub as secondary links. All destinations
 * come from `portfolio.profile`, so the address shown here always matches the
 * résumé.
 */

import { Reveal, Section } from './Section';
import { TextLink } from './primitives';
import { availabilityNote, profile } from '../data/portfolio';

/**
 * The Contact section.
 *
 * @returns The contact section element.
 */
export function Contact() {
  return (
    <Section id="contact" number="05" title="Contact">
      <Reveal>
        <p className="max-w-2xl text-base leading-relaxed text-ink-muted sm:text-[17px]">
          {availabilityNote}
        </p>

        {/* break-all keeps the long .edu address from overflowing on narrow
            screens. */}
        <a
          href={`mailto:${profile.email}`}
          className="mt-6 inline-block break-all text-2xl font-semibold tracking-tight text-ink underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent sm:text-3xl"
        >
          {profile.email}
        </a>

        <div className="mt-6 flex flex-wrap gap-6">
          <TextLink href={profile.linkedin} isExternal>
            LinkedIn
          </TextLink>
          <TextLink href={profile.github} isExternal>
            GitHub
          </TextLink>
          <TextLink href={profile.resumePath} isExternal>
            Résumé (PDF)
          </TextLink>
        </div>
      </Reveal>
    </Section>
  );
}
