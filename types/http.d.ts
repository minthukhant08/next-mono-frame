type HTTPResponse<T> = {
	ok: true
	data: T
}

type ErrorResponse = {
	ok: false
	message: string | object
}

type QueryParams = Record<string, string | number | boolean | null | undefined>

type getRequestObject = {
	params?: QueryParams
	config?: FetchRequestConfig
}
