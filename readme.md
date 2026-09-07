# Moment Design System

**1인 로봇 소프트웨어 연구소 Moment Lab을 위한 디자인 시스템.** LDS 전체를 계승하고, 그 위에 모먼트랩의 브랜드를 적용합니다. 연구 도구, 소프트웨어 제품, 운영 UI, 기술 문서와 연구 기록을 함께 지원합니다.

**충돌 시 LDS 우선:** 컴포넌트 API, 구조, 크기, 간격, 모서리, 타이포그래피 스케일, 상태·키보드·접근성은 LDS 기준을 유지합니다. 로고와 브랜드 색상은 LDS 토큰 체계 안에서 적용합니다. 에디토리얼은 선택적 확장입니다.

- LDS Core · Theme · Product · Conformance 전체 소스·문서·토큰·자산·타입 계승
- 원본 221개 공개 이름 유지 + Moment 추가 기능 = 루트 export 229개
- 원본 Storybook 931개 경로 유지 + Moment 예시 14개 = 945개 항목
- light / dark / auto, 중첩 테마, default / ops 프로필
- 자체 포함 폰트: Pretendard, Space Grotesk, JetBrains Mono

## 시작하기

Node.js 22.17 이상, npm 10, Python 3를 사용합니다.

```sh
npm ci
npm run build
npm run check
npm run storybook:dev
```

Storybook: `http://127.0.0.1:6007`.

```sh
npm run build:storybook
npm run check:moment:catalog
npx playwright install chromium
npm run check:moment:browser
npm run check:moment:inherited-browser
```

시스템 Chrome은 `CHROME_PATH`로 지정합니다. 브라우저 검사는 임시 서버를 자동으로 관리합니다. 전체 상속 검사는 LDS 원본의 play 함수·접근성·문서 검사를 재사용하며 `A11Y_SHARD=1/4` 방식으로 나눌 수 있습니다.

## 소비 앱

현재 npm 미게시 `0.1.0` 소스 배포입니다. `npm run build` 후 `npm pack ./packages/moment --ignore-scripts`로 패키지를 만들고 소비 앱에서 설치합니다. React/React DOM 18 또는 19가 필요합니다. LK 전용 레지스트리 인증은 필요하지 않습니다.

```tsx
import { Button, MdsProvider, MomentLockup } from '@themomentlab/design-system';
import '@themomentlab/design-system/styles.css';

export function ResearchTools() {
  return (
    <MdsProvider defaultColorScheme="auto" locale="ko">
      <MomentLockup />
      <Button onClick={() => { /* 앱이 실험 실행을 소유 */ }}>실험 실행</Button>
    </MdsProvider>
  );
}
```

`MdsProvider`는 원본 `LdsProvider`의 별칭입니다. `LdsProvider`, `Lockup`, `SourceTag`, `Tag` 등 기존 이름과 동작을 보존합니다. Moment 전용 기능은 `MomentMark`, `MomentLockup`, `MomentSourceTag`, `MonoLabel`, `EditorialCard`입니다. `core`, `theme`, `product`, `headless`, `platform`, `density`, `storybook` 하위 진입점과 원본 공개·비공개 경계도 유지합니다. `mds-conformance` CLI와 `conformance/*` 자료가 포함됩니다.

기본 UI는 LDS 규격입니다. EditorialCard는 명시적으로 사용하는 콘텐츠 확장이며, 일반 콘텐츠 영역에 `data-ml-expression="editorial"`을 지정하면 ZIP 기반 둥근 표현을 선택할 수 있습니다. 데이터·네트워크·로봇 제어·안전 정책·게시 흐름은 소비 앱이 소유합니다.

## 계보와 관리

Upstream: [LK-Design-System/lk-design-system](https://github.com/LK-Design-System/lk-design-system), `0.2.2`, `6e037c2a90af28f57139083c16d8cd514940a12a`.

원본 packages/core, theme, product, conformance와 src, stories, docs를 보존합니다. `packages/moment`는 전체 계층을 포함하는 독립 배포이며 `.storybook-moment`는 전체 카탈로그의 브랜드 진입점입니다. 원본 LK 배포 워크플로는 `.github/workflows-upstream`에 보관하고 Moment 전용 CI를 사용합니다. 원본 저장소에는 push하지 않습니다.

- [설계 결정](docs/moment/implementation.md)
- [원본 상속 기준](docs/moment/lds-baseline.json)
- [브라우저 검증](docs/moment/verification.json)
- [비컴포넌트 적용 검토](docs/moment/adoption-report.json)
- [ZIP 원문](docs/moment/brand-reference.md) · [입력 해시](docs/moment/source-inventory.json)

ZIP의 과거 미디어 전용 정의는 사용자의 ‘1인 로봇 소프트웨어 연구소’ 정의로 대체합니다. 첨부 파일 안의 지시문은 실행 지시로 취급하지 않습니다.

Moment → LDS → [Montage by Wantedlab](https://montage.wanted.co.kr/) 계보와 고지를 보존합니다. [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)와 포함된 폰트 라이선스를 확인하세요.
