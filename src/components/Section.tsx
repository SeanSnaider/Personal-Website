/**
 * Shared section layout primitives.
 *
 * Exports `Section`, the wrapper every content section on the home page uses,
 * and `Reveal`, a generic scroll-triggered fade-and-rise wrapper for individual
 * items inside a section.
 *
 * Centralizing these keeps vertical rhythm, heading treatment, content width,
 * and anchor-scroll offset identical across About, Experience, Projects,
 * Skills, and Contact. Sections should not set their own padding or max-width.
 */

import type { ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { cn } from '../lib/utils';

/** Props for {@link Section}. */
export interface SectionProps {
  /** DOM id used as the in-page navigation anchor target. */
  id: string;
  /** Two-digit position on the page, e.g. "01", shown in mono before the title. */
  number: string;
  /** The section's heading text. */
  title: string;
  /** Additional classes merged onto the `<section>` element. */
  className?: string;
  /** The section body. */
  children: ReactNode;
}

/**
 * A page section with a consistent heading, spacing, and scroll anchor.
 *
 * On large screens the heading sits in a narrow left column beside the
 * content, separated from the previous section by a hairline; below `lg` it
 * stacks above the content.
 *
 * @param props - See {@link SectionProps}.
 * @returns The section element.
 */
export function Section({ id, number, title, className, children }: SectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id={id}
      // scroll-mt clears the fixed navigation bar when jumping to an anchor.
      className={cn('w-full scroll-mt-20 px-4 sm:px-6', className)}
    >
      <div className="mx-auto grid max-w-5xl gap-8 border-t border-line py-16 sm:py-20 lg:grid-cols-[11rem_1fr] lg:gap-12">
        <div ref={ref} className={cn('reveal', isVisible && 'reveal-visible')}>
          <h2 className="flex items-baseline gap-3 lg:sticky lg:top-24 lg:flex-col lg:gap-1.5">
            <span className="font-mono text-xs text-accent">{number}</span>
            <span className="text-base font-semibold tracking-tight text-ink">{title}</span>
          </h2>
        </div>

        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

/** Props for {@link Reveal}. */
export interface RevealProps {
  /**
   * Delay before the transition starts, in milliseconds. Use to stagger a list
   * of sibling items.
   *
   * @defaultValue 0
   */
  delayMs?: number;
  /** Additional classes merged onto the wrapper `<div>`. */
  className?: string;
  /** Content to reveal. */
  children: ReactNode;
}

/**
 * Fades and slides its children into view the first time they are scrolled to.
 *
 * Honors `prefers-reduced-motion` by way of {@link useScrollReveal}, in which
 * case children appear immediately.
 *
 * @param props - See {@link RevealProps}.
 * @returns A wrapper div applying the reveal transition.
 */
export function Reveal({ delayMs = 0, className, children }: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn('reveal', isVisible && 'reveal-visible', className)}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
