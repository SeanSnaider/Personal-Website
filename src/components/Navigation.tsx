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
 * Two scroll-driven details:
 *   - The link for the section currently in view is highlighted, tracked with
 *     an IntersectionObserver. On pages without those sections (project
 *     pages) nothing is highlighted.
 *   - A thin accent line along the bottom edge shows reading progress. It is
 *     updated by writing the transform directly to the element rather than
 *     through React state, so scrolling never re-renders the bar.
 *
 * Side effects: attaches a passive window scroll listener and an
 * IntersectionObserver for the duration of the component's lifetime.
 */

import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';
import { profile } from '../data/portfolio';

/** In-page section anchors, in page order. `id` matches the section's DOM id. */
const sectionLinks: readonly { label: string; id: string }[] = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

/**
 * Observer margin that shrinks the viewport to a thin band just above its
 * middle, so exactly one section counts as "in view" at a time.
 */
const ACTIVE_SECTION_ROOT_MARGIN = '-40% 0px -55% 0px';

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
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > SCROLL_THRESHOLD_PX);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    // Run once on mount so a restored scroll position renders correctly.
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = sectionLinks
      .map((link) => document.getElementById(link.id))
      .filter((element): element is HTMLElement => element !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const { id } = entry.target;
          // Clear the highlight when the active section leaves the band
          // without another taking its place (scrolling back up to the hero).
          setActiveSectionId((current) =>
            entry.isIntersecting ? id : current === id ? null : current,
          );
        }
      },
      { rootMargin: ACTIVE_SECTION_ROOT_MARGIN },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    aria-current={activeSectionId === link.id ? 'location' : undefined}
                    className={cn(
                      'relative text-sm transition-colors hover:text-ink',
                      // Accent underline that grows in under the active link.
                      'after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300',
                      activeSectionId === link.id ? 'text-ink after:scale-x-100' : 'text-ink-muted',
                    )}
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

      {/* Reading progress. Starts at zero width; the scroll handler sets the
          scale. */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-accent/0 via-accent/70 to-accent"
      />
    </header>
  );
}
