interface HTTPResponse<T> {
  success: 0 | 1;
  data: T;
}

type ErrorResponse = {
    success: boolean,
    message: string | object
}