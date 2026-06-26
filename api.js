const API_BASE = 'https://ttc-robotics-production.up.railway.app';
window.API_BASE = API_BASE;

window.apiFetch = async function apiFetch(path, options = {}) {
  const token = window.Auth ? window.Auth.getToken() : null;
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = 'Bearer ' + token;

  let res;
  try {
    res = await fetch(API_BASE + path, {
      ...options,
      headers: { ...headers, ...(options.headers || {}) },
    });
  } catch (networkErr) {
    throw { detail: 'Не удалось подключиться к серверу. Запустите backend.' };
  }

  if (!res.ok) {
    let err;
    try { err = await res.json(); } catch { err = { detail: res.statusText }; }
    err.status = res.status;
    throw err;
  }

  return res.json();
};

window.escHtml = function escHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

window.fmtDuration = function fmtDuration(sec) {
  const m = Math.floor((sec || 0) / 60);
  const s = (sec || 0) % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
};

window.fmtDate = function fmtDate(isoStr) {
  if (!isoStr) return '';
  return new Date(isoStr).toLocaleDateString('ru-RU');
};
