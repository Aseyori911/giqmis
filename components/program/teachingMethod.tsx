'use client'

const METHODS = [
  { emoji: '📖', title: 'Structured Learning', description: 'Step-by-step curriculum ensuring students progress gradually from foundational knowledge to advanced levels.' },
  { emoji: '🎓', title: 'Qualified Guidance', description: 'Careful supervision and correction helping students improve recitation, understanding, and confidence.' },
  { emoji: '🔁', title: 'Consistent Revision', description: 'Regular recitation sessions and revision checks that strengthen memorization and long-term retention.' },
  { emoji: '💻', title: 'Flexible Online Learning', description: 'Learn from anywhere with structured guidance and interaction that mirrors in-person classes.' },
  { emoji: '📊', title: 'Continuous Assessment', description: 'Weekly recitation checks, monthly quizzes, and periodic evaluations ensuring steady improvement.' },
]

const CERTIFICATES = [
  { programme: 'Kiddies Programme', ages: '5–7', detail: "Basic Qur'an recitation, Arabic foundations & introductory Islamic studies" },
  { programme: 'Children Programme', ages: '8–11', detail: "Qur'an memorization/revision, Tajweed, Arabic & Islamic studies" },
  { programme: 'Teens Programme', ages: '12–17', detail: "Qur'an memorization/revision, Tajweed, Arabic & Islamic studies" },
  { programme: 'Adult Programme', ages: 'Sisters & Mothers', detail: 'Full programme or selected subjects' },
  { programme: 'Full Arabic Programme', ages: 'All Ages', detail: 'Beginner, intermediate, or advanced levels' },
]

export default function TeachingMethod() {
  return (
    <section className="py-20 bg-stone-50 dark:bg-stone-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4">

        {/* Section heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-3">
            Our Teaching Method
          </h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto mb-5" />
          <p className="text-slate-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
            Our approach focuses on clarity, consistency, and spiritual growth — helping every
            student build a lasting connection with the Qur&apos;an.
          </p>
        </div>

        {/* Methods grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {METHODS.map((m, i) => (
            <div key={i} className="bg-white dark:bg-stone-900 rounded-xl p-5 border border-stone-100 dark:border-stone-800 hover:border-orange-200 dark:hover:border-orange-900 transition-colors">
              <span className="text-3xl block mb-3">{m.emoji}</span>
              <h3 className="font-bold text-slate-800 dark:text-stone-100 mb-2 text-base">{m.title}</h3>
              <p className="text-sm text-slate-500 dark:text-stone-400 leading-relaxed">{m.description}</p>
            </div>
          ))}
        </div>

        {/* Certificate heading */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-slate-800 dark:text-stone-100 mb-1">
            🎓 Certificate of Completion
          </h3>
          <p className="text-sm text-slate-500 dark:text-stone-400">
            Awarded at the end of each main level
          </p>
        </div>

        {/* Certificate list */}
        <div className="space-y-2">
          {CERTIFICATES.map((c, i) => (
            <div key={i} className="bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 hover:border-orange-200 dark:hover:border-orange-900 transition-colors">
              <div className="sm:w-52 flex-shrink-0">
                <p className="font-semibold text-base text-slate-800 dark:text-stone-100">{c.programme}</p>
                <p className="text-sm text-orange-500 font-medium">{c.ages}</p>
              </div>
              <div className="hidden sm:block w-px h-8 bg-stone-100 dark:bg-stone-800 flex-shrink-0" />
              <p className="text-sm text-slate-500 dark:text-stone-400 leading-relaxed">{c.detail}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}