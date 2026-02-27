export type GalleryItem = {
  id: string
  title: string
  description: string
  category: string
  media_url: string
  media_type: string
  date_label: string
  created_at: string
}

export type NewsPost = {
  id: string
  title: string
  body: string
  image_url: string
  published_at: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  read: boolean
  submitted_at: string
}

export type WaitlistEntry = {
  id: string
  name: string
  phone: string
  email: string
  submitted_at: string
}

export type TabType = 'gallery' | 'news' | 'messages' | 'waitlist'