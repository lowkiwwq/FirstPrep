document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app-view');

  const PROTECTED = ['/dashboard', '/tests', '/tests/interface', '/courses', '/courses/1', '/courses/2', '/courses/3'];

  function matchRoute(hash) {
    if (hash === '/' || hash === '/home') return [AppViews.renderHome, {}];
    if (hash === '/courses')             return [AppViews.renderCourses, {}];
    if (hash === '/tests')               return [AppViews.renderTests, {}];
    if (hash === '/login')               return [AppViews.renderLogin, {}];
    if (hash === '/register')            return [AppViews.renderRegister, {}];
    if (hash === '/dashboard')           return [AppViews.renderDashboard, {}];

    let m;
    m = hash.match(/^\/courses\/(\d+)$/);
    if (m) return [AppViews.renderCourseDetail, { courseId: parseInt(m[1]) }];

    m = hash.match(/^\/tests\/(\d+)\/interface$/);
    if (m) return [AppViews.renderTestInterface, { testId: parseInt(m[1]) }];

    // legacy static route kept for safety
    if (hash === '/tests/interface') return [AppViews.renderTestInterface, { testId: 1 }];

    return [AppViews.renderHome, {}];
  }

  function isProtected(hash) {
    if (PROTECTED.includes(hash)) return true;
    if (/^\/courses\/\d+$/.test(hash)) return true;
    if (/^\/tests\/\d+\/interface$/.test(hash)) return true;
    return false;
  }

  let cleanupAntigravity = null;

  async function router() {
    let hash = location.hash.slice(1) || '/';
    if (hash !== '/' && hash.endsWith('/')) hash = hash.slice(0, -1);

    // Stop any running test timer
    if (window._testTimer) { clearInterval(window._testTimer); window._testTimer = null; }

    // Auth guard
    if (isProtected(hash) && !Auth.isAuthenticated()) {
      location.hash = '#/login';
      return;
    }

    if (cleanupAntigravity) { cleanupAntigravity(); cleanupAntigravity = null; }

    const [renderFunc, params] = matchRoute(hash);

    // Show loading placeholder while async view fetches
    appContainer.innerHTML = '<div style="min-height:60vh;display:flex;align-items:center;justify-content:center;color:var(--text-secondary);font-family:var(--font-mono);font-size:13px;">Загрузка...</div>';

    appContainer.innerHTML = await renderFunc(params);

    if (window.initAnimations) window.initAnimations();

    if ((hash === '/' || hash === '/home') && window.initAntigravity) {
      cleanupAntigravity = window.initAntigravity('antigravity-container');
    }

    // Wire test interface after render
    if (/^\/tests\/\d+\/interface$/.test(hash) || hash === '/tests/interface') {
      if (window.testState?.questions?.length) {
        window.renderQuestion();
        _startTestTimer();
      }
    }

    // Wire login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const errEl = document.getElementById('auth-error');
        const btn = document.getElementById('login-submit');
        btn.disabled = true; btn.textContent = 'Вход...';
        errEl.textContent = '';
        try {
          const data = await apiFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify({
              email: document.getElementById('login-email').value,
              password: document.getElementById('login-password').value,
            }),
          });
          Auth.setSession(data.access_token, data.user);
          updateNavbarAuth();
          location.hash = '#/dashboard';
        } catch (err) {
          errEl.textContent = err.detail || 'Неверный email или пароль';
          btn.disabled = false; btn.textContent = 'Войти';
        }
      });
    }

    // Wire register form
    const regForm = document.getElementById('register-form');
    if (regForm) {
      regForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const errEl = document.getElementById('auth-error');
        const btn = document.getElementById('reg-submit');
        btn.disabled = true; btn.textContent = 'Создание аккаунта...';
        errEl.textContent = '';
        try {
          const data = await apiFetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify({
              name: document.getElementById('reg-name').value,
              email: document.getElementById('reg-email').value,
              password: document.getElementById('reg-password').value,
            }),
          });
          Auth.setSession(data.access_token, data.user);
          updateNavbarAuth();
          location.hash = '#/dashboard';
        } catch (err) {
          errEl.textContent = err.detail || 'Ошибка регистрации. Попробуйте снова.';
          btn.disabled = false; btn.textContent = 'Создать аккаунт';
        }
      });
    }

    updateActiveNav(hash);
    window.scrollTo(0, 0);
  }

  function _startTestTimer() {
    const s = window.testState;
    if (!s) return;
    window._testTimer = setInterval(() => {
      s.timeLeft--;
      const timerEl = document.getElementById('test-timer');
      if (timerEl) {
        const m = Math.floor(s.timeLeft / 60);
        const sec = s.timeLeft % 60;
        timerEl.textContent = `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
        if (s.timeLeft <= 30) timerEl.style.color = '#ff4757';
      }
      if (s.timeLeft <= 0) {
        clearInterval(window._testTimer);
        window._testTimer = null;
        window.submitTest();
      }
    }, 1000);
  }

  function updateActiveNav(hash) {
    document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
      const href = link.getAttribute('href')?.slice(1) || '';
      const isActive = (href !== '/' && hash.startsWith(href)) || href === hash;
      link.classList.toggle('active', isActive);
    });
  }

  window.addEventListener('hashchange', router);
  router();
});

// Called by main.js and auth forms after session changes
function updateNavbarAuth() {
  const user = Auth.getUser();
  const actionsEl = document.querySelector('.nav-actions');
  if (!actionsEl) return;

  // Preserve hamburger button
  const hamburger = actionsEl.querySelector('.hamburger-btn');

  if (user) {
    actionsEl.innerHTML = `
      <span style="font-size:14px;color:var(--text-secondary);font-family:var(--font-mono);">${escHtml(user.display_name || user.email)}</span>
      <button class="btn btn-outline" onclick="window.logout()" style="margin-left:12px;">Выйти</button>
    `;
    if (hamburger) actionsEl.appendChild(hamburger);
  } else {
    actionsEl.innerHTML = `<a href="#/login" class="btn btn-outline-accent">Войти</a>`;
    if (hamburger) actionsEl.appendChild(hamburger);
  }
}

window.logout = async function () {
  try { await apiFetch('/auth/logout', { method: 'POST' }); } catch { /* ignore */ }
  Auth.clearSession();
  updateNavbarAuth();
  location.hash = '#/home';
};
