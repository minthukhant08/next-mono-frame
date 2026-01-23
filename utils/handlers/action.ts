import AppException from '@/backend/exceptions/app-exception'
import { transformZodErrors } from '@/utils'
import { ZodError } from 'zod'

interface ActionSuccess<T> {
	ok: true
	data: T
}

interface ActionError {
	ok: false
	message: string | Record<string, any>
}

export type ActionResponse<T> = ActionSuccess<T> | ActionError

const getErrorResponse = (error: unknown): string => {
	if (error instanceof ZodError) {
		return JSON.stringify(transformZodErrors(error))
	} else if (error instanceof Error || error instanceof AppException) {
		return error.message
	}
	return 'An unknown error occurred'
}

export function actionHandler<TArgs extends any[], TResult>(
	handler: (...args: TArgs) => Promise<TResult>,
) {
	return async (...args: TArgs): Promise<ActionResponse<TResult>> => {
		try {
			const data = await handler(...args)
			return { ok: true, data }
		} catch (error) {
			const message = getErrorResponse(error) ?? 'Unknown Error'
			return { ok: false, message }
		}
	}
}

export const actionResponse = <T>(data: T): ActionResponse<T> => {
	return {
		ok: true,
		data,
	}
}
