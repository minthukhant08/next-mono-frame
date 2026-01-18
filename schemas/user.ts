import { z } from 'zod'

export const userSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email format").min(1, "Email is required").max(50),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters").max(60),
})

export const userListSchema = z.object({
  offset: z.coerce.number().default(0),
  limit: z.coerce.number().default(10),
  search: z.string().optional(),
});
