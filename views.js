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
          <div class="stat-item"><span class="stat-number" data-target="3">0</span> курса</div>
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
          <a href="#/courses/1" class="course-card">
            <div class="course-tag">Engineering</div>
            <h3 class="course-title">Инженерная часть</h3>
            <p class="course-desc">Изучи принципы проектирования FTC-робота — дриветрейны, манипуляторы, intake-системы. Научись работать с TETRIX и REV Robotics kit.</p>
          </a>
          <a href="#/courses/2" class="course-card">
            <div class="course-tag">Coding</div>
            <h3 class="course-title">Кодинг</h3>
            <p class="course-desc">Освой FTC SDK — напиши автономный режим и TeleOp. Научись использовать OnBot Java, Road Runner, компьютерное зрение (EOCV).</p>
          </a>
          <a href="#/courses/3" class="course-card">
            <div class="course-tag">Inspire</div>
            <h3 class="course-title">Inspire</h3>
            <p class="course-desc">FTC — это не только робот. Научись оформлять Engineering Portfolio, строить команду, проводить outreach и выигрывать номинации судей.</p>
          </a>
        </div>
      </div>
    </section>

    <section id="reviews" class="reviews animate-item">
      <div class="ticker-wrapper">
        <div class="ticker">
          <div class="review-card"><p class="review-quote">"Структура курса просто идеальная. Ничего лишнего."</p><div class="review-author"><span class="author-name">Алексей С.</span><span class="author-score">Junior → Middle</span></div></div>
          <div class="review-card"><p class="review-quote">"Менторы помогли подготовиться к секции алгоритмов в Яндекс."</p><div class="review-author"><span class="author-name">Мария В.</span><span class="author-score">Оффер в BigTech</span></div></div>
          <div class="review-card"><p class="review-quote">"Инженерная часть — топ. Наконец-то понял как работают сети."</p><div class="review-author"><span class="author-name">Иван Д.</span><span class="author-score">+45% к ЗП</span></div></div>
          <div class="review-card"><p class="review-quote">"Лучшее вложение времени и средств в этом году."</p><div class="review-author"><span class="author-name">Елена К.</span><span class="author-score">Успешная смена профессии</span></div></div>
          <!-- Duplicates for infinite scroll -->
          <div class="review-card"><p class="review-quote">"Структура курса просто идеальная. Ничего лишнего."</p><div class="review-author"><span class="author-name">Алексей С.</span><span class="author-score">Junior → Middle</span></div></div>
          <div class="review-card"><p class="review-quote">"Менторы помогли подготовиться к секции алгоритмов в Яндекс."</p><div class="review-author"><span class="author-name">Мария В.</span><span class="author-score">Оффер в BigTech</span></div></div>
          <div class="review-card"><p class="review-quote">"Инженерная часть — топ. Наконец-то понял как работают сети."</p><div class="review-author"><span class="author-name">Иван Д.</span><span class="author-score">+45% к ЗП</span></div></div>
          <div class="review-card"><p class="review-quote">"Лучшее вложение времени и средств в этом году."</p><div class="review-author"><span class="author-name">Елена К.</span><span class="author-score">Успешная смена профессии</span></div></div>
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

  renderCourses: () => `
    <div class="page-layout animate-item">
      <aside class="sidebar">
        <div class="sidebar-section">
          <h4 class="sidebar-title">Категория</h4>
          <label class="filter-label"><input type="checkbox"> Инженерная часть</label>
          <label class="filter-label"><input type="checkbox"> Кодинг</label>
          <label class="filter-label"><input type="checkbox"> Inspire</label>
        </div>
        <div class="sidebar-section">
          <h4 class="sidebar-title">Сложность</h4>
          <label class="filter-label"><input type="checkbox"> Beginner</label>
          <label class="filter-label"><input type="checkbox"> Intermediate</label>
          <label class="filter-label"><input type="checkbox"> Advanced</label>
        </div>
        <div class="sidebar-section">
          <h4 class="sidebar-title">Статус</h4>
          <label class="filter-label"><input type="checkbox"> В процессе</label>
          <label class="filter-label"><input type="checkbox"> Завершенные</label>
        </div>
      </aside>
      
      <main class="main-content">
        <h2 class="page-heading">Каталог курсов</h2>
        <div class="catalog-grid">
          <div class="catalog-card">
            <div class="catalog-thumb"></div>
            <div class="catalog-info">
              <h3 class="catalog-title">Инженерная часть</h3>
              <div class="catalog-meta">16 уроков</div>
              <div class="progress-bar-container"><div class="progress-bar" style="width: 45%;"></div></div>
              <a href="#/courses/1" class="btn btn-outline-accent btn-full">Начать</a>
            </div>
          </div>
          <div class="catalog-card">
            <div class="catalog-thumb"></div>
            <div class="catalog-info">
              <h3 class="catalog-title">Кодинг</h3>
              <div class="catalog-meta">20 уроков</div>
              <div class="progress-bar-container"><div class="progress-bar" style="width: 10%;"></div></div>
              <a href="#/courses/2" class="btn btn-outline-accent btn-full">Начать</a>
            </div>
          </div>
          <div class="catalog-card">
            <div class="catalog-thumb"></div>
            <div class="catalog-info">
              <h3 class="catalog-title">Inspire</h3>
              <div class="catalog-meta">16 уроков</div>
              <div class="progress-bar-container"><div class="progress-bar" style="width: 0%;"></div></div>
              <a href="#/courses/3" class="btn btn-outline-accent btn-full">Начать</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,

  renderCourseDetail: () => `
    <div class="course-detail-layout animate-item">
      <aside class="lesson-sidebar">
        <div class="lesson-section">
          <div class="lesson-section-header">1. Основы конструирования</div>
          <div class="lesson-row active">
            <span class="lesson-icon">▶</span>
            <span class="lesson-title">1.1 Введение в FTC kit — TETRIX и REV</span>
            <span class="lesson-duration">12:30</span>
          </div>
          <div class="lesson-row">
            <span class="lesson-icon">📄</span>
            <span class="lesson-title">1.2 Типы дриветрейнов: Tank, Mecanum, Swerve</span>
            <span class="lesson-duration">18:45</span>
          </div>
          <div class="lesson-row">
            <span class="lesson-icon">📄</span>
            <span class="lesson-title">1.3 Выбор дриветрейна под игровой сезон</span>
            <span class="lesson-duration">10:00</span>
          </div>
          <div class="lesson-row">
            <span class="lesson-icon">▶</span>
            <span class="lesson-title">1.4 Основы CAD для FTC (onShape)</span>
            <span class="lesson-duration">25:00</span>
          </div>
        </div>
        <div class="lesson-section">
          <div class="lesson-section-header">2. Манипуляторы и intake</div>
          <div class="lesson-row">
            <span class="lesson-icon">▶</span>
            <span class="lesson-title">2.1 Линейные слайды — конструкция</span>
            <span class="lesson-duration">22:15</span>
          </div>
          <div class="lesson-row">
            <span class="lesson-icon">📄</span>
            <span class="lesson-title">2.2 Intake-системы: ролики, swept intake</span>
            <span class="lesson-duration">15:00</span>
          </div>
        </div>
      </aside>

      <main class="lesson-content">
        <div class="lesson-topbar">
          <div class="breadcrumb">Курсы / Инженерная часть / Основы конструирования</div>
          <h2 class="lesson-heading">1.1 Введение в FTC kit — TETRIX и REV Robotics</h2>
          <div class="progress-bar-container"><div class="progress-bar" style="width: 15%;"></div></div>
        </div>
        <div class="video-placeholder">Видео плеер</div>
        <div class="lesson-text">
          <p>Полный курс по механике FTC-робота. От выбора дриветрейна до финальной инспекции на турнире. В этом уроке мы разберем основные наборы деталей, используемые в FIRST Tech Challenge: TETRIX и REV Robotics.</p>
          <br>
          <h3>REV Robotics</h3>
          <p>Система на основе алюминиевого профиля 15x15мм (extrusion), которая обеспечивает гибкость сборки. Вы можете крепить детали в любой точке профиля...</p>
        </div>
      </main>
    </div>
  `,

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
            <div class="stat-val">45</div>
            <div class="stat-label">Уроков пройдено</div>
          </div>
          <div class="stat-card">
            <div class="stat-val">12</div>
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
                <h3 class="catalog-title">Инженерная часть</h3>
                <div class="progress-bar-container"><div class="progress-bar" style="width: 45%;"></div></div>
                <a href="#/courses/1" class="btn btn-outline-accent btn-full">Продолжить</a>
              </div>
            </div>
            <div class="catalog-card">
              <div class="catalog-info">
                <h3 class="catalog-title">Кодинг</h3>
                <div class="progress-bar-container"><div class="progress-bar" style="width: 10%;"></div></div>
                <a href="#/courses/2" class="btn btn-outline-accent btn-full">Продолжить</a>
              </div>
            </div>
            <div class="catalog-card">
              <div class="catalog-info">
                <h3 class="catalog-title">Inspire</h3>
                <div class="progress-bar-container"><div class="progress-bar" style="width: 30%;"></div></div>
                <a href="#/courses/3" class="btn btn-outline-accent btn-full">Продолжить</a>
              </div>
            </div>
          </div>
        </section>

        <section class="dashboard-section">
          <h3 class="section-title">Мои сертификаты</h3>
          <div class="cert-grid">
            <div class="cert-card locked">
              <div class="cert-icon">🔒</div>
              <div class="cert-name">Сертификат: Инженерная часть FTC</div>
            </div>
            <div class="cert-card locked">
              <div class="cert-icon">🔒</div>
              <div class="cert-name">Сертификат: Кодинг FTC</div>
            </div>
            <div class="cert-card locked">
              <div class="cert-icon">🔒</div>
              <div class="cert-name">Сертификат: Inspire & Portfolio FTC</div>
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
