import { unsplash } from "@/lib/media";
import type { TimeOfDay } from "@/types/meditation";

export interface ThemeContent {
  id: TimeOfDay;
  label: string;
  headline: string;
  subline: string;
  image: string;
}

export const THEMES: Record<TimeOfDay, ThemeContent> = {
  dawn: {
    id: "dawn",
    label: "새벽",
    headline: "고요한 하루의 시작입니다.",
    subline: "천천히 숨을 바라보세요.",
    image: unsplash("photo-1477322524744-0eece9e79640"),
  },
  morning: {
    id: "morning",
    label: "아침",
    headline: "새로운 하루를 천천히 시작해보세요.",
    subline: "햇살 아래, 잠시 나를 위한 시간을 가져요.",
    image: unsplash("photo-1596237434075-1022eeed348c"),
  },
  day: {
    id: "day",
    label: "낮",
    headline: "잠시 멈추고 숨을 바라보세요.",
    subline: "바쁜 하루 속에도 고요한 숲이 있습니다.",
    image: unsplash("photo-1507525428034-b723cf961d3e"),
  },
  sunset: {
    id: "sunset",
    label: "노을",
    headline: "오늘의 긴장을 천천히 내려놓아 보세요.",
    subline: "노을 바다처럼, 마음이 잔잔해집니다.",
    image: unsplash("photo-1495616811223-4d98c6e9c869"),
  },
  night: {
    id: "night",
    label: "밤",
    headline: "오늘 하루도 수고했어요.",
    subline: "잠시 마음을 쉬어가세요.",
    image: unsplash("photo-1419242902214-272b3f66ee7a"),
  },
};
