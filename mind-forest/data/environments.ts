import { unsplash } from "@/lib/media";
import type { EnvironmentId } from "@/types/meditation";

export interface EnvironmentContent {
  id: EnvironmentId;
  name: string;
  description: string;
  image: string;
  defaultMusicId: string;
}

export const ENVIRONMENTS: EnvironmentContent[] = [
  {
    id: "forest",
    name: "Forest",
    description: "숲 / 나무 / 햇살 / 새소리",
    image: unsplash("photo-1448375240586-882707db888b", 1200),
    defaultMusicId: "forest-sounds",
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "바다 / 파도 / 해변",
    image: unsplash("photo-1507525428034-b723cf961d3e", 1200),
    defaultMusicId: "ocean-waves",
  },
  {
    id: "rain",
    name: "Rain",
    description: "비 / 창문 / 숲속의 비",
    image: unsplash("photo-1515694346937-94d85e41e6f0", 1200),
    defaultMusicId: "rainy-night",
  },
  {
    id: "fireplace",
    name: "Fireplace",
    description: "모닥불 / 캠프파이어",
    image: unsplash("photo-1542338106-1b4bfe84d5df", 1200),
    defaultMusicId: "fireplace-ember",
  },
  {
    id: "night",
    name: "Night",
    description: "별 / 달 / 밤하늘 / 밤의 숲",
    image: unsplash("photo-1419242902214-272b3f66ee7a", 1200),
    defaultMusicId: "sleep-meditation",
  },
];

export function getEnvironment(id: EnvironmentId) {
  return ENVIRONMENTS.find((item) => item.id === id) ?? ENVIRONMENTS[0];
}

export const DURATIONS = [5, 10, 20, 30] as const;
