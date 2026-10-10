/**
 * BellyDSP project page, served at `/projects/bellydsp/`.
 *
 * The long-form write-up behind the BellyDSP card on the home page: overview,
 * features, measured highlights, how it was built, and what is coming in the
 * next version. All copy comes from `src/data/bellydsp.ts`.
 *
 * Shares the navigation bar and footer with the home page so moving between
 * the two feels like one site.
 */

import type { ReactNode } from 'react';
import { ArrowLeft, Download, Github } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SignalLine } from '../components/SignalLine';
import { Reveal } from '../components/Section';
import { BulletList, LinkButton } from '../components/primitives';
import { bellyDsp } from '../data/bellydsp';

/** Props for {@link PageSection}. */
interface PageSectionProps {
  /** Section heading. */
  title: string;
  /** Section body. */
  children: ReactNode;
}

/**
 * A titled block of the write-up, separated from the previous one by a hairline.
 *
 * @param props - See {@link PageSectionProps}.
 * @returns The section element.
 */
function PageSection({ title, children }: PageSectionProps) {
  return (
    <section className="border-t border-line py-14 sm:py-16">
      <Reveal>
        <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">{title}</h2>
        <div className="mt-6">{children}</div>
      </Reveal>
    </section>
  );
}

/** Body-copy paragraph style for the write-up. */
const paragraphClasses = 'text-base leading-relaxed text-ink-muted sm:text-[17px]';

/**
 * The BellyDSP project page.
 *
 * @returns The page tree.
 */
export function BellyDspPage() {
  const { upcoming } = bellyDsp;

  return (
    <>
      <Navigation />

      <main className="w-full px-4 pt-24 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <a
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            All projects
          </a>

          {/* Header */}
          <header className="mt-8 max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              {bellyDsp.tagline}
              <span className="text-ink-faint"> · {bellyDsp.period}</span>
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {bellyDsp.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted sm:text-xl">{bellyDsp.summary}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton
                href={bellyDsp.downloadUrl}
                variant="primary"
                opensInNewTab
                icon={<Download aria-hidden="true" className="h-4 w-4" />}
              >
                Download
              </LinkButton>
              <LinkButton href={bellyDsp.websiteUrl} opensInNewTab>
                bellydsp.com
              </LinkButton>
              <LinkButton
                href={bellyDsp.sourceUrl}
                opensInNewTab
                icon={<Github aria-hidden="true" className="h-4 w-4" />}
              >
                Source on GitHub
              </LinkButton>
            </div>
          </header>

          {/* At a glance */}
          <SignalLine className="mt-12" />
          <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bellyDsp.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-xs uppercase tracking-wider text-ink-faint">{fact.label}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {/* Screenshot */}
          <figure className="mt-12">
            <img
              src={bellyDsp.screenshot.src}
              alt={bellyDsp.screenshot.alt}
              width={2560}
              height={1520}
              className="w-full rounded-xl border border-line"
            />
            <figcaption className="mt-3 text-sm text-ink-faint">{bellyDsp.screenshot.caption}</figcaption>
          </figure>

          <div className="mt-14 max-w-3xl">
            <PageSection title="Overview">
              <div className="space-y-5">
                {bellyDsp.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className={paragraphClasses}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </PageSection>

            <PageSection title="What it does">
              <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {bellyDsp.features.map((feature) => (
                  <div key={feature.title}>
                    <dt className="font-semibold text-ink">{feature.title}</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-ink-muted">{feature.body}</dd>
                  </div>
                ))}
              </dl>
            </PageSection>
          </div>

          {/* Highlights get the full width so the figures have room. */}
          <section className="border-t border-line py-14 sm:py-16">
            <Reveal>
              <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                What I'm proud of
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {bellyDsp.highlights.map((highlight) => (
                  <article key={highlight.title} className="rounded-xl border border-line bg-gradient-to-b from-surface-raised to-surface p-6">
                    <p className="text-3xl font-semibold tracking-tight text-accent tabular-nums">
                      {highlight.figure}
                    </p>
                    <p className="mt-1 font-mono text-xs leading-relaxed text-ink-faint">{highlight.figureLabel}</p>
                    <h3 className="mt-5 font-semibold text-ink">{highlight.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{highlight.body}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </section>

          <div className="max-w-3xl">
            <PageSection title="How I built it">
              <div className="space-y-5">
                {bellyDsp.process.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className={paragraphClasses}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </PageSection>
          </div>

          {/* What's coming */}
          <section className="border-t border-line py-14 sm:py-16">
            <Reveal>
              <div className="max-w-3xl">
                <p className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-ink-muted">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                  In development
                </p>
                <h2 className="mt-4 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  What's coming next
                </h2>
                <p className={`mt-4 ${paragraphClasses}`}>{upcoming.intro}</p>
              </div>

              <img
                src={upcoming.image.src}
                alt={upcoming.image.alt}
                width={1920}
                height={1005}
                loading="lazy"
                className="mt-10 w-full rounded-xl border border-line"
              />

              <div className="mt-12 max-w-3xl space-y-12">
                {upcoming.groups.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-lg font-semibold text-ink">{group.title}</h3>
                    {group.lead && <p className={`mt-3 ${paragraphClasses}`}>{group.lead}</p>}
                    <BulletList items={group.items} className="mt-4" />
                    {group.after.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)} className={`mt-4 ${paragraphClasses}`}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* Closing links */}
          <section className="border-t border-line py-14">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg font-medium text-ink">Try it, or read the code.</p>
              <div className="flex flex-wrap gap-3">
                <LinkButton
                  href={bellyDsp.downloadUrl}
                  variant="primary"
                  opensInNewTab
                  icon={<Download aria-hidden="true" className="h-4 w-4" />}
                >
                  Download
                </LinkButton>
                <LinkButton
                  href={bellyDsp.sourceUrl}
                  opensInNewTab
                  icon={<Github aria-hidden="true" className="h-4 w-4" />}
                >
                  Source on GitHub
                </LinkButton>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
