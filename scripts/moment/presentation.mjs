// Public documentation naming. Runtime selectors, tokens and compatibility APIs stay stable.
export function momentText(text) {
  return text
    .replace(/https:\/\/design\.lkrobotics\.dev\/docs/g, 'https://github.com/TheMomentLab/moment-design-system')
    .replace(/https:\/\/lk-design-system\.github\.io\/lk-design-system-(robotics|3d|editorial|slides)\/?/g, (_, family) => ({robotics:'/?path=/docs/lds-product-viewer-viewer-frame--docs','3d':'/?path=/docs/lds-product-viewer-3d-viewport-frame--docs',editorial:'/?path=/story/mds-content-editorial--cards',slides:'https://github.com/TheMomentLab/moment-design-system'}[family]))
    .replace(/https:\/\/lk-design-system\.github\.io\/lk-design-system\//g, '/')
    .replace(/https:\/\/github\.com\/LK-Design-System\/lk-design-system(?![-\w])/g, 'https://github.com/TheMomentLab/moment-design-system')
    .replace(/@lk-design-system\/lds-(core|theme|product)(\/[\w./*-]+)?/g, (_, layer, sub = '') => '@themomentlab/design-system' + (sub === '/styles.css' || !sub ? sub : '/' + layer + sub))
    .replace(/@lk-design-system(?=[\s)])/g, '@themomentlab/design-system')
    .replace(/\bLDS\b/g, 'MDS')
    .replace(/LK ROBOTICS|LK Robotics|LK Robotics Design System|주식회사 엘케이로보틱스|엘케이로보틱스/g, 'Moment Lab')
    .replace(/\bLK\b/g, 'Moment Lab');
}

export function momentDocument(value) {
 const visit=value=>typeof value==='string'?momentText(value):Array.isArray(value)?value.map(visit):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).map(([key,value])=>[key,visit(value)])):value;
 const data=visit(value);
 if (data?.foundations) {
  const color=data.foundations.find(item=>item.slug==='color');
  if(color) {
   color.purpose='MDS는 Moment Lab의 아이스 블루를 중심으로 연구 도구의 행동·선택·정보를 표현합니다. 브랜드 마크와 UI 전경의 명도를 분리하고 성공·경고·오류의 의미색은 유지합니다.';
   color.principles=['브랜드 마크는 --ml-brand, 일반 UI는 semantic 역할을 사용합니다.','주요 행동과 선택은 청록 계열로 통일합니다. 마크의 원색을 작은 글자에 직접 사용하지 않습니다.','성공·경고·오류는 실험 상태의 의미를 전달하며 브랜드 강조색으로 대체하지 않습니다.'];
   color.semanticModel=[['Brand','아이스 블루 마크 · --ml-brand'],['Primary','라이트 #00677D / 다크 #3695AC · 행동과 선택'],['Action surface','두 테마 모두 #00677D + 흰 글자 · 주요 버튼'],['Readable accent','라이트 #00677D / 다크 #79D8EA · 강조 전경'],['Surface','Paper #FBFBFA / Canvas #EDF5FB / Dark #07101A'],['Status','기존 성공·경고·오류 역할과 전경·배경 조합 유지']];
   color.selectionCriteria.unshift(['주요 행동과 선택','primary-normal 및 component alias','로고의 아이스 블루를 버튼 배경과 작은 글자에 그대로 적용']);
   color.examples=[['실험 실행','Primary 버튼으로 실행하고 처리 중에는 loading과 상태 이름을 함께 표시'],['실험 결과 비교','선택은 Primary, 결과 계열은 data-viz와 범례로 구분'],['센서 연결 끊김','오류 역할과 아이콘·연결 끊김 문구를 함께 표시'],['연구 기록','본문은 label-normal, 출처 링크는 읽기용 accent 사용']];
   color.tokens=['--ml-brand','--ml-action-accent','--ml-accent-text','--color-semantic-primary-*','--color-semantic-status-*','--component-*-bg/fg/border'];
   color.apis=['packages/moment/styles.css','scripts/generate-moment-theme.py','npm run check'];
  }
 }

 if(!data || !['theme-brand-lk-robotics-logo','theme-brand-product-lockup','theme-status-brand-spinner'].includes(data.slug))return data;
 const product=data.slug==='theme-brand-product-lockup',spinner=data.slug==='theme-status-brand-spinner';
 const property=(name,type,description,required=false)=>({name,type,description,required});
 return {
  slug:data.slug,title:spinner?'Brand Spinner':product?'Product Lockup':'Moment Lab Logo',storybookTitle:data.storybookTitle,layer:'Theme',family:spinner?'Status':'Brand',primaryOwner:data.primaryOwner,ownerComponents:data.ownerComponents,supportingComponents:[],
  purpose:spinner?'Moment Lab의 마크로 짧은 로딩 상태를 표시합니다.':product?'모먼트랩의 마크와 연구 도구 이름을 함께 표시합니다.':'1인 로봇 소프트웨어 연구소 Moment Lab의 마크와 워드마크를 표시합니다.',
  useWhen:[spinner?'브랜드 진입점처럼 출처가 의미 있는 짧은 대기에서 사용합니다.':'제품의 머리글과 탐색 영역에서 연구소 또는 도구의 이름을 표시합니다.'],
  avoidWhen:[spinner?'반복적인 데이터 갱신에는 circular를 사용하고 긴 대기에는 진행 정보와 설명을 제공합니다.':'기능 아이콘이나 반복 장식으로 쓰지 않습니다. 마크를 비균일하게 늘이거나 기울이지 않습니다.'],
  properties:spinner?[property('variant',"'circular' | 'brand'",'circular는 일반 링, brand는 Moment 마크를 표시합니다.'),property('size','number','마크의 크기(px), brand 기본값 22.'),property('label','ReactNode','사용자에게 보이는 상태 설명.')]:product?[property('product',"'console' | 'portal'",'구성 예시용 도구 이름입니다. 출시 상태나 별도 제품의 존재를 의미하지 않습니다.',true),property('compact','boolean','마크만 표시하고 접근성 이름은 유지합니다.'),property('appearance',"'positive' | 'reverse'",'밝은 배경 또는 어두운 배경에 맞는 단색을 선택합니다.'),property('height','number','자연 높이(px), 최소 16.'),property('decorative','boolean','이름을 제공하는 링크 안에서는 true.')]:[property('variant',"'mark' | 'inline' | 'stacked' | 'portal'",'마크, 가로형, 세로형 또는 도구 조합을 선택합니다.'),property('height','number','자연 높이(px), 최소 16. 좁은 부모에서는 비율을 유지합니다.'),property('tone',"'ink' | 'brand' | 'white' | 'current'",'현재 테마 전경, 흰색 또는 currentColor를 사용합니다.'),property('title','string','독립된 로고의 접근성 이름. 기본값 Moment Lab.'),property('decorative','boolean','인접 텍스트가 이름을 제공하면 true.')],
  states:[{state:spinner?'reduced motion':'좁은 너비',rule:spinner?'움직임 줄이기에서는 마크 애니메이션을 멈춥니다.':'비율과 읽는 순서를 유지합니다. 접힌 탐색 영역에는 mark 또는 compact를 사용합니다.'}],
  accessibility:[spinner?'role=status와 상태 이름으로 대기를 알립니다.':'독립된 SVG는 role=img와 접근성 이름을 제공하고 장식용은 aria-hidden으로 중복 낭독을 막습니다.'],
  tokens:['--ml-brand','--ml-font-display','--color-semantic-label-normal'],
 };
}
