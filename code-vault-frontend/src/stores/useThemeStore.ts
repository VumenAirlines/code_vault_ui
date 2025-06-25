import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system" | "blue" | "green";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  getSystemTheme: () => "light" | "dark";
  getActiveTheme: () => "light" | "dark" | "blue" | "green";
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      setTheme: (theme) => {
        set({ theme });
        // Apply theme immediately when set
        applyThemeToDOM(theme);
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

// Helper function to apply theme to DOM
function applyThemeToDOM(theme: Theme) {
  if (typeof window === "undefined") return;

  const root = window.document.documentElement;

  // Remove all theme classes
  root.classList.remove("light", "dark", "theme-blue", "theme-green");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
  } else if (theme === "blue") {
    root.classList.add("theme-blue");
  } else if (theme === "green") {
    root.classList.add("theme-green");
  } else {
    root.classList.add(theme);
  }
}
