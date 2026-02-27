export type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export type FormData = {
  studentName: string
  parentName: string
  email: string
  phone: string
  studentAge: string
  westernEducationLevel: string
  lastSchoolAttended: string
  nationality: string
  parentGuardianContact: string
  nextOfKinContact: string
  studiedQuranBefore: string
  previousQuranLevel: string
  needsQuranReadingHelp: string
  levelOfStudyInterested: string
  selectedCourses: string[]
  preferredLearningStyle: string
  goals: string
  whyInterestedInSchool: string
  classTime: string
  otherClassTime: string
  agreeToTerms: string
}

export type WaitlistData = {
  name: string
  phone: string
  email: string
}