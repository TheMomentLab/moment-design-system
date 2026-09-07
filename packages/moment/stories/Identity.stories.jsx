import React from 'react';
import { MomentLockup, MomentMark, MonoLabel } from '../src/index.jsx';
import { Header } from './shared.jsx';
export default { title: 'MDS/Foundation/Identity', parameters: { docs: { description: { component: 'Moment Lab은 1인 로봇 소프트웨어 연구소입니다. MDS는 연구 도구, 제품, 운영 화면과 연구 기록을 위한 LDS 전체 계승 디자인 시스템입니다.' } } } };
export const Identity = { name: '모먼트랩', render: () => <div>
  <Header title="Moment Lab">1인 로봇 소프트웨어 연구소. 연구에서 구현까지 이어지는 디자인 시스템.</Header>
  <section className="ml-identity-hero" data-theme="dark">
    <MomentLockup/>
    <div className="ml-identity-hero__mark"><MomentMark size={520} decorative/></div>
    <h2>로봇 소프트웨어를<br/>연구하고 만듭니다.</h2>
    <p>RESEARCH · BUILD · SHARE</p>
  </section>
  <h2>연구와 개발을 잇는 공통 기반</h2>
  <div className="ml-specimen-grid">
    <section className="ml-specimen-panel"><MonoLabel translation="연구와 구현">RESEARCH & BUILD</MonoLabel><h2>도구부터 제품까지</h2><p>로봇 소프트웨어 연구, 실험 도구, 개발 인터페이스와 운영 화면에 같은 기반을 사용합니다.</p></section>
    <section className="ml-specimen-panel"><MonoLabel translation="기록과 공유">DOCUMENT & SHARE</MonoLabel><h2>과정과 근거를 함께</h2><p>연구 기록, 기술 문서, 프로젝트 소개와 미디어 콘텐츠를 만듭니다. 콘텐츠 발행은 연구소 활동의 한 부분입니다.</p></section>
  </div>
</div> };
export const Marks = { name: '마크와 최소 크기', render: () => <div><Header title="Moment mark">회전축, 팔, 질량과 호. 모멘트와 포착된 순간을 담는 하나의 단색 마크.</Header><div className="ml-specimen-grid">{['light','dark'].map(theme=><section key={theme} data-theme={theme} className="ml-specimen-panel"><div className="ml-specimen-row">{[16,24,44,100].map(size=><div key={size}><MomentMark size={size}/><p className="ml-token-name">{size}px</p></div>)}</div></section>)}</div></div> };
export const Lockups = { name: '락업', render: () => <div><Header title="Moment lockup">연구소의 심볼과 워드마크. LDS의 기존 Lockup API는 그대로 제공하고, 모먼트랩 조합형은 MomentLockup으로 사용합니다.</Header><div className="ml-specimen-grid"><section className="ml-specimen-panel"><MomentLockup/></section><section className="ml-specimen-panel" data-theme="dark"><MomentLockup layout="stacked"/></section></div><h2>작은 조합형</h2><MomentLockup size="sm"/></div> };
