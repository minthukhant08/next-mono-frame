import { validate } from "@/utils/validator";
import { apiHandler, responseHandler } from "@/handlers";
import { loginSchema } from "@/schemas/auth";
import userRepo from '@/repositories/user';
import AppException from "@/exceptions/app-exception";
import authSvc from "@/services/auth";
import { z } from 'zod'
import { NextResponse } from "next/server";


export async function login(_req: Request, context: { body: z.infer<typeof loginSchema>}) : Promise<NextResponse<HTTPResponse<LoginResponse>>> {
    const { email, password } = context.body

    const user = await userRepo.findByEmail(email);
    if (!user) {
        throw new AppException("Username or password wrong", 412);
    }
    await authSvc.comparePassword(password, user.password)

    const access_token = await authSvc.generateAccessToken({
        id: user.id,
        email: user.email,
    })
    return responseHandler(200, {
        user,
        accessToken: access_token
    })
}


export const POST = apiHandler(validate(loginSchema)(login))