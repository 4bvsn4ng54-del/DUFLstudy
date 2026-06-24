/* ============================================================
   DUFL — Shared JavaScript
   Theme toggle, mobile nav, scroll animations, reading progress
   ============================================================ */

(function () {
  'use strict';

  /* ------ Theme Toggle ------ */
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const html = document.documentElement;
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  /* ------ Mobile Nav Toggle ------ */
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.global-nav')) {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('open');
      }
    });
  }

  /* ------ Scroll Reveal (Intersection Observer) ------ */
  const revealEls = document.querySelectorAll('.reveal');
  const staggerEls = document.querySelectorAll('.reveal-stagger');

  if (revealEls.length > 0 || staggerEls.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1,
    };

    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });

    staggerEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ------ Reading Progress Bar ------ */
  const progressBar = document.getElementById('readingProgress');
  if (progressBar) {
    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = Math.min(progress, 100) + '%';
    });
  }

  /* ------ Nav Scroll Effect (subtle shadow) ------ */
  const globalNav = document.querySelector('.global-nav');
  if (globalNav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        globalNav.style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)';
      } else {
        globalNav.style.boxShadow = 'none';
      }
    });
  }

  /* ------ Smooth scroll for anchor links ------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ------ Active nav link based on current page ------ */
  (function setActiveNav() {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.nav-links a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      }
    });
  })();

})();
