'use server'
import userRepo from '@/backend/repositories/user'
import authSvc from '@/services/auth'
import { actionHandler } from '@/utils/handlers'
import AppException from '@/backend/exceptions/app-exception'
import z from 'zod'
import { changePasswordSchema, loginSchema } from '@/schemas/auth'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/next-auth-options'

export const login = actionHandler(
	async (payload: z.infer<typeof loginSchema>) => {
		const { email, password } = payload

		const user = await userRepo.findByEmail(email)
		if (!user) {
			throw new AppException('Username or password wrong', 412)
		}
		await authSvc.comparePassword(password, user.password)

		const access_token = await authSvc.generateAccessToken({
			id: user.id,
			email: user.email,
		})
		return {
			user,
			accessToken: access_token,
		}
	},
)

export const changePassword = actionHandler(
	async (payload: z.infer<typeof changePasswordSchema>) => {
		const { oldPassword, newPassword } = payload
		const session = await getServerSession(authOptions)

		if (!session) throw new AppException('Not Authorize.', 401)

		const user = await userRepo.findByEmail(session.user.email)

		if (!user) throw new AppException('Not Authorize.', 401)

		await authSvc.comparePassword(oldPassword, user.password)

		const hashedPassword = await authSvc.hashPassword(newPassword)
		user.password = hashedPassword
		await userRepo.update(user.id, user)
		return { ...user }
	},
)
