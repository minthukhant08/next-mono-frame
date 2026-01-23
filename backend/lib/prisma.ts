import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../prisma/generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prismaClient = new PrismaClient({ adapter })
const AUDITED_MODELS = ['User']

let currentUserId: number | null = null

export async function setCurrentUserId(userId: number | undefined) {
	currentUserId = userId || null
}

export function getCurrentUserId() {
	return currentUserId || null
}

export const prisma = prismaClient.$extends({
	query: {
		$allModels: {
			async $allOperations({ model, operation, args, query }) {
				if (!AUDITED_MODELS.includes(model)) {
					return query(args)
				}

				const monitoredActions = [
					'create',
					'update',
					'upsert',
					'delete',
					'updateMany',
					'deleteMany',
				]
				if (
					!monitoredActions.includes(operation) ||
					model === 'AuditLog'
				) {
					return query(args)
				}

				const userId = getCurrentUserId()
				let oldData = null

				if (operation !== 'create') {
					oldData = await (prismaClient as any)[model].findUnique({
						where: (args as any).where,
					})
				}

				const result = await query(args)

				await prismaClient.auditLog.create({
					data: {
						model,
						action: operation.toUpperCase(),
						recordId:
							(result as any)?.id.toString() ||
							(args as any).where?.id?.toString(),
						oldData: oldData
							? JSON.parse(JSON.stringify(oldData))
							: null,
						newData:
							operation === 'delete'
								? null
								: JSON.parse(JSON.stringify(result)),
						userId: userId?.toString(),
					},
				})

				return result
			},
		},
	},
})

export type ExtendedPrismaClient = typeof prisma
