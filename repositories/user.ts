import { Prisma, User } from "@/generated/prisma/client"
import { DBhandler } from "@/handlers/db-connection"
import { prisma } from "@/lib/prisma"
import { findAll } from "./setting"

export const findByEmail = async (
	email: string,
	options?: Prisma.UserFindFirstArgs,
	transaction?: Prisma.TransactionClient
): Promise<User | null> => {
	return DBhandler(
		async (prisma) =>
			prisma.user.findFirst({
				where: {
					email: email,
				},
				...options,
			}),
		transaction
	)
}

export const all = async (
	options?: Prisma.UserFindFirstArgs,
) : Promise<User[] | null> => {
	return DBhandler(async (prisma) =>
		prisma.user.findMany({
			...options
		})
	)
}

export const update = async (
	id: number,
	data: Prisma.UserUpdateInput,
	transaction?: Prisma.TransactionClient
): Promise<User | null> => {
	return DBhandler(
		async (prisma) => prisma.user.update({ where: { id }, data }), transaction
	)
}

export default {
	all,
	findByEmail,
	update
}