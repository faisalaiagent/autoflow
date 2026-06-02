import { NextResponse } from 'next/server';

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(message: string, status = 500) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function validationError(message: string) {
  return errorResponse(message, 400);
}

export function unauthorizedError() {
  return errorResponse('Unauthorized', 401);
}
