import CourseCard from './courseCard'
import { courseData, COURSE_CARDS } from './data'

type Props = {
  onSelect: (courseKey: string) => void
}

export default function CourseList({ onSelect }: Props) {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Special Programs</h1>
          <p className="text-gray-600 text-lg">
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