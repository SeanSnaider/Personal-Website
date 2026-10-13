/**
 * BellyDSP project page, served at `/projects/bellydsp/`.
 *
 * The full liner notes for track A1: pressing details and credits, what the
 * record does, what Sean is proud of, how it was recorded, and the next
 * release. All copy comes from `src/data/bellydsp.ts`; the track code comes
 * from `src/data/tracks.ts` so it always matches the home page tracklist.
 *
 * Shares the top bar and footer with the home page so the two read as one
 * record.
 */

import type { ReactNode } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { LinkButton, NoteList, TextLink } from '../components/primitives';
import { bellyDsp } from '../data/bellydsp';
import { trackForAnchor } from '../data/tracks';
import { catalogNumber, projects } from '../data/portfolio';

/** The home-page project entry, for its credits. */
const project = projects.find((entry) => entry.id === 'bellydsp');
/** Track code on the home page, e.g. "A1". */
const trackCode = trackForAnchor('track-bellydsp')?.code ?? 'A1';

/** Props for {@link NotesSection}. */
interface NotesSectionProps {
  /** Section heading. */
  title: string;
  /** Section body. */
  children: ReactNode;
}

/**
 * One block of the liner notes: a heavy rule, then a heading.
 *
 * @param props - See {@link NotesSectionProps}.
 * @returns The section element.
 */
function NotesSection({ title, children }: NotesSectionProps) {
  return (
    <section className="border-t-2 border-ink pt-6">
      <h2 className="font-expanded text-[clamp(1.875rem,3.6vw,3rem)] font-extrabold leading-none tracking-[-0.03em] text-ink">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

/** Body-copy paragraph style for the notes. */
const paragraphClasses = 'text-[17px] leading-relaxed text-ink-soft';

/**
 * The BellyDSP page.
 *
 * @returns The page tree.
 */
export function BellyDspPage() {
  const { redesign, process } = bellyDsp;
  // The credit lines say who did what, so the summary "Role" fact would only
  // repeat them; it is dropped whenever credits exist.
  const credits = project?.credits ?? [];
  const pressing = [
    ...bellyDsp.facts
      .filter((fact) => !(credits.length > 0 && fact.label === 'Role'))
      .map((fact) => ({ label: fact.label, value: fact.value })),
    ...credits.map((credit) => ({ label: credit.role, value: credit.who })),
  ];

  return (
    <>
      <Navigation />

      <main className="w-full px-4 pt-24 sm:px-8 sm:pt-28">
        <div className="mx-auto max-w-[1312px] space-y-24 lg:space-y-32">
          <div>
            <a
              href="/#track-bellydsp"
              className="text-sm text-ink-soft underline decoration-rule-strong underline-offset-[5px] transition-colors hover:text-ink hover:decoration-label"
            >
              Back to the tracklist
            </a>

            {/* Header: track code and title, then the pressing details. */}
            <header className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
              <div>
                <p className="font-expanded text-[clamp(3rem,6vw,5rem)] font-extrabold leading-none tracking-[-0.03em] text-label">
                  {trackCode}
                </p>
                <h1 className="mt-4 font-expanded text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-ink">
                  {bellyDsp.title}
                </h1>
                <p className="mt-4 text-xl text-ink-soft">
                  {bellyDsp.tagline} · {bellyDsp.period}
                </p>
                <p className="mt-6 max-w-[40rem] text-[clamp(1.125rem,1.6vw,1.375rem)] leading-normal text-ink">
                  {bellyDsp.summary}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <LinkButton href={bellyDsp.downloadUrl} variant="primary" opensInNewTab>
                    Download
                  </LinkButton>
                  <TextLink href={bellyDsp.websiteUrl} isExternal>
                    bellydsp.com
                  </TextLink>
                  <TextLink href={bellyDsp.sourceUrl} isExternal>
                    Source on GitHub
                  </TextLink>
                </div>
              </div>

              <dl className="self-end border-t border-rule text-[15px]">
                {pressing.map((row) => (
                  <div key={row.label} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-rule py-3">
                    <dt className="text-slate">{row.label}</dt>
                    <dd className="text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </header>

            <figure className="mt-14">
              <div className="bg-board-raised p-2 sm:p-3">
                <img
                  src={bellyDsp.screenshot.src}
                  alt={bellyDsp.screenshot.alt}
                  width={bellyDsp.screenshot.width}
                  height={bellyDsp.screenshot.height}
                  className="w-full"
                />
              </div>
              <figcaption className="mt-3 text-sm text-slate">{bellyDsp.screenshot.caption}</figcaption>
            </figure>
          </div>

          <NotesSection title="Overview">
            <div className="max-w-[46rem] space-y-5">
              {bellyDsp.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className={paragraphClasses}>
                  {paragraph}
                </p>
              ))}
            </div>
          </NotesSection>

          <NotesSection title="What it does">
            <dl className="border-t border-rule">
              {bellyDsp.features.map((feature) => (
                <div
                  key={feature.title}
                  className="grid gap-2 border-b border-rule py-6 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-16"
                >
                  <dt className="font-semi-expanded text-lg font-bold text-ink">{feature.title}</dt>
                  <dd className="max-w-[46rem] text-base leading-relaxed text-ink-soft">{feature.body}</dd>
                </div>
              ))}
            </dl>
          </NotesSection>

          <NotesSection title="The redesign">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <div className="max-w-[40rem]">
                <div className="space-y-5">
                  {redesign.intro.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className={paragraphClasses}>
                      {paragraph}
                    </p>
                  ))}
                </div>
                <NoteList items={redesign.onScreen} className="mt-4" />
                <p className={`mt-6 ${paragraphClasses}`}>{redesign.afterList}</p>
              </div>

              <div className="space-y-12">
                {[redesign.heads, redesign.board].map((plate) => (
                  <figure key={plate.image.src}>
                    <div className="bg-board-raised p-2 sm:p-3">
                      <img
                        src={plate.image.src}
                        alt={plate.image.alt}
                        width={plate.image.width}
                        height={plate.image.height}
                        loading="lazy"
                        className="w-full"
                      />
                    </div>
                    <figcaption className="mt-3 text-sm text-slate">{plate.image.caption}</figcaption>
                    <p className={`mt-5 ${paragraphClasses}`}>{plate.text}</p>
                  </figure>
                ))}

                {/* Who did what on the redesign, set as a liner credit. */}
                <p className="border-t border-rule pt-5 text-base leading-relaxed text-ink">{redesign.credit}</p>
              </div>
            </div>
          </NotesSection>

          {/* The inner sleeve: a panel of paper stock with the die-cut hole
              that shows the record's center label through it. The figures are
              set inside their sentences, like credits, not as big numbers. */}
          <section className="relative overflow-hidden bg-board-raised px-6 py-10 sm:px-10 sm:py-14">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 hidden aspect-square w-[22rem] rounded-full bg-board md:block"
            >
              <div className="absolute inset-[30%] flex items-center justify-center rounded-full bg-label">
                <span className="font-expanded text-3xl font-extrabold text-board">{trackCode}</span>
              </div>
            </div>

            <h2 className="relative font-expanded text-[clamp(1.875rem,3.6vw,3rem)] font-extrabold leading-none tracking-[-0.03em] text-ink">
              What I'm proud of
            </h2>
            <dl className="relative mt-10 border-t border-rule md:mr-56">
              {bellyDsp.highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="grid gap-2 border-b border-rule py-6 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-16"
                >
                  <dt className="font-semi-expanded text-lg font-bold text-ink">{highlight.title}</dt>
                  <dd className="text-base leading-relaxed text-ink-soft">
                    <span className="font-semi-expanded font-bold text-ink">{highlight.figure}</span>{' '}
                    {highlight.figureLabel}. {highlight.body}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <NotesSection title="How I built it">
            <div className="max-w-[46rem]">
              <p className={paragraphClasses}>{process.intro}</p>
              <p className={`mt-5 ${paragraphClasses}`}>{process.jobLead}</p>
              <NoteList items={process.jobs} className="mt-4" />
              <div className="mt-6 space-y-5">
                {process.after.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className={paragraphClasses}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </NotesSection>

          <section className="flex flex-col gap-6 border-t-2 border-ink pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-expanded text-2xl font-extrabold tracking-[-0.02em] text-ink">Try it, or read the code.</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <LinkButton href={bellyDsp.downloadUrl} variant="primary" opensInNewTab>
                Download
              </LinkButton>
              <TextLink href={bellyDsp.sourceUrl} isExternal>
                Source on GitHub
              </TextLink>
            </div>
          </section>
          {/* Runout groove: the matrix number a pressing plant etches between
              the last track and the label, set here as the page's sign-off. */}
          <p aria-hidden="true" className="-mt-16 font-expanded text-xs font-semibold uppercase tracking-[0.3em] text-slate lg:-mt-24">
            {catalogNumber}-{trackCode} · {bellyDsp.title} · Pressed {bellyDsp.period.match(/\d{4}/)?.[0]}
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
