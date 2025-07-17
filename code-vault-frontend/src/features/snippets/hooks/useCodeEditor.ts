import { useCallback } from "react";
import { useCodeEditorStore } from "../stores/useCodeEditorStore";
import {
  availableEditorLanguages,
  availableEditorThemes,
  type SupportedLanguage,
} from "../types";

export const useCodeEditor = () => {
  const { preferences, updatePreferences, toggle } = useCodeEditorStore();

  const isSupportedLanguage = useCallback(
    (language: string): language is SupportedLanguage => {
      return language in availableEditorLanguages;
    },
    []
  );

  const getLanguage = useCallback((language: string) => {
    if (isSupportedLanguage(language)) {
      return availableEditorLanguages[language];
    }
    return "text";
  }, []);
  const setTheme = useCallback((theme: string) => {
    updatePreferences({ theme: theme });
  }, []);
  return {
    preferences,
    availableEditorThemes,
    availableEditorLanguages,
    getLanguage,
    setTheme,
    toggle,
  };
};
