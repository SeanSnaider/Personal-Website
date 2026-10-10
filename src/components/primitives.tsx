/**
 * Small presentational primitives shared across sections and pages.
 *
 * Centralizing buttons, links, bullet lists and stack lines keeps their styling
 * identical everywhere, so a visual tweak happens in one place.
 */

import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

/** Props for {@link LinkButton}. */
interface LinkButtonProps {
  /** Destination URL or path. */
  href: string;
  /** Visible label. */
  children: ReactNode;
  /**
   * `primary` is the filled treatment; use it for at most one button per
   * group. `secondary` is outlined.
   *
   * @defaultValue 'secondary'
   */
  variant?: 'primary' | 'secondary';
  /** Leading icon. */
  icon?: ReactNode;
  /** Whether to open in a new tab. */
  opensInNewTab?: boolean;
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
  icon,
  opensInNewTab = false,
}: LinkButtonProps) {
  return (
    <a
      href={href}
      target={opensInNewTab ? '_blank' : undefined}
      rel={opensInNewTab ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-colors',
        variant === 'primary'
          ? 'bg-ink text-bg hover:bg-white'
          : 'border border-line-strong text-ink hover:border-ink-faint hover:bg-surface-raised',
      )}
    >
      {icon}
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
  /** Whether the link leaves the site; adds an outward arrow and opens a new tab. */
  isExternal?: boolean;
  /** Accessible label, when the visible one is ambiguous out of context. */
  ariaLabel?: string;
}

/**
 * An inline text link, with an outward arrow when it leaves the site.
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
      className="group/link inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors hover:text-accent"
    >
      {children}
      {isExternal && (
        <ArrowUpRight
          aria-hidden="true"
          className="h-3.5 w-3.5 text-ink-faint transition-colors group-hover/link:text-accent"
        />
      )}
    </a>
  );
}

/** Props for {@link BulletList}. */
interface BulletListProps {
  /** One entry per bullet. */
  items: readonly string[];
  /** Additional classes merged onto the `<ul>`. */
  className?: string;
}

/**
 * A list of short accomplishment bullets with quiet dash markers.
 *
 * @param props - See {@link BulletListProps}.
 * @returns The list element.
 */
export function BulletList({ items, className }: BulletListProps) {
  return (
    <ul className={cn('space-y-2', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-muted">
          <span aria-hidden="true" className="mt-[0.7em] h-px w-2.5 shrink-0 bg-ink-faint" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Props for {@link StackLine}. */
interface StackLineProps {
  /** Technology names, in display order. */
  technologies: readonly string[];
  /** Additional classes merged onto the `<p>`. */
  className?: string;
}

/**
 * The technologies used, as one quiet dot-separated line.
 *
 * Deliberately plain text rather than chips: chips compete with the content
 * for attention, and the stack is supporting detail.
 *
 * @param props - See {@link StackLineProps}.
 * @returns The paragraph element.
 */
export function StackLine({ technologies, className }: StackLineProps) {
  return (
    <p className={cn('font-mono text-xs leading-relaxed text-ink-faint', className)}>
      <span className="sr-only">Technologies: </span>
      {technologies.join(' · ')}
    </p>
  );
}
