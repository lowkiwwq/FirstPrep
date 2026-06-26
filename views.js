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
      },
      {
        title: 'AI Проверка скетча',
        lessons: [
          { id: '5.1', title: 'Загрузить скетч на проверку', type: 'AI' }
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
    
    // Initialize AI Sketch Review if it's an AI lesson!
    if (lesson.type === 'AI' && window.initAISketchReview) {
      window.initAISketchReview();
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

  if (lesson.type === 'AI') {
    return window.renderAISketchReviewPanel(course, section, lesson);
  }

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

  // Trigger dynamic loading of lesson content from backend database
  setTimeout(() => {
    if (window.loadLessonContentData) {
      window.loadLessonContentData(courseSlug, secIdx, lesIdx);
    }
  }, 50);

  return `
    <div class="lesson-topbar">
      <div class="breadcrumb" style="font-family: var(--font-body); font-size: 13px; color: var(--txt2); margin-bottom: 12px;">${breadcrumb}</div>
      <h2 class="lesson-heading" style="font-family: var(--font-display); font-size: 28px; font-weight: 800; margin-bottom: 24px;">${lesson.id} ${lesson.title}</h2>
      <div class="progress-bar-container" style="height: 2px; background: #28282c; width: 100%; margin: 8px 0; border-radius: 2px;">
        <div class="progress-bar" style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #FF4D1C, #FF2D6B); border-radius: 2px;"></div>
      </div>
    </div>
    ${mediaCardHtml}
    <div id="lesson-dynamic-container" class="lesson-text" style="font-family: var(--font-body); font-size: 15px; color: var(--txt); line-height: 1.6; min-height: 150px;">
      <div style="text-align: center; padding: 48px; color: var(--txt2);">Загрузка материалов...</div>
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

      const courseImages = {
        'intro': 'assets/course_intro.jpg',
        'cad': 'assets/course_cad.jpg',
        'build': 'assets/course_build.jpg',
        'coding': 'assets/course_coding.png',
        'gamedrive': 'assets/course_gamedrive.png',
        'inspire': 'assets/course_inspire.png',
        'season': 'assets/course_season.jpg'
      };
      const imgUrl = courseImages[slug] || '';
      const bgStyle = imgUrl ? `background: #202022 url('${imgUrl}') no-repeat center/cover;` : 'background: #202022;';

      gridHtml += `
        <div class="catalog-card" data-category="${slug}" data-difficulty="${difficulty}" data-progress="${course.progress}">
          <div class="catalog-thumb" style="height: 140px; ${bgStyle} border-bottom: 1px solid var(--border); position: relative; padding: 16px;">
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
          } else if (lesson.type === 'AI') {
            icon = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#FF2D6B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>`;
          }

          sidebarHtml += `
            <div class="lesson-row ${isActive ? 'active' : ''}" onclick="window.selectLesson('${courseSlug}', ${secIdx}, ${lesIdx})">
              <span class="lesson-icon" style="display:flex;align-items:center;justify-content:center;width:16px;height:16px;flex-shrink:0;">${icon}</span>
              <span class="lesson-title" style="font-family: var(--font-body); font-size: 14px; display:flex; align-items:center; gap:6px; flex:1;">
                ${lesson.id} ${lesson.title}
                ${isLab ? `<span style="font-family: var(--font-mono); font-size: 9px; color: #FF2D6B; border: 1px solid rgba(255, 45, 107, 0.27); padding: 1px 4px; border-radius: 3px; font-weight: 500; letter-spacing:0.02em; flex-shrink: 0; background: rgba(255, 45, 107, 0.05);">LAB</span>` : ''}
                ${lesson.type === 'AI' ? `<span style="font-family: 'DM Mono', monospace; font-size: 9px; color: #FF2D6B; border: 1px solid #FF2D6B44; padding: 1px 4px; border-radius: 3px; font-weight: 500; letter-spacing:0.02em; flex-shrink: 0; background: rgba(255, 45, 107, 0.05);">AI</span>` : ''}
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

      // Initialize AI Sketch Review if it is rendered
      if (document.querySelector('.ai-sketch-review-container') && window.initAISketchReview) {
        window.initAISketchReview();
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
        <form class="auth-form" onsubmit="window.handleLoginSubmit(event)">
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
        <form class="auth-form" onsubmit="window.handleRegisterSubmit(event)">
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

  renderDashboard: () => {
    if (!window.Auth.isAuthenticated()) {
      setTimeout(() => { window.location.hash = '#/login'; }, 0);
      return '<div class="loading-container" style="text-align: center; padding: 100px 20px; color: var(--txt2); font-family: var(--font-body);">Перенаправление на страницу входа...</div>';
    }

    setTimeout(window.loadDashboardData, 50);

    return `
      <div class="page-layout dashboard-layout animate-item" id="dashboard-container">
        <main class="main-content full-width">
          <h2 class="dashboard-greeting" style="display: flex; justify-content: space-between; align-items: center; gap: 15px; flex-wrap: wrap;">
            <span>Привет! 👋</span>
            <button class="btn btn-outline-accent" onclick="window.Auth.logout()" style="font-size: 14px; padding: 6px 12px; cursor: pointer;">Выйти</button>
          </h2>
          
          <div class="dashboard-stats">
            <div class="stat-card">
              <div class="stat-val" id="stat-lessons-completed">...</div>
              <div class="stat-label">Уроков пройдено</div>
            </div>
            <div class="stat-card">
              <div class="stat-val" id="stat-tests-passed">...</div>
              <div class="stat-label">Тестов сдано</div>
            </div>
            <div class="stat-card">
              <div class="stat-val accent" id="stat-days-in-platform">...</div>
              <div class="stat-label">Дней в Phoenix Forge</div>
            </div>
          </div>

          <section class="dashboard-section">
            <h3 class="section-title">Продолжить обучение</h3>
            <div class="courses-grid" id="dashboard-courses-grid" style="grid-template-columns: repeat(3, 1fr); gap: 24px;">
              <div style="grid-column: 1/-1; text-align: center; color: var(--txt2); font-family: var(--font-body); padding: 20px;">Загрузка курсов...</div>
            </div>
          </section>

          <section class="dashboard-section">
            <h3 class="section-title">Мои сертификаты</h3>
            <div class="cert-grid" id="dashboard-certs-grid">
              <div style="grid-column: 1/-1; text-align: center; color: var(--txt2); font-family: var(--font-body); padding: 20px;">Загрузка сертификатов...</div>
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
                <tbody id="dashboard-tests-tbody">
                  <tr>
                    <td colspan="4" style="text-align: center; color: var(--txt2); font-family: var(--font-body); padding: 20px;">Загрузка истории...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    `;
  }
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

// ==========================================================================
// AI SKETCH REVIEW SECTION
// ==========================================================================

window.renderAISketchReviewPanel = function(course, section, lesson) {
  const breadcrumb = `Курсы / ${course.title} / ${section.title}`;
  const progressPercent = Math.max(5, course.progress);

  return `
    <div class="lesson-topbar">
      <div class="breadcrumb" style="font-family: var(--font-body); font-size: 13px; color: var(--txt2); margin-bottom: 12px;">${breadcrumb}</div>
      <h2 class="lesson-heading" style="font-family: var(--font-display); font-size: 28px; font-weight: 800; margin-bottom: 24px;">${lesson.id} ${lesson.title}</h2>
      <div class="progress-bar-container" style="height: 2px; background: #28282c; width: 100%; margin: 8px 0; border-radius: 2px;">
        <div class="progress-bar" style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, #FF4D1C, #FF2D6B); border-radius: 2px;"></div>
      </div>
    </div>
    
    <div class="ai-sketch-review-container">
      <!-- Left Panel: Upload & Settings -->
      <div class="ai-review-panel">
        <h3 class="ai-review-panel-header">Загрузить скетч</h3>
        
        <!-- Drag & Drop Zone -->
        <div id="sketch-drop-zone" class="sketch-upload-zone">
          <input type="file" id="sketch-file-input" accept="image/png, image/jpeg, image/svg+xml, application/pdf" style="display: none;" />
          <svg class="sketch-empty-icon" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
          </svg>
          <div class="upload-zone-text" style="font-family: var(--font-body);">Перетащи скетч сюда или нажми для выбора</div>
          <div class="upload-zone-formats" style="font-family: var(--font-mono);">Поддерживаются: PNG, JPG, PDF, SVG (Максимум 5MB)</div>
          
          <!-- Image/File Preview Container -->
          <div id="sketch-preview-container" class="sketch-preview-container" style="display: none;">
            <img id="sketch-preview-img" class="sketch-preview-image" src="" alt="Preview" />
            <button id="sketch-remove-btn" class="sketch-preview-remove-btn" title="Удалить">×</button>
          </div>
        </div>
        <div id="sketch-file-info" class="sketch-file-info" style="display: none; font-family: var(--font-mono);"></div>
        
        <!-- Context Selector -->
        <div class="sketch-label" style="font-family: var(--font-mono);">Что проверяем?</div>
        <div id="sketch-context-chips" class="sketch-chips-row">
          <div class="sketch-chip selected" data-value="Дриветрейн">Дриветрейн</div>
          <div class="sketch-chip" data-value="Манипулятор">Манипулятор</div>
          <div class="sketch-chip" data-value="Линейные слайды">Линейные слайды</div>
          <div class="sketch-chip" data-value="Полная сборка">Полная сборка</div>
        </div>
        
        <!-- Detail Level Selector -->
        <div class="sketch-label" style="font-family: var(--font-mono);">Уровень детализации</div>
        <div id="sketch-level-chips" class="sketch-chips-row">
          <div class="sketch-chip" data-value="Новичок">Новичок</div>
          <div class="sketch-chip selected" data-value="Средний">Средний</div>
          <div class="sketch-chip" data-value="Эксперт">Эксперт</div>
        </div>
        
        <!-- Optional Note -->
        <div class="sketch-textarea-wrapper">
          <textarea id="sketch-user-note" class="sketch-textarea" placeholder="Опиши что хочешь проверить (необязательно)" maxlength="300" style="font-family: var(--font-body);"></textarea>
          <div id="sketch-char-counter" class="sketch-textarea-counter" style="font-family: var(--font-mono);">0 / 300</div>
        </div>
        
        <!-- Submit Button -->
        <button id="sketch-submit-btn" class="sketch-submit-btn" disabled>
          <span>🔍 Проверить скетч</span>
        </button>
        
        <!-- History Section -->
        <div id="sketch-history-section" class="sketch-history-section" style="display: none;">
          <div class="sketch-label" style="font-family: var(--font-mono);">Последние проверки</div>
          <div id="sketch-history-list" class="sketch-history-list"></div>
        </div>
      </div>
      
      <!-- Right Panel: AI Feedback -->
      <div class="ai-review-panel" id="ai-feedback-panel">
        <h3 class="ai-review-panel-header">Анализ AI</h3>
        <div class="ai-review-panel-subtext" style="font-family: var(--font-body);">Phoenix AI проверит твой скетч по критериям FTC</div>
        
        <!-- Default State -->
        <div id="feedback-empty-state" class="sketch-empty-state">
          <svg class="sketch-empty-icon" viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
          <div class="sketch-empty-text" style="font-family: var(--font-body);">Загрузи скетч слева чтобы получить анализ</div>
        </div>
        
        <!-- Loading State -->
        <div id="feedback-loading-state" class="sketch-loading-state" style="display: none;">
          <div class="sketch-skeleton-block"></div>
          <div class="sketch-skeleton-block"></div>
          <div class="sketch-skeleton-block"></div>
          <div class="sketch-loading-text" style="font-family: var(--font-mono);">Phoenix AI анализирует твой скетч...</div>
          <div class="sketch-loading-est" style="font-family: var(--font-mono);">~10 секунд</div>
        </div>
        
        <!-- Error State -->
        <div id="feedback-error-state" class="ai-review-error-panel" style="display: none;">
          <svg class="ai-review-error-icon" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/>
          </svg>
          <h4 id="error-title" class="ai-review-error-title">Не удалось подключиться к Phoenix AI</h4>
          <p id="error-desc" class="ai-review-error-desc">Попробуйте загрузить файл снова.</p>
          <button id="error-retry-btn" class="sketch-retry-btn">Повторить попытку</button>
        </div>
        
        <!-- Results Container -->
        <div id="feedback-results-container" class="sketch-results-container" style="display: none;">
          <!-- Banner -->
          <div id="demo-banner" class="demo-mode-banner" style="font-family: var(--font-mono);">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>
            <span>Демо-режим — AI анализ подключается</span>
          </div>
          
          <div class="sketch-results-header">
            <div class="score-circle-container">
              <div id="result-score-badge" class="score-circle-badge">7</div>
              <div class="score-circle-label" style="font-family: var(--font-mono);">/ 10</div>
            </div>
            
            <div class="compliance-badge-container">
              <div id="result-compliance-badge" class="sketch-compliance-badge">Соответствует правилам FTC ✓</div>
              <div id="result-compliance-note" class="sketch-compliance-note">Размеры соответствуют Robot Rules FTC</div>
            </div>
          </div>
          
          <div class="sketch-cards-list">
            <!-- Card 1: Good points -->
            <div class="feedback-card" style="border-left-color: #FF8C42;" id="card-good">
              <div class="feedback-card-header" onclick="window.toggleFeedbackCard(this)">
                <span>✓ Что сделано хорошо</span>
                <span class="feedback-card-arrow">▼</span>
              </div>
              <div class="feedback-card-content">
                <ul class="feedback-bullets-list" id="feedback-good-list"></ul>
              </div>
            </div>
            
            <!-- Card 2: Improvements -->
            <div class="feedback-card" style="border-left-color: #FF4D1C;" id="card-improve">
              <div class="feedback-card-header" onclick="window.toggleFeedbackCard(this)">
                <span>⚠ Что улучшить</span>
                <span class="feedback-card-arrow">▼</span>
              </div>
              <div class="feedback-card-content">
                <ul class="feedback-bullets-list" id="feedback-improve-list"></ul>
              </div>
            </div>
            
            <!-- Card 3: Critical Errors -->
            <div class="feedback-card" style="border-left-color: #FF2D6B;" id="card-critical">
              <div class="feedback-card-header" onclick="window.toggleFeedbackCard(this)">
                <span>✗ Критические ошибки</span>
                <span class="feedback-card-arrow">▼</span>
              </div>
              <div class="feedback-card-content">
                <ul class="feedback-bullets-list" id="feedback-critical-list"></ul>
              </div>
            </div>
            
            <!-- Card 4: Recommendations -->
            <div class="feedback-card" style="border-left-color: #FF8C42;" id="card-rec">
              <div class="feedback-card-header" onclick="window.toggleFeedbackCard(this)">
                <span>💡 Рекомендации</span>
                <span class="feedback-card-arrow">▼</span>
              </div>
              <div class="feedback-card-content">
                <ul class="feedback-bullets-list" id="feedback-rec-list"></ul>
              </div>
            </div>
          </div>
          
          <button id="sketch-retry-btn" class="sketch-retry-btn">Загрузить другой скетч</button>
        </div>
      </div>
    </div>
  `;
};

window.toggleFeedbackCard = function(header) {
  const card = header.parentElement;
  if (card) {
    card.classList.toggle('collapsed');
  }
};

window.initAISketchReview = function() {
  const fileInput = document.getElementById('sketch-file-input');
  const dropZone = document.getElementById('sketch-drop-zone');
  const previewContainer = document.getElementById('sketch-preview-container');
  const previewImg = document.getElementById('sketch-preview-img');
  const removeBtn = document.getElementById('sketch-remove-btn');
  const fileInfo = document.getElementById('sketch-file-info');
  const charCounter = document.getElementById('sketch-char-counter');
  const userNote = document.getElementById('sketch-user-note');
  const submitBtn = document.getElementById('sketch-submit-btn');
  
  const emptyState = document.getElementById('feedback-empty-state');
  const loadingState = document.getElementById('feedback-loading-state');
  const errorState = document.getElementById('feedback-error-state');
  const resultsContainer = document.getElementById('feedback-results-container');
  const errorRetryBtn = document.getElementById('error-retry-btn');

  let selectedFile = null;

  // File size formatter helper
  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Helper to resize image to compact thumb for localStorage
  function resizeImageToThumb(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxDim = 80;
          let w = img.width;
          let h = img.height;
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
          canvas.width = w;
          canvas.height = h;
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // Setup upload UI with a file
  function handleFile(file) {
    if (!file) return;

    // Check size limit: 5MB
    const limitBytes = 5 * 1024 * 1024;
    if (file.size > limitBytes) {
      dropZone.classList.add('error');
      alert('Файл слишком большой. Максимум 5MB');
      resetUpload();
      return;
    }

    // Check formats
    const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      dropZone.classList.add('error');
      alert('Поддерживаются: PNG, JPG, PDF, SVG');
      resetUpload();
      return;
    }

    dropZone.classList.remove('error');
    selectedFile = file;

    // File Preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImg.src = e.target.result;
        previewContainer.style.display = 'flex';
      };
      reader.readAsDataURL(file);
    } else {
      // PDF or non-previewable file representation
      previewImg.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/images/texture-pdf.png';
      previewContainer.style.display = 'flex';
    }

    fileInfo.textContent = `${file.name} (${formatBytes(file.size)})`;
    fileInfo.style.display = 'block';

    // Enable submit
    submitBtn.disabled = false;
  }

  function resetUpload() {
    selectedFile = null;
    fileInput.value = '';
    previewImg.src = '';
    previewContainer.style.display = 'none';
    fileInfo.textContent = '';
    fileInfo.style.display = 'none';
    submitBtn.disabled = true;
  }

  // Drag & drop listeners
  dropZone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  removeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    resetUpload();
  });

  // Option Chips: Single Select
  function wireChips(containerId) {
    const chips = document.querySelectorAll(`#${containerId} .sketch-chip`);
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll(`#${containerId} .sketch-chip`).forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
      });
    });
  }

  wireChips('sketch-context-chips');
  wireChips('sketch-level-chips');

  // Textarea counter
  userNote.addEventListener('input', () => {
    const count = userNote.value.length;
    charCounter.textContent = `${count} / 300`;
  });

  // Reset panels to defaults
  function resetAll() {
    resetUpload();
    userNote.value = '';
    charCounter.textContent = '0 / 300';
    
    emptyState.style.display = 'flex';
    loadingState.style.display = 'none';
    errorState.style.display = 'none';
    resultsContainer.style.display = 'none';
  }

  // Setup click listeners for retry buttons (could be multiple in DOM)
  document.querySelectorAll('.sketch-retry-btn').forEach(btn => {
    btn.addEventListener('click', resetAll);
  });
  errorRetryBtn.addEventListener('click', resetAll);

  // Submit Handler
  submitBtn.addEventListener('click', async () => {
    if (!selectedFile) return;

    // UI state change to loading
    submitBtn.disabled = true;
    const oldText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="sketch-submit-spinner"></span><span>Анализируем...</span>';
    
    emptyState.style.display = 'none';
    errorState.style.display = 'none';
    resultsContainer.style.display = 'none';
    loadingState.style.display = 'flex';

    // Get chip selections
    const selectedContext = document.querySelector('#sketch-context-chips .sketch-chip.selected').getAttribute('data-value');
    const selectedLevel = document.querySelector('#sketch-level-chips .sketch-chip.selected').getAttribute('data-value');
    const noteText = userNote.value.trim();

    try {
      // Convert to base64
      const base64 = await new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result.split(',')[1]);
        reader.onerror = rej;
        reader.readAsDataURL(selectedFile);
      });

      // API call
      let result;
      let demoMode = false;
      try {
        const response = await fetch((window.API_BASE || '') + '/api/ai/sketch-review', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image_base64: base64,
            media_type: selectedFile.type,
            context: selectedContext,
            level: selectedLevel,
            note: noteText
          })
        });

        if (!response.ok) {
          throw new Error('API server returned error');
        }
        result = await response.json();
      } catch (err) {
        console.warn("Backend API not reachable. Using fallback mock database.", err);
        // Fallback to rich mock database
        await new Promise(r => setTimeout(r, 1200)); // Simulate AI delay
        result = getMockReview(selectedContext, selectedLevel, noteText);
        demoMode = true;
      }

      // Handle custom sketch error
      if (result.error) {
        showErrorState("Загрузи CAD скетч или чертёж робота", result.error);
        return;
      }

      // Display results
      renderResults(result, demoMode, selectedContext, selectedFile);

    } catch (e) {
      console.error(e);
      showErrorState("Не удалось подключиться к Phoenix AI", "Произошла непредвиденная ошибка при обработке запроса. Пожалуйста, попробуйте снова.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = oldText;
      loadingState.style.display = 'none';
    }
  });

  function showErrorState(title, desc) {
    loadingState.style.display = 'none';
    resultsContainer.style.display = 'none';
    emptyState.style.display = 'none';
    
    document.getElementById('error-title').textContent = title;
    document.getElementById('error-desc').textContent = desc;
    errorState.style.display = 'flex';
  }

  function renderResults(result, isDemo, context, file) {
    loadingState.style.display = 'none';
    errorState.style.display = 'none';
    emptyState.style.display = 'none';
    
    // Demo mode banner toggle
    const banner = document.getElementById('demo-banner');
    banner.style.display = isDemo ? 'flex' : 'none';

    // Score Circle Badge styling
    const scoreBadge = document.getElementById('result-score-badge');
    scoreBadge.textContent = result.score;
    
    // Color circle by score
    let scoreColor = '#FF2D6B'; // Default 1-4
    if (result.score >= 8) {
      scoreColor = '#FF8C42';
    } else if (result.score >= 5) {
      scoreColor = '#FF4D1C';
    }
    scoreBadge.style.borderColor = scoreColor;
    scoreBadge.style.color = scoreColor;

    // Compliance Badge styling
    const compBadge = document.getElementById('result-compliance-badge');
    const compNote = document.getElementById('result-compliance-note');
    if (result.ftc_compliant) {
      compBadge.textContent = "Соответствует правилам FTC ✓";
      compBadge.style.color = '#FF8C42';
      compBadge.style.borderColor = '#FF8C42';
    } else {
      compBadge.textContent = "Нарушает правила FTC ✗";
      compBadge.style.color = '#FF2D6B';
      compBadge.style.borderColor = '#FF2D6B';
    }
    compNote.textContent = result.ftc_note || '';

    // Card bullet render helper
    function renderBullets(listElId, cardId, bulletColor, bullets) {
      const listEl = document.getElementById(listElId);
      const card = document.getElementById(cardId);
      
      listEl.innerHTML = '';
      if (!bullets || bullets.length === 0) {
        card.style.display = 'none';
        return;
      }

      card.style.display = 'block';
      bullets.forEach(bullet => {
        const li = document.createElement('li');
        li.className = 'feedback-bullet-item';
        li.innerHTML = `
          <span class="feedback-bullet-dot" style="color: ${bulletColor};">■</span>
          <span>${escHtml(bullet)}</span>
        `;
        listEl.appendChild(li);
      });
    }

    renderBullets('feedback-good-list', 'card-good', '#FF8C42', result.positive);
    renderBullets('feedback-improve-list', 'card-improve', '#FF4D1C', result.improve);
    renderBullets('feedback-critical-list', 'card-critical', '#FF2D6B', result.critical);
    renderBullets('feedback-rec-list', 'card-rec', '#FF8C42', result.recommendations);

    resultsContainer.style.display = 'flex';

    // Store review history
    if (file) {
      saveReviewToHistory(context, result, file);
    }
  }

  async function saveReviewToHistory(context, result, file) {
    try {
      const history = JSON.parse(localStorage.getItem('cad_reviews') || '[]');
      
      // Generate thumbnail
      let thumb = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/images/texture-pdf.png';
      if (file && file.type.startsWith('image/')) {
        thumb = await resizeImageToThumb(file);
      }

      const reviewItem = {
        timestamp: Date.now(),
        score: result.score,
        context: context,
        thumb: thumb,
        data: result
      };

      // Add to beginning and limit to 3 items
      history.unshift(reviewItem);
      const trimmedHistory = history.slice(0, 3);
      localStorage.setItem('cad_reviews', JSON.stringify(trimmedHistory));

      // Re-render history list
      loadHistoryList();
    } catch (e) {
      console.warn("History storage failed:", e);
    }
  }

  function loadHistoryList() {
    const historySection = document.getElementById('sketch-history-section');
    const historyList = document.getElementById('sketch-history-list');
    const history = JSON.parse(localStorage.getItem('cad_reviews') || '[]');

    if (history.length === 0) {
      historySection.style.display = 'none';
      return;
    }

    historyList.innerHTML = '';
    history.forEach((item, index) => {
      // Color badge by score
      let badgeBg = '#FF2D6B';
      if (item.score >= 8) {
        badgeBg = '#FF8C42';
      } else if (item.score >= 5) {
        badgeBg = '#FF4D1C';
      }

      const card = document.createElement('div');
      card.className = 'sketch-history-card';
      card.innerHTML = `
        <div class="sketch-history-left">
          <img class="sketch-history-thumb" src="${item.thumb}" alt="Thumb" />
          <div class="sketch-history-info">
            <div class="sketch-history-context">${escHtml(item.context)}</div>
            <div class="sketch-history-date">${new Date(item.timestamp).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' })}</div>
          </div>
        </div>
        <div class="sketch-history-score" style="background: ${badgeBg}33; color: ${badgeBg}; border: 1px solid ${badgeBg}44; font-family: var(--font-mono);">
          ${item.score}
        </div>
      `;
      
      card.addEventListener('click', () => {
        // Reload that review directly
        renderResults(item.data, false, item.context, null);
        
        // Populate preview with history thumb for mock visibility
        previewImg.src = item.thumb;
        previewContainer.style.display = 'flex';
        fileInfo.textContent = `Архивный скетч: ${item.context}`;
        fileInfo.style.display = 'block';
        submitBtn.disabled = false;
      });

      historyList.appendChild(card);
    });

    historySection.style.display = 'block';
  }

  // Load history list initially
  loadHistoryList();
};

function getMockReview(context, level, note) {
  const mockDb = {
    "Дриветрейн": {
      "score": 7,
      "positive": [
        "Правильное расположение моторов с легким доступом для обслуживания",
        "Использование стандартных 90мм колес Mecanum повышает маневренность",
        "Предусмотрены ребра жесткости для защиты от боковых ударов рамы"
      ],
      "improve": [
        "Передаточное число моторов 19.2:1 может быть слишком быстрым для точного автонома, рассмотрите 22.3:1",
        "Осевые подшипники установлены только с одной стороны пластины крепления колес"
      ],
      "critical": [],
      "recommendations": [
        "Добавьте энкодеры или датчики одометрии для автономного периода",
        "Убедитесь, что зазор между колесом и рамой составляет не менее 5 мм"
      ],
      "ftc_compliant": true,
      "ftc_note": "Размеры 445x445мм соответствуют правилу старта (не более 18x18x18 дюймов)"
    },
    "Манипулятор": {
      "score": 6,
      "positive": [
        "Компактный дизайн захвата с шестеренчатым зацеплением лапок",
        "Использование силиконовых накладок на захвате для надежной фиксации игровых элементов"
      ],
      "improve": [
        "Длина плеча манипулятора слишком велика для одного серводвигателя, возможен перегрев",
        "Центр тяжести всей конструкции сильно смещен вперед при максимальном вылете"
      ],
      "critical": [
        "Указанный сервопривод превышает допустимый лимит мощности по регламенту (нарушение правила RE04)"
      ],
      "ftc_compliant": false,
      "ftc_note": "Нарушение правила RE04 (спецификации допустимых двигателей)"
    },
    "Линейные слайды": {
      "score": 8,
      "positive": [
        "Многосекционная телескопическая система с использованием износостойких направляющих",
        "Тросовая система намотки аккуратно разведена и имеет натяжитель"
      ],
      "improve": [
        "Возвратная пружина имеет недостаточное натяжение на верхней секции",
        "Диаметр приводного троса (0.8мм) может привести к обрыву при резких стартах"
      ],
      "critical": [],
      "recommendations": [
        "Замените стальной трос на кевларовую нить для облегчения веса конструкции",
        "Установите механические концевики (Limit switches) для авто-стопа в крайних точках"
      ],
      "ftc_compliant": true,
      "ftc_note": "Прочность конструкции соответствует требованиям жестких столкновений на поле"
    },
    "Полная сборка": {
      "score": 4,
      "positive": [
        "Компоновка управляющей электроники аккуратна и защищена верхним кожухом",
        "Центр тяжести сбалансирован посередине шасси робота"
      ],
      "improve": [
        "Кабель-менеджмент: силовые провода проходят слишком близко к шестерням цепной передачи",
        "Общая масса робота близка к лимиту 19.05 кг, рекомендуется облегчить раму вырезами"
      ],
      "critical": [
        "Габаритные размеры робота в стартовом положении превышают 18x18 дюймов (465мм вместо разрешенных 457.2мм)"
      ],
      "ftc_compliant": false,
      "ftc_note": "Превышение максимальных стартовых размеров (Game Manual Part 1)"
    }
  };

  const data = mockDb[context] || mockDb["Дриветрейн"];
  let adjustedScore = data.score;
  
  if (level === "Новичок") adjustedScore = Math.min(10, adjustedScore + 1);
  if (level === "Эксперт") adjustedScore = Math.max(1, adjustedScore - 1);
  
  return {
    ...data,
    score: adjustedScore
  };
}

window.loadDashboardData = async function loadDashboardData() {
  const container = document.getElementById('dashboard-container');
  if (!container) return; // Not on dashboard page anymore

  try {
    const data = await window.apiFetch('/dashboard');
    
    // 1. Update Greeting
    const greetingSpan = container.querySelector('.dashboard-greeting span');
    if (greetingSpan) {
      greetingSpan.textContent = `Привет, ${data.display_name || 'Студент'}! 👋`;
    }

    // 2. Update Stats
    const lessonsCompletedEl = document.getElementById('stat-lessons-completed');
    if (lessonsCompletedEl) lessonsCompletedEl.textContent = data.lessons_completed;
    
    const testsPassedEl = document.getElementById('stat-tests-passed');
    if (testsPassedEl) testsPassedEl.textContent = data.tests_passed;
    
    const daysInPlatformEl = document.getElementById('stat-days-in-platform');
    if (daysInPlatformEl) daysInPlatformEl.textContent = data.days_in_platform + ' 🔥';

    // 3. Update Courses
    const coursesGrid = document.getElementById('dashboard-courses-grid');
    if (coursesGrid) {
      if (data.course_progress && data.course_progress.length > 0) {
        coursesGrid.innerHTML = data.course_progress.map(c => {
          let courseUrl = '#/courses';
          const titleLower = c.title.toLowerCase();
          if (titleLower.includes('введение') || titleLower.includes('intro')) courseUrl = '#/courses/intro';
          else if (titleLower.includes('cad')) courseUrl = '#/courses/cad';
          else if (titleLower.includes('билд') || titleLower.includes('build')) courseUrl = '#/courses/build';
          else if (titleLower.includes('код') || titleLower.includes('sdk')) courseUrl = '#/courses/coding';
          else if (titleLower.includes('inspire')) courseUrl = '#/courses/inspire';

          return `
            <div class="catalog-card">
              <div class="catalog-info">
                <h3 class="catalog-title">${window.escHtml(c.title)}</h3>
                <div class="progress-bar-container">
                  <div class="progress-bar" style="width: ${c.progress_pct}%;"></div>
                </div>
                <div style="font-size: 12px; color: var(--txt2); margin-top: 4px; margin-bottom: 12px;">Пройдено: ${c.progress_pct}%</div>
                <a href="${courseUrl}" class="btn btn-outline-accent btn-full">Продолжить</a>
              </div>
            </div>
          `;
        }).join('');
      } else {
        coursesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--txt2); font-family: var(--font-body);">Нет доступных курсов.</div>';
      }
    }

    // 4. Update Certificates
    const certsGrid = document.getElementById('dashboard-certs-grid');
    if (certsGrid) {
      if (data.certificates && data.certificates.length > 0) {
        certsGrid.innerHTML = data.certificates.map(cert => {
          const earnedClass = cert.earned ? '' : 'locked';
          const icon = cert.earned ? '🏆' : '🔒';
          return `
            <div class="cert-card ${earnedClass}">
              <div class="cert-icon">${icon}</div>
              <div class="cert-name" style="${cert.earned ? 'color: var(--accent);' : ''}">${window.escHtml(cert.name)}</div>
            </div>
          `;
        }).join('');
      } else {
        certsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--txt2); font-family: var(--font-body);">Сертификаты не найдены.</div>';
      }
    }

    // 5. Update Tests History
    const testsTbody = document.getElementById('dashboard-tests-tbody');
    if (testsTbody) {
      if (data.recent_attempts && data.recent_attempts.length > 0) {
        testsTbody.innerHTML = data.recent_attempts.map(attempt => {
          const statusText = attempt.passed ? 'Сдан' : 'Не сдан';
          const statusClass = attempt.passed ? 'badge-success' : 'badge-error';
          const dateStr = window.fmtDate(attempt.completed_at);
          const scoreText = attempt.score_pct != null ? `${Math.round(attempt.score_pct)}%` : '—';
          return `
            <tr>
              <td>${window.escHtml(attempt.test_title)}</td>
              <td>${dateStr}</td>
              <td>${scoreText}</td>
              <td><span class="badge ${statusClass}">${statusText}</span></td>
            </tr>
          `;
        }).join('');
      } else {
        testsTbody.innerHTML = `
          <tr>
            <td colspan="4" style="text-align: center; color: var(--txt2); font-family: var(--font-body); padding: 20px;">Вы еще не проходили тесты.</td>
          </tr>
        `;
      }
    }

  } catch (err) {
    console.error("Failed to load dashboard data", err);
    if (err.status === 401) {
      window.Auth.clearSession();
      if (window.updateNavbarAuth) window.updateNavbarAuth();
      window.location.hash = '#/login';
      return;
    }
    if (container) {
      container.innerHTML = `
        <div class="error-container" style="text-align: center; padding: 100px 20px; color: var(--accent); font-family: var(--font-body);">
          <h3>Не удалось загрузить данные личного кабинета</h3>
          <p>${window.escHtml(err.detail || 'Проверьте соединение с сервером.')}</p>
          <button class="btn btn-primary" onclick="window.loadDashboardData()" style="margin-top: 15px; cursor: pointer;">Повторить</button>
        </div>
      `;
    }
  }
};

// ==========================================================================
// DYNAMIC LESSON BLOCKS & CMS EDITOR ENGINE
// ==========================================================================

// 1. Dynamic student lesson content loader
window.loadLessonContentData = async function(courseSlug, secIdx, lesIdx) {
  const course = window.CoursesData[courseSlug];
  const section = course.sections[secIdx];
  const lesson = section.lessons[lesIdx];
  const lessonId = `${courseSlug}_${lesson.id}`;
  
  const container = document.getElementById('lesson-dynamic-container');
  if (!container) return;
  
  try {
    const data = await window.apiFetch(`/lessons/${lessonId}/content`);
    const blocks = data.blocks || [];
    
    if (blocks.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="text-align: center; padding: 48px 24px; color: var(--txt2); font-family: var(--font-body);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin: 0 auto 16px auto; opacity: 0.5; display: block; color: var(--txt2);">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="9" y1="15" x2="15" y2="15"></line>
            <line x1="9" y1="11" x2="15" y2="11"></line>
          </svg>
          <div style="font-size: 15px; font-weight: 500; margin-bottom: 6px; color: #fff;">Контент ещё не загружен</div>
          <div style="font-size: 13px; opacity: 0.6;">Этот урок пока не содержит учебных материалов.</div>
        </div>
      `;
      return;
    }
    
    container.innerHTML = window.renderLessonBlocks(blocks);
    window.initLessonBlocksInteractions(container);
  } catch (err) {
    console.error("Failed to load lesson content", err);
    container.innerHTML = `
      <div style="text-align: center; padding: 32px; color: var(--accent); font-family: var(--font-body); font-size: 14px;">
        Не удалось загрузить содержимое урока. Пожалуйста, обновите страницу.
      </div>
    `;
  }
};

// 2. Render blocks list for student and editor preview
window.renderLessonBlocks = function(blocks) {
  return blocks.map(block => {
    const val = block.value || '';
    const cap = block.caption || '';
    switch (block.type) {
      case 'title':
        return `<h3 class="block-title" style="margin-top: 24px; margin-bottom: 12px; font-family: var(--font-display); color: #fff; font-size: 22px; font-weight: 700;">${window.escHtml(val)}</h3>`;
      case 'text':
        return `<p class="block-text" style="line-height: 1.6; margin-bottom: 16px; color: var(--txt);">${window.escHtml(val).replace(/\n/g, '<br>')}</p>`;
      case 'quote':
        return `<blockquote class="block-quote" style="border-left: 3px solid var(--accent); padding-left: 16px; margin: 16px 0; color: var(--txt2); font-style: italic;">${window.escHtml(val)}</blockquote>`;
      case 'image':
        return `<div class="block-image-wrapper" style="margin: 20px 0; text-align: center;">
          <img src="${val || 'https://via.placeholder.com/600x350'}" alt="${window.escHtml(cap)}" style="max-width: 100%; border-radius: 8px; border: 1px solid var(--border);" />
          ${cap ? `<div style="font-size: 13px; color: var(--txt2); margin-top: 8px; font-style: italic;">${window.escHtml(cap)}</div>` : ''}
        </div>`;
      case 'video':
        if (val && (val.includes('youtube.com') || val.includes('youtu.be'))) {
          let ytId = '';
          const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
          const match = val.match(regExp);
          if (match && match[2].length === 11) ytId = match[2];
          if (ytId) {
            return `<div class="block-video-wrapper" style="margin: 20px 0; position: relative; padding-bottom: 56.25%; height: 0;">
              <iframe src="https://www.youtube.com/embed/${ytId}" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px;"></iframe>
            </div>`;
          }
        }
        return `<div class="block-video-wrapper" style="margin: 20px 0;">
          <video controls src="${val}" style="width: 100%; border-radius: 8px; border: 1px solid var(--border);"></video>
          ${cap ? `<div style="font-size: 13px; color: var(--txt2); margin-top: 8px; font-style: italic;">${window.escHtml(cap)}</div>` : ''}
        </div>`;
      case 'pdf':
        return `<div class="block-pdf-wrapper" style="margin: 16px 0; display: flex; align-items: center; justify-content: space-between; padding: 12px; background: var(--bg2); border: 1px solid var(--border); border-radius: 6px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF2D6B" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            <div>
              <div style="font-weight: 500; font-size: 14px; color: #fff;">${window.escHtml(cap || 'Документ PDF')}</div>
              <div style="font-size: 12px; color: var(--txt2);">Нажмите, чтобы изучить файл</div>
            </div>
          </div>
          <a href="${val}" target="_blank" class="btn btn-outline" style="padding: 6px 12px; font-size: 12px;">Открыть</a>
        </div>`;
      case 'table':
        return `<div class="block-table-wrapper" style="margin: 20px 0; overflow-x: auto;">
          ${window.renderBlockTableHtml(val)}
        </div>`;
      case 'chart':
        return `<div class="block-chart-wrapper" style="margin: 20px 0; padding: 16px; background: var(--bg2); border: 1px solid var(--border); border-radius: 8px;">
          ${window.renderCSSChart(val)}
        </div>`;
      case 'list':
        const items = Array.isArray(val) ? val : (val || '').split('\n').filter(Boolean);
        return `<ul class="block-list" style="margin-left: 20px; margin-bottom: 16px; color: var(--txt);">
          ${items.map(item => `<li style="margin-bottom: 6px; list-style-type: disc;">${window.escHtml(item)}</li>`).join('')}
        </ul>`;
      case 'divider':
        return `<hr class="block-divider" style="border: 0; border-top: 1px solid var(--border); margin: 24px 0;" />`;
      case 'card':
        return `<div class="block-card" style="padding: 20px; background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; margin: 16px 0;">
          <h4 style="margin-bottom: 8px; color: #fff; font-family: var(--font-display); font-size: 16px; font-weight: bold;">${window.escHtml(cap)}</h4>
          <p style="color: var(--txt2); font-size: 14px; margin-bottom: 0; line-height: 1.5;">${window.escHtml(val)}</p>
        </div>`;
      case 'code':
        return `<div class="block-code-wrapper" style="margin: 16px 0; border: 1px solid var(--border); border-radius: 6px; overflow: hidden; background: #1e1e1e;">
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #2d2d2d; border-bottom: 1px solid var(--border);">
            <span style="font-family: var(--font-mono); font-size: 11px; color: var(--txt2); text-transform: uppercase;">${window.escHtml(block.language || 'python')}</span>
            <button class="btn-run-code" style="background: none; border: 1px solid var(--accent); color: var(--accent); font-family: var(--font-mono); font-size: 11px; padding: 2px 8px; border-radius: 4px; cursor: pointer;">▶ Запустить</button>
          </div>
          <pre style="margin: 0; padding: 12px; overflow-x: auto;"><code class="language-${block.language || 'python'}" style="font-family: var(--font-mono); font-size: 13px; color: #d4d4d4;">${window.escHtml(val)}</code></pre>
          <div class="code-output-container" style="display: none; padding: 10px 12px; background: #151515; border-top: 1px solid var(--border); font-family: var(--font-mono); font-size: 12px; color: #a6e22e; white-space: pre-wrap;"></div>
        </div>`;
      case 'important':
        return `<div class="block-important" style="display: flex; gap: 12px; padding: 16px; background: rgba(255, 45, 107, 0.05); border: 1px solid rgba(255, 45, 107, 0.2); border-left: 4px solid #FF2D6B; border-radius: 6px; margin: 16px 0;">
          <span style="font-size: 20px; line-height: 1;">⚠️</span>
          <div style="font-size: 14px; line-height: 1.5; color: var(--txt);"><strong style="color: #FF2D6B;">ВАЖНО:</strong> ${window.escHtml(val)}</div>
        </div>`;
      case 'tip':
        return `<div class="block-tip" style="display: flex; gap: 12px; padding: 16px; background: rgba(255, 140, 66, 0.05); border: 1px solid rgba(255, 140, 66, 0.2); border-left: 4px solid #FF8C42; border-radius: 6px; margin: 16px 0;">
          <span style="font-size: 20px; line-height: 1;">💡</span>
          <div style="font-size: 14px; line-height: 1.5; color: var(--txt);"><strong style="color: #FF8C42;">СОВЕТ:</strong> ${window.escHtml(val)}</div>
        </div>`;
      case 'assignment':
        return `<div class="block-assignment-box" style="padding: 20px; border: 1px dashed var(--accent); background: rgba(255, 77, 28, 0.03); border-radius: 8px; margin: 20px 0;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="font-family: var(--font-mono); font-size: 10px; background: var(--accent); color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;">ЗАДАНИЕ</span>
            <strong style="color: #fff; font-size: 15px;">${window.escHtml(cap || 'Практическая задача')}</strong>
          </div>
          <div style="font-size: 14px; color: var(--txt); line-height: 1.6;">${window.escHtml(val)}</div>
        </div>`;
      case 'experiment':
        return `<div class="block-experiment-box" style="padding: 20px; border: 1px dashed #FF2D6B; background: rgba(255, 45, 107, 0.03); border-radius: 8px; margin: 20px 0;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="font-family: var(--font-mono); font-size: 10px; background: #FF2D6B; color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: bold;">ЭКСПЕРИМЕНТ</span>
            <strong style="color: #fff; font-size: 15px;">${window.escHtml(cap || 'Лабораторный эксперимент')}</strong>
          </div>
          <div style="font-size: 14px; color: var(--txt); line-height: 1.6;">${window.escHtml(val)}</div>
        </div>`;
      case 'goal':
        return `<div class="block-goal-box" style="padding: 16px; background: rgba(76, 175, 80, 0.05); border: 1px solid rgba(76, 175, 80, 0.2); border-left: 4px solid #4CAF50; border-radius: 6px; margin: 16px 0; display: flex; gap: 12px;">
          <span style="font-size: 20px; line-height: 1;">🎯</span>
          <div style="font-size: 14px; color: var(--txt); line-height: 1.5;"><strong style="color: #4CAF50;">ЦЕЛЬ:</strong> ${window.escHtml(val)}</div>
        </div>`;
      default:
        return `<div style="padding: 10px; background: var(--bg2); border-radius: 4px; font-size: 13px; color: var(--txt2); margin-bottom: 12px;">Неизвестный блок: ${block.type}</div>`;
    }
  }).join('');
};

// 3. Beautiful Responsive CSS Charts (Zero external deps!)
window.renderCSSChart = function(config) {
  if (!config || !config.data) return '<div style="color:var(--txt2); font-size: 12px;">Нет данных для визуализации</div>';
  const labels = config.data.labels || [];
  const dataset = config.data.datasets && config.data.datasets[0] ? config.data.datasets[0] : { data: [] };
  const data = dataset.data || [];
  const label = dataset.label || 'Статистика';
  const maxVal = Math.max(...data.map(v => Number(v) || 0), 1);
  
  return `
    <div style="font-family: var(--font-body); padding: 8px;">
      <div style="font-weight: 600; font-size: 13px; margin-bottom: 12px; color: #fff; text-align: center;">${window.escHtml(label)}</div>
      <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 150px; padding-bottom: 24px; border-bottom: 1px solid var(--border); gap: 12px;">
        ${data.map((val, idx) => {
          const pct = ((Number(val) || 0) / maxVal) * 100;
          return `
            <div style="display: flex; flex-direction: column; align-items: center; flex: 1; height: 100%; justify-content: flex-end; position: relative;">
              <div style="font-size: 10px; font-family: var(--font-mono); color: var(--accent); margin-bottom: 4px;">${val}</div>
              <div style="width: 100%; max-width: 32px; height: ${pct}%; background: linear-gradient(180deg, var(--accent), #FF2D6B); border-radius: 3px 3px 0 0; transition: height 0.3s;" title="${labels[idx] || ''}: ${val}"></div>
              <div style="position: absolute; bottom: -20px; font-size: 10px; color: var(--txt2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">${window.escHtml(labels[idx] || '')}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
};

// 4. Render Table Block HTML
window.renderBlockTableHtml = function(tableData) {
  if (!tableData) return '<table class="table-view"></table>';
  let parsed = tableData;
  if (typeof tableData === 'string') {
    try {
      parsed = JSON.parse(tableData);
    } catch {
      const lines = tableData.trim().split('\n');
      if (lines.length > 0) {
        const rows = lines.map(line => line.split('|').map(s => s.trim()).filter(Boolean));
        parsed = {
          headers: rows[0] || [],
          rows: rows.slice(2) || []
        };
      }
    }
  }
  const headers = parsed.headers || [];
  const rows = parsed.rows || [];
  return `
    <table class="table-view" style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-family: var(--font-body); font-size: 13px;">
      <thead>
        <tr style="border-bottom: 2px solid var(--border);">
          ${headers.map(h => `<th style="text-align: left; padding: 10px; color: #fff; font-weight: 600; border-bottom: 1px solid var(--border);">${window.escHtml(h)}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${rows.map(r => `
          <tr style="border-bottom: 1px solid var(--border);">
            ${r.map(cell => `<td style="padding: 10px; color: var(--txt2);">${window.escHtml(cell)}</td>`).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
};

// 5. Code runners trigger wiring
window.initLessonBlocksInteractions = function(container) {
  container.querySelectorAll('.block-code-wrapper').forEach(wrapper => {
    const btn = wrapper.querySelector('.btn-run-code');
    const codeEl = wrapper.querySelector('code');
    const outputEl = wrapper.querySelector('.code-output-container');
    const lang = codeEl.className.replace('language-', '');
    if (btn && codeEl && outputEl) {
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        const oldText = btn.textContent;
        btn.textContent = 'Выполнение...';
        outputEl.style.display = 'block';
        outputEl.textContent = 'Компиляция и выполнение в песочнице...';
        try {
          const res = await window.apiFetch('/api/compile', {
            method: 'POST',
            body: JSON.stringify({ language: lang, code: codeEl.textContent })
          });
          if (res.status === 'success') {
            outputEl.textContent = res.output || 'Программа выполнена успешно (нет вывода).';
            outputEl.style.color = '#a6e22e';
          } else {
            outputEl.textContent = res.output || 'Ошибка компиляции/выполнения.';
            outputEl.style.color = '#f92672';
          }
        } catch (err) {
          outputEl.textContent = 'Ошибка песочницы: ' + (err.detail || 'Сервер недоступен.');
          outputEl.style.color = '#f92672';
        } finally {
          btn.disabled = false;
          btn.textContent = oldText;
        }
      });
    }
  });
};

// ==========================================================================
// CMS ADMIN DASHBOARD & COURSE EDITOR VIEWS
// ==========================================================================

// Style Injector for Admin panel CMS
window.injectCMSStyles = function() {
  if (document.getElementById('cms-style-block')) return;
  const style = document.createElement('style');
  style.id = 'cms-style-block';
  style.innerHTML = `
    .admin-wrapper {
      background: var(--bg);
      color: var(--txt);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      font-family: var(--font-body);
    }
    .admin-navbar {
      height: 60px;
      background: var(--bg2);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .admin-nav-container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .admin-back-link {
      color: var(--txt2);
      text-decoration: none;
      font-size: 13px;
      transition: color 0.2s;
    }
    .admin-back-link:hover {
      color: var(--accent);
    }
    .admin-nav-title {
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 16px;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .admin-container {
      max-width: 1200px;
      margin: 40px auto;
      padding: 0 24px;
      width: 100%;
    }
    .admin-table {
      width: 100%;
      border-collapse: collapse;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
    }
    .admin-table th {
      padding: 14px 16px;
      text-align: left;
      font-family: var(--font-mono);
      font-size: 11px;
      text-transform: uppercase;
      color: var(--txt2);
      border-bottom: 1px solid var(--border);
      background: rgba(255,255,255,0.01);
    }
    .admin-table td {
      padding: 14px 16px;
      border-bottom: 1px solid var(--border);
      font-size: 13px;
      color: var(--txt2);
    }
    .admin-table tr:hover td {
      color: #fff;
      background: rgba(255,255,255,0.01);
    }
    .admin-table tr:last-child td {
      border-bottom: none;
    }
    .status-badge {
      font-family: var(--font-mono);
      font-size: 10px;
      text-transform: uppercase;
      padding: 3px 6px;
      border-radius: 4px;
      font-weight: bold;
    }
    .status-badge.published {
      background: rgba(76, 175, 80, 0.1);
      color: #4CAF50;
      border: 1px solid rgba(76, 175, 80, 0.2);
    }
    .status-badge.draft {
      background: rgba(255, 140, 66, 0.1);
      color: #FF8C42;
      border: 1px solid rgba(255, 140, 66, 0.2);
    }
    .editor-workspace {
      display: flex;
      flex: 1;
      overflow: hidden;
      height: calc(100vh - 60px);
    }
    .editor-sidebar {
      width: 280px;
      background: var(--bg2);
      border-right: 1px solid var(--border);
      padding: 20px;
      overflow-y: auto;
      flex-shrink: 0;
    }
    .editor-content-area {
      flex: 1;
      padding: 32px 40px;
      overflow-y: auto;
      background: var(--bg);
    }
    .editor-settings-drawer {
      width: 260px;
      background: var(--bg2);
      border-left: 1px solid var(--border);
      padding: 20px;
      overflow-y: auto;
      flex-shrink: 0;
    }
    .sidebar-section-item {
      margin-bottom: 16px;
    }
    .sidebar-section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 8px;
      background: rgba(255,255,255,0.02);
      border-radius: 4px;
      margin-bottom: 6px;
    }
    .sidebar-section-title {
      font-size: 12px;
      font-weight: bold;
      color: #fff;
      cursor: pointer;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .sidebar-lesson-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 8px;
      border-radius: 4px;
      margin-bottom: 3px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .sidebar-lesson-row:hover {
      background: rgba(255,255,255,0.02);
    }
    .sidebar-lesson-row.active {
      background: rgba(255, 77, 28, 0.08);
      border: 1px solid rgba(255, 77, 28, 0.18);
    }
    .sidebar-lesson-title {
      font-size: 12px;
      color: var(--txt2);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
    .sidebar-lesson-row.active .sidebar-lesson-title {
      color: #fff;
      font-weight: 500;
    }
    .sidebar-action-btn {
      background: none;
      border: none;
      color: var(--txt2);
      cursor: pointer;
      padding: 2px;
      font-size: 11px;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .sidebar-section-header:hover .sidebar-action-btn,
    .sidebar-lesson-row:hover .sidebar-action-btn {
      opacity: 1;
    }
    .sidebar-action-btn:hover {
      color: var(--accent);
    }
    .admin-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      backdrop-filter: blur(4px);
    }
    .modal-content {
      position: relative;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 10px;
      width: 90%;
      max-width: 480px;
      max-height: 80vh;
      display: flex;
      flex-direction: column;
      padding: 20px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    .modal-header h3 {
      font-family: var(--font-display);
      font-size: 18px;
      font-weight: 800;
      color: #fff;
      margin: 0;
    }
    .modal-close {
      background: none;
      border: none;
      color: var(--txt2);
      font-size: 20px;
      cursor: pointer;
    }
    .block-types-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      overflow-y: auto;
      padding-right: 4px;
    }
    .block-type-card {
      padding: 10px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.2s;
    }
    .block-type-card:hover {
      border-color: var(--accent);
      background: rgba(255, 77, 28, 0.02);
    }
    .block-type-icon {
      font-size: 18px;
    }
    .block-type-info {
      display: flex;
      flex-direction: column;
    }
    .block-type-name {
      font-size: 12px;
      font-weight: 600;
      color: #fff;
    }
    .block-type-desc {
      font-size: 10px;
      color: var(--txt2);
    }
    .cms-block-row {
      position: relative;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      transition: all 0.2s;
    }
    .cms-block-row:hover {
      border-color: rgba(255,255,255,0.06);
    }
    .cms-block-controls {
      position: absolute;
      right: 12px;
      top: 12px;
      display: flex;
      gap: 6px;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .cms-block-row:hover .cms-block-controls {
      opacity: 1;
    }
    .cms-control-btn {
      background: var(--bg);
      border: 1px solid var(--border);
      color: var(--txt2);
      padding: 3px 6px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 10px;
    }
    .cms-control-btn:hover {
      color: #fff;
      border-color: var(--accent);
    }
    .cms-control-btn.delete:hover {
      color: #fff;
      border-color: #FF2D6B;
      background: rgba(255, 45, 107, 0.05);
    }
    .cms-block-label {
      font-family: var(--font-mono);
      font-size: 9px;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 8px;
    }
    .cms-textarea {
      width: 100%;
      background: none;
      border: none;
      border-bottom: 1px solid transparent;
      color: #fff;
      font-family: var(--font-body);
      font-size: 13px;
      resize: vertical;
      padding: 4px 0;
    }
    .cms-textarea:focus {
      outline: none;
      border-color: var(--accent);
    }
    .cms-input {
      background: var(--bg);
      border: 1px solid var(--border);
      color: #fff;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 13px;
      font-family: var(--font-body);
      width: 100%;
    }
    .cms-input:focus {
      outline: none;
      border-color: var(--accent);
    }
    .cms-select {
      background: var(--bg);
      border: 1px solid var(--border);
      color: #fff;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 13px;
      width: 100%;
    }
    .save-status {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--txt2);
      margin-right: 12px;
    }
    .save-status.saving {
      color: var(--accent);
    }
    .save-status.error {
      color: #FF2D6B;
    }
  `;
  document.head.appendChild(style);
};

// Toast notification helper
window.showToast = function(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.position = 'fixed';
    container.style.bottom = '24px';
    container.style.right = '24px';
    container.style.zIndex = '10000';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '8px';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.style.background = 'var(--bg2)';
  toast.style.color = '#fff';
  toast.style.padding = '10px 16px';
  toast.style.borderRadius = '6px';
  toast.style.border = '1px solid var(--border)';
  toast.style.borderLeft = `4px solid ${type === 'success' ? '#FF8C42' : '#FF2D6B'}`;
  toast.style.fontSize = '13px';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.35)';
  toast.style.transform = 'translateY(80px)';
  toast.style.opacity = '0';
  toast.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  toast.innerHTML = `<span style="font-weight: 500;">${window.escHtml(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 50);
  setTimeout(() => {
    toast.style.transform = 'translateY(-20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// 6. View: List of courses CMS catalog
window.AppViews.renderAdminCourses = function() {
  window.injectCMSStyles();
  setTimeout(window.loadAdminCoursesData, 50);
  return `
    <div class="admin-wrapper">
      <div class="admin-navbar">
        <div class="admin-nav-container">
          <a href="#/dashboard" class="admin-back-link">← В кабинет</a>
          <div class="admin-nav-title">Управление курсами CMS</div>
          <div style="width: 80px;"></div>
        </div>
      </div>
      <div class="admin-container" id="admin-courses-container">
        <div style="text-align: center; padding: 100px 20px; color: var(--txt2); font-family: var(--font-body);">Загрузка структуры курсов...</div>
      </div>
    </div>
  `;
};

// Load courses table
window.loadAdminCoursesData = async function() {
  const container = document.getElementById('admin-courses-container');
  if (!container) return;
  try {
    const courses = await window.apiFetch('/admin/courses');
    
    let tableRowsHtml = courses.map(c => {
      const lastMod = new Date(c.last_modified).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' });
      const statusBadge = `<span class="status-badge ${c.status}">${c.status === 'published' ? 'активен' : 'черновик'}</span>`;
      return `
        <tr>
          <td style="font-weight:600; color:#fff;">${window.escHtml(c.title)}</td>
          <td style="font-family:var(--font-mono); font-size:12px;">${window.escHtml(c.category)}</td>
          <td>${c.sections_count}</td>
          <td>${c.lessons_count}</td>
          <td>${statusBadge}</td>
          <td>${lastMod}</td>
          <td>
            <div style="display:flex; gap:12px;">
              <a href="#/admin/courses/${c.category}" class="admin-back-link" style="color:var(--accent); font-weight:600;">Редактор</a>
              <a href="#/courses/${c.category}" class="admin-back-link" target="_blank" style="color:var(--txt2);">Превью</a>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Название курса</th>
            <th>Слуг (Slug)</th>
            <th>Разделов</th>
            <th>Уроков</th>
            <th>Статус</th>
            <th>Изменен</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHtml}
        </tbody>
      </table>
    `;
  } catch (err) {
    console.error("Failed to load CMS courses list", err);
    container.innerHTML = `
      <div style="text-align: center; padding: 48px; color: var(--accent); font-family: var(--font-body);">
        <h3>Не удалось загрузить список курсов</h3>
        <p>${window.escHtml(err.detail || 'Сервер временно недоступен.')}</p>
      </div>
    `;
  }
};

// 7. View: Dynamic course tree and Notion-like blocks editor workspace
window.AppViews.renderAdminCourseEditor = function(slug) {
  window.injectCMSStyles();
  window.currentCourseSlug = slug;
  window.currentBlocks = [];
  window.selectedLessonId = null;
  window.autoSaveTimeout = null;
  
  setTimeout(() => window.loadAdminEditorData(slug), 50);
  
  return `
    <div class="admin-wrapper" id="admin-editor-layout">
      <!-- Navbar -->
      <div class="admin-navbar">
        <div class="admin-nav-container">
          <a href="#/admin/courses" class="admin-back-link">← В панель CMS</a>
          <div class="admin-nav-title" id="admin-editor-breadcrumbs">Курсы / ...</div>
          <div class="admin-nav-actions" style="display:flex; align-items:center; gap:12px;">
            <span class="save-status" id="save-status-indicator">Все изменения сохранены</span>
            <button class="btn btn-outline" id="btn-editor-preview" style="font-size:12px; padding:6px 12px;">Предпросмотр</button>
            <button class="btn btn-primary" id="btn-editor-save" style="font-size:12px; padding:6px 12px;">Сохранить</button>
          </div>
        </div>
      </div>
      <!-- Workspace -->
      <div class="editor-workspace">
        <aside class="editor-sidebar">
          <div class="sidebar-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3 style="font-size:12px; text-transform:uppercase; color:var(--txt2); font-family:var(--font-mono); margin:0;">Структура</h3>
            <button class="btn-sidebar-add" id="btn-add-section" title="Добавить секцию" style="background:none; border:1px solid var(--accent); color:var(--accent); border-radius:4px; padding:2px 6px; font-size:11px; cursor:pointer;">+ Секция</button>
          </div>
          <div class="course-tree" id="editor-course-tree">
            <div style="text-align:center; color:var(--txt2); padding:20px; font-size:12px;">Загрузка дерева...</div>
          </div>
        </aside>
        
        <main class="editor-content-area" id="editor-blocks-container">
          <div style="text-align:center; padding:100px 20px; color:var(--txt2); font-family:var(--font-body);">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="opacity:0.3; margin-bottom:16px;">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            <h3>Выберите урок в меню слева</h3>
            <p style="font-size:13px; opacity:0.6; margin-top:8px;">Здесь будет открыт визуальный конструктор блоков.</p>
          </div>
        </main>
        
        <aside class="editor-settings-drawer" id="editor-settings-drawer" style="display:none;">
          <div class="drawer-header" style="font-family:var(--font-mono); font-size:11px; text-transform:uppercase; color:var(--txt2); border-bottom:1px solid var(--border); padding-bottom:8px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;">
            <span>Настройки урока</span>
            <button id="btn-close-settings" style="background:none; border:none; color:var(--txt2); cursor:pointer; font-size:16px; font-weight:bold;">×</button>
          </div>
          <div class="drawer-body" id="lesson-settings-fields"></div>
        </aside>
      </div>
      
      <!-- Block Picker Modal -->
      <div class="admin-modal" id="block-picker-modal" style="display:none;">
        <div class="modal-backdrop" onclick="window.closeBlockPicker()"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h3>Добавить элемент</h3>
            <button class="modal-close" onclick="window.closeBlockPicker()">×</button>
          </div>
          <div class="modal-search-wrapper" style="margin-bottom: 12px;">
            <input type="text" id="block-search" placeholder="Поиск блоков..." style="width:100%; padding:8px 12px; background:var(--bg); border:1px solid var(--border); border-radius:6px; color:#fff; font-size:13px;" />
          </div>
          <div class="block-types-grid" id="block-types-grid"></div>
        </div>
      </div>
    </div>
  `;
};

// Load course details: structure, sections, lessons tree
window.loadAdminEditorData = async function(slug) {
  try {
    const data = await window.apiFetch(`/admin/courses/${slug}`);
    window.currentCourse = data.course;
    window.currentSections = data.sections || [];
    
    // Set breadcrumbs
    const crumbs = document.getElementById('admin-editor-breadcrumbs');
    if (crumbs) crumbs.textContent = `Курсы / ${data.course.title}`;
    
    // Render tree sidebar
    window.renderEditorSidebarTree();
    
    // Wire action buttons
    document.getElementById('btn-add-section').onclick = window.addCMSSection;
    document.getElementById('btn-editor-save').onclick = window.saveCMSBlocks;
    document.getElementById('btn-editor-preview').onclick = window.toggleCMSPreviewMode;
    document.getElementById('btn-close-settings').onclick = () => {
      document.getElementById('editor-settings-drawer').style.display = 'none';
    };
    
    // Setup block picker modal search filter
    const searchInput = document.getElementById('block-search');
    if (searchInput) {
      searchInput.oninput = (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll('.block-type-card').forEach(card => {
          const name = card.querySelector('.block-type-name').textContent.toLowerCase();
          const desc = card.querySelector('.block-type-desc').textContent.toLowerCase();
          if (name.includes(query) || desc.includes(query)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      };
    }
  } catch (err) {
    console.error("Failed to load admin editor structure", err);
    window.showToast("Ошибка при загрузке структуры курса", "error");
  }
};

// Render course tree structure in sidebar
window.renderEditorSidebarTree = function() {
  const treeContainer = document.getElementById('editor-course-tree');
  if (!treeContainer) return;
  
  if (window.currentSections.length === 0) {
    treeContainer.innerHTML = `<div style="text-align:center; color:var(--txt2); padding:20px; font-size:12px;">Нет разделов. Нажмите "+ Секция" чтобы начать.</div>`;
    return;
  }
  
  let treeHtml = window.currentSections.map((section, secIdx) => {
    const lessons = section.lessons || [];
    
    let lessonsHtml = lessons.map(les => {
      const isActive = window.selectedLessonId === String(les.id);
      let typeLabel = '📄';
      if (les.type === 'video') typeLabel = '▶';
      else if (les.type === 'assignment' || les.type === 'задание') typeLabel = '📝';
      else if (les.type === 'experiment' || les.type === 'эксперимент') typeLabel = '🧪';
      else if (les.type === 'ai') typeLabel = '🤖';
      
      const badge = les.status === 'draft' ? `<span style="font-size:9px; color:var(--accent); font-family:var(--font-mono); margin-left:4px;">черновик</span>` : '';
      
      return `
        <div class="sidebar-lesson-row ${isActive ? 'active' : ''}" onclick="window.selectCMSLesson('${les.id}')">
          <span style="margin-right:6px; font-size:12px;">${typeLabel}</span>
          <span class="sidebar-lesson-title">${window.escHtml(les.title)} ${badge}</span>
          <button class="sidebar-action-btn" onclick="window.deleteCMSLesson(event, '${les.id}')" title="Удалить урок">🗑️</button>
        </div>
      `;
    }).join('');
    
    return `
      <div class="sidebar-section-item">
        <div class="sidebar-section-header">
          <span class="sidebar-section-title" title="${window.escHtml(section.title)}">${secIdx + 1}. ${window.escHtml(section.title)}</span>
          <div style="display:flex; gap:4px;">
            <button class="sidebar-action-btn" onclick="window.renameCMSSection('${section.section_num}', '${window.escHtml(section.title)}')" title="Переименовать раздел">✏️</button>
            <button class="sidebar-action-btn" onclick="window.addCMSLessonDialog('${section.section_num}')" title="Добавить урок">+</button>
            <button class="sidebar-action-btn" onclick="window.deleteCMSSection('${section.section_num}')" title="Удалить раздел">🗑️</button>
          </div>
        </div>
        <div style="padding-left:12px;">
          ${lessonsHtml}
        </div>
      </div>
    `;
  }).join('');
  
  treeContainer.innerHTML = treeHtml;
};

// Add Section handler
window.addCMSSection = async function() {
  const title = prompt("Введите название нового раздела:");
  if (!title) return;
  try {
    await window.apiFetch(`/admin/courses/${window.currentCourseSlug}/sections`, {
      method: 'POST',
      body: JSON.stringify({ title })
    });
    window.showToast("Раздел создан");
    window.loadAdminEditorData(window.currentCourseSlug);
  } catch (err) {
    window.showToast("Ошибка при создании раздела", "error");
  }
};

// Rename Section
window.renameCMSSection = async function(sectionNum, currentTitle) {
  const title = prompt("Введите новое название раздела:", currentTitle);
  if (!title || title === currentTitle) return;
  try {
    await window.apiFetch(`/admin/courses/${window.currentCourseSlug}/sections/${sectionNum}/rename`, {
      method: 'PUT',
      body: JSON.stringify({ title })
    });
    window.showToast("Раздел изменен");
    window.loadAdminEditorData(window.currentCourseSlug);
  } catch (err) {
    window.showToast("Ошибка при переименовании", "error");
  }
};

// Delete Section
window.deleteCMSSection = async function(sectionNum) {
  if (!confirm("Вы уверены, что хотите удалить весь этот раздел и все его уроки? Это действие необратимо!")) return;
  try {
    await window.apiFetch(`/admin/courses/${window.currentCourseSlug}/sections/${sectionNum}`, {
      method: 'DELETE'
    });
    window.showToast("Раздел удален");
    if (window.selectedLessonId) {
      window.selectedLessonId = null;
      document.getElementById('editor-blocks-container').innerHTML = `
        <div style="text-align:center; padding:100px 20px; color:var(--txt2);">
          <h3>Выберите урок в меню слева</h3>
        </div>
      `;
      document.getElementById('editor-settings-drawer').style.display = 'none';
    }
    window.loadAdminEditorData(window.currentCourseSlug);
  } catch (err) {
    window.showToast("Ошибка при удалении", "error");
  }
};

// Add Lesson Dialog
window.addCMSLessonDialog = async function(sectionNum) {
  const title = prompt("Введите название нового урока:");
  if (!title) return;
  const type = prompt("Введите тип урока (video, info, assignment, experiment, ai) [по умолчанию info]:", "info") || "info";
  try {
    const newLesson = await window.apiFetch(`/admin/courses/${window.currentCourseSlug}/sections/${sectionNum}/lessons`, {
      method: 'POST',
      body: JSON.stringify({ title, type })
    });
    window.showToast("Урок создан");
    window.loadAdminEditorData(window.currentCourseSlug);
    window.selectCMSLesson(String(newLesson.id));
  } catch (err) {
    window.showToast("Ошибка при создании урока", "error");
  }
};

// Delete Lesson
window.deleteCMSLesson = async function(event, lessonId) {
  event.stopPropagation();
  if (!confirm("Удалить этот урок и весь его контент?")) return;
  try {
    await window.apiFetch(`/admin/lessons/${lessonId}`, {
      method: 'DELETE'
    });
    window.showToast("Урок удален");
    if (window.selectedLessonId === String(lessonId)) {
      window.selectedLessonId = null;
      document.getElementById('editor-blocks-container').innerHTML = `
        <div style="text-align:center; padding:100px 20px; color:var(--txt2);">
          <h3>Выберите урок в меню слева</h3>
        </div>
      `;
      document.getElementById('editor-settings-drawer').style.display = 'none';
    }
    window.loadAdminEditorData(window.currentCourseSlug);
  } catch (err) {
    window.showToast("Ошибка при удалении", "error");
  }
};

// Select and load lesson into the editor
window.selectCMSLesson = async function(lessonId) {
  window.selectedLessonId = String(lessonId);
  window.currentBlocks = [];
  
  document.querySelectorAll('.sidebar-lesson-row').forEach(row => row.classList.remove('active'));
  window.renderEditorSidebarTree();
  
  const blocksContainer = document.getElementById('editor-blocks-container');
  blocksContainer.innerHTML = `<div style="text-align:center; padding:100px 20px; color:var(--txt2);">Загрузка контента урока...</div>`;
  
  try {
    const data = await window.apiFetch(`/lessons/${lessonId}/content`);
    window.currentBlocks = data.blocks || [];
    
    let lessonInfo = null;
    for (const sec of window.currentSections) {
      const found = sec.lessons.find(l => String(l.id) === String(lessonId));
      if (found) {
        lessonInfo = found;
        break;
      }
    }
    
    if (lessonInfo) {
      window.currentLessonSettings = lessonInfo;
      const drawer = document.getElementById('editor-settings-drawer');
      drawer.style.display = 'block';
      
      const fieldsContainer = document.getElementById('lesson-settings-fields');
      const durationMin = Math.round((lessonInfo.duration_sec || 600) / 60);
      
      fieldsContainer.innerHTML = `
        <div class="input-group" style="margin-bottom:12px;">
          <label style="font-size:11px; color:var(--txt2); display:block; margin-bottom:4px;">Название урока</label>
          <input type="text" id="settings-title" class="cms-input" value="${window.escHtml(lessonInfo.title)}" />
        </div>
        <div class="input-group" style="margin-bottom:12px;">
          <label style="font-size:11px; color:var(--txt2); display:block; margin-bottom:4px;">Тип урока</label>
          <select id="settings-type" class="cms-select">
            <option value="info" ${lessonInfo.type.toLowerCase() === 'info' ? 'selected' : ''}>ИНФО (Text)</option>
            <option value="video" ${lessonInfo.type.toLowerCase() === 'video' ? 'selected' : ''}>ВИДЕО (Video)</option>
            <option value="assignment" ${lessonInfo.type.toLowerCase() === 'assignment' ? 'selected' : ''}>ЗАДАНИЕ (Task)</option>
            <option value="experiment" ${lessonInfo.type.toLowerCase() === 'experiment' ? 'selected' : ''}>ЭКСПЕРИМЕНТ (Experiment)</option>
            <option value="live" ${lessonInfo.type.toLowerCase() === 'live' ? 'selected' : ''}>LIVE (Мониторинг)</option>
            <option value="ai" ${lessonInfo.type.toLowerCase() === 'ai' ? 'selected' : ''}>AI (Sketch Review)</option>
          </select>
        </div>
        <div class="input-group" style="margin-bottom:12px;">
          <label style="font-size:11px; color:var(--txt2); display:block; margin-bottom:4px;">Статус</label>
          <select id="settings-status" class="cms-select">
            <option value="published" ${lessonInfo.status === 'published' ? 'selected' : ''}>Опубликован</option>
            <option value="draft" ${lessonInfo.status === 'draft' ? 'selected' : ''}>Черновик</option>
          </select>
        </div>
        <div class="input-group" style="margin-bottom:12px;">
          <label style="font-size:11px; color:var(--txt2); display:block; margin-bottom:4px;">Длительность (мин)</label>
          <input type="number" id="settings-duration" class="cms-input" value="${durationMin}" min="1" />
        </div>
        <div style="margin-top:16px;">
          <button class="btn btn-primary btn-full" onclick="window.saveLessonSettings()" style="font-size:12px; padding:6px;">Применить</button>
        </div>
      `;
    }
    
    window.renderBlocksEditor();
  } catch (err) {
    console.error("Failed to load lesson in editor", err);
    window.showToast("Ошибка при загрузке данных урока", "error");
  }
};

// Render CMS Notion-like blocks in main workspace
window.renderBlocksEditor = function() {
  const container = document.getElementById('editor-blocks-container');
  if (!container) return;
  
  if (window.currentBlocks.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:60px 20px; border: 1px dashed var(--border); border-radius:8px; color:var(--txt2); font-family:var(--font-body);">
        <h4>В этом уроке нет блоков контента</h4>
        <button class="btn btn-primary" onclick="window.openBlockPicker(0)" style="margin-top:12px; font-size:12px;">+ Добавить блок</button>
      </div>
    `;
    return;
  }
  
  let blocksHtml = window.currentBlocks.map((block, idx) => {
    let blockInputHtml = '';
    const val = block.value || '';
    const cap = block.caption || '';
    
    switch (block.type) {
      case 'title':
        blockInputHtml = `<input type="text" class="cms-input" data-idx="${idx}" data-field="value" value="${window.escHtml(val)}" placeholder="Введите заголовок..." style="font-size:18px; font-weight:bold; height:auto; padding:8px 0; border:none; border-bottom:1px solid var(--border); background:none;" />`;
        break;
      case 'text':
        blockInputHtml = `<textarea class="cms-textarea" data-idx="${idx}" data-field="value" placeholder="Напишите текст параграфа..." rows="3" style="font-size:14px; line-height:1.6;">${window.escHtml(val)}</textarea>`;
        break;
      case 'quote':
        blockInputHtml = `<textarea class="cms-textarea" data-idx="${idx}" data-field="value" placeholder="Напишите текст цитаты..." rows="2" style="font-style:italic; border-left:3px solid var(--accent); padding-left:12px;">${window.escHtml(val)}</textarea>`;
        break;
      case 'image':
      case 'video':
      case 'pdf':
        blockInputHtml = `
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; gap:10px; align-items:center;">
              <input type="text" class="cms-input" data-idx="${idx}" data-field="value" value="${window.escHtml(val)}" placeholder="URL медиа-файла..." style="flex:1;" />
              <button class="btn btn-outline" style="font-size:11px; padding:6px 12px; position:relative; overflow:hidden;">
                Загрузить
                <input type="file" onchange="window.uploadCMSFile(${idx}, this, '${block.type === 'image' ? 'images' : block.type === 'video' ? 'videos' : 'files'}')" style="position:absolute; left:0; top:0; opacity:0; width:100%; height:100%; cursor:pointer;" />
              </button>
            </div>
            <input type="text" class="cms-input" data-idx="${idx}" data-field="caption" value="${window.escHtml(cap)}" placeholder="Подпись/Заголовок файла..." />
            ${block.type === 'image' && val ? `<div style="margin-top:8px; text-align:center;"><img src="${val}" style="max-height:120px; border-radius:4px; border:1px solid var(--border);" /></div>` : ''}
            ${block.type === 'video' && val ? `<div style="margin-top:8px; font-size:11px; color:#4CAF50;">✓ Видео привязано</div>` : ''}
            ${block.type === 'pdf' && val ? `<div style="margin-top:8px; font-size:11px; color:#4CAF50;">✓ Документ привязан</div>` : ''}
          </div>
        `;
        break;
      case 'list':
        blockInputHtml = `<textarea class="cms-textarea" data-idx="${idx}" data-field="value" placeholder="Каждая строка - элемент списка..." rows="3">${window.escHtml(val)}</textarea>`;
        break;
      case 'divider':
        blockInputHtml = `<div style="border-top:1px solid var(--border); padding:10px 0; color:var(--txt2); font-size:11px; font-family:var(--font-mono);">----- РАЗДЕЛИТЕЛЬНАЯ ЛИНИЯ -----</div>`;
        break;
      case 'card':
        blockInputHtml = `
          <div style="display:flex; flex-direction:column; gap:8px;">
            <input type="text" class="cms-input" data-idx="${idx}" data-field="caption" value="${window.escHtml(cap)}" placeholder="Заголовок карточки..." style="font-weight:bold;" />
            <textarea class="cms-textarea" data-idx="${idx}" data-field="value" placeholder="Описание..." rows="2">${window.escHtml(val)}</textarea>
          </div>
        `;
        break;
      case 'code':
        blockInputHtml = `
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; gap:12px; align-items:center;">
              <select class="cms-select" data-idx="${idx}" data-field="language" style="width:120px; font-family:var(--font-mono); font-size:11px;">
                <option value="python" ${block.language === 'python' ? 'selected' : ''}>Python</option>
                <option value="cpp" ${block.language === 'cpp' ? 'selected' : ''}>C++</option>
                <option value="java" ${block.language === 'java' ? 'selected' : ''}>Java</option>
                <option value="javascript" ${block.language === 'javascript' ? 'selected' : ''}>JS</option>
              </select>
              <button class="btn btn-outline-accent" onclick="window.runCodeBlockInCMS(${idx})" style="font-size:10px; padding:3px 8px;">Тест запуска</button>
            </div>
            <textarea class="cms-textarea" data-idx="${idx}" data-field="value" placeholder="Напишите исходный код..." rows="5" style="font-family:var(--font-mono); font-size:12px; background:#1e1e1e; padding:8px; border-radius:4px; border:1px solid var(--border); color:#d4d4d4;">${window.escHtml(val)}</textarea>
            <div class="cms-code-output" id="cms-code-out-${idx}" style="display:none; font-family:var(--font-mono); font-size:11px; padding:8px; background:#111; border-radius:4px; color:#ff4d4d; white-space:pre-wrap;"></div>
          </div>
        `;
        break;
      case 'important':
        blockInputHtml = `<textarea class="cms-textarea" data-idx="${idx}" data-field="value" placeholder="Важное замечание..." rows="2" style="border-left:3px solid #FF2D6B; padding-left:12px; color:#fff;">${window.escHtml(val)}</textarea>`;
        break;
      case 'tip':
        blockInputHtml = `<textarea class="cms-textarea" data-idx="${idx}" data-field="value" placeholder="Полезный совет..." rows="2" style="border-left:3px solid #FF8C42; padding-left:12px; color:#fff;">${window.escHtml(val)}</textarea>`;
        break;
      case 'assignment':
      case 'experiment':
        blockInputHtml = `
          <div style="display:flex; flex-direction:column; gap:8px;">
            <input type="text" class="cms-input" data-idx="${idx}" data-field="caption" value="${window.escHtml(cap)}" placeholder="${block.type === 'assignment' ? 'Название практического задания...' : 'Название лабораторной...'}" style="font-weight:bold;" />
            <textarea class="cms-textarea" data-idx="${idx}" data-field="value" placeholder="Описание шагов..." rows="3">${window.escHtml(val)}</textarea>
          </div>
        `;
        break;
      case 'goal':
        blockInputHtml = `<textarea class="cms-textarea" data-idx="${idx}" data-field="value" placeholder="Целевой показатель/метрика..." rows="2" style="border-left:3px solid #4CAF50; padding-left:12px; color:#fff;">${window.escHtml(val)}</textarea>`;
        break;
      case 'table':
        blockInputHtml = window.renderVisualTableEditor(idx, val);
        break;
      case 'chart':
        blockInputHtml = window.renderChartBlockEditor(idx, val);
        break;
      default:
        blockInputHtml = `<div>Редактор для ${block.type} отсутствует.</div>`;
    }
    
    return `
      <div class="cms-block-row">
        <div class="cms-block-label">${block.type}</div>
        <div class="cms-block-controls">
          <button class="cms-control-btn" onclick="window.moveBlockUp(${idx})" title="Поднять">▲</button>
          <button class="cms-control-btn" onclick="window.moveBlockDown(${idx})" title="Опустить">▼</button>
          <button class="cms-control-btn" onclick="window.openBlockPicker(${idx + 1})" title="Вставить блок">+</button>
          <button class="cms-control-btn delete" onclick="window.deleteBlock(${idx})" title="Удалить">🗑️</button>
        </div>
        <div class="cms-block-body">
          ${blockInputHtml}
        </div>
      </div>
    `;
  }).join('');
  
  container.innerHTML = `
    <div style="max-width:760px; margin: 0 auto; padding-bottom:100px;">
      <div style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
        <button class="btn btn-outline" onclick="window.openBlockPicker(0)" style="font-size:11px; padding:6px 12px;">+ Вставить в начало</button>
      </div>
      ${blocksHtml}
      <div style="margin-top:20px; text-align:center;">
        <button class="btn btn-primary" onclick="window.openBlockPicker(window.currentBlocks.length)" style="font-size:12px; padding:8px 20px;">+ Добавить элемент в конец</button>
      </div>
    </div>
  `;
  
  // Bind live inputs listeners for standard controls
  container.querySelectorAll('input.cms-input, textarea.cms-textarea, select.cms-select').forEach(el => {
    el.oninput = (e) => {
      const idx = parseInt(e.target.getAttribute('data-idx'));
      const field = e.target.getAttribute('data-field');
      if (!isNaN(idx) && field) {
        window.currentBlocks[idx][field] = e.target.value;
        window.triggerCMSAutoSave();
      }
    };
  });

  // Bind visual table editor inputs
  container.querySelectorAll('.cms-table-header').forEach(el => {
    el.oninput = (e) => {
      const blockIdx = parseInt(e.target.getAttribute('data-block-id'));
      const colIdx = parseInt(e.target.getAttribute('data-col'));
      window.currentBlocks[blockIdx].value.headers[colIdx] = e.target.value;
      window.triggerCMSAutoSave();
    };
  });
  container.querySelectorAll('.cms-table-cell').forEach(el => {
    el.oninput = (e) => {
      const blockIdx = parseInt(e.target.getAttribute('data-block-id'));
      const rowIdx = parseInt(e.target.getAttribute('data-row'));
      const colIdx = parseInt(e.target.getAttribute('data-col'));
      window.currentBlocks[blockIdx].value.rows[rowIdx][colIdx] = e.target.value;
      window.triggerCMSAutoSave();
    };
  });

  // Bind live chart inputs
  container.querySelectorAll('.cms-chart-label').forEach(el => {
    el.oninput = (e) => {
      const blockIdx = parseInt(e.target.getAttribute('data-block-id'));
      window.currentBlocks[blockIdx].value.data.datasets[0].label = e.target.value;
      window.triggerCMSAutoSave();
    };
  });
  container.querySelectorAll('.cms-chart-type').forEach(el => {
    el.onchange = (e) => {
      const blockIdx = parseInt(e.target.getAttribute('data-block-id'));
      window.currentBlocks[blockIdx].value.type = e.target.value;
      window.renderBlocksEditor();
      window.triggerCMSAutoSave();
    };
  });
  container.querySelectorAll('.cms-chart-labels').forEach(el => {
    el.oninput = (e) => {
      const blockIdx = parseInt(e.target.getAttribute('data-block-id'));
      window.currentBlocks[blockIdx].value.data.labels = e.target.value.split(',').map(s => s.trim());
      window.triggerCMSAutoSave();
    };
  });
  container.querySelectorAll('.cms-chart-values').forEach(el => {
    el.oninput = (e) => {
      const blockIdx = parseInt(e.target.getAttribute('data-block-id'));
      window.currentBlocks[blockIdx].value.data.datasets[0].data = e.target.value.split(',').map(s => Number(s.trim()) || 0);
      window.triggerCMSAutoSave();
    };
  });
};

// Add block modal triggers
window.openBlockPicker = function(index) {
  window.insertBlockAtIndex = index;
  const modal = document.getElementById('block-picker-modal');
  modal.style.display = 'flex';
  
  const grid = document.getElementById('block-types-grid');
  const blockTypes = [
    { type: 'title', icon: 'H', name: 'Заголовок', desc: 'Крупный жирный шрифт' },
    { type: 'text', icon: '¶', name: 'Текст', desc: 'Простой текстовый параграф' },
    { type: 'quote', icon: '“', name: 'Цитата', desc: 'Выделенный курсив с оранжевой полосой' },
    { type: 'image', icon: '🖼️', name: 'Изображение', desc: 'Загрузка картинок с подписью' },
    { type: 'video', icon: '🎥', name: 'Видео', desc: 'MP4 или ссылка на YouTube' },
    { type: 'pdf', icon: '📄', name: 'PDF', desc: 'Файл или методическое пособие' },
    { type: 'table', icon: '📊', name: 'Таблица', desc: 'Интерактивная таблица данных' },
    { type: 'chart', icon: '📈', name: 'График', desc: 'Визуальный CSS-график с подписями' },
    { type: 'list', icon: '•', name: 'Список', desc: 'Элементы списком по строкам' },
    { type: 'divider', icon: '―', name: 'Разделитель', desc: 'Горизонтальная черта' },
    { type: 'card', icon: '📇', name: 'Карточка', desc: 'Блок с заголовком и рамкой' },
    { type: 'code', icon: '💻', name: 'Код', desc: 'Monaco-like интерактивный Python блок' },
    { type: 'important', icon: '⚠️', name: 'Важно', desc: 'Критическое предупреждение' },
    { type: 'tip', icon: '💡', name: 'Совет', desc: 'Полезная подсказка ментора' },
    { type: 'assignment', icon: '📝', name: 'Задание', desc: 'Практическая задача' },
    { type: 'experiment', icon: '🧪', name: 'Эксперимент', desc: 'Лабораторная работа' },
    { type: 'goal', icon: '🎯', name: 'Цель', desc: 'Инженерная цель/метрика' }
  ];
  
  grid.innerHTML = blockTypes.map(b => `
    <div class="block-type-card" onclick="window.addBlock('${b.type}')">
      <div class="block-type-icon">${b.icon}</div>
      <div class="block-type-info">
        <span class="block-type-name">${b.name}</span>
        <span class="block-type-desc">${b.desc}</span>
      </div>
    </div>
  `).join('');
  
  const searchInput = document.getElementById('block-search');
  if (searchInput) {
    searchInput.value = '';
    searchInput.focus();
  }
};

window.closeBlockPicker = function() {
  document.getElementById('block-picker-modal').style.display = 'none';
};

window.addBlock = function(type) {
  let defaultValue = '';
  let defaultCaption = '';
  
  if (type === 'table') {
    defaultValue = { headers: ['Колонка 1', 'Колонка 2'], rows: [['Значение 1', 'Значение 2']] };
  } else if (type === 'chart') {
    defaultValue = {
      type: 'bar',
      data: {
        labels: ['Показатель 1', 'Показатель 2'],
        datasets: [{ label: 'Статистика', data: [10, 20] }]
      }
    };
  } else if (type === 'code') {
    defaultValue = '# Напишите ваш код на Python\nprint("Hello World!")';
  }
  
  const newBlock = {
    type,
    value: defaultValue,
    caption: defaultCaption,
    language: type === 'code' ? 'python' : undefined
  };
  
  window.currentBlocks.splice(window.insertBlockAtIndex, 0, newBlock);
  window.closeBlockPicker();
  window.renderBlocksEditor();
  window.triggerCMSAutoSave();
};

// Block reordering and deletion
window.moveBlockUp = function(idx) {
  if (idx === 0) return;
  const temp = window.currentBlocks[idx];
  window.currentBlocks[idx] = window.currentBlocks[idx - 1];
  window.currentBlocks[idx - 1] = temp;
  window.renderBlocksEditor();
  window.triggerCMSAutoSave();
};

window.moveBlockDown = function(idx) {
  if (idx === window.currentBlocks.length - 1) return;
  const temp = window.currentBlocks[idx];
  window.currentBlocks[idx] = window.currentBlocks[idx + 1];
  window.currentBlocks[idx + 1] = temp;
  window.renderBlocksEditor();
  window.triggerCMSAutoSave();
};

window.deleteBlock = function(idx) {
  if (!confirm("Удалить этот блок?")) return;
  window.currentBlocks.splice(idx, 1);
  window.renderBlocksEditor();
  window.triggerCMSAutoSave();
};

// Monaco-like run button execution sandbox test in CMS
window.runCodeBlockInCMS = async function(blockIdx) {
  const block = window.currentBlocks[blockIdx];
  const code = block.value;
  const lang = block.language || 'python';
  const outEl = document.getElementById(`cms-code-out-${blockIdx}`);
  if (!outEl) return;
  outEl.style.display = 'block';
  outEl.style.color = '#FF8C42';
  outEl.textContent = 'Выполнение скрипта в песочнице...';
  try {
    const res = await window.apiFetch('/api/compile', {
      method: 'POST',
      body: JSON.stringify({ language: lang, code })
    });
    if (res.status === 'success') {
      outEl.style.color = '#a6e22e';
      outEl.textContent = res.output || 'Программа отработала успешно.';
    } else {
      outEl.style.color = '#ff2d6b';
      outEl.textContent = res.output || 'Ошибка компиляции.';
    }
  } catch (err) {
    outEl.style.color = '#ff2d6b';
    outEl.textContent = 'Ошибка выполнения: ' + (err.detail || 'Сервер недоступен.');
  }
};

// File Uploader handler
window.uploadCMSFile = async function(blockIdx, inputEl, bucket) {
  const file = inputEl.files[0];
  if (!file) return;
  
  const statusEl = document.getElementById('save-status-indicator');
  statusEl.textContent = 'Загрузка файла...';
  statusEl.className = 'save-status saving';
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('lesson_id', window.selectedLessonId);
  formData.append('bucket', bucket);
  
  try {
    const response = await fetch((window.API_BASE || '') + '/admin/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${window.Auth.getToken()}`
      },
      body: formData
    });
    
    if (!response.ok) throw new Error('Upload failed');
    const res = await response.json();
    
    window.currentBlocks[blockIdx].value = res.file_url;
    window.currentBlocks[blockIdx].caption = file.name;
    window.showToast("Файл успешно загружен!");
    window.renderBlocksEditor();
    window.triggerCMSAutoSave();
  } catch (err) {
    console.error("File upload failed", err);
    window.showToast("Не удалось загрузить файл", "error");
    statusEl.textContent = 'Ошибка загрузки';
    statusEl.className = 'save-status error';
  }
};

// Debounced Auto-save implementation
window.triggerCMSAutoSave = function() {
  const statusEl = document.getElementById('save-status-indicator');
  if (statusEl) {
    statusEl.textContent = 'Есть несохраненные правки...';
    statusEl.className = 'save-status';
  }
  
  if (window.autoSaveTimeout) clearTimeout(window.autoSaveTimeout);
  window.autoSaveTimeout = setTimeout(() => {
    window.saveCMSBlocks(true);
  }, 2000); // 2s debounce
};

// Save blocks to database
window.saveCMSBlocks = async function(isSilent = false) {
  if (!window.selectedLessonId) return;
  const statusEl = document.getElementById('save-status-indicator');
  if (statusEl) {
    statusEl.textContent = 'Сохранение...';
    statusEl.className = 'save-status saving';
  }
  try {
    await window.apiFetch(`/lessons/${window.selectedLessonId}/content`, {
      method: 'POST',
      body: JSON.stringify({ blocks: window.currentBlocks })
    });
    if (statusEl) {
      statusEl.textContent = 'Все изменения сохранены';
      statusEl.className = 'save-status';
    }
    if (!isSilent) window.showToast("Урок сохранен");
  } catch (err) {
    console.error("Failed to save blocks", err);
    if (statusEl) {
      statusEl.textContent = 'Ошибка автосохранения';
      statusEl.className = 'save-status error';
    }
    if (!isSilent) window.showToast("Не удалось сохранить контент", "error");
  }
};

// Save lesson settings
window.saveLessonSettings = async function() {
  if (!window.selectedLessonId) return;
  const title = document.getElementById('settings-title').value.trim();
  const type = document.getElementById('settings-type').value;
  const status = document.getElementById('settings-status').value;
  const duration = parseInt(document.getElementById('settings-duration').value) || 10;
  
  if (!title) {
    window.showToast("Название урока не может быть пустым", "error");
    return;
  }
  
  try {
    await window.apiFetch(`/admin/lessons/${window.selectedLessonId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
        type: type,
        status: status,
        duration_min: duration,
        forge_coins: 10,
        is_required: true,
        is_available: true
      })
    });
    
    window.showToast("Настройки применены!");
    
    // Update local settings object cache
    for (const sec of window.currentSections) {
      const found = sec.lessons.find(l => String(l.id) === String(window.selectedLessonId));
      if (found) {
        found.title = title;
        found.type = type;
        found.status = status;
        found.duration_sec = duration * 60;
        break;
      }
    }
    
    window.renderEditorSidebarTree();
  } catch (err) {
    console.error("Failed to save lesson settings", err);
    window.showToast("Ошибка сохранения настроек", "error");
  }
};

// Visual Table Editor modifiers
window.renderVisualTableEditor = function(blockId, blockValue) {
  let tableData = blockValue;
  if (!tableData || typeof tableData !== 'object') {
    tableData = { headers: ['Колонка 1', 'Колонка 2'], rows: [['Ячейка 1', 'Ячейка 2']] };
  }
  const headers = tableData.headers || [];
  const rows = tableData.rows || [];
  
  return `
    <div class="table-editor-wrapper" style="margin-top:8px;">
      <table style="width:100%; border-collapse:collapse; margin-bottom:8px;">
        <thead>
          <tr>
            ${headers.map((h, hIdx) => `
              <th style="padding:6px; border:1px solid var(--border);">
                <div style="display:flex; gap:4px; align-items:center;">
                  <input type="text" class="cms-table-header" data-block-id="${blockId}" data-col="${hIdx}" value="${window.escHtml(h)}" style="background:none; border:none; color:#fff; font-weight:600; width:100%; font-size:13px;" />
                  <button onclick="window.deleteTableColumn(${blockId}, ${hIdx})" style="background:none; border:none; color:#ff4d4d; cursor:pointer; font-size:11px;">×</button>
                </div>
              </th>
            `).join('')}
            <th style="width:40px; border:none; background:none;">
              <button class="cms-control-btn" onclick="window.addTableColumn(${blockId})" title="Добавить колонку">+</button>
            </th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row, rIdx) => `
            <tr>
              ${row.map((cell, cIdx) => `
                <td style="padding:6px; border:1px solid var(--border);">
                  <input type="text" class="cms-table-cell" data-block-id="${blockId}" data-row="${rIdx}" data-col="${cIdx}" value="${window.escHtml(cell)}" style="background:none; border:none; color:var(--txt2); width:100%; font-size:13px;" />
                </td>
              `).join('')}
              <td style="border:none; text-align:center;">
                <button class="cms-control-btn delete" onclick="window.deleteTableRow(${blockId}, ${rIdx})" title="Удалить строку" style="color:#ff4d4d;">×</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <button class="btn btn-outline" onclick="window.addTableRow(${blockId})" style="font-size:11px; padding:4px 8px;">+ Строка</button>
    </div>
  `;
};

// Visual Chart Editor builders
window.renderChartBlockEditor = function(blockIdx, blockValue) {
  let chartConfig = blockValue;
  if (!chartConfig || typeof chartConfig !== 'object' || !chartConfig.data) {
    chartConfig = {
      type: 'bar',
      data: {
        labels: ['Показатель 1', 'Показатель 2'],
        datasets: [{ label: 'Статистика', data: [10, 20] }]
      }
    };
  }
  const label = chartConfig.data.datasets[0].label || '';
  const labelsStr = chartConfig.data.labels.join(', ');
  const valuesStr = chartConfig.data.datasets[0].data.join(', ');
  const type = chartConfig.type || 'bar';
  
  return `
    <div class="chart-editor-wrapper" style="margin-top:8px; display:flex; flex-direction:column; gap:8px;">
      <div style="display:flex; gap:12px;">
        <div style="flex:1;">
          <label style="font-size:11px; color:var(--txt2);">Название показателя</label>
          <input type="text" class="cms-chart-label cms-input" data-block-id="${blockIdx}" value="${window.escHtml(label)}" />
        </div>
        <div style="width:120px;">
          <label style="font-size:11px; color:var(--txt2);">Тип графика</label>
          <select class="cms-chart-type cms-select" data-block-id="${blockIdx}">
            <option value="bar" ${type === 'bar' ? 'selected' : ''}>Столбчатый</option>
            <option value="line" ${type === 'line' ? 'selected' : ''}>Линейный</option>
          </select>
        </div>
      </div>
      <div>
        <label style="font-size:11px; color:var(--txt2);">Подписи (через запятую)</label>
        <input type="text" class="cms-chart-labels cms-input" data-block-id="${blockIdx}" value="${window.escHtml(labelsStr)}" placeholder="Пн, Вт, Ср" />
      </div>
      <div>
        <label style="font-size:11px; color:var(--txt2);">Значения (через запятую)</label>
        <input type="text" class="cms-chart-values cms-input" data-block-id="${blockIdx}" value="${window.escHtml(valuesStr)}" placeholder="10, 20, 15" />
      </div>
      <div style="margin-top:12px; background:var(--bg); border:1px solid var(--border); border-radius:6px; padding:12px;">
        <div style="font-size:11px; color:var(--txt2); margin-bottom:8px; text-transform:uppercase;">Превью графика</div>
        ${window.renderCSSChart(chartConfig)}
      </div>
    </div>
  `;
};

// Toggle CMS Preview mode with return banner
window.toggleCMSPreviewMode = function() {
  if (!window.selectedLessonId) return;
  window.saveCMSBlocks(true);
  const container = document.getElementById('editor-blocks-container');
  container.innerHTML = `
    <div style="background: rgba(255, 77, 28, 0.08); border:1px solid var(--accent); border-radius:8px; padding:12px 16px; margin-bottom:24px; display:flex; justify-content:space-between; align-items:center;">
      <span style="font-size:13px; color:var(--txt); font-family:var(--font-body);">👁️ Режим предпросмотра урока для студентов</span>
      <button class="btn btn-outline" onclick="window.renderBlocksEditor()" style="font-size:11px; padding:4px 8px;">Вернуться в редактор</button>
    </div>
    <div class="lesson-preview-content" style="max-width:700px; margin: 0 auto;">
      ${window.renderLessonBlocks(window.currentBlocks)}
    </div>
  `;
  window.initLessonBlocksInteractions(container);
};


