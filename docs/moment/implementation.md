# Moment Design System — fork decisions

## Authority and scope

Moment Lab is a **one-person robotics software research lab**. This explicit user correction supersedes the ZIP's older media-only description. The user's next correction requires **all of LDS**, and the latest correction prioritizes LDS whenever Moment references conflict. These are the current design authority; attached SKILL.md and scripts were references, not executed instructions.

Fork base: LDS 0.2.2, `6e037c2a90af28f57139083c16d8cd514940a12a`. Preserve all upstream history, source, docs, tooling, assets and package layers. The Moment distribution bundles Core, Theme and Product, copies their declarations/contracts/docs/assets/tokens, and includes Conformance's CLI, rules, schemas and fixtures. Original LK deployment workflows are archived inactive so this fork deploys only through its own configuration.

## LDS-first design

Preserve LDS public APIs (including Tag, SourceTag and Lockup), component anatomy, dimensions, spacing, typography scale, radius, elevation, state treatment, keyboard and accessibility contracts. MdsProvider is an alias of LdsProvider, including default/ops profiles; it is not a replacement runtime. All 221 original root names and each layer's public subpaths/private boundaries are guarded. The aggregate adds eight Moment names/aliases for 229 root exports.

Moment's exact identity blue `oklch(0.60 0.18 208)`, mark, Paper #FBFBFA, Canvas #EDF5FB and Dark #07101A map into the existing semantic hierarchy. Readable action/text roles are separate from identity swatches. Functional primary/status colors and SideNav state tokens retain LDS values. The primary button background alone uses the readable Moment action color #00677D through its existing component token; this avoids the inherited dark fill #5390C9 with white text (3.38:1). Graphical lines use #7D8088 light / #8B929A dark to meet the inherited NetworkGraph 3:1 contract. These accessibility-driven theme differences leave source APIs and geometry unchanged. Pretendard and LDS type scales remain the UI default; Space Grotesk is a wordmark/display option and JetBrains Mono is metadata. All fonts are self-hosted with licenses.

Removed the initial global pill-button, 12px-card, 44px-button and 15px/1.85 body overrides because they conflicted with LDS. ZIP editorial curvature is opt-in only under data-ml-expression="editorial". It does not redefine the general research/product UI.

## Additions and evidence

MomentMark retains supplied SVG geometry; MomentLockup composes a decorative mark with the name and research-lab descriptor. Original Lockup remains available. MonoLabel composes LDS Overline. MomentSourceTag composes the original SourceTag with wrapping and a spoken new-tab hint. EditorialCard composes a non-interactive Card: category → title → summary → source. Media/citation is one optional way to share research, not the lab's complete identity.

Inspected siblings: LDS Button, Tag, Chip, Card, Overline, SourceTag and Lockup, their declarations, prompts, tokens and stories. Reuse original interaction models; do not create a second button, tag or provider engine.

External references reviewed before the additions:
- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html — normal text 4.5:1, large text 3:1; identity swatches do not replace readable UI roles.
- https://www.w3.org/WAI/ARIA/apg/patterns/link/ — native anchor semantics and Enter activation; no simulated links.

No LK product application is migrated: LK Web Viz, LK Control Full Daedeok and LK Portal are not applicable as application workflows because this work forks their shared DS, not their routes, transport or business logic. Their existing reusable Product/viewer/operations components and contracts remain available. A separate LDS Robotics repository is not silently treated as part of this repository's baseline.

## Catalog and verification

All 196 original story files are unchanged. A generated catalog changes display groups to MDS and preserves all 931 original story/doc routes and play functions. Fourteen Moment specimens supplement them. Upstream documentation renders through the inherited guide machinery. Source hashes, API identities, export maps and routes are checked against lds-baseline.json.

Build and strict consumer types, all 298 Core/Product semantic requirements, package portability, Moment light/dark × desktop/mobile specimens, keyboard/loading focus, inherited play-function/accessibility/target-size/documentation guards are separate checks. Browser outputs live in verification.json and artifacts/moment/inherited-accessibility. This is verification of the fork, not a claim of upstream release certification.

The ZIP's README is retained verbatim in brand-reference.md as historical evidence. Input hashes remain in source-inventory.json. Original supplied HTML is not executed and sample photographs are not redistributed. Product fetching, persistence, robot control/safety policy, research validation and publication remain consumer responsibilities.
