import { Prisma, User } from '@/backend/prisma/generated/prisma/client'
import { DBhandler } from '@/utils/handlers/db-connection'
import { ExtendedPrismaClient } from '../lib/prisma'

export const findByEmail = async (
	email: string,
	options?: Prisma.UserFindFirstArgs,
	transaction?: ExtendedPrismaClient,
): Promise<User | null> => {
	return DBhandler(
		async (prisma) =>
			prisma.user.findFirst({
				where: {
					email: email,
				},
				...options,
			}),
		transaction,
	)
}

export const all = async (
	options?: Prisma.UserFindFirstArgs,
): Promise<User[] | null> => {
	return DBhandler(async (prisma) =>
		prisma.user.findMany({
			...options,
		}),
	)
}

export const update = async (
	id: number,
	data: Prisma.UserUpdateInput,
	transaction?: ExtendedPrismaClient,
): Promise<User | null> => {
	return DBhandler(
		async (prisma) => prisma.user.update({ where: { id }, data }),
		transaction,
	)
}

export default {
	all,
	findByEmail,
	update,
}
