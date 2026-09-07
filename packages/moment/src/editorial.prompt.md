# Moment editorial contract

Source and visual decisions: docs/moment/implementation.md (repository root).

MomentLockup owns the Moment wordmark, horizontal/stacked layout and sm/md size. It is a non-interactive identity; consumers wrap it in a named home link when needed.

MonoLabel composes LDS Overline. `children` is an English category; optional `translation` is its Korean gloss. This is metadata, not a heading. It does not own navigation.

MomentSourceTag composes LDS SourceTag. `href` produces a native new-tab anchor with noopener/noreferrer; absence of href produces readable text. Long source names wrap; the visible label and spoken new-tab hint identify destination behavior. `label` and `tone` retain upstream meanings. Callers provide real original-source links and do not use it as an action button.

EditorialCard composes non-interactive LDS Card. Required: title, summary, source { name, href? }. Optional: category, categoryLabel, variant (signal/editorial), headingLevel (2/3/4). DOM order is category → heading → summary → citation. It never nests a link inside an interactive card. It contains no fetching, publishing or news claims; those are consumer responsibilities.

Examples: packages/moment/stories/Editorial.stories.jsx. Verify long Korean titles and source names at 390px; light/dark themes; links in keyboard order. Empty/loading/network-error feeds are consumer-level compositions using inherited LDS Core states, not implicit behavior of EditorialCard.

These are optional research-content additions. Original LDS Lockup, SourceTag and Tag remain unchanged public exports. LDS geometry is the default; editorial curvature requires the explicit data-ml-expression="editorial" scope.
