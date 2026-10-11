/**
 * Content for the BellyDSP project page (`/projects/bellydsp/`).
 *
 * Kept separate from `portfolio.ts` because it is long-form copy, not résumé
 * data. The short card on the home page reads from `portfolio.projects`; this
 * file is the in-depth write-up behind it.
 *
 * Usage notes:
 *   - Numbers here come from BellyDSP's own measurements. They are more
 *     detailed than the résumé (e.g. 0.665 to 0.457 rather than "31%") but
 *     must agree with it.
 *   - `upcoming` describes work that is on GitHub but not yet in the release
 *     download. When the next version ships, fold it into `features` and
 *     `highlights` and delete the section rather than leaving it stale.
 */

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

/** A highlight with a headline figure, rendered as a metric card. */
export interface ProjectHighlight extends ProjectPoint {
  /** The headline figure, e.g. "0 / 0 / 0". */
  readonly figure: string;
  /** What the figure measures, shown under it. */
  readonly figureLabel: string;
}

/** A group of upcoming changes under one heading. */
export interface UpcomingGroup {
  /** Group heading, e.g. "Eight amps, one at a time". */
  readonly title: string;
  /** Optional lead paragraph shown before the list. */
  readonly lead: string | null;
  /** The changes, one sentence or short paragraph each. */
  readonly items: readonly string[];
  /** Optional closing paragraphs shown after the list. */
  readonly after: readonly string[];
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
    { label: 'Role', value: 'Designer and lead, built with AI coding agents (Claude Code)' },
    { label: 'Stack', value: 'C++20, JUCE 8, NeuralAmpModelerCore, Eigen, CMake, Python, GitHub Actions' },
    { label: 'Platforms', value: 'macOS and Windows, free under AGPL-3.0' },
    { label: 'Status', value: 'Released (v0.1.0), in active development' },
  ] satisfies readonly ProjectFact[],

  screenshot: {
    src: '/bellydsp-app.png',
    alt: 'The BellyDSP Amp page with the Comet amp head, its seven knobs, an output spectrum, and the signal chain along the bottom',
    caption: 'The Amp page in the upcoming version, with the Comet amp selected.',
  },

  overview: [
    'BellyDSP is a guitar amp simulator and multi-effects app. You plug a guitar into an audio interface and play through neural amp models, a cabinet with movable mics, pedals, and effects, with zero added latency.',
    "I play progressive and math rock and wanted a tool I'd actually use, so the bar was my own playing, not a demo.",
  ],

  features: [
    {
      title: 'Neural amps',
      body: "The amps are NAM captures (the open Neural Amp Modeler format), run by the official NAM engine. Each amp's Gain knob blends five captures across its range, so it changes how hard the amp distorts, not just how loud it is.",
    },
    {
      title: 'A full rig',
      body: 'A cab with two close mics and a room mic, noise gates, compressors, overdrive pedals modelled from their circuits, EQs, a key-aware harmonizer, chorus, delay, reverb, a tuner, presets with scenes, and MIDI footswitch control.',
    },
    {
      title: 'Match tone',
      body: "Load a song, pick a section where the lead guitar stands out, and BellyDSP separates the guitar from the mix, then searches its own amps, cab, and settings to get close to that recording. You can play along with the song first, so it compares your notes with the recording's.",
    },
    {
      title: 'Ships like a real product',
      body: 'Installers for both platforms, signed auto-updates, and a website that counts downloads without tracking anyone.',
    },
  ] satisfies readonly ProjectPoint[],

  highlights: [
    {
      figure: '0 / 0 / 0',
      figureLabel: 'allocations, frees, and locks on the audio thread',
      title: 'A hard real-time rule',
      body: 'The audio thread never allocates memory, takes a lock, or touches the disk. An automated test counts allocations, frees, and locks on the audio thread across every feature, and it has to read 0, 0, 0. The app adds zero latency.',
    },
    {
      figure: '~7,200',
      figureLabel: 'automated checks',
      title: 'Testing as proof',
      body: "Golden tests compare the DSP against Python reference implementations and against the NAM engine's own renderer. Nothing counts as done because it compiles.",
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
      body: "Profiling showed one math function taking half of each neural model's time. Vectorising it made the models twice as fast with output within -112 dB of the reference. Together with running only the amp you hear, that cut the default rig's CPU use by about 4x.",
    },
  ] satisfies readonly ProjectHighlight[],

  process: [
    "I designed BellyDSP and made the product and architecture calls, and I built it with Anthropic's Claude Code: most of the code was written by AI agents working under my direction, often several in parallel.",
    'My job was deciding what to build, setting the rules every change had to meet (real-time safety, zero latency, tests and measurements for every feature, held-out benchmarks for the matcher), reviewing the results, testing on real hardware on my Mac and a Windows PC, and doing all the listening. Learning to steer agents well with strict, measurable constraints was half the project.',
    'It went from first prototype to the current version in about two weeks: a hand-built Rust prototype, then a rebuild in C++20 on JUCE, about 100,000 lines of code and tests in all.',
  ],

  upcoming: {
    intro:
      "The next version is in development. Everything below is already on GitHub, but it isn't in the download yet. When it ships, BellyDSP updates itself, so there's nothing to reinstall.",
    image: {
      src: '/bellydsp-amps.png',
      alt: 'The eight built-in amps: Glass, Ember, Monolith, Lantern, Basalt, Comet, Forge, and Quartz, each with its own head',
    },
    groups: [
      {
        title: 'Eight amps, one at a time',
        lead: 'Five new built-in amps join Glass, Ember, and Monolith:',
        items: [
          'Lantern: power-amp breakup, from the edge of breakup to crunch. Pick softer and it cleans up.',
          'Basalt: fat high gain with sag.',
          'Comet: a saturated lead with the mids forward.',
          'Forge: tight modern high gain.',
          'Quartz: a saturated lead, scooped and bright.',
        ],
        after: [
          'Each has a head of its own. Pick an amp from the row of small heads at the top of the Amp page, and the head, the knobs, and the sound follow. Every amp remembers its own knob settings, and program changes 1 to 8 on a MIDI footswitch pick the amps. Your own .nam capture is a ninth choice.',
          "Only the amp you hear runs now. A switch keeps the old amp playing while the new one warms up, then crossfades, so it's click-free and lands about a tenth of a second later. Old presets and sessions convert on their own.",
        ],
      },
      {
        title: 'A closer Match tone',
        lead: 'Measured on a test set of 50 hidden rigs that BellyDSP has never seen the answers to:',
        items: [
          "After you play along, it compares your notes with the recording's one by one, so the way you pick doesn't get mistaken for the amp.",
          'Pedals and a compressor are part of the search, and Apply sets them.',
          'A match curve: a fine correction after the cab, which you can turn up or down on the Cab page.',
          'Clean up with your take: when the band bleeds into the guitar, it can use your notes to clean the recording before matching.',
        ],
        after: [],
      },
      {
        title: 'Lighter on slower computers',
        lead: null,
        items: [
          'The amp models run about twice as fast, with output within -112 dB of the reference engine.',
          'Together with running only one amp, the default rig uses about a quarter of the CPU it did.',
          "A CPU saver switch on the Output page, off by default, idles the drives you aren't using, runs them at lower oversampling, and steps the Gain knob between its captures, cutting the app's CPU by about a third to a half.",
        ],
        after: ['It still runs at 48 kHz with zero added latency.'],
      },
    ] satisfies readonly UpcomingGroup[],
  },
} as const;
