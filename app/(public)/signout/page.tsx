'use client'

import { signOut } from 'next-auth/react'
import { use, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignOutPage() {
	const router = useRouter()
	useEffect(() => {
		signOut({
			redirect: false,
		}).then(() => router.replace('/'))
	}, [])

	return (
		<div>
			<h1>Token expired! Signing out...</h1>
		</div>
	)
}
