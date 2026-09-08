import React from 'react';
import {BrandPage,BrandSection,BrandTable} from './BrandFormat.jsx';
export default {id:'mds-foundation-spacing',title:'MDS Theme/Brand/Moment Lab/Spacing'};
export const Scale={name:'공통 간격과 모서리',render:()=> <BrandPage title="간격 · 모서리 · 효과" description="브랜드 색상과 자산 외의 시각 규격은 LDS를 그대로 사용합니다."><BrandSection title="공통 간격"><BrandTable heads={['토큰','값']} rows={[1,2,3,4,5,6,7,8,9].map(i=>[`--space-${i}`,`${i*4}px`])}/></BrandSection><BrandSection title="공통 모서리"><BrandTable heads={['역할','토큰']} rows={[["컴포넌트 크기별 모서리",'--component-*-radius-*'],['표면','--radius-*'],['그림자','--shadow-*']]}/></BrandSection><BrandSection title="적용 원칙"><p>별도 editorial 모드의 둥근 버튼이나 독립 간격·그림자 규격은 적용하지 않습니다. 기존 --ml-* 간격·모서리 이름은 대응하는 공통 토큰의 별칭입니다.</p></BrandSection></BrandPage>};
