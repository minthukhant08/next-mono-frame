import { z } from 'zod'

export const loginSchema = z.object({
    email: z.email("Invalid email format").min(1, "Email is required").max(50),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters").max(60),
})
