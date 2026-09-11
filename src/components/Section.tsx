/**
 * Shared section layout primitives.
 *
 * Exports `Section`, the wrapper every content section on the page uses, and
 * `Reveal`, a generic scroll-triggered fade-and-rise wrapper for individual
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
  /** Small uppercase label rendered above the heading, e.g. "02 / Experience". */
  eyebrow: string;
  /** The section's main heading text. */
  title: string;
  /** Optional one-line description rendered beneath the heading. */
  subtitle?: string;
  /**
   * Maximum content width.
   *
   * @defaultValue 'max-w-5xl'
   */
  maxWidth?: string;
  /** Additional classes merged onto the `<section>` element. */
  className?: string;
  /** The section body. */
  children: ReactNode;
}

/**
 * A page section with a consistent header, spacing, and scroll anchor.
 *
 * Renders a `<section>` containing an eyebrow label, an `<h2>` heading, an
 * optional subtitle, an accent rule, and the supplied children. The header
 * animates into view on scroll via {@link useScrollReveal}.
 *
 * Side effects: none beyond registering an IntersectionObserver for the header.
 *
 * @param props - See {@link SectionProps}.
 * @returns The section element.
 */
export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  maxWidth = 'max-w-5xl',
  className,
  children,
}: SectionProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id={id}
      // scroll-mt clears the fixed navigation pill when jumping to an anchor.
      className={cn('relative w-full scroll-mt-28 px-6 py-24 sm:px-8 md:py-32', className)}
    >
      <div className={cn('mx-auto', maxWidth)}>
        <div ref={ref} className={cn('reveal mb-14', isVisible && 'reveal-visible')}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-400">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">{subtitle}</p>
          )}
          <div className="mt-6 h-px w-16 bg-gradient-to-r from-violet-500 to-transparent" />
        </div>

        {children}
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
