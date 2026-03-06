import { SPECIAL_WORKSHOPS } from "../program/data";
import CourseCard from "./courseCard";
import { courseData, COURSE_CARDS } from "./data";

type Props = {
  onSelect: (courseKey: string) => void;
};

export default function CourseList({ onSelect }: Props) {
  const w = SPECIAL_WORKSHOPS;

  return (
    <div className="p-8 bg-gray-50 dark:bg-stone-950 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            Special Courses & Workshops
          </span>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-4">
            Special Courses &amp; Workshops
          </h2>
          <div className="bg-orange-500 w-16 h-1 mx-auto mb-5" />
          <p className="text-slate-500 dark:text-stone-400 max-w-2xl mx-auto">
            {w.intro}
          </p>
        </div>
        {COURSE_CARDS.map(({ courseKey, title, description }) => (
          <CourseCard
            key={courseKey}
            courseKey={courseKey}
            title={title}
            description={description}
            image={courseData[courseKey].image}
            onClick={onSelect}
          />
        ))}

        <div className="bg-white dark:bg-stone-800 rounded-xl border border-gray-200 dark:border-stone-700 p-6">
          <h3 className="font-bold text-slate-800 dark:text-stone-100 mb-4">
            Workshop Benefits
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {w.benefits.map((b, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-sm text-slate-600 dark:text-stone-400"
              >
                <span className="text-xl flex-shrink-0">{b.emoji}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
