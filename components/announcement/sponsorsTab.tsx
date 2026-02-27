"use client";

import { useState } from "react";
import { Trash2, Download, Heart, Phone, Mail, Crown } from "lucide-react";
import { toast } from "react-hot-toast";
import { SponsorEntry } from "./types";

const TIER_LABELS: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  seed: {
    label: "🌱 Seed — ₦10,000/mo",
    color: "text-green-700",
    bg: "bg-green-50 border-green-200",
  },
  full: {
    label: "⭐ Full — ₦25,000/mo",
    color: "text-blue-700",
    bg: "bg-blue-50 border-blue-200",
  },
  legacy: {
    label: "👑 Legacy — ₦50,000/mo",
    color: "text-purple-700",
    bg: "bg-purple-50 border-purple-200",
  },
  custom: {
    label: "💛 Custom Amount",
    color: "text-orange-700",
    bg: "bg-orange-50 border-orange-200",
  },
};

export default function SponsorsTab({
  sponsors,
  loading,
  onRefresh,
}: {
  sponsors: SponsorEntry[];
  loading: boolean;
  onRefresh: () => void;
}) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete sponsor entry for ${name}?`)) return;
    setDeleting(id);
    try {
      const res = await fetch("/api/admin/sponsors", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        toast.error("Failed to delete.");
        return;
      }
      toast.success("Sponsor entry deleted.");
      onRefresh();
    } catch {
      toast.error("Network error.");
    } finally {
      setDeleting(null);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Tier",
      "Message",
      "Anonymous",
      "Submitted At",
    ];
    const rows = sponsors.map((s) =>
      [
        s.anonymous ? "Anonymous" : s.name,
        s.anonymous ? "—" : s.email,
        s.anonymous ? "—" : s.phone,
        TIER_LABELS[s.tier]?.label || s.tier,
        s.message || "",
        s.anonymous ? "Yes" : "No",
        new Date(s.submitted_at).toLocaleDateString("en-GB"),
      ].map((v) => `"${v.toString().replace(/"/g, '""')}"`),
    );

    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sponsors-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported!");
  };

  // Summary counts per tier
  const tierCounts = sponsors.reduce(
    (acc, s) => {
      acc[s.tier] = (acc[s.tier] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  if (loading)
    return (
      <p className="text-center text-stone-400 text-sm py-16">
        Loading sponsors…
      </p>
    );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-stone-700">
            Sponsorship Interest
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            {sponsors.length} entr{sponsors.length !== 1 ? "ies" : "y"} received
          </p>
        </div>
        {sponsors.length > 0 && (
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-stone-200 rounded-lg text-sm text-stone-500 hover:bg-stone-50 transition-colors"
          >
            <Download size={14} /> Export CSV
          </button>
        )}
      </div>

      {/* Tier Summary Cards */}
      {sponsors.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(["seed", "full", "legacy", "custom"] as const).map((tier) => (
            <div
              key={tier}
              className={`rounded-xl border p-4 ${TIER_LABELS[tier].bg}`}
            >
              <p
                className={`text-xs font-bold uppercase tracking-wider ${TIER_LABELS[tier].color}`}
              >
                {TIER_LABELS[tier].label.split("—")[0].trim()}
              </p>
              <p
                className={`text-3xl font-bold font-serif mt-1 ${TIER_LABELS[tier].color}`}
              >
                {tierCounts[tier] || 0}
              </p>
              <p className="text-xs text-stone-400 mt-0.5">sponsors</p>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {sponsors.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 p-16 text-center">
          <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart size={24} className="text-orange-400" />
          </div>
          <p className="text-stone-500 text-sm font-semibold">
            No sponsor entries yet
          </p>
          <p className="text-stone-400 text-xs mt-1">
            Entries will appear here when sponsors submit the form.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sponsors.map((s, i) => {
            const tier = TIER_LABELS[s.tier] || {
              label: s.tier,
              color: "text-stone-600",
              bg: "bg-stone-50 border-stone-200",
            };
            return (
              <div
                key={s.id}
                className="bg-white rounded-xl border border-stone-200 p-4 hover:border-stone-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left — number + info */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-orange-600">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="text-sm font-bold text-stone-800">
                          {s.anonymous ? (
                            <span className="flex items-center gap-1.5 text-stone-400 italic">
                              <Crown size={13} /> Anonymous Sponsor
                            </span>
                          ) : (
                            s.name
                          )}
                        </p>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tier.bg} ${tier.color}`}
                        >
                          {tier.label}
                        </span>
                        {s.anonymous && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 border border-stone-200">
                            Anonymous
                          </span>
                        )}
                      </div>

                      {/* Contact — hidden if anonymous */}
                      {!s.anonymous && (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
                          <a
                            href={`mailto:${s.email}`}
                            className="flex items-center gap-1 text-xs text-stone-500 hover:text-orange-600 transition-colors"
                          >
                            <Mail size={11} /> {s.email}
                          </a>
                          <a
                            href={`https://wa.me/${s.phone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-stone-500 hover:text-green-600 transition-colors"
                          >
                            <Phone size={11} /> {s.phone}
                          </a>
                        </div>
                      )}

                      {/* Message */}
                      {s.message && (
                        <p className="text-xs text-stone-500 bg-stone-50 rounded-lg px-3 py-2 border border-stone-100 leading-relaxed">
                          &ldquo;{s.message}&rdquo;
                        </p>
                      )}

                      <p className="text-[11px] text-stone-400 mt-1.5">
                        Submitted{" "}
                        {new Date(s.submitted_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      handleDelete(
                        s.id,
                        s.anonymous ? "this anonymous sponsor" : s.name,
                      )
                    }
                    disabled={deleting === s.id}
                    className="flex items-center gap-1 px-2.5 py-1.5 border border-red-200 rounded-lg text-xs text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50 flex-shrink-0"
                  >
                    <Trash2 size={12} /> {deleting === s.id ? "…" : "Delete"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
