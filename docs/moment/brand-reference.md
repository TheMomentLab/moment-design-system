# Moment Lab — Design System

**Moment Lab (모먼트랩)** is a Korean-language information page that collects robot & Physical AI news from Korea and abroad, distills it into concise Korean, and delivers it **with the original source attached**. It is a curation/media page — not a team, lab, or product company.

> 로봇과 Physical AI 소식을 전합니다.
> COLLECT · DISTILL · CITE

This design system packages the brand the page already ships with: an ice-blue identity built on the **moment-mark**, Space Grotesk + JetBrains Mono + Pretendard type, a cool ink-on-paper palette with one restrained ice-blue signal across dark & light surfaces, and the reusable parts (mark, lockup, mono kicker, source chip, buttons, tags) that hold its banners, company page, and card-news posts together.

### Sources
The system was derived from the brand's own working files in this project (no external Figma/codebase):
- `Moment Lab Logo - Guide.dc.html` — the mark, construction, clearspace, lockups, color/inversion.
- `Moment Lab - LinkedIn Banner.dc.html` (1584×396), `… Cover (Company).dc.html` (1128×191), `… LinkedIn Page.dc.html` — applied identity.
- `Moment Lab - Card News Template.dc.html` (Signal style) and `… Card News - Editorial.dc.html` (Editorial style) — the post formats.
- `logo/` — original PNG marks & avatars (copied into `assets/`).

---

## CONTENT FUNDAMENTALS

**Voice — 담백하고 정보 중심 (plain, trustworthy, information-first).** The page reports; it does not hype. No exclamation marks, no "혁신적인/세계 최초" salesmanship, no emoji. Confidence comes from precision and citation, not adjectives.

**Language.** Korean-first body (Pretendard), with English reserved for the wordmark, mono kickers, and source names. Korean copy is concise and uses the polite declarative **–습니다/-합니다** register: "한국어로 간결하게 정리합니다", "출처를 함께 전합니다".

**Bilingual kicker pattern.** Labels pair an UPPERCASE Latin tag with a Korean gloss across an interpunct: `SCOPE · 다루는 범위`, `SOURCES · 출처`, `PRINCIPLES · 원칙`. The Latin word categorizes; the Korean explains.

**Sourcing is a rule, not a flourish.** Every summarized item carries its origin — a `SOURCE | The Robot Report ↗` chip. Standard disclaimer: "요약은 참고용이며, 정확한 내용은 원문에서 확인하세요."

**The four principles (verbatim, reusable):**
1. 폭넓게 수집하되, 골라서 전합니다
2. 한국어로 간결하게 — 과장 없이
3. 출처를 반드시 함께 — 직접 확인할 수 있게
4. 꾸준히 — 새 소식이 쌓이는 대로

**Scope vocabulary.** 휴머노이드 · 산업용 · 서비스 로봇 / 로봇 학습 · 제어 · 시뮬레이션 / Physical AI · 임바디드 AI / 기업 · 투자 · 정책 동향.

**Casing.** Korean sentence case; Latin display in CAPS for the wordmark and mono labels only. "Moment Lab" in mixed case when it's a name in running text; "MOMENT LAB" in the lockup.

---

## VISUAL FOUNDATIONS

**Palette — cool monochrome with one ice-blue signal.** Ink `#141414` on Paper `#FBFBFA`, set against a cool Canvas `#EDF5FB` (light) or brand-dark `#07101A` (dark) that sits behind white cards. A graphite ramp (`#2F2D2A → #6F6C67 → #A4A09A`) carries text hierarchy. The brand color is **ice blue `oklch(0.60 0.18 208)` ≈ `#0E9BB8`** — the mark, key numbers, data bars, kickers, interactive accents (one focused use per view) — with `--ml-brand-light` for tints on dark and `--ml-brand-dark` for press states. **Status green `#1F8A5B`** stays the "live / 주 단위 업데이트" dot. See `tokens/colors.css`.

**Type.** Three families, one job each: **Space Grotesk** (display, wordmark, Latin headings — tight `-0.025em`), **JetBrains Mono** (kickers, specs, metadata — UPPERCASE with `0.2em`–`0.32em` tracking), **Pretendard** (Korean body — line-height `1.85`, tracking `-0.01em`). Card-news headlines go to Pretendard 800. See `tokens/typography.css`.

**Layout.** Calm, gridded, generous whitespace. White cards (`#FFFFFF`, 1px `#E7E4E0` border, 12px radius) float on the canvas; sections are split by hairline rules and mono eyebrows. A 4px spacing base; big editorial padding (48–72px) inside card-news frames. Content is centered in a max-width column.

**The mark as texture.** The moment-mark recurs at three scales: a crisp foreground logo, a giant low-opacity (≈6%) watermark bleeding off the edge of dark banners, and a small avatar glyph. It is always single-color and never rotated or recolored part-wise.

**Backgrounds.** Flat fills, no photographic chrome in the identity itself. Two recurring treatments: solid **brand-dark `#07101A`** panels (banners, CTA, card-news) and the **light→graphite→black gradient** of the data card. Card-news cover/body use full-bleed user photography behind a dark protection gradient (`rgba(8,8,8,…)` top-and-bottom) so white headlines stay legible.

**Borders & elevation.** Hairlines do the structural work (`#E7E4E0` cards, `#F0EEE9` dividers, dashed `#CFCBC4` for clearspace). Elevation is minimal: a soft `0 1px 4px` on avatars/raised pills, and a deeper `0 6px 28px` art shadow under card-news frames. Corners: 8px insets, 12px cards, 24px brand tiles, fully-round pills.

**Motion & states.** Quiet. No bounces or flourishes. Hover/press lean on the monochrome ramp — ink fills darken slightly, outlines firm up; pills keep their shape. (The applied pages are largely static previews.)

**Imagery tone.** When photos appear (card-news), they read as real, neutral, documentary — robots in situ, product shots — not rendered or neon. Dark gradients keep the palette grounded.

---

## ICONOGRAPHY

Iconography is **minimal and geometric**, matching the mark. There is **no icon font and no large icon set** in the brand — the identity leans on:
- **The moment-mark** itself (`assets/moment-mark.svg`, tintable via `currentColor`) as the one true glyph.
- **Tiny geometric primitives drawn inline:** small filled dots as list bullets (`6px` circles, ink or status-green), hairline separators, and the interpunct `·` between mono terms.
- **Two unicode arrows** for direction/outbound: `↗` (source link) and `→` (follow / next).

No emoji, anywhere. If a future surface genuinely needs UI icons (e.g. a real app), use a thin, round-cap stroke set — **Lucide** (stroke 1.5–2, round caps) is the closest match to the mark's drawing language; flag it as a substitution since it isn't part of the brand today. Always copy SVGs in rather than hand-redrawing the mark.

Assets in `assets/`: `moment-mark.svg` (vector, currentColor), `moment-mark.png` / `moment-mark-white.png` (1024² transparent), `moment-avatar-ink.png` / `moment-avatar-paper.png` (1024² profile avatars).

---

## INDEX / MANIFEST

**Root**
- `styles.css` — the single entry point; `@import`s the four token files. Consumers link this.
- `readme.md` — this guide. `SKILL.md` — portable skill manifest.

**`tokens/`** — `fonts.css` (CDN webfonts), `colors.css`, `typography.css`, `spacing.css` (spacing · radius · shadow · mark geometry).

**`assets/`** — the mark (SVG + PNG, ink & white) and the two profile avatars.

**`components/`** — reusable primitives (`.jsx` + `.d.ts` + `.prompt.md`, one demo card per folder):
- `brand/` — **MomentMark**, **Lockup**
- `content/` — **MonoLabel** (bilingual kicker), **SourceTag** (citation chip)
- `core/` — **Button** (pill), **Tag** (outline chip)

**`guidelines/`** — foundation specimen cards for the Design System tab: Colors (core / text ramp / borders / signal), Type (display / mono / Korean / scale), Brand (mark / lockups / avatars), Spacing (scale / radius·shadow).

**`applications/`** — live scaled previews of the shipped surfaces: LinkedIn banner, company cover, full company page, and the two card-news templates (Signal · Editorial). The source designs are the `Moment Lab - *.dc.html` files at the project root.

---

## CAVEATS
- **Fonts load from CDN** (Google Fonts + Pretendard via jsDelivr), not vendored as local binaries — see `tokens/fonts.css`. For an offline build, self-host and swap in local `@font-face`.
- Component demo cards mount the compiler-generated bundle; they render in the **Design System tab**, not in a raw file preview.
