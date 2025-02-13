import { useEffect, useState } from "react";
import { Language, Preferences } from "../types";
import { useAuth } from "./useAuth";
import { saveInLocalStorage } from "../utils";

export function usePreferences() {
  const { user } = useAuth();
  const userLanguage = localStorage.getItem("language") ?? "en";

  const [preferences, setPreferences] = useState<Preferences>({
    language: userLanguage as Language,
    theme: "system",
    currency: "EUR",
  });

  useEffect(() => {
    if (user) {
      setPreferences(user.preferences);
      saveInLocalStorage({ item: "language", value: preferences.language });
    }
  }, [user, preferences]);

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (preferences.theme === "dark") {
      root.classList.add("dark");
    } else if (preferences.theme === "light") {
      root.classList.remove("dark");
    } else {
      if (systemDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [preferences]);

  return { preferences, setPreferences };
}
