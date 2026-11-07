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

      // Submit to Formspree via AJAX
      var formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(function (response) {
        if (response.ok) {
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
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = btnContent;
        alert('Something went wrong. Please try again or email us directly at sales@novatechsoft.info');
      });
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Three.js Hero Animation ---------- */
async function initHeroAnimation() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  try {
    const { Scene, PerspectiveCamera, WebGLRenderer, IcosahedronGeometry, MeshBasicMaterial, Mesh, Float32BufferAttribute, Clock, Color, BufferGeometry, Points, ShaderMaterial, AdditiveBlending } = await import('three');

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 28);

    const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // Create wireframe icosahedron
    const geometry = new IcosahedronGeometry(6, 0);
    const positions = geometry.attributes.position;
    const colors = new Float32Array(positions.count * 3);
    const color = new Color('#0C8A5F'); // accent color
    const colorAlt = new Color('#0FD9A3'); // accent-fill color

    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i);
      const t = (y + 6) / 12; // normalize -6 to 6 -> 0 to 1
      const c = color.clone().lerp(colorAlt, t);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

    const material = new MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      toneMapped: false
    });

    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    // Add subtle particle field
    const particleCount = 300;
    const particleGeometry = new BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const particleAlphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 8 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      particleSizes[i] = 0.5 + Math.random() * 1.5;
      particleAlphas[i] = 0.1 + Math.random() * 0.4;
    }

    particleGeometry.setAttribute('position', new Float32BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new Float32BufferAttribute(particleSizes, 1));
    particleGeometry.setAttribute('alpha', new Float32BufferAttribute(particleAlphas, 1));

    // Custom shader for particles
    const particleShaderMaterial = new ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color('#0C8A5F') },
        uColorAlt: { value: new Color('#0FD9A3') }
      },
      vertexShader: `
        attribute float size;
        attribute float alpha;
        varying float vAlpha;
        uniform float uTime;
        void main() {
          vAlpha = alpha;
          vec3 pos = position;
          // Subtle floating motion
          pos.x += sin(uTime * 0.3 + position.y * 0.5) * 0.15;
          pos.y += cos(uTime * 0.2 + position.x * 0.5) * 0.15;
          pos.z += sin(uTime * 0.25 + position.z * 0.5) * 0.1;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        uniform vec3 uColor;
        uniform vec3 uColorAlt;
        uniform float uTime;
        void main() {
          float dist = length(gl_PointCoord - 0.5);
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
          vec3 color = mix(uColor, uColorAlt, sin(uTime * 0.5) * 0.5 + 0.5);
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false
    });

    const particles = new Points(particleGeometry, particleShaderMaterial);
    scene.add(particles);

    const clock = new Clock();
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    function onMouseMove(event) {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    function animate() {
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      targetX = mouseX * 0.3;
      targetY = mouseY * 0.3;

      mesh.rotation.x += (targetY - mesh.rotation.x) * 0.02;
      mesh.rotation.y += (targetX - mesh.rotation.y) * 0.02;
      mesh.rotation.z += delta * 0.08;

      particles.rotation.y += delta * 0.02;
      particles.rotation.x += delta * 0.01;

      particleShaderMaterial.uniforms.uTime.value = elapsed;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize);

    animate();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleShaderMaterial.dispose();
    });

  } catch (error) {
    console.warn('Three.js hero animation failed to initialize:', error);
  }
}

/* ---------- Console signature ---------- */
  initHeroAnimation();
  console.log('%cNovatech Solutions', 'font:600 20px "Space Grotesk",sans-serif;color:#0C8A5F;');
  console.log('%cWebsites that win customers. IT that never sleeps.', 'font:12px Inter,sans-serif;color:#5C6357;');
})();
