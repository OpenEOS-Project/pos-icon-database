export interface PosIconEntry {
  id: string;
  terms: string[];
  icon256: string;
  dataUri: string;
}

export interface PosIconProps {
  id: string;
  size?: number;
  className?: string;
  alt?: string;
}
