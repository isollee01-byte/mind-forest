"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { KenBurnsBackground } from "@/components/KenBurnsBackground";
import { DURATIONS } from "@/data/environments";
import { getDashboardStats } from "@/lib/stats";
import { getPreferences, savePreferences } from "@/lib/storage";
import { useTheme } from "@/lib/use-theme";

export default function HomePage() {
  const [duration, setDuration] = useState(10);
  const [stats, setStats] = useState({
    streak: 0,
    week: 0,
    timeLabel: "0분",
  });
  const theme = useTheme();

  useEffect(() => {
    const prefs = getPreferences();
    setDuration(prefs.preferredDuration || 10);
    const dashboard = getDashboardStats();
    setStats({
      streak: dashboard.streak,
      week: dashboard.week,
      timeLabel: dashboard.timeLabel,
    });
  }, []);

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <KenBurnsBackground
        src={theme.image}
        srcSet={theme.imageSrcSet}
        alt={theme.label}
      />
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 pb-28 pt-24 text-center md:pb-16">
        <section className="fade-in">
          <p className="mb-4 text-sm tracking-[0.28em] text-white/70">
            {theme.label.toUpperCase()} · 마음숲
          </p>
          <h1 className="text-4xl font-medium leading-tight md:text-5xl">
            {theme.headline}
          </h1>
          <p className="mt-4 text-lg text-white/75">{theme.subline}</p>
          <p className="mt-8 text-sm text-white/60">추천 명상 · {duration}분</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {DURATIONS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setDuration(item);
                  savePreferences({ preferredDuration: item });
                }}
                className={`min-h-12 min-w-16 rounded-full px-5 text-sm transition duration-500 ${
                  duration === item
                    ? "bg-white text-black"
                    : "glass text-white/80 hover:bg-white/10"
                }`}
              >
                {item}분
              </button>
            ))}
          </div>
          <Link
            href={`/meditate?duration=${duration}`}
            className="mt-8 inline-flex min-h-14 min-w-52 items-center justify-center rounded-full border border-white/25 bg-[#161c18] px-8 text-base font-medium text-[#f4f1ea] shadow-[0_12px_32px_rgba(0,0,0,0.45)] transition duration-500 hover:bg-[#1f2621]"
          >
            명상 시작하기
          </Link>
        </section>
        <section className="fade-in mt-14 grid grid-cols-3 gap-3 text-sm text-white/80">
          <div className="glass rounded-2xl px-3 py-4">
            🔥 {stats.streak}일 연속
          </div>
          <div className="glass rounded-2xl px-3 py-4">
            🧘 이번 주 {stats.week}회
          </div>
          <div className="glass rounded-2xl px-3 py-4">
            ⏱ {stats.timeLabel}
          </div>
        </section>
      </div>
    </main>
  );
}
