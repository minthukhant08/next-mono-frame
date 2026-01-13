import userSeeder from '@/prisma/seeders/user'

const main = async () => {
	try {
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
