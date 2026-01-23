import { Prisma } from '@/backend/prisma/generated/prisma/client'
import { ExtendedPrismaClient, prisma } from '@/backend/lib/prisma'
import DBException from '@/backend/exceptions/db-exception'

export const getPrisamInstant = (transaction?: ExtendedPrismaClient) => {
	return transaction || prisma
}

export const catchDBError = async <T>(
	callback: () => Promise<T>,
): Promise<T | null> => {
	try {
		return await callback()
	} catch (error) {
		console.error('Error:', error)
		let message
		let meta
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			meta = error.meta
			// Handle known errors
			if (error.code === 'P2002') {
				message = 'There is a unique constraint violation'
			} else if (error.code === 'P2025') {
				message = 'id provided does not exist'
			} else {
				message = 'A known error occurred: ' + error.message
			}
		} else {
			message =
				'Unexpected error occurred: ' +
				(error as { message: string }).message
		}
		throw new DBException(message, meta, 500)
	} finally {
		await prisma.$disconnect()
	}
}

export const DBhandler = async <T>(
	operation: (transaction: ExtendedPrismaClient) => Promise<T>,
	transaction?: ExtendedPrismaClient,
): Promise<T | null> => {
	return catchDBError(async () => {
		const prisma = getPrisamInstant(transaction)
		return await operation(prisma)
	})
}
