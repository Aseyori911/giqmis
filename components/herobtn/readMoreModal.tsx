import { X, BookOpen, Heart, Users, GraduationCap, CheckCircle, ArrowRight } from 'lucide-react'
import Modal from './modal'
import { READ_MORE_PROGRAMS, READ_MORE_REASONS } from './data'

const ICONS = [BookOpen, Heart, Users, GraduationCap]

type Props = {
  isOpen: boolean
  onClose: () => void
  onEnrollNow: () => void
}

export default function ReadMoreModal({ isOpen, onClose, onEnrollNow }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">About Our School</h2>
              <p className="text-sm text-gray-600">عن مدرستنا</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-2xl mb-2" style={{ fontFamily: "serif" }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
            <p className="text-sm text-gray-600 italic">In the name of Allah, the Most Gracious, the Most Merciful</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Mission - رسالتنا</h3>
            <p className="text-gray-600 leading-relaxed">
              At GIQMIS, we are dedicated to providing authentic Arabic language education rooted in Islamic values and cultural heritage. Our mission is to nurture young minds, strengthen their connection to their faith and heritage, while preparing them for success in both their spiritual and academic journeys.
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Programs - برامجنا</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {READ_MORE_PROGRAMS.map(({ title, desc }, i) => {
                const Icon = ICONS[i]
                return (
                  <div key={title} className="flex items-start gap-3">
                    <div className="bg-emerald-100 p-2 rounded-lg mt-1">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{title}</h4>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Why Choose GIQMIS?</h3>
            <div className="space-y-3">
              {READ_MORE_REASONS.map(({ bold, text }) => (
                <div key={bold} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700"><strong>{bold}</strong> {text}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Join Our Family</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We welcome students of all levels, from complete beginners to advanced learners. Our nurturing environment helps children develop a strong foundation in Arabic language and Islamic values while building lasting friendships within our community.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>School Hours:</strong> Weekend classes (Saturday & Sunday), After-school programs (Mon-Thu), Summer intensives available. Ages 4-18 welcomed.
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button onClick={onEnrollNow}
              className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-semibold flex items-center justify-center gap-2">
              Enroll Now <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}