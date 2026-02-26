import { supabaseAdmin } from '@/lib/superbase-admin'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('gallery_news')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) return NextResponse.json({ announcements: [] })
  return NextResponse.json({ announcements: data || [] })
}