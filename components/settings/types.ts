export type Program = {
  id: string
  label: string
  active: boolean
}

export type Notifs = {
  notif_new_app: boolean
  notif_weekly: boolean
  notif_attendance: boolean
  notif_messages: boolean
}

export type Passwords = {
  current: string
  newPass: string
  confirm: string
}