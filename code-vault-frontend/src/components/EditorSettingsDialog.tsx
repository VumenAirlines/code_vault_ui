import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../components/ui/dialog";
import { useCodeEditor } from "../features/snippets/hooks/useCodeEditor";
import { BooleanSettingsOption } from "./BooleanSettingsOption";
import { NumberSettingsOption } from "./NumberSettingsOption";
import { ThemeSelectorOption } from "./ThemeSelectorOption";
import { Button } from "./ui/button";

export const EditorSettingsDialog = () => {
  const { updatePreferences, preferences } = useCodeEditor();
  const themeOptions = [
    { value: "github", label: "GitHub" },
    { value: "github_dark", label: "GitHub Dark" },
    { value: "monokai", label: "Monokai" },
    { value: "one_dark", label: "One Dark" },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-none hover:bg-background cursor-pointer justify-start  dark:hover:bg-background "
        >
          Editor settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Code Editor Settings</DialogTitle>
          <DialogDescription>
            Change the settings of the code editor
          </DialogDescription>
          <div className="flex flex-col gap-2 p-4">
            <ThemeSelectorOption
              selected={preferences.theme}
              onSelect={(val) => updatePreferences({ theme: val })}
              themes={themeOptions}
            />
            <NumberSettingsOption
              name="fontSize"
              value={preferences.fontSize}
              onChange={(val) => updatePreferences({ fontSize: val })}
            />
            <NumberSettingsOption
              name="tabSize"
              value={preferences.tabSize}
              onChange={(val) => updatePreferences({ tabSize: val })}
            />
            <BooleanSettingsOption
              name="showLineNumbers"
              value={preferences.showLineNumbers}
              onChange={(val) => updatePreferences({ showLineNumbers: val })}
            />
            <BooleanSettingsOption
              name="showGutter"
              value={preferences.showGutter}
              onChange={(val) => updatePreferences({ showGutter: val })}
            />
            <BooleanSettingsOption
              name="showPrintMargin"
              value={preferences.showPrintMargin}
              onChange={(val) => updatePreferences({ showPrintMargin: val })}
            />
            <BooleanSettingsOption
              name="enableBasicAutocompletion"
              value={preferences.enableBasicAutocompletion}
              onChange={(val) =>
                updatePreferences({ enableBasicAutocompletion: val })
              }
            />
            <BooleanSettingsOption
              name="enableLiveAutocompletion"
              value={preferences.enableLiveAutocompletion}
              onChange={(val) =>
                updatePreferences({ enableLiveAutocompletion: val })
              }
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
/*export type Preferences = {
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
 */
