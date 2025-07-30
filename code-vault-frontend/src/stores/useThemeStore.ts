import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Theme } from "../types";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  getSystemTheme: () => "light" | "dark";
  getActiveTheme: () => "light" | "dark" | "theme-blue" | "theme-green";
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      setTheme: (theme) => {
        set({ theme });
      },
      getSystemTheme: () => {
        if (typeof window === "undefined") return "light";
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      },
      getActiveTheme: () => {
        const { theme, getSystemTheme } = get();
        return theme === "system" ? getSystemTheme() : theme;
      },
    }),
    {
      name: "theme-storage",
    }
  )
);
