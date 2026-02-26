import { supabaseAdmin } from '@/lib/superbase-admin'
import { NextRequest, NextResponse } from 'next/server'
// import { supabaseAdmin } from '@/lib/supabase-admin'


export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('contact_messages')
    .insert([{ name, email, phone, message }])

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}