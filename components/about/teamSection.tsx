"use client";

import { useTranslations } from "next-intl";
import { teamMembers } from "./data";

export default function TeamSection() {
  const t = useTranslations("about");

  return (
    <section className="py-20 bg-gray-50 dark:bg-stone-950 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-4">
            {t("teamTitle")}
          </h3>
          <p className="text-slate-500 dark:text-stone-400 max-w-2xl mx-auto">
            {t("teamSubtitle")}
          </p>
          <div className="bg-orange-500 border border-orange-500 w-[10%] mx-auto mt-3 h-1"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-[80%] mx-auto">
          {teamMembers.map(({ name, role, color, bio }) => (
            <div
              key={name}
              className="bg-white dark:bg-stone-800 rounded-lg overflow-hidden shadow-sm"
            >
              <div className="h-60" style={{ backgroundColor: color }} />
              <div className="p-5 text-center">
                <h4 className="text-lg text-slate-800 dark:text-stone-100 mb-1">
                  {name}
                </h4>
                <p className="text-orange-500 text-sm mb-4">{role}</p>
                <p className="text-sm text-slate-500 dark:text-stone-400 leading-relaxed mb-4">
                  {bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
