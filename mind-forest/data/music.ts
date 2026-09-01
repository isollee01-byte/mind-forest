import type { EnvironmentId, MusicTrack } from "@/types/meditation";

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: "breathing-10",
    title: "10분 호흡 명상",
    category: "guide",
    youtubeId: "O-6f5wQXSu8",
    description: "생각을 잠시 내려놓고 호흡에 집중해보세요.",
    featured: true,
  },
  {
    id: "morning-reset",
    title: "5분 마음 정리",
    category: "guide",
    youtubeId: "inpok4MKVLM",
    description: "짧은 호흡으로 마음을 정돈하는 명상입니다.",
  },
  {
    id: "forest-sounds",
    title: "Forest Sounds",
    category: "forest",
    youtubeId: "xNN7iTA57jM",
    description: "숲과 새소리에 숨을 맡겨보세요.",
  },
  {
    id: "ocean-waves",
    title: "Ocean Waves",
    category: "ocean",
    youtubeId: "m4m6uklE8dU",
    description: "파도에 호흡을 맡겨보세요.",
  },
  {
    id: "rainy-night",
    title: "Rainy Night",
    category: "rain",
    youtubeId: "q76bMs-NwRk",
    description: "창문에 닿는 빗소리와 함께 쉬어가세요.",
  },
  {
    id: "fireplace-ember",
    title: "Fireplace",
    category: "focus",
    youtubeId: "L_LUpnjgPso",
    description: "타닥이는 불빛 앞에서 긴장을 내려놓아요.",
  },
  {
    id: "deep-focus",
    title: "Deep Focus",
    category: "focus",
    youtubeId: "lTRiuFIWV54",
    description: "집중과 업무 전, 차분한 흐름을 만듭니다.",
  },
  {
    id: "sleep-meditation",
    title: "Sleep Meditation",
    category: "sleep",
    youtubeId: "1ZYbU82GVz4",
    description: "잠들기 전, 몸을 부드럽게 이완합니다.",
  },
];

export const MUSIC_CATEGORIES: { id: MusicTrack["category"]; label: string }[] =
  [
    { id: "guide", label: "짧은 명상" },
    { id: "forest", label: "Forest Sounds" },
    { id: "ocean", label: "Ocean Waves" },
    { id: "rain", label: "Rainy Night" },
    { id: "focus", label: "Deep Focus" },
    { id: "sleep", label: "Sleep Meditation" },
  ];

export function getTrack(id: string) {
  return MUSIC_TRACKS.find((track) => track.id === id) ?? MUSIC_TRACKS[0];
}

export function getDefaultTrackForEnvironment(environment: EnvironmentId) {
  const map: Record<EnvironmentId, string> = {
    forest: "forest-sounds",
    ocean: "ocean-waves",
    rain: "rainy-night",
    fireplace: "fireplace-ember",
    night: "sleep-meditation",
  };
  return getTrack(map[environment]);
}
