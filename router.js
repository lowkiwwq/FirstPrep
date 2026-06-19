document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app-view');

  const routes = {
    '/': AppViews.renderHome,
    '/home': AppViews.renderHome,
    '/courses': AppViews.renderCourses,
    '/courses/intro': () => AppViews.renderCourseDetail('intro'),
    '/courses/cad': () => AppViews.renderCourseDetail('cad'),
    '/courses/build': () => AppViews.renderCourseDetail('build'),
    '/courses/coding': () => AppViews.renderCourseDetail('coding'),
    '/courses/gamedrive': () => AppViews.renderCourseDetail('gamedrive'),
    '/courses/inspire': () => AppViews.renderCourseDetail('inspire'),
    '/courses/season': () => AppViews.renderCourseDetail('season'),
    '/tests': AppViews.renderTests,
    '/tests/interface': AppViews.renderTestInterface,
    '/login': AppViews.renderLogin,
    '/register': AppViews.renderRegister,
    '/dashboard': AppViews.renderDashboard,
    '/admin/courses': AppViews.renderAdminCourses,
  };

  let cleanupAntigravity = null;

  function router() {
    let hash = location.hash.slice(1) || '/';

    // Clean up trailing slashes
    if (hash !== '/' && hash.endsWith('/')) {
      hash = hash.slice(0, -1);
    }

    // Auth role checking for admin panel
    if (hash.startsWith('/admin/courses')) {
      const user = window.Auth.getUser();
      const role = user ? user.role : null;
      if (role !== 'mentor' && role !== 'admin') {
        setTimeout(() => { window.location.hash = '#/dashboard'; }, 0);
        return;
      }
      const globalNavbar = document.querySelector('.navbar');
      if (globalNavbar) globalNavbar.style.display = 'none';
    } else {
      const globalNavbar = document.querySelector('.navbar');
      if (globalNavbar) globalNavbar.style.display = 'block';
    }

    let renderFunc = routes[hash];
    
    // Check dynamic editor route
    if (!renderFunc && hash.startsWith('/admin/courses/')) {
      const slug = hash.replace('/admin/courses/', '');
      if (slug && ['intro', 'cad', 'build', 'coding', 'gamedrive', 'inspire', 'season'].includes(slug)) {
        renderFunc = () => AppViews.renderAdminCourseEditor(slug);
      }
    }

    if (!renderFunc) {
      renderFunc = routes['/'];
    }

    if (cleanupAntigravity) {
      cleanupAntigravity();
      cleanupAntigravity = null;
    }

    appContainer.innerHTML = renderFunc();

    // Re-initialize animations after DOM change
    if (window.initAnimations) {
      window.initAnimations();
    }

    if (hash === '/courses/coding') {
      const course = window.CoursesData['coding'];
      let activeState = window.ActiveLessonsState['coding'];
      if (!activeState) {
        let foundSec = 0;
        for (let s = 0; s < course.sections.length; s++) {
          if (!course.sections[s].locked) {
            foundSec = s;
            break;
          }
        }
        activeState = { secIdx: foundSec, lesIdx: 0 };
      }
      const section = course.sections[activeState.secIdx];
      if (section && section.lessons) {
        const lesson = section.lessons[activeState.lesIdx];
        if (lesson) {
          const isLab = (lesson.id === '1.2' || lesson.id === '2.2' || lesson.id === '3.4' || lesson.type === 'ЗАДАНИЕ');
          if (isLab && window.initCodeLab) {
            window.initCodeLab(lesson.id);
          }
        }
      }
    }

    if (hash === '/courses') {
      const checkboxes = document.querySelectorAll('.filter-checkbox');
      checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
          if (window.applyCoursesFilter) {
            window.applyCoursesFilter();
          }
        });
      });
    }

    if ((hash === '/' || hash === '/home') && window.initAntigravity) {
      cleanupAntigravity = window.initAntigravity('antigravity-container');
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

    if (window.updateNavbarAuth) {
      window.updateNavbarAuth();
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
