/**
 * The tracklist: the site's table of contents, laid out like a record.
 *
 * Side A is the projects, Side B the roles, each in the order `portfolio.ts`
 * lists them. Nothing here is new content: every title, date, and anchor is
 * derived from `portfolio.ts`, so the tracklist can never disagree with the
 * sections below.
 */

import { experiences, projects } from './portfolio';

/** Which side of the record a track is on. */
export type Side = 'A' | 'B';

/** One track on the record. */
export interface Track {
  /** Printed code, e.g. "A1". */
  readonly code: string;
  /** The side it is on. */
  readonly side: Side;
  /** Track title: the project name or the organization. */
  readonly title: string;
  /** Short second line: the project tagline or the role held. */
  readonly subtitle: string;
  /** Year or year range, shown where a record shows running time. */
  readonly year: string;
  /** DOM id of the track's section on the page. */
  readonly anchor: string;
  /**
   * Relative length of the track's groove band on the vinyl. Longer write-ups
   * cut wider bands, the way a longer song takes more of the side.
   */
  readonly weight: number;
}

/**
 * The trailing year of a display period, e.g. "Sep 2026 - Present" gives
 * "2026" and "Sep 2025 - Apr 2026" gives "2025 to 2026".
 */
function yearsOf(period: string): string {
  const years = Array.from(new Set(period.match(/\d{4}/g) ?? []));
  return years.length > 1 ? `${years[0]} to ${years[years.length - 1]}` : (years[0] ?? period);
}

const sideA: readonly Track[] = [
  ...projects.map((project, index) => ({
    code: `A${index + 1}`,
    side: 'A' as const,
    title: project.title,
    subtitle: project.tagline,
    year: yearsOf(project.period),
    anchor: `track-${project.id}`,
    weight: project.highlights.length + 1,
  })),
];

const sideB: readonly Track[] = [
  ...experiences.map((role, index) => ({
    code: `B${index + 1}`,
    side: 'B' as const,
    title: role.organization.split(',')[0],
    subtitle: role.role,
    year: yearsOf(role.period),
    anchor: `track-${role.id}`,
    weight: role.highlights.length + 1,
  })),
];

/** Every track, by side. */
export const tracksBySide: Readonly<Record<Side, readonly Track[]>> = { A: sideA, B: sideB };

/** Every track in record order. */
export const allTracks: readonly Track[] = [...sideA, ...sideB];

/** Look up a track by its section anchor. */
export function trackForAnchor(anchor: string): Track | undefined {
  return allTracks.find((track) => track.anchor === anchor);
}
