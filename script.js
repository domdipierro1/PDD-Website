// PDD Cleaning Services — static site interactions
// Mobile menu, active navigation, scroll reveal, FAQ toggles and light hero motion.
document.addEventListener('DOMContentLoaded', function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var toggle = document.querySelector('.menu-toggle');
  var mobileShell = document.querySelector('.mobile-menu-shell');

  if (toggle && mobileShell) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileShell.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileShell.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileShell.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        mobileShell.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active nav link based on current page
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Staggered reveal for cards and grids
  var reveals = document.querySelectorAll('.reveal');
  reveals.forEach(function (el) {
    var group = el.closest('.grid-2, .grid-3, .grid-4, .services-preview, .how-grid, .addon-strip, .gallery-grid, .faq-list, .chip-row');
    if (group) {
      var groupReveals = Array.prototype.slice.call(group.querySelectorAll('.reveal'));
      var index = groupReveals.indexOf(el);
      if (index > -1) {
        el.style.setProperty('--reveal-delay', Math.min(index * 80, 360) + 'ms');
      }
    }
  });

  if (reduceMotion) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(function (button) {
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', function () {
      var item = button.closest('.faq-item');
      var isOpen = item.classList.toggle('is-open');
      button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });

  // Subtle hero parallax on larger screens
  var heroVisual = document.querySelector('.hero-visual');
  var ticking = false;

  function updateHero() {
    if (!heroVisual) return;
    var rect = heroVisual.getBoundingClientRect();
    var viewport = window.innerHeight || document.documentElement.clientHeight;
    var progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
    var offset = Math.max(Math.min(progress * -14, 14), -14);
    heroVisual.style.transform = 'translate3d(0,' + offset.toFixed(2) + 'px,0)';
    ticking = false;
  }

  function requestHeroUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(updateHero);
      ticking = true;
    }
  }

  if (!reduceMotion && heroVisual && window.matchMedia('(min-width: 900px)').matches) {
    updateHero();
    window.addEventListener('scroll', requestHeroUpdate, { passive: true });
    window.addEventListener('resize', requestHeroUpdate);
  }
});

// PDD quote form enhancements: service multi-select, address autocomplete, full-box date picker.
document.addEventListener('DOMContentLoaded', function () {
  var picker = document.querySelector('[data-service-picker]');
  if (picker) {
    var button = picker.querySelector('[data-service-picker-button]');
    var hidden = picker.querySelector('[data-service-needed]');
    var checks = Array.prototype.slice.call(picker.querySelectorAll('input[type="checkbox"]'));

    function updateServices() {
      var selected = checks.filter(function (check) { return check.checked; }).map(function (check) { return check.value; });
      hidden.value = selected.join(', ');
      button.textContent = selected.length ? selected.join(', ') : 'Select service';
      hidden.setCustomValidity(selected.length ? '' : 'Please select at least one service.');
    }

    button.addEventListener('click', function () {
      picker.classList.toggle('is-open');
    });
    checks.forEach(function (check) { check.addEventListener('change', updateServices); });
    document.addEventListener('click', function (event) {
      if (!picker.contains(event.target)) picker.classList.remove('is-open');
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') picker.classList.remove('is-open');
    });
    updateServices();
  }

  document.querySelectorAll('[data-date-input]').forEach(function (input) {
    var label = input.closest('label');
    if (!label) return;
    label.addEventListener('click', function () {
      if (typeof input.showPicker === 'function') input.showPicker();
      else input.focus();
    });
  });

  var lookup = document.querySelector('[data-address-lookup]');
  if (!lookup) return;

  var input = lookup.querySelector('[data-address-input]');
  var list = lookup.querySelector('[data-address-suggestions]');
  var idField = document.querySelector('[data-address-id]');
  var sourceField = document.querySelector('[data-address-source]');
  var timer = null;
  var activeController = null;
  var endpoint = 'https://pdd-pink.vercel.app/api/address-autocomplete';

  function closeSuggestions() {
    lookup.classList.remove('is-open');
    list.innerHTML = '';
  }

  function renderSuggestions(items) {
    list.innerHTML = '';
    if (!items || !items.length) {
      closeSuggestions();
      return;
    }

    items.slice(0, 30).forEach(function (item) {
      var option = document.createElement('button');
      option.type = 'button';
      option.className = 'address-suggestion';
      option.textContent = item.label || item.address || item.line_1 || '';
      option.addEventListener('click', function () {
        input.value = option.textContent;
        if (idField) idField.value = item.id || item.udprn || '';
        if (sourceField) sourceField.value = item.source || '';
        closeSuggestions();
      });
      list.appendChild(option);
    });

    lookup.classList.add('is-open');
  }

  input.addEventListener('input', function () {
    if (idField) idField.value = '';
    if (sourceField) sourceField.value = '';
    var q = input.value.trim();
    window.clearTimeout(timer);
    if (q.length < 2) {
      closeSuggestions();
      return;
    }

    timer = window.setTimeout(function () {
      if (activeController) activeController.abort();
      activeController = new AbortController();

      fetch(endpoint + '?q=' + encodeURIComponent(q), {
        method: 'GET',
        signal: activeController.signal,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (res) { return res.ok ? res.json() : { items: [] }; })
        .then(function (data) { renderSuggestions(data.items || data.suggestions || []); })
        .catch(function (error) {
          if (error.name !== 'AbortError') closeSuggestions();
        });
    }, 240);
  });

  document.addEventListener('click', function (event) {
    if (!lookup.contains(event.target)) closeSuggestions();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeSuggestions();
  });
});
