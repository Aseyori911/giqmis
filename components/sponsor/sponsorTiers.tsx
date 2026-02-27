import { sponsorTiers } from './data'

export default function SponsorTiers() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-800 mb-4">Choose Your Sponsorship Level</h3>
          <p className="text-slate-500 max-w-2xl mx-auto">Every amount makes a difference. Choose what works for you.</p>
          <div className="bg-orange-500 w-[10%] mx-auto mt-3 h-1"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[85%] mx-auto">
          {sponsorTiers.map(({ emoji, title, amount, period, color, badge, highlight, benefits }) => (
            <div key={title}
              className={`bg-white rounded-2xl border-2 ${color} shadow-sm p-8 relative ${highlight ? 'scale-105 shadow-lg' : ''}`}>
              {highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</span>
                </div>
              )}
              <div className="text-center mb-6">
                <span className="text-4xl">{emoji}</span>
                <h4 className="text-xl font-bold text-slate-800 mt-3 mb-1">{title}</h4>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${badge}`}>{title}</span>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-slate-800">{amount}</span>
                  <span className="text-slate-400 text-sm ml-1">{period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-orange-500 mt-0.5">✓</span> {b}
                  </li>
                ))}
              </ul>
              <a href="#sponsor-form"
                className={`block text-center py-2.5 rounded-lg font-bold text-sm transition-colors
                  ${highlight ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'border-2 border-orange-500 text-orange-500 hover:bg-orange-50'}`}>
                Sponsor at this Level
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}