import { unsplash, unsplashSrcSet } from "@/lib/media";
import type { TimeOfDay } from "@/types/meditation";

export interface ThemeContent {
  id: TimeOfDay;
  label: string;
  headline: string;
  subline: string;
  image: string;
  imageSrcSet: string;
}

function themeImage(photoId: string) {
  return {
    image: unsplash(photoId),
    imageSrcSet: unsplashSrcSet(photoId),
  };
}

export const THEMES: Record<TimeOfDay, ThemeContent> = {
  dawn: {
    id: "dawn",
    label: "새벽",
    headline: "고요한 하루의 시작입니다.",
    subline: "천천히 숨을 바라보세요.",
    ...themeImage("photo-1468581264429-2548ef9eb732"),
  },
  morning: {
    id: "morning",
    label: "아침",
    headline: "새로운 하루를 천천히 시작해보세요.",
    subline: "햇살 아래, 잠시 나를 위한 시간을 가져요.",
    ...themeImage("photo-1507525428034-b723cf961d3e"),
  },
  day: {
    id: "day",
    label: "낮",
    headline: "잠시 멈추고 숨을 바라보세요.",
    subline: "바쁜 하루 속에도 잔잔한 바다가 있습니다.",
    ...themeImage("photo-1518837695005-2083093ee35b"),
  },
  sunset: {
    id: "sunset",
    label: "노을",
    headline: "오늘의 긴장을 천천히 내려놓아 보세요.",
    subline: "노을 바다처럼, 마음이 잔잔해집니다.",
    ...themeImage("photo-1495616811223-4d98c6e9c869"),
  },
  night: {
    id: "night",
    label: "밤",
    headline: "오늘 하루도 수고했어요.",
    subline: "잠시 마음을 쉬어가세요.",
    ...themeImage("photo-1505118380757-91f5f5632de0"),
  },
};
