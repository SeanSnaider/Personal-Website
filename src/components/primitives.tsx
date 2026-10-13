/**
 * Small presentational primitives shared across sections and pages.
 *
 * Buttons are printed like sleeve type: square-cornered, set in the expanded
 * width, no shadows. Lists are set like liner notes: each line on its own
 * printed rule rather than behind a bullet.
 */

import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

/** Props for {@link LinkButton}. */
interface LinkButtonProps {
  /** Destination URL or path. */
  href: string;
  /** Visible label. */
  children: ReactNode;
  /**
   * `primary` is solid sleeve ink; use at most one per group. `secondary`
   * is an outline.
   *
   * @defaultValue 'secondary'
   */
  variant?: 'primary' | 'secondary';
  /** Whether to open in a new tab. */
  opensInNewTab?: boolean;
  /** Accessible label, when the visible one is ambiguous out of context. */
  ariaLabel?: string;
}

/**
 * An anchor styled as a button.
 *
 * @param props - See {@link LinkButtonProps}.
 * @returns The styled anchor.
 */
export function LinkButton({
  href,
  children,
  variant = 'secondary',
  opensInNewTab = false,
  ariaLabel,
}: LinkButtonProps) {
  return (
    <a
      href={href}
      target={opensInNewTab ? '_blank' : undefined}
      rel={opensInNewTab ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
      className={cn(
        'inline-flex h-11 items-center px-5 font-semi-expanded text-[15px] font-bold transition-colors duration-200',
        variant === 'primary'
          ? 'bg-ink text-board hover:bg-white'
          : 'border border-rule-strong text-ink hover:border-ink',
      )}
    >
      {children}
    </a>
  );
}

/** Props for {@link TextLink}. */
interface TextLinkProps {
  /** Destination URL or path. */
  href: string;
  /** Visible label. */
  children: ReactNode;
  /** Whether the link leaves the site; opens a new tab. */
  isExternal?: boolean;
  /** Accessible label, when the visible one is ambiguous out of context. */
  ariaLabel?: string;
}

/**
 * An inline text link, underlined in label red on hover.
 *
 * @param props - See {@link TextLinkProps}.
 * @returns The styled anchor.
 */
export function TextLink({ href, children, isExternal = false, ariaLabel }: TextLinkProps) {
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
      className="font-semi-expanded text-[15px] font-semibold text-ink underline decoration-rule-strong underline-offset-[5px] transition-colors hover:decoration-label"
    >
      {children}
      {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}

/** Props for {@link NoteList}. */
interface NoteListProps {
  /** One entry per line. */
  items: readonly string[];
  /** Additional classes merged onto the `<ul>`. */
  className?: string;
}

/**
 * Accomplishment lines set like liner notes: each on its own printed rule.
 *
 * @param props - See {@link NoteListProps}.
 * @returns The list element.
 */
export function NoteList({ items, className }: NoteListProps) {
  return (
    <ul className={cn('border-t border-rule', className)}>
      {items.map((item) => (
        <li key={item} className="border-b border-rule py-3 text-base leading-relaxed text-ink-soft">
          {item}
        </li>
      ))}
    </ul>
  );
}
