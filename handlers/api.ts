import { transformZodErrors } from '@/utils';
import { validate } from '@/utils/validator';
import { NextRequest, NextResponse } from 'next/server';
import z, { ZodError, ZodTypeAny } from 'zod';
import { AnyZodObject } from 'zod/v3';


type Handler = (req: NextRequest, context?: any) => Promise<Response>;

const getErrorResponse = (error: unknown): NextResponse<ErrorResponse> => {
    let statusCode = 500;
    let errorMessage: string | object = 'Internal Server Error';

    if (error instanceof ZodError) {
        statusCode = 422
        errorMessage = transformZodErrors(error)
    } else if (error instanceof Error && (error as any).statusCode) {
        statusCode = (error as any).statusCode;
        errorMessage = error.message;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return NextResponse.json(
        { success: false, message: errorMessage },
        { status: statusCode }
    );
}

export const apiHandler = (handler: Handler): Handler => {
    return async (req, context) => {
        try {
            return await handler(req, context);
        } catch (error) {
            console.error('API Handler Error:', error);
            return getErrorResponse(error)
        }
    };
}

export const withApi =
    <TBody extends z.ZodTypeAny, TQuery extends z.ZodTypeAny>(
        schemas: { body?: TBody; query?: TQuery }
    ) =>
        (handler: (data: { body: z.infer<TBody>; query: z.infer<TQuery> }) => Promise<any>) =>
            apiHandler(
                (schemas.query ? validateQuery(schemas.query) : (h: any) => h)(
                    (schemas.body ? validate(schemas.body) : (h: any) => h)(
                        async (req, { body, query }) => {
                            return handler({ body, query });
                        }
                    )
                )
            );


export function validateQuery(schema: z.ZodTypeAny): (handler: Handler) => Handler {
    return (handler: Handler) => {
        return async (req, context) => {
            const { searchParams } = new URL(req.url);
            const queryParams = Object.fromEntries(searchParams.entries());
            const validatedQuery = schema.parse(queryParams);
            return handler(req, { ...context, query: validatedQuery });
        };
    };
}

