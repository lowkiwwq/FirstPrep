window.initAnimations = () => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('animate-item')) {
          const children = entry.target.children;
          if (children.length > 1 && !entry.target.classList.contains('hero-container') && !entry.target.classList.contains('nav-container')) {
            Array.from(children).forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * 80);
            });
          }
          entry.target.classList.add('visible');
        }
        obs.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px', threshold: 0.1 });

  document.querySelectorAll('.animate-item').forEach(el => observer.observe(el));

  const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +(entry.target.getAttribute('data-target') || 0);
        const duration = 2000;
        let current = 0;
        const tick = () => {
          current += target / (duration / 16);
          if (current < target) {
            entry.target.innerText = Math.ceil(current).toLocaleString('ru-RU');
            requestAnimationFrame(tick);
          } else {
            entry.target.innerText = target.toLocaleString('ru-RU');
          }
        };
        requestAnimationFrame(tick);
        obs.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px', threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => statsObserver.observe(el));
};

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // Chatbot toggle
  const chatToggle = document.getElementById('chatbot-toggle');
  const chatPanel  = document.getElementById('chatbot-panel');
  const chatClose  = document.getElementById('chatbot-close');
  if (chatToggle && chatPanel && chatClose) {
    chatToggle.addEventListener('click', () => chatPanel.classList.add('open'));
    chatClose.addEventListener('click',  () => chatPanel.classList.remove('open'));
  }

  // Restore auth state in navbar on page load
  updateNavbarAuth();
});
