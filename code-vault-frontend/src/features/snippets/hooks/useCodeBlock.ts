// hooks/useSyntaxHighlighter.ts
import { useCallback } from "react";
import { useCodeBlockStore } from "../stores/useCodeBlockStore";
import {
  availableLanguages,
  availableThemes,
  type SupportedLanguage,
} from "../types";

export const useCodeBlock = () => {
  const { preferences, setTheme, toggleLineNumbers, toggleLanguageDisplay } =
    useCodeBlockStore();

  const getHighlighterProps = useCallback(
    () => ({
      theme: preferences.theme,
      showLanguage: preferences.showLanguage,
      showLineNumbers: preferences.showLineNumbers,
    }),
    [preferences]
  );
  const isSupportedLanguage = useCallback(
    (language: string): language is SupportedLanguage => {
      return language in availableLanguages;
    },
    []
  );

  const getLanguage = useCallback((language: string) => {
    if (isSupportedLanguage(language)) {
      return availableLanguages[language];
    }
    return "text";
  }, []);

  return {
    availableThemes,
    availableLanguages,
    preferences,
    setTheme,
    isSupportedLanguage,
    toggleLineNumbers,
    toggleLanguageDisplay,
    getHighlighterProps,
    getLanguage,
  };
};
