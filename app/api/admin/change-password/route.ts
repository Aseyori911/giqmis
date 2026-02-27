import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { current, newPassword } = await req.json()

    if (!current || !newPassword) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    }

    // Fetch current hash from Supabase
    const { data, error } = await supabase
      .from('admin_credentials')
      .select('id, password_hash')
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    // Verify current password
    const match = await bcrypt.compare(current, data.password_hash)
    if (!match) {
      await new Promise(r => setTimeout(r, 800))
      return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 })
    }

    // Hash and save new password
    const password_hash = await bcrypt.hash(newPassword, 12)
    const { error: updateError } = await supabase
      .from('admin_credentials')
      .update({ password_hash, updated_at: new Date().toISOString() })
      .eq('id', data.id)

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update password.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}