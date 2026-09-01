"use client";

import { useEffect, useState } from "react";
import { KenBurnsBackground } from "@/components/KenBurnsBackground";
import { parseDateKey, toDateKey } from "@/lib/dates";
import { getHistory, restartChallenge } from "@/lib/storage";
import {
  calendarMark,
  durationOnDate,
  environmentLabel,
  FOREST_STAGES,
  getDashboardStats,
  sessionsOnDate,
} from "@/lib/stats";
import { useTheme } from "@/lib/use-theme";
import type { MeditationSession } from "@/types/meditation";

const WEEKDAYS = ["월", "화", "수", "목", "금", "토", "일"];

function monthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<number | null> = [];
  for (let i = 0; i < startOffset; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function JourneyPage() {
  const theme = useTheme();
  const today = toDateKey();
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [selected, setSelected] = useState("");
  const [tick, setTick] = useState(0);
  const [history, setHistory] = useState<MeditationSession[]>([]);
  const [stats, setStats] = useState({
    streak: 0,
    best: 0,
    count: 0,
    minutes: 0,
    timeLabel: "0분",
    week: 0,
    forest: FOREST_STAGES[0],
    challenge: {
      startDate: "",
      completedDates: [] as string[],
      count: 0,
      complete: false,
      isTodayDone: false,
    },
  });

  useEffect(() => {
    setSelected(today);
    setHistory(getHistory());
    setStats(getDashboardStats());
  }, [tick, today]);
  const cells = monthMatrix(cursor.year, cursor.month);
  const selectedSessions = sessionsOnDate(selected, history);
  const challengeSlots = Array.from({ length: 7 }, (_, index) => index < stats.challenge.count);

  return (
    <main className="relative min-h-dvh overflow-hidden">
      <KenBurnsBackground src={theme.image} alt={theme.label} />
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-28 pt-24 md:pt-32">
        <header className="fade-in mb-8 text-center">
          <p className="text-sm tracking-[0.22em] text-white/60">JOURNEY</p>
          <h1 className="mt-2 text-4xl font-medium">나의 명상 여정</h1>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="현재 연속 명상" value={`🔥 ${stats.streak}일`} />
          <StatCard label="최고 연속 명상" value={`🏆 ${stats.best}일`} />
          <StatCard label="총 명상 횟수" value={`🧘 ${stats.count}회`} />
          <StatCard label="총 명상 시간" value={`⏱ ${stats.timeLabel}`} />
        </section>

        <section className="glass fade-in mt-6 rounded-3xl p-5">
          <div className="mb-3">
            <h2 className="text-lg">명상 달력</h2>
            <p className="mt-1 text-sm text-white/70">
              날짜를 누르면 아래에서 그날의 기록을 확인할 수 있어요.
            </p>
            <p className="mt-2 text-xs text-white/55">
              ○ 없음 · • 5분 · 🌱 10분 · 🍃 20분 · 🌿 30분 이상
            </p>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              className="rounded-full px-3 py-2 text-white/80"
              onClick={() =>
                setCursor((value) => {
                  const date = new Date(value.year, value.month - 1, 1);
                  return { year: date.getFullYear(), month: date.getMonth() };
                })
              }
            >
              이전
            </button>
            <h2 className="text-lg">
              {cursor.year}년 {cursor.month + 1}월
            </h2>
            <button
              type="button"
              className="rounded-full px-3 py-2 text-white/80"
              onClick={() =>
                setCursor((value) => {
                  const date = new Date(value.year, value.month + 1, 1);
                  return { year: date.getFullYear(), month: date.getMonth() };
                })
              }
            >
              다음
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-xs text-white/50">
            {WEEKDAYS.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-2">
            {cells.map((day, index) => {
              if (!day) return <div key={`empty-${index}`} />;
              const key = toDateKey(new Date(cursor.year, cursor.month, day));
              const mark = calendarMark(durationOnDate(key, history));
              const isSelected = key === selected;
              const isToday = key === today;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelected(key)}
                  className={`relative z-20 min-h-16 cursor-pointer rounded-2xl text-sm transition duration-300 ${
                    isSelected
                      ? "bg-[#f4f1ea] text-[#141a16]"
                      : isToday
                        ? "bg-white/15 text-white ring-1 ring-white/50"
                        : "bg-white/5 text-white hover:bg-white/15"
                  }`}
                >
                  <span
                    className={`block ${isSelected ? "text-[#141a16]/70" : "text-white/55"}`}
                  >
                    {day}
                    {isToday ? " · 오늘" : ""}
                  </span>
                  <span>{mark}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-5 rounded-2xl bg-black/30 p-4 text-sm">
            {selected ? (
              <>
                <p className="font-medium text-white">
                  {parseDateKey(selected).getMonth() + 1}월{" "}
                  {parseDateKey(selected).getDate()}일 기록
                </p>
                {selectedSessions.length === 0 ? (
                  <p className="mt-2 text-white/65">
                    이 날에는 아직 완료한 명상이 없습니다. 명상을 끝까지 마치면
                    여기에 시간과 환경이 쌓입니다.
                  </p>
                ) : (
                  <ul className="mt-2 space-y-1 text-white">
                    {selectedSessions.map((session, index) => (
                      <li key={`${session.startedAt}-${index}`}>
                        {environmentLabel(session.environment)} ·{" "}
                        {session.duration}분 · {session.startedAt}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p className="text-white/55">날짜를 선택하면 기록이 나타납니다.</p>
            )}
          </div>
        </section>

        <section className="glass fade-in mt-6 rounded-3xl p-6">
          <h2 className="text-xl">7 Days Mindfulness</h2>
          <p className="mt-1 text-sm text-white/65">
            7일 동안 하루 한 번 명상하기
          </p>
          <div className="mt-5 flex gap-2">
            {challengeSlots.map((done, index) => (
              <span
                key={index}
                className={`h-4 flex-1 rounded-full ${done ? "bg-white" : "bg-white/20"}`}
              />
            ))}
          </div>
          <p className="mt-3 text-sm">
            {stats.challenge.count} / 7 Days
          </p>
          {stats.challenge.complete ? (
            <div className="mt-5">
              <p className="text-2xl">🌳 7 Days Complete</p>
              <p className="mt-2 text-white/70">
                7일 동안 마음을 돌보는 시간을 만들었어요.
              </p>
              <button
                type="button"
                onClick={() => {
                  restartChallenge();
                  setTick((value) => value + 1);
                }}
                className="mt-4 min-h-12 rounded-full bg-white px-5 text-sm font-medium text-black"
              >
                새로운 7일 시작
              </button>
            </div>
          ) : null}
        </section>

        <section className="glass fade-in mt-6 rounded-3xl p-6 text-center">
          <p className="text-5xl">{stats.forest.emoji}</p>
          <h2 className="mt-4 text-2xl">{stats.forest.name}</h2>
          <p className="mt-1 text-white/70">{stats.forest.korean}</p>
          <p className="mt-3 text-sm text-white/55">
            명상을 이어갈수록 마음의 숲이 풍성해집니다.
          </p>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-3xl px-4 py-5">
      <p className="text-xs text-white/55">{label}</p>
      <p className="mt-2 text-lg">{value}</p>
    </div>
  );
}
