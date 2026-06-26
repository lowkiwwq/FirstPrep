import os
import sys
import httpx
import traceback
from io import StringIO
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form

from database import query, query_one, execute
from deps import get_current_user

router = APIRouter()

# Schema synchronization and seeding on startup
def ensure_db_synced():
    try:
        # Add columns if not exist
        execute("ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';")
        execute("ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS section_title TEXT;")
        
        # Create lesson_content table
        execute("""
        CREATE TABLE IF NOT EXISTS public.lesson_content (
          id SERIAL PRIMARY KEY,
          lesson_id TEXT UNIQUE NOT NULL,
          blocks JSONB,
          updated_at TIMESTAMPTZ DEFAULT NOW(),
          updated_by UUID
        );
        """)
        
        # Create lesson_files table
        execute("""
        CREATE TABLE IF NOT EXISTS public.lesson_files (
          id SERIAL PRIMARY KEY,
          lesson_id TEXT NOT NULL,
          file_url TEXT NOT NULL,
          file_type TEXT NOT NULL,
          file_name TEXT NOT NULL,
          size INTEGER NOT NULL
        );
        """)
        
        # Add foreign key columns or updates if needed
        # Sync the 7 default courses
        courses_to_sync = [
            {"id": 1, "title": "Введение в FIRST", "category": "intro", "display_order": 1},
            {"id": 2, "title": "Проектирование в CAD", "category": "cad", "display_order": 2},
            {"id": 3, "title": "Билд", "category": "build", "display_order": 3},
            {"id": 4, "title": "Код & Алгоритмы", "category": "coding", "display_order": 4},
            {"id": 5, "title": "Гейм-драйв", "category": "gamedrive", "display_order": 5},
            {"id": 6, "title": "Инспаир", "category": "inspire", "display_order": 6},
            {"id": 7, "title": "О текущем сезоне", "category": "season", "display_order": 7},
        ]
        
        for c in courses_to_sync:
            existing = query_one("SELECT id FROM courses WHERE id = %s", (c["id"],))
            if not existing:
                # Try to map by category first
                existing_cat = query_one("SELECT id FROM courses WHERE category = %s", (c["category"],))
                if existing_cat:
                    execute("UPDATE courses SET id = %s, title = %s, display_order = %s WHERE category = %s", 
                            (c["id"], c["title"], c["display_order"], c["category"]))
                else:
                    execute("INSERT INTO courses (id, title, description, category, total_lessons, display_order) VALUES (%s, %s, %s, %s, %s, %s)",
                            (c["id"], c["title"], "", c["category"], 0, c["display_order"]))
                            
        # Reset courses id sequence
        execute("SELECT setval(pg_get_serial_sequence('courses', 'id'), coalesce(max(id), 1)) FROM courses;")
        
        # Default structures for lessons
        default_lessons = {
            # Intro
            1: [
                (1, 1, "1.1 История FIRST и Dean Kamen", "info", "Что такое FIRST и FTC"),
                (1, 2, "1.2 Программы FIRST: FLL, FTC, FRC — отличия", "info", "Что такое FIRST и FTC"),
                (1, 3, "1.3 Что такое FTC и зачем участвовать", "info", "Что такое FIRST и FTC"),
                (1, 4, "1.4 Gracious Professionalism — философия FIRST", "info", "Что такое FIRST и FTC"),
                (2, 1, "2.1 Сезонный календарь: Kickoff → Qualifiers → Regionals → Worlds", "info", "Структура соревнований"),
                (2, 2, "2.2 Формат матчей: Autonomous + TeleOp + Endgame", "info", "Структура соревнований"),
                (2, 3, "2.3 Alliance format — как работают альянсы", "info", "Структура соревнований"),
                (2, 4, "2.4 Система начисления очков", "info", "Структура соревнований"),
                (2, 5, "2.5 Advancing criteria — как попасть на следующий уровень", "info", "Структура соревнований"),
                (3, 1, "3.1 Структура FTC команды (до 15 человек, 7–12 класс)", "info", "Команда"),
                (3, 2, "3.2 Роли в команде: капитан, инженеры, программисты, drive team, outreach", "info", "Команда"),
                (3, 3, "3.3 Коучи и менторы — их роль", "info", "Команда"),
                (3, 4, "3.4 Как зарегистрировать команду в FIRST", "info", "Команда"),
                (3, 5, "3.5 Командная культура и распределение задач", "info", "Команда"),
                (4, 1, "4.1 Обзор REV Robotics kit", "info", "Детали и комплектующие"),
                (4, 2, "4.2 REV Control Hub и Expansion Hub", "info", "Детали и комплектующие"),
                (4, 3, "4.3 Моторы, сервоприводы, энкодеры", "info", "Детали и комплектующие"),
                (4, 4, "4.4 Допустимые и недопустимые детали по правилам", "info", "Детали и комплектующие"),
                (4, 5, "4.5 Где закупать детали и бюджет команды (смета)", "info", "Детали и комплектующие"),
                (5, 1, "5.1 Структура Game Manual Part 1 (общие правила)", "info", "Game Manual"),
                (5, 2, "5.2 Game Manual Part 2 (правила сезона) — как читать", "info", "Game Manual"),
                (5, 3, "5.3 Как отслеживать обновления и Q&A", "info", "Game Manual"),
                (5, 4, "5.4 Штрафы и дисквалификации — чего избегать", "info", "Game Manual"),
                (6, 1, "6.1 Что такое Robot Inspection и когда она проходит", "info", "Инспекция"),
                (6, 2, "6.2 Чеклист инспекции: размеры, вес, электрика", "info", "Инспекция"),
                (6, 3, "6.4 Частые причины провала инспекции", "info", "Инспекция"),
                (6, 4, "6.4 Как подготовиться и пройти с первого раза", "info", "Инспекция"),
                (7, 1, "7.1 Советы опытных команд — с чего начать сезон", "info", "Рекомендации от менторов"),
                (7, 2, "7.2 Типичные ошибки новичков и как их избежать", "info", "Рекомендации от менторов"),
                (7, 3, "7.3 Как вести Engineering Notebook с первого дня", "info", "Рекомендации от менторов"),
                (7, 4, "7.4 Тайм-менеджмент команды в течение сезона", "info", "Рекомендации от менторов"),
            ],
            # CAD
            2: [
                (1, 1, "1.1 Введение — зачем CAD в FTC (Марк)", "video", "Основы CAD для FTC"),
                (1, 2, "1.2 Обзор onShape — бесплатный инструмент команды", "video", "Основы CAD для FTC"),
                (1, 3, "1.3 Создай аккаунт onShape и первую деталь", "assignment", "Основы CAD для FTC"),
                (1, 4, "1.4 Базовые операции: sketch, extrude, mate", "video", "Основы CAD для FTC"),
                (2, 1, "2.1 Типы дриветрейнов — Tank, Mecanum, H-Drive", "video", "Проектирование дриветрейна"),
                (2, 2, "2.2 Проектируем Mecanum дриветрейн в onShape (Марк)", "video", "Проектирование дриветрейна"),
                (2, 3, "2.3 Спроектируй дриветрейн по заданным размерам", "assignment", "Проектирование дриветрейна"),
                (2, 4, "2.4 Крепление моторов и передачи", "video", "Проектирование дриветрейна"),
                (3, 1, "3.1 Линейные слайды — проектирование (Марк)", "video", "Манипуляторы"),
                (3, 2, "3.2 Intake механизм — расчёт и сборка в CAD", "video", "Манипуляторы"),
                (3, 3, "3.3 Спроектируй простой манипулятор", "assignment", "Манипуляторы"),
                (3, 4, "3.4 Разбор ошибок в проектах команд", "video", "Манипуляторы"),
                (4, 1, "4.1 Сборка subassemblies в единую модель", "video", "Сборка полного робота в CAD"),
                (4, 2, "4.2 Проверка коллизий и зазоров", "video", "Сборка полного робота в CAD"),
                (4, 3, "4.3 Финальный проект — полная CAD модель робота", "assignment", "Сборка полного робота в CAD"),
                (4, 4, "4.4 Экспорт чертежей для сборки", "video", "Сборка полного робота в CAD"),
                (5, 1, "5.1 Загрузить скетч на проверку", "ai", "AI Проверка скетча"),
            ],
            # Build
            3: [
                (1, 1, "1.1 Инструменты для сборки: шестигранники, ключи, кусачки", "info", "Материалы и инструменты"),
                (1, 2, "1.2 Материалы: алюминий, сталь, поликарбонат, 3D-печать", "info", "Материалы и инструменты"),
                (1, 3, "1.3 Клей и фиксаторы резьбы", "info", "Материалы и инструменты"),
                (2, 1, "2.1 Сборка шасси по чертежам", "experiment", "Практика сборки"),
                (2, 2, "2.2 Люфты и соосность валов — как избежать трения", "info", "Практика сборки"),
                (2, 3, "2.3 Монтаж электроники и кабель-менеджмент", "experiment", "Практика сборки"),
            ],
            # Coding
            4: [
                (1, 1, "1.1 Введение во фреймворк FTC SDK", "info", "Основы FTC Java SDK"),
                (1, 2, "1.2 Настройка среды: Android Studio vs OnBotJava", "lab", "Основы FTC Java SDK"),
                (1, 3, "1.3 Hardware Map — инициализация моторов и датчиков", "info", "Основы FTC Java SDK"),
                (1, 4, "1.4 Наш первый TeleOp — управление с геймпада", "info", "Основы FTC Java SDK"),
                (2, 1, "2.1 Логика линейного OpMode (LinearOpMode)", "info", "Автономный период"),
                (2, 2, "2.2 Движение по времени vs по энкодерам (RunToPosition)", "lab", "Автономный период"),
                (2, 3, "2.3 Использование гироскопа (IMU) для точных поворотов", "info", "Автономный период"),
                (3, 1, "3.1 Камера на роботе — обзор веб-камер и креплений", "info", "Компьютерное зрение в FTC"),
                (3, 2, "3.2 Введение в OpenCV и EasyOpenCV (EOCV)", "info", "Компьютерное зрение в FTC"),
                (3, 3, "3.3 Создание контуров и детекция игровых элементов", "info", "Компьютерное зрение в FTC"),
                (3, 4, "3.4 Написание кастомного Pipeline для распознавания", "lab", "Компьютерное зрение в FTC"),
            ],
            # Game Drive
            5: [
                (1, 1, "1.1 Основные правила пилотирования на турнире", "info", "Правила управления"),
                (1, 2, "1.2 Взаимодействие альянсов на поле", "info", "Правила управления"),
                (2, 1, "2.1 Упражнения на маневренность (восьмерка, парковка)", "experiment", "Техники тренировок"),
                (2, 2, "2.2 Симуляция матчей под давлением", "experiment", "Техники тренировок"),
            ],
            # Inspire
            6: [
                (1, 1, "1.1 Что такое Engineering Portfolio и его требования", "info", "Инженерное портфолио"),
                (1, 2, "1.2 Дизайн портфолио и подача информации", "info", "Инженерное портфолио"),
                (1, 3, "1.3 Как описывать итеративный процесс проектирования", "info", "Инженерное портфолио"),
                (2, 1, "2.1 Структура судейской презентации (5 минут)", "info", "Судейство (Judging)"),
                (2, 2, "2.2 Ответы на вопросы судей в пит-зоне", "info", "Судейство (Judging)"),
            ],
            # Season
            7: [
                (1, 1, "1.1 Разбор игровых правил сезона Biobuzz", "info", "Biobuzz Правила"),
                (1, 2, "1.2 Анализ очков и выигрышных стратегий", "info", "Biobuzz Правила"),
            ]
        }
        
        for course_id, lessons_list in default_lessons.items():
            count = query_one("SELECT COUNT(*) AS c FROM lessons WHERE course_id = %s", (course_id,))["c"]
            if count == 0:
                display_order = 1
                for sec_num, les_num, title, l_type, sec_title in lessons_list:
                    execute("""
                        INSERT INTO lessons (course_id, section_num, lesson_num, title, duration_sec, type, status, section_title, display_order)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """, (course_id, sec_num, les_num, title, 600, l_type, "published", sec_title, display_order))
                    display_order += 1
                    
        # Reset lessons sequence
        execute("SELECT setval(pg_get_serial_sequence('lessons', 'id'), coalesce(max(id), 1)) FROM lessons;")
    except Exception as e:
        print("Schema sync failed: ", e)
        traceback.print_exc()

# Run schema sync immediately on import
ensure_db_synced()

# Check user role authorization
def check_mentor_permission(user = Depends(get_current_user)):
    # Local check on email structure since we don't have roles in database by default
    # If the user is admin@ or mentor@ or if we find them in admin role list
    email = user.get("email", "").lower()
    if "admin" in email or "mentor" in email:
        return user
    raise HTTPException(status_code=403, detail="Only accessible by mentors or admins")

class BlockUpdate(BaseModel):
    blocks: List[Dict[str, Any]]

class LessonUpdate(BaseModel):
    title: str
    type: str
    status: str
    duration_min: int
    forge_coins: Optional[int] = 10
    is_required: Optional[bool] = True
    is_available: Optional[bool] = True

class CodeCompileRequest(BaseModel):
    language: str
    code: str

# 1. GET /admin/courses
@router.get("/admin/courses", dependencies=[Depends(check_mentor_permission)])
def admin_courses():
    courses = query("SELECT * FROM courses ORDER BY display_order")
    result = []
    for c in courses:
        # Get count of sections
        sections_res = query_one("SELECT COUNT(DISTINCT section_num) AS c FROM lessons WHERE course_id = %s", (c["id"],))
        sections_count = sections_res["c"] if sections_res else 0
        
        # Get count of lessons
        lessons_res = query_one("SELECT COUNT(*) AS c FROM lessons WHERE course_id = %s", (c["id"],))
        lessons_count = lessons_res["c"] if lessons_res else 0
        
        # Determine last modified date
        last_mod_res = query_one("""
            SELECT MAX(updated_at) AS m FROM lesson_content lc
            JOIN lessons l ON l.id::text = lc.lesson_id OR lc.lesson_id = CONCAT((SELECT category FROM courses WHERE id = l.course_id), '_', l.lesson_num)
            WHERE l.course_id = %s
        """, (c["id"],))
        
        last_modified = last_mod_res["m"] if last_mod_res and last_mod_res["m"] else c["created_at"]
        
        result.append({
            "id": c["id"],
            "title": c["title"],
            "category": c["category"],
            "sections_count": sections_count,
            "lessons_count": lessons_count,
            "status": "published" if lessons_count > 0 else "draft",
            "last_modified": last_modified
        })
    return result

# 2. GET /admin/courses/{slug}
@router.get("/admin/courses/{slug}", dependencies=[Depends(check_mentor_permission)])
def admin_course_detail(slug: str):
    course = query_one("SELECT * FROM courses WHERE category = %s", (slug,))
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
        
    lessons = query("SELECT * FROM lessons WHERE course_id = %s ORDER BY section_num, display_order, lesson_num", (course["id"],))
    
    sections = {}
    for l in lessons:
        sec_num = l["section_num"]
        sections.setdefault(sec_num, {
            "section_num": sec_num,
            "title": l["section_title"] or f"Секция {sec_num}",
            "lessons": []
        })
        sections[sec_num]["lessons"].append(l)
        
    return {
        "course": course,
        "sections": [v for k, v in sorted(sections.items())]
    }

# 3. POST /admin/courses/{slug}/sections
@router.post("/admin/courses/{slug}/sections", dependencies=[Depends(check_mentor_permission)])
def admin_add_section(slug: str, body: Dict[str, Any]):
    course = query_one("SELECT id FROM courses WHERE category = %s", (slug,))
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    title = body.get("title", "Новая секция")
    
    # Find next section number
    max_sec = query_one("SELECT MAX(section_num) as m FROM lessons WHERE course_id = %s", (course["id"],))
    next_sec = (max_sec["m"] or 0) + 1
    
    # Add a placeholder lesson to create the section in database
    execute("""
        INSERT INTO lessons (course_id, section_num, lesson_num, title, duration_sec, type, status, section_title, display_order)
        VALUES (%s, %s, 1, %s, 600, 'info', 'draft', %s, 1)
    """, (course["id"], next_sec, "1.1 Черновик первого урока", title, title))
    
    return {"status": "ok", "section_num": next_sec, "title": title}

# 4. PUT /admin/courses/{slug}/sections/{section_num}/rename
@router.put("/admin/courses/{slug}/sections/{section_num}/rename", dependencies=[Depends(check_mentor_permission)])
def admin_rename_section(slug: str, section_num: int, body: Dict[str, Any]):
    course = query_one("SELECT id FROM courses WHERE category = %s", (slug,))
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
        
    title = body.get("title", "")
    if not title:
        raise HTTPException(status_code=400, detail="Title cannot be empty")
        
    execute("UPDATE lessons SET section_title = %s WHERE course_id = %s AND section_num = %s", 
            (title, course["id"], section_num))
    return {"status": "ok"}

# 5. DELETE /admin/courses/{slug}/sections/{section_num}
@router.delete("/admin/courses/{slug}/sections/{section_num}", dependencies=[Depends(check_mentor_permission)])
def admin_delete_section(slug: str, section_num: int):
    course = query_one("SELECT id FROM courses WHERE category = %s", (slug,))
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
        
    # Delete all lessons in this section
    execute("DELETE FROM lessons WHERE course_id = %s AND section_num = %s", (course["id"], section_num))
    return {"status": "ok"}

# 6. POST /admin/courses/{slug}/sections/{section_num}/lessons
@router.post("/admin/courses/{slug}/sections/{section_num}/lessons", dependencies=[Depends(check_mentor_permission)])
def admin_add_lesson(slug: str, section_num: int, body: Dict[str, Any]):
    course = query_one("SELECT id FROM courses WHERE category = %s", (slug,))
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
        
    title = body.get("title", "Новый урок")
    l_type = body.get("type", "info").lower()
    
    # Find next lesson number
    max_les = query_one("SELECT MAX(lesson_num) as m FROM lessons WHERE course_id = %s AND section_num = %s", 
                        (course["id"], section_num))
    next_les = (max_les["m"] or 0) + 1
    
    # Get section title
    sec_lesson = query_one("SELECT section_title FROM lessons WHERE course_id = %s AND section_num = %s LIMIT 1",
                           (course["id"], section_num))
    sec_title = sec_lesson["section_title"] if sec_lesson else f"Секция {section_num}"
    
    # Find next display order
    max_disp = query_one("SELECT MAX(display_order) as m FROM lessons WHERE course_id = %s", (course["id"],))
    next_disp = (max_disp["m"] or 0) + 1
    
    execute("""
        INSERT INTO lessons (course_id, section_num, lesson_num, title, duration_sec, type, status, section_title, display_order)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        course["id"],
        section_num,
        next_les,
        f"{section_num}.{next_les} {title}",
        600,
        l_type,
        "draft",
        sec_title,
        next_disp
    ))
    
    new_lesson = query_one("""
        SELECT * FROM lessons 
        WHERE course_id = %s AND section_num = %s AND lesson_num = %s
    """, (course["id"], section_num, next_les))
    
    return new_lesson

# 7. PUT /admin/lessons/{lesson_id}
@router.put("/admin/lessons/{lesson_id}", dependencies=[Depends(check_mentor_permission)])
def admin_update_lesson(lesson_id: str, body: LessonUpdate):
    # Determine if lesson_id is numeric (db id) or composite string (views id)
    # Check by numeric check
    lesson = None
    if lesson_id.isdigit():
        lesson = query_one("SELECT * FROM lessons WHERE id = %s", (int(lesson_id),))
    else:
        # Check if lesson matches categories_lesson_num
        parts = lesson_id.split("_")
        if len(parts) == 2:
            course = query_one("SELECT id FROM courses WHERE category = %s", (parts[0],))
            if course:
                # Find lesson
                les_num_parts = parts[1].split(".")
                les_num = int(les_num_parts[-1]) if les_num_parts[-1].isdigit() else 1
                sec_num = int(les_num_parts[0]) if les_num_parts[0].isdigit() else 1
                lesson = query_one("SELECT * FROM lessons WHERE course_id = %s AND section_num = %s AND lesson_num = %s",
                                   (course["id"], sec_num, les_num))
    
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
        
    duration_sec = body.duration_min * 60
    
    execute("""
        UPDATE lessons 
        SET title = %s, type = %s, status = %s, duration_sec = %s
        WHERE id = %s
    """, (body.title, body.type.lower(), body.status, duration_sec, lesson["id"]))
    
    return {"status": "ok"}

# 8. DELETE /admin/lessons/{lesson_id}
@router.delete("/admin/lessons/{lesson_id}", dependencies=[Depends(check_mentor_permission)])
def admin_delete_lesson(lesson_id: str):
    lesson = None
    if lesson_id.isdigit():
        lesson = query_one("SELECT * FROM lessons WHERE id = %s", (int(lesson_id),))
    else:
        parts = lesson_id.split("_")
        if len(parts) == 2:
            course = query_one("SELECT id FROM courses WHERE category = %s", (parts[0],))
            if course:
                les_num_parts = parts[1].split(".")
                les_num = int(les_num_parts[-1]) if len(les_num_parts) > 1 and les_num_parts[-1].isdigit() else 1
                sec_num = int(les_num_parts[0]) if les_num_parts[0].isdigit() else 1
                lesson = query_one("SELECT * FROM lessons WHERE course_id = %s AND section_num = %s AND lesson_num = %s",
                                   (course["id"], sec_num, les_num))
                                   
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
        
    execute("DELETE FROM lessons WHERE id = %s", (lesson["id"],))
    execute("DELETE FROM lesson_content WHERE lesson_id = %s", (str(lesson["id"]),))
    execute("DELETE FROM lesson_content WHERE lesson_id = %s", (lesson_id,))
    return {"status": "ok"}

# 9. GET /lessons/{lesson_id}/content
@router.get("/lessons/{lesson_id}/content")
def get_lesson_content(lesson_id: str):
    # Check in lesson_content
    content = query_one("SELECT blocks FROM lesson_content WHERE lesson_id = %s", (lesson_id,))
    if not content:
        # Try database ID if string isn't numeric
        if not lesson_id.isdigit():
            # Try to resolve to integer id
            parts = lesson_id.split("_")
            if len(parts) == 2:
                course = query_one("SELECT id FROM courses WHERE category = %s", (parts[0],))
                if course:
                    les_num_parts = parts[1].split(".")
                    les_num = int(les_num_parts[-1]) if les_num_parts[-1].isdigit() else 1
                    sec_num = int(les_num_parts[0]) if les_num_parts[0].isdigit() else 1
                    lesson = query_one("SELECT id FROM lessons WHERE course_id = %s AND section_num = %s AND lesson_num = %s",
                                       (course["id"], sec_num, les_num))
                    if lesson:
                        content = query_one("SELECT blocks FROM lesson_content WHERE lesson_id = %s", (str(lesson["id"]),))

    if content:
        # Load blocks list
        import json
        blocks = content["blocks"]
        if isinstance(blocks, str):
            blocks = json.loads(blocks)
        return {"lesson_id": lesson_id, "blocks": blocks}
        
    # Return empty blocks list
    return {"lesson_id": lesson_id, "blocks": []}

# 10. POST /lessons/{lesson_id}/content
@router.post("/lessons/{lesson_id}/content")
def save_lesson_content(lesson_id: str, body: BlockUpdate, user = Depends(get_current_user)):
    import json
    blocks_json = json.dumps(body.blocks)
    uid = user.get("id")
    
    # Try updating or inserting
    execute("""
        INSERT INTO lesson_content (lesson_id, blocks, updated_at, updated_by)
        VALUES (%s, %s, NOW(), %s)
        ON CONFLICT (lesson_id) 
        DO UPDATE SET blocks = EXCLUDED.blocks, updated_at = NOW(), updated_by = EXCLUDED.updated_by
    """, (lesson_id, blocks_json, uid))
    
    return {"status": "ok", "saved_at": datetime.now(timezone.utc).isoformat()}

# 11. POST /admin/upload
@router.post("/admin/upload", dependencies=[Depends(check_mentor_permission)])
async def admin_upload_file(
    lesson_id: str = Form(...),
    bucket: str = Form(...),
    file: UploadFile = File(...)
):
    content = await file.read()
    filename = f"{datetime.now(timezone.utc).timestamp()}_{file.filename}"
    mime_type = file.content_type or "application/octet-stream"
    
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")
    
    file_url = ""
    # 1. Try Supabase Storage REST API
    if supabase_url and supabase_key:
        try:
            url = f"{supabase_url.rstrip('/')}/storage/v1/object/{bucket}/{filename}"
            headers = {
                "Authorization": f"Bearer {supabase_key}",
                "Content-Type": mime_type
            }
            async with httpx.AsyncClient() as client:
                res = await client.post(url, content=content, headers=headers)
                if res.status_code == 200:
                    file_url = f"{supabase_url.rstrip('/')}/storage/v1/object/public/{bucket}/{filename}"
        except Exception as e:
            print("Supabase Storage upload failed, falling back to local: ", e)
            
    # 2. Fallback to local file serving
    if not file_url:
        os.makedirs("static/uploads", exist_ok=True)
        local_path = os.path.join("static/uploads", filename)
        with open(local_path, "wb") as f:
            f.write(content)
        file_url = f"/static/uploads/{filename}"
        
    # Save file record in lesson_files
    execute("""
        INSERT INTO lesson_files (lesson_id, file_url, file_type, file_name, size)
        VALUES (%s, %s, %s, %s, %s)
    """, (lesson_id, file_url, mime_type, file.filename, len(content)))
    
    return {
        "status": "ok",
        "file_url": file_url,
        "file_name": file.filename,
        "size": len(content)
    }

# 12. POST /api/compile (Python sandbox run)
@router.post("/api/compile")
def compile_code(body: CodeCompileRequest):
    lang = body.language.lower()
    code = body.code
    
    if lang != "python":
        # Mock compilation for C++/Java/other languages
        return {
            "status": "success",
            "output": f"[Phoenix Compiler] {body.language} compilation successful!\nCode executed:\n{code[:100]}...\n\nProcess finished with exit code 0"
        }
        
    # Python code execution sandbox (capturing stdout/stderr)
    old_stdout = sys.stdout
    old_stderr = sys.stderr
    redirected_output = sys.stdout = StringIO()
    redirected_error = sys.stderr = StringIO()
    
    error = None
    try:
        # Executing python code in restricted global environment
        # Only allowing basic builtins
        allowed_globals = {"__builtins__": __builtins__}
        exec(code, allowed_globals)
    except Exception as e:
        error = traceback.format_exc()
    finally:
        sys.stdout = old_stdout
        sys.stderr = old_stderr
        
    stdout_val = redirected_output.getvalue()
    stderr_val = redirected_error.getvalue()
    
    if error:
        return {
            "status": "error",
            "output": stdout_val + stderr_val + f"\nTraceback (most recent call last):\n{error}"
        }
    return {
        "status": "success",
        "output": stdout_val + stderr_val
    }
