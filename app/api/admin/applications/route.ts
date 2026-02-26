// app/api/admin/applications/route.ts
import { NextRequest, NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase-admin'
import { getAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/superbase-admin'

export async function GET(req: NextRequest) {
  const isAdmin = await getAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const search = searchParams.get('search')

  let query = supabaseAdmin
    .from('applications')
    .select('*')
    .order('submitted_at', { ascending: false })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  if (search) {
    query = query.or(
      `student_name.ilike.%${search}%,parent_name.ilike.%${search}%,email.ilike.%${search}%`
    )
  }

  const { data, error } = await query
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ applications: data })
}

export async function PATCH(req: NextRequest) {
  const isAdmin = await getAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, status, admin_notes } = await req.json()

  if (!id || !status) {
    return NextResponse.json({ error: 'id and status are required' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('applications')
    .update({ status, admin_notes: admin_notes || null })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ application: data })
}

export async function DELETE(req: NextRequest) {
  const isAdmin = await getAdminSession()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await req.json()

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 })
  }

  // First check the application exists and is not accepted
  const { data: existing, error: fetchError } = await supabaseAdmin
    .from('applications')
    .select('status')
    .eq('id', id)
    .single()

  if (fetchError || !existing) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 })
  }

  if (existing.status === 'accepted') {
    return NextResponse.json({ error: 'Accepted applications cannot be deleted' }, { status: 403 })
  }

  const { error } = await supabaseAdmin
    .from('applications')
    .delete()
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}