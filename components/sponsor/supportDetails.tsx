export default function SupportDetails() {
  return (
    <div>

      {/* Support Our Academy */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-stone-100 mb-4">
          Support Our Academy
        </h2>
        <div className="bg-orange-500 w-[10%] mb-6 h-1"></div>
        <p className="text-slate-600 dark:text-stone-400 leading-relaxed mb-4">
          Thank you for considering a sponsorship. Your generosity plays a meaningful role in enabling our academy to provide quality training, essential resources, and life-changing opportunities for our students. Every contribution — whether large or small — strengthens our programs, empowers our learners, and advances our mission of nurturing skill, discipline, and excellence.
        </p>
        <p className="text-slate-600 dark:text-stone-400 leading-relaxed mb-4">
          By choosing to support us, you are directly contributing to:
        </p>
        <ul className="space-y-2 mb-4">
          {[
            'The provision of training materials and educational equipment',
            'Student scholarships and financial assistance',
            'Facility development and learning environment improvements',
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-slate-600 dark:text-stone-400">
              <span className="text-orange-500">•</span> {item}
            </li>
          ))}
        </ul>
        <p className="text-slate-600 dark:text-stone-400 leading-relaxed">
          Your partnership goes beyond financial support — it is an investment in the growth, confidence, and future success of our students.
        </p>
      </div>

      {/* Account Details */}
      <div className="bg-orange-50 dark:bg-stone-800 rounded-2xl p-8 mb-12 border border-orange-100 dark:border-stone-700">
        <h3 className="text-xl font-bold text-slate-800 dark:text-stone-100 mb-2">
          Sponsor Contribution Details
        </h3>
        <p className="text-slate-500 dark:text-stone-400 text-sm mb-6">
          If you would like to make a financial contribution, please use the account information below:
        </p>
        <div className="space-y-3">
          {[
            { label: 'Account Name', value: 'MAHDUL BUSHROH GLADTIDINGS ACADEMY - GIQMIS' },
            { label: 'Bank Name', value: 'Moniepoint (Nigeria Bank)' },
            { label: 'Account Number', value: '8266805525' },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <span className="text-sm font-semibold text-slate-500 dark:text-stone-400 w-40 flex-shrink-0">
                {label}:
              </span>
              <span className="font-bold text-slate-800 dark:text-stone-100 bg-white dark:bg-stone-700 px-4 py-2 rounded-lg text-sm">
                {value}
              </span>
            </div>
          ))}
        </div>
        <p className="text-slate-500 dark:text-stone-400 text-sm mt-6 leading-relaxed">
          After sending your support, you may optionally notify us so we can confirm receipt and extend our appreciation.
        </p>
      </div>

      {/* Closing Note */}
      <div className="text-center bg-orange-50 dark:bg-stone-800 rounded-2xl p-8 mb-12 border border-orange-100 dark:border-stone-700">
        <p className="text-slate-600 dark:text-stone-400 leading-relaxed">
          Thank you for standing with us and investing in our mission. Your partnership helps us continue building a strong and inspiring academy for everyone we serve.
        </p>
      </div>

    </div>
  )
}