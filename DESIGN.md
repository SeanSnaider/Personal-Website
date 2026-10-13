---
name: Sean Snaider
description: Sean's work pressed as a record, with a sleeve, a vinyl, a tracklist, and liner-note credits that say exactly who played what.
colors:
  board: "#15181d"
  board-raised: "#1c2027"
  groove: "#0b0c0e"
  ink: "#e8e5de"
  ink-soft: "#bdb8ae"
  slate: "#808a97"
  label: "#d24a2b"
  label-text: "#e8664a"
  label-deep: "#b23a20"
  rule: "rgb(232 229 222 / 0.12)"
  rule-strong: "rgb(232 229 222 / 0.28)"
typography:
  display:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontVariation: "\"wdth\" 125"
  headline:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 125"
  track-code:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 125"
  title:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
    fontVariation: "\"wdth\" 125"
  title-sm:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.5
    fontVariation: "\"wdth\" 112"
  lead:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.625
  fine-print:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: "0.14em"
    fontVariation: "\"wdth\" 125"
  button:
    fontFamily: "Archivo Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1
    fontVariation: "\"wdth\" 112"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "12": "48px"
  "16": "64px"
  "28": "112px"
  "36": "144px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.board}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "#ffffff"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  nav-resume:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.board}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "36px"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
  nav-bar:
    backgroundColor: "{colors.board}"
    textColor: "{colors.ink-soft}"
    height: "56px"
  track-row:
    textColor: "{colors.ink}"
    typography: "{typography.title-sm}"
    padding: "8px 0"
  track-code-small:
    textColor: "{colors.label-text}"
    typography: "{typography.label}"
  print-frame:
    backgroundColor: "{colors.board-raised}"
    rounded: "{rounded.none}"
    padding: "12px"
  excerpt-panel:
    backgroundColor: "{colors.groove}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.none}"
    padding: "24px 28px"
  sticker:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.board}"
    rounded: "{rounded.full}"
---

# Design System: Sean Snaider

## Overview

**Creative North Star: "Liner Notes"**

Sean's work pressed as a record: the sleeve, the vinyl, the tracklist, and liner-note credits that say exactly who played what. The page is a matte blue-black sleeve board with a faint grain, printed in off-white sleeve ink, with one label red and slate fine print. The record is an actual object in the first viewport: a square sleeve with a two-ink halftone cover cropped from the real BellyDSP amp, a black vinyl slid half out of it with visible track gaps and a red center label, and a tonearm that swings to whichever track is cued. Below it the site reads like the inside of a 2000s math rock or emo LP: Side A is projects, Side B is experience, then the liner notes, the instruments, and the booking line.

Density is editorial and confident. Rank comes from type size alone: one family, Archivo, in two widths (expanded and heavy for titles, track codes, and labels; normal width for everything you read). Sections open on a heavy ink rule, lists sit on hairline printed rules, and recording details are set as label and value pairs the way a sleeve credits its personnel. Figures sit inside sentences instead of being blown up into metric tiles. The honest credit line is part of the visual system: every track and the footer say who did what, in small slate type.

This world replaced two earlier looks that are now explicit anti-references: the "Studio Rack" system (near-black with one glowing Signal Green accent, Inter plus JetBrains Mono, a scrolling waveform divider) and the earlier violet WebGL design. Generic portfolio templates, gimmicky effects, and the near-black plus neon accent look are all wrong for this site.

**Key Characteristics:**
- A record as the first viewport: sleeve, vinyl, tonearm, and a tracklist that is the page's real navigation.
- One family in two widths: Archivo expanded and heavy for titles and codes, normal width for reading.
- Sleeve board, sleeve ink, one label red, slate fine print; a static grain over everything.
- Square-cornered type and frames; only the physical round objects are round.
- Ruled lists and label and value credits instead of cards, bullets, or metric tiles.
- Track codes (A1, B2) are the only numbering, because they carry sequence.
- Photos in full color; the halftone belongs to the sleeve cover alone.
- One authored entrance (the record slides out) and one ambient motion (the label turns while a track is cued), both dropped under reduced motion.

## Colors

A printed two-ink job on dark card stock: cool blue-black board, warm off-white ink, and a single label red, with slate for the fine print.

### Primary
- **Label Red** (`label`): the record's own marks at large or graphic size. The big track codes on each spread and on the case-study header, the vinyl's center label, the halftone cover's first ink, the stylus tip, the die-cut label on the case study's inner sleeve, text selection, link underlines, and the caret. Its contrast on the board is 4.0:1, so it never carries small text.
- **Label Red, Small Type** (`label-text`): the same red lifted for small text on the board (5.4:1). Tracklist codes, bonus-track codes, the "Now playing" code in the nav, and shell prompts in the excerpt panel.
- **Label Red, Deep** (`label-deep`): the red for small text printed on sleeve ink (4.8:1). Used on the hype sticker's tag.

### Neutral
- **Sleeve Board** (`board`): the page ground and the nav bar background. A matte blue-black, never pure black.
- **Raised Board** (`board-raised`): the mat behind photos and the shell excerpt, the sleeve's ground under the halftone, the platter, and the case study's inner-sleeve panel.
- **Groove Black** (`groove`): the vinyl itself and the shell excerpt's page. The darkest step, reserved for the record and typeset terminal output.
- **Sleeve Ink** (`ink`): headings, titles, track names, values in credits, the primary button fill, the heavy section rules, the sticker, and the halftone's second ink.
- **Soft Ink** (`ink-soft`): body paragraphs, subtitles, nav links at rest, and note-list lines.
- **Slate** (`slate`): fine print. Dates and years, credit labels, side names beside "Side A", captions, the catalog number in the nav, the footer, and the runout line.
- **Printed Rule** (`rule`): hairline rules under every list row, credit row, and track spread. Ink at 12%.
- **Strong Rule** (`rule-strong`): the secondary button outline, the resting underline on text links, and the scrollbar thumb. Ink at 28%.

### Named Rules
**The One Red Rule.** Label red is the only chromatic color in the system, and it marks the record's own things: track codes, the center label, the cover ink, and underlines on what you can play. It is never a glow, a background wash, or a second accent beside another hue.

**The Red by Size Rule.** Pick the red by what it sits on and how big it is: `label` for large codes and graphic shapes, `label-text` for small type on the board, `label-deep` for small type on sleeve ink. Small text in `label` on the board fails contrast and is not allowed.

## Typography

**Display Font:** Archivo Variable at 125% width (with ui-sans-serif, system-ui fallbacks)
**Body Font:** Archivo Variable at 100% width
**Label/Mono Font:** Archivo Variable at 125% width for labels; the platform monospace stack appears only inside the shell excerpt.

**Character:** One self-hosted family used the way a label uses its house type: wide and extra-bold for titles, codes, and sleeve set type; a semi-expanded step for buttons, track titles, and small titles; plain width for every sentence. The width axis does the work a second typeface would do elsewhere.

### Hierarchy
- **Display** (800, 125% width, `clamp(3rem, 8vw, 6rem)`, line-height 1, tracking -0.035em): the "Side A" and "Side B" headings, with the side name beside them in normal-width 500 Soft Ink. The case-study title runs one step larger (`clamp(3rem, 8vw, 6.5rem)`, line-height 0.92, tracking -0.04em). The hero name is smaller (`clamp(2.5rem, 4.4vw, 3.75rem)`, line-height 0.95, tracking -0.03em) so the record leads.
- **Headline** (800, 125% width, `clamp(2.25rem, 5vw, 3.75rem)`, line-height 1, tracking -0.03em): non-side section headings (Liner notes, Instruments, Booking). Case-study notes sections use `clamp(1.875rem, 3.6vw, 3rem)`.
- **Track Code** (800, 125% width, `clamp(2.5rem, 5vw, 4rem)`, label red): the large code that opens each track spread, the only numeral used as a heading device.
- **Title** (800, 125% width, `clamp(1.75rem, 3vw, 2.5rem)`, line-height 1.05): track titles on spreads. Small titles (track names in the tracklist, bonus tracks, feature terms) use 600 to 700 at 112% width, 17px to 20px.
- **Lead** (400, `clamp(1.125rem, 1.6vw, 1.375rem)`, line-height 1.5, Ink): the first sentence of a spread or the case study, capped at 40rem.
- **Body** (400, 17px, line-height 1.625, Soft Ink): essays and intros, capped between 34rem and 46rem. The liner-notes essay runs in two columns from 768px.
- **Body small** (400, 15px to 16px): note-list lines, credit values, bonus-track summaries.
- **Fine print** (400, 14px, Slate): captions, dates, side names, footer credits.
- **Label** (700 to 800, 125% width, 12px to 15px, uppercase, tracking 0.12em to 0.2em): sleeve set type, side letters in the tracklist, catalog numbers, the sticker tag, the runout line, and instrument names (112% width, 0.08em). Small track codes use the same face without uppercase tracking.

### Named Rules
**The Two Widths Rule.** Expanded is for things you scan (titles, codes, labels); normal width is for things you read. If a run is a sentence, it is set at 100% width.

**The Rank by Size Rule.** Hierarchy comes from type size and width, not from boxes, colors, or ornaments. Figures sit inside sentences, set in semi-expanded bold Ink at body size; they are never pulled out as oversized numbers over a caption.

**The Track Code Rule.** Track codes (A1 to A3, B1 to B3, then bonus tracks numbered on from them) are the only numbering in the system, because they carry the record's sequence. Sections do not get numerals.

## Layout

Everything sits in one sleeve width: a 1312px container with 16px gutters on mobile and 32px from 640px. The nav, hero, sides, liner notes, case study, and footer share the same edges.

- **First viewport:** from 1024px the hero is two columns in a 780 to 500 ratio, the record left and the back cover (name, role, intro, actions, tracklist) right, vertically centered. Below 1024px the record stacks above the back cover and runs 8% to 15% wider than the screen so the vinyl leaves the right edge. The record stage keeps a 780 by 600 aspect ratio and positions every part in percentages.
- **Sections:** separated by 112px (144px from 1024px). Each opens with a 2px Sleeve Ink rule and 24px of space before the heading.
- **Track spreads:** from 1024px a 5 to 7 column split with a 64px gap: code, title, subtitle, and credits left; lead, image or excerpt, note list, and actions right. Spreads are divided by hairlines with 48px (64px from 1024px) of vertical padding.
- **Credits:** label and value grids with a fixed label column (6.5rem to 8.5rem) and a 16px gap.
- **Personnel lists:** Instruments and case-study feature lists use a 4 to 8 split from 768px with a 64px gap, one hairline row each.
- **Rhythm:** a 4px base (4, 8, 12, 16, 20, 24, 32, 48, 64). Inside a block 8px to 32px, between blocks in a section 32px to 64px, between sections 112px to 144px.

### Named Rules
**The Ruled List Rule.** Lists are printed on rules, not boxed or bulleted: each line gets its own hairline. There are no card grids anywhere.

## Elevation & Depth

The system is flat print. UI elements (buttons, links, lists, frames, the nav) never cast shadows; depth comes from the three board steps (Groove Black under Sleeve Board under Raised Board) and from printed rules. Shadows exist only under physical objects that would cast one on a turntable: the sleeve and the sticker on it, and the vinyl and sleeve on the link-preview cards. A fixed fractal-noise grain (6% opacity, overlay blend) covers the whole page so large dark areas read as card stock. A faint ring-wear circle is printed on the sleeve cover.

### Shadow Vocabulary
- **Sleeve drop** (`box-shadow: 0 28px 60px -24px rgb(0 0 0 / 0.8)`): under the square sleeve in the hero.
- **Sticker lift** (`box-shadow: 0 6px 14px -6px rgb(0 0 0 / 0.6)`): under the round hype sticker on the sleeve.

### Named Rules
**The Objects Cast Shadows Rule.** Only things that exist on a turntable cast shadows: the sleeve, the sticker, the record. Interface elements stay flat, and hover never lifts them.

## Shapes

Square type, round objects. Buttons, image mats, the excerpt panel, the inner-sleeve panel, and the sleeve itself are square-cornered (0px). Circles appear only where the real object is round: the vinyl and its grooves, the center label, the platter, the tonearm pivot, the shrink-wrap sticker, and the die-cut label hole on the case study's inner sleeve. Rules are 1px hairlines inside a section and 2px Sleeve Ink at the top of one. Focus outlines take a 2px corner so they read as a printer's mark rather than a pill.

Imagery follows the same honesty. Project photos and the portrait are shown in full color on a Raised Board mat (8px, 12px from 640px). The two-ink halftone (Label Red dots for tone, Sleeve Ink dots on the offset grid for highlights, a 14% tone floor so shadows never print as voids) is reserved for the sleeve cover. Where a project has no honest picture, it gets a typeset illustration labeled as one in its caption, not a stock graphic.

### Named Rules
**The Square Type, Round Objects Rule.** Interface shapes are square. Only the record's own round parts are round, and a rounded rectangle never appears.

## Components

### Buttons
Buttons are printed like sleeve type: square, 112% width, bold, no shadow.
- **Shape:** square (0px), 44px tall, 20px horizontal padding, 15px 700.
- **Primary:** a Sleeve Ink fill with Sleeve Board text. One per group: Résumé (PDF) in the hero, "Read the full liner notes" on a spread, Download on the case study.
- **Primary hover:** the fill brightens to white over 200ms. Nothing moves.
- **Secondary:** transparent with a 1px Strong Rule outline and Ink text; on hover the outline becomes full Sleeve Ink.
- **Nav Résumé:** a compact primary, 36px tall with 16px padding at 14px.
- **Focus:** a 2px Sleeve Ink outline offset 3px, on every interactive element.

### Text Links
- Semi-expanded 600 Ink at 15px, underlined in Strong Rule with a 5px offset. On hover the underline turns Label Red. External links carry a screen-reader "(opens in a new tab)" and no icon.
- The booking email is a large expanded link (`clamp(1.375rem, 2.5vw, 2.25rem)`, 800) with a 2px Label Red underline at an 8px offset; it brightens to white on hover.

### Navigation
- **Layout:** a fixed 56px bar on Sleeve Board in the sleeve width. Left: the name in 15px expanded 800 Ink and the catalog number in 12px expanded 700 Slate, tracked 0.16em. Right: Side A, Side B, Liner notes, Booking in 14px Soft Ink (from 1024px), then the Résumé button.
- **Hover:** links turn Ink with a Label Red underline at a 6px offset.
- **Scrolled:** past 8px the bar gains a hairline bottom rule.
- **Now playing:** from 1280px the center reads "Now playing", the cued track's code in Label Red Small Type, and its title in Ink, fading in over 300ms as each track's section crosses a band just above center.
- **Mobile:** only the name and Résumé remain.

### Tracklist
The back cover's tracklist is the page's working table of contents. Each side opens on a hairline row with "SIDE A" in expanded 800 uppercase Ink (tracked 0.14em) and the side name in Slate. Each track is a three-column row (2.75rem code, title, year) on a hairline: code in Label Red Small Type, title in 17px semi-expanded 600 Ink with a subtitle in Slate beside it when it fits, year in tabular Slate. Hovering or focusing a row underlines the title in 2px Label Red, lights that track's band on the vinyl, and swings the tonearm to it; choosing it jumps to the spread.

### Track Spread
One résumé item. The large Label Red code, then the title, a Soft Ink subtitle, and a credits list (label in Slate, value in Ink) on the left; a lead sentence, a matted image or shell excerpt, a note list, and actions on the right. Credits state plainly who built what. Bonus tracks follow each side as compact ruled rows numbered on from the main tracks.

### Note List
Accomplishment lines, each on its own hairline with 12px vertical padding, 16px Soft Ink, relaxed leading. No bullets.

### Shell Excerpt
A typeset terminal session in the frame a photo would use: a Raised Board mat around a Groove Black page, the platform monospace at 13px (15px from 640px) with 1.75 leading. Prompts in Label Red Small Type, commands in Ink, output in Soft Ink, wrapped lines hang-indented by 2ch. The caption names it an illustration.

### The Record (signature)
A 780 by 600 stage of three stacked SVG layers over the sleeve: a static platter, the vinyl (the only layer that moves), and a tonearm on top (hidden below 768px). The vinyl has fine grooves, a lighter 4-unit gap between tracks, one band per track sized by its weight, a Label Red center label set in expanded type around the edge, and a soft sheen. On load the vinyl slides out of the sleeve once (1.4s, `cubic-bezier(0.16, 1, 0.3, 1)`, 0.25s delay); while a track is cued the label turns at 9s per revolution. Under reduced motion both stop and the record rests half out.

### Sleeve and Sticker
The square sleeve carries the halftone cover, a ring-wear circle, the name in tracked expanded caps top-left, "Selected Works" in expanded 800 bottom-left, and the catalog number bottom-right. A round Sleeve Ink sticker sits on the shrink-wrap at -9deg pointing at the newest release, its tag in Label Red Deep; on hover it straightens to -4deg and scales to 1.04.

### Inner Sleeve and Runout
On the case study, the closing highlights sit on a Raised Board panel with a Sleeve Board die-cut circle at its corner showing a Label Red label with the track code. The page signs off with a runout matrix line (catalog number, track code, title, year) in 12px expanded uppercase Slate tracked 0.3em.

### Footer
The sleeve's fine print: a hairline, the catalog number in expanded Ink, the copyright and an honest credit line for the site in 14px Slate, and a decorative barcode generated from the catalog number (Sleeve Ink field, Sleeve Board bars).

## Do's and Don'ts

### Do:
- **Do** pick the red by size and ground: `label` for large codes and graphic shapes, `label-text` for small text on the board, `label-deep` for small text on sleeve ink.
- **Do** set titles, codes, and labels in Archivo at 125% width and 800, and every sentence at 100% width.
- **Do** rank content by type size and set figures inside sentences in semi-expanded bold Ink.
- **Do** print lists and credits on 1px rules (ink at 12%) and open sections with a 2px Sleeve Ink rule.
- **Do** show project photos and the portrait in full color on a Raised Board mat; keep the two-ink halftone for the sleeve cover.
- **Do** label a typeset stand-in (like the shell excerpt) as an illustration in its caption.
- **Do** credit honestly in the credits pattern: who designed, who built, and which tools helped, in Slate fine print.
- **Do** keep every motion skippable: under reduced motion the record rests half out and the label stops.

### Don't:
- **Don't** build card grids, big-number metric tiles, or section numerals; track codes are the only numbering.
- **Don't** use small text in `label` (#d24a2b) on the board; it is 4.0:1.
- **Don't** round interface corners; only the record's own round parts are round.
- **Don't** put shadows or hover lifts on interface elements; only the sleeve, sticker, and record cast shadows.
- **Don't** grayscale or halftone project photos or the portrait.
- **Don't** add a second accent hue, a neon glow, or the near-black plus one glowing accent look.
- **Don't** bring back the Studio Rack system (Signal Green, Inter and JetBrains Mono, the waveform divider) or the violet WebGL design.
- **Don't** reach for generic template patterns or gimmicky effects; the record is the one signature, and it appears once per page.
