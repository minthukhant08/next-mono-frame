import { prisma } from '@/backend/lib/prisma'

export default async function seed() {
	try {
		console.log('Seeding users...')
		await prisma.user.create({
			data: {
				email: 'admin@admin.com',
				name: 'admin',
				password:
					'$2b$10$0SLrbY5AioJPQgEbGIUSvOrzsDeCClvLZ7Vu0Hbgi0BUlVD7FJjp6', //password
			},
		})
		console.log('Users seeded successfully.')
	} catch (error) {
		console.error('Error seeding users:', error)
		throw error
	} finally {
		await prisma.$disconnect()
	}
}
