/**
 * Pointer tracking for the `.spotlight` card effect in index.css.
 *
 * Attach `trackSpotlight` as a card's `onPointerMove`. It writes the pointer
 * position, relative to the card, into the `--spot-x` / `--spot-y` custom
 * properties that the card's radial-gradient overlay is centred on. Writing
 * style properties directly avoids React state, so moving the mouse never
 * re-renders anything.
 */

import type { PointerEvent } from 'react';

/**
 * Update a spotlight card's highlight position from a pointer event.
 *
 * @param event - The pointer event from the card element.
 */
export function trackSpotlight(event: PointerEvent<HTMLElement>): void {
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  card.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
  card.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
}
