import { Prisma, Setting } from '@/backend/prisma/generated/prisma/client'
import { DBhandler } from '@/utils/handlers'

export const getSettingValueByKey = (
	key: string,
	transaction?: Prisma.TransactionClient,
): Promise<{ key: string; value: string } | null> => {
	return DBhandler(
		async (prisma) =>
			prisma.setting.findFirst({
				select: {
					key: true,
					value: true,
				},
				where: {
					key,
					deleted_at: null,
				},
			}),
		transaction,
	)
}

export const findByKey = async (
	key: string,
	transaction?: Prisma.TransactionClient,
): Promise<Setting | null> => {
	return DBhandler(
		async (prisma) => prisma.setting.findFirst({ where: { key } }),
		transaction,
	)
}

export const findAll = async (
	transaction?: Prisma.TransactionClient,
): Promise<Setting[] | null> => {
	return DBhandler(async (prisma) => prisma.setting.findMany(), transaction)
}

export const update = async (
	id: number,
	data: Prisma.SettingUpdateInput,
	transaction?: Prisma.TransactionClient,
): Promise<Setting | null> => {
	return DBhandler(
		async (prisma) => prisma.setting.update({ where: { id }, data }),
		transaction,
	)
}
export default {
	getSettingValueByKey,
	findAll,
	findByKey,
	update,
}
