"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { KenBurnsBackground } from "@/components/KenBurnsBackground";
import { YouTubeAudio } from "@/components/YouTubeAudio";
import { getEnvironment } from "@/data/environments";
import { getDefaultTrackForEnvironment } from "@/data/music";
import { toDateKey, toTimeLabel } from "@/lib/dates";
import { addCompletedSession, getPreferences, savePreferences } from "@/lib/storage";
import type { EnvironmentId } from "@/types/meditation";

function PlayContent() {
  const router = useRouter();
  const params = useSearchParams();
  const duration = Math.max(1, Number(params.get("duration") || 10));
  const quick = params.get("quick") === "1";
  const environment = (params.get("environment") || "forest") as EnvironmentId;
  const env = getEnvironment(environment);
  const track = getDefaultTrackForEnvironment(environment);
  const totalSeconds = quick ? duration : duration * 60;

  const [remaining, setRemaining] = useState(totalSeconds);
  const [paused, setPaused] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [ready, setReady] = useState(false);
  const startedAt = useRef(toTimeLabel());
  const finished = useRef(false);

  useEffect(() => {
    const prefs = getPreferences();
    setMusicOn(prefs.musicOn);
    setReady(true);
    savePreferences({
      lastEnvironment: environment,
      lastMusicId: track.id,
    });
  }, [environment, track.id]);

  useEffect(() => {
    if (!ready || paused) return;
    const timer = window.setInterval(() => {
      setRemaining((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [paused, ready]);

  useEffect(() => {
    if (!ready || remaining > 0 || finished.current) return;
    finished.current = true;
    addCompletedSession({
      date: toDateKey(),
      startedAt: startedAt.current,
      duration,
      environment,
    });
    router.replace(
      `/meditate/complete?duration=${duration}&environment=${environment}`,
    );
  }, [remaining, duration, environment, router, ready]);

  const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <KenBurnsBackground
        src={env.image}
        srcSet={env.imageSrcSet}
        alt={env.name}
      />
      {ready ? (
        <YouTubeAudio
          youtubeId={track.youtubeId}
          playing={musicOn && !paused}
          hidden
        />
      ) : null}
      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <p className="text-sm tracking-[0.24em] text-white/65">{env.name}</p>
        <p className="mt-6 text-7xl font-light tracking-widest md:text-8xl">
          {minutes}:{seconds}
        </p>
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="glass min-h-14 min-w-32 rounded-full px-6"
          >
            {paused ? "계속하기" : "일시정지"}
          </button>
          <button
            type="button"
            onClick={() => {
              const next = !musicOn;
              setMusicOn(next);
              savePreferences({ musicOn: next });
            }}
            className="glass min-h-14 min-w-32 rounded-full px-6"
          >
            음악 {musicOn ? "OFF" : "ON"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="glass min-h-14 min-w-32 rounded-full px-6"
          >
            명상 종료
          </button>
        </div>
      </div>
    </main>
  );
}

export default function PlayPage() {
  return (
    <Suspense>
      <PlayContent />
    </Suspense>
  );
}
