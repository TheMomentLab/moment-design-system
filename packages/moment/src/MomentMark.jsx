import React from 'react';

/**
 * MomentMark — the Moment Lab symbol.
 * A 270° arc (orbit), an arm to an off-axis mass, and a pivot:
 * "moment" as torque AND as a captured instant. Drawn on a 100×100
 * viewBox, round caps, single color. Tint with `color` (defaults to
 * currentColor so it inherits text color).
 */
export function MomentMark({
  size = 48,
  color = 'var(--ml-brand)',   // defaults to ICE BLUE; pass 'currentColor' to inherit
  strokeWidth,                 // optional override (of 100 viewBox)
  title = 'Moment Lab',
  decorative = false,
  style,
  ...rest
}) {
  // Keep the mark legible at tiny sizes by thickening the stroke.
  const sw = strokeWidth != null ? strokeWidth : (size <= 24 ? 7 : 6);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      stroke={color}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
      style={style}
      {...rest}
    >
      <circle cx="50" cy="50" r="30" strokeDasharray="141 80" />
      <line x1="50" y1="50" x2="71" y2="29" />
      <circle cx="71" cy="29" r={size <= 24 ? 9 : 8} fill={color} stroke="none" />
      <circle cx="50" cy="50" r={size <= 24 ? 6 : 5} fill={color} stroke="none" />
    </svg>
  );
}
