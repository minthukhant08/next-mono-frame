import { NextRequest } from 'next/server'
import userController from '@/backend/controllers/api/user'

export async function GET(req: NextRequest) {
	return userController.getAll(req)
}
