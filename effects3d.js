/* ============================================================
   DUFL — 3D Touch Effects Engine
   Card tilt · Parallax depth · 3D reveals · Float · Glare
   ============================================================ */

(function () {
  'use strict';

  /* ==========================================================
     1. 3D CARD TILT — Mouse-follow perspective transform
     Apply class "tilt-3d" to any card element
     data-tilt-max="15"   — max rotation degrees (default 12)
     data-tilt-scale="1.02" — hover scale (default 1.02)
     data-tilt-speed="400"  — transition speed ms (default 400)
     data-tilt-glare="true" — enable glare overlay
   ========================================================== */

  function initTiltCards() {
    var cards = document.querySelectorAll('.tilt-3d');
    if (!cards.length) return;

    cards.forEach(function (card) {
      var maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 12;
      var scale = parseFloat(card.getAttribute('data-tilt-scale')) || 1.02;
      var speed = parseFloat(card.getAttribute('data-tilt-speed')) || 400;
      var hasGlare = card.getAttribute('data-tilt-glare') === 'true';

      // Add glare layer
      if (hasGlare) {
        var glare = document.createElement('div');
        glare.className = 'tilt-glare';
        glare.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;border-radius:inherit;pointer-events:none;z-index:2;opacity:0;transition:opacity 0.3s;background:radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 80%);';
        card.style.position = card.style.position || 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(glare);
      }

      // Set base transition
      card.style.transition = 'transform ' + (speed / 1000) + 's cubic-bezier(0.23, 1, 0.32, 1), box-shadow ' + (speed / 1000) + 's cubic-bezier(0.23, 1, 0.32, 1)';
      card.style.transformStyle = 'preserve-3d';
      card.style.willChange = 'transform';

      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var cx = rect.width / 2;
        var cy = rect.height / 2;
        var dx = (x - cx) / cx; // -1 to 1
        var dy = (y - cy) / cy; // -1 to 1

        var rotateY = dx * maxTilt;
        var rotateX = -dy * maxTilt;

        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(' + scale + ',' + scale + ',' + scale + ')';

        // Move glare
        if (hasGlare) {
          var glareEl = card.querySelector('.tilt-glare');
          if (glareEl) {
            glareEl.style.opacity = '1';
            glareEl.style.background = 'radial-gradient(circle at ' + (dx * 60 + 50) + '% ' + (dy * 60 + 50) + '%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)';
          }
        }
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        if (hasGlare) {
          var glareEl = card.querySelector('.tilt-glare');
          if (glareEl) glareEl.style.opacity = '0';
        }
      });

      // Touch support
      card.addEventListener('touchmove', function (e) {
        if (e.touches.length !== 1) return;
        var rect = card.getBoundingClientRect();
        var x = e.touches[0].clientX - rect.left;
        var y = e.touches[0].clientY - rect.top;
        var cx = rect.width / 2;
        var cy = rect.height / 2;
        var dx = (x - cx) / cx;
        var dy = (y - cy) / cy;
        var rotateY = dx * maxTilt * 0.7;
        var rotateX = -dy * maxTilt * 0.7;
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(' + scale + ',' + scale + ',' + scale + ')';
        if (hasGlare) {
          var glareEl = card.querySelector('.tilt-glare');
          if (glareEl) {
            glareEl.style.opacity = '1';
            glareEl.style.background = 'radial-gradient(circle at ' + (dx * 60 + 50) + '% ' + (dy * 60 + 50) + '%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)';
          }
        }
      }, { passive: true });

      card.addEventListener('touchend', function () {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        if (hasGlare) {
          var glareEl = card.querySelector('.tilt-glare');
          if (glareEl) glareEl.style.opacity = '0';
        }
      });
    });
  }

  /* ==========================================================
     2. PARALLAX DEPTH — Scroll-based layered movement
     Apply class "parallax-layer" with data-depth="0.5"
     data-depth: -1 (faster) to 1 (slower), 0 = fixed
     Wrap layers in .parallax-container with perspective
   ========================================================== */

  function initParallax() {
    var layers = document.querySelectorAll('.parallax-layer');
    if (!layers.length) return;

    var ticking = false;

    function updateParallax() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;

      layers.forEach(function (layer) {
        var depth = parseFloat(layer.getAttribute('data-depth')) || 0.5;
        var parentRect = layer.parentElement.getBoundingClientRect();
        var parentTop = parentRect.top + scrollY;
        var parentHeight = parentRect.height;
        var viewportH = window.innerHeight;

        // Only update if parent is in viewport
        if (parentTop + parentHeight > scrollY && parentTop < scrollY + viewportH) {
          var relativeScroll = scrollY - parentTop;
          var offset = relativeScroll * depth * 0.4;
          layer.style.transform = 'translate3d(0, ' + offset + 'px, 0)';
          layer.style.willChange = 'transform';
        }
      });

      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });

    // Initial position
    updateParallax();
  }

  /* ==========================================================
     3. 3D SCROLL REVEALS — Elements enter with depth transforms
     .reveal-3d-left  — slides in from left with slight rotation
     .reveal-3d-right — slides in from right with slight rotation
     .reveal-3d-up    — rises up with depth perspective
     .reveal-3d-scale — scales from small to normal with 3D
   ========================================================== */

  function init3DReveals() {
    var els = document.querySelectorAll('.reveal-3d-left, .reveal-3d-right, .reveal-3d-up, .reveal-3d-scale');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ==========================================================
     4. FLOATING ANIMATIONS — Subtle 3D breathing effect
     .float-3d       — gentle float
     .float-3d-slow  — very slow float
     .float-3d-fast  — faster energetic float
   ========================================================== */

  function initFloating() {
    // Pure CSS animation — classes already defined in style.css
    // This function adds staggered delays for multiple floating elements
    var floats = document.querySelectorAll('.float-3d, .float-3d-slow, .float-3d-fast');
    floats.forEach(function (el, i) {
      if (!el.style.animationDelay || el.style.animationDelay === '0s') {
        el.style.animationDelay = (i * 0.15) + 's';
      }
    });
  }

  /* ==========================================================
     5. MOUSE-FOLLOW GLOW — Subtle glow that follows cursor
     Apply class "glow-follow" to section backgrounds
     A radial gradient spotlight follows the mouse
   ========================================================== */

  function initGlowFollow() {
    var sections = document.querySelectorAll('.glow-follow');
    if (!sections.length) return;

    sections.forEach(function (section) {
      // Create glow overlay
      var glow = document.createElement('div');
      glow.className = 'glow-overlay';
      glow.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:0;opacity:0.4;transition:opacity 0.6s;background:radial-gradient(circle 400px at 50% 50%, rgba(0,113,227,0.08) 0%, transparent 100%);';
      section.style.position = section.style.position || 'relative';
      if (section.style.position === 'static') section.style.position = 'relative';
      section.style.overflow = 'hidden';
      section.insertBefore(glow, section.firstChild);

      section.addEventListener('mousemove', function (e) {
        var rect = section.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        glow.style.background = 'radial-gradient(circle 400px at ' + x + 'px ' + y + 'px, rgba(0,113,227,0.1) 0%, transparent 100%)';
        glow.style.opacity = '0.5';
      });

      section.addEventListener('mouseleave', function () {
        glow.style.opacity = '0';
      });
    });
  }

  /* ==========================================================
     6. HERO 3D DEPTH — Mouse parallax on hero sections
     Apply class "hero-3d" to hero section
     Child elements with data-hero-depth move relative to cursor
   ========================================================== */

  function initHero3D() {
    var heroes = document.querySelectorAll('.hero-3d');
    if (!heroes.length) return;

    heroes.forEach(function (hero) {
      var items = hero.querySelectorAll('[data-hero-depth]');
      if (!items.length) return;

      hero.addEventListener('mousemove', function (e) {
        var rect = hero.getBoundingClientRect();
        var cx = rect.width / 2;
        var cy = rect.height / 2;
        var mx = e.clientX - rect.left - cx;
        var my = e.clientY - rect.top - cy;

        items.forEach(function (item) {
          var depth = parseFloat(item.getAttribute('data-hero-depth')) || 0.1;
          var dx = mx * depth;
          var dy = my * depth;
          item.style.transform = 'translate3d(' + dx + 'px, ' + dy + 'px, 0)';
          item.style.transition = 'transform 0.1s ease-out';
        });
      });

      hero.addEventListener('mouseleave', function () {
        items.forEach(function (item) {
          item.style.transform = 'translate3d(0, 0, 0)';
          item.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        });
      });
    });
  }

  /* ==========================================================
     INIT ALL EFFECTS
   ========================================================== */

  function init() {
    initTiltCards();
    initParallax();
    init3DReveals();
    initFloating();
    initGlowFollow();
    initHero3D();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
