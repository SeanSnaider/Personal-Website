/**
 * Side A (projects) and Side B (experience), set as liner notes.
 *
 * Each project and role is a track spread: the track code and title on the
 * left with its recording details and credits, the notes on the right. Rank
 * comes from type size alone; there are no cards.
 *
 * Content comes from `src/data/portfolio.ts`; codes and anchors from
 * `src/data/tracks.ts`, so the tracklist above always matches.
 */

import type { ReactNode } from 'react';
import { LinkButton, NoteList, TextLink } from './primitives';
import { trackForAnchor, type Side } from '../data/tracks';
import {
  experiences,
  projects,
  type Experience,
  type Project,
} from '../data/portfolio';

/** Props for {@link SideSection}. */
interface SideSectionProps {
  /** DOM id for in-page navigation. */
  id: string;
  /** Which side. */
  side: Side;
  /** What the side holds, e.g. "Projects". */
  name: string;
  /** The tracks. */
  children: ReactNode;
}

/**
 * A record side: a large side heading, then its tracks.
 *
 * @param props - See {@link SideSectionProps}.
 * @returns The section element.
 */
function SideSection({ id, side, name, children }: SideSectionProps) {
  return (
    <section id={id} className="w-full scroll-mt-16 px-4 sm:px-8">
      <div className="mx-auto max-w-[1312px] border-t-2 border-ink pt-6">
        <h2 className="flex flex-wrap items-baseline gap-x-5 font-expanded text-[clamp(3rem,8vw,6rem)] font-extrabold leading-none tracking-[-0.035em] text-ink">
          Side {side}
          <span className="font-sans text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium tracking-normal text-ink-soft">
            {name}
          </span>
        </h2>
        <div className="mt-12 lg:mt-16">{children}</div>
      </div>
    </section>
  );
}

/** Props for {@link TrackSpread}. */
interface TrackSpreadProps {
  /** DOM id; must be a track anchor from `tracks.ts`. */
  anchor: string;
  /** Second line under the title. */
  subtitle: string;
  /** Recording details, printed as label and value pairs. */
  details: readonly { label: string; value: string }[];
  /** Right-hand column. */
  children: ReactNode;
}

/**
 * One track: code, title, and details left; the notes right.
 *
 * @param props - See {@link TrackSpreadProps}.
 * @returns The article element.
 */
function TrackSpread({ anchor, subtitle, details, children }: TrackSpreadProps) {
  const track = trackForAnchor(anchor);
  if (!track) return null;

  return (
    <article
      id={anchor}
      className="grid scroll-mt-20 gap-8 border-t border-rule py-12 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-16"
    >
      <header>
        <p className="font-expanded text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-none tracking-[-0.03em] text-label">
          {track.code}
        </p>
        <h3 className="mt-4 font-expanded text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.025em] text-ink">
          {track.title}
        </h3>
        <p className="mt-2 text-lg text-ink-soft">{subtitle}</p>

        <dl className="mt-8 space-y-3 text-[15px]">
          {details.map((detail) => (
            <div key={detail.label} className="grid grid-cols-[7.5rem_1fr] gap-4">
              <dt className="text-slate">{detail.label}</dt>
              <dd className="text-ink">{detail.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="min-w-0">{children}</div>
    </article>
  );
}

/** Credits, stack, and dates for a project, as liner-note details. */
function projectDetails(project: Project) {
  return [
    { label: 'Released', value: project.period },
    ...(project.credits ?? []).map((credit) => ({ label: credit.role, value: credit.who })),
    { label: 'Instruments', value: project.technologies.join(', ') },
  ];
}

/** One project's notes column. */
function ProjectNotes({ project }: { project: Project }) {
  return (
    <>
      <p className="max-w-[40rem] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-normal text-ink">
        {project.summary}
      </p>

      {/* The photo inside the gatefold, framed like a print on the sleeve. */}
      <figure className="mt-8 bg-board-raised p-2 sm:p-3">
        <img
          src={project.image}
          srcSet={project.imageSrcSet}
          // Seven of twelve columns of a 1312px page, full width below lg.
          sizes={project.imageSrcSet ? '(min-width: 1024px) 760px, 100vw' : undefined}
          alt={project.imageAlt}
          loading="lazy"
          className={
            project.isFeatured
              ? 'aspect-[16/9.5] w-full object-cover object-top'
              : 'aspect-[16/8] w-full object-cover ' + (project.imageFocus === 'top' ? 'object-top' : 'object-center')
          }
        />
      </figure>

      <NoteList items={project.highlights} className="mt-8" />

      {(project.detailPath || project.liveUrl || project.repoUrl) && (
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          {project.detailPath && (
            <LinkButton href={project.detailPath} variant="primary">
              Read the full liner notes
            </LinkButton>
          )}
          {project.liveUrl && (
            <TextLink href={project.liveUrl} isExternal>
              {new URL(project.liveUrl).hostname}
            </TextLink>
          )}
          {project.repoUrl && (
            <TextLink href={project.repoUrl} isExternal ariaLabel={`Source code for ${project.title} on GitHub`}>
              Source
            </TextLink>
          )}
        </div>
      )}
    </>
  );
}

/** Recording details for a role. */
function roleDetails(role: Experience) {
  return [
    { label: 'Recorded', value: role.period },
    { label: 'At', value: role.organization },
    { label: 'Where', value: role.location },
    ...(role.extraDetails ?? []),
    { label: 'Instruments', value: role.technologies.join(', ') },
    ...(role.isCurrent ? [{ label: 'Status', value: 'Current' }] : []),
  ];
}

/**
 * Side A: projects.
 *
 * @returns The section element.
 */
export function SideA() {
  return (
    <SideSection id="side-a" side="A" name="Projects">
      {projects.map((project) => (
        <TrackSpread
          key={project.id}
          anchor={`track-${project.id}`}
          subtitle={project.tagline}
          details={projectDetails(project)}
        >
          <ProjectNotes project={project} />
        </TrackSpread>
      ))}
    </SideSection>
  );
}

/**
 * Side B: experience.
 *
 * @returns The section element.
 */
export function SideB() {
  return (
    <SideSection id="side-b" side="B" name="Experience">
      {experiences.map((role) => (
        <TrackSpread key={role.id} anchor={`track-${role.id}`} subtitle={role.role} details={roleDetails(role)}>
          <NoteList items={role.highlights} />
        </TrackSpread>
      ))}
    </SideSection>
  );
}
