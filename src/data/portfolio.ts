/**
 * Portfolio content: the single source of truth for every piece of résumé data
 * rendered on the home page.
 *
 * All copy shown in the Hero, About, Experience, Projects, Skills, Contact and
 * Footer sections originates here so that updating the résumé means editing one
 * file rather than hunting through JSX. Components in `src/components` are
 * presentation-only and must not hardcode résumé facts. Long-form project
 * write-ups live in their own files next to this one (see `bellydsp.ts`).
 *
 * Usage notes:
 *   - Keep this file in sync with `public/Sean_Snaider_Resume.pdf`. If the two
 *     disagree, the PDF wins: recruiters cross-reference it.
 *   - `experiences`, `projects` and `skillCategories` mirror the PDF. The
 *     `earlierExperiences` and `otherProjects` lists are deliberate extras that
 *     the one-page PDF has no room for (Systems Programming dropped off the
 *     résumé and lives on here); they render as compact bonus tracks.
 *   - Ordering matters: every list renders in array order and is expected to be
 *     reverse-chronological (most recent first).
 *   - Dates are human-readable display strings, not parsed values. They are
 *     rendered verbatim.
 */

import { bellyDspScreens } from './screens';

/** Where a project's source code lives, or `null` if the repo is not public. */
export type RepositoryUrl = string | null;

/**
 * Public GitHub repository URLs, collected here so they can be filled in or
 * corrected without touching the project entries below.
 *
 * A `null` value means there is no public repo; the corresponding project card
 * simply omits its "Code" link rather than rendering a broken one.
 *
 * Systems Programming and Sanguine are coursework and will stay `null`:
 * publishing solutions to graded assignments is an academic integrity problem,
 * so this is deliberate rather than pending.
 */
const REPOSITORY_URLS = {
  bellyDsp: 'https://github.com/SeanSnaider/BellyDSP' as RepositoryUrl,
  guitarLearningTool: 'https://github.com/SeanSnaider/Guitar-Scale-Tool' as RepositoryUrl,
  rubiksCubeSolver: 'https://github.com/SeanSnaider/RubiksCubeProject' as RepositoryUrl,
  systemsProgramming: null as RepositoryUrl,
  sanguine: null as RepositoryUrl,
} as const;

/**
 * Identifying and contact information for the site owner.
 *
 * `email` is the address advertised on the résumé; keep the two identical.
 */
export interface Profile {
  /** Full display name, used in the hero heading and footer copyright. */
  readonly name: string;
  /** Short professional label rendered under the name in the hero. */
  readonly title: string;
  /** City and state, rendered as a secondary hero detail. */
  readonly location: string;
  /** Primary contact address; must match the résumé. */
  readonly email: string;
  /** Full LinkedIn profile URL. */
  readonly linkedin: string;
  /** Full GitHub profile URL. */
  readonly github: string;
  /** Site-root-relative path to the résumé PDF. */
  readonly resumePath: string;
}

/**
 * The site's catalog number, printed like a record label's on the spine, the
 * sleeve, and the fine print. Purely a label; it identifies nothing.
 */
export const catalogNumber = 'SS-001';

/** Contact details and links for Sean Snaider. */
export const profile: Profile = {
  name: 'Sean Snaider',
  title: 'Software Engineer',
  location: 'Boston, Massachusetts',
  email: 'snaider.s@northeastern.edu',
  linkedin: 'https://www.linkedin.com/in/seansnaider/',
  github: 'https://github.com/SeanSnaider',
  resumePath: '/Sean_Snaider_Resume.pdf',
};

/**
 * The one- or two-sentence introduction under the name in the hero.
 *
 * This is the first thing a visitor reads after the name, so it should say
 * where I am and what I build, and nothing else.
 */
export const heroIntro =
  "Computer Science student at Northeastern, on co-op at Vertex Pharmaceuticals. I build real-time audio software and full-stack tools that replace work people were doing by hand.";

/**
 * The small status pill above the name in the hero: the one thing worth
 * pointing a visitor at right now. Set to `null` to hide it.
 */
export interface Announcement {
  /** Short tag shown in the accent color, e.g. "New". */
  readonly tag: string;
  /** The announcement itself, a few words. */
  readonly text: string;
  /** Where the pill links to. */
  readonly href: string;
}

/** The hero announcement. Update or null it out when it stops being news. */
export const heroAnnouncement: Announcement | null = {
  tag: 'New',
  text: 'A new look for BellyDSP',
  href: '/projects/bellydsp/',
};

/**
 * A degree program and the institution granting it.
 *
 * Rendered as a compact card inside the About section rather than as its own
 * top-level section, to keep the page scannable.
 */
export interface Education {
  /** Name of the degree-granting institution. */
  readonly school: string;
  /** Degree and concentration, spelled out. */
  readonly degree: string;
  /** Campus location. */
  readonly location: string;
  /** Expected or actual graduation, e.g. "Expected May 2028". */
  readonly graduation: string;
  /** Cumulative GPA formatted as "x.xx/4.00". */
  readonly gpa: string;
  /** Academic honors and distinctions. */
  readonly honors: readonly string[];
}

/** Sean's undergraduate program at Northeastern. */
export const education: Education = {
  school: 'Northeastern University',
  degree: 'B.S. in Computer Science, Concentration in Software Engineering',
  location: 'Boston, Massachusetts',
  graduation: 'Expected May 2028',
  gpa: '3.89/4.00',
  honors: ["Dean's List"],
};

/**
 * A single professional role, rendered in full.
 *
 * Invariant: `highlights` is never empty. A role with nothing to say about it
 * belongs in `earlierExperiences` or should be omitted entirely.
 */
export interface Experience {
  /** Stable key used for React list reconciliation. */
  readonly id: string;
  /** Employing organization. */
  readonly organization: string;
  /** Job title held at that organization. */
  readonly role: string;
  /** Work location. */
  readonly location: string;
  /** Display-formatted date range, e.g. "Jul 2026 - Dec 2026". */
  readonly period: string;
  /** Whether this role is ongoing; drives the "Current" marker. */
  readonly isCurrent: boolean;
  /** Accomplishment bullets, most significant first. */
  readonly highlights: readonly string[];
  /** Technologies used in the role, rendered as a quiet stack line. */
  readonly technologies: readonly string[];
}

/** Professional experience in reverse-chronological order, as on the résumé. */
export const experiences: readonly Experience[] = [
  {
    id: 'vertex',
    organization: 'Vertex Pharmaceuticals',
    role: 'G&A Architecture and Strategy Co-op',
    location: 'Boston, Massachusetts',
    period: 'Jul 2026 - Dec 2026',
    isCurrent: true,
    highlights: [
      'Designed and built a Python/SQL ETL tool migrating ~4,000 contracts (~200 fields each) from Agiloft to Icertis, replacing a manual process and a legacy Microsoft Access workflow; management projects ~$100K/year in savings.',
      'Made migrations reconfigurable without code changes by driving all ~200 field mappings from declarative Excel config with per-field overrides; iterated on the design with ~10 stakeholders, including the heads of contract management and Icertis.',
      'Built automated validation tests that check migrated records for value fidelity, referential integrity, and datatype mismatches against the Icertis schema, narrowing manual review to logic-level issues.',
    ],
    technologies: ['Python', 'SQL', 'Excel', 'Agiloft', 'Icertis', 'Microsoft Access'],
  },
  {
    id: 'sga',
    organization: 'Student Government Association, Northeastern University',
    role: 'Software Engineer',
    location: 'Boston, Massachusetts',
    period: 'Feb 2026 - Present',
    isCurrent: true,
    highlights: [
      "One of 6 engineers on a full-stack attendance and voting app (Next.js, Prisma, PostgreSQL) that replaced spreadsheets for 50+ members across 20+ meetings per semester; built UI features, fixed attendance data-loss bugs, and review and merge teammates' pull requests.",
      "Fixed a data-loss bug where editing one member's attendance reset every other member's recorded attendance to \"pending\"; traced it to an update loop that overwrote finalized records instead of skipping them.",
      'Blocked ineligible members from voting in executive elections by moving vote validation server-side (Next.js API routes, Prisma, schema-checked requests).',
    ],
    technologies: ['Next.js', 'Prisma', 'PostgreSQL'],
  },
  {
    id: 'khoury-ta',
    organization: 'Khoury College of Computer Sciences, Northeastern University',
    role: 'Teaching Assistant',
    location: 'Boston, Massachusetts',
    period: 'Sep 2025 - Apr 2026',
    isCurrent: false,
    highlights: [
      'Led two weekly labs of ~40 students for intro CS courses in Python and Java (850+ combined enrollment), covering OOP, data structures, and recursion; graded assignments and ran review sessions.',
    ],
    technologies: ['Python', 'Java'],
  },
];

/**
 * An earlier or smaller role, rendered as a single compact row.
 *
 * These are not on the current résumé PDF, so they stay brief.
 */
export interface EarlierExperience {
  /** Stable key used for React list reconciliation. */
  readonly id: string;
  /** Employing organization. */
  readonly organization: string;
  /** Job title held at that organization. */
  readonly role: string;
  /** Display-formatted date or date range. */
  readonly period: string;
  /** One sentence on what the role involved. */
  readonly summary: string;
}

/** Earlier roles, most recent first. */
export const earlierExperiences: readonly EarlierExperience[] = [
  {
    id: 'disrupt',
    organization: 'Disrupt, Northeastern University',
    role: 'Software Engineer',
    period: 'Sep 2025 - May 2026',
    summary:
      'Contributed refactors, UI fixes, and features to a production React codebase with 5+ developers, and taught 150+ students across 8+ SQL and Python workshops.',
  },
  {
    id: 'the-cubicle',
    organization: 'TheCubicle.com',
    role: 'Software Developer, Senior Experience',
    period: 'Spring 2024',
    summary:
      "Built a sponsored Rubik's Cube solving and teaching app with 3D visualization in Python and PyGame, working directly with the company owner over 100+ hours of development.",
  },
];

/**
 * A portfolio project, rendered as a card with a screenshot.
 *
 * Invariant: `image` points at a file that exists in `public/`; a missing image
 * leaves a visible hole in the card grid.
 */
export interface Project {
  /** Stable key used for React list reconciliation. */
  readonly id: string;
  /** Project name as it appears on the résumé. */
  readonly title: string;
  /** Short descriptor shown beside the title, e.g. "Open-source guitar amp simulator". */
  readonly tagline: string;
  /** Display-formatted date or date range. */
  readonly period: string;
  /** One- or two-sentence framing of what the project is. */
  readonly summary: string;
  /** Technical accomplishment bullets, most impressive first. */
  readonly highlights: readonly string[];
  /** Technologies used, rendered as a quiet stack line. */
  readonly technologies: readonly string[];
  /** Site-root-relative path to the screenshot in `public/`. */
  readonly image: string;
  /** Alt text for the screenshot. */
  readonly imageAlt: string;
  /**
   * Which part of the screenshot to keep when the card crops it to its aspect
   * ratio: `top` for screenshots whose subject sits high, `center` otherwise.
   */
  readonly imageFocus: 'top' | 'center';
  /** Source repository, or `null` to omit the "Code" link. */
  readonly repoUrl: RepositoryUrl;
  /** Live site or download page, or `null` to omit the link. */
  readonly liveUrl: string | null;
  /** Site-root-relative path to an in-depth project page, or `null` if there is none. */
  readonly detailPath: string | null;
  /** Whether to render this project in the large, full-width card slot. */
  readonly isFeatured: boolean;
  /**
   * Who did what, printed as liner-note credits. Only set where the split of
   * work is known and stated in PRODUCT.md; omit rather than guess.
   */
  readonly credits?: readonly ProjectCredit[];
  /**
   * A typeset text panel shown in place of `image`, for projects whose best
   * picture is a terminal session rather than a screenshot. Always labeled
   * as an illustration in its caption.
   */
  readonly excerpt?: ProjectExcerpt;
}

/** A short terminal session, set as type. */
export interface ProjectExcerpt {
  /** Caption shown under the panel; must say it is an illustration. */
  readonly caption: string;
  /**
   * The session, one entry per line. Lines starting with "$ " or "> " are
   * commands (the prompt is styled separately); all others are output.
   */
  readonly lines: readonly string[];
}

/** One liner-note credit line: a role and who filled it. */
export interface ProjectCredit {
  /** What was done, e.g. "Design, direction, testing, listening". */
  readonly role: string;
  /** Who did it. */
  readonly who: string;
}

/**
 * Projects from the résumé, most recent first.
 *
 * Featured projects render as a full-width card; the rest render in a
 * two-column grid beneath.
 */
export const projects: readonly Project[] = [
  {
    id: 'bellydsp',
    title: 'BellyDSP',
    tagline: 'Open-source guitar amp simulator',
    period: 'Sep 2026 - Present',
    summary:
      'A guitar amp sim and multi-effects app I designed and released, free and open source for macOS and Windows. Neural amp models, a movable-mic cab, a full pedalboard drawn as real gear, zero added latency, and a tone matcher that dials in a sound from a song.',
    highlights: [
      'Built and released a free neural-network guitar amp simulator for macOS and Windows; wrote the original Rust implementation by hand, then designed the architecture for an AI-assisted C++20/JUCE port and now develop new features in C++ by hand.',
      'Enforced real-time safety with GitHub Actions CI tests that fail if the audio thread allocates memory or takes a lock, the two most common causes of audio dropouts.',
      "Diagnosed and fixed two performance bottlenecks: ran inference only for the selected amp, cutting CPU usage ~4x while keeping amp switches seamless, and replaced per-sample std::tanh with Eigen's vectorized tanh, doubling neural-network throughput.",
      "Built tone matching that isolates the guitar from a full mix with Demucs and fits the app's own gear to it; gated every change on a 50-song benchmark, reducing matching error 31%.",
    ],
    technologies: ['C++20', 'JUCE', 'Python', 'CMake', 'GitHub Actions'],
    image: bellyDspScreens.app.src,
    imageAlt: bellyDspScreens.app.alt,
    imageFocus: 'top',
    repoUrl: REPOSITORY_URLS.bellyDsp,
    liveUrl: 'https://bellydsp.com',
    detailPath: '/projects/bellydsp/',
    isFeatured: true,
    credits: [
      { role: 'Design and architecture', who: 'Sean Snaider' },
      { role: 'Rust original', who: 'Sean Snaider, by hand' },
      { role: 'C++20/JUCE port and UI', who: 'Mostly Claude Code agents, under his direction' },
      { role: 'Some C++ features', who: 'Sean Snaider, by hand' },
      { role: 'Interface direction, testing, listening', who: 'Sean Snaider' },
    ],
  },
  {
    id: 'guitar-learning-tool',
    title: 'Guitar Learning Tool',
    tagline: 'Chord detector and practice planner',
    period: 'Feb 2026',
    summary:
      'A browser app that listens to you play, names the chord, and plans what to practice next.',
    highlights: [
      'Built a browser-based chord detector using an FFT chromagram and benchmarked it on 180 real recordings from the public GuitarSet dataset, correctly identifying root and major/minor quality 73% of the time.',
      'Generated chord progressions and personalized practice plans through a FastAPI REST API backed by the Anthropic API, using structured outputs to constrain responses to typed schemas the app renders reliably.',
    ],
    technologies: ['React', 'TypeScript', 'FastAPI', 'SQLAlchemy', 'Anthropic API'],
    image: '/project-guitar.png',
    imageAlt: 'Screenshot of the Guitar Learning Tool',
    imageFocus: 'top',
    repoUrl: REPOSITORY_URLS.guitarLearningTool,
    liveUrl: null,
    detailPath: null,
    isFeatured: false,
  },
  {
    id: 'rubiks-cube-solver',
    title: "Rubik's Cube Solver",
    tagline: 'Full-stack solver and timer',
    period: 'Feb 2026',
    summary:
      'A web app that solves any scramble in 20 moves or fewer, with a 3D cube view and a competition-style timer.',
    highlights: [
      "Implemented Kociemba's two-phase algorithm from the original papers behind a FastAPI REST API, solving scrambles in 20 moves or fewer in under 1s in testing.",
      'Traced intermittent failed solves to a fixed-orientation assumption by testing scrambles on a physical cube, then normalized every state to a canonical orientation before solving.',
    ],
    technologies: ['Python', 'React', 'TypeScript', 'FastAPI', 'MongoDB'],
    image: '/project-cube.png',
    imageAlt: "Screenshot of the Rubik's Cube Solver web app",
    imageFocus: 'top',
    repoUrl: REPOSITORY_URLS.rubiksCubeSolver,
    liveUrl: null,
    detailPath: null,
    isFeatured: false,
  },
];

/**
 * A smaller project, rendered as a compact row with no screenshot.
 *
 * These are not on the current résumé PDF.
 */
export interface OtherProject {
  /** Stable key used for React list reconciliation. */
  readonly id: string;
  /** Project name. */
  readonly title: string;
  /** Display-formatted date or date range. */
  readonly period: string;
  /** One sentence on what it is and what was interesting about it. */
  readonly summary: string;
  /** Technologies used. */
  readonly technologies: readonly string[];
  /** Source repository, or `null` to omit the "Code" link. */
  readonly repoUrl: RepositoryUrl;
}

/** Other projects, most recent first. */
export const otherProjects: readonly OtherProject[] = [
  {
    id: 'systems-programming',
    title: 'Systems Programming',
    period: 'Fall 2025',
    summary:
      'Coursework in C: a FUSE filesystem driver over a disk image with bitmap block allocation, a first-fit free-list memory allocator, and a Unix shell with pipes and I/O redirection.',
    technologies: ['C', 'x86-64 Assembly', 'FUSE', 'Linux', 'GDB'],
    repoUrl: REPOSITORY_URLS.systemsProgramming,
  },
  {
    id: 'sanguine',
    title: 'Sanguine',
    period: 'Nov 2025 - Dec 2025',
    summary:
      'A turn-based strategy game in Java Swing with synchronized player views, AI strategies swappable at runtime, and 90%+ JUnit coverage.',
    technologies: ['Java', 'Java Swing', 'JUnit'],
    repoUrl: REPOSITORY_URLS.sanguine,
  },
];

/** A named grouping of related technologies, rendered as one row. */
export interface SkillCategory {
  /** Category heading, e.g. "Languages". */
  readonly title: string;
  /** Technology names in the category, ordered by proficiency or relevance. */
  readonly skills: readonly string[];
}

/**
 * Skills grouped to mirror the résumé's category structure so the two read the
 * same way side by side.
 */
export const skillCategories: readonly SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['Python', 'Java', 'C++', 'C', 'TypeScript', 'Rust', 'SQL'],
  },
  {
    title: 'Frameworks & Data',
    skills: ['JUCE', 'React', 'Next.js', 'FastAPI', 'SQLAlchemy', 'Prisma', 'PostgreSQL', 'MongoDB', 'Pandas', 'NumPy'],
  },
  {
    title: 'Tools & Infrastructure',
    skills: [
      'Git',
      'GitHub Actions (CI)',
      'Docker',
      'CMake',
      'Linux',
      'REST APIs',
      'Anthropic API (structured outputs, tool use)',
    ],
  },
];

/**
 * Paragraphs rendered in the About section.
 *
 * Kept as an array so the section can apply consistent spacing without the copy
 * carrying its own markup.
 */
export const aboutParagraphs: readonly string[] = [
  "I'm a Computer Science student at Northeastern University, concentrating in Software Engineering, and currently on co-op at Vertex Pharmaceuticals, where I built the tool that migrates thousands of contracts between systems instead of people doing it by hand. Most of what I enjoy building sits in the same place: taking a process somebody is tolerating and turning it into software they stop thinking about.",
  "That thread runs through my other work too. I'm one of six engineers on the app that replaced Northeastern SGA's spreadsheet-based attendance and voting, and I spent two semesters leading weekly labs for Khoury's intro CS courses in Python and Java.",
  "Away from the terminal, I play progressive and math rock guitar and have been speedcubing for over ten years (6.14s single). Both keep turning into projects. The latest is BellyDSP, a guitar amp simulator I designed and shipped because I wanted a tone I'd actually play through.",
];

/**
 * The availability note in the Contact section.
 *
 * Names a specific recruiting term on purpose; it reads far better to
 * recruiters than a generic statement. Update the term each cycle.
 */
export const availabilityNote =
  "I'm looking for Summer 2027 software engineering internships and co-ops. If you have a role, a question, or just want to talk shop, reach out.";
