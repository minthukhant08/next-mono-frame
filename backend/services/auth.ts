import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'

import AppException from '@/backend/exceptions/app-exception'
import settingSvc from '@/backend/services/setting'

export const hashPassword = async (password: string): Promise<string> => {
	const saltRounds = 10
	// Generate a salt and hash the password
	const salt = await bcrypt.genSalt(saltRounds)
	const hashedPassword = await bcrypt.hash(password, salt)
	return hashedPassword
}

export const comparePassword = async (
	password: string,
	user_password: string,
): Promise<void> => {
	const result = await bcrypt.compare(password, user_password)
	if (!result) {
		throw new AppException('Username or password wrong', 412)
	}
}

export const generateAccessToken = async (value: object): Promise<string> => {
	const JWT_EXPIRE_IN = (await settingSvc.getSetting(
		'JWT_EXPIRE_IN',
		'string',
	)) as string

	const expiresInSeconds = parseInt(JWT_EXPIRE_IN)
	const iatSeconds = Math.floor(Date.now() / 1000)

	const payload = {
		...value,
		iat: iatSeconds,
		exp: iatSeconds + expiresInSeconds,
		jti: uuidv4(),
	}

	return jwt.sign(payload, process.env.JWT_SECRET as jwt.Secret)
}

export const decodeToken = (token: string) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET as jwt.Secret)
	} catch (error) {
		return null
	}
}

export default {
	hashPassword,
	comparePassword,
	generateAccessToken,
	decodeToken,
}
