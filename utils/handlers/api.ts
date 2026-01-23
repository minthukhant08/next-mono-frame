import AppException from '@/backend/exceptions/app-exception'
import { transformZodErrors } from '@/utils'
import { validate } from '@/utils'
import { NextRequest, NextResponse } from 'next/server'
import z, { ZodError } from 'zod'

type Handler = (req: NextRequest, context?: any) => Promise<Response>

const getErrorResponse = (error: unknown): NextResponse<ErrorResponse> => {
	let statusCode = 500
	let message: string | object = 'Internal Server Error'

	if (error instanceof ZodError) {
		statusCode = 422
		message = transformZodErrors(error)
	} else if (error instanceof Error || error instanceof AppException) {
		message = error.message
		if ((error as any).statusCode) {
			statusCode = (error as any).statusCode
		}
	} else if (error instanceof Error) {
		message = error.message
	}

	return NextResponse.json(
		{ ok: false, message: message },
		{ status: statusCode },
	)
}

export const withApi = (handler: Handler): Handler => {
	return async (req, context) => {
		try {
			return await handler(req, context)
		} catch (error) {
			console.error('API Handler Error:', error)
			return getErrorResponse(error)
		}
	}
}

export function validateQuery(
	schema: z.ZodTypeAny,
): (handler: Handler) => Handler {
	return (handler: Handler) => {
		return async (req, context) => {
			const { searchParams } = new URL(req.url)
			const queryParams = Object.fromEntries(searchParams.entries())
			const validatedQuery = schema.parse(queryParams)
			return handler(req, { ...context, query: validatedQuery })
		}
	}
}

export const apiHandler =
	<TBody extends z.ZodTypeAny, TQuery extends z.ZodTypeAny>(schemas: {
		body?: TBody
		query?: TQuery
	}) =>
	(
		handler: (data: {
			body: z.infer<TBody>
			query: z.infer<TQuery>
		}) => Promise<any>,
	) =>
		withApi(
			(schemas.query ? validateQuery(schemas.query) : (h: any) => h)(
				(schemas.body ? validate(schemas.body) : (h: any) => h)(
					async (req, { body, query }) => {
						return handler({ body, query })
					},
				),
			),
		)

export const responseHandler = <T>(
	statusCode: number,
	data: T,
): NextResponse<HTTPResponse<T>> => {
	const response: HTTPResponse<T> = {
		ok: true,
		data,
	}

	return new NextResponse(JSON.stringify(response), {
		status: statusCode,
		headers: { 'Content-Type': 'application/json' },
	})
}
