"use client";

interface YouTubeAudioProps {
  youtubeId: string;
  playing: boolean;
  hidden?: boolean;
}

export function YouTubeAudio({
  youtubeId,
  playing,
  hidden = false,
}: YouTubeAudioProps) {
  const autoplay = playing ? 1 : 0;
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=${autoplay}&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${youtubeId}`;

  return (
    <div
      className={
        hidden
          ? "pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
          : "aspect-video w-full overflow-hidden rounded-2xl bg-black/40"
      }
    >
      <iframe
        key={`${youtubeId}-${playing}`}
        title="명상 음악"
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </div>
  );
}
