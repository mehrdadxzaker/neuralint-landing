"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

// Shared by all toggle instances so a second click cannot release the first
// switch's suppression before the latest theme has painted.
let transitionReleaseFrame: number | null = null;

function switchThemeWithoutTransitions(theme: Theme) {
  const root = document.documentElement;
  if (transitionReleaseFrame !== null) {
    window.cancelAnimationFrame(transitionReleaseFrame);
  }
  root.classList.add("theme-switching");
  // Commit suppression first, including when another transition is running.
  void root.offsetHeight;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  // Commit the new palette while suppression is still in force.
  void root.offsetHeight;
  transitionReleaseFrame = window.requestAnimationFrame(() => {
    transitionReleaseFrame = window.requestAnimationFrame(() => {
      root.classList.remove("theme-switching");
      transitionReleaseFrame = null;
    });
  });
}

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

    switchThemeWithoutTransitions(nextTheme);
    window.localStorage.setItem("nil-theme", nextTheme);
    setTheme(nextTheme);
    window.dispatchEvent(new Event("nil-theme-change"));
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggleTheme}
      aria-label="Dark mode"
      aria-pressed={theme === "dark"}
      title="Dark mode"
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === "dark" ? "☾" : "☀"}
      </span>
      <span className="theme-toggle-label">
        Dark mode
      </span>
    </button>
  );
}
