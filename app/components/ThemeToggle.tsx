"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function preferredTheme(): Theme {
  const stored = window.localStorage.getItem("nil-theme");

  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return "dark";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const activeTheme =
      document.documentElement.dataset.theme === "dark"
        ? "dark"
        : preferredTheme();

    document.documentElement.dataset.theme = activeTheme;
    document.documentElement.style.colorScheme = activeTheme;

    const syncTheme = () => setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    const animationFrame = window.requestAnimationFrame(() => setTheme(activeTheme));
    window.addEventListener("nil-theme-change", syncTheme);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("nil-theme-change", syncTheme);
    };
  }, []);

  function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("nil-theme", nextTheme);
    setTheme(nextTheme);
    window.dispatchEvent(new Event("nil-theme-change"));
  }

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      aria-pressed={theme === "dark"}
      title={`Switch to ${nextTheme} theme`}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === "dark" ? "☀" : "☾"}
      </span>
      <span className="theme-toggle-label">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
