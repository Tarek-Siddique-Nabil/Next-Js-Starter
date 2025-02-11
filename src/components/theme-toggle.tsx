"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div
      className={cn(
        "flex h-8 w-16 cursor-pointer rounded-full border border-border bg-primary-foreground p-1 transition-all duration-300",

        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="button"
      tabIndex={0}
    >
      <div className="flex w-full items-center justify-between">
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full bg-muted-foreground transition-transform duration-300",
            isDark ? "translate-x-0 transform" : "translate-x-8 transform"
          )}
        >
          {isDark ? (
            <Moon className="size-4 text-primary" strokeWidth={1.5} />
          ) : (
            <Sun className="size-4 text-primary" strokeWidth={1.5} />
          )}
        </div>
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300",
            isDark ? "bg-transparent" : "-translate-x-8 transform"
          )}
        >
          {isDark ? (
            <Sun className="size-4 text-gray-500" strokeWidth={1.5} />
          ) : (
            <Moon className="size-4 text-black" strokeWidth={1.5} />
          )}
        </div>
      </div>
    </div>
  );
}
