export function jsonError(code: string, message: string, status: number): Response {
  return Response.json({ error: { code, message } }, { status });
}

export const badRequest = (message: string): Response =>
  jsonError("BAD_REQUEST", message, 400);

export const notFound = (message: string): Response =>
  jsonError("NOT_FOUND", message, 404);

export const conflict = (message: string): Response =>
  jsonError("CONFLICT", message, 409);

export const unprocessable = (message: string): Response =>
  jsonError("VALIDATION_ERROR", message, 422);