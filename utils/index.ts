import z, { ZodError } from 'zod'
import { NextRequest } from 'next/server'

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

type Handler = (req: NextRequest, context?: any) => Promise<Response>

export function validate(schema: z.ZodTypeAny): (handler: Handler) => Handler {
	return (handler: Handler) => {
		return async (req, context) => {
			const body = await req.json()
			const validatedBody = schema.parse(body)
			return handler(req, { ...context, body: validatedBody })
		}
	}
}
