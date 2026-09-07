import * as React from 'react';
export * from '../../core/src/index.js';
export { Chip as Tag } from '../../core/src/components/feedback/Chip.js';
export interface MomentMarkProps extends Omit<React.SVGProps<SVGSVGElement>, 'color'> { size?: number; color?: string; strokeWidth?: number; title?: string; decorative?: boolean; }
export function MomentMark(props: MomentMarkProps): React.JSX.Element;
export interface LockupProps extends React.HTMLAttributes<HTMLDivElement> { layout?: 'horizontal' | 'stacked'; size?: 'sm' | 'md'; }
export function Lockup(props: LockupProps): React.JSX.Element;
export interface MonoLabelProps extends React.HTMLAttributes<HTMLDivElement> { translation?: string; }
export function MonoLabel(props: MonoLabelProps): React.JSX.Element;
export interface SourceTagProps extends React.HTMLAttributes<HTMLElement> { href?: string; label?: string; tone?: 'default' | 'onDark'; }
export function SourceTag(props: SourceTagProps): React.JSX.Element;
export interface EditorialCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> { category?: string; categoryLabel?: string; title: string; summary: string; source: { name: string; href?: string }; variant?: 'signal' | 'editorial'; headingLevel?: 2 | 3 | 4; }
export function EditorialCard(props: EditorialCardProps): React.JSX.Element;
