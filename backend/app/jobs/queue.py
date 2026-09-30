import threading
import time
from collections.abc import Callable
from typing import Optional

jobs: list[Callable[[], None]] = []
_lock = threading.Lock()
_worker_running = False


def enqueue_job(job: Callable[[], None]) -> None:
    global _worker_running
    with _lock:
        jobs.append(job)
        if not _worker_running:
            _worker_running = True
            threading.Thread(target=_drain, daemon=True, name="llm-job-worker").start()


def pending_job_count() -> int:
    with _lock:
        return len(jobs)


def wait_until_idle(timeout: float = 60.0) -> bool:
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        with _lock:
            if not jobs and not _worker_running:
                return True
        time.sleep(0.05)
    return False


def _drain() -> None:
    global _worker_running
    try:
        while True:
            with _lock:
                if not jobs:
                    break
                job = jobs.pop(0)
            try:
                job()
            except Exception:  # noqa: BLE001 - gangguan worker tidak boleh mematikan thread
                pass
    finally:
        with _lock:
            _worker_running = False