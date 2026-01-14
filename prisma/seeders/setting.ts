import { prisma } from '@/lib/prisma'

export default async function seed() {
	try {
		console.log('Seeding settings...')
		await prisma.setting.upsert({
			where: { key: 'JWT_EXPIRE_IN' },
			update: {
				value: '300000',
			},
			create: {
				key: 'JWT_EXPIRE_IN',
				value: '300000',
				description: '5 mins in milliseconds',
			},
		})
		console.log('Settings seeded successfully.')
	} catch (error) {
		console.error('Error seeding settings:', error)
		throw error
	} finally {
		await prisma.$disconnect()
	}
}
