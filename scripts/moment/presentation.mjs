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
