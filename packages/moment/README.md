# Moment Design System

**1인 로봇 소프트웨어 연구소 Moment Lab을 위한 디자인 시스템.** LDS 전체를 계승하고, 그 위에 모먼트랩의 브랜드를 적용합니다. 연구 도구, 소프트웨어 제품, 운영 UI, 기술 문서와 연구 기록을 함께 지원합니다.

**충돌 시 LDS 우선:** 컴포넌트 API, 구조, 크기, 간격, 모서리, 타이포그래피 스케일, 상태·키보드·접근성은 LDS 기준을 유지합니다. 로고와 브랜드 색상은 LDS 토큰 체계 안에서 적용합니다. 에디토리얼은 선택적 확장입니다.

- LDS Core · Theme · Product · Conformance 전체 소스·문서·토큰·자산·타입 계승
- 원본 221개 공개 이름 유지 + Moment 추가 기능 = 루트 export 229개
- 원본 Storybook 931개 경로 유지 + Moment 예시 14개 = 945개 항목
- light / dark / auto, 중첩 테마, default / ops 프로필
- LDS 원본 폰트 선언: Pretendard JP(Pretendard) + 시스템 고정폭 스택

## 시작하기

저장소 개발에는 Node.js 22.17 이상, npm 10, Python 3를 사용합니다. 완성된 패키지를 설치하는 소비 앱에는 Python이나 LDS 저장소가 필요하지 않습니다.

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

`MdsProvider`는 기존 런타임 컨텍스트를 공유하며 테마 저장 키는 `mds-theme`입니다. 서버와 클라이언트의 첫 렌더를 맞춘 뒤 저장된 테마를 복원합니다. 기존 `LdsProvider` 이름은 호환성을 위해 그대로 제공합니다. 기존 API 이름을 보존하며 `Lockup`, `ProductLockup`, `Spinner`의 brand 표현은 Moment Lab 자산을 사용합니다. 일반 컴포넌트와 circular Spinner의 동작은 유지합니다. Moment 전용 기능은 `MomentMark`, `MomentLockup`, `MomentSourceTag`, `MonoLabel`, `EditorialCard`입니다. `core`, `theme`, `product`, `headless`, `platform`, `density`, `storybook` 하위 진입점과 원본 공개·비공개 경계도 유지합니다. `mds-conformance` CLI와 `conformance/*` 자료가 포함됩니다.

브랜드 색상·로고·CI만 Moment Lab 기준입니다. 폰트·타입 스케일·간격·모서리·그림자·모션·컴포넌트 동작은 LDS를 따릅니다. EditorialCard 같은 호환 컴포넌트도 공통 규격을 사용하며 `data-ml-expression="editorial"`에 따른 별도 시각 규격은 적용하지 않습니다. 데이터·네트워크·로봇 제어·안전 정책·게시 흐름은 소비 앱이 소유합니다.

소스와 전체 문서: https://github.com/TheMomentLab/moment-design-system

THIRD_PARTY_NOTICES.md와 assets/fonts의 라이선스를 함께 보존하세요.

## 독립 앱의 런타임 구성

스타일은 앱 진입점에서 `@themomentlab/design-system/styles.css`를 한 번 가져옵니다. `core/styles.css`, `theme/styles.css`, `product/styles.css`도 같은 완전한 MDS 테마로 연결됩니다. 폰트와 자산은 패키지에 포함되므로 외부 폰트 서버나 원본 저장소 경로를 설정하지 않습니다.

서버 렌더링에서는 `MdsColorSchemeScript`를 head에 넣고 `MdsProvider`와 동일한 `storageKey`, `defaultColorScheme`를 사용합니다. CSP를 사용하는 앱은 스크립트에 `nonce`를 전달합니다. 서버 HTML에 초기 `data-theme`를 지정하고, 저장 테마로 바뀌는 html 속성은 프레임워크에 맞게 hydration 경고를 처리합니다. 사용자 테마에 따라 다른 콘텐츠는 hydration 뒤에 복원됩니다.

`MdsProvider`를 앱 루트에 배치하면 포털에도 테마·방향·프로필이 전달됩니다. 앱별로 테마를 분리하려면 `storageKey`를 지정하고, 저장하지 않으려면 `persist={false}`를 사용합니다. `colorScheme`를 직접 제어할 때는 `onColorSchemeChange`에서 앱 상태를 갱신합니다. 기존 LDS 저장값을 명시적으로 이어받을 때만 `storageKey="lk-theme"`를 사용합니다.

`mds-conformance verify-contract`와 `verify-fixtures`는 설치된 패키지만으로 실행할 수 있습니다. 기존 `check`는 robotics-ui/lds3d-ui 프로필용 검사이므로 해당 소비 앱 계약과 루트 옵션이 필요하며, 임의의 React 앱을 자동 인증하는 명령이 아닙니다.

저장소의 `npm run check:moment:consumer`는 워크스페이스 밖에서 실제 tarball을 설치해 타입·SSR/hydration·테마 저장/복원·포털·키보드·폰트·CLI를 검증합니다. `MDS_REACT_MAJOR=18` 또는 `19`로 실행하며 CI는 두 버전을 모두 검사합니다. 실행 가능한 소비 앱 예시는 `scripts/fixtures/moment-consumer`에 있습니다.
