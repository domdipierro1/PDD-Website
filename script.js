
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
      html += '<div class="calendar-head"><button type="button" class="calendar-nav" data-prev aria-label="Previous month">‹</button><strong>' + monthName + '</strong><button type="button" class="calendar-nav" data-cal-next aria-label="Next month">›</button></div>';
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
      var next = event.target.closest('[data-cal-next]');
      var day = event.target.closest('[data-day]');
      if (prev) { state.view = new Date(state.view.getFullYear(), state.view.getMonth() - 1, 1); render(); return; }
      if (next) { state.view = new Date(state.view.getFullYear(), state.view.getMonth() + 1, 1); render(); return; }
      if (day && !day.disabled) { var picked = fromISODate(day.getAttribute('data-day')); if (picked) setDate(picked); }
    });
    document.addEventListener('click', function (event) { if (!picker.contains(event.target) && popover && !popover.hidden) close(); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') close(); });
  }

  function getFieldValue(form, selectors) {
    for (var i = 0; i < selectors.length; i += 1) {
      var field = form.querySelector(selectors[i]);
      if (field && typeof field.value === 'string' && field.value.trim()) return field.value.trim();
    }
    return '';
  }

  function syncCrmAddressField(form) {
    if (!form) return '';
    var addressField = form.querySelector('input[name="address"]') || form.querySelector('#selected-address') || form.querySelector('[data-selected-address]');
    if (!addressField) {
      addressField = document.createElement('input');
      addressField.type = 'hidden';
      addressField.name = 'address';
      addressField.id = 'selected-address';
      addressField.setAttribute('data-selected-address', '');
      form.appendChild(addressField);
    }
    addressField.disabled = false;
    addressField.name = 'address';

    var line1 = getFieldValue(form, ['[name="address_line_1"]', '[data-address-line1]', '[name="property address"]', '[name="job address"]']);
    var line2 = getFieldValue(form, ['[name="address_line_2"]', '[data-address-line2]']);
    var city = getFieldValue(form, ['[name="city"]', '[data-city-input]', '[name="town"]']);
    var postcode = getFieldValue(form, ['[name="postcode_area"]', '[name="postcode"]', '[data-postcode-input]']);

    var fullAddress = [line1, line2, city, postcode].filter(function (part) { return !!part; }).join(', ');
    addressField.value = fullAddress;
    return fullAddress;
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
    var addressHidden = form.querySelector('[data-selected-address]') || form.querySelector('#selected-address');
    var mainService = form.querySelector('[data-main-service]');
    var addonPrompt = form.querySelector('[data-addon-prompt]');

    function mainServiceValue() {
      if (mainService) return mainService.value || '';
      var checked = form.querySelector('[data-service-option]:checked');
      return checked ? checked.value : '';
    }
    function canUseAddons() {
      var value = mainServiceValue();
      return value === 'End of tenancy cleaning' || value === 'Deep cleaning';
    }
    function selectedAddons() {
      if (!canUseAddons()) return [];
      return Array.prototype.slice.call(form.querySelectorAll('[data-addon-option]:checked')).map(function (input) { return input.value; });
    }
    function selectedServices() {
      var main = mainServiceValue();
      var all = main ? [main] : [];
      selectedAddons().forEach(function (addon) { all.push(addon); });
      return all;
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
    function syncAddonPrompt() {
      var show = canUseAddons();
      if (addonPrompt) addonPrompt.hidden = !show;
      if (!show) {
        form.querySelectorAll('[data-addon-option]').forEach(function (input) { input.checked = false; });
      }
    }
    function buildFullAddress() {
      return syncCrmAddressField(form);
    }
    function updateHiddenFields() {
      syncAddonPrompt();
      var services = selectedServices();
      if (serviceHidden) serviceHidden.value = services.join(', ');
      if (propertyHidden) propertyHidden.value = selectedProperty();
      if (addressHidden) addressHidden.value = buildFullAddress();
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
        ok = !!mainServiceValue(); message = 'Please select the main service you need.';
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
    function markQuoteFormInUse() {
      if (document.body) document.body.classList.add('is-using-quote-form');
    }
    function keepStepVisible() {
      if (!window.matchMedia || !window.matchMedia('(max-width: 760px)').matches) return;
      var shell = form.closest('.quote-shell') || form;
      var frame = form.closest('.hero-form-card') || form.closest('.contact-form-wrap') || shell;
      window.requestAnimationFrame(function () {
        if (frame && typeof frame.scrollTo === 'function') {
          frame.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
        if (shell && typeof shell.scrollTo === 'function') {
          shell.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
        shell.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    }
    function showStep(index, shouldScroll) {
      current = Math.max(0, Math.min(index, steps.length - 1));
      steps.forEach(function (step, i) { step.classList.toggle('is-active', i === current); });
      if (stepLabel) stepLabel.textContent = 'Step ' + (current + 1) + ' of ' + steps.length;
      if (stepTitle) stepTitle.textContent = steps[current].getAttribute('data-step-title') || '';
      if (progressBar) progressBar.style.width = (((current + 1) / steps.length) * 100) + '%';
      updateButtons();
      if (shouldScroll) keepStepVisible();
    }
    function updateButtons() {
      syncAddonPrompt();
      steps.forEach(function (step, i) {
        step.querySelectorAll('[data-next]').forEach(function (button) { button.disabled = !validate(i, false); });
      });
    }

    form.addEventListener('click', markQuoteFormInUse);
    form.addEventListener('focusin', markQuoteFormInUse);
    form.addEventListener('input', function () { markQuoteFormInUse(); updateHiddenFields(); updateButtons(); });
    form.addEventListener('change', function () {
      markQuoteFormInUse();
      var otherWrap = form.querySelector('[data-property-other-wrap]');
      var otherInput = form.querySelector('[data-property-other]');
      var otherChecked = !!form.querySelector('[data-property-other-option]:checked');
      if (otherWrap) otherWrap.hidden = !otherChecked;
      if (!otherChecked && otherInput) otherInput.value = '';
      updateHiddenFields(); updateButtons();
    });
    form.querySelectorAll('[data-next]').forEach(function (button) {
      button.addEventListener('click', function () { markQuoteFormInUse(); if (validate(current, true)) showStep(current + 1, true); });
    });
    form.querySelectorAll('[data-back]').forEach(function (button) {
      button.addEventListener('click', function () { markQuoteFormInUse(); showStep(current - 1, true); });
    });
    form.addEventListener('submit', function (event) {
      syncCrmAddressField(form);
      updateHiddenFields();
      for (var i = 0; i < steps.length; i += 1) {
        if (!validate(i, true)) {
          event.preventDefault();
          showStep(i, true);
          return;
        }
      }
      syncCrmAddressField(form);
    });

    setupDatePicker(form, updateButtons);
    setupAddressLookup(form, updateButtons);
    updateHiddenFields();
    showStep(0);
  }

  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!form || !form.matches || !form.matches('form[action="https://pdd-pink.vercel.app/api/website-enquiry"]')) return;
    syncCrmAddressField(form);
  }, true);


  // Mobile header behaviour: keep the top of the enquiry visible.
  // Header is visible at the top, then hides while the customer moves down the page.
  (function setupMobileHeaderHide() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var mq = window.matchMedia ? window.matchMedia('(max-width: 760px)') : null;
    function mobileMenuOpen() {
      var shell = document.querySelector('.mobile-menu-shell');
      return !!(shell && shell.classList.contains('is-open'));
    }
    function update() {
      var isMobile = mq ? mq.matches : window.innerWidth <= 760;
      if (!isMobile || mobileMenuOpen()) {
        header.classList.remove('is-hidden');
        return;
      }
      header.classList.toggle('is-hidden', window.scrollY > 24);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    var toggleButton = document.querySelector('.menu-toggle');
    if (toggleButton) toggleButton.addEventListener('click', function () { window.setTimeout(update, 40); });
  })();

  document.querySelectorAll('[data-progressive-quote-form]').forEach(setupQuoteForm);
});


// Emergency visual enforcement for quote form primary buttons.
// Keeps Next / Send blue even if older cached styles or button states interfere.
(function () {
  function paintQuoteButtons() {
    document.querySelectorAll('.quote-form button[data-next], .quote-form button[type="submit"]').forEach(function (button) {
      button.classList.add('quote-primary-action');
      button.style.setProperty('background', 'linear-gradient(135deg,#0754ad,#063d7f)', 'important');
      button.style.setProperty('background-color', '#0754ad', 'important');
      button.style.setProperty('border', '2px solid #0754ad', 'important');
      button.style.setProperty('color', '#ffffff', 'important');
      button.style.setProperty('-webkit-text-fill-color', '#ffffff', 'important');
      button.style.setProperty('box-shadow', '0 14px 32px rgba(7,84,173,.22)', 'important');
      button.style.setProperty('display', 'inline-flex', 'important');
      button.style.setProperty('align-items', 'center', 'important');
      button.style.setProperty('justify-content', 'center', 'important');
      button.style.setProperty('text-indent', '0', 'important');
      button.style.setProperty('opacity', '1', 'important');
    });
    document.querySelectorAll('.quote-form button[data-back]').forEach(function (button) {
      button.classList.add('quote-secondary-action');
      button.style.setProperty('background', '#ffffff', 'important');
      button.style.setProperty('background-image', 'none', 'important');
      button.style.setProperty('border', '2px solid rgba(7,84,173,.24)', 'important');
      button.style.setProperty('color', '#0754ad', 'important');
      button.style.setProperty('-webkit-text-fill-color', '#0754ad', 'important');
    });
  }
  document.addEventListener('DOMContentLoaded', paintQuoteButtons);
  document.addEventListener('input', paintQuoteButtons, true);
  document.addEventListener('change', paintQuoteButtons, true);
  document.addEventListener('click', paintQuoteButtons, true);
  window.addEventListener('pageshow', paintQuoteButtons);
})();


/* Multi-service quote flow patch */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-progressive-quote-form]').forEach(function (form) {
    var steps = Array.prototype.slice.call(form.querySelectorAll('[data-step]'));
    var currentIndex = Math.max(0, steps.findIndex(function (s) { return s.classList.contains('is-active'); }));
    var hiddenService = form.querySelector('[data-service-needed]');
    var progressLabel = form.querySelector('[data-step-label]');
    var progressTitle = form.querySelector('[data-step-title]');
    var progressBar = form.querySelector('[data-progress-bar]');
    var serviceOptions = Array.prototype.slice.call(form.querySelectorAll('[data-service-option]'));
    var addonOptions = Array.prototype.slice.call(form.querySelectorAll('[data-addon-option]'));

    function selectedServices() {
      return serviceOptions.filter(function (i) { return i.checked; }).map(function (i) { return i.value; });
    }

    function addonsAllowed() {
      return serviceOptions.some(function (i) {
        return i.checked && (i.value === 'End of tenancy cleaning' || i.value === 'Deep cleaning');
      });
    }

    function syncServiceSummary() {
      if (hiddenService) hiddenService.value = selectedServices().join(', ');
      if (!addonsAllowed()) addonOptions.forEach(function (i) { i.checked = false; });
    }

    function visibleSteps() {
      return steps.filter(function (step) {
        return !(step.getAttribute('data-step-type') === 'addons' && !addonsAllowed());
      });
    }

    function updateProgress() {
      var visible = visibleSteps();
      var active = steps[currentIndex] || steps[0];
      var visibleIndex = visible.indexOf(active);
      if (visibleIndex < 0) {
        active = visible[0] || steps[0];
        currentIndex = steps.indexOf(active);
        visibleIndex = visible.indexOf(active);
      }
      var total = visible.length;
      var number = visibleIndex + 1;
      var title = active ? active.getAttribute('data-step-title') || '' : '';
      if (progressLabel) progressLabel.textContent = 'Step ' + number + ' of ' + total;
      if (progressTitle) progressTitle.textContent = title;
      if (progressBar) progressBar.style.width = Math.max(12, (number / total) * 100) + '%';
    }

    function showStep(index) {
      currentIndex = Math.max(0, Math.min(index, steps.length - 1));
      var active = steps[currentIndex];
      steps.forEach(function (step) { step.classList.toggle('is-active', step === active); });
      syncServiceSummary();
      updateProgress();
    }

    function setError(step, message) {
      var error = step.querySelector('[data-step-error]');
      if (error) error.textContent = message || '';
    }

    function validateStep(step) {
      var type = step.getAttribute('data-step-type');
      setError(step, '');

      if (type === 'details') {
        var name = form.querySelector('[name="name"]');
        var phone = form.querySelector('[name="phone"]');
        if (!name || !name.value.trim() || !phone || !phone.value.trim()) {
          setError(step, 'Please enter your name and phone number.');
          return false;
        }
      }

      if (type === 'service') {
        if (!selectedServices().length) {
          setError(step, 'Please select at least one service.');
          return false;
        }
      }

      if (type === 'property') {
        var checked = form.querySelector('[name="property_size_choice"]:checked');
        var hiddenSize = form.querySelector('[data-property-size-field]');
        var other = form.querySelector('[data-property-other]');
        if (!checked) {
          setError(step, 'Please choose the property size.');
          return false;
        }
        if (checked.value === 'Other' && (!other || !other.value.trim())) {
          setError(step, 'Please explain the property size.');
          return false;
        }
        if (hiddenSize) hiddenSize.value = checked.value === 'Other' ? (other.value.trim() || 'Other') : checked.value;
      }

      if (type === 'date') {
        var dateHidden = form.querySelector('[data-date-field]');
        if (!dateHidden || !dateHidden.value.trim()) {
          setError(step, 'Please choose a preferred date.');
          return false;
        }
      }

      if (type === 'address') {
        var postcode = form.querySelector('[name="postcode_area"], [name="postcode"]');
        var line1 = form.querySelector('[name="address_line_1"]');
        if (!postcode || !postcode.value.trim() || !line1 || !line1.value.trim()) {
          setError(step, 'Please enter postcode and address line 1.');
          return false;
        }
      }

      return true;
    }

    function go(delta) {
      syncServiceSummary();
      var visible = visibleSteps();
      var active = steps[currentIndex];
      var pos = visible.indexOf(active);
      if (pos < 0) pos = 0;
      var nextVisible = visible[Math.max(0, Math.min(visible.length - 1, pos + delta))];
      showStep(steps.indexOf(nextVisible));
    }

    serviceOptions.forEach(function (input) {
      input.addEventListener('change', function () {
        syncServiceSummary();
        updateProgress();
      });
    });

    form.addEventListener('click', function (event) {
      var next = event.target.closest('.form-actions [data-next]');
      var back = event.target.closest('.form-actions [data-back]');
      if (next) {
        event.preventDefault();
        event.stopImmediatePropagation();
        var active = steps[currentIndex];
        if (validateStep(active)) go(1);
      }
      if (back) {
        event.preventDefault();
        event.stopImmediatePropagation();
        go(-1);
      }
    }, true);

    form.addEventListener('submit', function () {
      syncServiceSummary();
    }, true);

    showStep(currentIndex);
  });
});


/* Calendar future navigation unlock */
document.addEventListener('click', function (event) {
  var btn = event.target.closest('.calendar-nav');
  if (!btn) return;
  setTimeout(function () {
    document.querySelectorAll('.calendar-nav').forEach(function (nav) {
      nav.disabled = false;
      nav.removeAttribute('disabled');
      nav.setAttribute('aria-disabled', 'false');
    });
  }, 0);
}, true);

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.calendar-nav').forEach(function (nav) {
    nav.disabled = false;
    nav.removeAttribute('disabled');
    nav.setAttribute('aria-disabled', 'false');
  });
});


/* Calendar full-card overlay class + future-safe navigation */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-progressive-quote-form]').forEach(function (form) {
    var shell = form.closest('.quote-shell');
    var calendar = form.querySelector('[data-calendar]');
    if (!shell || !calendar) return;

    var observer = new MutationObserver(function () {
      var isOpen = !calendar.hasAttribute('hidden');
      shell.classList.toggle('calendar-open', isOpen);
      if (isOpen) {
        form.querySelectorAll('.calendar-nav').forEach(function (nav) {
          nav.disabled = false;
          nav.removeAttribute('disabled');
          nav.setAttribute('aria-disabled', 'false');
        });
      }
    });

    observer.observe(calendar, { attributes: true, attributeFilter: ['hidden'] });

    calendar.addEventListener('click', function () {
      setTimeout(function () {
        if (calendar.hasAttribute('hidden')) shell.classList.remove('calendar-open');
      }, 20);
    });
  });
});

document.addEventListener('click', function () {
  setTimeout(function () {
    document.querySelectorAll('.calendar-nav').forEach(function (nav) {
      nav.disabled = false;
      nav.removeAttribute('disabled');
      nav.setAttribute('aria-disabled', 'false');
    });
  }, 0);
}, true);


document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-calendar]').forEach(function (calendar) {
    var observer = new MutationObserver(function () {
      calendar.querySelectorAll('.calendar-nav').forEach(function (nav) {
        nav.disabled = false;
        nav.removeAttribute('disabled');
        nav.setAttribute('aria-disabled', 'false');
      });
    });
    observer.observe(calendar, { childList: true, subtree: true });
  });
});


/* Calendar navigation working fix
   Do not stop propagation here — the calendar's own popover handler must receive the click. */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-progressive-quote-form]').forEach(function (form) {
    var calendar = form.querySelector('[data-calendar]');
    if (!calendar) return;

    calendar.addEventListener('click', function () {
      setTimeout(function () {
        calendar.querySelectorAll('.calendar-nav').forEach(function (nav) {
          nav.disabled = false;
          nav.removeAttribute('disabled');
          nav.setAttribute('aria-disabled', 'false');
        });
      }, 0);
    }, false);
  });
});




/* Calendar keep-open without blocking navigation */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-progressive-quote-form]').forEach(function (form) {
    var shell = form.closest('.quote-shell');
    var calendar = form.querySelector('[data-calendar]');
    if (!shell || !calendar) return;

    calendar.addEventListener('click', function (event) {
      if (event.target.closest('.calendar-nav, [data-prev], [data-cal-next]')) {
        setTimeout(function () {
          calendar.removeAttribute('hidden');
          shell.classList.add('calendar-open');
        }, 0);
      }
    });
  });
});


/* Mobile quote focus mode
   On phones, once the customer starts the quote form, the quote card becomes the full screen. */
document.addEventListener('DOMContentLoaded', function () {
  var mobileQuery = window.matchMedia('(max-width: 760px)');
  var forms = Array.prototype.slice.call(document.querySelectorAll('[data-progressive-quote-form]'));

  function enterQuoteFocus(form) {
    if (!mobileQuery.matches || !form) return;
    document.body.classList.add('quote-focus-mode');
    var shell = form.closest('.quote-shell');
    if (shell) shell.scrollIntoView({ block: 'start' });
  }

  function exitQuoteFocus() {
    document.body.classList.remove('quote-focus-mode');
  }

  forms.forEach(function (form) {
    form.addEventListener('focusin', function () {
      enterQuoteFocus(form);
    });

    form.addEventListener('click', function (event) {
      if (
        event.target.closest('input, textarea, select, button, label, .date-trigger, .calendar-day, .calendar-nav') ||
        event.target.closest('[data-next], [data-back]')
      ) {
        enterQuoteFocus(form);
      }
    }, true);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') exitQuoteFocus();
  });

  window.addEventListener('resize', function () {
    if (!mobileQuery.matches) exitQuoteFocus();
  });
});


/* Mobile header gap / hidden-header prevention */
document.addEventListener('DOMContentLoaded', function () {
  function keepHeaderVisibleOnMobile() {
    if (!window.matchMedia('(max-width: 760px)').matches) return;
    document.querySelectorAll('.site-header').forEach(function (header) {
      header.classList.remove('is-hidden');
      header.style.transform = 'none';
      header.style.opacity = '1';
    });
  }

  keepHeaderVisibleOnMobile();
  window.addEventListener('scroll', keepHeaderVisibleOnMobile, { passive: true });
  window.addEventListener('resize', keepHeaderVisibleOnMobile);
});


/* Mobile quote heading visibility safety */
document.addEventListener('DOMContentLoaded', function () {
  function restoreQuoteHeadings() {
    if (!window.matchMedia('(max-width: 760px)').matches) return;
    document.querySelectorAll('.quote-heading').forEach(function (heading) {
      heading.style.display = 'block';
      heading.style.visibility = 'visible';
      heading.style.opacity = '1';
    });
  }

  restoreQuoteHeadings();
  window.addEventListener('resize', restoreQuoteHeadings);
});


/* Service first with contact details after address */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-progressive-quote-form]').forEach(function (form) {
    var steps = Array.prototype.slice.call(form.querySelectorAll('[data-step]'));

    function addonsAllowed() {
      return Array.prototype.slice.call(form.querySelectorAll('[data-service-option]')).some(function (input) {
        return input.checked && (input.value === 'End of tenancy cleaning' || input.value === 'Deep cleaning');
      });
    }

    function visibleSteps() {
      return steps.filter(function (step) {
        return !(step.getAttribute('data-step-type') === 'addons' && !addonsAllowed());
      });
    }

    function syncVisibleNumbers() {
      visibleSteps().forEach(function (step, i) {
        var badge = step.querySelector('.step-intro > span');
        if (badge) badge.textContent = String(i + 1);
      });
      var active = steps.find(function (step) { return step.classList.contains('is-active'); }) || visibleSteps()[0];
      var visible = visibleSteps();
      var idx = visible.indexOf(active);
      if (idx < 0) idx = 0;
      var title = form.querySelector('[data-step-title]');
      var label = form.querySelector('[data-step-label]');
      var bar = form.querySelector('[data-progress-bar]');
      if (title && active) title.textContent = active.getAttribute('data-step-title') || '';
      if (label) label.textContent = 'Step ' + (idx + 1) + ' of ' + visible.length;
      if (bar) bar.style.width = Math.max(12, ((idx + 1) / visible.length) * 100) + '%';
    }

    // Ensure service is the first active step on fresh load if no fields are filled.
    var serviceStep = form.querySelector('[data-step-type="service"]');
    if (serviceStep && !form.querySelector('[data-service-option]:checked')) {
      steps.forEach(function (step) { step.classList.toggle('is-active', step === serviceStep); });
    }

    form.addEventListener('click', function () { setTimeout(syncVisibleNumbers, 0); }, true);
    form.addEventListener('change', function () { setTimeout(syncVisibleNumbers, 0); }, true);
    form.addEventListener('input', function () { setTimeout(syncVisibleNumbers, 0); }, true);
    syncVisibleNumbers();
  });
});


// mobileCalendarFullscreenFix
(function () {
  var form = document.querySelector('[data-progressive-quote-form]');
  if (!form) return;
  function activateFullscreenForm() {
    if (window.matchMedia && window.matchMedia('(max-width: 760px)').matches && document.body) {
      document.body.classList.add('is-using-quote-form');
      window.scrollTo(0, 0);
    }
  }
  form.addEventListener('click', function (event) {
    if (event.target.closest('[data-date-trigger], [data-prev], [data-cal-next], [data-day], [data-next], [data-back], input, select, textarea, label')) {
      activateFullscreenForm();
    }
  }, true);
})();
