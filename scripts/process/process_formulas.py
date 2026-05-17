"""Обработка математических формул: извлечение как изображений → GPT-4o → LaTeX + описание."""

import base64
import json
import sys
from pathlib import Path

import fitz
from openai import OpenAI

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from config import IMAGES_ORIGINALS_DIR, OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

_FORMULA_PROMPT = (
    "Это изображение содержит математическую формулу из учебника по робототехнике.\n"
    "1. Запиши формулу в LaTeX-нотации.\n"
    "2. Объясни что обозначает каждая переменная.\n"
    "3. Дай краткое текстовое объяснение физического/математического смысла.\n"
    "Ответь строго в формате JSON:\n"
    '{"latex": "...", "variables": {"τ": "момент силы"}, "description": "..."}'
)


def extract_formula_image(page: fitz.Page, rect: fitz.Rect, out_path: Path) -> None:
    mat = fitz.Matrix(3.0, 3.0)
    clip = rect + fitz.Rect(-5, -5, 5, 5)
    pix = page.get_pixmap(matrix=mat, clip=clip)
    pix.save(str(out_path))


def describe_formula_image(image_path: str | Path, context: str = "") -> dict:
    image_path = Path(image_path)
    with open(image_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")

    prompt = _FORMULA_PROMPT
    if context:
        prompt += f"\nКонтекст (раздел книги): {context}"

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": prompt},
                {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64}"}},
            ],
        }],
        max_tokens=400,
    )

    raw = response.choices[0].message.content
    try:
        import re
        m = re.search(r"\{.*\}", raw, re.DOTALL)
        data = json.loads(m.group(0)) if m else {"description": raw}
    except Exception:
        data = {"description": raw}

    data["image_path"] = str(image_path)
    data["context"] = context
    return data


def format_formula_chunk(formula: dict, source: str, page: int) -> dict:
    """Оборачиваем формулу в структуру, совместимую с чанкером."""
    latex = formula.get("latex", "")
    desc = formula.get("description", "")
    variables = formula.get("variables", {})
    var_text = ", ".join(f"{k} — {v}" for k, v in variables.items()) if variables else ""
    content = f"Формула: ${latex}$\n{var_text}\n{desc}".strip()
    return {
        "type": "formula",
        "content": content,
        "latex": latex,
        "source": source,
        "page": page,
        "image_path": formula.get("image_path", ""),
    }


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python process_formulas.py <formula_image_path> [context]")
        sys.exit(1)
    ctx = sys.argv[2] if len(sys.argv) > 2 else ""
    result = describe_formula_image(sys.argv[1], context=ctx)
    print(json.dumps(result, ensure_ascii=False, indent=2))
