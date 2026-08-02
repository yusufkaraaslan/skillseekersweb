/**
 * Sponsor data loader.
 *
 * `sponsors.json` in the Skill_Seekers repo is the single source of truth
 * (see SPONSORSHIP.md there). At build time we fetch it so the site can never
 * drift from the READMEs; `src/data/sponsors.json` is a committed fallback so
 * a network hiccup can't break the build.
 *
 * Logos are served from this repo's `public/sponsors/` for speed — the file
 * name is taken from the basename of the logo path in sponsors.json.
 */

import fallback from '../data/sponsors.json';

const SPONSORS_JSON_URL =
  'https://raw.githubusercontent.com/yusufkaraaslan/Skill_Seekers/HEAD/sponsors.json';

export interface Sponsor {
  name: string;
  url: string;
  logo: string;
  width?: number;
  blurb?: string;
  note?: string;
}

export interface SponsorData {
  contact: string;
  sponsors_url: string;
  partners: Sponsor[];
  platinum: Sponsor[];
  gold: Sponsor[];
  silver: Sponsor[];
  bronze: Sponsor[];
  supporters: string[];
}

/** Tiers that get a logo on the website (Silver and above, per SPONSORSHIP.md). */
export const WEB_TIERS = ['partners', 'platinum', 'gold', 'silver'] as const;
export type WebTier = (typeof WEB_TIERS)[number];

/** Logo width in px per tier — Gold large, Silver medium. */
export const TIER_WIDTH: Record<WebTier, number> = {
  partners: 220,
  platinum: 220,
  gold: 190,
  silver: 150,
};

/** Map a repo-relative logo path to this site's public asset. */
export function logoSrc(sponsor: Sponsor): string {
  return `/sponsors/${sponsor.logo.split('/').pop()}`;
}

export async function getSponsors(): Promise<SponsorData> {
  try {
    const res = await fetch(SPONSORS_JSON_URL);
    if (res.ok) return (await res.json()) as SponsorData;
    console.warn(`[sponsors] upstream returned ${res.status}; using committed fallback`);
  } catch (err) {
    console.warn('[sponsors] fetch failed; using committed fallback:', err);
  }
  return fallback as unknown as SponsorData;
}

/** True when there is at least one sponsor to show on the website. */
export function hasWebSponsors(data: SponsorData): boolean {
  return WEB_TIERS.some((tier) => (data[tier] ?? []).length > 0);
}
