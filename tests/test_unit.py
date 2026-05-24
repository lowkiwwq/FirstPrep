"""Unit-тесты на чистые функции (без сетевых вызовов).

Запуск: python -m pytest tests/test_unit.py -v
       или: python tests/test_unit.py
"""

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))


# ── Clarifier ────────────────────────────────────────────────────────────────

class TestClarifierParse(unittest.TestCase):
    def test_valid_json(self):
        from rag.clarifier import _parse_classification
        raw = '{"status": "clear", "reason": "ok", "clarifying_questions": [], "translated": "Hello"}'
        r = _parse_classification(raw, "Привет")
        self.assertEqual(r["status"], "clear")
        self.assertEqual(r["translated"], "Hello")

    def test_invalid_status_defaults_to_clear(self):
        from rag.clarifier import _parse_classification
        raw = '{"status": "weird", "translated": "x"}'
        r = _parse_classification(raw, "fallback")
        self.assertEqual(r["status"], "clear")

    def test_broken_json_returns_clear_with_fallback(self):
        from rag.clarifier import _parse_classification
        r = _parse_classification("not json", "fallback question")
        self.assertEqual(r["status"], "clear")
        self.assertEqual(r["translated"], "fallback question")
        self.assertEqual(r["reason"], "parse error")

    def test_empty_translated_uses_fallback(self):
        from rag.clarifier import _parse_classification
        raw = '{"status": "clear", "translated": ""}'
        r = _parse_classification(raw, "original")
        self.assertEqual(r["translated"], "original")

    def test_clarifying_questions_limited_to_3(self):
        from rag.clarifier import _parse_classification
        raw = '{"status": "ambiguous", "clarifying_questions": ["a", "b", "c", "d", "e"], "translated": "x"}'
        r = _parse_classification(raw, "x")
        self.assertEqual(len(r["clarifying_questions"]), 3)

    def test_non_list_clarifying_questions(self):
        from rag.clarifier import _parse_classification
        raw = '{"status": "ambiguous", "clarifying_questions": "not a list", "translated": "x"}'
        r = _parse_classification(raw, "x")
        self.assertEqual(r["clarifying_questions"], [])


# ── Query Expander ───────────────────────────────────────────────────────────

class TestQueryExpanderParse(unittest.TestCase):
    def test_valid_expansion(self):
        from rag.query_expander import _parse_expansion
        raw = '{"hyde": "FOUL is a penalty.", "paraphrases": ["What is FOUL?", "Define FOUL", "FOUL meaning"]}'
        expanded, paraphrases = _parse_expansion(raw, "fallback")
        self.assertIn("FOUL is a penalty", expanded)
        self.assertIn("fallback", expanded)
        self.assertEqual(len(paraphrases), 3)

    def test_empty_hyde_returns_original(self):
        from rag.query_expander import _parse_expansion
        raw = '{"hyde": "", "paraphrases": []}'
        expanded, paraphrases = _parse_expansion(raw, "original query")
        self.assertEqual(expanded, "original query")
        self.assertEqual(paraphrases, [])

    def test_broken_json(self):
        from rag.query_expander import _parse_expansion
        expanded, paraphrases = _parse_expansion("broken {{", "fallback")
        self.assertEqual(expanded, "fallback")
        self.assertEqual(paraphrases, [])

    def test_paraphrases_limited_to_3(self):
        from rag.query_expander import _parse_expansion
        raw = '{"hyde": "x", "paraphrases": ["a", "b", "c", "d", "e", "f"]}'
        _, paraphrases = _parse_expansion(raw, "x")
        self.assertEqual(len(paraphrases), 3)

    def test_non_list_paraphrases(self):
        from rag.query_expander import _parse_expansion
        raw = '{"hyde": "x", "paraphrases": "not a list"}'
        _, paraphrases = _parse_expansion(raw, "x")
        self.assertEqual(paraphrases, [])


# ── Generator ────────────────────────────────────────────────────────────────

class TestGenerator(unittest.TestCase):
    def test_no_answer_detection_ru(self):
        from rag.generator import _is_no_answer
        self.assertTrue(_is_no_answer("В предоставленных материалах нет информации по этому вопросу."))
        self.assertTrue(_is_no_answer("В данных материалах нет ответа на этот вопрос."))

    def test_no_answer_detection_en(self):
        from rag.generator import _is_no_answer
        self.assertTrue(_is_no_answer("The provided context does not contain information about this."))
        self.assertTrue(_is_no_answer("There is no information in the provided materials."))

    def test_real_answer_not_flagged(self):
        from rag.generator import _is_no_answer
        # Реальный ответ который МОГ бы матчиться по old substring "нет информации"
        text = "FOUL — это штраф. В разделе 10.6 написано что MINOR FOUL = 5 очков."
        self.assertFalse(_is_no_answer(text))

    def test_empty_text(self):
        from rag.generator import _is_no_answer
        self.assertTrue(_is_no_answer(""))
        self.assertTrue(_is_no_answer(None))

    def test_format_chunk_with_no_metadata(self):
        from rag.generator import _format_chunk
        chunk = {"content": "Some text", "metadata": {}}
        formatted = _format_chunk(chunk)
        self.assertIn("Some text", formatted)
        self.assertIn("Источник не указан", formatted)

    def test_truncate_long_chunk(self):
        from rag.generator import _format_chunk
        long_text = "x" * 10000
        chunk = {"content": long_text, "metadata": {"source": "test"}}
        formatted = _format_chunk(chunk, char_limit=500)
        self.assertLess(len(formatted), 800)
        self.assertIn("обрезано", formatted)

    def test_context_total_budget(self):
        from rag.generator import _build_context, _MAX_CONTEXT_CHARS
        chunks = [
            {"content": "x" * 8000, "metadata": {"source": f"doc{i}"}}
            for i in range(10)
        ]
        ctx = _build_context(chunks)
        self.assertLess(len(ctx), _MAX_CONTEXT_CHARS + 500)

    def test_generate_answer_no_chunks(self):
        from rag.generator import generate_answer
        r = generate_answer("question", [])
        self.assertFalse(r["has_answer"])
        self.assertIn("нет информации", r["answer"].lower())


# ── Pipeline helpers ─────────────────────────────────────────────────────────

class TestPipelineHelpers(unittest.TestCase):
    def test_merge_unique(self):
        from rag.rag_pipeline import _merge_unique
        a = [{"id": "1", "content": "A"}, {"id": "2", "content": "B"}]
        b = [{"id": "2", "content": "B-dup"}, {"id": "3", "content": "C"}]
        merged = _merge_unique([a, b])
        self.assertEqual(len(merged), 3)
        ids = [m["id"] for m in merged]
        self.assertEqual(ids, ["1", "2", "3"])

    def test_vector_norm(self):
        from rag.rag_pipeline import _vector_norm
        self.assertAlmostEqual(_vector_norm([3.0, 4.0]), 5.0)
        self.assertAlmostEqual(_vector_norm([0.0, 0.0]), 0.0)

    def test_empty_question(self):
        from rag.rag_pipeline import ask
        r = ask("")
        self.assertEqual(r["status"], "empty")

    def test_whitespace_only_question(self):
        from rag.rag_pipeline import ask
        r = ask("   \n  ")
        self.assertEqual(r["status"], "empty")


# ── Semantic Cache ───────────────────────────────────────────────────────────

class TestSemanticCache(unittest.TestCase):
    def setUp(self):
        from rag.semantic_cache import SemanticCache
        import tempfile
        self.tmp = Path(tempfile.mkdtemp())
        self.cache = SemanticCache(path=self.tmp / "test_cache.pkl",
                                   threshold=0.92, max_size=3)

    def test_put_and_get(self):
        emb = [1.0] + [0.0] * 1535
        result = {"answer": "test", "has_answer": True, "sources": []}
        self.cache.put("Q1", emb, result)
        retrieved = self.cache.get("Q1", emb)
        self.assertIsNotNone(retrieved)
        self.assertEqual(retrieved["answer"], "test")
        self.assertTrue(retrieved["from_cache"])

    def test_get_below_threshold(self):
        emb1 = [1.0] + [0.0] * 1535
        emb2 = [0.0, 1.0] + [0.0] * 1534  # orthogonal — cosine = 0
        result = {"answer": "test", "has_answer": True, "sources": []}
        self.cache.put("Q1", emb1, result)
        retrieved = self.cache.get("Q2", emb2)
        self.assertIsNone(retrieved)

    def test_no_answer_not_cached(self):
        emb = [1.0] + [0.0] * 1535
        result = {"answer": "no info", "has_answer": False, "sources": []}
        self.cache.put("Q1", emb, result)
        self.assertEqual(self.cache.size, 0)

    def test_fifo_eviction(self):
        emb = [1.0] + [0.0] * 1535
        for i in range(5):
            self.cache.put(f"Q{i}", emb, {"answer": f"a{i}", "has_answer": True, "sources": []})
        self.assertEqual(self.cache.size, 3)

    def test_db_version_invalidation(self):
        """Если db_version меняется — старые записи становятся невидимы."""
        emb = [1.0] + [0.0] * 1535
        self.cache.put("Q1", emb, {"answer": "old", "has_answer": True, "sources": []})
        self.assertIsNotNone(self.cache.get("Q1", emb))

        # Симулируем обновление БД
        self.cache._db_version = "different_version"
        self.assertIsNone(self.cache.get("Q1", emb))


# ── Rate Limiter ─────────────────────────────────────────────────────────────

class TestRateLimiter(unittest.TestCase):
    def test_allow_within_limit(self):
        from rag.rate_limiter import RateLimiter
        rl = RateLimiter(max_concurrent=2, max_per_minute=5)
        ok, _, _ = rl.check("ip1")
        self.assertTrue(ok)
        rl.release("ip1")

    def test_block_when_per_minute_exceeded(self):
        from rag.rate_limiter import RateLimiter
        rl = RateLimiter(max_concurrent=10, max_per_minute=3)
        for _ in range(3):
            ok, _, _ = rl.check("ip1")
            self.assertTrue(ok)
            rl.release("ip1")
        ok, msg, wait = rl.check("ip1")
        self.assertFalse(ok)
        self.assertGreater(wait, 0)
        self.assertIn("минуту", msg)

    def test_different_ips_isolated(self):
        from rag.rate_limiter import RateLimiter
        rl = RateLimiter(max_concurrent=10, max_per_minute=2)
        rl.check("ip1"); rl.release("ip1")
        rl.check("ip1"); rl.release("ip1")
        ok1, _, _ = rl.check("ip1")
        self.assertFalse(ok1)
        ok2, _, _ = rl.check("ip2")  # другой IP — должен пройти
        self.assertTrue(ok2)
        rl.release("ip2")


# ── Query Translator ────────────────────────────────────────────────────────

class TestTranslator(unittest.TestCase):
    def test_is_russian_yes(self):
        from rag.query_translator import is_russian
        self.assertTrue(is_russian("Привет мир"))
        self.assertTrue(is_russian("Что такое OBELISK?"))

    def test_is_russian_no(self):
        from rag.query_translator import is_russian
        self.assertFalse(is_russian("Hello world"))
        self.assertFalse(is_russian("What is FOUL?"))

    def test_is_russian_borderline(self):
        from rag.query_translator import is_russian
        # Английский с одним кириллическим символом — должен считаться английским
        self.assertFalse(is_russian("Hello мama"))   # только 4 кириллических < 20%


if __name__ == "__main__":
    unittest.main(verbosity=2)
