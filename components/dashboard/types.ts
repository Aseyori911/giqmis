export type Application = {
  id: string
  student_name: string
  parent_name: string
  program: string
  grade: string
  status: string
  submitted_at: string
}

export const statusColors: Record<string, string> = {
  pending:  'bg-yellow-100 text-yellow-800',
  reviewed: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}