import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return true; // default to dark when no stored preference
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        if (storedTheme === "dark") {
          document.documentElement.classList.add("dark");
          setIsDarkMode(true);
        } else {
          document.documentElement.classList.remove("dark");
          setIsDarkMode(false);
        }
      } else {
        // no stored preference -> default to dark
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsDarkMode(true);
      }
    } catch (e) {
      // ignore if localStorage is unavailable
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed max-sm:hidden top-5 right-5 z-50 p-2 rounded-full transition-colors duration-300",
        "focus:outlin-hidden"
      )}
    >
      {isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300" />
      ) : (
        <Moon className="h-6 w-6 text-blue-900" />
      )}
    </button>
  );
};
