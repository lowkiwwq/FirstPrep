window.Auth = {
  getToken() {
    return localStorage.getItem('pf_token');
  },
  getUser() {
    const raw = localStorage.getItem('pf_user');
    try { return raw ? JSON.parse(raw) : null; } catch { return null; }
  },
  setSession(token, user) {
    localStorage.setItem('pf_token', token);
    localStorage.setItem('pf_user', JSON.stringify(user));
  },
  clearSession() {
    localStorage.removeItem('pf_token');
    localStorage.removeItem('pf_user');
  },
  isAuthenticated() {
    return !!this.getToken();
  },
  async login(email, password) {
    const data = await window.apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    this.setSession(data.access_token, data.user);
    if (window.updateNavbarAuth) window.updateNavbarAuth();
    return data;
  },
  async register(name, email, password) {
    const data = await window.apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    this.setSession(data.access_token, data.user);
    if (window.updateNavbarAuth) window.updateNavbarAuth();
    return data;
  },
  async logout() {
    try {
      await window.apiFetch('/auth/logout', { method: 'POST' });
    } catch (e) {
      console.warn("Logout failed on server, clearing session locally", e);
    }
    this.clearSession();
    if (window.updateNavbarAuth) window.updateNavbarAuth();
    window.location.hash = '#/home';
  }
};

window.updateNavbarAuth = function updateNavbarAuth() {
  const navActions = document.querySelector('.nav-actions');
  const mobileNav = document.querySelector('.mobile-nav-links');
  
  if (window.Auth.isAuthenticated()) {
    const user = window.Auth.getUser();
    const displayName = user ? (user.display_name || user.email || 'Кабинет') : 'Кабинет';
    
    if (navActions) {
      const authLink = navActions.querySelector('a.btn');
      if (authLink) {
        authLink.textContent = displayName;
        authLink.href = '#/dashboard';
      }
    }
    if (mobileNav) {
      const authLink = mobileNav.querySelector('a.btn');
      if (authLink) {
        authLink.textContent = displayName;
        authLink.href = '#/dashboard';
      }
    }
  } else {
    if (navActions) {
      const authLink = navActions.querySelector('a.btn');
      if (authLink) {
        authLink.textContent = 'Войти';
        authLink.href = '#/login';
      }
    }
    if (mobileNav) {
      const authLink = mobileNav.querySelector('a.btn');
      if (authLink) {
        authLink.textContent = 'Войти';
        authLink.href = '#/login';
      }
    }
  }
};

window.handleLoginSubmit = async function handleLoginSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;
  const btn = form.querySelector('button[type="submit"]');
  
  let errorDiv = form.querySelector('.auth-error');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'auth-error';
    errorDiv.style.color = '#ff4d4d';
    errorDiv.style.marginTop = '12px';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.fontFamily = 'var(--font-body)';
    errorDiv.style.textAlign = 'center';
    form.appendChild(errorDiv);
  }

  btn.disabled = true;
  const originalText = btn.textContent;
  btn.textContent = 'Вход...';
  errorDiv.textContent = '';

  try {
    await window.Auth.login(email, password);
    window.location.hash = '#/dashboard';
  } catch (err) {
    errorDiv.textContent = err.detail || 'Неверный email или пароль';
    btn.disabled = false;
    btn.textContent = originalText;
  }
};

window.handleRegisterSubmit = async function handleRegisterSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const password = form.querySelector('input[type="password"]').value;
  const btn = form.querySelector('button[type="submit"]');
  
  let errorDiv = form.querySelector('.auth-error');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'auth-error';
    errorDiv.style.color = '#ff4d4d';
    errorDiv.style.marginTop = '12px';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.fontFamily = 'var(--font-body)';
    errorDiv.style.textAlign = 'center';
    form.appendChild(errorDiv);
  }

  btn.disabled = true;
  const originalText = btn.textContent;
  btn.textContent = 'Создание аккаунта...';
  errorDiv.textContent = '';

  try {
    await window.Auth.register(name, email, password);
    window.location.hash = '#/dashboard';
  } catch (err) {
    errorDiv.textContent = err.detail || 'Ошибка регистрации. Возможно, этот email уже занят.';
    btn.disabled = false;
    btn.textContent = originalText;
  }
};
