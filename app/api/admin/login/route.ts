import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createAdminToken } from '@/lib/auth'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()

    if (!password) {
      return NextResponse.json({ error: 'Password is required.' }, { status: 400 })
    }

    // Fetch hashed password from Supabase
    const { data, error } = await supabase
      .from('admin_credentials')
      .select('password_hash')
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    // Compare entered password with hash
    const match = await bcrypt.compare(password, data.password_hash)

    if (!match) {
      await new Promise(r => setTimeout(r, 800))
      return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
    }

    const token = await createAdminToken()
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8,
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}