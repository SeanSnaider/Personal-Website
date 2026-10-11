/**
 * Site footer, shared by the home page and project pages.
 *
 * Renders the copyright line and a short colophon. Contact links live in the
 * Contact section and the navigation bar, so they are not repeated here.
 */

import { profile } from '../data/portfolio';

/**
 * The page footer.
 *
 * @returns The footer element.
 */
export function Footer() {
  return (
    <footer className="w-full px-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 border-t border-line py-8 text-sm text-ink-faint sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with React, TypeScript, Tailwind CSS, and Vite.</p>
      </div>
    </footer>
  );
}
