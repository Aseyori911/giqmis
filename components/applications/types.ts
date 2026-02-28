export type Application = {
  id: string
  student_name: string
  parent_name: string
  email: string
  phone: string
  student_age: string
  grade: string
  western_education_level: string
  last_school_attended: string
  nationality: string
  parent_guardian_contact: string
  next_of_kin_contact: string
  program: string
  selected_courses: string
  studied_quran_before: string
  previous_quran_level: string
  needs_quran_reading_help: string
  level_of_study_interested: string
  preferred_learning_style: string
  previous_experience: string
  goals: string
  why_interested: string
  class_time: string
  agree_to_terms: string
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
  admin_notes: string
  submitted_at: string
  student_id?: string | null
  attendance_mode?: string | null
}