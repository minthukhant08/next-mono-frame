import userSeeder from '@/backend/prisma/seeders/user'
import settingSeeder from '@/backend/prisma/seeders/setting'

const main = async () => {
	try {
		await settingSeeder()
		await userSeeder()
	} catch (error) {
		console.error('Error during seeding:', error)
		process.exit(1)
	}
}

main().then(() => {
	console.log('Seeding completed.')
	process.exit(0)
})
