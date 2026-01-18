export interface NextFetchRequestConfig {
	revalidate?: number | false
	tags?: string[]
}

export type FetchRequestConfig = RequestInit & {
	cache?: RequestCache
	next?: NextFetchRequestConfig
}

export type RequestInterceptor = (
	config: FetchRequestConfig & { url: string },
) =>
	| (FetchRequestConfig & { url: string })
	| Promise<FetchRequestConfig & { url: string }>

export type ResponseInterceptor = (
	response: Response,
) => Response | Promise<Response>

export type FetchClientOptions = {
	baseURL?: string
	defaultHeaders?: HeadersInit
	onRequest?: RequestInterceptor[]
	onResponse?: ResponseInterceptor[]
}

export function createFetchClient(options: FetchClientOptions = {}) {
	const {
		baseURL = '',
		defaultHeaders = {},
		onRequest = [],
		onResponse = [],
	} = options

	async function request<T>(
		url: string,
		config: FetchRequestConfig = {},
	): Promise<T> {
		let finalConfig: FetchRequestConfig & { url: string } = {
			...config,
			headers: {
				...defaultHeaders,
				...config.headers,
			},
			url: baseURL + url,
		}

		for (const interceptor of onRequest) {
			finalConfig = await interceptor(finalConfig)
		}

		const { url: finalUrl, ...fetchConfig } = finalConfig

		let response = await fetch(finalUrl, fetchConfig)

		for (const interceptor of onResponse) {
			response = await interceptor(response)
		}

		if (!response.ok) {
			const errorText = await response.text()
			throw new Error(
				errorText || `HTTP ${response.status} ${response.statusText}`,
			)
		}

		return response.json()
	}

	return {
		get: <T>(url: string, config?: FetchRequestConfig) =>
			request<T>(url, { ...config, method: 'GET' }),

		post: <T>(url: string, body?: unknown, config?: FetchRequestConfig) =>
			request<T>(url, {
				...config,
				method: 'POST',
				body: body ? JSON.stringify(body) : undefined,
				headers: {
					'Content-Type': 'application/json',
					...config?.headers,
				},
			}),

		put: <T>(url: string, body?: unknown, config?: FetchRequestConfig) =>
			request<T>(url, {
				...config,
				method: 'PUT',
				body: body ? JSON.stringify(body) : undefined,
				headers: {
					'Content-Type': 'application/json',
					...config?.headers,
				},
			}),

		delete: <T>(url: string, config?: FetchRequestConfig) =>
			request<T>(url, { ...config, method: 'DELETE' }),
	}
}
