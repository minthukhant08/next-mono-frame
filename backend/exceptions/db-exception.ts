class DBException extends Error {
	statusCode: number
	message: string
	meta: unknown
	constructor(message: string, meta: unknown, statusCode: number) {
		super(message)
		this.statusCode = statusCode
		this.message = message
		this.meta = meta
	}
}

export default DBException
