export function initials(name: string) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

export function parseCourses(selected_courses: string) {
  return selected_courses
    ? selected_courses.split(',').map(c => c.trim()).filter(Boolean)
    : []
}