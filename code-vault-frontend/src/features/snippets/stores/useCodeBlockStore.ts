import { create } from "zustand";
import { persist } from "zustand/middleware";

type Preferences = {
  theme: string;
  showLineNumbers: boolean;
  showLanguage: boolean;
};

interface CodeBlockState {
  preferences: Preferences;
  setTheme: (theme: string) => void;
  toggleLineNumbers: () => void;
  toggleLanguageDisplay: () => void;
}

const defaultPreferences: Preferences = {
  theme: "github-dark",
  showLineNumbers: true,
  showLanguage: false,
};

export const useCodeBlockStore = create<CodeBlockState>()(
  persist(
    (set, get) => ({
      preferences: defaultPreferences,

      setTheme: (theme: string) =>
        set(() => ({
          preferences: { ...get().preferences, theme },
        })),

      toggleLineNumbers: () =>
        set(() => ({
          preferences: {
            ...get().preferences,
            showLineNumbers: !get().preferences.showLineNumbers,
          },
        })),

      toggleLanguageDisplay: () =>
        set(() => ({
          preferences: {
            ...get().preferences,
            showLanguage: !get().preferences.showLanguage,
          },
        })),
    }),
    {
      name: "code-block-preferences",
    }
  )
);
