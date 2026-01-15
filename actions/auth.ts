'use server'

import AppException from "@/exceptions/app-exception";
import { actionHandler, responseHandler } from "@/handlers";
import { loginSchema, loginSchemaType } from "@/schemas/auth";
import userRepo from '@/repositories/user';
import authSvc from "@/services/auth";
import { User } from "@/generated/prisma/client";

export type LoginResponse = {
    user : User,
    accessToken: string
};
export const login = actionHandler(async ( payload : loginSchemaType ) =>  {
    const validated = loginSchema.parse(payload)
    const { email, password } = validated;

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
    } as LoginResponse)
})
