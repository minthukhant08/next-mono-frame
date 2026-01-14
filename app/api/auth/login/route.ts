import { validate } from "@/utils/validator";
import { errorHandler } from "@/handlers";
import { loginSchema, loginSchemaType } from "@/schemas/auth";
import userRepo from '@/repositories/user';
import AppException from "@/exceptions/app-exception";


export async function login( _req: Request, context : { body: loginSchemaType }) {
    const { email, password } = context.body

    const user = await userRepo.findByEmail(email);
    if (!user){
        throw new AppException("Username or password wrong", 412);
    }
    return new Response(JSON.stringify(user), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
    
}


export const POST = errorHandler(validate(loginSchema)(login))