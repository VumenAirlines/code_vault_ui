import { ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import type { ThemeOption } from "../features/snippets/types";
export const ThemeSelectorOption = ({
  selected,
  themes,
  onSelect,
}: {
  selected: string;
  themes: ThemeOption[];
  onSelect: (val: string) => void;
}) => {
  return (
    <span className="flex flex-row justify-between">
      theme
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-fit" variant="outline">
            {themes.find((t) => t.value == selected)?.label ?? "Select a theme"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {themes.map((theme) => (
            <DropdownMenuItem
              className={theme.value == selected ? "bg-accent" : ""}
              key={theme.value}
              onSelect={() => {
                onSelect(theme.value);
              }}
            >
              {theme.label}
              {theme.value == selected && <span className="ml-auto">✓</span>}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </span>
  );
};
