import { NextRequest, NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase-admin'
import { getAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/superbase-admin'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('gallery_news')
    .select('*')
    .order('published_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ posts: data })
}

export async function POST(req: NextRequest) {
  const isAdmin = await getAdminSession()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, body, image_url } = await req.json()
  if (!title || !body) return NextResponse.json({ error: 'title and body required' }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('gallery_news')
    .insert([{ title, body, image_url }])
    .select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ post: data }, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const isAdmin = await getAdminSession()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  const { error } = await supabaseAdmin.from('gallery_news').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}