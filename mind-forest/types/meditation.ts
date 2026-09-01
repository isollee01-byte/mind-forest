export type TimeOfDay = "dawn" | "morning" | "day" | "sunset" | "night";

export type EnvironmentId =
  | "forest"
  | "ocean"
  | "rain"
  | "fireplace"
  | "night";

export type MusicCategory =
  | "guide"
  | "forest"
  | "ocean"
  | "rain"
  | "focus"
  | "sleep";

export type ForestStageId =
  | "seed"
  | "sprout"
  | "youngTree"
  | "tree"
  | "smallForest"
  | "mindForest";

export interface MeditationSession {
  date: string;
  startedAt: string;
  duration: number;
  environment: EnvironmentId;
  completed: boolean;
}

export interface ChallengeProgress {
  startDate: string;
  completedDates: string[];
}

export interface UserPreferences {
  preferredDuration: number;
  lastEnvironment: EnvironmentId;
  musicOn: boolean;
  lastMusicId: string;
}

export interface MusicTrack {
  id: string;
  title: string;
  category: MusicCategory;
  youtubeId: string;
  description: string;
  featured?: boolean;
}
