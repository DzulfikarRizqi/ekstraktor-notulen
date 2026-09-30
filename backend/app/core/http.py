from fastapi.responses import JSONResponse


def json_error(code: str, message: str, status: int) -> JSONResponse:
    return JSONResponse(
        {"error": {"code": code, "message": message}}, status_code=status
    )


def bad_request(message: str) -> JSONResponse:
    return json_error("BAD_REQUEST", message, 400)


def not_found(message: str) -> JSONResponse:
    return json_error("NOT_FOUND", message, 404)


def conflict(message: str) -> JSONResponse:
    return json_error("CONFLICT", message, 409)


def unprocessable(message: str) -> JSONResponse:
    return json_error("VALIDATION_ERROR", message, 422)