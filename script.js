// PDD Cleaning Services — static site interactions
// Mobile menu, active navigation, reveal animations, progressive quote flow,
// custom date picker and live address dropdown shell.
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

  document.body.classList.add('js-ready');

  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function pad(number) {
    return String(number).padStart(2, '0');
  }

  function toISODate(date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
  }

  function formatDisplayDate(date) {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  function fromISODate(value) {
    if (!value) return null;
    var parts = value.split('-').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return null;
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function closeOtherCalendars(currentPicker) {
    document.querySelectorAll('[data-date-picker]').forEach(function (picker) {
      if (picker !== currentPicker) {
        var popover = picker.querySelector('[data-calendar]');
        var trigger = picker.querySelector('[data-date-trigger]');
        if (popover) popover.hidden = true;
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function setupDatePicker(form, updateFlow) {
    var picker = form.querySelector('[data-date-picker]');
    if (!picker) return;

    var trigger = picker.querySelector('[data-date-trigger]');
    var label = picker.querySelector('[data-date-label]');
    var popover = picker.querySelector('[data-calendar]');
    var hidden = form.querySelector('[data-date-field]');
    var today = startOfDay(new Date());
    var state = {
      view: new Date(today.getFullYear(), today.getMonth(), 1)
    };

    function setSelected(date) {
      if (!hidden) return;
      hidden.value = toISODate(date);
      if (label) label.textContent = formatDisplayDate(date);
      if (trigger) trigger.classList.add('has-value');
      if (popover) popover.hidden = true;
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      form.classList.remove('has-date-error');
      updateFlow();
    }

    function renderCalendar() {
      if (!popover) return;
      var year = state.view.getFullYear();
      var month = state.view.getMonth();
      var monthName = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' }).format(state.view);
      var first = new Date(year, month, 1);
      var startOffset = (first.getDay() + 6) % 7; // Monday-first calendar
      var start = new Date(year, month, 1 - startOffset);
      var selectedDate = hidden && hidden.value ? fromISODate(hidden.value) : null;

      var html = '';
      html += '<div class="calendar-head">';
      html += '<button type="button" class="calendar-nav" data-calendar-prev aria-label="Previous month">‹</button>';
      html += '<strong>' + monthName + '</strong>';
      html += '<button type="button" class="calendar-nav" data-calendar-next aria-label="Next month">›</button>';
      html += '</div>';
      html += '<div class="calendar-weekdays"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>';
      html += '<div class="calendar-grid">';

      for (var i = 0; i < 42; i += 1) {
        var day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
        var isOtherMonth = day.getMonth() !== month;
        var isPast = startOfDay(day) < today;
        var isToday = toISODate(day) === toISODate(today);
        var isSelected = selectedDate && toISODate(day) === toISODate(selectedDate);
        var classes = ['calendar-day'];
        if (isOtherMonth) classes.push('is-muted');
        if (isToday) classes.push('is-today');
        if (isSelected) classes.push('is-selected');
        html += '<button type="button" class="' + classes.join(' ') + '" data-calendar-day="' + toISODate(day) + '"' + (isPast ? ' disabled' : '') + '>' + day.getDate() + '</button>';
      }

      html += '</div>';
      popover.innerHTML = html;
    }

    if (trigger) {
      trigger.addEventListener('click', function () {
        closeOtherCalendars(picker);
        renderCalendar();
        var willOpen = popover ? popover.hidden : false;
        if (popover) popover.hidden = !willOpen;
        trigger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      });
    }

    if (popover) {
      popover.addEventListener('click', function (event) {
        var prev = event.target.closest('[data-calendar-prev]');
        var next = event.target.closest('[data-calendar-next]');
        var dayButton = event.target.closest('[data-calendar-day]');
        if (prev) {
          state.view = new Date(state.view.getFullYear(), state.view.getMonth() - 1, 1);
          renderCalendar();
          return;
        }
        if (next) {
          state.view = new Date(state.view.getFullYear(), state.view.getMonth() + 1, 1);
          renderCalendar();
          return;
        }
        if (dayButton && !dayButton.disabled) {
          var selected = fromISODate(dayButton.getAttribute('data-calendar-day'));
          if (selected) setSelected(selected);
        }
      });
    }

    document.addEventListener('click', function (event) {
      if (!picker.contains(event.target) && popover && !popover.hidden) {
        popover.hidden = true;
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && popover && !popover.hidden) {
        popover.hidden = true;
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function normaliseAddressResults(data) {
    var raw = [];
    if (Array.isArray(data)) raw = data;
    else if (data && Array.isArray(data.suggestions)) raw = data.suggestions;
    else if (data && Array.isArray(data.addresses)) raw = data.addresses;
    else if (data && Array.isArray(data.results)) raw = data.results;
    else if (data && Array.isArray(data.data)) raw = data.data;

    return raw.map(function (item) {
      if (typeof item === 'string') return { label: item, value: item };
      if (!item || typeof item !== 'object') return null;
      var label = item.label || item.address || item.formatted_address || item.line_1 || item.summary || item.text || item.description;
      var value = item.value || item.address || item.formatted_address || label;
      if (!label && item.line_1 && item.postcode) label = item.line_1 + ', ' + item.postcode;
      if (!value && label) value = label;
      return label ? { label: label, value: value } : null;
    }).filter(Boolean).slice(0, 10);
  }

  function setupAddressLookup(form, updateFlow) {
    var lookup = form.querySelector('[data-address-lookup]');
    if (!lookup) return;

    var input = lookup.querySelector('[data-address-input]');
    var results = lookup.querySelector('[data-address-results]');
    var status = form.querySelector('[data-address-status]');
    var endpoint = form.getAttribute('data-address-endpoint') || 'https://pdd-pink.vercel.app/api/address-autocomplete';
    var activeRequest = 0;
    var debounceTimer = null;

    function setStatus(message) {
      if (status) status.textContent = message;
    }

    function hideResults() {
      if (results) {
        results.hidden = true;
        results.innerHTML = '';
      }
      if (input) input.setAttribute('aria-expanded', 'false');
    }

    function showResults(items) {
      if (!results || !input) return;
      if (!items.length) {
        hideResults();
        setStatus('Keep typing, or enter the full address manually if it does not appear.');
        return;
      }
      results.innerHTML = items.map(function (item, index) {
        return '<button type="button" class="address-option" role="option" data-address-value="' + item.value.replace(/"/g, '&quot;') + '" data-address-index="' + index + '">' + item.label + '</button>';
      }).join('');
      results.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      setStatus('Choose the correct address from the dropdown.');
    }

    function fetchAddresses(query) {
      activeRequest += 1;
      var requestId = activeRequest;
      setStatus('Searching addresses…');
      fetch(endpoint + '?query=' + encodeURIComponent(query), {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Address lookup failed');
          return response.json();
        })
        .then(function (data) {
          if (requestId !== activeRequest) return;
          showResults(normaliseAddressResults(data));
        })
        .catch(function () {
          if (requestId !== activeRequest) return;
          hideResults();
          setStatus('Keep typing, or enter the full address manually if it does not appear.');
        });
    }

    if (input) {
      input.addEventListener('input', function () {
        updateFlow();
        var query = input.value.trim();
        window.clearTimeout(debounceTimer);
        if (query.length < 1) {
          hideResults();
          setStatus('Start typing and choose the correct address if it appears. You can also type the full address manually.');
          return;
        }
        debounceTimer = window.setTimeout(function () { fetchAddresses(query); }, 180);
      });

      input.addEventListener('blur', function () {
        window.setTimeout(hideResults, 180);
      });
    }

    if (results) {
      results.addEventListener('click', function (event) {
        var option = event.target.closest('[data-address-value]');
        if (!option || !input) return;
        input.value = option.getAttribute('data-address-value') || option.textContent;
        hideResults();
        setStatus('Address selected.');
        updateFlow();
      });
    }
  }

  // Progressive quote form: details → services → date → address → notes
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

    setupDatePicker(form, updateFlow);
    setupAddressLookup(form, updateFlow);

    serviceOptions.forEach(function (option) { option.addEventListener('change', updateFlow); });
    if (addressField) addressField.addEventListener('input', updateFlow);

    form.addEventListener('submit', function (event) {
      if (!selectedServices().length) {
        event.preventDefault();
        var dropdown = form.querySelector('[data-service-dropdown]');
        if (dropdown) dropdown.open = true;
        if (dropdown) dropdown.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        return;
      }

      if (!dateField || !dateField.value) {
        event.preventDefault();
        form.classList.add('has-date-error');
        setSection(dateSection, true);
        var trigger = form.querySelector('[data-date-trigger]');
        var popover = form.querySelector('[data-calendar]');
        if (trigger) trigger.focus();
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
        if (popover) popover.hidden = false;
        return;
      }

      updateFlow();
    });

    updateFlow();
  });
});
