import {
	createFetchClient,
	RequestInterceptor,
	ResponseInterceptor,
} from '@/utils/fetch-client'

const requestInterceptor: RequestInterceptor = async (config) => {
	return {
		...config,
		headers: {
			...config.headers,
			Authorization: '',
		},
	}
}

const responseInterceptor: ResponseInterceptor = async (res) => {
	// console.log(res, 'res...')
	return res
}

export const fetchClient = createFetchClient({
	baseURL: process.env.BASE_URL + '/api',
	onRequest: [requestInterceptor],
	onResponse: [responseInterceptor],
})

export default fetchClient
