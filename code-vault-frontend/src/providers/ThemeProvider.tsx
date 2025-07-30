// providers/ThemeProvider.tsx
import { useEffect, type ReactNode } from "react";
import { useThemeStore } from "../stores/useThemeStore";
import type { Theme } from "../types";

interface ThemeProviderProps {
  children: ReactNode;
}

const themes: Theme[] = ["light", "dark", "theme-blue", "theme-green"];

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme, getSystemTheme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;

    themes.forEach((theme) => root.classList.remove(theme));

    if (theme === "system") {
      const systemTheme = getSystemTheme();
      root.classList.add(systemTheme);

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        if (theme === "system") {
          root.classList.remove("light", "dark");
          root.classList.add(e.matches ? "dark" : "light");
        }
      };

      mediaQuery.addEventListener("change", handleSystemThemeChange);

      return () => {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      };
    } else if (themes.includes(theme)) {
      root.classList.add(theme);
    } else {
      root.classList.add("light");
      console.error("Theme is not recognized", theme);
    }
  }, [theme, getSystemTheme]);

  return <>{children}</>;
};
