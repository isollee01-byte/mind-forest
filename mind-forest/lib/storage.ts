import { toDateKey } from "@/lib/dates";
import type {
  ChallengeProgress,
  MeditationSession,
  UserPreferences,
} from "@/types/meditation";

const KEYS = {
  history: "meditationHistory",
  challenge: "challengeProgress",
  preferences: "userPreferences",
} as const;

const DEFAULT_PREFERENCES: UserPreferences = {
  preferredDuration: 10,
  lastEnvironment: "forest",
  musicOn: true,
  lastMusicId: "breathing-10",
};

function canUseStorage() {
  return typeof window !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getHistory(): MeditationSession[] {
  return readJson<MeditationSession[]>(KEYS.history, []);
}

export function saveHistory(history: MeditationSession[]) {
  writeJson(KEYS.history, history);
}

export function addCompletedSession(
  session: Omit<MeditationSession, "completed">,
) {
  const history = getHistory();
  history.push({ ...session, completed: true });
  saveHistory(history);
  updateChallengeForDate(session.date);
  return history;
}

export function getPreferences(): UserPreferences {
  return { ...DEFAULT_PREFERENCES, ...readJson(KEYS.preferences, {}) };
}

export function savePreferences(partial: Partial<UserPreferences>) {
  const next = { ...getPreferences(), ...partial };
  writeJson(KEYS.preferences, next);
  return next;
}

export function getChallenge(): ChallengeProgress {
  const stored = readJson<ChallengeProgress | null>(KEYS.challenge, null);
  if (stored?.startDate) return stored;
  const fresh: ChallengeProgress = {
    startDate: toDateKey(),
    completedDates: [],
  };
  writeJson(KEYS.challenge, fresh);
  return fresh;
}

export function saveChallenge(challenge: ChallengeProgress) {
  writeJson(KEYS.challenge, challenge);
}

function updateChallengeForDate(date: string) {
  const challenge = getChallenge();
  if (challenge.completedDates.length >= 7) return challenge;
  if (challenge.completedDates.includes(date)) return challenge;

  const next: ChallengeProgress = {
    ...challenge,
    completedDates: [...challenge.completedDates, date].sort(),
  };
  saveChallenge(next);
  return next;
}

export function restartChallenge() {
  const next: ChallengeProgress = {
    startDate: toDateKey(),
    completedDates: [],
  };
  saveChallenge(next);
  return next;
}
