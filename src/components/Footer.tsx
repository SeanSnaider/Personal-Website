/**
 * Site footer, shared by the home page and project pages: the back of the
 * sleeve's fine print, with the catalog barcode and honest credits for the
 * site itself.
 */

import { useMemo } from 'react';
import { catalogNumber, profile } from '../data/portfolio';

/**
 * A decorative barcode generated from the catalog number.
 *
 * Bars come from a tiny linear congruential generator seeded with the
 * catalog string, so the pattern is stable across renders and builds. It
 * encodes nothing; it is printed ornament, like the fine print around it.
 *
 * @returns The SVG barcode.
 */
function Barcode() {
  const bars = useMemo(() => {
    let seed = Array.from(catalogNumber).reduce((sum, char) => sum * 31 + char.charCodeAt(0), 7) >>> 0;
    const next = () => {
      // Numerical Recipes LCG constants.
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 2 ** 32;
    };
    const result: { x: number; width: number }[] = [];
    let x = 0;
    while (x < 150) {
      const width = 1 + Math.floor(next() * 3);
      result.push({ x, width });
      x += width + 1 + Math.floor(next() * 3);
    }
    return result;
  }, []);

  return (
    <svg viewBox="0 0 150 44" className="h-11 w-[150px]" aria-hidden="true">
      <rect width="150" height="44" fill="var(--color-ink)" />
      {bars.map((bar) => (
        <rect key={bar.x} x={bar.x + 4} y="4" width={bar.width} height="30" fill="var(--color-board)" />
      ))}
    </svg>
  );
}

/**
 * The page footer.
 *
 * @returns The footer element.
 */
export function Footer() {
  return (
    <footer className="mt-28 w-full px-4 pb-12 sm:px-8">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-8 border-t border-rule pt-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-[44rem] space-y-2 text-sm leading-relaxed text-slate">
          <p>
            <span className="font-expanded font-bold tracking-[0.12em] text-ink">{catalogNumber}</span> · ©{' '}
            {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>
            Site designed and directed by {profile.name}, built with Claude Code. Set in Archivo. React, TypeScript,
            Tailwind CSS, Vite.
          </p>
        </div>
        <Barcode />
      </div>
    </footer>
  );
}
