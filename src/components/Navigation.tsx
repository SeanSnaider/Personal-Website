/**
 * Fixed site navigation, shared by the home page and project pages.
 *
 * A full-width bar with the name on the left and section links on the right.
 * It gains a hairline and a translucent backdrop once the page scrolls, so it
 * separates from the content beneath it only when it needs to.
 *
 * Links are written as `/#section` rather than `#section` so the same bar works
 * on project pages: on the home page the browser treats them as same-document
 * fragment jumps, and elsewhere they navigate home first.
 *
 * Side effects: attaches a passive window scroll listener for the duration of
 * the component's lifetime.
 */

import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { profile } from '../data/portfolio';

/** In-page section anchors, in page order. */
const sectionLinks: readonly { label: string; href: string }[] = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
];

/** Scroll distance, in pixels, after which the bar gains its backdrop. */
const SCROLL_THRESHOLD_PX = 16;

/**
 * The fixed top navigation bar.
 *
 * Below the `md` breakpoint only the name and the Résumé link are shown; the
 * page is short enough to scroll through on a phone.
 *
 * @returns The header element containing the primary navigation.
 */
export function Navigation() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };

    // Run once on mount so a restored scroll position renders correctly.
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        hasScrolled ? 'border-line bg-bg/80 backdrop-blur-md' : 'border-transparent',
      )}
    >
      {/* Padding outside, max-width inside: the same structure as Section,
          so the bar's edges line up with the content's. */}
      <div className="px-4 sm:px-6">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-5xl items-center justify-between"
        >
          <a href="/" className="text-sm font-semibold tracking-tight text-ink">
            {profile.name}
          </a>

          <div className="flex items-center gap-6">
            <ul className="hidden items-center gap-6 md:flex">
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center rounded-md border border-line-strong px-3 text-sm font-medium text-ink transition-colors hover:bg-surface-raised"
            >
              Résumé
          </a>
        </div>
      </nav>
      </div>
    </header>
  );
}
