export interface Country {
  flags: { png: string };
  idd: { root: string; suffixes?: string[] };
  region: string;
}
