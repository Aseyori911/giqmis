"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, RefreshCw } from "lucide-react";
import { Program, Notifs } from "./types";
import EnrollmentSection from "./enrollmentSection";
import ProgramsSection from "./programsSection";
import NotificationsSection from "./notificationsSection";
import PasswordSection from "./passwordSection";

const DEFAULT_PROGRAMS: Program[] = [
  { id: "Arabic_Beginner",        label: "Arabic (Beginner)",        active: true },
  { id: "Arabic_Intermediate",    label: "Arabic (Intermediate)",    active: true },
  { id: "Quran_Revision",         label: "Quran Revision",           active: true },
  { id: "Quran_Recitation",       label: "Quran Recitation",         active: true },
  { id: "Beginner_Tajweed",       label: "Beginner Tajweed",         active: false },
  { id: "Advanced_Tajweed",       label: "Advanced Tajweed",         active: false },
  { id: "Adkar",                  label: "Adkar",                    active: false },
  { id: "Hifdh",                  label: "Hifdh",                    active: false },
  { id: "Hadith",                 label: "Hadith",                   active: false },
  { id: "Lessons from the Quran", label: "Lessons from the Quran",   active: false },
  { id: "Islamic_Studies",        label: "Islamic Studies",          active: false },
];

export default function SettingsPage() {
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [enrollOpen, setEnrollOpen] = useState(true);
  const [deadline, setDeadline]   = useState("2025-04-30");
  const [maxPerClass, setMaxPerClass] = useState("12");
  const [programs, setPrograms]   = useState<Program[]>(DEFAULT_PROGRAMS);
  const [notifs, setNotifs]       = useState<Notifs>({
    notif_new_app: true, notif_weekly: true,
    notif_attendance: true, notif_messages: false,
  });

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    const res  = await fetch("/api/admin/settings");
    const data = await res.json();
    const s    = data.settings || {};

    setEnrollOpen(s.enrollment_open === "true");
    setDeadline(s.enrollment_deadline || "2025-04-30");
    setMaxPerClass(s.max_per_class || "12");
    setNotifs({
      notif_new_app:     s.notif_new_app     === "true",
      notif_weekly:      s.notif_weekly      === "true",
      notif_attendance:  s.notif_attendance  === "true",
      notif_messages:    s.notif_messages    === "true",
    });

    // Restore programs — use saved custom_programs if available, else fall back to defaults
    if (s.custom_programs) {
      try {
        const saved: Program[] = JSON.parse(s.custom_programs)
        // Merge: for each saved program apply its saved active state
        setPrograms(saved)
      } catch {
        // If JSON is malformed fall back to defaults with saved toggle states
        setPrograms(DEFAULT_PROGRAMS.map(p => ({ ...p, active: s[p.id] === "true" })))
      }
    } else {
      setPrograms(DEFAULT_PROGRAMS.map(p => ({ ...p, active: s[p.id] === "true" })))
    }

    setLoading(false);
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const handleSave = async () => {
    setSaving(true);
    const settings: Record<string, string> = {
      enrollment_open:      String(enrollOpen),
      enrollment_deadline:  deadline,
      max_per_class:        maxPerClass,
      notif_new_app:        String(notifs.notif_new_app),
      notif_weekly:         String(notifs.notif_weekly),
      notif_attendance:     String(notifs.notif_attendance),
      notif_messages:       String(notifs.notif_messages),
      // Save full program list as JSON so adds/deletes persist
      custom_programs:      JSON.stringify(programs),
    };

    // Also save individual toggle keys for backwards compatibility with the enrollment form
    programs.forEach(p => { settings[p.id] = String(p.active) });

    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
          <h1 className="text-2xl font-bold text-stone-800 font-serif">Settings</h1>
          <p className="text-sm text-stone-500 mt-1">
            Changes saved here reflect immediately on the public Apply Now form
          </p>
        </div>
        <button onClick={fetchSettings}
          className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-200 rounded-lg text-sm text-stone-600 hover:bg-stone-50 transition-colors">
          <RefreshCw size={13} /> Reload
        </button>
      </div>

      <EnrollmentSection
        enrollOpen={enrollOpen}     setEnrollOpen={setEnrollOpen}
        deadline={deadline}         setDeadline={setDeadline}
        maxPerClass={maxPerClass}   setMaxPerClass={setMaxPerClass}
      />
      <ProgramsSection programs={programs} setPrograms={setPrograms} />
      <NotificationsSection notifs={notifs} setNotifs={setNotifs} />

      <div className="flex items-center gap-3 mb-6">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-1.5 px-5 py-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white rounded-lg text-sm font-semibold transition-colors">
          <Save size={14} /> {saving ? "Saving…" : "Save Settings"}
        </button>
        {saved && (
          <span className="text-sm text-green-700 font-semibold">
            ✓ Settings saved — form updated live
          </span>
        )}
      </div>

      <PasswordSection />
    </div>
  );
}