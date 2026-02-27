'use client'

import { useState } from 'react'
import { TabId } from './types'
import { courseData } from './data'
import CourseList from './courseList'
import CourseDetail from './courseDetail'

export default function MultiCourseDetailsSmallDevice() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  const handleCourseSelect = (courseKey: string) => {
    setSelectedCourse(courseKey)
    setActiveTab('overview')
  }

  if (!selectedCourse) {
    return <CourseList onSelect={handleCourseSelect} />
  }

  return (
    <CourseDetail
      course={courseData[selectedCourse]}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onClose={() => setSelectedCourse(null)}
    />
  )
}