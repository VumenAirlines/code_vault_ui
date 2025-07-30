import { create } from "zustand";
import { persist } from "zustand/middleware";

type Preferences = {
  theme: string;
  fontSize: number;
  lineHeight: number;
  enableSnippets: boolean;
  showGutter: boolean;
  showPrintMargin: boolean;
  showLineNumbers: boolean;
  highlightActiveLine: boolean;
  enableBasicAutocompletion: boolean;
  enableLiveAutocompletion: boolean;
  tabSize: number;
};

interface CodeEditorState {
  preferences: Preferences;
  updatePreferences: (updates: Partial<Preferences>) => void;
  toggle: <K extends keyof Preferences>(key: K) => void;
}

const defaultPreferences: Preferences = {
  theme: "one_dark",
  fontSize: 12,
  lineHeight: 20,
  tabSize: 4,
  enableSnippets: false,
  showGutter: true,
  showPrintMargin: false,
  showLineNumbers: true,
  highlightActiveLine: true,
  enableBasicAutocompletion: false,
  enableLiveAutocompletion: false,
};

export const useCodeEditorStore = create<CodeEditorState>()(
  persist(
    (set, get) => ({
      preferences: defaultPreferences,

      updatePreferences: (updates: Partial<Preferences>) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...updates,
          },
        }));
      },

      toggle: (key) => {
        const current = get().preferences[key];
        set((state) => ({
          preferences: {
            ...state.preferences,
            [key]: typeof current === "boolean" ? !current : current,
          },
        }));
      },
    }),
    {
      name: "code-editor-preferences",
    }
  )
);
