import {
	createFetchClient,
	RequestInterceptor,
	ResponseInterceptor,
} from '@/utils/fetch-client'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/next-auth-options'

const requestInterceptor: RequestInterceptor = async (config) => {
	const session = await getServerSession(authOptions)
	const token = session?.user?.accessToken || ''
	return {
		...config,
		headers: {
			...config.headers,
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			'Content-Type': 'application/json',
		},
	}
}

const responseInterceptor: ResponseInterceptor = async (res) => {
	if (res.status == 401) {
		redirect('/signout')
	}
	return res
}

export const fetchClientWithAuth = createFetchClient({
	baseURL: 'http://' + (process.env.HOSTNAME || 'localhost') + ':3000/api',
	onRequest: [requestInterceptor],
	onResponse: [responseInterceptor],
})

export default fetchClientWithAuth
