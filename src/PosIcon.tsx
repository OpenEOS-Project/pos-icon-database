import React from 'react';
import type { PosIconProps } from './types.js';
import { getIcon } from './search.js';

export function PosIcon({ id, size = 256, className, alt }: PosIconProps): React.ReactElement | null {
  const entry = getIcon(id);
  if (!entry) {
    console.warn(`PosIcon: Unknown icon id "${id}"`);
    return null;
  }

  // Build path relative to the package root
  const iconSrc = new URL(`../icons/256/${entry.icon256}`, import.meta.url).href;

  return (
    <img
      src={iconSrc}
      width={size}
      height={size}
      alt={alt ?? entry.id}
      className={className}
      loading="lazy"
    />
  );
}
