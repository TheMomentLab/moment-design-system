import {BrandPage,BrandSection,BrandGrid,BrandPanel,BrandTable} from '../packages/moment/stories/BrandFormat.jsx';
import React from 'react';
import { Lockup, MomentMark, Overline } from '../packages/moment/src/index.jsx';
import { storyDescription } from './StoryGuide.shared.jsx';
export default {
 id:'lds-theme-brand-lk-robotics-logo',title:'MDS Theme/Brand/Moment Lab Logo',tags:['autodocs'],component:Lockup,
 parameters:{storyGuide:{storyId:'lds-theme-brand-lk-robotics-logo--lk-robotics-logo',eyebrow:'Theme / Brand',title:'Moment Lab의 마크와 락업',description:'1인 로봇 소프트웨어 연구소의 정체성을 마크·가로형·세로형으로 표현합니다. 컴포넌트 구조와 상태 규칙은 MDS의 공통 규격을 따릅니다.'},docs:{description:{component:'모먼트랩의 원, 회전축과 팔을 표현한 마크. 원형 비율을 유지하고 밝고 어두운 표면에서 읽을 수 있는 단색으로 사용합니다.'}}}
};
export const LKRoboticsLogo={name:'개요',parameters:storyDescription('Moment Lab의 실제 마크와 락업을 크기·배경·배치별로 비교합니다.'),render:()=> <BrandPage heading={false}>
 <BrandSection title="워드마크 · 표기 제작 규정"><p>Moment Lab을 Space Grotesk 600으로 조합합니다. SVG 마크는 제공된 원본 geometry를 유지합니다. 법인명 조합이나 아웃라인 워드마크는 현재 제공하지 않습니다.</p></BrandSection>
 <BrandSection title="심볼 construction verification"><BrandPanel><MomentMark size={100}/><BrandTable heads={['요소','원본 좌표']} rows={[["viewBox",'0 0 100 100'],['원호','중심 (50, 50), 반지름 30'],['팔','(50, 50) → (71, 29)'],['질량','(71, 29), 반지름 8'],['축','(50, 50), 반지름 5']]}/></BrandPanel></BrandSection>
 <BrandSection title="공식 SVG 자산"><BrandPanel><MomentMark size={80}/><a href="/moment-assets/moment-mark.svg">Moment 마크 SVG</a><p>마크 원본과 UI 조합형은 구분합니다. UI 락업은 원본 마크와 웹폰트로 렌더링합니다.</p></BrandPanel></BrandSection>
 <BrandSection title="제품 UI 파생형"><BrandGrid>{['inline','stacked','mark'].map(variant=><BrandPanel key={variant}><strong>{variant}</strong><Lockup variant={variant} height={variant==='stacked'?80:32}/></BrandPanel>)}</BrandGrid></BrandSection>
 <BrandSection title="변형 선택과 최소 크기"><BrandTable heads={['변형','사용 슬롯','표시 기준']} rows={[["mark",'브랜드가 이미 식별되는 좁은 영역','높이 16px 이상'],['inline','가로 헤더','높이 16px 이상, 기본 28px'],['stacked','세로형 슬롯','기본 64px']]}/><p>컴포넌트의 크기 하한과 모든 매체에서의 광학 승인은 다릅니다. 작은 출력에서 세부 형태를 확인합니다.</p></BrandSection>
 <BrandSection title="Positive · Reverse · Mono · 배경"><BrandGrid><BrandPanel><MomentMark size={48} color="var(--color-semantic-label-normal)"/><span>Positive · 현재 전경</span></BrandPanel><BrandPanel theme="dark"><Lockup tone="white" height={32}/><span>Reverse · 흰색</span></BrandPanel><BrandPanel><MomentMark size={48} color="currentColor"/><span>Mono · 단색</span></BrandPanel></BrandGrid></BrandSection>
 <BrandSection title="여백 (Clear space)"><p>인접 텍스트·기능 아이콘과 겹치지 않도록 슬롯에 여백을 확보합니다. Moment의 고유 0.5X/1X 규격은 확정하지 않았으므로 원본 회사의 수치를 승인된 Moment 규정으로 옮기지 않습니다.</p></BrandSection>
 <BrandSection title="파비콘 타일"><p>현재 마크 SVG를 제공합니다. 브라우저별 파비콘 세트는 아직 별도 제공하지 않습니다.</p></BrandSection>
 <BrandSection title="공식 사각 로고 · 크기별 확인"><div style={{display:'flex',gap:'var(--space-4)',alignItems:'end',flexWrap:'wrap'}}>{[16,24,48,80].map(size=><div key={size}><MomentMark size={size}/><p>{size}px</p></div>)}</div><p>마크의 슬롯 크기 비교입니다. 플랫폼용 사각 앱 아이콘 승인과는 구분합니다.</p></BrandSection>
 <BrandSection title="가로형 배너"><p>고정 배너 SVG는 미제공입니다. 제품 헤더는 inline Lockup을 사용합니다.</p></BrandSection>
 <BrandSection title="금지 사용"><BrandTable heads={['피할 사용','이유']} rows={[["비균일 확대·회전",'원본 비율과 방향 유지'],['반복 기능 아이콘','브랜드와 기능의 구분'],['좁은 슬롯에 전체 워드마크 강제 삽입','읽기 어려우면 mark로 전환']]}/></BrandSection>
 <BrandSection title="플랫폼 전달 상태"><BrandTable heads={['대상','상태']} rows={[["웹 UI",'SVG 마크·Lockup·웹폰트 제공'],['파비콘 / 앱 아이콘 세트','별도 미제공'],['Figma 라이브러리','별도 미제공']]}/></BrandSection>
 </BrandPage>,play:async({canvasElement})=>{
 const logos=canvasElement.querySelectorAll('[data-lockup-variant]');if(logos.length!==4)throw Error('Four Moment logo variants are required');
 for(const logo of logos){if(logo.getAttribute('role')!=='img'||logo.getAttribute('aria-label')!=='Moment Lab')throw Error('Moment logos must have a brand name');if(!logo.querySelector('circle'))throw Error('Moment mark geometry is required');}
 }};
export const LockupOverlineCard={name:'Lockup · Overline card parity',tags:['!dev','visual-parity'],render:()=> <main style={{display:'grid',gap:'var(--space-5)'}}><Lockup height={32}/><Overline>RESEARCH · BUILD · SHARE</Overline></main>};
