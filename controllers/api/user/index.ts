import { Prisma } from '@/prisma/generated/prisma/client'
import { responseHandler, withApi } from '@/utils/handlers'
import userRepo from '@/repositories/user'
import { userListSchema } from '@/schemas/user'
import { UserReponse } from './types'

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
		return responseHandler<UserReponse[] | null>(200, users)
	}),
}
