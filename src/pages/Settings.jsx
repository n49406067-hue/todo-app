
import { useState } from "react";
import {
  Settings as SettingsIcon,
  Bell,
  Palette,
  UserRound,
  Save,
  CheckCircle,
} from "lucide-react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [theme, setTheme] = useState("Light");
  const [message, setMessage] = useState("");

  function handleSave() {
    localStorage.setItem(
      "todoSettings",
      JSON.stringify({
        notifications,
        emailUpdates,
        theme,
      })
    );

    setMessage("Settings saved successfully!");
  }

  return (
    <div className="space-y-6">

      {/* Page Heading */}
      <div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
            <SettingsIcon size={30} />
          </div>

          <h1 className="text-4xl font-bold text-slate-950">
            Settings
          </h1>
        </div>

        <p className="mt-3 text-lg text-slate-600">
          Customize your To Do App preferences.
        </p>
      </div>

      {/* General Settings */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <UserRound size={24} className="text-blue-600" />

          <h2 className="text-xl font-bold text-slate-950">
            General Preferences
          </h2>
        </div>

        <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-5">
          <div>
            <h3 className="font-semibold text-slate-900">
              Notifications
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Enable task notification preferences.
            </p>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={(event) =>
              setNotifications(event.target.checked)
            }
            className="h-5 w-5 accent-blue-600"
          />
        </div>

        <div className="flex items-center justify-between gap-4 py-5">
          <div>
            <h3 className="font-semibold text-slate-900">
              Email Updates
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Enable email update preferences.
            </p>
          </div>

          <input
            type="checkbox"
            checked={emailUpdates}
            onChange={(event) =>
              setEmailUpdates(event.target.checked)
            }
            className="h-5 w-5 accent-blue-600"
          />
        </div>
      </section>

      {/* Appearance Settings */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <Palette size={24} className="text-violet-600" />

          <h2 className="text-xl font-bold text-slate-950">
            Appearance
          </h2>
        </div>

        <label className="mb-2 block font-semibold text-slate-900">
          Theme
        </label>

        <select
          value={theme}
          onChange={(event) => setTheme(event.target.value)}
          className="w-full max-w-sm rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
          <option value="System">System Default</option>
        </select>

        <p className="mt-2 text-sm text-slate-500">
          Theme selection is saved as a preference; visual theme switching can be added later.
        </p>
      </section>

      {/* Save Button */}
      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Save size={20} />
          Save Settings
        </button>

        {message && (
          <p className="flex items-center gap-2 text-sm font-medium text-emerald-600">
            <CheckCircle size={18} />
            {message}
          </p>
        )}
      </div>

    </div>
  );
}

export default Settings;
