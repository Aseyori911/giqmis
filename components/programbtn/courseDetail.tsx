import { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronRight, Calendar, Clock, BookOpen, Languages, StickyNote, CheckCircle2 } from "lucide-react";
import {
  Course,
  TabId,
  Tab,
  Feature,
  CurriculumWeek,
  ScheduleDate,
} from "./types";
import { TABS } from "./data";
import SpecialCourse from "../specialCourses";

type Props = {
  course: Course;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onClose: () => void;
};

const WEEK_COLORS = [
  { bg: "bg-orange-50 dark:bg-orange-900/10", border: "border-orange-200 dark:border-orange-800", badge: "bg-orange-500" },
  { bg: "bg-emerald-50 dark:bg-emerald-900/10", border: "border-emerald-200 dark:border-emerald-800", badge: "bg-emerald-500" },
  { bg: "bg-blue-50 dark:bg-blue-900/10", border: "border-blue-200 dark:border-blue-800", badge: "bg-blue-500" },
  { bg: "bg-purple-50 dark:bg-purple-900/10", border: "border-purple-200 dark:border-purple-800", badge: "bg-purple-500" },
];

const isSummerIntensive = (curriculum: CurriculumWeek[]) =>
  curriculum.some(w => w.quran || w.arabic)

export default function CourseDetail({
  course,
  activeTab,
  onTabChange,
  onClose,
}: Props) {
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const tabIds: TabId[] = ["overview", "curriculum", "schedule"];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diffX) < Math.abs(diffY)) return;
    if (Math.abs(diffX) < 50) return;
    const currentIndex = tabIds.indexOf(activeTab);
    if (diffX > 0 && currentIndex < tabIds.length - 1) {
      onTabChange(tabIds[currentIndex + 1]);
    } else if (diffX < 0 && currentIndex > 0) {
      onTabChange(tabIds[currentIndex - 1]);
    }
  };

  const isIntensive = isSummerIntensive(course.curriculum)

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-3 z-50">
      <div
        className="bg-white dark:bg-stone-900 rounded-2xl max-w-4xl w-full flex flex-col shadow-2xl"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className={`relative bg-gradient-to-r ${course.color} text-white p-2 flex gap-3 justify-center items-center rounded-t-2xl flex-shrink-0`}>
          <Image
            src="/Gladtidings_LOGO.JPG"
            alt="Glad"
            width={48}
            height={48}
            sizes="68px"
            className="w-24 h-24 rounded object-contain"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
              <p className="text-white/90 text-lg mb-4">{course.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-stone-700 flex-shrink-0">
          <div className="flex overflow-x-auto">
            {(TABS as Tab[]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-600 dark:text-stone-400 hover:text-gray-800 dark:hover:text-stone-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div
          className="p-8 overflow-y-auto flex-1"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >

          {/* ── OVERVIEW ── */}
          {activeTab === "overview" && (
            <div className="space-y-6">

              {/* Quote — summer intensive only */}
              {course.quote && (
                <div className="bg-emerald-50 dark:bg-emerald-900/10 border-l-4 border-emerald-500 rounded-r-xl px-5 py-4">
                  <p className="text-emerald-800 dark:text-emerald-300 italic text-base leading-relaxed mb-1">
                    &ldquo;{course.quote.text}&rdquo;
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
                    — {course.quote.source}
                  </p>
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-stone-100">
                  Course Description
                </h3>
                <p className="text-gray-600 dark:text-stone-400 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 dark:text-stone-100">
                    What You&apos;ll Learn
                  </h4>
                  <ul className="space-y-2">
                    {course.whatYouLearn.map((item: string, index: number) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-stone-400">
                        <ChevronRight size={16} className="text-orange-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 dark:text-stone-100">
                    Course Features
                  </h4>
                  <div className="space-y-3">
                    {course.features.map((feature: Feature, index: number) => {
                      const FeatureIcon = feature.icon as React.ComponentType<{ size?: number; className?: string }>;
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <FeatureIcon className="text-orange-500 flex-shrink-0" size={20} />
                          <span className="text-gray-600 dark:text-stone-400">{feature.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Student Expectations — summer intensive only */}
              {course.studentExpectations && (
                <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-5">
                  <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-amber-600" /> Student Expectations
                  </h4>
                  <ul className="space-y-2">
                    {course.studentExpectations.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400">
                        <span className="text-amber-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements — summer intensive only */}
              {course.requirements && (
                <div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-5">
                  <h4 className="font-semibold text-slate-700 dark:text-stone-200 mb-3">
                    📋 What You&apos;ll Need
                  </h4>
                  <ul className="space-y-2">
                    {course.requirements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-stone-400">
                        <span className="text-orange-500 font-bold mt-0.5 flex-shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* ── CURRICULUM ── */}
          {activeTab === "curriculum" && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-stone-100">
                Weekly Breakdown
              </h3>

              {/* Summer intensive — rich week cards with Qur'an / Arabic / Notes columns */}
              {isIntensive ? (
                <div className="space-y-4">
                  {/* Legend */}
                  <div className="flex flex-wrap gap-3 mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      <BookOpen size={13} /> Qur&apos;an Hifdh (1-on-1)
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400">
                      <Languages size={13} /> Arabic (Pre-recorded)
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-stone-500 dark:text-stone-400">
                      <StickyNote size={13} /> Notes
                    </span>
                  </div>

                  {/* Friday / Weekend info bar */}
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-lg px-4 py-3 text-center">
                      <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-0.5">Fridays</p>
                      <p className="text-sm text-orange-700 dark:text-orange-300">Catch-up & Revision</p>
                    </div>
                    <div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg px-4 py-3 text-center">
                      <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-0.5">Weekends</p>
                      <p className="text-sm text-slate-600 dark:text-stone-300">Rest & Personal Revision</p>
                    </div>
                  </div>

                  {/* Week cards */}
                  {course.curriculum.map((week: CurriculumWeek, idx: number) => {
                    const colors = WEEK_COLORS[idx % WEEK_COLORS.length]
                    return (
                      <div key={week.week} className={`rounded-xl border ${colors.border} ${colors.bg} overflow-hidden`}>
                        {/* Week header */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-inherit">
                          <span className={`${colors.badge} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>
                            Week {week.week}
                          </span>
                          <h4 className="font-semibold text-slate-800 dark:text-stone-100">{week.title}</h4>
                        </div>

                        {/* Qur'an / Arabic / Notes */}
                        <div className="divide-y divide-stone-100 dark:divide-stone-700">
                          {week.quran && (
                            <div className="flex items-start gap-3 px-4 py-3">
                              <div className="flex items-center gap-1.5 text-emerald-600 flex-shrink-0 w-32 text-xs font-semibold pt-0.5">
                                <BookOpen size={13} /> Qur&apos;an Hifdh
                              </div>
                              <p className="text-sm text-slate-600 dark:text-stone-400 leading-relaxed">{week.quran}</p>
                            </div>
                          )}
                          {week.arabic && (
                            <div className="flex items-start gap-3 px-4 py-3">
                              <div className="flex items-center gap-1.5 text-blue-600 flex-shrink-0 w-32 text-xs font-semibold pt-0.5">
                                <Languages size={13} /> Arabic
                              </div>
                              <p className="text-sm text-slate-600 dark:text-stone-400 leading-relaxed">{week.arabic}</p>
                            </div>
                          )}
                          {week.notes && (
                            <div className="flex items-start gap-3 px-4 py-3">
                              <div className="flex items-center gap-1.5 text-stone-400 flex-shrink-0 w-32 text-xs font-semibold pt-0.5">
                                <StickyNote size={13} /> Notes
                              </div>
                              <p className="text-sm text-slate-500 dark:text-stone-500 italic leading-relaxed">{week.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                /* Default curriculum layout for other courses */
                <div className="space-y-4">
                  {course.curriculum.map((week: CurriculumWeek) => (
                    <div
                      key={week.week}
                      className="border border-gray-200 dark:border-stone-700 rounded-lg p-4 hover:border-orange-200 dark:hover:border-orange-800 transition-colors"
                    >
                      <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-stone-100">
                        Week {week.week}: {week.title}
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {week.topics.map((topic: string, index: number) => (
                          <li key={index} className="text-gray-600 dark:text-stone-400 text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── SCHEDULE ── */}
          {activeTab === "schedule" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-stone-100">
                    Class Schedule
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-orange-500 flex-shrink-0" size={20} />
                      <div>
                        <div className="font-medium text-gray-800 dark:text-stone-100">{course.schedule.duration}</div>
                        <div className="text-gray-600 dark:text-stone-400 text-sm">Duration</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="text-orange-500 flex-shrink-0" size={20} />
                      <div>
                        <div className="font-medium text-gray-800 dark:text-stone-100">{course.schedule.time}</div>
                        <div className="text-gray-600 dark:text-stone-400 text-sm">Class times</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-stone-100">
                    Important Dates
                  </h3>
                  <div className="space-y-2 text-sm">
                    {course.schedule.dates.map((date: ScheduleDate, index: number) => (
                      <div key={index} className="flex justify-between items-center py-1">
                        <span className="text-gray-600 dark:text-stone-400">{date.label}:</span>
                        <span className="font-medium text-gray-800 dark:text-stone-100">{date.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── INSTRUCTOR — commented out ──
          {activeTab === "instructor" && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className={`w-24 h-24 bg-gradient-to-br ${course.color} rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}>
                  {course.instructor.initials}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-stone-100">
                    {course.instructor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-stone-400 mb-3">{course.instructor.title}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-stone-400 mb-4 flex-wrap">
                    <span>{course.instructor.experience}</span>
                    <span>•</span>
                    <span>{course.instructor.credentials}</span>
                  </div>
                  <p className="text-gray-600 dark:text-stone-400 leading-relaxed">{course.instructor.bio}</p>
                </div>
              </div>
            </div>
          )}
          ── */}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-stone-700 p-4 bg-gray-200 dark:bg-stone-800 rounded-b-2xl flex-shrink-0">
          <div className="flex gap-3">
            <a
              href="Contact"
              className="inline-block bg-white dark:bg-stone-700 text-orange-500 dark:text-orange-400 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-stone-600 transition-colors"
            >
              Contact Us
            </a>
            <SpecialCourse />
          </div>
        </div>
      </div>
    </div>
  );
}