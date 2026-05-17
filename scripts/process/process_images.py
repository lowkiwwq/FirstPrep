"""Описание изображений через GPT-4o (мультимодальный)."""

import base64
import json
import sys
from pathlib import Path

from openai import OpenAI

sys.path.insert(0, str(Path(__file__).parent.parent.parent))
from config import IMAGES_DESCRIPTIONS_DIR, OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

_PROMPTS = {
    "schematic": (
        "Ты — эксперт по робототехнике и электронике. Опиши эту электрическую схему подробно:\n"
        "1. Какие компоненты изображены?\n"
        "2. Как они соединены (какой пин к какому)?\n"
        "3. Какое напряжение/ток указаны?\n"
        "4. Для чего предназначена схема?\n"
        "Подпись к изображению: {caption}"
    ),
    "graph": (
        "Опиши этот график:\n"
        "1. Что отложено по осям (название, единицы)?\n"
        "2. Какую зависимость показывает?\n"
        "3. Где ключевые точки (максимумы, минимумы)?\n"
        "4. Какой практический вывод?\n"
        "Подпись: {caption}"
    ),
    "mechanical": (
        "Опиши эту механическую схему/конструкцию:\n"
        "1. Какие элементы изображены (звенья, шарниры, приводы)?\n"
        "2. Сколько степеней свободы?\n"
        "3. Какие размеры/углы указаны?\n"
        "4. Каков принцип работы?\n"
        "Подпись: {caption}"
    ),
    "general": (
        "Опиши изображение в контексте робототехники. "
        "Что на нём изображено? Какую техническую информацию оно содержит?\n"
        "Подпись: {caption}"
    ),
}


def _encode_image(path: str | Path) -> str:
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")


def describe_image(image_path: str | Path, caption: str = "", img_type: str = "general") -> dict:
    image_path = Path(image_path)
    if not image_path.exists():
        return {"error": f"File not found: {image_path}"}

    prompt = _PROMPTS.get(img_type, _PROMPTS["general"]).format(caption=caption or "нет подписи")
    b64 = _encode_image(image_path)
    ext = image_path.suffix.lstrip(".").lower()
    mime = "image/png" if ext == "png" else "image/jpeg"

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": prompt},
                {"type": "image_url", "image_url": {"url": f"data:{mime};base64,{b64}"}},
            ],
        }],
        max_tokens=600,
    )
    description = response.choices[0].message.content

    result = {
        "image_path": str(image_path),
        "caption": caption,
        "type": img_type,
        "description": description,
    }

    desc_path = IMAGES_DESCRIPTIONS_DIR / f"{image_path.stem}.json"
    desc_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return result


def describe_all_images(images_dir: str | Path, captions: dict | None = None) -> list[dict]:
    """Описываем все PNG/JPG в директории."""
    images_dir = Path(images_dir)
    captions = captions or {}
    results = []
    image_files = list(images_dir.glob("*.png")) + list(images_dir.glob("*.jpg"))
    for i, img_path in enumerate(image_files, 1):
        print(f"  Describing {i}/{len(image_files)}: {img_path.name}", end="\r")
        caption = captions.get(img_path.name, "")
        result = describe_image(img_path, caption=caption)
        results.append(result)
    print()
    return results


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python process_images.py <image_path> [caption]")
        sys.exit(1)
    cap = sys.argv[2] if len(sys.argv) > 2 else ""
    res = describe_image(sys.argv[1], caption=cap)
    print(res["description"])
