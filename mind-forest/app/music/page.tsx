"use client";

import { useMemo, useState } from "react";
import { YouTubeAudio } from "@/components/YouTubeAudio";
import { KenBurnsBackground } from "@/components/KenBurnsBackground";
import { MUSIC_CATEGORIES, MUSIC_TRACKS } from "@/data/music";
import { youtubeThumb } from "@/lib/media";
import { savePreferences } from "@/lib/storage";
import { useTheme } from "@/lib/use-theme";

export default function MusicPage() {
  const theme = useTheme();
  const featured = MUSIC_TRACKS.find((track) => track.featured) ?? MUSIC_TRACKS[0];
  const [activeId, setActiveId] = useState(featured.id);
  const [playing, setPlaying] = useState(false);
  const active = useMemo(
    () => MUSIC_TRACKS.find((track) => track.id === activeId) ?? featured,
    [activeId, featured],
  );

  function playTrack(id: string) {
    setActiveId(id);
    setPlaying(true);
    savePreferences({ lastMusicId: id, musicOn: true });
  }

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <KenBurnsBackground src={theme.image} alt={theme.label} />
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-28 pt-24 md:pt-32">
        <header className="fade-in mb-8 text-center">
          <p className="text-sm tracking-[0.22em] text-white/60">MUSIC</p>
          <h1 className="mt-2 text-4xl font-medium">오늘의 소리</h1>
        </header>

        <section className="glass fade-in rounded-3xl p-5">
          <p className="text-sm text-white/60">오늘의 추천</p>
          <h2 className="mt-1 text-2xl">🌿 {featured.title}</h2>
          <p className="mt-2 text-white/70">{featured.description}</p>
          <button
            type="button"
            onClick={() => playTrack(featured.id)}
            className="mt-4 min-h-12 rounded-full border border-white/25 bg-[#161c18] px-5 text-sm font-medium text-[#f4f1ea]"
          >
            추천 명상 재생
          </button>
          <div className="mt-5">
            <p className="mb-2 text-sm text-white/70">지금 선택 · {active.title}</p>
            <YouTubeAudio youtubeId={active.youtubeId} playing={playing} />
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                className="glass min-h-12 rounded-full px-5 text-sm"
              >
                {playing ? "일시정지" : `${active.title} 재생`}
              </button>
            </div>
          </div>
        </section>

        {MUSIC_CATEGORIES.map((category) => {
          const tracks = MUSIC_TRACKS.filter(
            (track) => track.category === category.id,
          );
          if (tracks.length === 0) return null;
          return (
            <section key={category.id} className="mt-8">
              <h2 className="mb-3 text-lg text-white/80">{category.label}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {tracks.map((track) => (
                  <article key={track.id} className="glass overflow-hidden rounded-3xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={youtubeThumb(track.youtubeId)}
                      alt={track.title}
                      className="h-36 w-full object-cover"
                    />
                    <div className="p-4">
                      <p className="text-lg">{track.title}</p>
                      <p className="mt-1 text-sm text-white/60">
                        {track.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => playTrack(track.id)}
                        className="mt-4 min-h-12 rounded-full border border-white/25 bg-[#161c18] px-4 text-sm font-medium text-[#f4f1ea]"
                      >
                        재생
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
