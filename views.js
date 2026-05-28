window.AppViews = {

  // ── Home ──────────────────────────────────────────────────────────────────
  renderHome: async () => `
    <header class="hero" style="position:relative;overflow:hidden;">
      <div id="antigravity-container" style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:0;pointer-events:none;"></div>
      <div class="hero-container animate-item" style="position:relative;z-index:1;">
        <div class="hero-content-wrapper">
          <h1 class="hero-title">
            <span class="hero-line1" style="color:white;">Собери. Запрограммируй.</span>
            <span class="hero-line2" style="background:linear-gradient(to right,#FF4D1C,#FF2D6B);-webkit-background-clip:text;color:transparent;">Победи на FTC.</span>
          </h1>
          <div class="hero-stats" style="font-family:'DM Mono',monospace;">
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
        <p class="footer-desc" style="color:rgba(255,255,255,0.7);margin-bottom:2rem;">Присоединяйся к Phoenix Forge и начни свой путь к World Championship</p>
        <a href="#/register" class="btn btn-primary">Начать бесплатно</a>
        <p class="footer-legal">© 2026 Phoenix Forge. Все права защищены.</p>
      </div>
    </footer>
  `,

  // ── Courses catalog ───────────────────────────────────────────────────────
  renderCourses: async () => {
    let courses = [];
    try {
      courses = await apiFetch('/courses');
    } catch {
      return `<div class="page-layout"><p style="color:var(--text-secondary);padding:40px 0;">Ошибка загрузки. Убедитесь, что backend запущен на порту 8000.</p></div>`;
    }

    const cards = courses.map(c => `
      <div class="catalog-card">
        <div class="catalog-thumb"></div>
        <div class="catalog-info">
          <h3 class="catalog-title">${escHtml(c.title)}</h3>
          <div class="catalog-meta">${c.total_lessons} уроков</div>
          <div class="progress-bar-container"><div class="progress-bar" style="width:${c.progress_pct}%;"></div></div>
          <a href="#/courses/${c.id}" class="btn btn-outline-accent btn-full">Начать</a>
        </div>
      </div>
    `).join('');

    return `
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
            <label class="filter-label"><input type="checkbox"> Завершённые</label>
          </div>
        </aside>
        <main class="main-content">
          <h2 class="page-heading">Каталог курсов</h2>
          <div class="catalog-grid">${cards}</div>
        </main>
      </div>
    `;
  },

  // ── Course detail ─────────────────────────────────────────────────────────
  renderCourseDetail: async ({ courseId }) => {
    let course;
    try {
      course = await apiFetch(`/courses/${courseId}`);
    } catch {
      return `<div class="page-layout"><p style="color:var(--text-secondary);padding:40px 0;">Курс не найден.</p></div>`;
    }

    const sidebarHTML = course.sections.map(sec => {
      const header = sec.section_num + '. ' + (sec.lessons[0]
        ? sec.lessons[0].title.replace(/^\d+\.\d+\s+/, '').split(/[—–:]/)[0].trim()
        : '');
      const rows = sec.lessons.map(l => `
        <div class="lesson-row ${l.completed ? 'completed' : ''}" data-lesson-id="${l.id}"
             onclick="window.loadLesson(${l.id}, ${courseId})">
          <span class="lesson-icon">${l.type === 'video' ? '▶' : '📄'}</span>
          <span class="lesson-title">${escHtml(l.title)}</span>
          <span class="lesson-duration">${fmtDuration(l.duration_sec)}</span>
        </div>
      `).join('');
      return `<div class="lesson-section"><div class="lesson-section-header">${escHtml(header)}</div>${rows}</div>`;
    }).join('');

    const firstLesson = course.sections[0]?.lessons[0];
    const contentHTML = firstLesson
      ? _lessonHTML(firstLesson, course.title, course.progress_pct)
      : '<p style="padding:40px;color:var(--text-secondary);">Уроки скоро появятся.</p>';

    // Mark first lesson active after render
    if (firstLesson) {
      setTimeout(() => {
        document.querySelector(`[data-lesson-id="${firstLesson.id}"]`)?.classList.add('active');
      }, 0);
    }

    return `
      <div class="course-detail-layout animate-item">
        <aside class="lesson-sidebar">${sidebarHTML}</aside>
        <main class="lesson-content" id="lesson-content-area">${contentHTML}</main>
      </div>
    `;
  },

  // ── Tests list ────────────────────────────────────────────────────────────
  renderTests: async () => {
    let tests = [];
    try {
      tests = await apiFetch('/tests');
    } catch {
      return `<div class="page-layout"><p style="color:var(--text-secondary);padding:40px 0;">Ошибка загрузки тестов.</p></div>`;
    }

    const statusCfg = {
      passed:      { badge: 'badge-success', label: 'Пройден',  btn: `<a href="#/tests" class="btn btn-outline btn-full">Результаты</a>` },
      available:   { badge: 'badge-accent',  label: 'Доступен', btn: null },
      failed:      { badge: 'badge-error',   label: 'Не сдан',  btn: `<button class="btn btn-outline btn-full" disabled>Нет попыток</button>` },
      unavailable: { badge: 'badge-neutral', label: 'Скоро',    btn: `<button class="btn btn-outline btn-full" disabled>Недоступен</button>` },
    };

    const cards = tests.map(t => {
      const cfg = statusCfg[t.user_status] || statusCfg.unavailable;
      const btn = t.user_status === 'available'
        ? `<a href="#/tests/${t.id}/interface" class="btn btn-primary btn-full">Начать тест</a>`
        : cfg.btn;
      return `
        <div class="test-card">
          <div class="test-header">
            <h3 class="test-title">${escHtml(t.title)}</h3>
            <span class="badge ${cfg.badge}">${cfg.label}</span>
          </div>
          <div class="test-meta">
            <span>Время: ${t.time_limit_min} мин</span>
            <span>Попыток: ${t.attempts_used}/${t.max_attempts}</span>
          </div>
          ${btn || ''}
        </div>
      `;
    }).join('');

    return `
      <div class="page-layout animate-item">
        <main class="main-content full-width">
          <h2 class="page-heading">Доступные тесты</h2>
          <div class="tests-grid">${cards}</div>
        </main>
      </div>
    `;
  },

  // ── Test interface ────────────────────────────────────────────────────────
  renderTestInterface: async ({ testId }) => {
    let data;
    try {
      data = await apiFetch(`/tests/${testId}/questions`);
    } catch (e) {
      return `
        <div class="test-interface animate-item">
          <div class="test-question-card" style="text-align:center;padding:60px 40px;">
            <h2 class="test-question" style="font-size:20px;">${escHtml(e.detail || 'Тест недоступен')}</h2>
            <a href="#/tests" class="btn btn-primary" style="margin-top:24px;">Назад к тестам</a>
          </div>
        </div>`;
    }

    window.testState = {
      testId,
      questions: data.questions,
      currentIndex: 0,
      answers: {},
      timeLeft: data.test.time_limit_min * 60,
    };

    const mins = String(data.test.time_limit_min).padStart(2, '0');
    return `
      <div class="test-interface animate-item">
        <div class="test-topbar">
          <div class="test-progress" id="test-progress">Вопрос 1 из ${data.questions.length}</div>
          <div class="test-timer" id="test-timer">${mins}:00</div>
          <a href="#/tests" class="btn btn-outline">Выйти</a>
        </div>
        <div class="test-question-card">
          <h2 class="test-question" id="test-question-text"></h2>
          <div class="test-options" id="test-options"></div>
        </div>
        <div class="test-bottombar">
          <button class="btn btn-outline" onclick="window.testNav(-1)">Назад</button>
          <div class="test-dots" id="test-dots"></div>
          <button class="btn btn-primary" id="test-next-btn">Вперед</button>
        </div>
      </div>
    `;
  },

  // ── Login ─────────────────────────────────────────────────────────────────
  renderLogin: async () => `
    <div class="auth-wrapper animate-item">
      <div class="auth-card">
        <div class="auth-logo"><span class="logo-accent" style="color:#FF4D1C;">P</span>hoenix Forge</div>
        <h2 class="auth-heading">Вход в аккаунт</h2>
        <form class="auth-form" id="login-form">
          <div class="input-group">
            <label>Email</label>
            <input type="email" id="login-email" placeholder="student@example.com" required>
          </div>
          <div class="input-group">
            <label>Пароль</label>
            <input type="password" id="login-password" placeholder="••••••••" required>
          </div>
          <p id="auth-error" style="color:#ff4757;font-size:13px;min-height:18px;"></p>
          <button type="submit" id="login-submit" class="btn btn-primary btn-full">Войти</button>
        </form>
        <div class="auth-footer">Нет аккаунта? <a href="#/register">Зарегистрироваться</a></div>
      </div>
    </div>
  `,

  // ── Register ──────────────────────────────────────────────────────────────
  renderRegister: async () => `
    <div class="auth-wrapper animate-item">
      <div class="auth-card">
        <div class="auth-logo"><span class="logo-accent" style="color:#FF4D1C;">P</span>hoenix Forge</div>
        <h2 class="auth-heading">Регистрация</h2>
        <form class="auth-form" id="register-form">
          <div class="input-group">
            <label>Имя</label>
            <input type="text" id="reg-name" placeholder="Иван Иванов" required>
          </div>
          <div class="input-group">
            <label>Email</label>
            <input type="email" id="reg-email" placeholder="student@example.com" required>
          </div>
          <div class="input-group">
            <label>Пароль</label>
            <input type="password" id="reg-password" placeholder="••••••••" required minlength="6">
          </div>
          <p id="auth-error" style="color:#ff4757;font-size:13px;min-height:18px;"></p>
          <button type="submit" id="reg-submit" class="btn btn-primary btn-full">Создать аккаунт</button>
        </form>
        <div class="auth-footer">Уже есть аккаунт? <a href="#/login">Войти</a></div>
      </div>
    </div>
  `,

  // ── Dashboard ─────────────────────────────────────────────────────────────
  renderDashboard: async () => {
    let data;
    try {
      data = await apiFetch('/dashboard');
    } catch (e) {
      if (e.status === 401) { window.location.hash = '#/login'; return ''; }
      return `<div class="page-layout"><p style="color:var(--text-secondary);padding:40px 0;">Ошибка загрузки.</p></div>`;
    }

    const courseCards = data.course_progress.map(c => `
      <div class="catalog-card">
        <div class="catalog-info">
          <h3 class="catalog-title">${escHtml(c.title)}</h3>
          <div class="progress-bar-container"><div class="progress-bar" style="width:${c.progress_pct}%;"></div></div>
          <a href="#/courses/${c.id}" class="btn btn-outline-accent btn-full">Продолжить</a>
        </div>
      </div>
    `).join('');

    const certCards = data.certificates.map(c => `
      <div class="cert-card ${c.earned ? '' : 'locked'}">
        <div class="cert-icon">${c.earned ? '🏆' : '🔒'}</div>
        <div class="cert-name" ${c.earned ? 'style="color:var(--accent);"' : ''}>${escHtml(c.name)}</div>
      </div>
    `).join('');

    const attemptsRows = data.recent_attempts.length
      ? data.recent_attempts.map(a => `
          <tr>
            <td>${escHtml(a.test_title)}</td>
            <td>${fmtDate(a.completed_at)}</td>
            <td>${a.score_pct}%</td>
            <td><span class="badge ${a.passed ? 'badge-success' : 'badge-error'}">${a.passed ? 'Сдан' : 'Не сдан'}</span></td>
          </tr>`).join('')
      : `<tr><td colspan="4" style="color:var(--text-secondary);text-align:center;padding:24px;">Тестов ещё не сдано</td></tr>`;

    return `
      <div class="page-layout dashboard-layout animate-item">
        <main class="main-content full-width">
          <h2 class="dashboard-greeting">Привет, ${escHtml(data.display_name)}! 👋</h2>

          <div class="dashboard-stats">
            <div class="stat-card"><div class="stat-val">${data.lessons_completed}</div><div class="stat-label">Уроков пройдено</div></div>
            <div class="stat-card"><div class="stat-val">${data.tests_passed}</div><div class="stat-label">Тестов сдано</div></div>
            <div class="stat-card"><div class="stat-val accent">${data.days_in_platform} 🔥</div><div class="stat-label">Дней в Phoenix Forge</div></div>
          </div>

          <section class="dashboard-section">
            <h3 class="section-title">Продолжить обучение</h3>
            <div class="courses-grid" style="grid-template-columns:repeat(3,1fr);gap:24px;">${courseCards}</div>
          </section>

          <section class="dashboard-section">
            <h3 class="section-title">Мои сертификаты</h3>
            <div class="cert-grid">${certCards}</div>
          </section>

          <section class="dashboard-section">
            <h3 class="section-title">История тестов</h3>
            <div class="table-container">
              <table class="history-table">
                <thead><tr><th>Тест</th><th>Дата</th><th>Результат</th><th>Статус</th></tr></thead>
                <tbody>${attemptsRows}</tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    `;
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Internal: lesson content block (reused by renderCourseDetail + loadLesson)
// ─────────────────────────────────────────────────────────────────────────────
function _lessonHTML(lesson, courseTitle, progressPct) {
  const videoBlock = lesson.youtube_id
    ? `<div class="video-placeholder" style="padding:0;background:#000;">
         <iframe width="100%" height="100%"
           src="https://www.youtube.com/embed/${escHtml(lesson.youtube_id)}"
           frameborder="0"
           allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
           allowfullscreen></iframe>
       </div>`
    : `<div class="video-placeholder">Видео недоступно</div>`;

  const body = (lesson.content_text || '')
    .replace(/## (.+)/g, '<h3>$1</h3>')
    .replace(/\n/g, '<br>');

  const actionBlock = lesson.completed
    ? `<div style="color:var(--accent);margin-top:24px;font-size:14px;font-weight:500;">✓ Урок завершён</div>`
    : `<button class="btn btn-primary" style="margin-top:24px;"
         onclick="window.completeLesson(${lesson.id}, this)">Отметить урок завершённым</button>`;

  return `
    <div class="lesson-topbar">
      <div class="breadcrumb">${escHtml(courseTitle)}</div>
      <h2 class="lesson-heading">${escHtml(lesson.title)}</h2>
      <div class="progress-bar-container"><div class="progress-bar" style="width:${progressPct}%;"></div></div>
    </div>
    ${videoBlock}
    <div class="lesson-text">${body}</div>
    ${actionBlock}
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// Global helpers (called from inline onclick / router)
// ─────────────────────────────────────────────────────────────────────────────
window.loadLesson = async function (lessonId, courseId) {
  document.querySelectorAll('.lesson-row').forEach(r =>
    r.classList.toggle('active', parseInt(r.dataset.lessonId) === lessonId)
  );
  const area = document.getElementById('lesson-content-area');
  if (!area) return;
  area.innerHTML = '<div style="padding:40px;color:var(--text-secondary);">Загрузка...</div>';
  try {
    const [lesson, course] = await Promise.all([
      apiFetch(`/lessons/${lessonId}`),
      apiFetch(`/courses/${courseId}`),
    ]);
    area.innerHTML = _lessonHTML(lesson, course.title, course.progress_pct);
  } catch {
    area.innerHTML = '<div style="padding:40px;color:var(--text-secondary);">Ошибка загрузки урока.</div>';
  }
};

window.completeLesson = async function (lessonId, btn) {
  try {
    const result = await apiFetch(`/lessons/${lessonId}/complete`, { method: 'POST' });
    btn.outerHTML = `<div style="color:var(--accent);margin-top:24px;font-size:14px;font-weight:500;">✓ Урок завершён</div>`;
    document.querySelectorAll('.lesson-row').forEach(r => {
      if (parseInt(r.dataset.lessonId) === lessonId) r.classList.add('completed');
    });
    document.querySelectorAll('.progress-bar').forEach(pb => {
      pb.style.width = result.progress_pct + '%';
    });
  } catch {
    alert('Не удалось отметить урок. Попробуйте снова.');
  }
};

window.testNav = function (dir) {
  const s = window.testState;
  if (!s) return;
  const next = s.currentIndex + dir;
  if (next < 0 || next >= s.questions.length) return;
  s.currentIndex = next;
  window.renderQuestion();
};

window.selectOption = function (questionId, optionId, el) {
  window.testState.answers[questionId] = optionId;
  document.querySelectorAll('.test-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
};

window.submitTest = async function () {
  const s = window.testState;
  if (window._testTimer) { clearInterval(window._testTimer); window._testTimer = null; }
  const answers = Object.entries(s.answers).map(([qid, oid]) => ({
    question_id: parseInt(qid),
    option_id: parseInt(oid),
  }));
  try {
    const result = await apiFetch(`/tests/${s.testId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
    const iface = document.querySelector('.test-interface');
    if (iface) {
      iface.innerHTML = `
        <div class="test-question-card" style="text-align:center;padding:60px 40px;">
          <h2 class="test-question" style="font-size:48px;margin-bottom:16px;">${result.score_pct}%</h2>
          <p style="font-size:20px;color:${result.passed ? '#2ed573' : '#ff4757'};margin-bottom:12px;">
            ${result.passed ? '✓ Тест сдан!' : '✗ Тест не сдан'}
          </p>
          <p style="color:var(--text-secondary);margin-bottom:32px;">
            Правильных ответов: ${result.correct} из ${result.total}
          </p>
          <a href="#/tests" class="btn btn-primary">Назад к тестам</a>
        </div>`;
    }
  } catch (e) {
    alert('Ошибка при отправке: ' + (e.detail || 'Попробуйте снова'));
  }
};

window.renderQuestion = function () {
  const s = window.testState;
  if (!s) return;
  const q = s.questions[s.currentIndex];
  const total = s.questions.length;

  const prog = document.getElementById('test-progress');
  if (prog) prog.textContent = `Вопрос ${s.currentIndex + 1} из ${total}`;

  const qEl = document.getElementById('test-question-text');
  if (qEl) qEl.textContent = q.question_text;

  const optsEl = document.getElementById('test-options');
  if (optsEl) {
    optsEl.innerHTML = q.options.map(opt => `
      <div class="test-option ${s.answers[q.id] === opt.id ? 'selected' : ''}"
           onclick="window.selectOption(${q.id}, ${opt.id}, this)">
        ${escHtml(opt.option_text)}
      </div>`).join('');
  }

  const dotsEl = document.getElementById('test-dots');
  if (dotsEl) {
    dotsEl.innerHTML = s.questions.map((_, i) =>
      `<span class="dot ${i === s.currentIndex ? 'active' : ''}"></span>`
    ).join('');
  }

  const nextBtn = document.getElementById('test-next-btn');
  if (nextBtn) {
    const isLast = s.currentIndex === total - 1;
    nextBtn.textContent = isLast ? 'Отправить' : 'Вперед';
    nextBtn.onclick = isLast ? window.submitTest : () => window.testNav(1);
  }
};
