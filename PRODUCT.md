# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters, hiring managers, and engineers screening Sean Snaider for Summer 2027 software engineering internships and co-ops. They usually arrive from the résumé, LinkedIn, or GitHub, spend a minute or two, and decide whether to dig in or reach out.

Secondary: people who find Sean through BellyDSP. The site sends them to bellydsp.com for downloads and support. It does not try to be BellyDSP's product site.

## Product Purpose

A personal portfolio for Sean Snaider, a Computer Science student at Northeastern University (Software Engineering concentration, expected May 2028) on co-op at Vertex Pharmaceuticals. It shows what he has built and shipped, with enough depth to back up the résumé.

Success means a visitor opens the résumé, reads a project case study, or emails him.

## Positioning

A visitor should come away believing three things that a typical CS student's site couldn't truthfully claim:

- **He ships real products.** People use what he builds. BellyDSP is released for macOS and Windows with installers and signed auto-updates. The SGA voting app runs real executive officer elections. The Vertex migration tool replaces work that was done by hand.
- **He steers AI agents well.** He directs AI coding agents (Claude Code) under strict, measurable constraints, and he is open about what agents wrote versus what he did.
- **His hobbies become engineering.** Progressive and math rock guitar became BellyDSP, an amp simulator. Ten-plus years of speedcubing (6.14s single) became a Kociemba two-phase solver.

## Operating Context

- Visitors usually land with the résumé PDF open or about to open, and they cross-reference the two.
- The site is deployed on Vercel at seansnaider.com, which is the canonical URL. Link previews on LinkedIn and X use the Open Graph tags in each page's HTML.
- It has two pages: the home page (`/`) and the BellyDSP case study (`/projects/bellydsp/`), built as a Vite multi-page app. A new project case study gets its own HTML entry.
- All résumé-derived copy lives in `src/data/portfolio.ts`. Long-form case study copy lives in its own data file (for example `src/data/bellydsp.ts`). Components render content and never hardcode it.

## Capabilities and Constraints

- **Sections:** About (with an education card), Experience (résumé roles plus a compact "Earlier" list), Projects (featured and standard cards plus a compact "Other projects" list), Skills, Contact.
- **Contact paths:** the résumé PDF (`public/Sean_Snaider_Resume.pdf`), email (snaider.s@northeastern.edu), LinkedIn, and GitHub.
- **The résumé PDF wins.** Site facts must match the current résumé. The extras the PDF has no room for (Disrupt, TheCubicle.com, the Guitar Learning Tool, Sanguine) are allowed, but they stay compact and must never contradict it.
- **Coursework stays private.** Systems Programming and Sanguine are graded coursework. Their repositories stay private for academic integrity reasons, so they never get code links.
- **Time-sensitive content needs upkeep:**
  - The hero announcement (`heroAnnouncement`) and the BellyDSP "What's coming next" section go stale and must be updated or removed when the next version ships.
  - The availability note names a specific recruiting term (currently Summer 2027) and must be updated each cycle.

## Brand Commitments

- **Name:** Sean Snaider (the résumé uses "Sean L. Snaider").
- **Voice:** site copy is first person, direct, and plain-spoken.
- **No em dashes in copy.** Never use them in site copy.
- **Honest AI credit.** Always say plainly where AI agents did the implementation. BellyDSP was designed and directed by Sean, and most of its code was written by Claude Code agents under his direction. Never imply he hand-wrote it.
- **No fabricated proof.** No invented metrics, testimonials, logos, employers, or claims.

## Evidence on Hand

- **Résumé:** `public/Sean_Snaider_Resume.pdf`, the source of truth for roles, dates, bullets, and skills.
- **Portrait:** `src/components/self.jpeg`.
- **BellyDSP:**
  - Screenshots `public/bellydsp-app.png` (the Amp page) and `public/bellydsp-amps.png` (the eight amps).
  - Measured results in `src/data/bellydsp.ts`, all from BellyDSP's own measurements and consistent with the résumé:
    - about 7,200 automated checks;
    - 0 allocations, frees, and locks on the audio thread;
    - tone-matcher error cut from 0.665 to 0.457, better in 39 of 50 cases (p = 6.7e-8);
    - the default rig cut from about 21% to 6% of the real-time budget, roughly 4x;
    - neural models made 2x faster, with output within -112 dB of the reference.
  - Links: bellydsp.com and github.com/SeanSnaider/BellyDSP.
- **Other project images:** `public/project-cube.png`, `public/project-filesystem.png`, `public/project-guitar.png`, `public/project-sanguine.png`.
- **Public repos:** BellyDSP, Rubik's Cube Solver, Guitar Learning Tool.
- **Headline numbers from the résumé:**
  - 3.89 GPA;
  - about $100K in annual effort saved at Vertex (projected by management);
  - 850+ students supported as a TA;
  - 50+ SGA members using the voting app.
- **Absent, and must not be fabricated:** testimonials, references, press, employer logos, user counts for BellyDSP, and a designed Open Graph card. `public/og-card.png` is still an outdated placeholder.

## Product Principles

1. **Match the résumé.** Everything checkable on the site must agree with the PDF. A recruiter who cross-references the two should find no mismatches.
2. **Show shipped work.** Lead with things real people use, backed by the specific numbers that prove it.
3. **Be precise about credit.** Say exactly what Sean did and what tools or agents did. Being open about it is part of the pitch, not a disclaimer.
4. **Let personality come from the real projects.** The guitar and cubing story should come through in the work itself, never through invented flourish.
5. **Respect the visitor's time.** A recruiter should find the résumé, the best project, and a way to make contact within seconds.
