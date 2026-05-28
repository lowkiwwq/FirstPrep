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
};
