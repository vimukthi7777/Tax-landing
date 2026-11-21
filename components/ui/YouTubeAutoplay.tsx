"use client";

import { useEffect, useRef, useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

/**
 * YouTube embed that autoplays (muted + loop, as browsers require) once it
 * scrolls into view and pauses when it leaves. Includes a sound toggle.
 */
export function YouTubeAutoplay({ videoId, title }: { videoId: string; title: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);

  const command = (func: string) =>
    frame.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "https://www.youtube.com",
    );

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true); // first time: iframe mounts with autoplay=1
          command("playVideo");
        } else {
          command("pauseVideo");
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    command(muted ? "unMute" : "mute");
    if (muted) command("playVideo");
    setMuted(!muted);
  };

  const src =
    `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}` +
    `&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`;

  return (
    <div
      ref={wrap}
      className="relative aspect-video w-full overflow-hidden bg-[#4a4a4a] lg:absolute lg:inset-0 lg:aspect-auto"
    >
      {loaded && (
        <iframe
          ref={frame}
          src={src}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute left-1/2 top-1/2 aspect-video h-full min-w-full -translate-x-1/2 -translate-y-1/2"
        />
      )}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-white/85 text-black shadow-md backdrop-blur transition-transform hover:scale-105"
      >
        {muted ? <FiVolumeX className="size-5" /> : <FiVolume2 className="size-5" />}
      </button>
    </div>
  );
}
