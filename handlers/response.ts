import { NextResponse } from "next/server";

interface BaseResponse {
	success: 0 | 1
	data: any
}

export const responseHandler = (
	statusCode: number,
	data?: any,
) => {
	let response: BaseResponse = {
		success: 1,
		data: null
	}
	response.data = data

    return new NextResponse(JSON.stringify(response), {
        status: statusCode,
        headers: { 'Content-Type': 'application/json' }
    })
}
