/**
 * Content for the BellyDSP project page (`/projects/bellydsp/`).
 *
 * Kept separate from `portfolio.ts` because it is long-form copy, not résumé
 * data. The short card on the home page reads from `portfolio.projects`; this
 * file is the in-depth write-up behind it.
 *
 * Source: Sean's BellyDSP_update/personal_site_ui_update.md (v0.3.0, the
 * redesigned interface). Screenshots come from `screens.ts`.
 *
 * Usage notes:
 *   - Numbers here come from BellyDSP's own measurements. They are more
 *     detailed than the résumé (e.g. 0.665 to 0.457 rather than "31%") but
 *     must agree with it.
 *   - Credits must stay honest (PRODUCT.md): the Rust original was written by
 *     hand; most of the C++ code, including the redesigned interface, was
 *     written by Claude Code agents under Sean's direction; Sean also writes
 *     some C++ features by hand.
 */

import { bellyDspScreens } from './screens';

/** A labelled fact in the page's at-a-glance strip. */
export interface ProjectFact {
  /** Short label, e.g. "Role". */
  readonly label: string;
  /** The value shown under the label. */
  readonly value: string;
}

/** A feature or highlight with a short heading and a paragraph of detail. */
export interface ProjectPoint {
  /** Short heading. */
  readonly title: string;
  /** One paragraph of detail. */
  readonly body: string;
}

/** A highlight with a figure, set inside its sentence on the page. */
export interface ProjectHighlight extends ProjectPoint {
  /** The figure, e.g. "0 / 0 / 0". */
  readonly figure: string;
  /** What the figure measures; follows the figure in the sentence. */
  readonly figureLabel: string;
}

/** Everything the BellyDSP page renders. */
export const bellyDsp = {
  title: 'BellyDSP',
  tagline: 'Open-source guitar amp simulator',
  period: 'Sep 2026 - Present',
  summary:
    'A free, open-source guitar amp sim and multi-effects app for macOS and Windows, with neural amp models, zero added latency, and a tone matcher that learns a sound from a song.',
  websiteUrl: 'https://bellydsp.com',
  downloadUrl: 'https://bellydsp.com/download/',
  sourceUrl: 'https://github.com/SeanSnaider/BellyDSP',

  facts: [
    { label: 'Role', value: 'Designer and lead; built with AI coding agents (Claude Code)' },
    { label: 'Stack', value: 'C++20, JUCE 8, NeuralAmpModelerCore, Eigen, CMake, Python, GitHub Actions' },
    { label: 'Platforms', value: 'macOS and Windows, free under AGPL-3.0' },
    { label: 'Status', value: 'Released (v0.3.0), in active development' },
  ] satisfies readonly ProjectFact[],

  screenshot: bellyDspScreens.app,

  overview: [
    "BellyDSP is a guitar amp simulator and multi-effects app. You plug a guitar into an audio interface and play through neural amp models, a cabinet with movable mics, pedals, and effects, with zero added latency. It's free, open source (AGPL-3.0), and runs on macOS and Windows.",
    "I play progressive and math rock and wanted a tool I'd actually use, so the bar was my own playing, not a demo.",
    'Version 0.2.0 brought the eight amps, a closer tone matcher, and a lighter engine. Version 0.3.0 is the redesigned interface below.',
  ],

  features: [
    {
      title: 'Neural amps',
      body: "Eight built-in amps, each with its own head, played one at a time. They're NAM captures (the open Neural Amp Modeler format), run by the official NAM engine. Each amp's Gain knob blends five captures across its range, so it changes how hard the amp distorts, not just how loud it is.",
    },
    {
      title: 'A full rig',
      body: 'A cab with two close mics and a room mic, noise gates, compressors, overdrive pedals modelled from their circuits, EQs, a key-aware harmonizer, chorus, delay, reverb, a tuner, presets with scenes, and MIDI footswitch control.',
    },
    {
      title: 'Match tone',
      body: "Load a song, pick a section where the lead guitar stands out, and BellyDSP separates the guitar from the mix, then searches its own amps, cab, pedals, and settings to get close to that recording. You can play along with the song first, so it compares your notes with the recording's.",
    },
    {
      title: 'Ships like a real product',
      body: 'Installers for both platforms, signed auto-updates, and a website that counts downloads without tracking anyone.',
    },
  ] satisfies readonly ProjectPoint[],

  redesign: {
    intro: [
      'The first interface was one page per section with the signal chain along the bottom. I play through BellyDSP about 90% of the time and dial tones the other 10%, so I wanted everything I need while playing on one screen, with nothing hidden.',
      'The redesign puts it all there:',
    ],
    onScreen: [
      'the preset and its scene, big in the top bar;',
      'the amp on a dark stage lit from below, with a shelf of eight small heads to switch amps;',
      'every control of the selected block in an inspector at the right;',
      'the eight scenes along the bottom.',
    ],
    afterList: 'One orange means on, and an off pedal is dimmed whole, so the rig reads from a step back.',
    heads: {
      image: bellyDspScreens.amps,
      text: 'Every amp has its own head and every effect is a pedal with a footswitch and an LED. All of it is drawn in code, with no photos or borrowed artwork.',
    },
    board: {
      image: bellyDspScreens.board,
      text: 'With every pedal on one board, the first version of the redesign looked cluttered. So the board became three tabs, Pre FX, Amp & Cab, and Post FX, each with a strip of tiny LEDs that shows what\'s on even when the tab is closed. You can switch tabs with the [ and ] keys, and selecting a block anywhere opens its tab. The tuner, Match tone, and Settings open over the main screen and close with Esc.',
    },
    credit:
      'I set what it had to do, picked the direction from the options I was shown, and made the calls along the way: three board tabs rather than the two Claude recommended, and an orange app icon to match. AI agents built it, and an automated design review checked every round of it against the brief before I saw it.',
  },

  highlights: [
    {
      figure: '0 / 0 / 0',
      figureLabel: 'allocations, frees, and locks on the audio thread',
      title: 'A hard real-time rule',
      body: 'The audio thread never allocates memory, takes a lock, or touches the disk. An automated test counts allocations, frees, and locks on the audio thread across every feature, and it has to read 0, 0, 0. The app adds zero latency.',
    },
    {
      figure: '8,945',
      figureLabel: 'automated checks passed in 469 tests in the latest full run',
      title: 'Testing as proof',
      body: "That includes golden tests that compare the DSP against Python reference implementations and against the NAM engine's own renderer, and about 1,100 checks on the main screen alone. The interface is tested too: the suite renders every screen and checks what it draws. Nothing counts as done because it compiles.",
    },
    {
      figure: '0.665 → 0.457',
      figureLabel: 'tone matcher error, better in 39 of 50 cases (p = 6.7e-8)',
      title: 'A measured tone matcher',
      body: 'I built a benchmark of 50 synthetic "hidden rigs", split into a development set and a held-out test set, and gated every change on it with paired statistical tests. The benchmark also rejected two of my own ideas, and those stayed out of the app.',
    },
    {
      figure: '21% → 6%',
      figureLabel: 'of the real-time budget for the default rig',
      title: 'Performance for weaker machines',
      body: "Profiling showed one math function taking half of each neural model's time. Vectorising it made the models twice as fast, with output within -112 dB of the reference. Together with running only the amp you hear, that cut the default rig's CPU use by about 4x.",
    },
  ] satisfies readonly ProjectHighlight[],

  process: {
    intro:
      "I designed BellyDSP and made the product, design, and architecture calls, and I built it with Anthropic's Claude Code. I wrote the original Rust implementation by hand. Most of the C++ code was written by AI agents working under my direction, often several in parallel, and I write some features in C++ by hand.",
    jobLead: 'My job was:',
    jobs: [
      'deciding what to build;',
      'setting the rules every change had to meet: real-time safety, zero latency, tests and measurements for every feature, and held-out benchmarks for the matcher;',
      "choosing the interface's direction;",
      'reviewing the results;',
      'testing on real hardware, on my Mac and a Windows PC;',
      'doing all the listening.',
    ],
    after: [
      'Learning to steer agents well with strict, measurable constraints was half the project.',
      'From first prototype to the redesign took about two and a half weeks (2026-09-27 to 2026-10-13): a Rust prototype first, then a rebuild in C++20 on JUCE. The C++ repo is about 109,000 lines: about 54,000 of app code, 36,000 of tests, and 17,000 of Python prototypes, benchmarks, and tools.',
    ],
  },
} as const;
