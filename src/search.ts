import type { PosIconEntry } from './types.js';
import indexData from '../data/index.json' with { type: 'json' };

const index: PosIconEntry[] = indexData as PosIconEntry[];

export function searchIcons(query: string): PosIconEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return index.filter((entry) =>
    entry.terms.some((term) => term.includes(q))
  );
}

export function getIcon(id: string): PosIconEntry | undefined {
  return index.find((entry) => entry.id === id);
}

export function getAllIcons(): PosIconEntry[] {
  return [...index];
}
