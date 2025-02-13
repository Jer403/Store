import { useId, useState } from "react";
import { CheckCircle2, CircleDashed, Palette, User } from "lucide-react";
import { SettingsSection } from "../components/SettingsSection";
import { useAuth } from "../hooks/useAuth";
import { preferencesRequest } from "../Api/auth";
import { Currency, Language, Theme } from "../types";
import { usePreferences } from "../hooks/usePreferences";
import { saveInLocalStorage } from "../utils";
import { LANGUAGE } from "../consts";
import { useNavigate } from "react-router-dom";

interface SubmitClickProps {
  e: React.MouseEvent;
}

type SettingsProps =
  | { preference: "language"; value: Language }
  | { preference: "theme"; value: Theme }
  | { preference: "currency"; value: Currency };

export default function Settings() {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [requestErrors, setRequestErrors] = useState<[]>([]);
  const [saved, setSaved] = useState(false);
  const errorIdKey = useId();
  const { setUserPreferences } = useAuth();
  const { preferences, setPreferences } = usePreferences();
  const navigate = useNavigate();

  const submitClickHandler = async ({ e }: SubmitClickProps) => {
    e.preventDefault();
    if (loadingSubmit) return;
    setLoadingSubmit(true);
    setSaved(false);
    const res = await preferencesRequest(preferences);
    if (res.status == 200) {
      setLoadingSubmit(false);
      setSaved(true);
      return;
    }
    setRequestErrors(res.data.error);
    setLoadingSubmit(false);
    setSaved(false);
  };

  const handleSettingChange = ({ preference, value }: SettingsProps) => {
    const newState = { ...preferences, [preference]: value };
    setPreferences(newState);
    setUserPreferences(newState);
    saveInLocalStorage({ item: "language", value: preferences.language });
    setSaved(false);
  };

  return (
    <div className="min-h-screen-minus-64 bg-gray-100 dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            {LANGUAGE.SETTINGS.TITLE[preferences.language]}
          </h1>

          <div className="space-y-6">
            <SettingsSection
              icon={<User className="h-6 w-6" />}
              title={LANGUAGE.SETTINGS.USER_PREF_TITLE[preferences.language]}
              description={
                LANGUAGE.SETTINGS.USER_PREF_DESCRIPTION[preferences.language]
              }
            >
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {LANGUAGE.SETTINGS.LANGUAGE[preferences.language]}
                  </label>
                  <select
                    value={preferences.language}
                    onChange={(e) =>
                      handleSettingChange({
                        preference: "language",
                        value: e.target.value as Language,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 dark:bg-gray-950 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {LANGUAGE.SETTINGS.CURRENCY[preferences.language]}
                  </label>
                  <select
                    value={preferences.currency}
                    onChange={(e) =>
                      handleSettingChange({
                        preference: "currency",
                        value: e.target.value as Currency,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 dark:bg-gray-950 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>
            </SettingsSection>

            <SettingsSection
              icon={<Palette className="h-6 w-6" />}
              title={LANGUAGE.SETTINGS.APPEARENCE_TITLE[preferences.language]}
              description={
                LANGUAGE.SETTINGS.APPEARENCE_DESCRIPTION[preferences.language]
              }
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {LANGUAGE.SETTINGS.THEME[preferences.language]}
                  </label>
                  <select
                    value={preferences.theme}
                    onChange={(e) =>
                      handleSettingChange({
                        preference: "theme",
                        value: e.target.value as Theme,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 dark:bg-gray-950 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="light">
                      {LANGUAGE.SETTINGS.LIGHT[preferences.language]}
                    </option>
                    <option value="dark">
                      {LANGUAGE.SETTINGS.DARK[preferences.language]}
                    </option>
                    <option value="system">
                      {LANGUAGE.SETTINGS.SYSTEM[preferences.language]}
                    </option>
                  </select>
                </div>
              </div>
            </SettingsSection>
          </div>
          <div
            className="flex items-center justify-between"
            style={{ display: requestErrors.length == 0 ? "none" : "block" }}
          >
            <div className="flex items-center">
              {requestErrors.map((item) => (
                <p
                  key={errorIdKey}
                  className="block text-sm"
                  style={{ color: "var(--wrong)" }}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              className="px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              {LANGUAGE.SETTINGS.BACK[preferences.language]}
            </button>
            <button
              type="button"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e) => {
                submitClickHandler({ e });
              }}
            >
              {loadingSubmit ? (
                <CircleDashed className="loader" />
              ) : (
                <span className="flex flex-row justify-center items-center gap-1">
                  {LANGUAGE.SETTINGS.SAVE[preferences.language]}
                  {saved && (
                    <CheckCircle2 className="h-4 w-4 text-[--good]"></CheckCircle2>
                  )}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
