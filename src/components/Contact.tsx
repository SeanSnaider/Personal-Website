/**
 * Contact section.
 *
 * Renders the closing call to action and the three contact channels (email,
 * LinkedIn, GitHub) as cards. All destinations come from `portfolio.profile`,
 * so the address shown here always matches the résumé.
 */

import { Reveal, Section } from './Section';
import { profile } from '../data/portfolio';

/** A single contact channel rendered as a card. */
interface ContactMethod {
  /** Stable React key and accessible label root. */
  readonly id: string;
  /** Channel name, e.g. "Email". */
  readonly label: string;
  /** The address or handle displayed under the label. */
  readonly value: string;
  /** Destination URL, including the `mailto:` scheme where applicable. */
  readonly href: string;
  /** Whether the link should open in a new tab. */
  readonly opensInNewTab: boolean;
  /** The channel's icon. */
  readonly icon: React.ReactNode;
}

const iconClasses = 'h-5 w-5';

/**
 * The contact channels shown in the section, in priority order.
 *
 * Email is first: it is the channel most likely to get a reply.
 */
const contactMethods: readonly ContactMethod[] = [
  {
    id: 'email',
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    opensInNewTab: false,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconClasses}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: '/in/seansnaider',
    href: profile.linkedin,
    opensInNewTab: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconClasses}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'GitHub',
    value: '@SeanSnaider',
    href: profile.github,
    opensInNewTab: true,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={iconClasses}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

/**
 * The availability note shown under the Contact heading.
 *
 * Names a specific recruiting term on purpose — it reads far better to
 * recruiters than a generic statement. Update the term each cycle.
 */
const AVAILABILITY_NOTE =
  "I'm looking for Summer 2027 software engineering internships and co-ops. If you have a role, a question, or just want to talk shop, reach out.";

/**
 * The Contact section.
 *
 * Renders an availability note followed by a responsive grid of contact
 * channel cards.
 *
 * @returns The contact section element.
 */
export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="05 / Contact"
      title="Get In Touch"
      subtitle={AVAILABILITY_NOTE}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {contactMethods.map((method, index) => (
          <Reveal key={method.id} delayMs={index * 80}>
            <a
              href={method.href}
              target={method.opensInNewTab ? '_blank' : undefined}
              rel={method.opensInNewTab ? 'noopener noreferrer' : undefined}
              className="surface-card group flex h-full flex-col items-center gap-3 rounded-2xl p-6 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300 transition-colors group-hover:bg-violet-500/20 group-hover:text-violet-200">
                {method.icon}
              </span>
              <span className="font-mono text-sm font-semibold text-white">{method.label}</span>
              {/* break-all keeps the long .edu address from overflowing its card
                  on narrow screens. */}
              <span className="break-all text-xs text-neutral-400 transition-colors group-hover:text-neutral-300">
                {method.value}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
