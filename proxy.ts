import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decodeToken } from '@/services/auth'

export const config = {
	matcher: ['/api/:path*'],
}

const isAunthenticated = (request: NextRequest): boolean => {
	const token = request.headers.get('Authorization') || ''
	if (!token) {
		console.log('No token provided')
		return false
	}

	const decoded = decodeToken(token.split(' ')[1])
	if (decoded === null) {
		console.log('Invalid token')
		return false
	}

	return true
}

export default function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl
	if (
		pathname.startsWith('/api/auth') ||
		pathname.startsWith('/api/public')
	) {
		return NextResponse.next()
	}
	if (!isAunthenticated(request)) {
		return NextResponse.json({ ok: false }, { status: 401 })
	}
}
