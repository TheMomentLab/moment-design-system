import * as React from 'react';
export * from '../../core/src/index.js';
export * from '../../theme/src/index.js';
export * from '../../product/src/index.js';
export { LdsProvider as MdsProvider, useLdsRuntime as useMdsRuntime, LdsColorSchemeScript as MdsColorSchemeScript } from '../../theme/src/components/selection/LdsProvider.js';
export interface MomentMarkProps extends Omit<React.SVGProps<SVGSVGElement>, 'color'> { size?: number; color?: string; strokeWidth?: number; title?: string; decorative?: boolean; }
export function MomentMark(props: MomentMarkProps): React.JSX.Element;
export interface MomentLockupProps extends React.HTMLAttributes<HTMLDivElement> { layout?: 'horizontal' | 'stacked'; size?: 'sm' | 'md'; }
export function MomentLockup(props: MomentLockupProps): React.JSX.Element;
export interface MonoLabelProps extends React.HTMLAttributes<HTMLDivElement> { translation?: string; }
export function MonoLabel(props: MonoLabelProps): React.JSX.Element;
export interface MomentSourceTagProps extends React.HTMLAttributes<HTMLElement> { href?: string; label?: string; tone?: 'default' | 'onDark'; }
export function MomentSourceTag(props: MomentSourceTagProps): React.JSX.Element;
export interface EditorialCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> { category?: string; categoryLabel?: string; title: string; summary: string; source: { name: string; href?: string }; variant?: 'signal' | 'editorial'; headingLevel?: 2 | 3 | 4; }
export function EditorialCard(props: EditorialCardProps): React.JSX.Element;
