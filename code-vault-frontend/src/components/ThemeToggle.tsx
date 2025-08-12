import { Moon, Sun, Droplets, Monitor, Trees } from "lucide-react";
import { useThemeStore } from "../stores/useThemeStore";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { cn } from "../lib/utils";
const themeConfig = {
  light: { icon: Sun, label: "Light" },
  dark: { icon: Moon, label: "Dark" },
  "theme-blue": { icon: Droplets, label: "Blue" },
  "theme-green": { icon: Trees, label: "Green" },
  system: { icon: Monitor, label: "System" },
};

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme, getActiveTheme } = useThemeStore();

  const getCurrentIcon = () => {
    if (theme === "system") {
      const activeTheme = getActiveTheme();
      return activeTheme === "dark" ? Moon : Sun;
    }
    return themeConfig[theme].icon;
  };

  const CurrentIcon = getCurrentIcon();

  return (
    <div className={cn("size-fit", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex flex-row justify-between rounded-none hover:bg-background dark:hover:bg-background cursor-pointer"
          >
            <span className="">Change theme</span>
            <div className="size-fit ">
              <CurrentIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Object.entries(themeConfig).map(([themeKey, config]) => {
            const Icon = config.icon;
            const isActive = theme === themeKey;

            return (
              <DropdownMenuItem
                key={themeKey}
                onClick={() => setTheme(themeKey as any)}
                className={isActive ? "bg-accent" : ""}
              >
                <Icon className="mr-2 h-4 w-4" />
                {config.label}
                {isActive && <span className="ml-auto">✓</span>}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
