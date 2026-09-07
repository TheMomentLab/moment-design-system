import React from 'react';
import { Lockup, MomentMark, Overline } from '../packages/moment/src/index.jsx';
import { storyDescription } from './StoryGuide.shared.jsx';
export default {
 id:'lds-theme-brand-lk-robotics-logo',title:'MDS Theme/Brand/Moment Lab Logo',tags:['autodocs'],component:Lockup,
 parameters:{storyGuide:{storyId:'lds-theme-brand-lk-robotics-logo--lk-robotics-logo',eyebrow:'Theme / Brand',title:'Moment Lab의 마크와 락업',description:'1인 로봇 소프트웨어 연구소의 정체성을 마크·가로형·세로형으로 표현합니다. 컴포넌트 구조와 상태 규칙은 MDS의 공통 규격을 따릅니다.'},docs:{description:{component:'모먼트랩의 원, 회전축과 팔을 표현한 마크. 원형 비율을 유지하고 밝고 어두운 표면에서 읽을 수 있는 단색으로 사용합니다.'}}}
};
export const LKRoboticsLogo={name:'개요',parameters:storyDescription('Moment Lab의 실제 마크와 락업을 크기·배경·배치별로 비교합니다.'),render:()=> <main style={{display:'grid',gap:'var(--space-6)',maxWidth:900}}>
 <section><h2>마크</h2><div style={{display:'flex',alignItems:'center',gap:'var(--space-6)'}}>{[16,24,48,80].map(size=><MomentMark key={size} size={size}/>)}</div></section>
 <section style={{display:'flex',alignItems:'center',gap:'var(--space-6)',flexWrap:'wrap'}}><Lockup height={32}/><Lockup variant="stacked" height={80}/><Lockup variant="mark" height={48}/></section>
 <section data-theme="dark" style={{padding:'var(--space-5)',background:'var(--ml-dark-bg)',borderRadius:'var(--radius-md)'}}><Lockup tone="white" height={32}/></section>
 <section><h2>사용 규칙</h2><ul><li>마크를 늘이거나 기울이지 않습니다.</li><li>독립된 로고는 Moment Lab이라는 접근성 이름을 제공합니다.</li><li>이름이 있는 링크 안에서는 decorative를 사용합니다.</li><li>원본 SVG와 브랜드 팔레트는 포함된 assets에서 사용합니다.</li></ul></section>
 </main>,play:async({canvasElement})=>{
 const logos=canvasElement.querySelectorAll('[data-lockup-variant]');if(logos.length!==4)throw Error('Four Moment logo variants are required');
 for(const logo of logos){if(logo.getAttribute('role')!=='img'||logo.getAttribute('aria-label')!=='Moment Lab')throw Error('Moment logos must have a brand name');if(!logo.querySelector('circle'))throw Error('Moment mark geometry is required');}
 }};
export const LockupOverlineCard={name:'Lockup · Overline card parity',tags:['!dev','visual-parity'],render:()=> <main style={{display:'grid',gap:'var(--space-5)'}}><Lockup height={32}/><Overline>RESEARCH · BUILD · SHARE</Overline></main>};
