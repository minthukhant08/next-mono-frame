class DBException extends Error {
	statusCode: number
	errorMessage: string
	meta: unknown
	constructor(message: string, meta: unknown, statusCode: number) {
		super(message)
		this.statusCode = statusCode
		this.errorMessage = message
		this.meta = meta
	}
}

export default DBException
