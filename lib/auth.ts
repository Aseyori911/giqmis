// lib/auth.ts
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'change-this-secret')

export async function createAdminToken() {
  return await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('8h')
    .sign(SECRET)
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload.role === 'admin'
  } catch {
    return false
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return false
  return verifyAdminToken(token)
}