import { ZodError } from 'zod'

export const normalizeEmail = (
	email: String | undefined | null,
): string | null => {
	return email?.toLowerCase().trim() || null
}

//try treetify later
export const transformZodErrors = (error: ZodError) => {
	const transformedErrors: Record<string, string[]> = {}
	for (const e of error.issues) {
		const fieldName = String(e.path[0])
		if (!transformedErrors[fieldName]) {
			transformedErrors[fieldName] = []
		}
		transformedErrors[fieldName].push(e.message)
	}
	return transformedErrors
}

export function toQueryString(
	params?: Record<string, string | number | boolean | null | undefined>,
): string {
	if (!params) return ''
	const searchParams = new URLSearchParams()

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined && value !== null) {
			searchParams.append(key, String(value))
		}
	})

	const query = searchParams.toString()
	return query ? `?${query}` : ''
}
