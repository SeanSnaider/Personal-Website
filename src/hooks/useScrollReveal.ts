/**
 * Scroll-reveal hook.
 *
 * Provides `useScrollReveal`, a small IntersectionObserver wrapper that reports
 * when an element has scrolled into view so sections can fade and slide in as
 * the user reaches them.
 *
 * Usage notes:
 *   - The observer disconnects after the first intersection. Reveals are
 *     one-way: content never re-hides when scrolled back past.
 *   - Respects `prefers-reduced-motion`. When the user has requested reduced
 *     motion the hook reports `true` immediately and never observes, so content
 *     is visible without animation.
 *   - Pair with the `.reveal` / `.reveal-visible` classes defined in App.css.
 */

import { useEffect, useRef, useState, type RefObject } from 'react';

/** Tuning knobs for when a reveal should trigger. */
export interface ScrollRevealOptions {
  /**
   * Fraction of the element that must be visible before revealing, 0 to 1.
   *
   * @defaultValue 0.15
   */
  threshold?: number;
  /**
   * Margin applied to the viewport before computing intersections, in CSS
   * margin syntax. A negative bottom value delays the reveal until the element
   * is comfortably on screen.
   *
   * @defaultValue '0px 0px -80px 0px'
   */
  rootMargin?: string;
}

/** What {@link useScrollReveal} hands back to the calling component. */
export interface ScrollRevealResult<T extends HTMLElement> {
  /** Attach to the element whose visibility should be tracked. */
  ref: RefObject<T | null>;
  /** `true` once the element has entered the viewport at least once. */
  isVisible: boolean;
}

/** Media query matching a user request to minimize non-essential motion. */
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Check whether the user has asked to minimize non-essential motion.
 *
 * Safe to call before the DOM exists; returns `false` in that case so the
 * animated path is the default.
 *
 * @returns `true` if reduced motion is preferred.
 */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * Track whether an element has scrolled into view.
 *
 * @typeParam T - The element type the returned ref will be attached to.
 * @param options - Threshold and root margin controlling the trigger point.
 * @returns A ref to attach to the target element and its current visibility.
 *
 * @example
 * ```tsx
 * const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
 * return <div ref={ref} className={isVisible ? 'reveal reveal-visible' : 'reveal'} />;
 * ```
 */
export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {},
): ScrollRevealResult<T> {
  const { threshold = 0.15, rootMargin = '0px 0px -80px 0px' } = options;

  const ref = useRef<T>(null);

  // Users who asked for reduced motion start visible, so there is no state
  // change to render and no observer to pay for. Resolving this in the initial
  // state rather than in the effect avoids a cascading re-render on mount.
  const [isVisible, setIsVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          // One-way reveal: stop paying for observation once it has fired.
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
