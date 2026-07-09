
// PDD Cleaning Services — conversion site interactions
// Mobile menu, active navigation, reveal animations, progressive quote form,
// custom date picker and postcode autocomplete via private backend endpoint.
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
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  var reveals = document.querySelectorAll('.reveal');
  reveals.forEach(function (el) {
    var group = el.closest('.service-card-grid, .steps-grid, .trust-stack, .proof-grid, .services-list');
    if (group) {
      var groupReveals = Array.prototype.slice.call(group.querySelectorAll('.reveal'));
      var index = groupReveals.indexOf(el);
      if (index > -1) el.style.setProperty('--reveal-delay', Math.min(index * 70, 280) + 'ms');
    }
  });
  if (reduceMotion) reveals.forEach(function (el) { el.classList.add('is-visible'); });
  else if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
  } else reveals.forEach(function (el) { el.classList.add('is-visible'); });

  function pad(number) { return String(number).padStart(2, '0'); }
  function startOfDay(date) { return new Date(date.getFullYear(), date.getMonth(), date.getDate()); }
  function toISODate(date) { return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()); }
  function fromISODate(value) {
    if (!value) return null;
    var bits = value.split('-').map(Number);
    if (bits.length !== 3 || bits.some(isNaN)) return null;
    return new Date(bits[0], bits[1] - 1, bits[2]);
  }
  function formatDate(date) {
    return new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  }
  function escapeHtml(value) {
    return String(value || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
  function debounce(fn, delay) {
    var timer;
    return function () {
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(null, args); }, delay);
    };
  }

  function normaliseAddressResults(data) {
    var raw = [];
    if (Array.isArray(data)) raw = data;
    else if (data && Array.isArray(data.addresses)) raw = data.addresses;
    else if (data && Array.isArray(data.suggestions)) raw = data.suggestions;
    else if (data && Array.isArray(data.results)) raw = data.results;
    else if (data && Array.isArray(data.result)) raw = data.result;
    else if (data && data.result && Array.isArray(data.result.postcodes)) raw = data.result.postcodes;
    else if (data && Array.isArray(data.data)) raw = data.data;

    return raw.map(function (item) {
      if (typeof item === 'string') return { label: item, value: item };
      if (!item || typeof item !== 'object') return null;
      var label = item.label || item.postcode || item.value || item.address || item.formatted_address || item.description || item.text || item.summary;
      var value = item.value || item.postcode || item.address || item.formatted_address || label;
      return label ? { label: label, value: value } : null;
    }).filter(Boolean).slice(0, 8);
  }

  function setupDatePicker(form, updateFlow) {
    var picker = form.querySelector('[data-date-picker]');
    if (!picker) return;
    var trigger = picker.querySelector('[data-date-trigger]');
    var label = picker.querySelector('[data-date-label]');
    var popover = picker.querySelector('[data-calendar]');
    var hidden = form.querySelector('[data-date-field]');
    var today = startOfDay(new Date());
    var state = { view: new Date(today.getFullYear(), today.getMonth(), 1) };

    function render() {
      var year = state.view.getFullYear();
      var month = state.view.getMonth();
      var monthName = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(state.view);
      var first = new Date(year, month, 1);
      var offset = (first.getDay() + 6) % 7;
      var start = new Date(year, month, 1 - offset);
      var selected = hidden && hidden.value ? fromISODate(hidden.value) : null;
      var html = '';
      html += '<div class="calendar-head"><button type="button" class="calendar-nav" data-prev aria-label="Previous month">‹</button><strong>' + monthName + '</strong><button type="button" class="calendar-nav" data-next aria-label="Next month">›</button></div>';
      html += '<div class="calendar-weekdays"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div><div class="calendar-grid">';
      for (var i = 0; i < 42; i += 1) {
        var day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
        var iso = toISODate(day);
        var classes = ['calendar-day'];
        if (day.getMonth() !== month) classes.push('is-muted');
        if (iso === toISODate(today)) classes.push('is-today');
        if (selected && iso === toISODate(selected)) classes.push('is-selected');
        var disabled = startOfDay(day) < today ? ' disabled' : '';
        html += '<button type="button" class="' + classes.join(' ') + '" data-day="' + iso + '"' + disabled + '>' + day.getDate() + '</button>';
      }
      html += '</div>';
      popover.innerHTML = html;
    }
    function close() { if (popover) popover.hidden = true; if (trigger) trigger.setAttribute('aria-expanded', 'false'); }
    function open() { document.querySelectorAll('[data-calendar]').forEach(function (el) { if (el !== popover) el.hidden = true; }); render(); popover.hidden = false; trigger.setAttribute('aria-expanded', 'true'); }
    function setDate(date) {
      if (!hidden) return;
      hidden.value = toISODate(date);
      if (label) label.textContent = formatDate(date);
      if (trigger) trigger.classList.add('has-value');
      close(); updateFlow();
    }
    if (trigger) trigger.addEventListener('click', function () { if (popover.hidden) open(); else close(); });
    if (popover) popover.addEventListener('click', function (event) {
      var prev = event.target.closest('[data-prev]');
      var next = event.target.closest('[data-next]');
      var day = event.target.closest('[data-day]');
      if (prev) { state.view = new Date(state.view.getFullYear(), state.view.getMonth() - 1, 1); render(); return; }
      if (next) { state.view = new Date(state.view.getFullYear(), state.view.getMonth() + 1, 1); render(); return; }
      if (day && !day.disabled) { var picked = fromISODate(day.getAttribute('data-day')); if (picked) setDate(picked); }
    });
    document.addEventListener('click', function (event) { if (!picker.contains(event.target) && popover && !popover.hidden) close(); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') close(); });
  }

  function setupAddressLookup(form, updateFlow) {
    var wrapper = form.querySelector('[data-address-lookup]');
    if (!wrapper) return;
    var endpoint = form.getAttribute('data-address-api') || 'https://pdd-pink.vercel.app/api/address-autocomplete';
    var input = wrapper.querySelector('[data-postcode-input]');
    var results = wrapper.querySelector('[data-address-results]');
    var status = wrapper.querySelector('[data-address-status]');
    var lines = form.querySelector('[data-address-lines]');
    var selectedValue = '';

    function revealLines() {
      if (lines && input && input.value.trim().length >= 3) lines.hidden = false;
    }
    function hideResults() { if (results) { results.hidden = true; results.innerHTML = ''; } }
    function setStatus(text) { if (status) status.textContent = text || ''; }

    var search = debounce(function () {
      var query = input.value.trim();
      selectedValue = '';
      revealLines();
      updateFlow();
      if (query.length < 2) { hideResults(); setStatus('Start typing your postcode.'); return; }
      setStatus('Looking for postcode suggestions…');
      fetch(endpoint + '?query=' + encodeURIComponent(query), { method: 'GET', headers: { 'Accept': 'application/json' } })
        .then(function (response) { if (!response.ok) throw new Error('Lookup unavailable'); return response.json(); })
        .then(function (data) {
          var items = normaliseAddressResults(data);
          if (!items.length) { hideResults(); setStatus('No postcode suggestion found. You can still type the postcode manually.'); return; }
          results.innerHTML = items.map(function (item) {
            return '<button type="button" class="address-option" data-value="' + escapeHtml(item.value) + '">' + escapeHtml(item.label) + '</button>';
          }).join('');
          results.hidden = false;
          setStatus('Select a postcode suggestion, then enter address line 1.');
        })
        .catch(function () {
          hideResults();
          setStatus('Postcode lookup unavailable. You can still type the postcode and address manually.');
        });
    }, 260);

    if (input) {
      input.addEventListener('input', search);
      input.addEventListener('blur', function () { revealLines(); updateFlow(); });
      input.addEventListener('focus', function () { if (results && results.innerHTML.trim()) results.hidden = false; });
    }
    if (results) {
      results.addEventListener('click', function (event) {
        var button = event.target.closest('[data-value]');
        if (!button) return;
        selectedValue = button.getAttribute('data-value') || '';
        input.value = selectedValue;
        revealLines();
        hideResults();
        setStatus('Postcode selected. Please enter address line 1.');
        var line1 = form.querySelector('[data-address-line1]');
        if (line1) line1.focus();
        updateFlow();
      });
    }
    document.addEventListener('click', function (event) { if (wrapper && !wrapper.contains(event.target)) hideResults(); });
  }

  function setupQuoteForm(form) {
    var steps = Array.prototype.slice.call(form.querySelectorAll('[data-step]'));
    if (!steps.length) return;
    var current = 0;
    var stepLabel = form.querySelector('[data-step-label]');
    var stepTitle = form.querySelector('[data-step-title]');
    var progressBar = form.querySelector('[data-progress-bar]');
    var serviceHidden = form.querySelector('[data-service-needed]');
    var propertyHidden = form.querySelector('[data-property-size-field]');

    function selectedServices() {
      return Array.prototype.slice.call(form.querySelectorAll('[data-service-option]:checked')).map(function (input) { return input.value; });
    }
    function selectedProperty() {
      var checked = form.querySelector('[data-property-option]:checked');
      if (!checked) return '';
      if (checked.value === 'Other') {
        var other = form.querySelector('[data-property-other]');
        return other ? other.value.trim() : '';
      }
      return checked.value;
    }
    function updateHiddenFields() {
      if (serviceHidden) serviceHidden.value = selectedServices().join(', ');
      if (propertyHidden) propertyHidden.value = selectedProperty();
    }
    function setError(step, message) {
      var error = step.querySelector('[data-step-error]');
      if (error) error.textContent = message || '';
    }
    function validate(index, showError) {
      var step = steps[index];
      var type = step.getAttribute('data-step-type');
      var ok = true;
      var message = '';
      if (type === 'details') {
        var missing = Array.prototype.slice.call(step.querySelectorAll('[data-required]')).some(function (input) { return !input.value.trim(); });
        ok = !missing; message = 'Please enter your name and phone number.';
      } else if (type === 'service') {
        ok = selectedServices().length > 0; message = 'Please select at least one service.';
      } else if (type === 'property') {
        var checked = form.querySelector('[data-property-option]:checked');
        ok = !!checked;
        message = 'Please select the property size.';
        if (checked && checked.value === 'Other') {
          var other = form.querySelector('[data-property-other]');
          ok = !!(other && other.value.trim());
          message = 'Please explain the property size.';
        }
      } else if (type === 'date') {
        var date = form.querySelector('[data-date-field]');
        ok = !!(date && date.value); message = 'Please choose a preferred date.';
      } else if (type === 'address') {
        var postcode = form.querySelector('[data-postcode-input]');
        var line1 = form.querySelector('[data-address-line1]');
        ok = !!(postcode && postcode.value.trim()) && !!(line1 && line1.value.trim());
        message = 'Please enter the postcode and address line 1.';
      } else if (type === 'notes') {
        ok = true;
      }
      if (showError) setError(step, ok ? '' : message);
      else if (ok) setError(step, '');
      updateHiddenFields();
      return ok;
    }
    function showStep(index) {
      current = Math.max(0, Math.min(index, steps.length - 1));
      steps.forEach(function (step, i) { step.classList.toggle('is-active', i === current); });
      if (stepLabel) stepLabel.textContent = 'Step ' + (current + 1) + ' of ' + steps.length;
      if (stepTitle) stepTitle.textContent = steps[current].getAttribute('data-step-title') || '';
      if (progressBar) progressBar.style.width = (((current + 1) / steps.length) * 100) + '%';
      updateButtons();
    }
    function updateButtons() {
      steps.forEach(function (step, i) {
        step.querySelectorAll('[data-next]').forEach(function (button) { button.disabled = !validate(i, false); });
      });
    }

    form.addEventListener('input', function () { updateHiddenFields(); updateButtons(); });
    form.addEventListener('change', function (event) {
      var otherWrap = form.querySelector('[data-property-other-wrap]');
      var otherInput = form.querySelector('[data-property-other]');
      var otherChecked = !!form.querySelector('[data-property-other-option]:checked');
      if (otherWrap) otherWrap.hidden = !otherChecked;
      if (!otherChecked && otherInput) otherInput.value = '';
      updateHiddenFields(); updateButtons();
    });
    form.querySelectorAll('[data-next]').forEach(function (button) {
      button.addEventListener('click', function () { if (validate(current, true)) showStep(current + 1); });
    });
    form.querySelectorAll('[data-back]').forEach(function (button) {
      button.addEventListener('click', function () { showStep(current - 1); });
    });
    form.addEventListener('submit', function (event) {
      updateHiddenFields();
      for (var i = 0; i < steps.length; i += 1) {
        if (!validate(i, true)) {
          event.preventDefault();
          showStep(i);
          return;
        }
      }
    });

    setupDatePicker(form, updateButtons);
    setupAddressLookup(form, updateButtons);
    showStep(0);
  }

  document.querySelectorAll('[data-progressive-quote-form]').forEach(setupQuoteForm);
});
