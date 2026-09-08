import React from 'react';
import { Card } from '../../core/src/components/cards/Card.jsx';
import { SourceTag as CoreSourceTag } from '../../core/src/components/content/SourceTag.jsx';
import { Overline } from '../../core/src/components/content/Overline.jsx';
import { MomentMark } from './MomentMark.jsx';

export function MomentLockup({ layout = 'horizontal', size = 'md', className = '', ...rest }) {
  return <div className={`ml-lockup ml-lockup--${layout} ml-lockup--${size} ${className}`} {...rest}>
    <MomentMark size={size === 'sm' ? 36 : 64} decorative />
    <span className="ml-lockup__name">MOMENT LAB<span className="ml-lockup__subtitle">1인 로봇 소프트웨어 연구소</span></span>
  </div>;
}

export function MonoLabel({ children, translation, ...rest }) {
  return <Overline {...rest} className={`ml-mono-label ${rest.className || ''}`}>
    <span lang="en">{children}</span>{translation && <><span aria-hidden="true"> · </span><span className="ml-mono-label__ko" lang="ko">{translation}</span></>}
  </Overline>;
}

export function MomentSourceTag({ children, href, className = '', ...rest }) {
  // Source attribution is readable with or without a URL; only an actual URL creates a link.
  return <CoreSourceTag {...rest} href={href} className={`ml-source-tag ${className}`}>
    {children}{href && <span className="ml-sr-only"> (새 탭에서 원문 열기)</span>}
  </CoreSourceTag>;
}

export function EditorialCard({ category = 'ROBOTICS', categoryLabel = '로보틱스', title, summary, source, variant = 'editorial', headingLevel = 3, className = '', ...rest }) {
  const Heading = `h${headingLevel}`;
  return <Card {...rest} as="article" interactive={false} className={`ml-editorial-card ml-editorial-card--${variant} ${className}`}>
    <MonoLabel translation={categoryLabel}>{category}</MonoLabel>
    <Heading className="ml-editorial-card__title">{title}</Heading>
    <p className="ml-editorial-card__summary">{summary}</p>
    <footer className="ml-editorial-card__source"><MomentSourceTag href={source.href}>{source.name}</MomentSourceTag></footer>
  </Card>;
}
