import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: any) {
  const { pathname } = request.nextUrl
  const token = await getToken({ req: request })

  // Admin routes protection
  if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Redirect logged-in admins from login page
  if (pathname === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/((?!login).*)'],
}