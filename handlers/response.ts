import { NextResponse } from "next/server";

export const responseHandler = <T>(
  statusCode: number,
  data: T
): NextResponse<HTTPResponse<T>> => {
  const response: HTTPResponse<T> = {
    success: true,
    data
  };

  return new NextResponse(JSON.stringify(response), {
    status: statusCode,
    headers: { "Content-Type": "application/json" }
  });
};

