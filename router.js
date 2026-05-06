document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app-view');

  const routes = {
    '/': AppViews.renderHome,
    '/home': AppViews.renderHome,
    '/courses': AppViews.renderCourses,
    '/courses/1': AppViews.renderCourseDetail,
    '/courses/2': AppViews.renderCourseDetail,
    '/courses/3': AppViews.renderCourseDetail,
    '/tests': AppViews.renderTests,
    '/tests/interface': AppViews.renderTestInterface,
    '/login': AppViews.renderLogin,
    '/register': AppViews.renderRegister,
    '/dashboard': AppViews.renderDashboard,
  };

  function router() {
    let hash = location.hash.slice(1) || '/';

    // Clean up trailing slashes
    if (hash !== '/' && hash.endsWith('/')) {
      hash = hash.slice(0, -1);
    }

    const renderFunc = routes[hash] || routes['/'];

    appContainer.innerHTML = renderFunc();

    // Re-initialize animations after DOM change
    if (window.initAnimations) {
      window.initAnimations();
    }

    // Test Interface interactions
    if (hash === '/tests/interface') {
      const options = document.querySelectorAll('.test-option');
      options.forEach(opt => {
        opt.addEventListener('click', () => {
          options.forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
        });
      });
    }

    updateActiveNav(hash);
    window.scrollTo(0, 0);
  }

  function updateActiveNav(hash) {
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href').slice(1);
      // Basic matching for active state
      if (href !== '/' && hash.startsWith(href)) {
        link.classList.add('active');
      } else if (href === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('hashchange', router);
  router(); // Initial load
});
