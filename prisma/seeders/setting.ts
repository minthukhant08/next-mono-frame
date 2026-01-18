import { prisma } from '@/lib/prisma'

export default async function seed() {
	try {
		console.log('Seeding settings...')
		await prisma.setting.upsert({
			where: { key: 'JWT_EXPIRE_IN' },
			update: {
				value: '300',
			},
			create: {
				key: 'JWT_EXPIRE_IN',
				value: '300',
				description: '5 mins in seconds',
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
