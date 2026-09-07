import React from 'react';
import { MomentMark } from './MomentMark.jsx';
import { Spinner as CoreSpinner } from '../../core/src/components/status/Spinner.jsx';

// Keep the inherited sizing/variant/ARIA prop surface; the artwork belongs to Moment Lab.
export function BrandLockup({variant='inline',tone='ink',color,height,title,decorative=false,style,...rest}) {
 const selected=['mark','stacked','inline','portal'].includes(variant)?variant:'inline';
 const h=Math.max(16,Number.isFinite(height)?height:selected==='stacked'?64:28);
 const stacked=selected==='stacked',mark=selected==='mark';
 const width=mark?100:stacked?300:selected==='portal'?600:440,viewHeight=stacked?170:100;
 const fill=color||(tone==='white'?'#FFFFFF':tone==='current'?'currentColor':'var(--color-semantic-label-normal)');
 const label=title??(selected==='portal'?'Moment Lab Portal':'Moment Lab');
 return <svg viewBox={`0 0 ${width} ${viewHeight}`} width={h*width/viewHeight} height={h} preserveAspectRatio="xMidYMid meet" data-lockup-variant={selected} role={decorative?undefined:'img'} aria-label={decorative?undefined:label} aria-hidden={decorative||undefined} {...rest} style={{display:'block',maxWidth:'100%',height:'auto',...style}}>
  <g transform={stacked?'translate(100 0)':undefined}><MomentMark size={100} color={fill} decorative/></g>
  {!mark&&<text x={stacked?150:108} y={stacked?143:65} textAnchor={stacked?'middle':'start'} fill={fill} fontFamily="var(--ml-font-display)" fontWeight="600" fontSize={stacked?40:46}>{selected==='portal'?'Moment Lab Portal':'Moment Lab'}</text>}
 </svg>;
}
export function BrandProductLockup({product,appearance='positive',height=28,compact=false,decorative=false,style,'aria-label':label,...rest}) {
 if(!['console','portal'].includes(product))throw new TypeError(`Unsupported ProductLockup product ${JSON.stringify(product)}. Use console or portal.`);
 const h=Math.max(16,height),fill=appearance==='reverse'?'#FFFFFF':appearance==='mono'?'currentColor':'var(--color-semantic-label-normal)';
 return <svg viewBox={`0 0 ${compact?100:520} 100`} width={h*(compact?1:5.2)} height={h} role={decorative?undefined:'img'} aria-hidden={decorative||undefined} aria-label={decorative?undefined:label??`Moment Lab ${product==='portal'?'Portal':'Console'}`} data-product-lockup="" data-product-lockup-product={product} data-product-lockup-mode={compact?'compact':'full'} data-product-lockup-wordmark={product.toUpperCase()} {...rest} style={{display:'block',maxWidth:'100%',height:'auto',...style}}>
  <MomentMark size={100} color={fill} decorative/>
  {!compact&&<><text x="108" y="47" fill={fill} fontFamily="var(--ml-font-display)" fontSize="36" fontWeight="600">Moment Lab</text><text x="110" y="79" fill={fill} fontFamily="var(--font-sans)" fontSize="25">{product==='portal'?'Portal':'Console'}</text></>}
 </svg>;
}
export function BrandSpinner({variant='circular',size,label,color,style,...rest}) {
 if(variant!=='brand')return <CoreSpinner variant={variant} size={size} label={label} color={color} style={style} {...rest}/>;
 return <span role="status" aria-live="polite" aria-label={label==null?'불러오는 중':undefined} style={{display:'inline-flex',alignItems:'center',gap:'var(--space-2)',...style}} {...rest}>
  <style>{'@keyframes mds-brand-pulse{50%{opacity:.35}}@media(prefers-reduced-motion:reduce){[data-mds-brand-spinner]{animation:none!important}}'}</style>
  <MomentMark size={size??22} color={color??'var(--ml-brand)'} decorative data-mds-brand-spinner style={{animation:'mds-brand-pulse 1.2s ease-in-out infinite'}}/>{label!=null&&<span>{label}</span>}
 </span>;
}
