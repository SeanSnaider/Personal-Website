/**
 * Projects section.
 *
 * Renders `portfolio.projects` as cards (featured projects full-width, the rest
 * in a two-column grid), then `portfolio.otherProjects` as a compact list.
 *
 * Repository, live-site, and detail-page links render only when the
 * corresponding URL is present in the data, so an unfilled URL degrades to a
 * card without a link rather than a broken one.
 */

import { ArrowRight } from 'lucide-react';
import { Reveal, Section } from './Section';
import { BulletList, StackLine, TextLink } from './primitives';
import { cn } from '../lib/utils';
import { trackSpotlight } from '../lib/spotlight';
import { otherProjects, projects, type Project } from '../data/portfolio';

/** Props for {@link ProjectLinks}. */
interface ProjectLinksProps {
  /** The project whose links should be rendered. */
  project: Project;
}

/**
 * Detail-page, live-site, and repository links for a project.
 *
 * Renders nothing at all when the project has none of them.
 *
 * @param props - See {@link ProjectLinksProps}.
 * @returns The link row, or `null` if there are no links to show.
 */
function ProjectLinks({ project }: ProjectLinksProps) {
  const { detailPath, liveUrl, repoUrl, title } = project;
  if (!detailPath && !liveUrl && !repoUrl) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
      {detailPath && (
        <a
          href={detailPath}
          className="group/detail inline-flex h-9 items-center gap-2 rounded-lg bg-ink px-3.5 text-sm font-medium text-bg transition-colors hover:bg-white"
        >
          Read the case study
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform group-hover/detail:translate-x-0.5"
          />
        </a>
      )}
      {liveUrl && (
        <TextLink href={liveUrl} isExternal ariaLabel={`Visit the ${title} website`}>
          {new URL(liveUrl).hostname}
        </TextLink>
      )}
      {repoUrl && (
        <TextLink href={repoUrl} isExternal ariaLabel={`View source code for ${title} on GitHub`}>
          Source
        </TextLink>
      )}
    </div>
  );
}

/** Props for the project card components. */
interface ProjectCardProps {
  /** The project to render. */
  project: Project;
}

/** Title, tagline, and period, shared by both card layouts. */
function ProjectHeading({ project }: ProjectCardProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-ink">{project.title}</h3>
      <p className="mt-0.5 text-sm text-ink-faint">
        {project.tagline}
        <span className="font-mono text-xs"> · {project.period}</span>
      </p>
    </div>
  );
}

/** Props for {@link ProjectImage}. */
interface ProjectImageProps {
  /** The project whose screenshot to render. */
  project: Project;
  /** Tailwind aspect-ratio class for the crop, e.g. `aspect-[16/9]`. */
  aspectClass: string;
}

/**
 * A project screenshot cropped to the card's aspect ratio.
 *
 * @param props - See {@link ProjectImageProps}.
 * @returns The image inside its bordered frame.
 */
function ProjectImage({ project, aspectClass }: ProjectImageProps) {
  return (
    <div className="overflow-hidden border-b border-line bg-bg">
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        className={cn(
          'card-media w-full object-cover',
          aspectClass,
          project.imageFocus === 'top' ? 'object-top' : 'object-center',
        )}
      />
    </div>
  );
}

/**
 * A full-width project card: screenshot on top, full write-up beneath.
 *
 * Used for projects flagged `isFeatured`.
 *
 * @param props - See {@link ProjectCardProps}.
 * @returns The featured card element.
 */
function FeaturedProjectCard({ project }: ProjectCardProps) {
  const { summary, highlights, technologies } = project;

  return (
    <div className="relative isolate">
      {/* Soft accent glow behind the featured card, so it reads as the lead
          project without needing a louder border. */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-6 -top-6 -z-10 h-2/3 rounded-[3rem] bg-accent/[0.07] blur-3xl"
      />
      <article
        onPointerMove={trackSpotlight}
        className="card-hover spotlight relative overflow-hidden rounded-xl border border-line bg-surface"
      >
        {/* 16/9.5 matches the BellyDSP screenshot, so it shows uncropped. */}
        <ProjectImage project={project} aspectClass="aspect-[16/9.5]" />

        <div className="p-5 sm:p-7">
          <ProjectHeading project={project} />
          <p className="mt-3 leading-relaxed text-ink">{summary}</p>
          <BulletList items={highlights} className="mt-5" />
          <StackLine technologies={technologies} className="mt-5" />
          <ProjectLinks project={project} />
        </div>
      </article>
    </div>
  );
}

/**
 * A standard project card: screenshot on top, copy beneath.
 *
 * Used for projects not flagged `isFeatured`.
 *
 * @param props - See {@link ProjectCardProps}.
 * @returns The standard card element.
 */
function StandardProjectCard({ project }: ProjectCardProps) {
  const { summary, highlights, technologies } = project;

  return (
    <article
      onPointerMove={trackSpotlight}
      className="card-hover spotlight relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface"
    >
      <ProjectImage project={project} aspectClass="aspect-[16/9]" />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <ProjectHeading project={project} />
        <p className="mt-3 text-[15px] leading-relaxed text-ink">{summary}</p>
        <BulletList items={highlights} className="mt-4" />

        {/* mt-auto pins the stack and links to the bottom so cards of
            differing text length still line up. */}
        <div className="mt-auto pt-5">
          <StackLine technologies={technologies} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

/**
 * The Projects section.
 *
 * @returns The projects section element.
 */
export function Projects() {
  const featuredProjects = projects.filter((project) => project.isFeatured);
  const standardProjects = projects.filter((project) => !project.isFeatured);

  return (
    <Section id="projects" number="03" title="Projects">
      <div className="space-y-6">
        {featuredProjects.map((project) => (
          <Reveal key={project.id}>
            <FeaturedProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {standardProjects.length > 0 && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {standardProjects.map((project, index) => (
            <Reveal key={project.id} delayMs={index * 80}>
              <StandardProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}

      {otherProjects.length > 0 && (
        <Reveal className="mt-14">
          <h3 className="font-mono text-xs uppercase tracking-wider text-ink-faint">
            Other projects
          </h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {otherProjects.map((project) => (
              <li key={project.id} className="py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-medium text-ink">{project.title}</p>
                  <p className="font-mono text-xs text-ink-faint">{project.period}</p>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{project.summary}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <StackLine technologies={project.technologies} />
                  {project.repoUrl && (
                    <TextLink
                      href={project.repoUrl}
                      isExternal
                      ariaLabel={`View source code for ${project.title} on GitHub`}
                    >
                      Source
                    </TextLink>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  );
}
