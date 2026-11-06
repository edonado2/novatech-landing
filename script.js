/* ============================================================
   NOVATECH SOLUTIONS — Interactions
   Progressive enhancement only: the site works without JS.
   ============================================================ */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.querySelector('.menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  function setMenu(open) {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.classList.toggle('is-open', open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setMenu(false);
    });
  }

  /* ---------- Header state on scroll ---------- */
  var header = document.querySelector('.site-header');
  function onScrollHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Scroll reveals (staggered per group) ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  // Assign a small stagger delay to siblings that share a parent
  var groups = new Map();
  revealEls.forEach(function (el) {
    var parent = el.parentElement;
    if (!groups.has(parent)) groups.set(parent, 0);
    var i = groups.get(parent);
    el.style.setProperty('--d', Math.min(i * 90, 450) + 'ms');
    groups.set(parent, i + 1);
  });

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { revealIO.observe(el); });
  }

  /* ---------- Animated counters ---------- */
  var counters = document.querySelectorAll('[data-count]');

  function setFinal(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    el.textContent = decimals ? target.toFixed(decimals) : String(target);
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var duration = 1600;
    var start = null;

    function tick(now) {
      if (!start) start = now;
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(2, -10 * p); // easeOutExpo
      var value = target * eased;
      el.textContent = decimals ? value.toFixed(decimals) : String(Math.round(value));
      if (p < 1) requestAnimationFrame(tick);
      else setFinal(el);
    }
    requestAnimationFrame(tick);
  }

  if (counters.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      counters.forEach(setFinal);
    } else {
      var countIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countIO.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { countIO.observe(el); });
    }
  }

  /* ---------- Active nav link ---------- */
  var navLinks = document.querySelectorAll('.main-nav .nav-link');
  var sections = document.querySelectorAll('main section[id]');

  if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (s) { navIO.observe(s); });
  }

  /* ---------- Magnetic buttons (desktop only) ---------- */
  if (finePointer && !reducedMotion) {
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      var strength = 0.22;
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * strength;
        var y = (e.clientY - r.top - r.height / 2) * strength;
        btn.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  /* ---------- FAQ: close others when one opens ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contact-form');

  if (form) {
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateField(field) {
      var wrap = field.closest('.form-field');
      var errorEl = wrap ? wrap.querySelector('.field-error') : null;
      var message = '';
      var value = field.value.trim();

      if (field.hasAttribute('required') && !value) {
        message = 'This field is required.';
      } else if (field.type === 'email' && value && !emailRe.test(value)) {
        message = 'Please enter a valid email address.';
      }

      field.classList.toggle('is-invalid', Boolean(message));
      if (errorEl) errorEl.textContent = message;
      return !message;
    }

    var fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () {
        if (field.classList.contains('is-invalid')) validateField(field);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var firstInvalid = null;

      fields.forEach(function (field) {
        if (!validateField(field)) {
          valid = false;
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (!valid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var btnContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending…</span>';

      // Simulated submission — replace with a real endpoint when wiring up the backend.
      setTimeout(function () {
        var name = (form.querySelector('#f-name') || {}).value || 'there';
        form.innerHTML =
          '<div class="form-success" role="status">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">' +
              '<circle cx="12" cy="12" r="10"/>' +
              '<path d="M8 12.5l2.6 2.6L16 9.5" stroke-linecap="round" stroke-linejoin="round"/>' +
            '</svg>' +
            '<h3>Message received, ' + name.split(' ')[0] + '.</h3>' +
            '<p>An engineer — not a sales rep — will reply within 2 business hours.</p>' +
          '</div>';
      }, 1100);

      submitBtn.innerHTML = btnContent; // restored if the timeout is ever bypassed
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Console signature ---------- */
  console.log('%cNovatech Solutions', 'font:600 20px "Space Grotesk",sans-serif;color:#0C8A5F;');
  console.log('%cWebsites that win customers. IT that never sleeps.', 'font:12px Inter,sans-serif;color:#5C6357;');
})();
