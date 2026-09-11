/**
 * Portfolio content: the single source of truth for every piece of résumé data
 * rendered on the site.
 *
 * All copy shown in the Hero, About, Experience, Projects, Skills, Contact and
 * Footer sections originates here so that updating the résumé means editing one
 * file rather than hunting through JSX. Components in `src/components` are
 * presentation-only and must not hardcode résumé facts.
 *
 * Usage notes:
 *   - Keep this file in sync with `public/Sean_Snaider_Resume.pdf`. If the two
 *     disagree, the PDF wins — recruiters cross-reference it.
 *   - Ordering matters: `experiences` and `projects` render in array order and
 *     are expected to be reverse-chronological (most recent first).
 *   - Dates are human-readable display strings, not parsed values. They are
 *     rendered verbatim.
 */

/** Where a project's source code lives, or `null` if the repo is not public. */
export type RepositoryUrl = string | null;

/**
 * Public GitHub repository URLs, collected here so they can be filled in or
 * corrected without touching the project entries below.
 *
 * A `null` value means the repo is not public yet; the corresponding project
 * card simply omits its "Code" link rather than rendering a broken one.
 *
 * TODO(sean): Add repository URLs for the systems programming coursework and
 * Sanguine if and when those repos are made public.
 */
const REPOSITORY_URLS = {
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
  /** Site-root-relative path to the downloadable résumé PDF. */
  readonly resumePath: string;
}

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
 * A single professional role.
 *
 * Invariant: `highlights` is never empty — a role with nothing to say about it
 * should be omitted from the site entirely rather than rendered bare.
 */
export interface Experience {
  /** Stable key used for React list reconciliation and anchor ids. */
  readonly id: string;
  /** Employing organization. */
  readonly organization: string;
  /** Job title held at that organization. */
  readonly role: string;
  /** Work location. */
  readonly location: string;
  /** Display-formatted date range, e.g. "Jul 2026 - Dec 2026". */
  readonly period: string;
  /** Whether this role is ongoing; drives the "Current" badge. */
  readonly isCurrent: boolean;
  /** Accomplishment bullets, most significant first. */
  readonly highlights: readonly string[];
  /** Technologies used in the role, rendered as chips. */
  readonly technologies: readonly string[];
}

/**
 * Professional experience in reverse-chronological order.
 *
 * Mostly sourced in substance from the résumé, with wording lightly adapted for
 * the web (shorter sentences, no line-break hyphenation).
 *
 * Two things here intentionally go beyond the current résumé PDF:
 *   - The Vertex Electron/Azure bullet, which is in-flight work.
 *   - The TheCubicle.com entry, which predates the résumé's coverage.
 * Fold both into the PDF the next time it is revised so the two stay aligned.
 */
export const experiences: readonly Experience[] = [
  {
    id: 'vertex',
    organization: 'Vertex Pharmaceuticals',
    role: 'G&A Architecture and Strategy Co-op',
    location: 'Boston, Massachusetts',
    period: 'Jul 2026 - Dec 2026',
    isCurrent: true,
    highlights: [
      'Building a Python tool to automate data migrations previously run by hand across multiple platforms and a legacy Microsoft Access workflow; projected by management to eliminate roughly $100K in annual effort across business and IT teams.',
      'Designed the tool so non-technical staff can reconfigure migrations themselves without code changes, driving field mappings from declarative Excel configuration with per-field overrides rather than hardcoded transformation logic.',
      'Building a native desktop application in Electron and TypeScript to front the migration tooling, planned for internal deployment on Azure.',
    ],
    technologies: ['Python', 'Polars', 'Electron', 'TypeScript', 'Azure', 'Microsoft Access'],
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
      'Moved vote validation from the browser to the server using Next.js API routes, Prisma, and schema-based request validation, closing a class of data-integrity bugs; deployed in production for SGA executive officer elections.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Vercel'],
  },
  {
    id: 'khoury-ta',
    organization: 'Khoury College of Computer Sciences, Northeastern University',
    role: "TA for Program Design and Implementation 1 (Fall '25) & 2 (Spring '26)",
    location: 'Boston, Massachusetts',
    period: 'Sep 2025 - Apr 2026',
    isCurrent: false,
    highlights: [
      "Supported 850+ students across two of Khoury's largest intro CS courses through weekly debugging hours covering OOP, data structures, recursion, and control flow.",
      'Coached students on effective use of Claude Code and GitHub Copilot in lab sessions and one-on-one, covering how to scope tasks, supply relevant context, and iterate when generated output missed intent.',
    ],
    technologies: ['Java', 'Python', 'Claude Code', 'GitHub Copilot'],
  },
  {
    id: 'disrupt',
    organization: 'Disrupt, Northeastern University',
    role: 'Software Engineer',
    location: 'Boston, Massachusetts',
    period: 'Sep 2025 - May 2026',
    isCurrent: false,
    highlights: [
      'Contributed component refactors, UI fixes, and feature work to a production codebase alongside a team of 5+ developers.',
      'Taught 150+ students across 8+ recurring SQL and Python workshops, covering query optimization and joins.',
    ],
    technologies: ['React', 'TypeScript', 'SQL', 'Python'],
  },
  {
    id: 'the-cubicle',
    organization: 'TheCubicle.com',
    role: 'Software Developer - Senior Experience',
    location: 'Remote',
    period: 'Spring 2024',
    isCurrent: false,
    highlights: [
      "Developed a Rubik's Cube solving application with 3D visualization in Python and PyGame, sponsored by TheCubicle.com.",
      'Worked directly with the company owner through iterative feedback cycles, gathering requirements and implementing feature requests across 100+ hours of development.',
      'Built an interactive tool that taught users to solve the puzzle, receiving positive feedback from peers who found it more intuitive than existing learning methods.',
    ],
    technologies: ['Python', 'PyGame'],
  },
];

/**
 * A portfolio project.
 *
 * Invariant: `image` points at a file that exists in `public/`; a missing image
 * leaves a visible hole in the card grid.
 */
export interface Project {
  /** Stable key used for React list reconciliation. */
  readonly id: string;
  /** Project name as it appears on the résumé. */
  readonly title: string;
  /** Display-formatted date or date range. */
  readonly period: string;
  /** One- or two-sentence framing of what the project is. */
  readonly summary: string;
  /** Technical accomplishment bullets, most impressive first. */
  readonly highlights: readonly string[];
  /** Technologies used, rendered as chips. */
  readonly technologies: readonly string[];
  /** Site-root-relative path to the screenshot in `public/`. */
  readonly image: string;
  /** Source repository, or `null` to omit the "Code" link. */
  readonly repoUrl: RepositoryUrl;
  /** Live deployment, or `null` to omit the "Live" link. */
  readonly liveUrl: string | null;
  /** Whether to render this project in the larger, full-width card slot. */
  readonly isFeatured: boolean;
}

/**
 * Projects in reverse-chronological order of completion.
 *
 * The first two are marked featured and render as wide cards; the remainder
 * render in a two-column grid beneath them.
 */
export const projects: readonly Project[] = [
  {
    id: 'guitar-learning-tool',
    title: 'Guitar Learning Tool',
    period: 'Dec 2025 - Jan 2026',
    summary:
      'A browser-based practice companion that listens to you play, identifies the chord in real time, and generates progressions tailored to what you have actually been practicing.',
    highlights: [
      'Built chord detection with the Web Audio API, analyzing microphone input in the frequency domain to identify played chords in real time, wrapped in a practice-tracking app with a gamified scale-mastery progression.',
      'Integrated the Anthropic API to generate personalized chord progressions, augmenting the system prompt with structured practice history as a lightweight alternative to RAG.',
      'Covered the backend with a 50-test async pytest suite and shipped continuously to Vercel on every commit.',
    ],
    technologies: [
      'React',
      'TypeScript',
      'FastAPI',
      'Anthropic API',
      'Web Audio API',
      'Zustand',
      'pytest',
    ],
    image: '/project-guitar.png',
    repoUrl: REPOSITORY_URLS.guitarLearningTool,
    liveUrl: null,
    isFeatured: true,
  },
  {
    id: 'rubiks-cube-solver',
    title: "Rubik's Cube Solver and Teaching Tool",
    period: 'Oct 2025 - Feb 2026',
    summary:
      'A full-stack solver, teaching mode, and competition timer for the Rubik\'s Cube, built by a sub-7-second cuber who wanted the tool he wishes he had learned on.',
    highlights: [
      "Reverse-engineered undocumented orientation requirements in Kociemba's two-phase algorithm to produce sub-20-move solutions in under a second.",
      'Deployed as a full-stack app with a CSS 3D cube renderer and a WCA-style inspection timer, now used as a competitive solve timer by 10+ peers.',
      'Designed a staged teaching mode (cross, corners, second layer, top face) that gates progression until each step is completed correctly, with solve statistics (ao5, ao12, ao100) persisted in MongoDB.',
    ],
    technologies: ['Python', 'React', 'TypeScript', 'FastAPI', 'MongoDB'],
    image: '/project-cube.png',
    repoUrl: REPOSITORY_URLS.rubiksCubeSolver,
    liveUrl: null,
    isFeatured: true,
  },
  {
    id: 'systems-programming',
    title: 'Systems Programming',
    period: 'Fall 2025',
    summary:
      'A set of low-level C projects built to understand what actually happens beneath the runtime: a filesystem, an allocator, and a shell.',
    highlights: [
      'Implemented a FUSE filesystem driver in C supporting standard file and directory operations over a disk image, with block allocation tracked by a hand-built bitmap.',
      'Built a dynamic memory allocator using a linked-list free list with first-fit allocation, and a Unix shell supporting piping and I/O redirection.',
      'Used x86-64 assembly throughout to trace how compiled C maps to machine-level behavior.',
    ],
    technologies: ['C', 'x86-64 Assembly', 'FUSE', 'Linux', 'GDB'],
    image: '/project-filesystem.png',
    repoUrl: REPOSITORY_URLS.systemsProgramming,
    liveUrl: null,
    isFeatured: false,
  },
  {
    id: 'sanguine',
    title: 'Sanguine',
    period: 'Nov 2025 - Dec 2025',
    summary:
      'A turn-based strategy game in Java built as an exercise in clean object-oriented design and thorough testing.',
    highlights: [
      'Built a Java Swing UI using a publish-subscribe pattern to keep multiple player views synchronized against a single game model.',
      'Designed pluggable AI strategies selectable at runtime, letting difficulty levels be swapped without touching game logic.',
      'Achieved 90%+ code coverage with a JUnit test suite.',
    ],
    technologies: ['Java', 'Java Swing', 'JUnit'],
    image: '/project-sanguine.png',
    repoUrl: REPOSITORY_URLS.sanguine,
    liveUrl: null,
    isFeatured: false,
  },
];

/** A named grouping of related technologies, rendered as one row of chips. */
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
    skills: ['Python', 'Java', 'TypeScript', 'JavaScript', 'C', 'SQL', 'x86-64 Assembly'],
  },
  {
    title: 'AI / LLM',
    skills: ['Anthropic API', 'Structured Outputs', 'Tool Use', 'Prompt Engineering'],
  },
  {
    title: 'AI Development Tools',
    skills: ['Claude Code', 'GitHub Copilot', 'Agentic Coding Workflows'],
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Zustand', 'Web Audio API'],
  },
  {
    title: 'Backend & Data',
    skills: ['FastAPI', 'Prisma', 'PostgreSQL', 'MongoDB', 'Pandas', 'NumPy', 'Polars', 'pytest', 'JUnit'],
  },
  {
    title: 'Tools & Infrastructure',
    skills: ['Git', 'Docker', 'Linux/WSL', 'Vite', 'Vercel', 'GDB', 'Neovim'],
  },
];

/**
 * Headline metrics surfaced beneath the hero.
 *
 * These are deliberately few and concrete; each one is traceable to a specific
 * résumé bullet.
 */
export interface Statistic {
  /** The number or short value, e.g. "850+". */
  readonly value: string;
  /** What the value counts, e.g. "Students supported as a TA". */
  readonly label: string;
}

/** At-a-glance numbers rendered as a strip under the hero. */
export const statistics: readonly Statistic[] = [
  { value: '850+', label: 'Students supported as a TA' },
  { value: '3.89', label: 'GPA at Northeastern' },
  { value: '~$100K', label: 'Projected annual effort saved at Vertex' },
  { value: '50+', label: 'SGA members using tools I built' },
];

/**
 * Rotating phrases for the hero's typing animation.
 *
 * Each line should stand alone as a complete self-description, since the
 * animation can be paused on any one of them.
 */
export const heroTaglines: readonly string[] = [
  'CS & Software Engineering @ Northeastern University',
  'Software Engineering Co-op @ Vertex Pharmaceuticals',
  'Building full-stack tools with React, FastAPI, and the Anthropic API',
  'Speedcuber, progressive guitarist, systems tinkerer',
];

/**
 * Paragraphs rendered in the About section.
 *
 * Kept as an array so the section can apply consistent spacing without the copy
 * carrying its own markup.
 */
export const aboutParagraphs: readonly string[] = [
  "I'm a Computer Science and Software Engineering student at Northeastern University, currently on co-op at Vertex Pharmaceuticals, where I'm automating data migrations that used to be run by hand. Most of what I enjoy building sits in the same place: taking a process somebody is tolerating and turning it into software they stop thinking about.",
  "That thread runs through my other work too. I replaced Northeastern SGA's spreadsheet-based voting with a real application used in executive officer elections, and I spent two semesters as a TA for Khoury's largest intro CS courses, helping 850+ students debug their way through OOP and recursion, and coaching them on how to actually get useful output from tools like Claude Code.",
  "Away from the terminal, I'm a progressive guitarist and a speedcuber with sub-7-second solves. Both have a way of ending up as projects, which is how I found myself writing real-time chord detection and reverse-engineering a cube-solving algorithm in the same year.",
];
