import { NextRequest, NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase-admin'
import { getAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/superbase-admin'
// import { supabaseAdmin } from '@/lib/superbase-admin'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('gallery_items')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ items: data })
}

export async function POST(req: NextRequest) {
  const isAdmin = await getAdminSession()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, description, category, media_url, media_type, date_label } = await req.json()
  if (!title || !media_url) return NextResponse.json({ error: 'title and media_url required' }, { status: 400 })

  const { data, error } = await supabaseAdmin
    .from('gallery_items')
    .insert([{ title, description, category, media_url, media_type: media_type || 'image', date_label }])
    .select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ item: data }, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const isAdmin = await getAdminSession()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, storage_path } = await req.json()
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  // Delete from storage if path provided
  if (storage_path) {
    await supabaseAdmin.storage.from('gallery').remove([storage_path])
  }

  const { error } = await supabaseAdmin.from('gallery_items').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}