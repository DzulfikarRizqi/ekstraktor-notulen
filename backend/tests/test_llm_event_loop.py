import asyncio
import json
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer

import pytest

from app.core.config import settings
from app.llm.lmstudio import lm_studio_provider
from app.pipeline.prefilter import find_relevant_sentence_ids
from app.pipeline.verification import verify_sentence


class _FakeLLMHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = json.loads(self.rfile.read(length))
        schema = (
            body.get("response_format", {})
            .get("json_schema", {})
            .get("schema", {})
            .get("properties", {})
        )
        if "relevant_sentence_ids" in schema:
            content = '{"relevant_sentence_ids": [0, 1]}'
        elif "is_valid" in schema:
            content = '{"user_story_id": 0, "is_valid": true, "confidence_score": 0.92, "reason": "valid"}'
        else:
            content = '{"user_stories": [{"actor":"T","action":"t","benefit":"","source_sentence_ids":[0]}]}'

        resp = {
            "id": "fake",
            "object": "chat.completion",
            "created": 0,
            "model": "test",
            "choices": [
                {
                    "index": 0,
                    "message": {"role": "assistant", "content": content},
                    "finish_reason": "stop",
                }
            ],
        }
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(resp).encode())

    def log_message(self, format, *args):
        pass


@pytest.fixture(scope="module")
def fake_llm_server():
    server = HTTPServer(("127.0.0.1", 0), _FakeLLMHandler)
    port = server.server_port
    t = threading.Thread(target=server.serve_forever, daemon=True)
    t.start()
    yield f"http://127.0.0.1:{port}/v1"
    server.shutdown()


def test_cross_event_loop_prefilter_then_verify(fake_llm_server, monkeypatch):
    """Regresi: panggilan LLM ke-2 di event loop berbeda tidak boleh gagal."""
    monkeypatch.setattr(settings, "lm_studio_base_url", fake_llm_server)

    segs = [
        {"index": 0, "text": "Pasien mendaftar online."},
        {"index": 1, "text": "Petugas panggil nomor antrean."},
    ]

    rel = asyncio.run(find_relevant_sentence_ids(lm_studio_provider, segs))
    assert rel == [0, 1]

    story = {
        "id": 0,
        "actor": "Pasien",
        "action": "mendaftar online",
        "benefit": "",
        "source_sentence_ids": [0],
    }
    status, conf, reason = asyncio.run(
        verify_sentence(
            lm_studio_provider,
            sentence_index=0,
            sentence_text="Pasien mendaftar online.",
            story=story,
        )
    )
    assert status == "valid"
    assert conf == 0.92