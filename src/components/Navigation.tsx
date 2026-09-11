/**
 * Fixed site navigation.
 *
 * Renders the GooeyNav pill centered at the top of the viewport. The bar gains
 * a translucent backdrop once the user scrolls away from the hero, so the
 * labels stay legible over the lighter content sections below.
 *
 * Side effects: attaches a passive window scroll listener for the duration of
 * the component's lifetime.
 */

import { useEffect, useState } from 'react';
import GooeyNav from './reactbits/GooeyNav';
import { profile } from '../data/portfolio';

/** In-page anchors plus the résumé download, in page order. */
const navigationItems: readonly { label: string; href: string }[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
  { label: 'Résumé', href: profile.resumePath },
];

/** Scroll distance, in pixels, after which the nav gains its backdrop. */
const SCROLL_THRESHOLD_PX = 80;

/**
 * The fixed top navigation bar.
 *
 * @returns The navigation element.
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
    <nav
      aria-label="Primary"
      className={[
        'fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full px-2 transition-all duration-300',
        hasScrolled
          ? 'border border-white/10 bg-[#05040a]/70 shadow-lg shadow-black/40 backdrop-blur-md'
          : 'border border-transparent bg-transparent',
      ].join(' ')}
    >
      <GooeyNav items={[...navigationItems]} particleCount={0} timeVariance={400} particleR={0} />
    </nav>
  );
}
