"use client";

import { useEffect, useState, useCallback } from "react";
import { FileText, Users, Clock, TrendingUp } from "lucide-react";

type Application = {
  id: string;
  student_name: string;
  parent_name: string;
  program: string;
  grade: string;
  status: string;
  submitted_at: string;
};

const statusColors: Record<string, string> = {
  pending:  "bg-yellow-100 text-yellow-800",
  reviewed: "bg-blue-100 text-blue-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/applications");
      const data = await res.json();
      setApps(data.applications || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sortedApps = [...apps].sort(
    (a, b) =>
      new Date(b.submitted_at).getTime() - new Date(a.submitted_at).getTime()
  );

  const pending  = sortedApps.filter(a => a.status === "pending");
  const accepted = sortedApps.filter(a => a.status === "accepted");
  const reviewed = sortedApps.filter(a => a.status === "reviewed");
  const recent   = sortedApps.slice(0, 4);

  const stats = [
    {
      label:     "Total Applications",
      value:     loading ? "…" : sortedApps.length,
      sub:       "All time",
      accent:    "border-green-500",
      icon:      FileText,
      iconBg:    "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      label:     "Pending Review",
      value:     loading ? "…" : pending.length,
      sub:       "Awaiting action",
      accent:    "border-amber-500",
      icon:      Clock,
      iconBg:    "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      label:     "Accepted Students",
      value:     loading ? "…" : accepted.length,
      sub:       "Accepted this term",
      accent:    "border-blue-500",
      icon:      Users,
      iconBg:    "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label:     "Reviewed",
      value:     loading ? "…" : reviewed.length,
      sub:       "Marked as reviewed",
      accent:    "border-rose-500",
      icon:      TrendingUp,
      iconBg:    "bg-rose-50",
      iconColor: "text-rose-600",
    },
  ];

  return (
    <div className="p-5 sm:p-7 pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 font-serif">
          Dashboard
        </h1>
        <p className="text-sm text-stone-500 mt-2">
          Welcome back —{" "}
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 mb-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, sub, accent, icon: Icon, iconBg, iconColor }) => (
          <div
            key={label}
            className={`bg-white rounded-2xl border border-stone-200 shadow-sm p-6 border-l-4 ${accent}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {label}
                </p>
                <p className="text-3xl font-bold text-stone-800 font-serif mt-2 leading-none">
                  {value}
                </p>
                <p className="text-xs text-stone-400 mt-2">{sub}</p>
              </div>
              <div className={`p-3 rounded-xl ${iconBg}`}>
                <Icon size={18} className={iconColor} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">

        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm">
            <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center">
              <h2 className="text-sm font-bold text-stone-800">Recent Applications</h2>
              <a href="/admin/applications" className="text-xs text-green-700 font-semibold hover:underline">
                View all →
              </a>
            </div>

            {loading ? (
              <p className="text-center text-stone-400 text-sm py-12">Loading…</p>
            ) : recent.length === 0 ? (
              <p className="text-center text-stone-400 text-sm py-12">No applications yet.</p>
            ) : recent.map(app => (
              <div
                key={app.id}
                className="px-6 py-4 border-b border-stone-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 last:border-0"
              >
                <div>
                  <p className="text-sm font-semibold text-stone-800">{app.student_name}</p>
                  <p className="text-xs text-stone-500">{app.program} · {app.grade}</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${statusColors[app.status] || "bg-stone-100 text-stone-600"}`}>
                    {app.status}
                  </span>
                  <p className="text-xs text-stone-400 mt-1">
                    {new Date(app.submitted_at).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awaiting Review */}
        <div className="flex flex-col gap-6">
          {!loading && pending.length > 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm border-l-4 border-l-amber-500">
              <div className="px-6 py-4 border-b border-stone-100">
                <h2 className="text-sm font-bold text-stone-800">
                  Awaiting Review ({pending.length})
                </h2>
              </div>
              {pending.slice(0, 5).map(app => (
                <div
                  key={app.id}
                  className="px-6 py-4 border-b border-stone-50 flex justify-between items-center last:border-0"
                >
                  <div>
                    <p className="text-sm font-semibold text-stone-800">{app.student_name}</p>
                    <p className="text-xs text-stone-500">{app.parent_name}</p>
                  </div>
                  <a href="/admin/applications" className="text-xs text-green-700 font-semibold hover:underline">
                    Review →
                  </a>
                </div>
              ))}
            </div>
          )}

          {!loading && pending.length === 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 text-center">
              <p className="text-sm text-stone-400">No pending applications 🎉</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}