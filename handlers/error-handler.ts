import { transformZodErrors } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

type Handler = (req: NextRequest, context?: any) => Promise<Response>;

const getErrorResponse = (error: unknown) => {
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

export const errorHandler = (handler: Handler): Handler => {
    return async (req, context) => {
        try {
            return await handler(req, context);
        } catch (error) {
            console.error('API Handler Error:', error);
            return getErrorResponse(error)
        }
    };
}

type ActionHandler<TArgs extends any[], TResult> =
    (...args: TArgs) => Promise<TResult>;

export function actionHandler<TArgs extends any[], TResult>(
    handler: ActionHandler<TArgs, TResult>
) {
    return async (...args: TArgs): Promise<TResult | Response> => {
        try {
            return await handler(...args);
        } catch (error) {
            console.error("Action Error:", error);
            return getErrorResponse(error)
        }
    };
}
