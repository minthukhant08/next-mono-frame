import { NextRequest } from 'next/server'
import z, { ZodObject } from 'zod'
import { AnyZodObject } from 'zod/v3'

type Handler = (req: NextRequest, context?: any) => Promise<Response>

// export function validate(schema : ZodObject) : (handler : Handler) => Handler {
//     return (handler: Handler) => {
//         return async (req, context) => {
//             const body = await req.json();
//             schema.parse(body);
//             return handler(req, {...context, body });
//         };
//     };
// }

export function validate(schema: z.ZodTypeAny): (handler: Handler) => Handler {
	return (handler: Handler) => {
		return async (req, context) => {
			const body = await req.json()
			const validatedBody = schema.parse(body)
			return handler(req, { ...context, body: validatedBody })
		}
	}
}
