/**
 * Projects section.
 *
 * Renders `portfolio.projects` as cards. Featured projects get a wide,
 * image-beside-text layout; the rest fall into a two-column grid below them.
 *
 * Repository and live-demo links render only when the corresponding URL is
 * present in the data, so an unfilled URL degrades to a card without a link
 * rather than a broken one.
 */

import { Reveal, Section } from './Section';
import { projects, type Project } from '../data/portfolio';

/** GitHub mark, used on the "Code" link. */
function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

/** Outward arrow, used on the "Live demo" link. */
function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

/** Props for {@link ProjectLinks}. */
interface ProjectLinksProps {
  /** The project whose links should be rendered. */
  project: Project;
}

/**
 * Repository and live-demo links for a project.
 *
 * Renders nothing at all when the project has neither URL set.
 *
 * @param props - See {@link ProjectLinksProps}.
 * @returns The link row, or `null` if there are no links to show.
 */
function ProjectLinks({ project }: ProjectLinksProps) {
  const { repoUrl, liveUrl, title } = project;
  if (!repoUrl && !liveUrl) return null;

  const linkClasses =
    'inline-flex items-center gap-2 text-sm font-medium text-neutral-400 transition-colors hover:text-violet-300';

  return (
    <div className="mt-6 flex flex-wrap gap-5 border-t border-white/10 pt-5">
      {repoUrl && (
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClasses}
          aria-label={`View source code for ${title} on GitHub`}
        >
          <GitHubIcon />
          Code
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClasses}
          aria-label={`Open the live demo of ${title}`}
        >
          <ExternalLinkIcon />
          Live demo
        </a>
      )}
    </div>
  );
}

/** Props for {@link TechnologyChips}. */
interface TechnologyChipsProps {
  /** Technology names to render. */
  technologies: readonly string[];
}

/**
 * The technology chip row shown on every project card.
 *
 * @param props - See {@link TechnologyChipsProps}.
 * @returns A list of technology chips.
 */
function TechnologyChips({ technologies }: TechnologyChipsProps) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {technologies.map((technology) => (
        <li
          key={technology}
          className="rounded-md border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 font-mono text-xs text-violet-200"
        >
          {technology}
        </li>
      ))}
    </ul>
  );
}

/** Props for the project card components. */
interface ProjectCardProps {
  /** The project to render. */
  project: Project;
}

/**
 * A wide project card with the screenshot beside the copy.
 *
 * Used for projects flagged `isFeatured`. Collapses to a stacked layout below
 * the `lg` breakpoint.
 *
 * @param props - See {@link ProjectCardProps}.
 * @returns The featured card element.
 */
function FeaturedProjectCard({ project }: ProjectCardProps) {
  const { title, period, summary, highlights, technologies, image } = project;

  return (
    <article className="surface-card group grid overflow-hidden rounded-2xl lg:grid-cols-2">
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-violet-900/40 to-transparent lg:h-full lg:min-h-[22rem]">
        <img
          src={image}
          alt={`Screenshot of ${title}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* Softens the image edge into the card body on both layouts. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#05040a]/70 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#05040a]/40"
        />
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-mono text-xl font-semibold text-white transition-colors group-hover:text-violet-300">
            {title}
          </h3>
          <p className="font-mono text-xs tracking-wide text-neutral-500">{period}</p>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-neutral-300">{summary}</p>

        <ul className="mt-5 space-y-2.5">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-neutral-400">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-500" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <TechnologyChips technologies={technologies} />
        <ProjectLinks project={project} />
      </div>
    </article>
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
  const { title, period, summary, highlights, technologies, image } = project;

  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-violet-900/40 to-transparent">
        <img
          src={image}
          alt={`Screenshot of ${title}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#05040a]/80 to-transparent"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-mono text-lg font-semibold text-white transition-colors group-hover:text-violet-300">
            {title}
          </h3>
          <p className="font-mono text-xs tracking-wide text-neutral-500">{period}</p>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-neutral-300">{summary}</p>

        <ul className="mt-5 space-y-2.5">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-neutral-400">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-500" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* mt-auto pins the chips and links to the bottom so cards of differing
            text length still line up. */}
        <div className="mt-auto">
          <TechnologyChips technologies={technologies} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

/**
 * The Projects section.
 *
 * Splits `portfolio.projects` into featured and standard groups and renders
 * each with its corresponding card layout.
 *
 * @returns The projects section element.
 */
export function Projects() {
  const featuredProjects = projects.filter((project) => project.isFeatured);
  const standardProjects = projects.filter((project) => !project.isFeatured);

  return (
    <Section
      id="projects"
      eyebrow="03 / Projects"
      title="Things I've Built"
      subtitle="Side projects and coursework where I got to pick the hard part myself."
      maxWidth="max-w-6xl"
    >
      <div className="space-y-6">
        {featuredProjects.map((project, index) => (
          <Reveal key={project.id} delayMs={index * 90}>
            <FeaturedProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {standardProjects.length > 0 && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {standardProjects.map((project, index) => (
            <Reveal key={project.id} delayMs={index * 90}>
              <StandardProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
