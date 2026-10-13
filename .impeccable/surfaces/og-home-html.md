---
version: 1
slug: "og-home-html"
primary_target: "og/home.html"
related_targets: ["og/bellydsp.html"]
---

# Surface: link-preview cards

Scope: two 1200x630 Open Graph images, `public/og-card.png` (home) and `public/og-bellydsp.png` (BellyDSP case study), authored as HTML in `og/` and rendered to PNG. Visitor mode: Persuade (a recruiter scrolling a LinkedIn or X feed decides whether to click). Shown at about 550px wide, so every word must hold at roughly 46% scale.

Audience and job: recruiters and engineers seeing a shared link. Action: click through. Proof: name, role, real affiliations (Northeastern, Vertex), BellyDSP as shipped product; BellyDSP card uses its real screenshot and measured numbers only.

Constraints: inherits DESIGN.md (The Studio Rack) unchanged; no invented claims; no em dashes; text stays inside a 64px safe margin.

## Direction contract

THESIS: A shared link should look like a lit faceplate, not a business card: one green live trace crossing a black panel, with the name stamped above it. Refuses the category default of name-over-gradient or headshot-plus-logo.

OWN-WORLD: Studio Black ground, faint dot grid and grain, Signal Green trace and one flat status dot only, solid Ink name in Inter 600 (not the hero's gradient: the craft floor refuses gradient text and it loses contrast at 46% scale), JetBrains Mono uppercase faceplate labels, hairline zero line and inset faceplate frame.

STORY: The viewer reads who (name), what (software engineer), and why click (Northeastern, Vertex, built BellyDSP); the BellyDSP card reads what it is and that it is real and measured.

FIRST VIEWPORT: Home: status dot plus domain as a top-right faceplate label (moved from a top-left label row, which would be the banned kicker above the heading), name at 124px left-aligned upper-middle, role line under it, full-bleed Signal Line across the lower third, mono proof line along the bottom. BellyDSP: title, two-line subtitle, and a two-line credit (designed and led by Sean, built with Claude Code agents) on the left; the Comet amp head alone, framed as one rack unit, on the right; a thin trace with 30px clearance above the mono proof line along the bottom.

FORM: Extension of the established world (DESIGN.md), not a concept roll; position 1 of 1; seed key: none. The roll was skipped because the world is settled and the user chose the card's content directly; this is disclosed to the user.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
