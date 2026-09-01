"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { DURATIONS, ENVIRONMENTS } from "@/data/environments";
import { KenBurnsBackground } from "@/components/KenBurnsBackground";
import { getPreferences, savePreferences } from "@/lib/storage";
import { useTheme } from "@/lib/use-theme";
import type { EnvironmentId } from "@/types/meditation";

function MeditateContent() {
  const router = useRouter();
  const params = useSearchParams();
  const preset = Number(params.get("duration"));
  const [duration, setDuration] = useState(
    DURATIONS.includes(preset as (typeof DURATIONS)[number]) ? preset : 10,
  );
  const [environment, setEnvironment] = useState<EnvironmentId>("forest");
  const theme = useTheme();

  useEffect(() => {
    const prefs = getPreferences();
    if (!DURATIONS.includes(preset as (typeof DURATIONS)[number])) {
      setDuration(prefs.preferredDuration || 10);
    }
    setEnvironment(prefs.lastEnvironment || "forest");
  }, [preset]);

  function start() {
    savePreferences({
      preferredDuration: duration,
      lastEnvironment: environment,
    });
    router.push(
      `/meditate/play?duration=${duration}&environment=${environment}`,
    );
  }

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <KenBurnsBackground src={theme.image} alt={theme.label} />
      <div className="relative z-20 mx-auto max-w-4xl px-6 pb-28 pt-24 md:pt-32">
        <section className="fade-in">
          <p className="text-center text-sm tracking-[0.2em] text-white/60">
            MEDITATE
          </p>
          <h1 className="mt-3 text-center text-3xl font-medium md:text-4xl">
            얼마나 쉬어갈까요?
          </h1>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {DURATIONS.map((item) => {
              const selected = duration === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setDuration(item)}
                  className={`relative z-20 min-h-20 cursor-pointer rounded-3xl text-xl font-medium transition duration-300 ${
                    selected
                      ? "bg-[#f4f1ea] text-[#141a16]"
                      : "glass text-white hover:bg-white/15"
                  }`}
                >
                  {item}분
                </button>
              );
            })}
          </div>

          <h2 className="mt-12 text-center text-3xl font-medium md:text-4xl">
            어디에서 명상하고 싶나요?
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ENVIRONMENTS.map((item) => {
              const selected = environment === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setEnvironment(item.id)}
                  className={`relative z-20 cursor-pointer overflow-hidden rounded-3xl text-left transition duration-300 ${
                    selected
                      ? "ring-2 ring-[#f4f1ea]"
                      : "ring-1 ring-white/15 hover:ring-white/40"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full object-cover"
                  />
                  <div className="glass px-4 py-4">
                    <p className="text-lg text-white">{item.name}</p>
                    <p className="mt-1 text-sm text-white/65">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={start}
              className="min-h-14 min-w-44 cursor-pointer rounded-full border border-white/25 bg-[#161c18] px-8 font-medium text-[#f4f1ea]"
            >
              {duration}분 · 명상 시작
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function MeditatePage() {
  return (
    <Suspense>
      <MeditateContent />
    </Suspense>
  );
}
