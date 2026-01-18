import { Prisma } from '@/prisma/generated/prisma/client'
import { responseHandler, withApi } from '@/utils/handlers'
import userRepo from '@/repositories/user'
import { userListSchema } from '@/schemas/user'

export type UserReponse = {
	id: number
	name: string
	email: string
	password: string
	created_at: Date
	updated_at: Date
}
export default {
	getAll: withApi({ query: userListSchema })(async ({ query }) => {
		const { offset, limit, search } = query
		const options: Prisma.UserFindFirstArgs = {
			omit: { deleted_at: true },
			where: {
				name: {
					contains: search,
				},
			},
			skip: offset,
			take: limit,
		}
		const users = await userRepo.all(options)
		return responseHandler(200, users satisfies UserReponse[] | null)
	}),
}
