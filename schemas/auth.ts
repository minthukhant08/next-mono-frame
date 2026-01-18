import { z } from 'zod'

export const loginSchema = z.object({
	email: z.email('Invalid email format').min(1, 'Email is required').max(50),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must be at least 8 characters')
		.max(60),
})

export const changePasswordSchema = z
	.object({
		oldPassword: z.string().min(1, 'Old password is required'),

		newPassword: z
			.string()
			.min(8, 'New password must be at least 8 characters'),

		confirmNewPassword: z.string().min(1, 'Please confirm new password'),
	})
	.superRefine((data, ctx) => {
		if (data.oldPassword === data.newPassword) {
			ctx.addIssue({
				path: ['newPassword'],
				message: 'New password must be different from old password',
				code: 'custom',
			})
		}

		if (data.newPassword !== data.confirmNewPassword) {
			ctx.addIssue({
				path: ['confirmNewPassword'],
				message: 'Passwords do not match',
				code: 'custom',
			})
		}
	})
