'use client'

import { useState } from 'react'
import { TabId } from '@/components/programbtn/types'
import { courseData } from '@/components/programbtn/data'
import CourseList from '@/components/programbtn/courseList'  // ← import from programbtn directly
import CourseDetail from '@/components/programbtn/courseDetail'

export default function MultiCourseDetails() {
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