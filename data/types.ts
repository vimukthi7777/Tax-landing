/** Shared types used across data files. */

export interface Cta {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
}

/** Text with a highlighted (#36BDDF) part, e.g. "Explore Our" + "Tax Services". */
export interface Heading {
  before?: string;
  accent: string;
  after?: string;
}

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "x"
  | "spotify";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}
