import { Prisma, User } from "@/generated/prisma/client"
import { DBhandler } from "@/handlers/db-connection"

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

export default {
    findByEmail
}