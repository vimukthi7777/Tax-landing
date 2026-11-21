import type { IconType } from "react-icons";
import { FaFacebook, FaInstagram, FaLinkedin, FaSpotify, FaYoutube } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import type { SocialPlatform } from "@/data/types";

const icons: Record<SocialPlatform, IconType> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  x: FaXTwitter,
  spotify: FaSpotify,
};

export function SocialIcon({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const Icon = icons[platform];
  return <Icon aria-hidden className={className} />;
}
