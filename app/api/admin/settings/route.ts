import { NextRequest, NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase-admin'
import { getAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/superbase-admin'

// Public GET — Apply Now form uses this to check enrollment status
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('settings')
    .select('*')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Convert array of {key, value} into a plain object
  const settings: Record<string, string> = {}
  data.forEach(row => { settings[row.key] = row.value })

  return NextResponse.json({ settings })
}

// Admin only POST — saves all settings at once
export async function POST(req: NextRequest) {
  const isAdmin = await getAdminSession()
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { settings } = await req.json()

  if (!settings || typeof settings !== 'object') {
    return NextResponse.json({ error: 'Invalid settings data' }, { status: 400 })
  }

  // Upsert each key/value pair
  const rows = Object.entries(settings).map(([key, value]) => ({
    key,
    value: String(value),
  }))

  const { error } = await supabaseAdmin
    .from('settings')
    .upsert(rows, { onConflict: 'key' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}