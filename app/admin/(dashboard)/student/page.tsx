"use client";
import { useState, useEffect, useCallback } from "react";
import { Search, Mail, RefreshCw } from "lucide-react";

type Student = {
  id: string; student_name: string; parent_name: string;
  email: string; phone: string; grade: string;
  program: string; student_age: string; submitted_at: string;
};

function initials(name: string) {
  return name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [filterProg, setFilterProg] = useState("all");

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    const res  = await fetch("/api/admin/applications?status=accepted");
    const data = await res.json();
    setStudents(data.applications || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  const programs = ["all", ...Array.from(new Set(students.map(s => s.program).filter(Boolean)))];

  const filtered = students.filter(s => {
    const q = search.toLowerCase();
    return (
      (s.student_name.toLowerCase().includes(q) || s.parent_name.toLowerCase().includes(q)) &&
      (filterProg === "all" || s.program === filterProg)
    );
  });

  return (
    <div className="p-7 pb-16">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-2xl font-bold text-stone-800 font-serif">Students</h1>
          <p className="text-sm text-stone-500 mt-1">
            {loading ? "Loading…" : `${students.length} accepted student${students.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <button onClick={fetchStudents}
          className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-200 rounded-lg text-sm text-stone-600 hover:bg-stone-50 transition-colors">
          <RefreshCw size={13} /> Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3.5 mb-5">
        {[
          ["Total Accepted",    loading ? "…" : students.length,          "Enrolled students"],
          ["Programs",         loading ? "…" : programs.length - 1,       "Distinct programs"],
          ["Latest Intake",    loading || students.length === 0 ? "—"
            : new Date(students[0].submitted_at).toLocaleDateString("en-GB", { day:"numeric", month:"short" }), "Most recent acceptance"],
        ].map(([l, v, s]) => (
          <div key={String(l)} className="bg-white rounded-xl border border-stone-200 shadow-sm p-5">
            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">{l}</p>
            <p className="text-3xl font-bold text-stone-800 font-serif mt-1.5 leading-none">{v}</p>
            <p className="text-xs text-stone-400 mt-1">{s}</p>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div className="flex gap-2.5 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-52">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input type="text" placeholder="Search by student or parent name…" value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-lg text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200" />
        </div>
        {programs.map(p => (
          <button key={p} onClick={() => setFilterProg(p)}
            className={`px-3.5 py-1 rounded-full text-xs font-bold border capitalize transition-colors
              ${filterProg === p
                ? "bg-green-700 text-white border-green-700"
                : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"}`}>
            {p}
          </button>
        ))}
      </div>

      {/* Student cards */}
      {loading ? (
        <p className="text-center text-stone-400 text-sm py-16">Loading students…</p>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-16 text-center">
          <p className="text-stone-400 text-sm">
            {students.length === 0
              ? "No accepted students yet. Accept applications to see them here."
              : "No students match your search."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5">
          {filtered.map(student => (
            <div key={student.id} className="bg-white rounded-xl border border-stone-200 shadow-sm p-4">
              <div className="flex items-start gap-3 mb-3.5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-green-300 flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#0f2419,#15803d)" }}>
                  {initials(student.student_name)}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold text-stone-800 truncate">{student.student_name}</p>
                  <p className="text-xs text-stone-500">{student.grade || "—"} · Age {student.student_age || "—"}</p>
                </div>
                {student.program && (
                  <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex-shrink-0 text-center leading-tight">
                    {student.program}
                  </span>
                )}
              </div>

              <div className="space-y-1 mb-3.5">
                <p className="text-xs text-stone-600">👤 {student.parent_name}</p>
                <p className="text-xs text-stone-600">📧 {student.email}</p>
                <p className="text-xs text-stone-600">📞 {student.phone}</p>
                <p className="text-[11px] text-stone-400">
                  Accepted {new Date(student.submitted_at).toLocaleDateString("en-GB")}
                </p>
              </div>

              <div className="flex gap-2">
                <a href={`/admin/applications`}
                  className="flex-1 py-1.5 border border-stone-200 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors text-center">
                  View Application
                </a>
                <a href={`mailto:${student.email}`}
                  className="px-2.5 py-1.5 border border-stone-200 rounded-lg text-stone-500 hover:bg-stone-50 transition-colors">
                  <Mail size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}