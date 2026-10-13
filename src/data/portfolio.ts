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
 *     the one-page PDF has no room for; they render in a compact style below
 *     the résumé items.
 *   - Ordering matters: every list renders in array order and is expected to be
 *     reverse-chronological (most recent first).
 *   - Dates are human-readable display strings, not parsed values. They are
 *     rendered verbatim.
 */

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
  text: 'BellyDSP v0.1.0 is out',
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
      'Building a Python tool to automate data migrations previously run by hand across multiple platforms and a legacy Microsoft Access workflow; projected by management to eliminate ~$100K in annual effort across business and IT teams.',
      'Designed the tool so semi-technical staff can reconfigure migrations themselves without code changes, driving field mappings from declarative Excel configuration with per-field overrides rather than hardcoded transformation logic.',
      'Added checks that migrated records are correct, not just present: value fidelity and referential integrity.',
    ],
    technologies: ['Python', 'Polars', 'Microsoft Access', 'Excel'],
  },
  {
    id: 'sga',
    organization: 'Student Government Association, Northeastern University',
    role: 'Software Engineer',
    location: 'Boston, Massachusetts',
    period: 'Feb 2026 - Present',
    isCurrent: true,
    highlights: [
      'Replaced spreadsheet-based attendance and voting workflows with a full-stack web application now used by 50+ SGA members across 20+ officer meetings per semester.',
      'Hardened vote handling for SGA executive officer elections by moving validation from the browser to the server with Next.js API routes, Prisma, and schema-checked requests, closing a class of data-integrity bugs.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Vercel'],
  },
  {
    id: 'khoury-ta',
    organization: 'Khoury College of Computer Sciences, Northeastern University',
    role: 'Teaching Assistant',
    location: 'Boston, Massachusetts',
    period: 'Sep 2025 - Apr 2026',
    isCurrent: false,
    highlights: [
      "Supported 850+ students across two of Khoury's largest intro CS courses through weekly debugging hours covering OOP, data structures, recursion, and control flow.",
      'Coached students on effective use of Claude Code and GitHub Copilot in lab sessions and one-on-one, covering how to scope tasks, supply relevant context, and iterate when generated output missed intent.',
    ],
    technologies: ['Java', 'Python', 'Claude Code', 'GitHub Copilot'],
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
      'A free guitar amp sim and multi-effects app for macOS and Windows, with neural amp models, zero added latency, and a tone matcher that learns a sound from a song.',
    highlights: [
      'Built and shipped a free guitar amp app for Mac and Windows: designed it, hand-built a Rust prototype, then directed parallel Claude Code agents to rebuild it in C++20, backed by ~7,200 automated tests.',
      'Enforced real-time reliability with tests proving the live audio path never allocates memory or waits on locks, the most common causes of audio dropouts.',
      'Made the app run on weaker computers by cutting CPU use about 4x, running only the selected amp and making its neural network code 2x faster, while keeping amp switches seamless.',
      "Built a feature that recreates a song's guitar tone with the app's own gear, separating the guitar from the mix with the Demucs AI model; a 50-case benchmark decided which improvements shipped, cutting matching error 31% (statistically significant, p < 0.0001).",
    ],
    technologies: ['C++20', 'JUCE', 'Python', 'CMake', 'GitHub Actions'],
    image: '/bellydsp-app.png',
    imageAlt: 'The BellyDSP Amp page with the Comet amp head, knobs, and an output spectrum',
    imageFocus: 'top',
    repoUrl: REPOSITORY_URLS.bellyDsp,
    liveUrl: 'https://bellydsp.com',
    detailPath: '/projects/bellydsp/',
    isFeatured: true,
    credits: [
      { role: 'Design, direction, testing, listening', who: 'Sean Snaider' },
      { role: 'Code', who: 'Claude Code agents, under his direction' },
    ],
  },
  {
    id: 'rubiks-cube-solver',
    title: "Rubik's Cube Solver",
    tagline: 'Full-stack solver and timer',
    period: 'Feb 2026',
    summary:
      'A web app that solves any scramble in 20 moves or fewer, with a 3D cube view and a competition-style timer.',
    highlights: [
      "Built a solver for any scramble (20 moves or fewer, under 1s), implementing Kociemba's two-phase algorithm from the papers.",
      'Traced intermittent failed solves to a fixed-orientation assumption by testing scrambles on a physical cube, then normalized every state to white top, green front before solving.',
      'Shipped it as a web app with a CSS 3D cube and a WCA-style timer, now used by 10+ peers for timed solves.',
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
  {
    id: 'systems-programming',
    title: 'Systems Programming',
    tagline: 'Coursework',
    period: 'Fall 2025',
    summary:
      'Operating-system building blocks in C, built to understand what actually happens beneath the runtime.',
    highlights: [
      'Built a FUSE filesystem driver over a disk image with bitmap block allocation.',
      'Wrote a first-fit free-list memory allocator and a Unix shell with pipes and I/O redirection.',
      'Read x86-64 assembly throughout to trace how compiled C maps to machine-level behavior.',
    ],
    technologies: ['C', 'x86-64 Assembly', 'FUSE', 'Linux', 'GDB'],
    image: '/project-filesystem.png',
    imageAlt: 'Illustration for the Systems Programming coursework',
    imageFocus: 'center',
    excerpt: {
      caption:
        'Illustration: a session in the shell, using pipes and redirection, then writing to the FUSE filesystem mounted from a disk image.',
      lines: [
        '$ ./shell',
        "> ls src | grep '\\.c$' | wc -l > count.txt",
        '> cat < count.txt',
        '3',
        '> ./fs mnt disk.img &',
        '> echo hello > mnt/note.txt',
        '> cat mnt/note.txt',
        'hello',
      ],
    },
    repoUrl: REPOSITORY_URLS.systemsProgramming,
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
    id: 'guitar-learning-tool',
    title: 'Guitar Learning Tool',
    period: 'Dec 2025 - Jan 2026',
    summary:
      'A practice app that detects played chords in real time with the Web Audio API and generates progressions from your practice history with the Anthropic API.',
    technologies: ['React', 'TypeScript', 'FastAPI', 'Anthropic API', 'Web Audio API'],
    repoUrl: REPOSITORY_URLS.guitarLearningTool,
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
    skills: ['Python', 'Java', 'TypeScript', 'JavaScript', 'C', 'SQL', 'Rust'],
  },
  {
    title: 'AI / LLM',
    skills: [
      'Anthropic API (structured outputs, tool use)',
      'Claude Code',
      'GitHub Copilot',
      'Agentic coding workflows',
    ],
  },
  {
    title: 'Frameworks & Data',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'FastAPI', 'Prisma', 'PostgreSQL', 'MongoDB', 'Pandas', 'NumPy', 'Polars'],
  },
  {
    title: 'Tools & Infrastructure',
    skills: ['Git', 'Docker', 'CMake', 'GitHub Actions', 'Linux/WSL', 'Vite', 'Vercel', 'GDB'],
  },
];

/**
 * Paragraphs rendered in the About section.
 *
 * Kept as an array so the section can apply consistent spacing without the copy
 * carrying its own markup.
 */
export const aboutParagraphs: readonly string[] = [
  "I'm a Computer Science student at Northeastern University, concentrating in Software Engineering, and currently on co-op at Vertex Pharmaceuticals, where I'm automating data migrations that used to be run by hand. Most of what I enjoy building sits in the same place: taking a process somebody is tolerating and turning it into software they stop thinking about.",
  "That thread runs through my other work too. I replaced Northeastern SGA's spreadsheet-based voting with a real application used in executive officer elections, and I spent two semesters as a TA for Khoury's largest intro CS courses, helping 850+ students debug their way through OOP and recursion and coaching them on how to get useful output from tools like Claude Code.",
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
