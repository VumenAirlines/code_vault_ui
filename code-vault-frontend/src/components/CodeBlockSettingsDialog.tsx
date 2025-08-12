import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../components/ui/dialog";
import { useCodeBlock } from "../features/snippets/hooks/useCodeBlock";
import { BooleanSettingsOption } from "./BooleanSettingsOption";
import { ThemeSelectorOption } from "./ThemeSelectorOption";
import { Button } from "./ui/button";

export const CodeBlockSettingsDialog = () => {
  const { toggleLineNumbers, setTheme, preferences, toggleLanguageDisplay } =
    useCodeBlock();
  const themeOptions = [
    { value: "github", label: "GitHub" },
    { value: "github-dark", label: "GitHub Dark" },
    { value: "monokai", label: "Monokai" },
    { value: "one-dark", label: "One Dark" },
  ];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-none hover:bg-background cursor-pointer justify-start  dark:hover:bg-background "
        >
          CodeBlock settings
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
              onSelect={(val) => setTheme(val)}
              themes={themeOptions}
            />

            <BooleanSettingsOption
              name="showLineNumbers"
              value={preferences.showLineNumbers}
              onChange={toggleLineNumbers}
            />
            <BooleanSettingsOption
              name="showLanguage"
              value={preferences.showLanguage}
              onChange={toggleLanguageDisplay}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
