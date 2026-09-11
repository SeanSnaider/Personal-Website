/**
 * Site footer.
 *
 * Renders the copyright line, a short colophon noting how the site is built,
 * and the same social links as the Contact section. All destinations come from
 * `portfolio.profile`.
 */

import { profile } from '../data/portfolio';

/** Footer links, resolved once at module load from the profile data. */
const footerLinks: readonly { label: string; href: string; opensInNewTab: boolean }[] = [
  { label: 'LinkedIn', href: profile.linkedin, opensInNewTab: true },
  { label: 'GitHub', href: profile.github, opensInNewTab: true },
  { label: 'Email', href: `mailto:${profile.email}`, opensInNewTab: false },
  { label: 'Résumé', href: profile.resumePath, opensInNewTab: true },
];

/**
 * The page footer.
 *
 * @returns The footer element.
 */
export function Footer() {
  return (
    <footer className="relative w-full border-t border-white/10 px-6 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="mt-1 font-mono text-xs text-neutral-600">
            Built with React, TypeScript, Tailwind CSS, and Vite.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.opensInNewTab ? '_blank' : undefined}
                  rel={link.opensInNewTab ? 'noopener noreferrer' : undefined}
                  className="text-sm text-neutral-400 transition-colors hover:text-violet-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
