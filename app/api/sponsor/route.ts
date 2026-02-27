import { supabaseAdmin } from '@/lib/superbase-admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, tier, message, anonymous } = body

    if (!name || !email || !phone || !tier) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('sponsors')
      .insert([{
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        tier,
        message: message?.trim() || null,
        anonymous: anonymous || false,
      }])

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}