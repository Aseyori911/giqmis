// middleware.ts  (ROOT of project, same level as package.json)
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = req.cookies.get('admin_token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    const isValid = await verifyAdminToken(token)
    if (!isValid) {
      const response = NextResponse.redirect(new URL('/admin/login', req.url))
      response.cookies.set('admin_token', '', { maxAge: 0 })
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}