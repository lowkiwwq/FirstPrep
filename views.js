window.AppViews = {
  renderHome: () => `
    <header class="hero">
      <div class="hero-container animate-item">
        <div class="hero-content-wrapper">
          <h1 class="hero-title">
          <span class="hero-line1">Твой первый шаг</span>
          <span class="hero-line2">в мир IT-индустрии</span>
        </h1>
        <div class="hero-stats">
          <div class="stat-item"><span class="stat-number" data-target="12400">0</span>+ студентов</div>
          <div class="stat-divider"></div>
          <div class="stat-item"><span class="stat-number" data-target="3">0</span> курса</div>
          <div class="stat-divider"></div>
          <div class="stat-item"><span class="stat-number" data-target="98">0</span>% сдач</div>
        </div>
        <div class="hero-buttons">
          <a href="#/courses" class="btn btn-primary">Выбрать курс</a>
          <a href="#/features" class="btn btn-outline">Подробнее</a>
        </div>
        </div>
        <img src="phoenix_transparent.png?v=2" alt="Phoenix" class="hero-phoenix-img">
      </div>
    </header>

    <section id="features" class="features">
      <div class="feature-container">
        <div class="feature-row animate-item">
          <div class="feature-content">
            <div class="feature-eyebrow">Структура</div>
            <h2 class="feature-title">Понятный путь от нуля до оффера</h2>
            <p class="feature-desc">Мы разбили сложный процесс обучения на простые и понятные этапы. Никакой воды — только те знания, которые реально проверяют на собеседованиях.</p>
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
            <div class="feature-eyebrow">Практика</div>
            <h2 class="feature-title">Реальные задачи из индустрии</h2>
            <p class="feature-desc">Оставьте скучные академические задачи в прошлом. Вы будете писать код, который решает настоящие проблемы бизнеса, работая в среде, приближенной к реальной.</p>
          </div>
        </div>
        <div class="feature-row animate-item">
          <div class="feature-content">
            <div class="feature-eyebrow">Поддержка</div>
            <h2 class="feature-title">Менторы, которые работают в BigTech</h2>
            <p class="feature-desc">Наши преподаватели — это действующие разработчики из ведущих компаний. Они не просто проверяют домашние задания, а учат мыслить как инженер.</p>
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
            <div class="course-tag">First</div>
            <h3 class="course-title">Инженерная часть</h3>
            <p class="course-desc">Архитектура, базы данных, сети и алгоритмы. Фундамент, необходимый каждому разработчику.</p>
          </a>
          <a href="#/courses/2" class="course-card">
            <div class="course-tag">First</div>
            <h3 class="course-title">Кодинг</h3>
            <p class="course-desc">Практическое программирование. От чистого кода до сложных паттернов проектирования.</p>
          </a>
          <a href="#/courses/3" class="course-card">
            <div class="course-tag">First</div>
            <h3 class="course-title">Inspire</h3>
            <p class="course-desc">Soft skills, прохождение собеседований и построение карьеры в IT-индустрии.</p>
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
        <h2 class="footer-title">Готов начать?</h2>
        <a href="#/register" class="btn btn-primary">Присоединиться к потоку</a>
        <p class="footer-legal">© 2026 FirstPrep. Все права защищены.</p>
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
              <h3 class="catalog-title">Алгоритмы и структуры данных</h3>
              <div class="catalog-meta">12 модулей</div>
              <div class="progress-bar-container"><div class="progress-bar" style="width: 45%;"></div></div>
              <a href="#/courses/1" class="btn btn-outline-accent btn-full">Начать</a>
            </div>
          </div>
          <div class="catalog-card">
            <div class="catalog-thumb"></div>
            <div class="catalog-info">
              <h3 class="catalog-title">Системный дизайн</h3>
              <div class="catalog-meta">8 модулей</div>
              <div class="progress-bar-container"><div class="progress-bar" style="width: 10%;"></div></div>
              <a href="#/courses/2" class="btn btn-outline-accent btn-full">Начать</a>
            </div>
          </div>
          <div class="catalog-card">
            <div class="catalog-thumb"></div>
            <div class="catalog-info">
              <h3 class="catalog-title">React под капотом</h3>
              <div class="catalog-meta">15 модулей</div>
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
          <div class="lesson-section-header">1. Введение в алгоритмы</div>
          <div class="lesson-row completed">
            <span class="lesson-icon">✓</span>
            <span class="lesson-title">Что такое О-большое</span>
            <span class="lesson-duration">12:30</span>
          </div>
          <div class="lesson-row active">
            <span class="lesson-icon">▶</span>
            <span class="lesson-title">Массивы и связные списки</span>
            <span class="lesson-duration">18:45</span>
          </div>
          <div class="lesson-row">
            <span class="lesson-icon">📄</span>
            <span class="lesson-title">Стек и очередь</span>
            <span class="lesson-duration">10:00</span>
          </div>
        </div>
        <div class="lesson-section">
          <div class="lesson-section-header">2. Сортировки</div>
          <div class="lesson-row">
            <span class="lesson-icon">▶</span>
            <span class="lesson-title">Пузырьком и выбором</span>
            <span class="lesson-duration">22:15</span>
          </div>
          <div class="lesson-row">
            <span class="lesson-icon">▶</span>
            <span class="lesson-title">Быстрая сортировка</span>
            <span class="lesson-duration">25:00</span>
          </div>
        </div>
      </aside>

      <main class="lesson-content">
        <div class="lesson-topbar">
          <div class="breadcrumb">Курсы / Инженерная часть / Алгоритмы и структуры данных</div>
          <h2 class="lesson-heading">Массивы и связные списки</h2>
          <div class="progress-bar-container"><div class="progress-bar" style="width: 15%;"></div></div>
        </div>
        <div class="video-placeholder">Видео плеер</div>
        <div class="lesson-text">
          <p>В этом уроке мы разберем две базовые структуры данных: массивы и связные списки. Мы обсудим, как они хранятся в памяти, и почему время доступа к элементам в них отличается.</p>
          <br>
          <h3>Массивы</h3>
          <p>Массивы представляют собой непрерывный блок памяти. Это позволяет получать доступ к любому элементу за O(1)...</p>
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
              <h3 class="test-title">Основы сетей</h3>
              <span class="badge badge-success">Пройден</span>
            </div>
            <div class="test-meta">
              <span>Вопросов: 20</span>
              <span>Время: 30 мин</span>
              <span>Попыток: 0/2</span>
            </div>
            <a href="#/tests/interface" class="btn btn-outline btn-full disabled">Результаты</a>
          </div>
          <div class="test-card">
            <div class="test-header">
              <h3 class="test-title">Базы данных (SQL)</h3>
              <span class="badge badge-accent">Доступен</span>
            </div>
            <div class="test-meta">
              <span>Вопросов: 15</span>
              <span>Время: 25 мин</span>
              <span>Попыток: 2/2</span>
            </div>
            <a href="#/tests/interface" class="btn btn-primary btn-full">Начать тест</a>
          </div>
          <div class="test-card">
            <div class="test-header">
              <h3 class="test-title">Архитектура ПО</h3>
              <span class="badge badge-neutral">Скоро</span>
            </div>
            <div class="test-meta">
              <span>Вопросов: 30</span>
              <span>Время: 45 мин</span>
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
        <h2 class="test-question">Что означает ACID в контексте баз данных?</h2>
        <div class="test-options">
          <div class="test-option">Atomicity, Consistency, Isolation, Durability</div>
          <div class="test-option">Availability, Consistency, Isolation, Durability</div>
          <div class="test-option">Atomicity, Concurrency, Isolation, Distribution</div>
          <div class="test-option">Asynchronous, Consistent, Indexed, Dynamic</div>
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
        <div class="auth-logo"><span class="logo-accent">F</span>irstPrep</div>
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
        <div class="auth-logo"><span class="logo-accent">F</span>irstPrep</div>
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
            <div class="stat-val">3</div>
            <div class="stat-label">Курса начато</div>
          </div>
          <div class="stat-card">
            <div class="stat-val">12</div>
            <div class="stat-label">Тестов пройдено</div>
          </div>
          <div class="stat-card">
            <div class="stat-val accent">5 🔥</div>
            <div class="stat-label">Дней подряд</div>
          </div>
        </div>

        <section class="dashboard-section">
          <h3 class="section-title">Продолжить обучение</h3>
          <div class="courses-grid" style="grid-template-columns: repeat(2, 1fr); gap: 24px;">
            <div class="catalog-card">
              <div class="catalog-info">
                <h3 class="catalog-title">Алгоритмы и структуры данных</h3>
                <div class="progress-bar-container"><div class="progress-bar" style="width: 45%;"></div></div>
                <a href="#/courses/1" class="btn btn-outline-accent btn-full">Продолжить</a>
              </div>
            </div>
            <div class="catalog-card">
              <div class="catalog-info">
                <h3 class="catalog-title">Системный дизайн</h3>
                <div class="progress-bar-container"><div class="progress-bar" style="width: 10%;"></div></div>
                <a href="#/courses/2" class="btn btn-outline-accent btn-full">Продолжить</a>
              </div>
            </div>
          </div>
        </section>

        <section class="dashboard-section">
          <h3 class="section-title">Мои сертификаты</h3>
          <div class="cert-grid">
            <div class="cert-card locked">
              <div class="cert-icon">🔒</div>
              <div class="cert-name">Инженерная часть</div>
            </div>
            <div class="cert-card locked">
              <div class="cert-icon">🔒</div>
              <div class="cert-name">Кодинг</div>
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
                  <td>Основы сетей</td>
                  <td>12.04.2026</td>
                  <td>95%</td>
                  <td><span class="badge badge-success">Сдан</span></td>
                </tr>
                <tr>
                  <td>Linux & Bash</td>
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
