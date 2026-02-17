import React from 'react';
import type { PosIconProps } from './types.js';
import { getIcon } from './search.js';

export function PosIcon({ id, size = 256, className, alt }: PosIconProps): React.ReactElement | null {
  const entry = getIcon(id);
  if (!entry) {
    console.warn(`PosIcon: Unknown icon id "${id}"`);
    return null;
  }

  return (
    <img
      src={entry.dataUri}
      width={size}
      height={size}
      alt={alt ?? entry.id}
      className={className}
      loading="lazy"
    />
  );
}
