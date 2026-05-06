window.initAnimations = () => {
  // 1. Staggered fade-in-up animations using IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('animate-item')) {
          const children = entry.target.children;
          if (children.length > 1 && !entry.target.classList.contains('hero-container') && !entry.target.classList.contains('nav-container')) {
             Array.from(children).forEach((child, index) => {
               setTimeout(() => {
                 child.classList.add('visible');
               }, index * 80); 
             });
          }
          entry.target.classList.add('visible');
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedItems = document.querySelectorAll('.animate-item');
  animatedItems.forEach(item => {
    observer.observe(item);
  });

  // 2. CountUp Animation for Stats
  const statsObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetAttr = entry.target.getAttribute('data-target');
        if (!targetAttr) return;
        const target = +targetAttr;
        const duration = 2000; 
        let current = 0;
        
        const updateCounter = () => {
          const increment = target / (duration / 16); 
          if (current < target) {
            current += increment;
            if (current > target) current = target;
            entry.target.innerText = Math.ceil(current).toLocaleString('ru-RU');
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.innerText = target.toLocaleString('ru-RU');
          }
        };

        requestAnimationFrame(updateCounter);
        observer.unobserve(entry.target);
      }
    });
  }, statsObserverOptions);

  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Chatbot Toggle
  const chatToggle = document.getElementById('chatbot-toggle');
  const chatPanel = document.getElementById('chatbot-panel');
  const chatClose = document.getElementById('chatbot-close');

  if (chatToggle && chatPanel && chatClose) {
    chatToggle.addEventListener('click', () => {
      chatPanel.classList.add('open');
    });
    chatClose.addEventListener('click', () => {
      chatPanel.classList.remove('open');
    });
  }
});
