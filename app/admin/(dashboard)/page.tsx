"use client";
import { useEffect, useState, useCallback } from "react";
import { FileText, Users, Clock, TrendingUp, AlertCircle, BookOpen, Pin } from "lucide-react";

type Application = {
  id: string; student_name: string; parent_name: string;
  program: string; grade: string; status: string; submitted_at: string;
};

type Announcement = {
  id: string; title: string; body: string;
  audience: string; published_at: string; pinned: boolean;
};

const statusColors: Record<string, string> = {
  pending:  "bg-yellow-100 text-yellow-800",
  reviewed: "bg-blue-100 text-blue-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const [apps, setApps] = useState<Application[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [appsRes, annRes] = await Promise.all([
      fetch("/api/admin/applications"),
      fetch("/api/admin/announcements"),
    ]);
    const appsData = await appsRes.json();
    const annData  = await annRes.json();
    setApps(appsData.applications || []);
    setAnnouncements(annData.announcements || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const pending  = apps.filter(a => a.status === "pending");
  const accepted = apps.filter(a => a.status === "accepted");
  const recent   = [...apps].slice(0, 4);
  const pinned   = announcements.filter(a => a.pinned);

  const stats = [
    { label: "Total Applications", value: loading ? "…" : apps.length,     sub: "All time",           accent: "border-green-500",  icon: FileText,   iconBg: "bg-green-50",  iconColor: "text-green-600" },
    { label: "Pending Review",     value: loading ? "…" : pending.length,  sub: "Awaiting action",    accent: "border-amber-500",  icon: Clock,      iconBg: "bg-amber-50",  iconColor: "text-amber-600" },
    { label: "Accepted Students",  value: loading ? "…" : accepted.length, sub: "Accepted this term", accent: "border-blue-500",   icon: Users,      iconBg: "bg-blue-50",   iconColor: "text-blue-600" },
    { label: "Total Announcements",value: loading ? "…" : announcements.length, sub: "Published",     accent: "border-rose-500",   icon: TrendingUp, iconBg: "bg-rose-50",   iconColor: "text-rose-600" },
  ];

  return (
    <div className="p-7 pb-16">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-800 font-serif">Dashboard</h1>
        <p className="text-sm text-stone-500 mt-1">
          Welcome back —{" "}
          {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3.5 mb-5">
        {stats.map(({ label, value, sub, accent, icon: Icon, iconBg, iconColor }) => (
          <div key={label} className={`bg-white rounded-xl border border-stone-200 shadow-sm p-5 border-l-4 ${accent}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">{label}</p>
                <p className="text-3xl font-bold text-stone-800 font-serif mt-1.5 leading-none">{value}</p>
                <p className="text-xs text-stone-400 mt-1">{sub}</p>
              </div>
              <div className={`p-2 rounded-lg ${iconBg}`}>
                <Icon size={18} className={iconColor} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Recent applications */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
          <div className="px-5 py-3.5 border-b border-stone-100 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-green-600" />
              <h2 className="text-sm font-bold text-stone-800">Recent Applications</h2>
            </div>
            <a href="/admin/applications" className="text-xs text-green-700 font-semibold hover:underline">View all →</a>
          </div>
          {loading ? (
            <p className="text-center text-stone-400 text-sm py-10">Loading…</p>
          ) : recent.length === 0 ? (
            <p className="text-center text-stone-400 text-sm py-10">No applications yet.</p>
          ) : recent.map(app => (
            <div key={app.id} className="px-5 py-3 border-b border-stone-50 flex justify-between items-center last:border-0">
              <div>
                <p className="text-sm font-semibold text-stone-800">{app.student_name}</p>
                <p className="text-xs text-stone-500">{app.program} · {app.grade}</p>
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${statusColors[app.status] || "bg-stone-100 text-stone-600"}`}>
                  {app.status}
                </span>
                <p className="text-[11px] text-stone-400 mt-1">
                  {new Date(app.submitted_at).toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {/* Pending alert */}
          {!loading && pending.length > 0 && (
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm border-l-4 border-l-amber-500">
              <div className="px-5 py-3.5 flex items-center gap-2 border-b border-stone-100">
                <AlertCircle size={14} className="text-amber-500" />
                <h2 className="text-sm font-bold text-stone-800">Awaiting Review ({pending.length})</h2>
              </div>
              {pending.map(app => (
                <div key={app.id} className="px-5 py-3 border-b border-stone-50 flex justify-between items-center last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-stone-800">{app.student_name}</p>
                    <p className="text-xs text-stone-500">{app.parent_name}</p>
                  </div>
                  <a href="/admin/applications" className="text-xs text-green-700 font-semibold hover:underline">Review →</a>
                </div>
              ))}
            </div>
          )}

          {/* Pinned announcements */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm">
            <div className="px-5 py-3.5 border-b border-stone-100 flex items-center gap-2">
              <Pin size={14} className="text-green-600" />
              <h2 className="text-sm font-bold text-stone-800">Pinned Announcements</h2>
            </div>
            {loading ? (
              <p className="text-center text-stone-400 text-sm py-8">Loading…</p>
            ) : pinned.length === 0 ? (
              <p className="text-center text-stone-400 text-sm py-8">No pinned announcements.</p>
            ) : pinned.map(ann => (
              <div key={ann.id} className="px-5 py-3 border-b border-stone-50 last:border-0">
                <div className="flex items-start gap-2">
                  <BookOpen size={12} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-stone-800">{ann.title}</p>
                    <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{ann.body.slice(0, 80)}…</p>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 mt-1 inline-block">
                      {ann.audience}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}