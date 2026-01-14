import { NextRequest } from "next/server";
import { ZodObject } from "zod";

type Handler = ( req: NextRequest, context?: any) => Promise<Response>;

export function validate(schema : ZodObject) : (handler : Handler) => Handler {
    return (handler: Handler) => {
        return async (req, context) => {
            const body = await req.json();
            schema.parse(body); 
            return handler(req, {...context, body });
        };
    };
}
