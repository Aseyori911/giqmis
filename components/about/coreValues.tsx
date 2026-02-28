"use client";

import { useTranslations } from "next-intl";
import { coreValues } from "./data";

export default function CoreValues() {
  const t = useTranslations("about");

  return (
    <section className="py-20 bg-white dark:bg-stone-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-4">
            {t("valuesTitle")}
          </h3>
          <p className="text-slate-500 dark:text-stone-400 max-w-2xl mx-auto">
            {t("valuesSubtitle")}
          </p>
          <div className="bg-orange-500 border border-orange-500 w-[10%] mx-auto mt-3 h-1"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-[80%] mx-auto">
          {coreValues.map(({ emoji, title, description }) => (
            <div key={title} className="text-center p-8">
              <div className="w-20 h-20 bg-gray-50 dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl text-orange-500">
                {emoji}
              </div>
              <h4 className="text-xl text-slate-800 dark:text-stone-100 mb-4">
                {title}
              </h4>
              <p className="text-slate-500 dark:text-stone-400 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
