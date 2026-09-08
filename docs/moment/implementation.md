# Moment Design System — fork decisions

## Authority and scope

Moment Lab is a **one-person robotics software research lab**. This explicit user correction supersedes the ZIP's older media-only description. The user's next correction requires **all of LDS**, and the latest correction prioritizes LDS whenever Moment references conflict. These are the current design authority; attached SKILL.md and scripts were references, not executed instructions.

Fork base: LDS 0.2.2, `6e037c2a90af28f57139083c16d8cd514940a12a`. Preserve all upstream history, source, docs, tooling, assets and package layers. The Moment distribution bundles Core, Theme and Product, copies their declarations/contracts/docs/assets/tokens, and includes Conformance's CLI, rules, schemas and fixtures. Original LK deployment workflows are archived inactive so this fork deploys only through its own configuration.

## LDS-first design

Preserve LDS public APIs (including Tag, SourceTag and Lockup), component anatomy, dimensions, spacing, typography scale, radius, elevation, state treatment, keyboard and accessibility contracts. MdsProvider is an alias of LdsProvider, including default/ops profiles; it is not a replacement runtime. All 221 original root names and each layer's public subpaths/private boundaries are guarded. The aggregate adds eight Moment names/aliases for 229 root exports.

Moment's exact identity blue `oklch(0.60 0.18 208)`, mark, Paper #FBFBFA, Canvas #EDF5FB and Dark #07101A map into the existing semantic hierarchy. Readable action/text roles are separate from identity swatches. Primary now uses the Moment cyan family: #00677D light and #3695AC dark, with strong/heavy steps in the same hue family. Readable accent is #00677D light / #79D8EA dark. Filled primary buttons, solid chips and signal badges use #00677D with white text in both modes; selected surfaces derive from primary. Status meanings and independent status colors are retained. The Foundation Color guide documents the actual theme mapping, and research examples distinguish illustrative logs from real measurements. Graphical lines use #7D8088 light / #8B929A dark to meet the inherited NetworkGraph 3:1 contract. These accessibility-driven theme differences leave source APIs and geometry unchanged. Pretendard and LDS type scales remain the UI default; Space Grotesk is a wordmark/display option and JetBrains Mono is metadata. All fonts are self-hosted with licenses.

Removed the initial global pill-button, 12px-card, 44px-button and 15px/1.85 body overrides because they conflicted with LDS. ZIP editorial curvature is opt-in only under data-ml-expression="editorial". It does not redefine the general research/product UI.

## Additions and evidence

MomentMark retains supplied SVG geometry; MomentLockup composes a decorative mark with the name and research-lab descriptor. Lockup keeps its public prop surface and now renders Moment artwork in the MDS distribution. MonoLabel composes LDS Overline. MomentSourceTag composes the original SourceTag with wrapping and a spoken new-tab hint. EditorialCard composes a non-interactive Card: category → title → summary → source. Media/citation is one optional way to share research, not the lab's complete identity.

Inspected siblings: LDS Button, Tag, Chip, Card, Overline, SourceTag and Lockup, their declarations, prompts, tokens and stories. Reuse original interaction models; do not create a second button, tag or provider engine.

External references reviewed before the additions:
- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html — normal text 4.5:1, large text 3:1; identity swatches do not replace readable UI roles.
- https://www.w3.org/WAI/ARIA/apg/patterns/link/ — native anchor semantics and Enter activation; no simulated links.

No LK product application is migrated: LK Web Viz, LK Control Full Daedeok and LK Portal are not applicable as application workflows because this work forks their shared DS, not their routes, transport or business logic. Their existing reusable Product/viewer/operations components and contracts remain available. A separate LDS Robotics repository is not silently treated as part of this repository's baseline.

## Catalog and verification

All 196 original story files remain unchanged as provenance. The generated MDS catalog preserves all 931 story/doc routes and the original interaction checks, except that the two company-brand pages now exercise Moment artwork and its own contracts. Fourteen Moment specimens supplement them. Upstream documentation renders through the inherited guide machinery. Source hashes, API identities, export maps and routes are checked against lds-baseline.json.

Build and strict consumer types, all 298 Core/Product semantic requirements, package portability, Moment light/dark × desktop/mobile specimens, keyboard/loading focus, inherited play-function/accessibility/target-size/documentation guards are separate checks. Browser outputs live in verification.json and artifacts/moment/inherited-accessibility. This is verification of the fork, not a claim of upstream release certification.

The ZIP's README is retained verbatim in brand-reference.md as historical evidence. Input hashes remain in source-inventory.json. Original supplied HTML is not executed and sample photographs are not redistributed. Product fetching, persistence, robot control/safety policy, research validation and publication remain consumer responsibilities.

## Browser lifecycle adaptation

The generated catalog waits for rendered fonts and two animation frames before invoking each unchanged original play function. This avoids measuring MetricCard footers while a self-hosted font is swapping. SplitButton's generated test also waits two frames after Escape before intentionally focusing the viewport-edge trigger: the inherited useMenuKeyboard schedules focus restoration with requestAnimationFrame. General component assertions, timeouts and accessibility thresholds are retained. The separate Moment branding projection described below replaces company-specific artwork assertions; original source files remain unchanged.

## Storybook structure (2026-09-08)

Keep the inherited Directory → Core → Theme → Product hierarchy, foundation/component order and Docs/variant order. Storybook statically extracts storySort from the entry preview file; an imported parameters spread does not provide the indexer with that function. The comparator is therefore inline in .storybook-moment/preview.jsx, with only the MDS/LDS name normalization added. The catalog guard compares all 931 inherited IDs in order, not just their presence.

Moment identity, palette, typography and spacing sit under Theme/Brand/Moment Lab; Moment control specimens under Theme/Controls; Editorial Card under Product/Content. The extra root Foundation/Core/Content branches are removed. Explicit IDs preserve all previous Moment bookmarks. The manager uses the same default Storybook appearance as LDS, with only the Moment title, favicon and repository identity. Moment specimen padding and page-title typography follow the inherited Canvas defaults.

## Complete public MDS branding (2026-09-08)

The Storybook is a Moment Lab product. Public prose, story descriptions, titles, snippets and linked documentation use MDS and the real Moment package/repository. The Directory lists the available Core, Theme, Product and Conformance layers; it no longer advertises separately deployed upstream families as Moment products. Original attribution remains in THIRD_PARTY_NOTICES.md and this lineage record, not in normal product guidance.

A syntax-aware Vite transform changes string/JSX copy while preserving executable imports, identifiers, CSS tokens, selectors and compatibility route IDs. Public static documentation is projected into .mds-docs. Foundation/component guides continue using the same layouts and contracts. Private compatibility names are not globally renamed.

Lockup, ProductLockup and Spinner's brand variant are the three owned visual implementations in packages/moment/src/brand.jsx. The SVG logo uses the supplied MomentMark geometry and self-hosted Space Grotesk. Product labels Console/Portal are explicitly specimen slots, not a claim of launched products. Circular Spinner delegates to the unchanged base implementation; brand loading uses the Moment mark and stops animation with reduced motion. Root, layer and component subpath exports resolve to the same implementations. All other runtime exports remain unchanged.

The generated Brand and ProductLockup specimens replace company-specific geometry/approval claims with Moment size, variant, accessible-name, decorative, reverse and compact/expanded cases. Source stories and the original assets remain preserved. Relevant siblings: existing Lockup, ProductLockup, Spinner, MomentMark and MomentLockup; retained reference guidance: WCAG contrast and native link semantics linked above. Geometry differences are required by the user-supplied Moment identity, not a new general component style.

The full browser sweep rejects visible LDS/LK company branding in stories and Docs in addition to retaining accessibility and interaction checks. Technical compatibility identifiers, original file names and licenses are retained intentionally.

브랜드 전환 렌더 검토: Moment Lab Logo의 390px 마크·가로/세로·reverse 상태와 Product Lockup의 1280px 기본·compact·reverse 상태를 확인했다. 기존 카탈로그 순서와 일반 컴포넌트 치수는 유지한다. CSS 토큰과 저장된 Storybook URL의 기술 식별자는 호환성을 위해 보존한다.

MDS 색상 정합성 검토: Foundation Color의 1280px 역할 표와 390px 다크 버튼의 기본·로딩·비활성 상태를 렌더 검토했다. 기본 표면 대비 Primary는 라이트 6.27:1, 다크 5.15:1, 다크 읽기용 accent는 10.92:1, 주요 버튼의 흰 글자는 6.49:1이다. 값은 sRGB 상대 휘도로 계산했다. 고유 아이스 블루는 마크에 유지하며, 의미색·레이아웃·키보드 동작의 계약은 바꾸지 않는다.

Annotated Image의 signal 라벨은 MDS Primary 명도에 맞춰 전경을 선택한다(라이트 흰색, 다크 검은색). 원본 파일은 보존하고 공통 runtime projection을 Storybook과 패키지 번들에 함께 적용한다. 상태색 라벨과 컴포넌트 API는 유지한다.

독립 소비 계약: 외부 임시 디렉터리에서 실제 npm tarball을 설치하고 React 18/19의 strict TypeScript, SSR/hydration, 저장 테마 복원, 프로필, 포털 테마, Escape 및 초점 복귀, 폰트 자산과 Conformance fixture/기본 계약을 검증한다. 원본 LdsProvider는 보존하고 MdsProvider의 기본 저장 키와 hydration 초기화를 분리한다. 공개 계층 스타일 경로는 완전한 MDS 테마를 가리킨다. CI consumer matrix와 scripts/fixtures/moment-consumer가 실행 가능한 증거다.

브랜드 문서 형식 정합성: stories/Brand.shared.jsx와 BrandProductLockup.stories.jsx의 문서 폭, 정렬, 섹션 간격, 비교 패널과 변형 순서를 MDS 브랜드 예시에 적용했다. 소개 hero와 색상 페이지의 EditorialCard 예시를 제거했다. Moment 미제공 자산·미확정 광학 규정은 같은 문서 섹션에서 상태를 명시한다. 1280px Color 배경 비교와 로고 개요, 390px Identity와 Product Lockup을 렌더 검토했다. 좁은 화면 비교에서 발견한 portal 워드마크 잘림은 SVG viewBox를 실제 문구에 맞춰 수정하고 경계 검사를 추가했다. 원본 컴포넌트 API와 카탈로그 경로는 유지한다.

최신 디자인 권한: Moment Lab의 브랜드 색상·로고·CI만 별도로 유지한다. 서체 선언은 inherited/theme/tokens/fonts.css 원본을 직접 가져오며 UI와 워드마크는 Pretendard, 코드용은 원본 시스템 mono 스택이다. 기존 --ml-* 타입·간격·모서리 이름은 LDS 토큰 별칭으로 전환했다. 과거 독립 서체·타입 스케일·editorial 모서리·전역 포커스/모션 덮어쓰기는 제거했다. 이 규칙이 앞선 선택적 editorial 및 별도 서체 설명을 대체한다.
