import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthOptions } from 'next-auth'
import { login } from '@/backend/controllers/auth'

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Username',
					type: 'text',
					placeholder: 'jsmith',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, _req) {
				try {
					let res = await login(credentials!)
					if (res.ok) {
						const { id, email, name } = res.data.user
						return {
							id,
							email,
							name,
							accessToken: res.data.accessToken,
						}
					} else {
						console.log(res.message)
					}
					return null
				} catch (error) {
					console.log('error..', error)
					return null
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			return { ...user, ...token }
		},
		async session({ session, token }) {
			if (token) {
				session.user = token
			}
			return session
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
}
