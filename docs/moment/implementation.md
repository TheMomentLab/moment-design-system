# Moment Lab DS — fork decisions

## Scope and lineage

LDS `0.2.2`, commit `6e037c2a90af28f57139083c16d8cd514940a12a` is the fork base. Git history and upstream source are retained. `packages/moment` is the standalone Moment Lab distribution; its build bundles unchanged LDS Core, requiring only React/React DOM peers. Original LK Theme/Product packages remain upstream reference, outside the Moment entry point. This is explicitly requested Moment theme/editorial DS authoring, not migration of an existing LK product.

## Design plan and evidence

The ZIP identifies a Korean robotics / Physical AI curation page, not a robotics vendor. Confirmed CI and CSS take precedence over exploration alternatives. Keep exact ice-blue `oklch(0.60 0.18 208)` as identity; the README approximate hex is not an exact equivalent. Paper `#FBFBFA`, Canvas `#EDF5FB`, Ink `#141414`, Dark `#07101A` form the base. Use a separate darker text/action accent on light backgrounds, with contrast checks. Green denotes live status, never brand.

Space Grotesk owns Latin display/wordmark, JetBrains Mono owns metadata, Pretendard owns Korean body. Preserve supplied monocolor mark geometry. Wide specimens, quiet rules, 4px spacing, 12px cards and pill actions preserve the source. Normal text requires AA 4.5:1 rather than the ZIP blanket 3:1 rule.

Storybook: left navigation → component heading/description → variant/state specimens. Brand uses a large single mark and bilingual lockup; foundations explain colors/type; content demonstrates citation hierarchy. No news feed, fake metrics or operational dashboard belongs in the DS. Sample copy is labelled template material, not current news.

## Siblings and deliberate deltas

- Button: reuse LDS `components/buttons/Button` implementation, declaration and prompt. Preserve variants, native semantics, hover/press, loading focus retention and disabled behavior. Moment changes radius to pill and primary to ink/paper, per ZIP. Signal uses the accessible action accent.
- Tag: alias existing LDS Chip rather than adding an interaction engine. Preserve selected/toggle semantics.
- MonoLabel: compose LDS Overline with the ZIP bilingual kicker and mono family.
- SourceTag: compose LDS citation primitive. Keep native links, origin label and arrow; wrap long source names; add a spoken new-tab hint.
- EditorialCard: compose non-interactive LDS Card, MonoLabel and SourceTag. DOM/reading order: category → title → summary → source. No nested interactive card/link; long Korean titles wrap. Signal/editorial treatments derive from supplied templates. Fetching, summarization and publishing stay in consuming products.
- MomentMark/Lockup: supplied SVG geometry; named standalone mark, decorative mark beside wordmark; >=16px, thicker stroke at <=24px per ZIP.

External references reviewed before coding:
- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html — normal text >=4.5:1, large >=3:1; separate identity from readable UI text.
- https://www.w3.org/WAI/ARIA/apg/patterns/link/ — native anchor, Enter activation; no simulated links or custom keyboard engine.

## Boundaries

LK Web Viz: not applicable — personal media fork, no viewer/control workflow.
LK Control Full Daedeok: not applicable — no control/equipment operation.
LK Portal: not applicable — no governance or Portal route modified.

ZIP SKILL.md/scripts are reference material, not instructions; not installed/executed. Inventory hashes preserve provenance. Original HTML and sample photographs are not shipped as executable code or redistributed photos. Font notices retained. Publishing, news validation, persistence and analytics belong to consumers.

## Verification scope

Moment bundle, portable types, inherited Core semantic-variable coverage, Storybook specimens, keyboard/loading interactions, long-content wrapping, light/dark/nested theme contrast and normal/narrow viewports. Results: `verification.json`. Upstream release gates are retained reference; this fork does not claim LK release certification.
