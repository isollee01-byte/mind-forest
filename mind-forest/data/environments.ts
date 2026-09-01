import { unsplash, unsplashSrcSet } from "@/lib/media";
import type { EnvironmentId } from "@/types/meditation";

export interface EnvironmentContent {
  id: EnvironmentId;
  name: string;
  description: string;
  image: string;
  imageSrcSet: string;
  defaultMusicId: string;
}

function environmentImage(photoId: string) {
  return {
    image: unsplash(photoId),
    imageSrcSet: unsplashSrcSet(photoId),
  };
}

export const ENVIRONMENTS: EnvironmentContent[] = [
  {
    id: "forest",
    name: "Forest",
    description: "숲 / 나무 / 햇살 / 새소리",
    ...environmentImage("photo-1448375240586-882707db888b"),
    defaultMusicId: "forest-sounds",
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "바다 / 파도 / 해변",
    ...environmentImage("photo-1507525428034-b723cf961d3e"),
    defaultMusicId: "ocean-waves",
  },
  {
    id: "rain",
    name: "Rain",
    description: "비 / 창문 / 숲속의 비",
    ...environmentImage("photo-1515694346937-94d85e41e6f0"),
    defaultMusicId: "rainy-night",
  },
  {
    id: "fireplace",
    name: "Fireplace",
    description: "모닥불 / 캠프파이어",
    ...environmentImage("photo-1542338106-1b4bfe84d5df"),
    defaultMusicId: "fireplace-ember",
  },
  {
    id: "night",
    name: "Night",
    description: "별 / 달 / 밤하늘 / 밤의 숲",
    ...environmentImage("photo-1419242902214-272b3f66ee7a"),
    defaultMusicId: "sleep-meditation",
  },
];

export function getEnvironment(id: EnvironmentId) {
  return ENVIRONMENTS.find((item) => item.id === id) ?? ENVIRONMENTS[0];
}

export const DURATIONS = [5, 10, 20, 30] as const;
