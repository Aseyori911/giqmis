import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, ChevronRight, Calendar, Clock } from 'lucide-react'
import Registerbtn from '@/components/registration'
import { Course, TabId, Tab, Feature, CurriculumWeek, ScheduleDate } from './types'
import { TABS } from './data'

type Props = {
  course: Course
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  onClose: () => void
}

export default function CourseDetail({ course, activeTab, onTabChange, onClose }: Props) {
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)
  const tabIds: TabId[] = ['overview', 'curriculum', 'schedule', 'instructor']

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [])

const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffX = touchStartX.current - e.changedTouches[0].clientX
    const diffY = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(diffX) < Math.abs(diffY)) return
    if (Math.abs(diffX) < 50) return
    const currentIndex = tabIds.indexOf(activeTab)
    if (diffX > 0 && currentIndex < tabIds.length - 1) {
      onTabChange(tabIds[currentIndex + 1])
    } else if (diffX < 0 && currentIndex > 0) {
      onTabChange(tabIds[currentIndex - 1])
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-3 z-50">
      <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-4xl w-full flex flex-col shadow-2xl"
        style={{ maxHeight: '90vh' }}>

        <div className={`relative bg-gradient-to-r ${course.color} text-white p-2 flex gap-3 justify-center items-center rounded-t-2xl flex-shrink-0`}>
          <Image src="/Gladtidings_LOGO.JPG" alt="Glad" width={48} height={48} sizes="68px"
            className="w-24 h-24 rounded object-contain" />
          <button onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
            <X size={24} />
          </button>
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
              <p className="text-white/90 text-lg mb-4">{course.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-stone-700 flex-shrink-0">
          <div className="flex overflow-x-auto">
            {(TABS as Tab[]).map((tab) => (
              <button key={tab.id} onClick={() => onTabChange(tab.id)}
                className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 dark:text-stone-400 hover:text-gray-800 dark:hover:text-stone-200'
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="p-8 overflow-y-auto flex-1"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-stone-100">Course Description</h3>
                <p className="text-gray-600 dark:text-stone-400 leading-relaxed">{course.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 dark:text-stone-100">What You&apos;ll Learn</h4>
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
                  <h4 className="font-semibold text-gray-800 dark:text-stone-100">Course Features</h4>
                  <div className="space-y-3">
                    {course.features.map((feature: Feature, index: number) => {
                      const FeatureIcon = feature.icon as React.ComponentType<{size?: number, className?: string}>
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <FeatureIcon className="text-orange-500 flex-shrink-0" size={20} />
                          <span className="text-gray-600 dark:text-stone-400">{feature.text}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-stone-100">Weekly Breakdown</h3>
              {course.curriculum.map((week: CurriculumWeek) => (
                <div key={week.week} className="border border-gray-200 dark:border-stone-700 rounded-lg p-4 hover:border-orange-200 dark:hover:border-orange-800 transition-colors">
                  <h4 className="font-semibold text-lg mb-2 text-gray-800 dark:text-stone-100">Week {week.week}: {week.title}</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {week.topics.map((topic: string, index: number) => (
                      <li key={index} className="text-gray-600 dark:text-stone-400 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></div>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-stone-100">Class Schedule</h3>
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
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-stone-100">Important Dates</h3>
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

          {activeTab === 'instructor' && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className={`w-24 h-24 bg-gradient-to-br ${course.color} rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0`}>
                  {course.instructor.initials}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-stone-100">{course.instructor.name}</h3>
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
        </div>

        <div className="border-t border-gray-200 dark:border-stone-700 p-4 bg-gray-200 dark:bg-stone-800 rounded-b-2xl flex-shrink-0">
          <div className="flex gap-3">
            <a href="Contact"
              className="inline-block bg-white dark:bg-stone-700 text-orange-500 dark:text-orange-400 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-stone-600 transition-colors">
              Contact Us
            </a>
            <Registerbtn />
          </div>
        </div>

      </div>
    </div>
  )
}
