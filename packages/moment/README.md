# Moment Design System

**모먼트랩의 로봇·Physical AI 에디토리얼을 위한 디자인 시스템.** LDS를 포크해 Core 컴포넌트의 동작과 접근성 기반을 계승하고, 모먼트랩 브랜드와 콘텐츠 표현을 적용했습니다.

COLLECT · DISTILL · CITE

- 아이스 블루, Paper/Ink, 다크·라이트·시스템 테마
- Space Grotesk / JetBrains Mono / Pretendard — 폰트 자체 포함
- LDS Core 재사용 + MomentMark, Lockup, MonoLabel, SourceTag, EditorialCard
- 14개 Storybook 예시: 브랜드, 색상, 서체, 간격, 버튼·입력·태그와 콘텐츠
- 일반·모바일 화면, 키보드, 로딩 초점 유지, 테마와 접근성 검사

## 시작하기

Node.js 22.17 이상, npm 10, Python 3가 필요합니다. 저장소 루트에서 실행합니다.

```sh
npm ci
npm run build
npm run check
npm run storybook:dev
```

Storybook은 `http://127.0.0.1:6007`에서 열립니다.

```sh
npm run build:storybook
npx playwright install chromium
npm run check:moment:browser
```

시스템 Chrome을 사용하려면 `CHROME_PATH`에 실행 파일 경로를 설정합니다. 브라우저 검사는 임시 로컬 서버를 자동으로 시작하고 종료합니다.

## 소비 앱에서 사용하기

현재는 npm에 게시하지 않은 `0.1.0` 소스 배포입니다. 먼저 빌드 후 로컬 패키지를 설치합니다. npm pack은 라이브러리 번들, 폰트, CSS, 타입과 고지를 함께 묶습니다.

```sh
npm run build
npm pack ./packages/moment --ignore-scripts
# 소비 앱에서 생성한 themomentlab-design-system-0.1.0.tgz 설치
```

```tsx
import { Button, EditorialCard, Lockup } from '@themomentlab/design-system';
import '@themomentlab/design-system/styles.css';

export function Article() {
  return (
    <section data-theme="light">
      <Lockup />
      <EditorialCard
        category="ROBOTICS"
        categoryLabel="로보틱스"
        title="원문을 읽고, 맥락을 정리합니다"
        summary="실제 뉴스가 아닌 구성 예시입니다. 검증된 요약을 여기에 작성합니다."
        source={{ name: '원문 출처명' }}
      />
      <Button onClick={() => { /* 소비 앱의 구독 동작 */ }}>팔로우</Button>
    </section>
  );
}
```

`data-theme="light | dark | auto"`를 루트 또는 영역에 적용합니다. 미지정 루트는 시스템 테마를 따릅니다. 출처의 `href`가 있으면 새 탭 링크, 없으면 텍스트로 렌더링합니다. 소비 앱이 콘텐츠 검증·네트워크·게시·구독 저장을 소유합니다.

## 소스와 고지

소스, 설계 결정과 검증은 https://github.com/TheMomentLab/moment-design-system 에서 확인합니다. React 18 또는 19와 React DOM이 필요합니다. LDS Core는 번들에 포함됩니다. THIRD_PARTY_NOTICES.md와 assets/fonts의 라이선스를 함께 보존하세요.
