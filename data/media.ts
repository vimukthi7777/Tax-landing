import type { Cta } from "./types";

/** "Appoint Your Tax Agent…" section with the autoplay YouTube video. */
export const agentVideo = {
  id: "tax-agent",
  title: "Appoint Your Tax Agent from Anywhere",
  titleAccent: "in Sri Lanka",
  description:
    "You can now appoint a Chartered Accountant as your tax agent from anywhere in Sri Lanka. Access and review your documents online, with 100% dedicated service and expert support.",
  cta: { label: "Request Details", href: "#contact" } satisfies Cta,
  youtubeId: "qC8bQeNqJuY",
  youtubeUrl: "https://www.youtube.com/watch?v=qC8bQeNqJuY",
  /** Browsers block unmuted autoplay: start muted + loop, offer a sound toggle. */
  autoplay: { muted: true, loop: true, startOnScroll: true },
};

export interface PodcastCard {
  id: string;
  platform: "youtube" | "spotify";
  title: string;
  titleAccent: string;
  titleAfter: string;
  description: string;
  cta: Cta;
  /** Phone mockup that floats up/down. */
  mockup: string;
  /** Wavy colored background behind the mockup. */
  mockupBg: string;
  /** Platform icon inside the button. */
  icon: string;
}

export const podcast: PodcastCard[] = [
  {
    id: "podcast",
    platform: "youtube",
    title: "Watch Our",
    titleAccent: "Tax Weekly",
    titleAfter: "Podcast",
    description:
      "Stay updated on the latest tax changes in Sri Lanka with our Weekly Podcast on YouTube. Get timely insights, expert analysis, and key updates.",
    // TODO: replace with the real channel / podcast URL.
    cta: { label: "Watch on YouTube", href: "#" },
    mockup: "/img/yt-spotify/yt-mockup.svg",
    mockupBg: "/img/yt-spotify/yt-mockup-bg.svg",
    icon: "/img/yt-spotify/yt-icon.svg",
  },
  {
    id: "podcast-spotify",
    platform: "spotify",
    title: "Listen to Our",
    titleAccent: "Tax Weekly",
    titleAfter: "Podcast",
    description:
      "Stay updated on the latest tax changes in Sri Lanka with our Weekly Podcast on Spotify. Get timely insights, expert analysis, and key updates.",
    // TODO: replace with the real Spotify show URL.
    cta: { label: "Listen on Spotify", href: "#" },
    mockup: "/img/yt-spotify/spotify-mockup.svg",
    mockupBg: "/img/yt-spotify/spotify-mockup-bg.svg",
    icon: "/img/yt-spotify/Spotify-icon.svg",
  },
];

/** Float animation config for the mockups (little up/down motion). */
export const mockupFloat = {
  distance: 10, // px (keep < the tuck-under offset so the mockup bottom never shows)
  duration: 2.6, // s per half cycle
  /** Offset second mockup so they don't move in sync. */
  stagger: 0.8,
};
