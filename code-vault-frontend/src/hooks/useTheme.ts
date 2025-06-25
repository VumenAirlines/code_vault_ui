import { useThemeStore } from "../stores/useThemeStore";

export function useTheme() {
  const store = useThemeStore();

  return {
    theme: store.theme,
    setTheme: store.setTheme,
    activeTheme: store.getActiveTheme(),
    isSystemTheme: store.theme === "system",
    isDark: store.getActiveTheme() === "dark",
    isLight: store.getActiveTheme() === "light",
    isBlue: store.getActiveTheme() === "blue",
  };
}
