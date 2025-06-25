import { Moon, Sun, Droplets, Monitor } from "lucide-react";
import { useThemeStore } from "../stores/useThemeStore";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const themeConfig = {
  light: { icon: Sun, label: "Light" },
  dark: { icon: Moon, label: "Dark" },
  blue: { icon: Droplets, label: "Blue" },
  green: { icon: Droplets, label: "Green" },

  system: { icon: Monitor, label: "System" },
};

export function ThemeToggle() {
  const { theme, setTheme, getActiveTheme } = useThemeStore();
  
  // Get the appropriate icon for current theme
  const getCurrentIcon = () => {
    if (theme === "system") {
      const activeTheme = getActiveTheme();
      return activeTheme === "dark" ? Moon : Sun;
    }
    return themeConfig[theme].icon;
  };
  
  const CurrentIcon = getCurrentIcon();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <CurrentIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">Toggle theme</span>
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
  );
}