"use client";

import { useEffect, useState } from "react";
import { THEMES } from "@/data/themes";
import { getTimeOfDay } from "@/lib/time-of-day";

export function useTheme() {
  const [theme, setTheme] = useState(THEMES.night);

  useEffect(() => {
    setTheme(THEMES[getTimeOfDay()]);
  }, []);

  return theme;
}
