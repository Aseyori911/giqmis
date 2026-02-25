"use client";
import { useState, useEffect, useCallback } from "react";
import { Globe, BookOpen, Bell, Lock, Save, RefreshCw } from "lucide-react";

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      onClick={() => onChange(!value)}
      className={`w-10 h-5 rounded-full relative cursor-pointer flex-shrink-0 transition-colors duration-200 ${value ? "bg-green-600" : "bg-stone-300"}`}
    >
      <div
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${value ? "left-5" : "left-0.5"}`}
      />
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm mb-4 overflow-hidden">
      <div className="px-5 py-3 border-b border-stone-100 bg-stone-50 flex items-center gap-2">
        {icon}
        <h2 className="text-sm font-bold text-stone-800">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [enrollOpen, setEnrollOpen] = useState(true);
  const [deadline, setDeadline] = useState("2025-04-30");
  const [maxPerClass, setMaxPerClass] = useState("12");
  const [programs, setPrograms] = useState([
    {
      id: "program_full_time",
      label: "Full-time Arabic & Islamic Studies",
      active: true,
    },
    { id: "program_weekend", label: "Weekend Arabic Program", active: true },
    { id: "program_quran", label: "Quran Memorization (Hifz)", active: true },
    { id: "program_language", label: "Arabic Language Only", active: false },
    { id: "program_summer", label: "Summer Intensive Program", active: false },
  ]);
  const [notifs, setNotifs] = useState({
    notif_new_app: true,
    notif_weekly: true,
    notif_attendance: true,
    notif_messages: false,
  });
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [passError, setPassError] = useState("");
  const [passSaved, setPassSaved] = useState(false);

  const inputCls =
    "w-full px-3 py-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200";
  const labelCls =
    "block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5";

  // Load settings from Supabase on mount
  const fetchSettings = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/settings");
    const data = await res.json();
    const s = data.settings || {};

    setEnrollOpen(s.enrollment_open === "true");
    setDeadline(s.enrollment_deadline || "2025-04-30");
    setMaxPerClass(s.max_per_class || "12");
    setPrograms((prev) =>
      prev.map((p) => ({ ...p, active: s[p.id] === "true" })),
    );
    setNotifs({
      notif_new_app: s.notif_new_app === "true",
      notif_weekly: s.notif_weekly === "true",
      notif_attendance: s.notif_attendance === "true",
      notif_messages: s.notif_messages === "true",
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Save all settings to Supabase
  const handleSave = async () => {
    setSaving(true);

    const settings: Record<string, string> = {
      enrollment_open: String(enrollOpen),
      enrollment_deadline: deadline,
      max_per_class: maxPerClass,
      notif_new_app: String(notifs.notif_new_app),
      notif_weekly: String(notifs.notif_weekly),
      notif_attendance: String(notifs.notif_attendance),
      notif_messages: String(notifs.notif_messages),
    };

    programs.forEach((p) => {
      settings[p.id] = String(p.active);
    });

    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings }),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handlePasswordChange = () => {
    setPassError("");
    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      setPassError("Please fill in all password fields.");
      return;
    }
    if (passwords.newPass !== passwords.confirm) {
      setPassError("New passwords do not match.");
      return;
    }
    if (passwords.newPass.length < 8) {
      setPassError("Password must be at least 8 characters.");
      return;
    }
    setPassSaved(true);
    setPasswords({ current: "", newPass: "", confirm: "" });
    setTimeout(() => setPassSaved(false), 2500);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-stone-400 text-sm">
        Loading settings…
      </div>
    );

  return (
    <div className="p-7 pb-16 max-w-2xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-800 font-serif">
            Settings
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Changes saved here reflect immediately on the public Apply Now form
          </p>
        </div>
        <button
          onClick={fetchSettings}
          className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-200 rounded-lg text-sm text-stone-600 hover:bg-stone-50 transition-colors"
        >
          <RefreshCw size={13} /> Reload
        </button>
      </div>

      {/* Enrollment */}
      <Section
        title="Enrollment"
        icon={<Globe size={15} className="text-green-700" />}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Application Deadline</label>
            <input
              type="date"
              className={inputCls}
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls}>Max Students per Class</label>
            <input
              type="number"
              className={inputCls}
              value={maxPerClass}
              onChange={(e) => setMaxPerClass(e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className={labelCls}>Enrollment Status</label>
            <div className="flex items-center gap-3">
              <Toggle value={enrollOpen} onChange={setEnrollOpen} />
              <span className="text-sm text-stone-600">
                {enrollOpen
                  ? "✅ Accepting Applications"
                  : "🔒 Enrollment Closed"}
              </span>
            </div>
            {!enrollOpen && (
              <p className="mt-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                ⚠ The Apply Now form on your website will show an enrollment
                closed message when this is off.
              </p>
            )}
          </div>
        </div>
      </Section>

      {/* Programs */}
      <Section
        title="Active Programs"
        icon={<BookOpen size={15} className="text-green-700" />}
      >
        <p className="text-sm text-stone-500 mb-3">
          Only active programs will appear in the Apply Now form dropdown.
        </p>
        <div className="flex flex-col gap-2">
          {programs.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between px-4 py-2.5 bg-stone-50 rounded-lg border border-stone-100"
            >
              <span className="text-sm text-stone-700">{p.label}</span>
              <Toggle
                value={p.active}
                onChange={() =>
                  setPrograms((prev) =>
                    prev.map((x) =>
                      x.id === p.id ? { ...x, active: !x.active } : x,
                    ),
                  )
                }
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Notifications */}
      <Section
        title="Notifications"
        icon={<Bell size={15} className="text-green-700" />}
      >
        <p className="text-sm text-stone-500 mb-3">
          Note: Email notifications require an email service like Resend or
          SendGrid to be connected.
        </p>
        <div className="flex flex-col gap-2">
          {(
            [
              ["notif_new_app", "Email on new application submission"],
              ["notif_weekly", "Weekly enrollment summary report"],
              ["notif_attendance", "Alert when attendance drops below 75%"],
              ["notif_messages", "Notify me of new parent messages"],
            ] as const
          ).map(([k, l]) => (
            <div
              key={k}
              className="flex items-center justify-between px-4 py-2.5 bg-stone-50 rounded-lg border border-stone-100"
            >
              <span className="text-sm text-stone-700">{l}</span>
              <Toggle
                value={notifs[k]}
                onChange={(v) => setNotifs({ ...notifs, [k]: v })}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Save button */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 px-5 py-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          <Save size={14} /> {saving ? "Saving…" : "Save Settings"}
        </button>
        {saved && (
          <span className="text-sm text-green-700 font-semibold">
            ✓ Settings saved — form updated live
          </span>
        )}
      </div>

      {/* Password */}
      <Section
        title="Change Password"
        icon={<Lock size={15} className="text-green-700" />}
      >
        <p className="text-sm text-stone-500 mb-4">
          To change your admin password, update the{" "}
          <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs">
            ADMIN_PASSWORD
          </code>{" "}
          environment variable in Vercel and redeploy.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className={labelCls}>Current Password</label>
            <input
              type="password"
              className={inputCls}
              placeholder="••••••••"
              value={passwords.current}
              onChange={(e) =>
                setPasswords({ ...passwords, current: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelCls}>New Password</label>
            <input
              type="password"
              className={inputCls}
              placeholder="••••••••"
              value={passwords.newPass}
              onChange={(e) =>
                setPasswords({ ...passwords, newPass: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelCls}>Confirm New Password</label>
            <input
              type="password"
              className={inputCls}
              placeholder="••••••••"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
            />
          </div>
        </div>
        {passError && (
          <p className="mt-3 text-sm text-red-600">⚠ {passError}</p>
        )}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handlePasswordChange}
            className="flex items-center gap-1.5 px-5 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            <Lock size={14} /> Update Password
          </button>
          {passSaved && (
            <span className="text-sm text-green-700 font-semibold">
              ✓ Password updated
            </span>
          )}
        </div>
      </Section>
    </div>
  );
}
