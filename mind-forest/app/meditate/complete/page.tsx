"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { KenBurnsBackground } from "@/components/KenBurnsBackground";
import { getEnvironment } from "@/data/environments";
import { FOREST_STAGES, getForestStage, totalCount } from "@/lib/stats";
import type { EnvironmentId } from "@/types/meditation";

function CompleteContent() {
  const params = useSearchParams();
  const duration = Number(params.get("duration") || 10);
  const environment = (params.get("environment") || "forest") as EnvironmentId;
  const env = getEnvironment(environment);
  const [forest, setForest] = useState(FOREST_STAGES[1]);

  useEffect(() => {
    setForest(getForestStage(totalCount()));
  }, []);

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <KenBurnsBackground
        src={env.image}
        srcSet={env.imageSrcSet}
        alt={env.name}
      />
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-6 pb-24 text-center">
        <section className="fade-in glass rounded-[32px] px-8 py-12">
          <p className="text-5xl">{forest.emoji}</p>
          <h1 className="mt-6 text-3xl font-medium leading-snug">
            오늘 {duration}분 동안
            <br />
            나를 위한 시간을 만들었어요.
          </h1>
          <p className="mt-5 text-white/75">
            마음의 숲에 새로운 새싹이 자랐어요.
          </p>
          <p className="mt-2 text-sm text-white/55">
            지금 단계 · {forest.korean} ({forest.name})
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/journey"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/25 bg-[#161c18] px-6 font-medium text-[#f4f1ea]"
            >
              나의 여정 보기
            </Link>
            <Link
              href="/"
              className="glass inline-flex min-h-14 items-center justify-center rounded-full px-6"
            >
              Home으로
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function CompletePage() {
  return (
    <Suspense>
      <CompleteContent />
    </Suspense>
  );
}
