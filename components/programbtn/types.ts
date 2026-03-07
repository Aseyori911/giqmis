import React from 'react'

export interface IconProps {
  size?: number
  className?: string
}

export interface Feature {
  icon: string | React.ComponentType<IconProps>
  text: string
}

export interface CurriculumWeek {
  week: number
  title: string
  topics: string[]
  quran?: string
  arabic?: string
  notes?: string
}

export interface ScheduleDate {
  label: string
  date: string
}

export interface Schedule {
  duration: string
  time: string
  dates: ScheduleDate[]
}

export interface Instructor {
  name: string
  title: string
  initials: string
  experience: string
  credentials: string
  bio: string
}

export interface Quote {
  text: string
  source: string
}

export interface Course {
  title: string
  subtitle: string
  icon: string | React.ComponentType<IconProps>
  rating: number
  reviews: number
  students: number
  color: string
  description: string
  features: Feature[]
  whatYouLearn: string[]
  curriculum: CurriculumWeek[]
  schedule: Schedule
  instructor: Instructor
  image: string
  studentExpectations?: string[]
  requirements?: string[]
  quote?: Quote
}

export interface CourseData {
  [key: string]: Course
}

export type TabId = 'overview' | 'curriculum' | 'schedule' | 'instructor'

export interface Tab {
  id: TabId
  label: string
}