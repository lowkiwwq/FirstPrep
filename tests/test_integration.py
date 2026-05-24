"""Интеграционные тесты на реальный pipeline.

Тестируют:
  • Retrieval работает на обеих сезонах (DECODE + INTO THE DEEP)
  • Cache hit на повторных вопросах
  • Cache miss после симуляции изменения БД
  • Out-of-domain отказы
  • Multilingual (RU+EN) запросы

Запуск: python tests/test_integration.py
ВНИМАНИЕ: расходует OpenAI API кредиты.
"""

import io
import sys
import time
import unittest
from contextlib import redirect_stdout
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))


def _silent_ask(q: str, **kwargs):
    """Вызывает ask() подавляя streaming-вывод."""
    from rag.rag_pipeline import ask
    buf = io.StringIO()
    with redirect_stdout(buf):
        result = ask(q, **kwargs)
    return result


class TestPipeline(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        from rag.startup import warmup
        from rag.semantic_cache import get_cache
        warmup(verbose=False)
        # Чистый старт — не используем кэш с предыдущих прогонов
        get_cache().clear()

    def test_decode_question_returns_decode_source(self):
        """Вопрос про DECODE-термин → DECODE источники."""
        r = _silent_ask("What is OBELISK?")
        self.assertTrue(r["has_answer"], "Should answer DECODE question")
        sources = " ".join(s.get("source", "") for s in r["sources"])
        self.assertIn("DECODE", sources, "Source should be from DECODE manual")

    def test_into_the_deep_question_returns_itd_source(self):
        """Вопрос про INTO THE DEEP термин → INTO THE DEEP источники."""
        r = _silent_ask("What is a SAMPLE in INTO THE DEEP?")
        self.assertTrue(r["has_answer"], "Should answer INTO THE DEEP question")
        sources = " ".join(s.get("source", "") for s in r["sources"])
        self.assertTrue("DEEP" in sources or "INTO" in sources,
                        f"Source should include INTO_THE_DEEP, got: {sources}")

    def test_russian_query_works(self):
        r = _silent_ask("Что такое FOUL в FTC?")
        self.assertTrue(r["has_answer"], "Russian query should produce an answer")

    def test_out_of_domain_rejected(self):
        r = _silent_ask("Какая погода завтра в Москве?")
        self.assertEqual(r["status"], "out_of_domain")
        self.assertFalse(r["has_answer"])

    def test_cache_hit_on_repeat(self):
        """Один и тот же вопрос дважды — второй должен быть из кэша."""
        from rag.semantic_cache import get_cache
        get_cache().clear()
        q = "What is MAJOR FOUL?"

        t1 = time.perf_counter()
        r1 = _silent_ask(q)
        d1 = time.perf_counter() - t1

        self.assertTrue(r1["has_answer"])
        self.assertFalse(r1.get("from_cache", False))

        t2 = time.perf_counter()
        r2 = _silent_ask(q)
        d2 = time.perf_counter() - t2

        self.assertTrue(r2.get("from_cache", False), "Second call should be from cache")
        self.assertLess(d2, d1 / 4, f"Cache hit should be much faster: {d2:.2f}s vs {d1:.2f}s")

    def test_cache_invalidated_on_db_version_change(self):
        """Симулируем изменение БД → кэш должен начать MISS-ать."""
        from rag.semantic_cache import get_cache
        cache = get_cache()
        cache.clear()
        q = "What is YELLOW CARD?"
        r1 = _silent_ask(q)
        self.assertTrue(r1["has_answer"])
        # Подтверждаем что попало в кэш
        self.assertGreater(cache.valid_size(), 0)
        # Симулируем добавление документов: версия меняется
        original_version = cache._db_version
        cache._db_version = "simulated_new_version"
        r2 = _silent_ask(q)
        # Это будет полный пайплайн, не из кэша
        self.assertFalse(r2.get("from_cache", False))
        # Возвращаем версию обратно
        cache._db_version = original_version

    def test_empty_question_handled(self):
        r = _silent_ask("")
        self.assertEqual(r["status"], "empty")
        self.assertFalse(r["has_answer"])

    def test_low_confidence_marker(self):
        """Запрос про нечто очень общее → может быть low_confidence."""
        r = _silent_ask("How big is the field?")
        # Не утверждаем результат — просто что флаг есть и валиден
        self.assertIn("low_confidence", r)
        self.assertIsInstance(r["low_confidence"], bool)


class TestRetrieverBackend(unittest.TestCase):
    def test_faiss_is_active(self):
        from rag.retriever import _get_faiss
        store = _get_faiss()
        self.assertIsNotNone(store, "FAISS should be the active backend")
        self.assertGreater(store.count, 100, "Should have plenty of chunks")

    def test_hybrid_search_returns_results(self):
        from rag.retriever import hybrid_search
        results = hybrid_search("FOUL penalty", top_k_each=5)
        self.assertGreater(len(results), 0)
        # Каждый результат должен иметь content + score
        for r in results:
            self.assertIn("content", r)
            self.assertIn("score", r)
            self.assertIn("id", r)

    def test_embedding_cache_works(self):
        from rag.retriever import _embed_query, _embedding_cache, _cache_key
        q = f"test query unique {time.time()}"
        key = _cache_key(q)
        self.assertNotIn(key, _embedding_cache)
        vec = _embed_query(q)
        self.assertEqual(len(vec), 1536)
        self.assertIn(key, _embedding_cache)


if __name__ == "__main__":
    unittest.main(verbosity=2)
