"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutStory() {
  const t = useTranslations("about");

  return (
    <section className="py-20 bg-white dark:bg-stone-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-[80%] mx-auto">
          <div>
            <h3 className="text-[28px] text-black dark:text-stone-100 font-bold mb-5">
              {t("storyTitle")}
            </h3>
            <p className="text-slate-500 dark:text-stone-400 leading-relaxed mb-4">
              {t("story1")}
            </p>
            <p className="text-slate-500 dark:text-stone-400 leading-relaxed mb-4">
              {t("story2")}
            </p>
            <p className="text-slate-500 dark:text-stone-400 leading-relaxed mb-4">
              {t("story3")}
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://plus.unsplash.com/premium_photo-1679065960816-77d101ec25f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXJhYmljJTIwc2Nob29sfGVufDB8fDB8fHww"
              alt=""
              width={500}
              height={500}
              className="w-full h-auto block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
