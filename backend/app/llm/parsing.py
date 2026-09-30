import json
import re

_FENCE = re.compile(r"^```(?:json)?\s*\n([\s\S]*?)\n```$")


def trim_code_fence(raw: str) -> str:
    trimmed = raw.strip()
    match = _FENCE.match(trimmed)
    return match.group(1).strip() if match else trimmed


def parse_json(raw: str):
    cleaned = trim_code_fence(raw)
    opens = [i for i in (cleaned.find("{"), cleaned.find("[")) if i != -1]
    start = min(opens) if opens else -1
    if start == -1:
        raise ValueError("Output bukan JSON: tidak ditemukan objek/array.")
    candidate = cleaned[start:]
    try:
        return json.loads(candidate)
    except json.JSONDecodeError:
        raise ValueError("Output bukan JSON yang valid.") from None