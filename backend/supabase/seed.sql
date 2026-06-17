-- Phoenix Forge — Seed Data
-- Run after schema.sql and rls.sql

-- ===================== COURSES =====================
INSERT INTO public.courses (title, description, category, total_lessons, display_order) VALUES
  ('Инженерная часть',
   'Изучи принципы проектирования FTC-робота — дриветрейны, манипуляторы, intake-системы. Научись работать с TETRIX и REV Robotics kit.',
   'engineering', 6, 1),
  ('Кодинг',
   'Освой FTC SDK — напиши автономный режим и TeleOp. Научись использовать OnBot Java, Road Runner, компьютерное зрение (EOCV).',
   'coding', 20, 2),
  ('Inspire',
   'FTC — это не только робот. Научись оформлять Engineering Portfolio, строить команду, проводить outreach и выигрывать номинации судей.',
   'inspire', 16, 3);

-- ===================== LESSONS (Course 1) =====================
INSERT INTO public.lessons (course_id, section_num, lesson_num, title, duration_sec, type, youtube_id, content_text, display_order) VALUES
  (1, 1, 1, '1.1 Введение в FTC kit — TETRIX и REV', 750, 'video', 'dQw4w9WgXcQ',
   'Полный курс по механике FTC-робота. От выбора дриветрейна до финальной инспекции на турнире.

## REV Robotics
Система на основе алюминиевого профиля 15x15мм (extrusion), которая обеспечивает гибкость сборки. Вы можете крепить детали в любой точке профиля.

## TETRIX
Классический набор FTC с алюминиевыми каналами и пластинами. Хорошо подходит для начинающих команд благодаря большому количеству обучающих материалов.', 1),

  (1, 1, 2, '1.2 Типы дриветрейнов: Tank, Mecanum, Swerve', 1125, 'doc', NULL,
   'Обзор основных типов дриветрейнов, применяемых в FTC.

## Tank Drive
Простая и надёжная конфигурация: два ряда моторов по бокам. Отличная сила тяги, легко программировать.

## Mecanum Drive
Позволяет двигаться в любом направлении без поворота корпуса (holonomic). Требует 4 мотора и более сложного кода.

## Swerve Drive
Каждое колесо имеет независимый поворотный модуль. Максимальная манёвренность, но сложнейшая механика и код.', 2),

  (1, 1, 3, '1.3 Выбор дриветрейна под игровой сезон', 600, 'doc', NULL,
   'Как выбрать оптимальный дриветрейн для конкретного игрового сезона FTC.

Анализируй: задачи Auto и TeleOp, препятствия на поле, необходимость бокового движения, опыт команды в программировании.

Для большинства новых команд рекомендуется Mecanum — достаточно манёвренный и хорошо поддерживаемый Road Runner.', 3),

  (1, 1, 4, '1.4 Основы CAD для FTC (onShape)', 1500, 'video', 'dQw4w9WgXcQ',
   'Введение в CAD-проектирование для FTC с использованием onShape.

onShape — браузерный инструмент для командной 3D-разработки. Бесплатен для образовательных целей.

В этом уроке: создание деталей, сборок, работа со стандартными компонентами REV и TETRIX.', 4),

  (1, 2, 1, '2.1 Линейные слайды — конструкция', 1335, 'video', 'dQw4w9WgXcQ',
   'Проектирование и сборка линейных слайдов для подъёмных механизмов FTC.

Рассматриваем: материалы (алюминиевые каналы vs профиль), передаточные числа, крепёж тросов и верёвок, предотвращение скручивания.

Типовой подъёмник: 4-секционный слайд с тросовой передачей на один мотор.', 5),

  (1, 2, 2, '2.2 Intake-системы: ролики, swept intake', 900, 'doc', NULL,
   'Обзор intake-механизмов для захвата игровых элементов.

## Роликовый intake
Простой и надёжный. Ролики из пенорезины или термопластика захватывают элемент и подают внутрь.

## Swept intake
Широко используется в топ-командах. Скошенные крылья направляют элемент в центр. Эффективнее при быстром движении.', 6);

-- ===================== TESTS =====================
INSERT INTO public.tests (title, course_id, time_limit_min, max_attempts, is_available) VALUES
  ('Дриветрейны',              1, 20, 2, TRUE),
  ('Манипуляторы и передачи',  1, 30, 2, TRUE),
  ('Финальный тест: Инженерная часть', 1, 45, 1, FALSE),
  ('FTC SDK и Hardware Map',   2, 20, 1, FALSE),
  ('Engineering Portfolio',    3, 20, 1, FALSE);

-- ===================== QUESTIONS — Test 1 (Дриветрейны) =====================
INSERT INTO public.questions (test_id, display_order, question_text) VALUES
  (1,  1, 'В чём основное преимущество Mecanum дриветрейна перед Tank?'),
  (1,  2, 'Сколько моторов минимально требуется для Mecanum дриветрейна?'),
  (1,  3, 'Какой дриветрейн обеспечивает наибольшую силу тяги при столкновениях?'),
  (1,  4, 'Что такое holonomic движение?'),
  (1,  5, 'Под каким углом наклонены ролики на Mecanum колесе?'),
  (1,  6, 'В каком случае Tank Drive предпочтительнее Mecanum?'),
  (1,  7, 'Что такое Swerve Drive?'),
  (1,  8, 'Какой тип дриветрейна наиболее прост в программировании?'),
  (1,  9, 'Сколько DC-моторов максимально разрешено использовать в FTC-роботе?'),
  (1, 10, 'Как называется 30-секундный автономный период в матче FTC?'),
  (1, 11, 'Какой набор деталей использует алюминиевый профиль 15×15 мм?'),
  (1, 12, 'Что такое Field Centric управление?'),
  (1, 13, 'Какой тип колёс обеспечивает наилучшее сцепление с полем?'),
  (1, 14, 'Что проверяют судьи на Robot Inspection?'),
  (1, 15, 'Какой дриветрейн наиболее популярен среди топ-команд FTC последних сезонов?');

-- ===================== OPTIONS — Question 1 =====================
WITH q AS (SELECT id FROM public.questions WHERE test_id = 1 AND display_order = 1)
INSERT INTO public.question_options (question_id, option_text, is_correct) VALUES
  ((SELECT id FROM q), 'Способность двигаться в любом направлении (holonomic) без поворота корпуса', TRUE),
  ((SELECT id FROM q), 'Более высокая скорость на прямых участках', FALSE),
  ((SELECT id FROM q), 'Большая сила тяги (pushing power) при столкновениях', FALSE),
  ((SELECT id FROM q), 'Требует только два мотора для управления', FALSE);

-- Question 2
WITH q AS (SELECT id FROM public.questions WHERE test_id = 1 AND display_order = 2)
INSERT INTO public.question_options (question_id, option_text, is_correct) VALUES
  ((SELECT id FROM q), '2', FALSE),
  ((SELECT id FROM q), '3', FALSE),
  ((SELECT id FROM q), '4', TRUE),
  ((SELECT id FROM q), '6', FALSE);

-- Question 3
WITH q AS (SELECT id FROM public.questions WHERE test_id = 1 AND display_order = 3)
INSERT INTO public.question_options (question_id, option_text, is_correct) VALUES
  ((SELECT id FROM q), 'Mecanum Drive', FALSE),
  ((SELECT id FROM q), 'Tank Drive', TRUE),
  ((SELECT id FROM q), 'Swerve Drive', FALSE),
  ((SELECT id FROM q), 'H-Drive', FALSE);

-- Question 4
WITH q AS (SELECT id FROM public.questions WHERE test_id = 1 AND display_order = 4)
INSERT INTO public.question_options (question_id, option_text, is_correct) VALUES
  ((SELECT id FROM q), 'Движение только по прямой линии', FALSE),
  ((SELECT id FROM q), 'Способность перемещаться в любом направлении без изменения ориентации робота', TRUE),
  ((SELECT id FROM q), 'Вращение на месте без поступательного движения', FALSE),
  ((SELECT id FROM q), 'Движение задним ходом', FALSE);

-- Question 5
WITH q AS (SELECT id FROM public.questions WHERE test_id = 1 AND display_order = 5)
INSERT INTO public.question_options (question_id, option_text, is_correct) VALUES
  ((SELECT id FROM q), '30°', FALSE),
  ((SELECT id FROM q), '45°', TRUE),
  ((SELECT id FROM q), '60°', FALSE),
  ((SELECT id FROM q), '90°', FALSE);

-- Question 6
WITH q AS (SELECT id FROM public.questions WHERE test_id = 1 AND display_order = 6)
INSERT INTO public.question_options (question_id, option_text, is_correct) VALUES
  ((SELECT id FROM q), 'Когда нужна голономная манёвренность', FALSE),
  ((SELECT id FROM q), 'Когда важна надёжность и максимальная сила тяги', TRUE),
  ((SELECT id FROM q), 'Когда нужно двигаться боком', FALSE),
  ((SELECT id FROM q), 'Когда поле требует точного позиционирования по X/Y', FALSE);

-- Question 7
WITH q AS (SELECT id FROM public.questions WHERE test_id = 1 AND display_order = 7)
INSERT INTO public.question_options (question_id, option_text, is_correct) VALUES
  ((SELECT id FROM q), 'Дриветрейн с двумя ведущими колёсами', FALSE),
  ((SELECT id FROM q), 'Дриветрейн с Mecanum колёсами', FALSE),
  ((SELECT id FROM q), 'Дриветрейн с независимо поворачивающимися модулями для каждого колеса', TRUE),
  ((SELECT id FROM q), 'Дриветрейн с одним центральным мотором', FALSE);

-- Question 8
WITH q AS (SELECT id FROM public.questions WHERE test_id = 1 AND display_order = 8)
INSERT INTO public.question_options (question_id, option_text, is_correct) VALUES
  ((SELECT id FROM q), 'Swerve Drive', FALSE),
  ((SELECT id FROM q), 'Mecanum Drive', FALSE),
  ((SELECT id FROM q), 'Tank Drive', TRUE),
  ((SELECT id FROM q), 'H-Drive', FALSE);

-- Question 9
WITH q AS (SELECT id FROM public.questions WHERE test_id = 1 AND display_order = 9)
INSERT INTO public.question_options (question_id, option_text, is_correct) VALUES
  ((SELECT id FROM q), '4', FALSE),
  ((SELECT id FROM q), '6', FALSE),
  ((SELECT id FROM q), '8', TRUE),
  ((SELECT id FROM q), '12', FALSE);

-- Question 10
WITH q AS (SELECT id FROM public.questions WHERE test_id = 1 AND display_order = 10)
INSERT INTO public.question_options (question_id, option_text, is_correct) VALUES
  ((SELECT id FROM q), 'TeleOp', FALSE),
  ((SELECT id FROM q), 'Autonomous', TRUE),
  ((SELECT id FROM q), 'Endgame', FALSE),
  ((SELECT id FROM q), 'Setup', FALSE);

-- Question 11
WITH q AS (SELECT id FROM public.questions WHERE test_id = 1 AND display_order = 11)
INSERT INTO public.question_options (question_id, option_text, is_correct) VALUES
  ((SELECT id FROM q), 'TETRIX', FALSE),
  ((SELECT id FROM q), 'REV Robotics', TRUE),
  ((SELECT id FROM q), 'AndyMark', FALSE),
  ((SELECT id FROM q), 'goBILDA', FALSE);

-- Question 12
WITH q AS (SELECT id FROM public.questions WHERE test_id = 1 AND display_order = 12)
INSERT INTO public.question_options (question_id, option_text, is_correct) VALUES
  ((SELECT id FROM q), 'Управление относительно корпуса робота', FALSE),
  ((SELECT id FROM q), 'Управление относительно поля — joystick forward всегда двигает робота в одну сторону поля', TRUE),
  ((SELECT id FROM q), 'Автономное управление роботом через камеру', FALSE),
  ((SELECT id FROM q), 'Управление только через пульт судьи', FALSE);

-- Question 13
WITH q AS (SELECT id FROM public.questions WHERE test_id = 1 AND display_order = 13)
INSERT INTO public.question_options (question_id, option_text, is_correct) VALUES
  ((SELECT id FROM q), 'Mecanum колёса', FALSE),
  ((SELECT id FROM q), 'Omni-колёса', FALSE),
  ((SELECT id FROM q), 'Резиновые тракшн-колёса', TRUE),
  ((SELECT id FROM q), 'Пластиковые колёса', FALSE);

-- Question 14
WITH q AS (SELECT id FROM public.questions WHERE test_id = 1 AND display_order = 14)
INSERT INTO public.question_options (question_id, option_text, is_correct) VALUES
  ((SELECT id FROM q), 'Только программный код робота', FALSE),
  ((SELECT id FROM q), 'Соответствие размерным ограничениям и правилам безопасности', TRUE),
  ((SELECT id FROM q), 'Только вес робота', FALSE),
  ((SELECT id FROM q), 'Только цвет и маркировку робота', FALSE);

-- Question 15
WITH q AS (SELECT id FROM public.questions WHERE test_id = 1 AND display_order = 15)
INSERT INTO public.question_options (question_id, option_text, is_correct) VALUES
  ((SELECT id FROM q), 'Tank Drive', FALSE),
  ((SELECT id FROM q), 'Swerve Drive', FALSE),
  ((SELECT id FROM q), 'Mecanum Drive', TRUE),
  ((SELECT id FROM q), 'H-Drive', FALSE);

-- ===================== CERTIFICATES =====================
INSERT INTO public.certificates (name, required_course_id) VALUES
  ('Сертификат: Инженерная часть FTC', 1),
  ('Сертификат: Кодинг FTC', 2),
  ('Сертификат: Inspire & Portfolio FTC', 3),
  ('Phoenix Forge — Full FTC Certificate', NULL);
