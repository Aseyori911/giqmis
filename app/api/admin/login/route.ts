// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createAdminToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()

    if (!password) {
      return NextResponse.json({ error: 'Password is required.' }, { status: 400 })
    }

    const correctPassword = process.env.ADMIN_PASSWORD
    if (!correctPassword) {
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    if (password !== correctPassword) {
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
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}