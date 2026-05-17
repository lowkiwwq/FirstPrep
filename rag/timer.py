"""Простой контекстный менеджер для замера времени этапов."""

import time
from contextlib import contextmanager


class StepTimer:
    def __init__(self):
        self.steps: dict[str, float] = {}
        self._start: float = time.perf_counter()

    @contextmanager
    def measure(self, name: str):
        t0 = time.perf_counter()
        yield
        self.steps[name] = time.perf_counter() - t0

    def total(self) -> float:
        return time.perf_counter() - self._start

    def print(self):
        width = max(len(k) for k in self.steps) if self.steps else 8
        for name, elapsed in self.steps.items():
            bar = "#" * int(elapsed / max(self.steps.values()) * 20) if self.steps else ""
            print(f"  [{name:<{width}}]  {elapsed:5.2f}с  {bar}")
        print(f"  [{'TOTAL':<{width}}]  {self.total():5.2f}с")
