import { useTheme } from "@wrksz/themes/client";
import { type LucideIcon, Sun, Moon, Laptop, ChevronDown } from "lucide-react";

import { Button } from "../ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../ui/collapsible";

type Theme = "light" | "dark" | "system";

type ThemeData = {
  [T in Theme]: {
    value: T;
    label: Capitalize<T>;
    icon: LucideIcon;
  };
};

const themeData: ThemeData = {
  light: { value: "light", label: "Light", icon: Sun },
  dark: { value: "dark", label: "Dark", icon: Moon },
  system: { value: "system", label: "System", icon: Laptop },
};

export default function ThemePicker() {
  const { setTheme } = useTheme();
  const activeTheme = useThemeValue(themeData) ?? themeData.system;

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full items-center justify-between px-2">
          <span className="flex items-center gap-3 text-base font-medium md:text-sm md:font-normal">
            <activeTheme.icon className="size-4.5 shrink-0" />
            {activeTheme.label}
          </span>
          <ChevronDown className="size-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col bg-muted">
        <Button
          className="justify-start"
          variant={activeTheme === themeData.light ? "default" : "ghost"}
          onClick={() => setTheme(themeData.light.value)}
        >
          <themeData.light.icon />
          {themeData.light.label}
        </Button>
        <Button
          className="justify-start"
          variant={activeTheme === themeData.dark ? "default" : "ghost"}
          onClick={() => setTheme(themeData.dark.value)}
        >
          <themeData.dark.icon />
          {themeData.dark.label}
        </Button>
        <Button
          className="justify-start"
          variant={activeTheme === themeData.system ? "default" : "ghost"}
          onClick={() => setTheme(themeData.system.value)}
        >
          <themeData.system.icon />
          {themeData.system.label}
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
}

/**
 * Returns the value from the map that corresponds to the current theme.
 * Returns `undefined` if the theme hasn't resolved yet (e.g. during SSR).
 *
 * @example
 * const label = useThemeValue({ light: "Switch to dark", dark: "Switch to light" });
 * const color = useThemeValue({ light: "#fff", dark: "#000", purple: "#1a0a2e" });
 */
export function useThemeValue<T>(map: Record<string, T>): T | undefined {
  const { theme } = useTheme();
  if (!theme) return undefined;
  return map[theme];
}
