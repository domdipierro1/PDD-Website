// PDD Cleaning Services — static site interactions
// Mobile menu, active navigation and light reveal animations.
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

  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  var reveals = document.querySelectorAll('.reveal');
  reveals.forEach(function (el) {
    var group = el.closest('.grid, .picker-grid, .checklist-wrap, .trust-row, .area-row');
    if (group) {
      var groupReveals = Array.prototype.slice.call(group.querySelectorAll('.reveal'));
      var index = groupReveals.indexOf(el);
      if (index > -1) el.style.setProperty('--reveal-delay', Math.min(index * 70, 280) + 'ms');
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
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Progressive quote form: services → date → address → notes
  document.body.classList.add('js-ready');
  document.querySelectorAll('[data-progressive-quote-form]').forEach(function (form) {
    var serviceInput = form.querySelector('[data-service-needed]');
    var serviceSummary = form.querySelector('[data-service-summary]');
    var serviceOptions = Array.prototype.slice.call(form.querySelectorAll('[data-service-option]'));
    var dateSection = form.querySelector('[data-flow-section="date"]');
    var addressSection = form.querySelector('[data-flow-section="address"]');
    var notesSection = form.querySelector('[data-flow-section="notes"]');
    var dateField = form.querySelector('[data-date-field]');
    var addressField = form.querySelector('[data-address-field]');

    function selectedServices() {
      return serviceOptions.filter(function (option) { return option.checked; }).map(function (option) { return option.value; });
    }

    function setSection(section, show) {
      if (!section) return;
      section.classList.toggle('is-waiting', !show);
      section.classList.toggle('is-active', show);
    }

    function updateFlow() {
      var services = selectedServices();
      if (serviceInput) serviceInput.value = services.join(', ');
      if (serviceSummary) serviceSummary.textContent = services.length ? services.join(', ') : 'Select service(s) and add-ons';

      var hasServices = services.length > 0;
      var hasDate = dateField && dateField.value;
      var hasAddress = addressField && addressField.value.trim().length > 2;

      setSection(dateSection, hasServices);
      setSection(addressSection, hasServices && hasDate);
      setSection(notesSection, hasServices && hasDate && hasAddress);
    }

    serviceOptions.forEach(function (option) { option.addEventListener('change', updateFlow); });
    if (dateField) dateField.addEventListener('change', updateFlow);
    if (addressField) addressField.addEventListener('input', updateFlow);

    form.addEventListener('submit', function (event) {
      if (!selectedServices().length) {
        event.preventDefault();
        var dropdown = form.querySelector('[data-service-dropdown]');
        if (dropdown) dropdown.open = true;
        if (serviceSummary) serviceSummary.focus && serviceSummary.focus();
      }
    });

    updateFlow();
  });

});
