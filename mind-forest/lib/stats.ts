import { addDays, formatMinutes, startOfWeek, toDateKey } from "@/lib/dates";
import { getChallenge, getHistory } from "@/lib/storage";
import type {
  EnvironmentId,
  ForestStageId,
  MeditationSession,
} from "@/types/meditation";

export interface ForestStage {
  id: ForestStageId;
  name: string;
  korean: string;
  emoji: string;
  min: number;
  max: number | null;
}

export const FOREST_STAGES: ForestStage[] = [
  { id: "seed", name: "Seed", korean: "씨앗", emoji: "🌱", min: 0, max: 0 },
  { id: "sprout", name: "Sprout", korean: "새싹", emoji: "🌿", min: 1, max: 3 },
  {
    id: "youngTree",
    name: "Young Tree",
    korean: "작은 나무",
    emoji: "🌳",
    min: 4,
    max: 7,
  },
  { id: "tree", name: "Tree", korean: "큰 나무", emoji: "🌲", min: 8, max: 15 },
  {
    id: "smallForest",
    name: "Small Forest",
    korean: "작은 숲",
    emoji: "🍃",
    min: 16,
    max: 29,
  },
  {
    id: "mindForest",
    name: "Mind Forest",
    korean: "풍성한 숲",
    emoji: "🏞️",
    min: 30,
    max: null,
  },
];

export function completedSessions(history = getHistory()) {
  return history.filter((item) => item.completed);
}

export function totalCount(history = getHistory()) {
  return completedSessions(history).length;
}

export function totalMinutes(history = getHistory()) {
  return completedSessions(history).reduce(
    (sum, item) => sum + item.duration,
    0,
  );
}

export function formatTotalTime(history = getHistory()) {
  return formatMinutes(totalMinutes(history));
}

function uniqueSortedDates(history: MeditationSession[]) {
  return Array.from(
    new Set(completedSessions(history).map((item) => item.date)),
  ).sort();
}

export function currentStreak(history = getHistory(), today = toDateKey()) {
  const dates = new Set(uniqueSortedDates(history));
  if (dates.size === 0) return 0;

  let cursor = dates.has(today) ? today : addDays(today, -1);
  if (!dates.has(cursor)) return 0;

  let streak = 0;
  while (dates.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function bestStreak(history = getHistory()) {
  const dates = uniqueSortedDates(history);
  if (dates.length === 0) return 0;

  let best = 1;
  let run = 1;
  for (let i = 1; i < dates.length; i += 1) {
    if (dates[i] === addDays(dates[i - 1], 1)) {
      run += 1;
      best = Math.max(best, run);
    } else {
      run = 1;
    }
  }
  return best;
}

export function weekCount(history = getHistory(), today = toDateKey()) {
  const weekStart = startOfWeek(today);
  return uniqueSortedDates(history).filter(
    (date) => date >= weekStart && date <= today,
  ).length;
}

export function getForestStage(count = totalCount()) {
  return (
    FOREST_STAGES.find((stage) => {
      if (stage.max === null) return count >= stage.min;
      return count >= stage.min && count <= stage.max;
    }) ?? FOREST_STAGES[0]
  );
}

export function calendarMark(totalDuration: number) {
  if (totalDuration <= 0) return "○";
  if (totalDuration < 10) return "•";
  if (totalDuration < 20) return "🌱";
  if (totalDuration < 30) return "🍃";
  return "🌿";
}

export function sessionsOnDate(date: string, history = getHistory()) {
  return completedSessions(history).filter((item) => item.date === date);
}

export function durationOnDate(date: string, history = getHistory()) {
  return sessionsOnDate(date, history).reduce(
    (sum, item) => sum + item.duration,
    0,
  );
}

export function environmentLabel(id: EnvironmentId) {
  const labels: Record<EnvironmentId, string> = {
    forest: "Forest",
    ocean: "Ocean",
    rain: "Rain",
    fireplace: "Fireplace",
    night: "Night",
  };
  return labels[id];
}

export function getChallengeView(today = toDateKey()) {
  const challenge = getChallenge();
  const unique = Array.from(new Set(challenge.completedDates)).sort();
  const count = Math.min(unique.length, 7);
  const complete = count >= 7;
  return {
    ...challenge,
    count,
    complete,
    isTodayDone: unique.includes(today),
  };
}

export function getDashboardStats() {
  const history = getHistory();
  return {
    streak: currentStreak(history),
    best: bestStreak(history),
    count: totalCount(history),
    minutes: totalMinutes(history),
    timeLabel: formatTotalTime(history),
    week: weekCount(history),
    forest: getForestStage(totalCount(history)),
    challenge: getChallengeView(),
  };
}
