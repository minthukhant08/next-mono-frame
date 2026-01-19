import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
	schema: 'backend/prisma/schema.prisma',
	migrations: {
		path: 'backend/prisma/migrations',
	},
	datasource: {
		url:
			process.env['DATABASE_URL'] ||
			'postgresql://aceplus:aceplus123@localhost:5439/database?schema=public',
	},
})
