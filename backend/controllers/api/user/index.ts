import { Prisma } from '@/backend/prisma/generated/prisma/client'
import { responseHandler, apiHandler } from '@/utils/handlers'
import userRepo from '@/backend/repositories/user'
import { userListSchema } from '@/schemas/user'
import { UserReponse } from './types'

export default {
	getAll: apiHandler({ query: userListSchema })(async ({ query }) => {
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
		return responseHandler<UserReponse[] | null>(200, users)
	}),
}
