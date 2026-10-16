/**
 * Fixed top bar, shared by the home page and project pages: the record's
 * spine. Name and catalog number on the left, the sides and sections on the
 * right, and the Résumé always one click away.
 *
 * On the home page it also shows what is "now playing": the track whose
 * section is in view, tracked with an IntersectionObserver over the track
 * anchors. Pages without tracks simply show nothing there.
 *
 * Links are written as `/#section` so the same bar works on project pages.
 *
 * Side effects: a passive scroll listener and an IntersectionObserver for the
 * component's lifetime.
 */

import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { allTracks, type Track } from '../data/tracks';
import { catalogNumber, profile } from '../data/portfolio';

/** Section links, in page order. */
const sectionLinks: readonly { label: string; id: string }[] = [
  { label: 'Side A', id: 'side-a' },
  { label: 'Side B', id: 'side-b' },
  { label: 'Liner notes', id: 'liner-notes' },
  { label: 'Booking', id: 'booking' },
];

/** Shrinks the viewport to a band just above center, so one track wins. */
const NOW_PLAYING_ROOT_MARGIN = '-35% 0px -60% 0px';

/**
 * The fixed top bar.
 *
 * @returns The header element.
 */
export function Navigation() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<Track | null>(null);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = allTracks
      .map((track) => document.getElementById(track.anchor))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const track = allTracks.find((candidate) => candidate.anchor === entry.target.id) ?? null;
          // Clear only when the track that is showing leaves the band, so a
          // neighbour leaving never blanks the current one.
          setNowPlaying((current) =>
            entry.isIntersecting ? track : current?.anchor === entry.target.id ? null : current,
          );
        }
      },
      { rootMargin: NOW_PLAYING_ROOT_MARGIN },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Skip link: first in the tab order, visible only while focused. */}
      <a
        href="#main"
        className="sr-only z-[60] bg-ink px-4 py-3 font-semi-expanded text-sm font-bold text-board focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
      >
        Skip to content
      </a>
      <header
        className={cn(
          'board-grain fixed inset-x-0 top-0 z-50 border-b bg-board px-4 transition-colors duration-300 sm:px-8',
          hasScrolled ? 'border-rule' : 'border-transparent',
        )}
      >
        <nav aria-label="Primary" className="mx-auto flex h-14 max-w-[1312px] items-center justify-between gap-6">
          <a href="/" className="flex shrink-0 items-baseline gap-3">
            <span className="font-expanded text-[15px] font-extrabold tracking-[-0.01em] text-ink">{profile.name}</span>
            <span className="hidden font-expanded text-xs font-bold tracking-[0.16em] text-slate sm:inline">
              {catalogNumber}
            </span>
          </a>

          {/* Now playing: which track's notes you are reading. A visual aid only,
              so it is not a live region: announcing it on every scroll would
              interrupt screen-reader users mid-sentence. */}
          <p
            aria-hidden="true"
            className={cn(
              'hidden min-w-0 flex-1 truncate text-center text-sm text-slate transition-opacity duration-300 xl:block',
              nowPlaying ? 'opacity-100' : 'opacity-0',
            )}
          >
            {nowPlaying && (
              <>
                Now playing <span className="font-expanded font-extrabold text-label-text">{nowPlaying.code}</span>{' '}
                <span className="text-ink">{nowPlaying.title}</span>
              </>
            )}
          </p>

          <div className="flex shrink-0 items-center gap-6">
            <ul className="hidden items-center gap-6 lg:flex">
              {sectionLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`/#${link.id}`}
                    className="text-sm text-ink-soft decoration-label underline-offset-[6px] transition-colors hover:text-ink hover:underline"
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
              className="inline-flex min-h-11 items-center bg-ink px-4 font-semi-expanded text-sm font-bold text-board transition-colors hover:bg-white lg:min-h-9"
            >
              Résumé
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
