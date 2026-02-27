import CourseCard from './courseCard'
import { courseData, COURSE_CARDS } from './data'

type Props = {
  onSelect: (courseKey: string) => void
}

export default function CourseList({ onSelect }: Props) {
  return (
    <div className="p-8 bg-gray-50 dark:bg-stone-950 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-stone-100">Special Programs</h1>
          <p className="text-gray-600 dark:text-stone-400 text-lg">
            Beyond our regular courses, we offer specialized programs to meet diverse learning needs and interests.
          </p>
          <div className="bg-orange-500 border border-orange-500 w-[10%] mx-auto mt-3 h-1"></div>
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
      </div>
    </div>
  )
}