export const STEP_LABELS = [
  "Personal Info",
  "Quran Background",
  "Course Selection",
  "Preferences",
]

export const CLASS_TIMES = [
  "Wednesdays (5:00 PM - 5:30 PM) NGT",
  "Fridays (5:00 PM - 5:30 PM) NGT",
  "Sundays (5:30 PM - 6:00 PM) NGT",
  "Other",
]

export const LEARNING_STYLES = [
  "Group Learning",
  "One-on-One Sessions",
  "Flexible",
  "Self-Paced Learning",
]

export const READ_MORE_PROGRAMS = [
  { title: "Arabic Language", desc: "Classical and Modern Standard Arabic reading, writing, and speaking" },
  { title: "Quran Studies", desc: "Quran recitation, memorization, and Tajweed" },
  { title: "Islamic Studies", desc: "Islamic history, values, and character development" },
  { title: "Cultural Heritage", desc: "Arab culture, traditions, and history" },
]

export const READ_MORE_REASONS = [
  { bold: "Qualified Teachers:", text: "Native Arabic speakers with Islamic education credentials" },
  { bold: "Small Class Sizes:", text: "Personalized attention with maximum 12 students per class" },
  { bold: "Flexible Scheduling:", text: "Weekend, after-school, and summer intensive programs" },
  { bold: "Community Focus:", text: "Strong parent involvement and cultural events" },
]

export const INITIAL_FORM_DATA = {
  studentName: "", parentName: "", email: "", phone: "",
  studentAge: "", westernEducationLevel: "", lastSchoolAttended: "",
  nationality: "", parentGuardianContact: "", nextOfKinContact: "",
  studiedQuranBefore: "", previousQuranLevel: "", needsQuranReadingHelp: "",
  levelOfStudyInterested: "", selectedCourses: [] as string[],
  preferredLearningStyle: "", goals: "", whyInterestedInSchool: "",
  classTime: "", otherClassTime: "", agreeToTerms: "",
}

// All possible courses mapped to their settings IDs
export const ALL_COURSES = [
  { id: "Arabic_Beginner",          label: "Arabic (Beginner)" },
  { id: "Arabic_Intermediate",      label: "Arabic (Intermediate)" },
  { id: "Arabic_Revision",          label: "Arabic Revision" },
  { id: "Quran_Recitation",         label: "Quran Recitation" },
  { id: "Beginner_Tajweed",         label: "Beginner Tajweed" },
  { id: "Advanced_Tajweed",         label: "Advanced Tajweed" },
  { id: "Adkar",                    label: "Adkar" },
  { id: "Hafdh",                    label: "Hafdh" },
  { id: "Hadith",                   label: "Hadith" },
  { id: "Lessons from the Quran",   label: "Lessons from the Quran" },
  { id: "Islamic_Studies",          label: "Islamic Studies" },
]