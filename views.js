// ==========================================
// FIRST Tech Challenge (FTC) Course Catalog
// Dynamic Data Engine & Template Views
// ==========================================

window.CoursesData = {
  intro: {
    id: 'intro',
    title: 'Введение в FIRST',
    tag: 'Intro',
    desc: 'Всё что нужно знать новичку перед первым сезоном FTC.',
    progress: 15,
    sections: [
      {
        title: 'Что такое FIRST и FTC',
        lessons: [
          { id: '1.1', title: 'История FIRST и Dean Kamen', type: 'INFO' },
          { id: '1.2', title: 'Программы FIRST: FLL, FTC, FRC — отличия', type: 'INFO' },
          { id: '1.3', title: 'Что такое FTC и зачем участвовать', type: 'INFO' },
          { id: '1.4', title: 'Gracious Professionalism — философия FIRST', type: 'INFO' }
        ]
      },
      {
        title: 'Структура соревнований',
        lessons: [
          { id: '2.1', title: 'Сезонный календарь: Kickoff → Qualifiers → Regionals → Worlds', type: 'INFO' },
          { id: '2.2', title: 'Формат матчей: Autonomous + TeleOp + Endgame', type: 'INFO' },
          { id: '2.3', title: 'Alliance format — как работают альянсы', type: 'INFO' },
          { id: '2.4', title: 'Система начисления очков', type: 'INFO' },
          { id: '2.5', title: 'Advancing criteria — как попасть на следующий уровень', type: 'INFO' }
        ]
      },
      {
        title: 'Команда',
        lessons: [
          { id: '3.1', title: 'Структура FTC команды (до 15 человек, 7–12 класс)', type: 'INFO' },
          { id: '3.2', title: 'Роли в команде: капитан, инженеры, программисты, drive team, outreach', type: 'INFO' },
          { id: '3.3', title: 'Коучи и менторы — их роль', type: 'INFO' },
          { id: '3.4', title: 'Как зарегистрировать команду в FIRST', type: 'INFO' },
          { id: '3.5', title: 'Командная культура и распределение задач', type: 'INFO' }
        ]
      },
      {
        title: 'Детали и комплектующие',
        lessons: [
          { id: '4.1', title: 'Обзор REV Robotics kit', type: 'INFO' },
          { id: '4.2', title: 'REV Control Hub и Expansion Hub', type: 'INFO' },
          { id: '4.3', title: 'Моторы, сервоприводы, энкодеры', type: 'INFO' },
          { id: '4.4', title: 'Допустимые и недопустимые детали по правилам', type: 'INFO' },
          { id: '4.5', title: 'Где закупать детали и бюджет команды (смета)', type: 'INFO' }
        ]
      },
      {
        title: 'Game Manual',
        lessons: [
          { id: '5.1', title: 'Структура Game Manual Part 1 (общие правила)', type: 'INFO' },
          { id: '5.2', title: 'Game Manual Part 2 (правила сезона) — как читать', type: 'INFO' },
          { id: '5.3', title: 'Как отслеживать обновления и Q&A', type: 'INFO' },
          { id: '5.4', title: 'Штрафы и дисквалификации — чего избегать', type: 'INFO' }
        ]
      },
      {
        title: 'Инспекция',
        lessons: [
          { id: '6.1', title: 'Что такое Robot Inspection и когда она проходит', type: 'INFO' },
          { id: '6.2', title: 'Чеклист инспекции: размеры, вес, электрика', type: 'INFO' },
          { id: '6.3', title: 'Частые причины провала инспекции', type: 'INFO' },
          { id: '6.4', title: 'Как подготовиться и пройти с первого раза', type: 'INFO' }
        ]
      },
      {
        title: 'Рекомендации от менторов',
        lessons: [
          { id: '7.1', title: 'Советы опытных команд — с чего начать сезон', type: 'INFO' },
          { id: '7.2', title: 'Типичные ошибки новичков и как их избежать', type: 'INFO' },
          { id: '7.3', title: 'Как вести Engineering Notebook с первого дня', type: 'INFO' },
          { id: '7.4', title: 'Тайм-менеджмент команды в течение сезона', type: 'INFO' }
        ]
      },
      {
        title: 'Скоро — Смета и финансы',
        locked: true,
        placeholder: 'Этот раздел появится позже: бюджет команды, поиск спонсоров, гранты FIRST'
      }
    ]
  },
  cad: {
    id: 'cad',
    title: 'CAD',
    tag: 'CAD',
    desc: 'Проектирование FTC-робота в CAD. Видеоуроки от ментора + практические задания.',
    progress: 0,
    sections: [
      {
        title: 'Основы CAD для FTC',
        lessons: [
          { id: '1.1', title: 'Введение — зачем CAD в FTC (Марк)', type: 'VIDEO', duration: '10:15' },
          { id: '1.2', title: 'Обзор onShape — бесплатный инструмент команды', type: 'VIDEO', duration: '18:30' },
          { id: '1.3', title: 'Создай аккаунт onShape и первую деталь', type: 'ЗАДАНИЕ', duration: '30:00' },
          { id: '1.4', title: 'Базовые операции: sketch, extrude, mate', type: 'VIDEO', duration: '25:40' }
        ]
      },
      {
        title: 'Проектирование дриветрейна',
        lessons: [
          { id: '2.1', title: 'Типы дриветрейнов — Tank, Mecanum, H-Drive', type: 'VIDEO', duration: '15:20' },
          { id: '2.2', title: 'Проектируем Mecanum дриветрейн в onShape (Марк)', type: 'VIDEO', duration: '35:10' },
          { id: '2.3', title: 'Спроектируй дриветрейн по заданным размерам', type: 'ЗАДАНИЕ', duration: '45:00' },
          { id: '2.4', title: 'Крепление моторов и передачи', type: 'VIDEO', duration: '22:15' }
        ]
      },
      {
        title: 'Манипуляторы',
        lessons: [
          { id: '3.1', title: 'Линейные слайды — проектирование (Марк)', type: 'VIDEO', duration: '28:45' },
          { id: '3.2', title: 'Intake механизм — расчёт и сборка в CAD', type: 'VIDEO', duration: '24:30' },
          { id: '3.3', title: 'Спроектируй простой манипулятор', type: 'ЗАДАНИЕ', duration: '60:00' },
          { id: '3.4', title: 'Разбор ошибок в проектах команд', type: 'VIDEO', duration: '19:50' }
        ]
      },
      {
        title: 'Сборка полного робота в CAD',
        lessons: [
          { id: '4.1', title: 'Сборка subassemblies в единую модель', type: 'VIDEO', duration: '32:15' },
          { id: '4.2', title: 'Проверка коллизий и зазоров', type: 'VIDEO', duration: '17:40' },
          { id: '4.3', title: 'Финальный проект — полная CAD модель робота', type: 'ЗАДАНИЕ', duration: '120:00' },
          { id: '4.4', title: 'Экспорт чертежей для сборки', type: 'VIDEO', duration: '14:10' }
        ]
      }
    ]
  },
  build: {
    id: 'build',
    title: 'Билд',
    tag: 'Build',
    desc: 'Физика конструирования и практика сборки. Видеоролики + эксперименты и задания.',
    progress: 5,
    sections: [
      {
        title: 'Физика для FTC (скоро)',
        locked: true,
        placeholder: 'Ждём материалы от ментора по физике. Здесь будут: механика, передачи, торк, трение.'
      },
      {
        title: 'Сборка дриветрейна',
        lessons: [
          { id: '2.1', title: 'Инструменты и крепёж в FTC сборке', type: 'VIDEO', duration: '12:10' },
          { id: '2.2', title: 'Сборка Mecanum дриветрейна шаг за шагом', type: 'VIDEO', duration: '40:25' },
          { id: '2.3', title: 'Замерь скорость и торк своего дриветрейна', type: 'ЭКСПЕРИМЕНТ' },
          { id: '2.4', title: 'Типичные ошибки при сборке', type: 'VIDEO', duration: '15:45' }
        ]
      },
      {
        title: 'Линейные слайды и манипуляторы',
        lessons: [
          { id: '3.1', title: 'Сборка линейных слайдов REV', type: 'VIDEO', duration: '25:30' },
          { id: '3.2', title: 'Натяжение строп и регулировка', type: 'VIDEO', duration: '18:15' },
          { id: '3.3', title: 'Тест нагрузки манипулятора', type: 'ЭКСПЕРИМЕНТ' },
          { id: '3.4', title: 'Intake — сборка и настройка', type: 'VIDEO', duration: '22:40' }
        ]
      },
      {
        title: 'Электрика и проводка',
        lessons: [
          { id: '4.1', title: 'Схема питания FTC робота', type: 'VIDEO', duration: '14:50' },
          { id: '4.2', title: 'Подключение Control Hub, моторов, сервоприводов', type: 'VIDEO', duration: '26:15' },
          { id: '4.3', title: 'Диагностика робота через Driver Station', type: 'ЭКСПЕРИМЕНТ' },
          { id: '4.4', title: 'Порядок на роботе — cable management', type: 'VIDEO', duration: '11:35' }
        ]
      }
    ]
  },
  coding: {
    id: 'coding',
    title: 'Код',
    tag: 'Coding',
    desc: 'Программирование FTC-робота. От FTC Blocks до Road Runner и компьютерного зрения.',
    progress: 0,
    sections: [
      {
        title: 'Основы FTC SDK',
        lessons: [
          { id: '1.1', title: 'Структура проекта — OpMode and LinearOpMode', type: 'INFO' },
          { id: '1.2', title: 'FTC Blocks: первая программа', type: 'INFO' },
          { id: '1.3', title: 'OnBot Java: переход к тексту', type: 'INFO' },
          { id: '1.4', title: 'Android Studio: настройка среды', type: 'INFO' },
          { id: '1.5', title: 'Hardware Map — моторы, сервоприводы, сенсоры', type: 'INFO' }
        ]
      },
      {
        title: 'TeleOp',
        lessons: [
          { id: '2.1', title: 'Геймпад: кнопки и стики', type: 'INFO' },
          { id: '2.2', title: 'Tank drive vs Mecanum drive', type: 'INFO' },
          { id: '2.3', title: 'Field-centric Mecanum drive', type: 'INFO' },
          { id: '2.4', title: 'Управление манипулятором', type: 'INFO' },
          { id: '2.5', title: 'State machine для сложного TeleOp', type: 'INFO' }
        ]
      },
      {
        title: 'Автономный режим',
        lessons: [
          { id: '3.1', title: 'Структура Autonomous OpMode', type: 'INFO' },
          { id: '3.2', title: 'Encoder-based движение', type: 'INFO' },
          { id: '3.3', title: 'IMU и повороты по углу', type: 'INFO' },
          { id: '3.4', title: 'Введение в Road Runner', type: 'INFO' },
          { id: '3.5', title: 'Генерация траекторий MeepMeep', type: 'INFO' },
          { id: '3.6', title: 'PID-контроллеры', type: 'INFO' }
        ]
      },
      {
        title: 'Компьютерное зрение',
        lessons: [
          { id: '4.1', title: 'Введение в EOCV', type: 'INFO' },
          { id: '4.2', title: 'AprilTags — определение позиции', type: 'INFO' },
          { id: '4.3', title: 'TensorFlow Lite — распознавание объектов', type: 'INFO' },
          { id: '4.4', title: 'Интеграция Vision с автономным режимом', type: 'INFO' }
        ]
      }
    ]
  },
  gamedrive: {
    id: 'gamedrive',
    title: 'Гейм-драйв',
    tag: 'Drive',
    desc: 'Стратегия, управление роботом и подготовка drive team к турниру.',
    progress: 0,
    sections: [
      {
        title: 'Начало сезона',
        lessons: [
          { id: '1.1', title: 'Разбор новой игры после Kickoff — как анализировать', type: 'СОВЕТ' },
          { id: '1.2', title: 'Scoring strategy — считаем очки и приоритеты', type: 'СТРАТЕГИЯ' },
          { id: '1.3', title: 'Выбор auto routine под стратегию команды', type: 'СТРАТЕГИЯ' },
          { id: '1.4', title: 'Как общаться с инженерами: drive team ↔ build team', type: 'СОВЕТ' }
        ]
      },
      {
        title: 'В течение сезона',
        lessons: [
          { id: '2.1', title: 'Структура тренировок drive team', type: 'СОВЕТ' },
          { id: '2.2', title: 'Коммуникация в матче: driver + operator', type: 'СОВЕТ' },
          { id: '2.3', title: 'Разбор видео — как смотреть свои матчи', type: 'СОВЕТ' },
          { id: '2.4', title: 'Адаптация стратегии под обновления робота', type: 'СТРАТЕГИЯ' },
          { id: '2.5', title: 'Психология соревнований — давление и фокус', type: 'СОВЕТ' }
        ]
      },
      {
        title: 'Перед соревнованиями',
        lessons: [
          { id: '3.1', title: 'Scouting других команд — что смотреть', type: 'СТРАТЕГИЯ' },
          { id: '3.2', title: 'Alliance Selection — стратегия выбора партнёра', type: 'СТРАТЕГИЯ' },
          { id: '3.3', title: 'Match strategy с конкретным альянсом', type: 'СТРАТЕГИЯ' },
          { id: '3.4', title: 'Чеклист drive team перед каждым матчем', type: 'СОВЕТ' },
          { id: '3.5', title: 'Разбор эндгейма — тайминг и приоритеты', type: 'СТРАТЕГИЯ' }
        ]
      }
    ]
  },
  inspire: {
    id: 'inspire',
    title: 'Инспаир',
    tag: 'Inspire',
    desc: 'Судейские номинации, outreach и Engineering Portfolio. FTC — это больше чем робот.',
    progress: 0,
    sections: [
      {
        title: 'Sustain Award',
        lessons: [
          { id: '1.1', title: 'Что такое Sustainability Award и критерии', type: 'INFO' },
          { id: '1.2', title: 'Экологические и социальные инициативы команды', type: 'INFO' },
          { id: '1.3', title: 'Как документировать sustainability активности', type: 'INFO' },
          { id: '1.4', title: 'Примеры сильных заявок', type: 'INFO' }
        ]
      },
      {
        title: 'Reach / Outreach',
        lessons: [
          { id: '2.1', title: 'Что считается outreach в FTC', type: 'INFO' },
          { id: '2.2', title: 'Планирование outreach активностей на сезон', type: 'INFO' },
          { id: '2.3', title: 'Работа с junior командами (FLL)', type: 'INFO' },
          { id: '2.4', title: 'Демо-дни и STEM евенты', type: 'INFO' },
          { id: '2.5', title: 'Как документировать outreach в Portfolio', type: 'INFO' }
        ]
      },
      {
        title: 'Connect Award',
        lessons: [
          { id: '3.1', title: 'Что такое Connect Award — критерии', type: 'INFO' },
          { id: '3.2', title: 'Нетворкинг с инженерами и компаниями', type: 'INFO' },
          { id: '3.3', title: 'Как оформить партнёрство с ментором из индустрии', type: 'INFO' },
          { id: '3.4', title: 'Письма поддержки и рекомендации', type: 'INFO' }
        ]
      },
      {
        title: 'Engineering Portfolio',
        lessons: [
          { id: '4.1', title: 'Структура Portfolio — обязательные разделы', type: 'INFO' },
          { id: '4.2', title: 'Engineering Process: итерации и документация', type: 'INFO' },
          { id: '4.3', title: 'Дизайн Portfolio: сетка, шрифты, читаемость', type: 'INFO' },
          { id: '4.4', title: 'Судейское интервью — как отвечать на вопросы', type: 'INFO' },
          { id: '4.5', title: 'Inspire Award — главная награда, как её выиграть', type: 'INFO' }
        ]
      }
    ]
  },
  season: {
    id: 'season',
    title: 'О текущем сезоне',
    tag: 'Season',
    desc: 'Всё о сезоне 2025–26 BIOBUZZ™ presented by RTX. Игра, изменения в правилах, стратегии.',
    progress: 0,
    sections: [
      {
        title: 'Игра и тема сезона',
        lessons: [
          { id: '1.1', title: 'BIOBUZZ™ — тема и нарратив сезона', type: 'INFO' },
          { id: '1.2', title: 'Игровое поле: элементы и зоны', type: 'INFO' },
          { id: '1.3', title: 'Scoring: как начисляются очки в BIOBUZZ™', type: 'INFO' },
          { id: '1.4', title: 'Autonomous period — задачи и бонусы', type: 'INFO' },
          { id: '1.5', title: 'TeleOp + Endgame — приоритеты', type: 'INFO' }
        ]
      },
      {
        title: 'Изменения в правилах',
        lessons: [
          { id: '2.1', title: 'Что изменилось в Game Manual Part 1 vs прошлый сезон', type: 'INFO' },
          { id: '2.2', title: 'Новые штрафы и дисквалификации', type: 'INFO' },
          { id: '2.3', title: 'Изменения в Robot Rules — размеры, вес, детали', type: 'INFO' },
          { id: '2.4', title: 'Advancing criteria 2025–26 — как изменились', type: 'INFO' }
        ]
      },
      {
        title: 'Стратегия сезона',
        lessons: [
          { id: '3.1', title: 'Топ стратегии лучших команд мира', type: 'INFO' },
          { id: '3.2', title: 'Разбор winning robots с прошлых чемпионатов', type: 'INFO' },
          { id: '3.3', title: 'Механические решения под BIOBUZZ™', type: 'INFO' },
          { id: '3.4', title: 'Программные решения — auto paths для этой игры', type: 'INFO' }
        ]
      },
      {
        title: 'Обновления и Q&A',
        lessons: [
          { id: '4.1', title: 'Как отслеживать официальные Q&A FIRST', type: 'INFO' },
          { id: '4.2', title: 'Разбор важных Q&A ответов сезона', type: 'INFO' },
          { id: '4.3', title: 'последние изменения в правилах', type: 'LIVE' }
        ]
      }
    ]
  }
};

// Automatically calculate dynamic lesson counts from sections list
Object.keys(window.CoursesData).forEach(slug => {
  const course = window.CoursesData[slug];
  course.lessonCount = course.sections.reduce((total, section) => {
    if (section.locked) {
      return total + 1; // Counts the lock placeholder
    }
    return total + (section.lessons ? section.lessons.length : 0);
  }, 0);
});

// Setup default active lessons for all courses
window.ActiveLessonsState = window.ActiveLessonsState || {};

// Global dynamic switcher that loads content without page reloads
window.selectLesson = function(courseSlug, secIdx, lesIdx) {
  const course = window.CoursesData[courseSlug];
  const section = course.sections[secIdx];

  if (section.locked) return; // Prevent clicking locked items

  // Save selection state
  window.ActiveLessonsState[courseSlug] = { secIdx, lesIdx };

  // Update visual selection in sidebar
  const activeRow = document.querySelector('.lesson-row.active');
  if (activeRow) activeRow.classList.remove('active');

  const rows = document.querySelectorAll('.lesson-row');
  rows.forEach(row => {
    // Basic match by name/id pattern to find matching row
    const rowTitle = row.querySelector('.lesson-title').innerText;
    const lesson = section.lessons[lesIdx];
    if (rowTitle.includes(lesson.id) && rowTitle.includes(lesson.title)) {
      row.classList.add('active');
    }
  });

  // Re-render only the main lesson panel viewport dynamically!
  const contentContainer = document.querySelector('.lesson-content');
  if (contentContainer) {
    contentContainer.innerHTML = window.getLessonContentPanelHtml(courseSlug, secIdx, lesIdx);
    
    // Call ChibiVideo.init(videoEl) after video element renders in lesson view
    const videoEl = contentContainer.querySelector('video');
    if (videoEl && window.ChibiVideo) {
      window.ChibiVideo.init(videoEl);
    } else if (window.ChibiVideo) {
      window.ChibiVideo.destroy();
    }
    
    // Initialize Code Lab if it's a lab lesson!
    const lesson = section.lessons[lesIdx];
    const isLab = (courseSlug === 'coding' && (lesson.id === '1.2' || lesson.id === '2.2' || lesson.id === '3.4' || lesson.type === 'ЗАДАНИЕ'));
    if (isLab && window.initCodeLab) {
      window.initCodeLab(lesson.id);
    }
  }
};

// Generates educational copies dynamically
window.getLessonDescription = function(courseTitle, sectionTitle, lessonTitle) {
  return `
    <p>Добро пожаловать на урок <strong>"${lessonTitle}"</strong>, входящий в секцию <strong>"${sectionTitle}"</strong> курса <strong>"${courseTitle}"</strong>.</p>
    <br>
    <h3>Ключевые понятия темы</h3>
    <p>FIRST Tech Challenge (FTC) — это не просто соревнование роботов, это комплексная инженерно-исследовательская платформа. В рамках данного занятия мы подробно разберем теоретическую базу, практические приемы и изучим примеры из реальной практики ведущих мировых команд.</p>
    <br>
    <h3>Практические рекомендации</h3>
    <p>Каждое решение должно быть задокументировано в Инженерном Портфолио (Engineering Portfolio). Инженеры должны работать в тесном контакте с программистами и пилотами, чтобы финальный продукт соответствовал всем требованиям Game Manual и Robot Inspection.</p>
  `;
};

// Generates dynamic card & body layouts inside the viewport
window.getLessonContentPanelHtml = function(courseSlug, secIdx, lesIdx) {
  const course = window.CoursesData[courseSlug];
  const section = course.sections[secIdx];
  const lesson = section.lessons[lesIdx];

  const breadcrumb = `Курсы / ${course.title} / ${section.title}`;
  const progressPercent = Math.max(5, course.progress);

  const isLab = (courseSlug === 'coding' && (lesson.id === '1.2' || lesson.id === '2.2' || lesson.id === '3.4' || lesson.type === 'ЗАДАНИЕ'));
  if (isLab) {
    return `
      <div class="lesson-topbar" style="margin-bottom: 16px;">
        <div class="breadcrumb" style="font-family: var(--font-body); font-size: 13px; color: var(--txt2); margin-bottom: 12px;">Курсы / ${course.title} / ${section.title}</div>
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <h2 class="lesson-heading" style="font-family: var(--font-display); font-size: 28px; font-weight: 800; margin-bottom: 0;">${lesson.id} ${lesson.title}</h2>
          <span style="font-family: var(--font-mono); font-size: 10px; color: #FF2D6B; border: 1px solid rgba(255, 45, 107, 0.27); padding: 3px 8px; border-radius: 4px; font-weight: 500; background: rgba(255, 45, 107, 0.05); letter-spacing: 0.05em;">FTC LAB MODE</span>
        </div>
        <div class="progress-bar-container" style="height: 2px; background: #28282c; width: 100%; margin: 12px 0 8px 0; border-radius: 2px;">
          <div class="progress-bar" style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #FF4D1C, #FF2D6B); border-radius: 2px;"></div>
        </div>
      </div>

      <div class="ftc-codelab-container">
        <!-- Top Bar -->
        <div class="codelab-topbar">
          <div class="codelab-title">FTC Code Lab</div>
          <div class="codelab-buttons">
            <button id="btn-run" class="btn btn-primary">▶ Запустить</button>
            <button id="btn-stop" class="btn btn-outline" style="border: 1px solid #FF2D6B; color: #FF2D6B; display: none;">⬛ Стоп</button>
            <button id="btn-reset" class="btn btn-outline">↺ Сбросить</button>
          </div>
        </div>

        <!-- Exercise Chips Row -->
        <div class="exercise-chips-row">
          <div class="exercise-chip active" data-preset="basic">Базовое движение</div>
          <div class="exercise-chip" data-preset="autonomous">Автономный маршрут</div>
          <div class="exercise-chip" data-preset="manipulator">Управление манипулятором</div>
          <div class="exercise-chip" data-preset="trajectory">Следование по траектории</div>
        </div>

        <!-- 3 Panels side by side -->
        <div class="codelab-panels">
          <!-- Left panel (40%): Code Editor -->
          <div class="codelab-panel left-panel">
            <div class="panel-header" id="editor-panel-header">CODE EDITOR</div>
            <div class="panel-body">
              <div id="monaco-editor-container" style="width: 100%; height: 100%;"></div>
              <div id="blocks-editor-container" style="display: none; width: 100%; height: 100%;"></div>
            </div>
          </div>

          <!-- Center panel (35%): 2D Robot Simulator -->
          <div class="codelab-panel center-panel">
            <div class="panel-header">2D Robot Simulator</div>
            <div class="panel-body canvas-wrapper">
              <canvas id="sim-canvas"></canvas>
            </div>
          </div>

          <!-- Right panel (25%): Console & Test Results -->
          <div class="codelab-panel right-panel">
            <div class="panel-tabs">
              <div class="panel-tab active" data-tab="console">Консоль</div>
              <div class="panel-tab" data-tab="tests">Тесты</div>
            </div>
            <div class="panel-body tab-content-wrapper">
              <!-- Console Tab -->
              <div id="tab-console" class="tab-content scrollable">
                <div id="console-logs-container" style="display: flex; flex-direction: column; gap: 4px;"></div>
              </div>
              
              <!-- Tests Tab -->
              <div id="tab-tests" class="tab-content scrollable" style="display: none;">
                <div id="tests-list-container" style="display: flex; flex-direction: column; gap: 4px;"></div>
                <div class="score-badge-container">
                  <div id="score-badge" class="score-badge">Пройдено 0/5 тестов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  let mediaCardHtml = '';

  if (lesson.type === 'VIDEO') {
    mediaCardHtml = `
      <div class="video-placeholder" style="padding:0;background:#000;position:relative;">
        <!-- TODO: replace with real FTC lesson video URL -->
        <video id="lesson-video" class="lesson-video-element" controls width="100%" height="100%" src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" style="display:block;width:100%;height:100%;border-radius:8px;object-fit:cover;"></video>
      </div>
    `;
  } else if (lesson.type === 'ЗАДАНИЕ') {
    mediaCardHtml = `
      <div class="video-placeholder-card">
        <span class="badge-assignment top-left-tag">ЗАДАНИЕ</span>
        <div class="flask-icon-svg" style="display:flex;align-items:center;justify-content:center;color:#FF2D6B;">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </div>
        <span class="duration-badge">${lesson.duration || 'Практика'}</span>
      </div>
    `;
  } else if (lesson.type === 'ЭКСПЕРИМЕНТ') {
    mediaCardHtml = `
      <div class="experiment-placeholder-card">
        <span class="badge-experiment top-left-tag">ЭКСПЕРИМЕНТ</span>
        <svg class="flask-icon-svg" viewBox="0 0 24 24">
          <path d="M19 17L13 7V3H16V1H8V3H11V7L5 17C4.3 18.2 5.2 19.8 6.6 19.8H17.4C18.8 19.8 19.7 18.2 19 17ZM7.3 17.8L11.5 9.8V3H12.5V9.8L16.7 17.8H7.3Z"/>
        </svg>
      </div>
    `;
  } else if (lesson.type === 'СОВЕТ' || lesson.type === 'СТРАТЕГИЯ') {
    const label = lesson.type;
    mediaCardHtml = `
      <div class="recommendation-placeholder-card">
        <span class="badge-tip top-left-tag">${label}</span>
        <svg class="strategy-icon-svg" viewBox="0 0 24 24">
          <path d="M19 3H14.82C14.4 1.84 13.3 1 12 1S9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 3C12.55 3 13 3.45 13 4C13 4.55 12.55 5 12 5C11.45 5 11 4.55 11 4C11 3.45 11.45 3 12 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z"/>
        </svg>
      </div>
    `;
  } else if (lesson.type === 'LIVE') {
    mediaCardHtml = `
      <div class="video-placeholder-card" style="border: 1px solid rgba(255, 45, 107, 0.3);">
        <span class="badge-live top-left-tag">
          <span class="live-pulse-dot"></span>LIVE
        </span>
        <div style="font-family: var(--font-display); font-size: 24px; font-weight: 800; color: #FF2D6B; z-index: 2;">
          АКТИВНЫЙ МОНИТОРИНГ
        </div>
      </div>
    `;
  } else {
    // Default cover card for text INFO lessons
    mediaCardHtml = `
      <div class="video-placeholder-card" style="opacity: 0.85;">
        <span class="badge-video top-left-tag" style="color: #FF8C42 !important; border: 1px solid rgba(255, 140, 66, 0.27) !important;">ИНФО</span>
        <div style="font-family: var(--font-display); font-size: 24px; font-weight: 800; color: #F0EDE8; z-index: 2; letter-spacing:-0.01em;">
          ИНЖЕНЕРНАЯ ТЕОРИЯ
        </div>
      </div>
    `;
  }

  const descHtml = window.getLessonDescription(course.title, section.title, lesson.title);

  return `
    <div class="lesson-topbar">
      <div class="breadcrumb" style="font-family: var(--font-body); font-size: 13px; color: var(--txt2); margin-bottom: 12px;">${breadcrumb}</div>
      <h2 class="lesson-heading" style="font-family: var(--font-display); font-size: 28px; font-weight: 800; margin-bottom: 24px;">${lesson.id} ${lesson.title}</h2>
      <div class="progress-bar-container" style="height: 2px; background: #28282c; width: 100%; margin: 8px 0; border-radius: 2px;">
        <div class="progress-bar" style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #FF4D1C, #FF2D6B); border-radius: 2px;"></div>
      </div>
    </div>
    ${mediaCardHtml}
    <div class="lesson-text" style="font-family: var(--font-body); font-size: 15px; color: var(--txt); line-height: 1.6;">
      ${descHtml}
    </div>
  `;
};

window.AppViews = {
  renderHome: () => `
    <header class="hero" style="position: relative; overflow: hidden;">
      <div id="antigravity-container" style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none;"></div>
      <div class="hero-container animate-item" style="position: relative; z-index: 1;">
        <div class="hero-content-wrapper">
          <h1 class="hero-title">
          <span class="hero-line1" style="color: white;">Собери. Запрограммируй.</span>
          <span class="hero-line2" style="background: linear-gradient(to right, #FF4D1C, #FF2D6B); -webkit-background-clip: text; color: transparent;">Победи на FTC.</span>
        </h1>
        <div class="hero-stats" style="font-family: 'DM Mono', monospace;">
          <div class="stat-item"><span class="stat-number" data-target="500">0</span>+ участников</div>
          <div class="stat-divider"></div>
          <div class="stat-item"><span class="stat-number" data-target="7">0</span> курсов</div>
          <div class="stat-divider"></div>
          <div class="stat-item">World Championship</div>
        </div>
        <div class="hero-buttons">
          <a href="#/courses" class="btn btn-primary">Начать подготовку</a>
          <a href="#/features" class="btn btn-outline">Что такое FTC?</a>
        </div>
        </div>
        <img src="phoenix_transparent.png?v=2" alt="Phoenix" class="hero-phoenix-img">
      </div>
    </header>

    <section id="features" class="features">
      <div class="feature-container">
        <div class="feature-row animate-item">
          <div class="feature-content">
            <div class="feature-eyebrow">СЕЗОН 2025–26</div>
            <h2 class="feature-title">BIOBUZZ™ — новый сезон FTC</h2>
            <p class="feature-desc">Каждый сентябрь FIRST объявляет новый игровой челлендж. В сезоне 2025–26 — BIOBUZZ™ presented by RTX. Мы готовим тебя заранее: стратегия, механика, код — до старта Kickoff.</p>
          </div>
          <div class="feature-visual">
            <div class="visual-card mockup-placeholder">
              <img src="mockup1.webp" alt="Course UI" class="mockup-img" onerror="this.style.display='none'">
            </div>
          </div>
        </div>
        <div class="feature-row flip animate-item">
          <div class="feature-visual">
            <div class="visual-card mockup-placeholder">
              <img src="mockup2.webp" alt="Code Editor" class="mockup-img" onerror="this.style.display='none'">
            </div>
          </div>
          <div class="feature-content">
            <div class="feature-eyebrow">СОРЕВНОВАНИЯ</div>
            <h2 class="feature-title">От отборочных до World Championship</h2>
            <p class="feature-desc">Путь FTC-команды: Qualifying Tournament → Regional/State Championship → World Championship в Хьюстоне. Phoenix Forge поможет тебе пройти каждый этап.</p>
          </div>
        </div>
        <div class="feature-row animate-item">
          <div class="feature-content">
            <div class="feature-eyebrow">GRACIOUS PROFESSIONALISM</div>
            <h2 class="feature-title">FTC — это больше чем робот</h2>
            <p class="feature-desc">Командная работа, outreach, инженерное мышление — участники FTC получают доступ к стипендиям на $80M+. Мы учим не только технике, но и тому, что ценят судьи.</p>
          </div>
          <div class="feature-visual">
            <div class="visual-card mockup-placeholder">
              <img src="mockup3.webp" alt="Mentor Chat" class="mockup-img" onerror="this.style.display='none'">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="courses" class="courses animate-item">
      <div class="courses-container">
        <div class="courses-grid">
          <a href="#/courses/intro" class="course-card">
            <div class="course-tag" style="font-family: var(--font-mono); font-size: 11px;">Intro</div>
            <h3 class="course-title">Введение в FIRST</h3>
            <p class="course-desc">Всё что нужно знать новичку перед первым сезоном FTC. Gracious Professionalism, инспекция, детали.</p>
          </a>
          <a href="#/courses/cad" class="course-card">
            <div class="course-tag" style="font-family: var(--font-mono); font-size: 11px;">CAD</div>
            <h3 class="course-title">Проектирование в CAD</h3>
            <p class="course-desc">Создание 3D-моделей дриветрейнов, манипуляторов и сборка полноценных моделей FTC-роботов в onShape.</p>
          </a>
          <a href="#/courses/coding" class="course-card">
            <div class="course-tag" style="font-family: var(--font-mono); font-size: 11px;">Coding</div>
            <h3 class="course-title">Код & Алгоритмы</h3>
            <p class="course-desc">Освой FTC SDK, Road Runner, MeepMeep и продвинутое компьютерное зрение с помощью библиотек OpenCV/TensorFlow.</p>
          </a>
        </div>
      </div>
    </section>

    <section id="reviews" class="reviews animate-item">
      <div class="ticker-wrapper">
        <div class="ticker">
          <div class="review-card"><p class="review-quote">"Структура курса просто идеальная. Ничего лишнего."</p><div class="review-author"><span class="author-name">Алексей С.</span><span class="author-score">FTC Капитан</span></div></div>
          <div class="review-card"><p class="review-quote">"Инженерная часть — топ. Наконец-то понял, как правильно рассчитывать крутящий момент."</p><div class="review-author"><span class="author-name">Мария В.</span><span class="author-score">Инженер-конструктор</span></div></div>
          <div class="review-card"><p class="review-quote">"Собрали Mecanum дриветрейн за два дня благодаря видеоурокам от Марка."</p><div class="review-author"><span class="author-name">Иван Д.</span><span class="author-score">Драйвер команды</span></div></div>
          <div class="review-card"><p class="review-quote">"Лучшее вложение времени и средств в этом сезоне."</p><div class="review-author"><span class="author-name">Елена К.</span><span class="author-score">Ментор FTC</span></div></div>
          <!-- Duplicates for infinite scroll -->
          <div class="review-card"><p class="review-quote">"Структура курса просто идеальная. Ничего лишнего."</p><div class="review-author"><span class="author-name">Алексей С.</span><span class="author-score">FTC Капитан</span></div></div>
          <div class="review-card"><p class="review-quote">"Инженерная часть — топ. Наконец-то понял, как правильно рассчитывать крутящий момент."</p><div class="review-author"><span class="author-name">Мария В.</span><span class="author-score">Инженер-конструктор</span></div></div>
          <div class="review-card"><p class="review-quote">"Собрали Mecanum дриветрейн за два дня благодаря видеоурокам от Марка."</p><div class="review-author"><span class="author-name">Иван Д.</span><span class="author-score">Драйвер команды</span></div></div>
          <div class="review-card"><p class="review-quote">"Лучшее вложение времени и средств в этом сезоне."</p><div class="review-author"><span class="author-name">Елена К.</span><span class="author-score">Ментор FTC</span></div></div>
        </div>
      </div>
    </section>

    <footer class="footer animate-item">
      <div class="footer-container">
        <h2 class="footer-title">Готов к первому турниру?</h2>
        <p class="footer-desc" style="color: rgba(255, 255, 255, 0.7); margin-bottom: 2rem;">Присоединяйся к Phoenix Forge и начни свой путь к World Championship</p>
        <a href="#/register" class="btn btn-primary">Начать бесплатно</a>
        <p class="footer-legal">© 2026 Phoenix Forge. Все права защищены.</p>
      </div>
    </footer>
  `,

  renderCourses: () => {
    const sidebarHtml = `
      <aside class="sidebar">
        <div class="sidebar-section">
          <h4 class="sidebar-title">Категория</h4>
          <label class="filter-label"><input type="checkbox" class="filter-checkbox" data-group="category" data-value="intro"> Введение</label>
          <label class="filter-label"><input type="checkbox" class="filter-checkbox" data-group="category" data-value="cad"> CAD</label>
          <label class="filter-label"><input type="checkbox" class="filter-checkbox" data-group="category" data-value="build"> Билд</label>
          <label class="filter-label"><input type="checkbox" class="filter-checkbox" data-group="category" data-value="coding"> Код</label>
          <label class="filter-label"><input type="checkbox" class="filter-checkbox" data-group="category" data-value="gamedrive"> Гейм-драйв</label>
          <label class="filter-label"><input type="checkbox" class="filter-checkbox" data-group="category" data-value="inspire"> Инспаир</label>
          <label class="filter-label"><input type="checkbox" class="filter-checkbox" data-group="category" data-value="season"> О сезоне</label>
        </div>
        <div class="sidebar-section">
          <h4 class="sidebar-title">Сложность</h4>
          <label class="filter-label"><input type="checkbox" class="filter-checkbox" data-group="difficulty" data-value="beginner"> Beginner</label>
          <label class="filter-label"><input type="checkbox" class="filter-checkbox" data-group="difficulty" data-value="intermediate"> Intermediate</label>
          <label class="filter-label"><input type="checkbox" class="filter-checkbox" data-group="difficulty" data-value="advanced"> Advanced</label>
        </div>
        <div class="sidebar-section">
          <h4 class="sidebar-title">Статус</h4>
          <label class="filter-label"><input type="checkbox" class="filter-checkbox" data-group="status" data-value="inprogress"> В процессе</label>
          <label class="filter-label"><input type="checkbox" class="filter-checkbox" data-group="status" data-value="completed"> Завершенные</label>
        </div>
      </aside>
    `;

    // 7 Standalone courses in the exact grid order
    const courseSlugs = ['intro', 'cad', 'build', 'coding', 'gamedrive', 'inspire', 'season'];

    let gridHtml = '';
    courseSlugs.forEach(slug => {
      const course = window.CoursesData[slug];
      const count = course.lessonCount;
      const countText = count === 1 ? '1 урок' :
                        (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) ? `${count} урока` :
                        `${count} уроков`;

      let tagClass = 'badge-video';
      if (slug === 'build') tagClass = 'badge-experiment';
      else if (slug === 'coding') tagClass = 'badge-assignment';
      else if (slug === 'gamedrive') tagClass = 'badge-tip';
      else if (slug === 'season') tagClass = 'badge-live';

      // Map dynamic difficulty for filtering
      let difficulty = 'beginner';
      if (slug === 'cad' || slug === 'build' || slug === 'gamedrive') {
        difficulty = 'intermediate';
      } else if (slug === 'coding') {
        difficulty = 'advanced';
      }

      gridHtml += `
        <div class="catalog-card" data-category="${slug}" data-difficulty="${difficulty}" data-progress="${course.progress}">
          <div class="catalog-thumb" style="height: 140px; background: #202022; border-bottom: 1px solid var(--border); position: relative; padding: 16px;">
            <span class="${tagClass}" style="position: absolute; top: 16px; left: 16px;">
              ${slug === 'season' ? '<span class="live-pulse-dot"></span>' : ''}${course.tag}
            </span>
          </div>
          <div class="catalog-info" style="padding: 24px; display: flex; flex-direction: column; gap: 12px; flex: 1;">
            <h3 class="catalog-title" style="font-family: var(--font-display); font-size: 20px; font-weight: 800;">${course.title}</h3>
            <p style="font-family: var(--font-body); font-size: 14px; color: var(--txt2); line-height: 1.5; margin-bottom: 8px;">${course.desc}</p>
            <div class="catalog-meta" style="font-family: var(--font-mono); font-size: 13px; color: #8A8A94; margin-top: auto;">${countText}</div>
            
            <div class="progress-bar-container" style="height: 2px; background: #28282c; width: 100%; margin: 8px 0; border-radius: 2px;">
              <div class="progress-bar" style="width: ${course.progress}%; height: 100%; background: linear-gradient(90deg, #FF4D1C, #FF2D6B); border-radius: 2px;"></div>
            </div>
            
            <a href="#/courses/${slug}" class="btn btn-outline btn-full">Начать</a>
          </div>
        </div>
      `;
    });

    return `
      <div class="page-layout animate-item">
        ${sidebarHtml}
        <main class="main-content">
          <h2 class="page-heading" style="font-family: var(--font-display); font-size: 32px; font-weight: 800; margin-bottom: 32px;">Каталог курсов</h2>
          <div class="catalog-grid">
            ${gridHtml}
          </div>
        </main>
      </div>
    `;
  },

  renderCourseDetail: (courseSlug) => {
    const course = window.CoursesData[courseSlug];
    if (!course) return `<div class="course-detail-layout animate-item"><p>Курс не найден.</p></div>`;

    // Retrieve last selected active lesson, or default to the first unlocked lesson
    let activeState = window.ActiveLessonsState[courseSlug];
    if (!activeState) {
      // Find first unlocked section and active lesson
      let foundSec = 0;
      for (let s = 0; s < course.sections.length; s++) {
        if (!course.sections[s].locked) {
          foundSec = s;
          break;
        }
      }
      activeState = { secIdx: foundSec, lesIdx: 0 };
      window.ActiveLessonsState[courseSlug] = activeState;
    }

    const { secIdx: activeSecIdx, lesIdx: activeLesIdx } = activeState;

    let sidebarHtml = '';
    course.sections.forEach((section, secIdx) => {
      if (section.locked) {
        // Locked Section Header & Locked Row (Opacity 0.4, cursor, lock icon, and CSS tooltip)
        sidebarHtml += `
          <div class="lesson-section locked-tooltip">
            <div class="lesson-section-header" style="font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; color: #8A8A94; letter-spacing: 0.12em;">
              ${secIdx + 1}. ${section.title}
            </div>
            <div class="lesson-row locked">
              <span class="lesson-icon" style="color: #4E4E56;">🔒</span>
              <span class="lesson-title" style="font-family: var(--font-body); font-size: 14px;">Скоро — раздел в разработке</span>
            </div>
          </div>
        `;
      } else {
        sidebarHtml += `
          <div class="lesson-section">
            <div class="lesson-section-header" style="font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; color: #8A8A94; letter-spacing: 0.12em;">
              ${secIdx + 1}. ${section.title}
            </div>
        `;
        section.lessons.forEach((lesson, lesIdx) => {
          const isActive = (secIdx === activeSecIdx && lesIdx === activeLesIdx);
          const isLab = (courseSlug === 'coding' && (lesson.id === '1.2' || lesson.id === '2.2' || lesson.id === '3.4' || lesson.type === 'ЗАДАНИЕ'));
          
          let icon = '📄';
          if (isLab) {
            icon = `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;color:#FF2D6B;"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`;
          } else if (lesson.type === 'VIDEO') {
            icon = '▶';
          } else if (lesson.type === 'ЗАДАНИЕ') {
            icon = '📝';
          } else if (lesson.type === 'ЭКСПЕРИМЕНТ') {
            icon = '🧪';
          } else if (lesson.type === 'СОВЕТ' || lesson.type === 'СТРАТЕГИЯ') {
            icon = '⭐';
          } else if (lesson.type === 'LIVE') {
            icon = '📡';
          }

          sidebarHtml += `
            <div class="lesson-row ${isActive ? 'active' : ''}" onclick="window.selectLesson('${courseSlug}', ${secIdx}, ${lesIdx})">
              <span class="lesson-icon" style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;">${icon}</span>
              <span class="lesson-title" style="font-family: var(--font-body); font-size: 14px; display:flex; align-items:center; gap:6px; flex:1;">
                ${lesson.id} ${lesson.title}
                ${isLab ? `<span style="font-family: var(--font-mono); font-size: 9px; color: #FF2D6B; border: 1px solid rgba(255, 45, 107, 0.27); padding: 1px 4px; border-radius: 3px; font-weight: 500; letter-spacing:0.02em; flex-shrink: 0; background: rgba(255, 45, 107, 0.05);">LAB</span>` : ''}
              </span>
              ${lesson.duration ? `<span class="lesson-duration" style="font-family: var(--font-mono); font-size: 11px; color: var(--txt2); flex-shrink:0;">${lesson.duration}</span>` : ''}
            </div>
          `;
        });
        sidebarHtml += `</div>`;
      }
    });

    const activeContentPanelHtml = window.getLessonContentPanelHtml(courseSlug, activeSecIdx, activeLesIdx);

    // Call ChibiVideo.init(videoEl) after video element renders in lesson view
    setTimeout(() => {
      const videoEl = document.getElementById('lesson-video');
      if (videoEl && window.ChibiVideo) {
        window.ChibiVideo.init(videoEl);
      } else if (window.ChibiVideo) {
        window.ChibiVideo.destroy();
      }
    }, 100);

    return `
      <div class="course-detail-layout animate-item">
        <aside class="lesson-sidebar">
          ${sidebarHtml}
        </aside>

        <main class="lesson-content">
          ${activeContentPanelHtml}
        </main>
      </div>
    `;
  },

  renderTests: () => `
    <div class="page-layout animate-item">
      <main class="main-content full-width">
        <h2 class="page-heading">Доступные тесты</h2>
        <div class="tests-grid">
          <div class="test-card">
            <div class="test-header">
              <h3 class="test-title">Дриветрейны</h3>
              <span class="badge badge-success">Пройден</span>
            </div>
            <div class="test-meta">
              <span>Вопросов: 15</span>
              <span>Время: 20 мин</span>
              <span>Попыток: 0/2</span>
            </div>
            <a href="#/tests/interface" class="btn btn-outline btn-full disabled">Результаты</a>
          </div>
          <div class="test-card">
            <div class="test-header">
              <h3 class="test-title">Манипуляторы и передачи</h3>
              <span class="badge badge-accent">Доступен</span>
            </div>
            <div class="test-meta">
              <span>Вопросов: 20</span>
              <span>Время: 30 мин</span>
              <span>Попыток: 2/2</span>
            </div>
            <a href="#/tests/interface" class="btn btn-primary btn-full">Начать тест</a>
          </div>
          <div class="test-card">
            <div class="test-header">
              <h3 class="test-title">Финальный тест: Инженерная часть</h3>
              <span class="badge badge-neutral">Скоро</span>
            </div>
            <div class="test-meta">
              <span>Вопросов: 35</span>
              <span>Время: 45 мин</span>
              <span>Попыток: 1/1</span>
            </div>
            <button class="btn btn-outline btn-full" disabled>Недоступен</button>
          </div>
          <div class="test-card">
            <div class="test-header">
              <h3 class="test-title">FTC SDK и Hardware Map</h3>
              <span class="badge badge-neutral">Скоро</span>
            </div>
            <div class="test-meta">
              <span>Вопросов: 20</span>
              <span>Время: 20 мин</span>
              <span>Попыток: 1/1</span>
            </div>
            <button class="btn btn-outline btn-full" disabled>Недоступен</button>
          </div>
          <div class="test-card">
            <div class="test-header">
              <h3 class="test-title">Engineering Portfolio</h3>
              <span class="badge badge-neutral">Скоро</span>
            </div>
            <div class="test-meta">
              <span>Вопросов: 20</span>
              <span>Время: 20 мин</span>
              <span>Попыток: 1/1</span>
            </div>
            <button class="btn btn-outline btn-full" disabled>Недоступен</button>
          </div>
        </div>
      </main>
    </div>
  `,

  renderTestInterface: () => `
    <div class="test-interface animate-item">
      <div class="test-topbar">
        <div class="test-progress">Вопрос 1 из 15</div>
        <div class="test-timer">24:59</div>
        <a href="#/tests" class="btn btn-outline">Выйти</a>
      </div>
      <div class="test-question-card">
        <h2 class="test-question">В чем основное преимущество Mecanum дриветрейна перед Tank?</h2>
        <div class="test-options">
          <div class="test-option">Способность двигаться в любом направлении (holonomic) без поворота корпуса</div>
          <div class="test-option">Более высокая скорость на прямых участках</div>
          <div class="test-option">Большая сила тяги (pushing power) при столкновениях</div>
          <div class="test-option">Требует только два мотора для управления</div>
        </div>
      </div>
      <div class="test-bottombar">
        <button class="btn btn-outline">Назад</button>
        <div class="test-dots">
          <span class="dot active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <button class="btn btn-primary">Вперед</button>
      </div>
    </div>
  `,

  renderLogin: () => `
    <div class="auth-wrapper animate-item">
      <div class="auth-card">
        <div class="auth-logo"><span class="logo-accent" style="color: #FF4D1C;">P</span>hoenix Forge</div>
        <h2 class="auth-heading">Вход в аккаунт</h2>
        <form class="auth-form" onsubmit="event.preventDefault(); window.location.hash='#/dashboard'">
          <div class="input-group">
            <label>Email</label>
            <input type="email" placeholder="student@example.com" required>
          </div>
          <div class="input-group">
            <label>Пароль</label>
            <input type="password" placeholder="••••••••" required>
          </div>
          <button type="submit" class="btn btn-primary btn-full">Войти</button>
        </form>
        <div class="auth-footer">Нет аккаунта? <a href="#/register">Зарегистрироваться</a></div>
      </div>
    </div>
  `,

  renderRegister: () => `
    <div class="auth-wrapper animate-item">
      <div class="auth-card">
        <div class="auth-logo"><span class="logo-accent" style="color: #FF4D1C;">P</span>hoenix Forge</div>
        <h2 class="auth-heading">Регистрация</h2>
        <form class="auth-form" onsubmit="event.preventDefault(); window.location.hash='#/dashboard'">
          <div class="input-group">
            <label>Имя</label>
            <input type="text" placeholder="Иван Иванов" required>
          </div>
          <div class="input-group">
            <label>Email</label>
            <input type="email" placeholder="student@example.com" required>
          </div>
          <div class="input-group">
            <label>Пароль</label>
            <input type="password" placeholder="••••••••" required>
          </div>
          <button type="submit" class="btn btn-primary btn-full">Создать аккаунт</button>
        </form>
        <div class="auth-footer">Уже есть аккаунт? <a href="#/login">Войти</a></div>
      </div>
    </div>
  `,

  renderDashboard: () => `
    <div class="page-layout dashboard-layout animate-item">
      <main class="main-content full-width">
        <h2 class="dashboard-greeting">Привет, Александр! 👋</h2>
        
        <div class="dashboard-stats">
          <div class="stat-card">
            <div class="stat-val">12</div>
            <div class="stat-label">Уроков пройдено</div>
          </div>
          <div class="stat-card">
            <div class="stat-val">3</div>
            <div class="stat-label">Тестов сдано</div>
          </div>
          <div class="stat-card">
            <div class="stat-val accent">5 🔥</div>
            <div class="stat-label">Дней в Phoenix Forge</div>
          </div>
        </div>

        <section class="dashboard-section">
          <h3 class="section-title">Продолжить обучение</h3>
          <div class="courses-grid" style="grid-template-columns: repeat(3, 1fr); gap: 24px;">
            <div class="catalog-card">
              <div class="catalog-info">
                <h3 class="catalog-title">Введение в FIRST</h3>
                <div class="progress-bar-container"><div class="progress-bar" style="width: 15%;"></div></div>
                <a href="#/courses/intro" class="btn btn-outline-accent btn-full">Продолжить</a>
              </div>
            </div>
            <div class="catalog-card">
              <div class="catalog-info">
                <h3 class="catalog-title">CAD</h3>
                <div class="progress-bar-container"><div class="progress-bar" style="width: 0%;"></div></div>
                <a href="#/courses/cad" class="btn btn-outline-accent btn-full">Продолжить</a>
              </div>
            </div>
            <div class="catalog-card">
              <div class="catalog-info">
                <h3 class="catalog-title">Билд</h3>
                <div class="progress-bar-container"><div class="progress-bar" style="width: 5%;"></div></div>
                <a href="#/courses/build" class="btn btn-outline-accent btn-full">Продолжить</a>
              </div>
            </div>
          </div>
        </section>

        <section class="dashboard-section">
          <h3 class="section-title">Мои сертификаты</h3>
          <div class="cert-grid">
            <div class="cert-card locked">
              <div class="cert-icon">🔒</div>
              <div class="cert-name">Сертификат: Введение в FTC</div>
            </div>
            <div class="cert-card locked">
              <div class="cert-icon">🔒</div>
              <div class="cert-name">Сертификат: CAD и Билд FTC</div>
            </div>
            <div class="cert-card locked">
              <div class="cert-icon">🔒</div>
              <div class="cert-name">Сертификат: Кодинг и Алгоритмы FTC</div>
            </div>
            <div class="cert-card locked">
              <div class="cert-icon">🏆</div>
              <div class="cert-name" style="color: var(--accent);">Phoenix Forge — Full FTC Certificate</div>
            </div>
          </div>
        </section>

        <section class="dashboard-section">
          <h3 class="section-title">История тестов</h3>
          <div class="table-container">
            <table class="history-table">
              <thead>
                <tr>
                  <th>Тест</th>
                  <th>Дата</th>
                  <th>Результат</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Дриветрейны</td>
                  <td>12.04.2026</td>
                  <td>95%</td>
                  <td><span class="badge badge-success">Сдан</span></td>
                </tr>
                <tr>
                  <td>Манипуляторы и передачи</td>
                  <td>10.04.2026</td>
                  <td>40%</td>
                  <td><span class="badge badge-error">Не сдан</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  `
};

// ==========================================
// Dynamic Courses Filtering System
// ==========================================
window.applyCoursesFilter = function() {
  const cards = document.querySelectorAll('.catalog-card');
  
  // Get checked values from DOM checkboxes
  const checkedCats = Array.from(document.querySelectorAll('.filter-checkbox[data-group="category"]:checked')).map(cb => cb.getAttribute('data-value'));
  const checkedDiffs = Array.from(document.querySelectorAll('.filter-checkbox[data-group="difficulty"]:checked')).map(cb => cb.getAttribute('data-value'));
  const checkedStats = Array.from(document.querySelectorAll('.filter-checkbox[data-group="status"]:checked')).map(cb => cb.getAttribute('data-value'));

  cards.forEach(card => {
    const cat = card.getAttribute('data-category');
    const diff = card.getAttribute('data-difficulty');
    const progress = parseInt(card.getAttribute('data-progress')) || 0;

    let showCat = checkedCats.length === 0 || checkedCats.includes(cat);
    let showDiff = checkedDiffs.length === 0 || checkedDiffs.includes(diff);
    
    let showStat = true;
    if (checkedStats.length > 0) {
      showStat = false;
      if (checkedStats.includes('inprogress') && progress < 100) {
        showStat = true;
      }
      if (checkedStats.includes('completed') && progress === 100) {
        showStat = true;
      }
    }

    // Toggle card visibility smoothly
    if (showCat && showDiff && showStat) {
      card.style.display = 'flex';
      card.style.opacity = '1';
    } else {
      card.style.display = 'none';
      card.style.opacity = '0';
    }
  });
};
