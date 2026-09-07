import React from 'react';
import { Header } from './shared.jsx';
export default { id: 'mds-foundation-spacing', title:'MDS Theme/Brand/Moment Lab/Spacing'};
export const Scale={name:'간격과 모서리',render:()=> <div><Header title="Spacing & shape">4px 단위의 리듬. 콘텐츠를 구분하는 여백과 얇은 선.</Header>{[4,8,12,16,24,32,48,64,84].map((size,i)=><div className="ml-spacing-row" key={size}><code className="ml-token-name">space-{i+1}</code><div className="ml-spacing-bar" style={{width:size}}/><span>{size}</span></div>)}<h2>모서리</h2><div className="ml-specimen-row">{[['Inset',8],['Card',12],['Brand tile',24],['Pill',999]].map(([name,radius])=><div className="ml-specimen-panel" style={{borderRadius:radius,padding:24}} key={name}>{name} · {radius}px</div>)}</div></div>};
