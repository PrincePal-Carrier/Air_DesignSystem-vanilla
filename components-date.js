/**
 * Design System - Air Date suite (Figma Air: Components, BaseDateTime 23856:83692)
 *
 * Extends DS, so load it after components.js.
 *
 * Values are ISO `YYYY-MM-DD` strings, the shape a native `type="date"` input
 * reports, so a call site can swap one in without reshaping its state. Fields
 * display MM/DD/YYYY, as every Figma variant does.
 */
(function (DS) {
  'use strict';

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const MONTH_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const DATE_RANGE_PRESETS = [
    { id: 'last_7_days', label: 'Last 7 days' },
    { id: 'month_to_date', label: 'Month to date' },
    { id: 'last_month', label: 'Last month' },
    { id: 'last_3_months', label: 'Last 3 months' },
    { id: 'last_6_months', label: 'Last 6 months' },
    { id: 'custom', label: 'Custom date' },
  ];
  const WEEKDAY_NARROW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const WEEKDAY_NAMES = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
  ];
  /* Year view range when no min/max narrows it. */
  const YEAR_SPAN_BACK = 100;
  const YEAR_SPAN_AHEAD = 50;

  function el(tag, className, attrs) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        const val = attrs[key];
        if (val == null || val === '') return;
        if (key === 'text') node.textContent = val;
        else node.setAttribute(key, val);
      });
    }
    return node;
  }

  // ── Date utilities ──
  // Local-time dates at midnight. setFullYear keeps years below 100 literal
  // instead of letting the Date constructor map them onto 19xx.

  function makeDate(y, m, d) {
    const dt = new Date(2000, 0, 1);
    dt.setFullYear(y, m, d);
    dt.setHours(0, 0, 0, 0);
    return dt;
  }

  function daysInMonth(y, m) {
    return makeDate(y, m + 1, 0).getDate();
  }

  function pad(n, width) {
    let s = String(n);
    while (s.length < width) s = '0' + s;
    return s;
  }

  /** Date for a real calendar day, or null (Feb 30, month 13, ...). */
  function validDate(y, m, d) {
    if (!(m >= 0 && m <= 11) || !(d >= 1 && d <= daysInMonth(y, m))) return null;
    return makeDate(y, m, d);
  }

  function parseIso(str) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(str == null ? '' : str).trim());
    if (!match) return null;
    return validDate(+match[1], +match[2] - 1, +match[3]);
  }

  function toIso(date) {
    if (!date) return '';
    return pad(date.getFullYear(), 4) + '-' + pad(date.getMonth() + 1, 2) + '-' + pad(date.getDate(), 2);
  }

  /** First of month from `YYYY-MM` or `YYYY/MM`, or null. */
  function parseMonth(str) {
    const match = /^(\d{4})[-/](\d{1,2})$/.exec(String(str == null ? '' : str).trim());
    if (!match) return null;
    const month = +match[2] - 1;
    if (!(month >= 0 && month <= 11)) return null;
    return makeDate(+match[1], month, 1);
  }

  function toMonth(date) {
    if (!date) return '';
    return pad(date.getFullYear(), 4) + '-' + pad(date.getMonth() + 1, 2);
  }

  function formatMonthSlash(date) {
    if (!date) return '';
    return pad(date.getFullYear(), 4) + '/' + pad(date.getMonth() + 1, 2);
  }

  function parseMonthBound(str) {
    const text = String(str == null ? '' : str).trim();
    if (!text) return null;
    return parseMonth(text) || parseIso(text);
  }

  /**
   * Inclusive ISO from/to for a named range. `last_3_months` / `last_6_months`
   * start on the first day of the month that many calendar months back, counting
   * the current month (Oct 6 -> Aug 1 for last 3 months).
   */
  function rangeFromPreset(mode, todayDate) {
    const day = todayDate || today();
    if (!mode || mode === 'custom') return null;
    if (mode === 'last_7_days') {
      return { from: toIso(addDays(day, -6)), to: toIso(day) };
    }
    if (mode === 'month_to_date') {
      return { from: toIso(makeDate(day.getFullYear(), day.getMonth(), 1)), to: toIso(day) };
    }
    if (mode === 'last_month') {
      const first = makeDate(day.getFullYear(), day.getMonth() - 1, 1);
      const last = makeDate(first.getFullYear(), first.getMonth(), daysInMonth(first.getFullYear(), first.getMonth()));
      return { from: toIso(first), to: toIso(last) };
    }
    if (mode === 'last_3_months') {
      const first = makeDate(day.getFullYear(), day.getMonth() - 2, 1);
      return { from: toIso(first), to: toIso(day) };
    }
    if (mode === 'last_6_months') {
      const first = makeDate(day.getFullYear(), day.getMonth() - 5, 1);
      return { from: toIso(first), to: toIso(day) };
    }
    return null;
  }

  /** `{ mode, from, to }` -> inclusive ISO bounds, or null when nothing is set. */
  function resolveDateRange(value, todayDate) {
    const v = value || {};
    if (!v.mode) {
      if (v.from || v.to) return { from: v.from || '', to: v.to || '' };
      return null;
    }
    if (v.mode === 'custom') {
      if (!v.from && !v.to) return null;
      return { from: v.from || '', to: v.to || '' };
    }
    return rangeFromPreset(v.mode, todayDate);
  }

  function formatDisplay(date) {
    if (!date) return '';
    return pad(date.getMonth() + 1, 2) + '/' + pad(date.getDate(), 2) + '/' + pad(date.getFullYear(), 4);
  }

  /**
   * Accepts M/D/YYYY with `/`, `-` or `.` separators, or bare MMDDYYYY: the
   * field asks for a numeric keypad, and most of those have no slash key.
   */
  function parseDisplay(str) {
    const text = String(str == null ? '' : str).trim();
    const match = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/.exec(text) ||
      /^(\d{2})(\d{2})(\d{4})$/.exec(text);
    if (!match) return null;
    return validDate(+match[3], +match[1] - 1, +match[2]);
  }

  function isSameDay(a, b) {
    return !!a && !!b && toIso(a) === toIso(b);
  }

  function addDays(date, n) {
    return makeDate(date.getFullYear(), date.getMonth(), date.getDate() + n);
  }

  /** Moves by whole months, clamping the day (Jan 31 + 1 month = Feb 28/29). */
  function addMonths(date, n) {
    const first = makeDate(date.getFullYear(), date.getMonth() + n, 1);
    const day = Math.min(date.getDate(), daysInMonth(first.getFullYear(), first.getMonth()));
    return makeDate(first.getFullYear(), first.getMonth(), day);
  }

  /** ISO strings sort lexically, so range checks compare them directly. */
  function isOutOfRange(date, min, max) {
    const iso = toIso(date);
    return (!!min && iso < min) || (!!max && iso > max);
  }

  /**
   * Weeks of a month, Sunday first. Days outside the month are null: Figma
   * leaves those cells empty rather than showing the neighbouring month.
   */
  function monthMatrix(y, m) {
    const lead = makeDate(y, m, 1).getDay();
    const total = daysInMonth(y, m);
    const cells = [];
    for (let i = 0; i < lead; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(makeDate(y, m, d));
    while (cells.length % 7) cells.push(null);
    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
    return weeks;
  }

  function today() {
    const now = new Date();
    return makeDate(now.getFullYear(), now.getMonth(), now.getDate());
  }

  /**
   * Custom date range rules for filter panels (decided 2026-10-08): no future
   * dates, To on or after From, at most CUSTOM_RANGE_MAX_MONTHS long, and no
   * earlier than FILTER_HISTORY_MONTHS back. History will depend on tier and
   * permission later; 24 months is the mock floor for every hat.
   */
  const FILTER_HISTORY_MONTHS = 24;
  const CUSTOM_RANGE_MAX_MONTHS = 12;

  function laterIso(a, b) {
    if (!a) return b || '';
    if (!b) return a;
    return a > b ? a : b;
  }

  function earlierIso(a, b) {
    if (!a) return b || '';
    if (!b) return a;
    return a < b ? a : b;
  }

  /**
   * Inclusive ISO min/max for the From and To pickers given the current picks.
   * A 12-month span runs Jan 1 to Dec 31, so To may be at most 12 months minus
   * a day after From (and From at least that much before To).
   */
  function customRangeLimits(fromStr, toStr, todayDate) {
    const day = todayDate || today();
    const floor = toIso(addMonths(day, -FILTER_HISTORY_MONTHS));
    const ceiling = toIso(day);
    const from = parseIso(fromStr);
    const to = parseIso(toStr);
    const spanFloor = to ? toIso(addDays(addMonths(to, -CUSTOM_RANGE_MAX_MONTHS), 1)) : '';
    const spanCeiling = from ? toIso(addDays(addMonths(from, CUSTOM_RANGE_MAX_MONTHS), -1)) : '';
    return {
      fromMin: laterIso(floor, spanFloor),
      fromMax: earlierIso(ceiling, toIso(to)),
      toMin: laterIso(floor, toIso(from)),
      toMax: earlierIso(ceiling, spanCeiling),
    };
  }

  /** False only for a Custom range missing From or To; Apply is blocked then. */
  function isCustomRangeComplete(value) {
    const v = value || {};
    if (v.mode !== 'custom') return true;
    return !!(v.from && v.to);
  }

  const dateUtils = {
    makeDate: makeDate,
    daysInMonth: daysInMonth,
    parseIso: parseIso,
    toIso: toIso,
    formatDisplay: formatDisplay,
    parseDisplay: parseDisplay,
    isSameDay: isSameDay,
    addDays: addDays,
    addMonths: addMonths,
    isOutOfRange: isOutOfRange,
    monthMatrix: monthMatrix,
    parseMonth: parseMonth,
    toMonth: toMonth,
    formatMonthSlash: formatMonthSlash,
    rangeFromPreset: rangeFromPreset,
    resolveDateRange: resolveDateRange,
    customRangeLimits: customRangeLimits,
    isCustomRangeComplete: isCustomRangeComplete,
    FILTER_HISTORY_MONTHS: FILTER_HISTORY_MONTHS,
    CUSTOM_RANGE_MAX_MONTHS: CUSTOM_RANGE_MAX_MONTHS,
    DATE_RANGE_PRESETS: DATE_RANGE_PRESETS,
    MONTH_SHORT: MONTH_SHORT,
  };

  /**
   * Air DatePickerInline - Figma Air Components (node 23856:83873)
   *
   * The 312px calendar panel with day, month and year views. The header label
   * drills down: day view -> month grid -> year grid; picking a year returns
   * to the month grid, picking a month returns to the days. The back arrow in
   * the month and year views returns straight to the days.
   *
   * @param {object} options
   * @param {string} [options.value] ISO date
   * @param {string} [options.min] ISO date, inclusive
   * @param {string} [options.max] ISO date, inclusive
   * @param {(date: Date) => boolean} [options.isDateDisabled]
   * @param {string} [options.today] ISO date; defaults to the real today
   * @param {(iso: string) => void} [options.onSelect]
   * @param {() => void} [options.onEscape]
   */
  function calendar(options) {
    const opts = options || {};
    const monthNames = opts.monthNames || MONTH_NAMES;
    const weekdayNarrow = opts.weekdayLabels || WEEKDAY_NARROW;
    const weekdayNames = opts.weekdayNames || WEEKDAY_NAMES;
    const todayDate = parseIso(opts.today) || today();
    let min = opts.min || '';
    let max = opts.max || '';

    let selected = parseIso(opts.value);
    let cursor = selected || clampToRange(todayDate);
    let view = 'day';

    const root = el('div', 'ds-cal');
    const header = el('div', 'ds-cal__header');
    const body = el('div', 'ds-cal__body');
    root.appendChild(header);
    root.appendChild(body);

    const titleBtn = el('button', 'ds-cal__title', { type: 'button' });
    const titleMonth = el('span', 'ds-cal__title-month');
    const titleYear = el('span', 'ds-cal__title-year');
    titleBtn.appendChild(titleMonth);
    titleBtn.appendChild(titleYear);
    titleBtn.appendChild(DS.icon({ name: 'caretDown', className: 'ds-cal__caret' }));
    titleBtn.addEventListener('click', function () {
      setView(view === 'day' ? 'month' : view === 'month' ? 'year' : 'month', true);
    });
    header.appendChild(titleBtn);

    const nav = el('div', 'ds-cal__nav');
    header.appendChild(nav);
    const prevBtn = DS.button({
      variant: 'text',
      size: 'small',
      icon: 'arrowBack',
      ariaLabel: opts.prevMonthLabel || 'Previous month',
      className: 'ds-cal__nav-btn',
      onClick: function () {
        if (view === 'day') moveCursor(addMonths(cursor, -1), false);
        else setView('day', true);
        if (prevBtn.disabled) focusActive();
      },
    });
    const nextBtn = DS.button({
      variant: 'text',
      size: 'small',
      icon: 'arrowForward',
      ariaLabel: opts.nextMonthLabel || 'Next month',
      className: 'ds-cal__nav-btn',
      onClick: function () {
        moveCursor(addMonths(cursor, 1), false);
        if (nextBtn.disabled) focusActive();
      },
    });
    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);

    function clampToRange(date) {
      const lo = parseIso(min);
      const hi = parseIso(max);
      if (lo && toIso(date) < min) return lo;
      if (hi && toIso(date) > max) return hi;
      return date;
    }

    function isDayDisabled(date) {
      return isOutOfRange(date, min, max) || (opts.isDateDisabled ? !!opts.isDateDisabled(date) : false);
    }

    /** A month or year is unreachable only when every day in it is out of range. */
    function isSpanDisabled(first, last) {
      return (!!max && toIso(first) > max) || (!!min && toIso(last) < min);
    }

    function yearBounds() {
      const lo = parseIso(min);
      const hi = parseIso(max);
      return {
        from: lo ? lo.getFullYear() : todayDate.getFullYear() - YEAR_SPAN_BACK,
        to: hi ? hi.getFullYear() : todayDate.getFullYear() + YEAR_SPAN_AHEAD,
      };
    }

    function itemButton(text, classes, attrs) {
      const btn = el('button', 'ds-cal__item' + (classes ? ' ' + classes : ''), attrs);
      btn.type = 'button';
      btn.textContent = text;
      btn.tabIndex = -1;
      return btn;
    }

    function paintHeader() {
      titleMonth.textContent = monthNames[cursor.getMonth()];
      titleYear.textContent = String(cursor.getFullYear());
      titleBtn.setAttribute(
        'aria-label',
        monthNames[cursor.getMonth()] + ' ' + cursor.getFullYear() + ', ' +
          (view === 'day'
            ? opts.chooseMonthLabel || 'choose month'
            : view === 'month'
              ? opts.chooseYearLabel || 'choose year'
              : opts.chooseMonthLabel || 'choose month')
      );
      titleBtn.setAttribute('aria-expanded', view === 'day' ? 'false' : 'true');
      root.setAttribute('data-view', view);

      /* Month/year views keep only the back arrow, as Figma's picker=month/year. */
      nextBtn.hidden = view !== 'day';
      prevBtn.setAttribute(
        'aria-label',
        view === 'day'
          ? opts.prevMonthLabel || 'Previous month'
          : opts.backLabel || 'Back to calendar'
      );
      if (view === 'day') {
        const first = makeDate(cursor.getFullYear(), cursor.getMonth(), 1);
        prevBtn.disabled = !!min && toIso(addDays(first, -1)) < min;
        nextBtn.disabled = !!max &&
          toIso(makeDate(cursor.getFullYear(), cursor.getMonth() + 1, 1)) > max;
      } else {
        prevBtn.disabled = false;
      }
    }

    function renderDays() {
      const grid = el('div', 'ds-cal__grid', {
        role: 'grid',
        'aria-label': monthNames[cursor.getMonth()] + ' ' + cursor.getFullYear(),
      });
      const head = el('div', 'ds-cal__weekdays', { role: 'row' });
      weekdayNarrow.forEach(function (label, i) {
        head.appendChild(el('span', 'ds-cal__weekday', {
          role: 'columnheader',
          'aria-label': weekdayNames[i],
          text: label,
        }));
      });
      grid.appendChild(head);

      const weeks = el('div', 'ds-cal__weeks');
      monthMatrix(cursor.getFullYear(), cursor.getMonth()).forEach(function (week) {
        const row = el('div', 'ds-cal__week', { role: 'row' });
        week.forEach(function (date) {
          const cell = el('div', 'ds-cal__cell', {
            role: 'gridcell',
            'aria-selected': date && isSameDay(date, selected) ? 'true' : undefined,
          });
          if (date) {
            const classes = [];
            const disabled = isDayDisabled(date);
            if (isSameDay(date, selected)) classes.push('is-selected');
            if (isSameDay(date, todayDate)) classes.push('is-today');
            if (disabled) classes.push('is-disabled');
            const btn = itemButton(String(date.getDate()), classes.join(' '), {
              'data-iso': toIso(date),
              'aria-label': weekdayNames[date.getDay()] + ', ' +
                monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear(),
              'aria-current': isSameDay(date, todayDate) ? 'date' : undefined,
              'aria-disabled': disabled ? 'true' : undefined,
            });
            if (isSameDay(date, cursor)) btn.tabIndex = 0;
            btn.addEventListener('click', function () {
              selectDay(date);
            });
            cell.appendChild(btn);
          }
          row.appendChild(cell);
        });
        weeks.appendChild(row);
      });
      grid.appendChild(weeks);
      grid.addEventListener('keydown', onDayKey);
      return grid;
    }

    function renderMonths() {
      const grid = el('div', 'ds-cal__picker ds-cal__picker--months', {
        role: 'listbox',
        'aria-label': opts.chooseMonthLabel || 'Choose month',
      });
      const y = cursor.getFullYear();
      monthNames.forEach(function (name, m) {
        const classes = [];
        const disabled = isSpanDisabled(makeDate(y, m, 1), makeDate(y, m, daysInMonth(y, m)));
        if (m === cursor.getMonth()) classes.push('is-selected');
        if (y === todayDate.getFullYear() && m === todayDate.getMonth()) classes.push('is-today');
        if (disabled) classes.push('is-disabled');
        const btn = itemButton(name, classes.join(' '), {
          role: 'option',
          'aria-selected': m === cursor.getMonth() ? 'true' : 'false',
          'aria-disabled': disabled ? 'true' : undefined,
        });
        if (m === cursor.getMonth()) btn.tabIndex = 0;
        btn.addEventListener('click', function () {
          if (disabled) return;
          cursor = clampToRange(makeDate(y, m, Math.min(cursor.getDate(), daysInMonth(y, m))));
          setView('day', true);
        });
        grid.appendChild(btn);
      });
      grid.addEventListener('keydown', function (e) {
        onPickerKey(e, grid, 2);
      });
      return grid;
    }

    function renderYears() {
      const grid = el('div', 'ds-cal__picker ds-cal__picker--years', {
        role: 'listbox',
        'aria-label': opts.chooseYearLabel || 'Choose year',
      });
      const bounds = yearBounds();
      const current = cursor.getFullYear();
      for (let y = bounds.from; y <= bounds.to; y++) {
        const year = y;
        const classes = [];
        const disabled = isSpanDisabled(makeDate(y, 0, 1), makeDate(y, 11, 31));
        if (y === current) classes.push('is-selected');
        if (y === todayDate.getFullYear()) classes.push('is-today');
        if (disabled) classes.push('is-disabled');
        const btn = itemButton(String(y), classes.join(' '), {
          role: 'option',
          'aria-selected': y === current ? 'true' : 'false',
          'aria-disabled': disabled ? 'true' : undefined,
        });
        if (y === current) btn.tabIndex = 0;
        btn.addEventListener('click', function () {
          if (disabled) return;
          const m = cursor.getMonth();
          cursor = clampToRange(makeDate(year, m, Math.min(cursor.getDate(), daysInMonth(year, m))));
          setView('month', true);
        });
        grid.appendChild(btn);
      }
      grid.addEventListener('keydown', function (e) {
        onPickerKey(e, grid, 3);
      });
      return grid;
    }

    /** Keeps the current year in view; waits a frame so the grid has layout. */
    function scrollYearIntoView(grid) {
      const run = function () {
        const active = grid.querySelector('.is-selected');
        if (!active || !grid.clientHeight) return;
        grid.scrollTop = active.offsetTop - (grid.clientHeight - active.offsetHeight) / 2;
      };
      if (typeof requestAnimationFrame === 'function') requestAnimationFrame(run);
      else run();
    }

    function render() {
      paintHeader();
      body.textContent = '';
      if (view === 'day') body.appendChild(renderDays());
      else if (view === 'month') body.appendChild(renderMonths());
      else {
        const years = renderYears();
        body.appendChild(years);
        scrollYearIntoView(years);
      }
    }

    function focusActive() {
      const target = body.querySelector('[tabindex="0"]');
      if (target) target.focus();
    }

    function setView(next, moveFocus) {
      view = next;
      render();
      if (moveFocus) focusActive();
    }

    function moveCursor(date, moveFocus) {
      cursor = clampToRange(date);
      render();
      if (moveFocus) focusActive();
    }

    function selectDay(date) {
      if (isDayDisabled(date)) return;
      selected = date;
      cursor = date;
      render();
      if (opts.onSelect) opts.onSelect(toIso(date));
    }

    function onDayKey(e) {
      let next = null;
      switch (e.key) {
        case 'ArrowLeft': next = addDays(cursor, -1); break;
        case 'ArrowRight': next = addDays(cursor, 1); break;
        case 'ArrowUp': next = addDays(cursor, -7); break;
        case 'ArrowDown': next = addDays(cursor, 7); break;
        case 'Home': next = addDays(cursor, -cursor.getDay()); break;
        case 'End': next = addDays(cursor, 6 - cursor.getDay()); break;
        case 'PageUp': next = addMonths(cursor, e.shiftKey ? -12 : -1); break;
        case 'PageDown': next = addMonths(cursor, e.shiftKey ? 12 : 1); break;
        default: return;
      }
      e.preventDefault();
      moveCursor(next, true);
    }

    function onPickerKey(e, grid, cols) {
      const items = Array.prototype.slice.call(grid.querySelectorAll('.ds-cal__item'));
      const index = items.indexOf(document.activeElement);
      let next = -1;
      switch (e.key) {
        case 'ArrowLeft': next = index - 1; break;
        case 'ArrowRight': next = index + 1; break;
        case 'ArrowUp': next = index - cols; break;
        case 'ArrowDown': next = index + cols; break;
        case 'Home': next = 0; break;
        case 'End': next = items.length - 1; break;
        default: return;
      }
      e.preventDefault();
      if (index < 0 || next < 0 || next >= items.length) return;
      items[index].tabIndex = -1;
      items[next].tabIndex = 0;
      items[next].focus();
    }

    /* Escape anywhere in the panel (header buttons included): the month/year
       views step back to the days first, then the owner decides (closes).
       Stopped here because DS.modal and DS.drawer close on any Escape that
       reaches document, so a picker inside one would close it too. */
    root.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (view !== 'day') {
        e.preventDefault();
        e.stopPropagation();
        setView('day', true);
      } else if (opts.onEscape) {
        e.preventDefault();
        e.stopPropagation();
        opts.onEscape();
      }
    });

    render();

    return {
      root: root,
      getValue: function () {
        return toIso(selected);
      },
      /** Sets the selection and shows its month (or today's when cleared). */
      setValue: function (iso) {
        selected = parseIso(iso);
        cursor = selected || clampToRange(todayDate);
        view = 'day';
        render();
      },
      setRange: function (nextMin, nextMax) {
        min = nextMin || '';
        max = nextMax || '';
        cursor = clampToRange(cursor);
        render();
      },
      setView: function (next) {
        setView(next, false);
      },
      focus: focusActive,
    };
  }

  let datePickerSeq = 0;

  /**
   * Air DatePicker - Figma Air Components (node 23856:84368)
   *
   * An Air TextField (`DS.textInput`) with a calendar icon button that opens
   * DatePickerInline in a popover. The value can also be typed as MM/DD/YYYY;
   * text that is not a real date, or falls outside min/max, puts the field in
   * its error state on blur.
   *
   * @param {object} options
   * @param {'xlarge'|'large'|'medium'|'small'|'xl'|'lg'|'md'|'sm'} [options.size='medium']
   * @param {string} [options.label]
   * @param {string} [options.value] ISO date
   * @param {string} [options.placeholder='MM/DD/YYYY']
   * @param {string} [options.helper]
   * @param {string} [options.min] ISO date, inclusive
   * @param {string} [options.max] ISO date, inclusive
   * @param {(date: Date) => boolean} [options.isDateDisabled]
   * @param {boolean} [options.error]
   * @param {boolean} [options.disabled]
   * @param {boolean} [options.required]
   * @param {(iso: string) => void} [options.onChange] '' when cleared or invalid
   */
  function datePicker(options) {
    const opts = options || {};
    const id = opts.id || 'ds-dp-' + ++datePickerSeq;
    let value = toIso(parseIso(opts.value));
    let min = opts.min || '';
    let max = opts.max || '';
    let externalError = !!opts.error;
    let externalMessage = opts.helper || '';
    let invalid = false;

    const field = DS.textInput({
      id: id,
      name: opts.name,
      size: opts.size,
      label: opts.label,
      placeholder: opts.placeholder || 'MM/DD/YYYY',
      value: formatDisplay(parseIso(value)),
      helper: opts.helper,
      error: opts.error,
      disabled: opts.disabled,
      required: opts.required,
      inputMode: 'numeric',
      autocomplete: 'off',
      className: 'ds-dp' + (opts.className ? ' ' + opts.className : ''),
    });
    const root = field.root;
    const input = field.input;
    const box = root.querySelector('.ds-tf__box');

    const suffix = el('span', 'ds-tf__suffix');
    const trigger = el('button', 'ds-tf__action ds-dp__trigger', {
      type: 'button',
      'aria-label': opts.openLabel || 'Choose date',
      'aria-haspopup': 'dialog',
      'aria-expanded': 'false',
    });
    trigger.appendChild(DS.icon({ name: 'calendar', className: 'ds-tf__icon' }));
    if (opts.disabled) trigger.disabled = true;
    suffix.appendChild(trigger);
    box.appendChild(suffix);

    const popover = el('div', 'ds-dp__popover', {
      id: id + '-popover',
      role: 'dialog',
      'aria-label': opts.dialogLabel || opts.label || 'Choose date',
    });
    popover.hidden = true;
    const cal = calendar({
      value: value,
      min: min,
      max: max,
      today: opts.today,
      isDateDisabled: opts.isDateDisabled,
      monthNames: opts.monthNames,
      weekdayLabels: opts.weekdayLabels,
      onSelect: function (iso) {
        input.value = formatDisplay(parseIso(iso));
        setInvalid(false);
        commit(iso);
        close();
        trigger.focus();
      },
      onEscape: function () {
        close();
        trigger.focus();
      },
    });
    popover.appendChild(cal.root);

    function commit(iso) {
      if (iso === value) return;
      value = iso;
      if (opts.onChange) opts.onChange(value);
    }

    function rangeMessage() {
      const lo = formatDisplay(parseIso(min));
      const hi = formatDisplay(parseIso(max));
      if (lo && hi) return 'Choose a date between ' + lo + ' and ' + hi;
      if (lo) return 'Choose a date on or after ' + lo;
      if (hi) return 'Choose a date on or before ' + hi;
      return 'That date is not available';
    }

    function isAllowed(date) {
      return !isOutOfRange(date, min, max) && !(opts.isDateDisabled && opts.isDateDisabled(date));
    }

    /** Internal invalid state sits on top of whatever error the caller set. */
    function setInvalid(on, message) {
      invalid = !!on;
      if (invalid) field.setError(true, message);
      else field.setError(externalError, externalMessage);
    }

    function commitTyped() {
      const text = input.value.trim();
      if (!text) {
        setInvalid(false);
        commit('');
        return;
      }
      const date = parseDisplay(text);
      if (!date) {
        setInvalid(true, opts.invalidMessage || 'Enter a valid date as MM/DD/YYYY');
        commit('');
        return;
      }
      if (!isAllowed(date)) {
        setInvalid(true, opts.rangeMessage || rangeMessage());
        commit('');
        return;
      }
      input.value = formatDisplay(date);
      setInvalid(false);
      commit(toIso(date));
    }

    input.addEventListener('change', commitTyped);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' && e.altKey) {
        e.preventDefault();
        commitTyped();
        open();
      } else if (e.key === 'Escape' && isOpen()) {
        e.preventDefault();
        e.stopPropagation();
        close();
      }
    });

    // ── Popover (same placement rules as DS.menu) ──

    function position() {
      if (!root.isConnected) {
        close();
        return;
      }
      const rect = box.getBoundingClientRect();
      const width = popover.offsetWidth || 312;
      const height = popover.offsetHeight || 0;
      const gap = 4;
      const spaceBelow = window.innerHeight - rect.bottom - gap;
      const openUp = height > 0 && spaceBelow < height && rect.top > spaceBelow;
      popover.style.left = Math.round(
        Math.max(8, Math.min(rect.left, window.innerWidth - width - 8))
      ) + 'px';
      if (openUp) {
        popover.style.top = 'auto';
        popover.style.bottom = Math.round(window.innerHeight - rect.top + gap) + 'px';
      } else {
        popover.style.bottom = 'auto';
        popover.style.top = Math.round(rect.bottom + gap) + 'px';
      }
    }

    function onDocPointer(e) {
      if (root.contains(e.target) || popover.contains(e.target)) return;
      close();
    }

    function onFocusOut(e) {
      const next = e.relatedTarget;
      if (next && (popover.contains(next) || root.contains(next))) return;
      /* relatedTarget is null when focus leaves the window; keep the panel then. */
      if (!next) return;
      close();
    }

    function onPopoverKey(e) {
      if (e.key !== 'Tab') return;
      const stops = Array.prototype.filter.call(popover.querySelectorAll('button'), function (b) {
        return !b.disabled && !b.hidden && b.tabIndex >= 0;
      });
      if (!stops.length) return;
      const first = stops[0];
      const last = stops[stops.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    popover.addEventListener('keydown', onPopoverKey);

    function isOpen() {
      return !popover.hidden;
    }

    function open() {
      if (isOpen() || input.disabled) return;
      cal.setValue(value);
      document.body.appendChild(popover);
      popover.hidden = false;
      root.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.setAttribute('aria-controls', popover.id);
      position();
      cal.focus();
      document.addEventListener('mousedown', onDocPointer, true);
      popover.addEventListener('focusout', onFocusOut);
      window.addEventListener('resize', position);
      window.addEventListener('scroll', position, true);
    }

    function close() {
      if (!isOpen()) return;
      popover.hidden = true;
      root.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.removeAttribute('aria-controls');
      document.removeEventListener('mousedown', onDocPointer, true);
      popover.removeEventListener('focusout', onFocusOut);
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
      if (popover.parentNode) popover.parentNode.removeChild(popover);
    }

    trigger.addEventListener('click', function () {
      if (isOpen()) close();
      else open();
    });

    return {
      root: root,
      input: input,
      calendar: cal,
      getValue: function () {
        return value;
      },
      /** Programmatic set; does not fire onChange, matching textInput. */
      setValue: function (iso) {
        value = toIso(parseIso(iso));
        input.value = formatDisplay(parseIso(value));
        setInvalid(false);
        cal.setValue(value);
      },
      setRange: function (nextMin, nextMax) {
        min = nextMin || '';
        max = nextMax || '';
        cal.setRange(min, max);
        if (input.value.trim()) commitTyped();
      },
      setHelper: function (text) {
        externalMessage = text || '';
        if (!invalid) field.setHelper(externalMessage);
      },
      setError: function (on, message) {
        externalError = !!on;
        if (message !== undefined) externalMessage = message || '';
        if (!invalid) field.setError(externalError, externalMessage);
      },
      setDisabled: function (on) {
        field.setDisabled(on);
        trigger.disabled = !!on;
        if (on) close();
      },
      open: open,
      close: close,
      focus: function () {
        input.focus();
      },
    };
  }

  /**
   * Month grid with a year header and prev/next year. Value is `YYYY-MM`.
   * Use `embedded: true` inside a filter overlay so the panel has no extra
   * elevation. Field+popover form: `DS.monthPicker`.
   */
  function monthCalendar(options) {
    const opts = options || {};
    const monthShort = opts.monthShort || MONTH_SHORT;
    const monthNames = opts.monthNames || MONTH_NAMES;
    const todayDate = parseIso(opts.today) || today();
    let min = opts.min || '';
    let max = opts.max || '';
    let selected = parseMonth(opts.value);
    let year = (selected || todayDate).getFullYear();

    const root = el('div', 'ds-cal ds-cal--months' + (opts.embedded ? ' ds-cal--embedded' : ''));
    const header = el('div', 'ds-cal__header ds-cal__header--year');
    const body = el('div', 'ds-cal__body');
    root.appendChild(header);
    root.appendChild(body);

    const prevBtn = DS.button({
      variant: 'text',
      color: 'primary',
      size: 'small',
      icon: 'arrowBack',
      ariaLabel: opts.prevYearLabel || 'Previous year',
      className: 'ds-cal__nav-btn',
      onClick: function () {
        year -= 1;
        render();
        if (prevBtn.disabled) focusActive();
      },
    });
    const yearLabel = el('div', 'ds-cal__year', { text: String(year) });
    const nextBtn = DS.button({
      variant: 'text',
      color: 'primary',
      size: 'small',
      icon: 'arrowForward',
      ariaLabel: opts.nextYearLabel || 'Next year',
      className: 'ds-cal__nav-btn',
      onClick: function () {
        year += 1;
        render();
        if (nextBtn.disabled) focusActive();
      },
    });
    header.appendChild(prevBtn);
    header.appendChild(yearLabel);
    header.appendChild(nextBtn);

    function yearBounds() {
      const lo = parseMonthBound(min);
      const hi = parseMonthBound(max);
      return {
        from: lo ? lo.getFullYear() : todayDate.getFullYear() - 20,
        to: hi ? hi.getFullYear() : todayDate.getFullYear() + 2,
      };
    }

    function isMonthDisabled(y, m) {
      const first = makeDate(y, m, 1);
      const last = makeDate(y, m, daysInMonth(y, m));
      const lo = parseMonthBound(min);
      const hi = parseMonthBound(max);
      if (lo) {
        const loFirst = makeDate(lo.getFullYear(), lo.getMonth(), 1);
        if (toIso(last) < toIso(loFirst)) return true;
      }
      if (hi) {
        const hiLast = makeDate(
          hi.getFullYear(),
          hi.getMonth(),
          daysInMonth(hi.getFullYear(), hi.getMonth())
        );
        if (toIso(first) > toIso(hiLast)) return true;
      }
      return false;
    }

    function itemButton(text, classes, attrs) {
      const btn = el('button', 'ds-cal__item' + (classes ? ' ' + classes : ''), attrs);
      btn.type = 'button';
      btn.textContent = text;
      btn.tabIndex = -1;
      return btn;
    }

    function focusActive() {
      const target = body.querySelector('[tabindex="0"]');
      if (target) target.focus();
    }

    function selectMonth(y, m) {
      if (isMonthDisabled(y, m)) return;
      // `deselectable`: a second click on the selected month clears it (filters).
      if (opts.deselectable && selected && selected.getFullYear() === y && selected.getMonth() === m) {
        selected = null;
        render();
        if (opts.onSelect) opts.onSelect('');
        return;
      }
      selected = makeDate(y, m, 1);
      year = y;
      render();
      if (opts.onSelect) opts.onSelect(toMonth(selected));
    }

    function render() {
      const bounds = yearBounds();
      if (year < bounds.from) year = bounds.from;
      if (year > bounds.to) year = bounds.to;
      yearLabel.textContent = String(year);
      prevBtn.disabled = year <= bounds.from;
      nextBtn.disabled = year >= bounds.to;
      root.setAttribute('aria-label', opts.dialogLabel || 'Choose month');

      const grid = el('div', 'ds-cal__picker ds-cal__picker--month-grid', {
        role: 'listbox',
        'aria-label': String(year),
      });
      const selectedMonth = selected && selected.getFullYear() === year ? selected.getMonth() : -1;
      const focusMonth = selectedMonth >= 0 ? selectedMonth : 0;
      for (let m = 0; m < 12; m++) {
        const month = m;
        const classes = [];
        const disabled = isMonthDisabled(year, m);
        if (m === selectedMonth) classes.push('is-selected');
        if (year === todayDate.getFullYear() && m === todayDate.getMonth()) classes.push('is-today');
        if (disabled) classes.push('is-disabled');
        const btn = itemButton(monthShort[m], classes.join(' '), {
          role: 'option',
          'aria-selected': m === selectedMonth ? 'true' : 'false',
          'aria-disabled': disabled ? 'true' : undefined,
          'aria-label': monthNames[m] + ' ' + year,
        });
        if (m === focusMonth) btn.tabIndex = 0;
        btn.addEventListener('click', function () {
          selectMonth(year, month);
        });
        grid.appendChild(btn);
      }
      grid.addEventListener('keydown', function (e) {
        const items = Array.prototype.slice.call(grid.querySelectorAll('.ds-cal__item'));
        const index = items.indexOf(document.activeElement);
        let next = -1;
        switch (e.key) {
          case 'ArrowLeft': next = index - 1; break;
          case 'ArrowRight': next = index + 1; break;
          case 'ArrowUp': next = index - 4; break;
          case 'ArrowDown': next = index + 4; break;
          case 'Home': next = 0; break;
          case 'End': next = items.length - 1; break;
          default: return;
        }
        e.preventDefault();
        if (index < 0 || next < 0 || next >= items.length) return;
        items[index].tabIndex = -1;
        items[next].tabIndex = 0;
        items[next].focus();
      });
      body.textContent = '';
      body.appendChild(grid);
    }

    root.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (opts.onEscape) {
        e.preventDefault();
        e.stopPropagation();
        opts.onEscape();
      }
    });

    render();

    return {
      root: root,
      getValue: function () {
        return toMonth(selected);
      },
      setValue: function (ym) {
        selected = parseMonth(ym);
        year = (selected || todayDate).getFullYear();
        render();
      },
      setRange: function (nextMin, nextMax) {
        min = nextMin || '';
        max = nextMax || '';
        render();
      },
      focus: focusActive,
    };
  }

  let monthPickerSeq = 0;

  /**
   * Text field + month-grid popover. Value is `YYYY-MM`; the field shows YYYY/MM.
   */
  function monthPicker(options) {
    const opts = options || {};
    const id = opts.id || 'ds-mp-' + ++monthPickerSeq;
    let value = toMonth(parseMonth(opts.value));
    let min = opts.min || '';
    let max = opts.max || '';
    let externalError = !!opts.error;
    let externalMessage = opts.helper || '';
    let invalid = false;

    const field = DS.textInput({
      id: id,
      name: opts.name,
      size: opts.size,
      label: opts.label,
      placeholder: opts.placeholder || 'YYYY/MM',
      value: formatMonthSlash(parseMonth(value)),
      helper: opts.helper,
      error: opts.error,
      disabled: opts.disabled,
      required: opts.required,
      inputMode: 'numeric',
      autocomplete: 'off',
      className: 'ds-dp ds-mp' + (opts.className ? ' ' + opts.className : ''),
    });
    const root = field.root;
    const input = field.input;
    const box = root.querySelector('.ds-tf__box');

    const suffix = el('span', 'ds-tf__suffix');
    const trigger = el('button', 'ds-tf__action ds-dp__trigger', {
      type: 'button',
      'aria-label': opts.openLabel || 'Choose month',
      'aria-haspopup': 'dialog',
      'aria-expanded': 'false',
    });
    trigger.appendChild(DS.icon({ name: 'calendar', className: 'ds-tf__icon' }));
    if (opts.disabled) trigger.disabled = true;
    suffix.appendChild(trigger);
    box.appendChild(suffix);

    const popover = el('div', 'ds-dp__popover ds-mp__popover', {
      id: id + '-popover',
      role: 'dialog',
      'aria-label': opts.dialogLabel || opts.label || 'Choose month',
    });
    popover.hidden = true;
    const cal = monthCalendar({
      value: value,
      min: min,
      max: max,
      today: opts.today,
      monthShort: opts.monthShort,
      monthNames: opts.monthNames,
      prevYearLabel: opts.prevYearLabel,
      nextYearLabel: opts.nextYearLabel,
      onSelect: function (ym) {
        input.value = formatMonthSlash(parseMonth(ym));
        setInvalid(false);
        commit(ym);
        close();
        trigger.focus();
      },
      onEscape: function () {
        close();
        trigger.focus();
      },
    });
    popover.appendChild(cal.root);

    function commit(ym) {
      if (ym === value) return;
      value = ym;
      if (opts.onChange) opts.onChange(value);
    }

    function setInvalid(on, message) {
      invalid = !!on;
      if (invalid) field.setError(true, message);
      else field.setError(externalError, externalMessage);
    }

    function isAllowed(date) {
      const ym = toMonth(date);
      const lo = parseMonthBound(min);
      const hi = parseMonthBound(max);
      if (lo && ym < toMonth(lo)) return false;
      if (hi && ym > toMonth(hi)) return false;
      return true;
    }

    function commitTyped() {
      const text = input.value.trim();
      if (!text) {
        setInvalid(false);
        commit('');
        return;
      }
      const date = parseMonth(text);
      if (!date) {
        setInvalid(true, opts.invalidMessage || 'Enter a month as YYYY/MM');
        commit('');
        return;
      }
      if (!isAllowed(date)) {
        setInvalid(true, opts.rangeMessage || 'That month is not available');
        commit('');
        return;
      }
      input.value = formatMonthSlash(date);
      setInvalid(false);
      commit(toMonth(date));
    }

    input.addEventListener('change', commitTyped);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown' && e.altKey) {
        e.preventDefault();
        commitTyped();
        open();
      } else if (e.key === 'Escape' && isOpen()) {
        e.preventDefault();
        e.stopPropagation();
        close();
      }
    });

    function position() {
      if (!root.isConnected) {
        close();
        return;
      }
      const rect = box.getBoundingClientRect();
      const width = popover.offsetWidth || 312;
      const height = popover.offsetHeight || 0;
      const gap = 4;
      const spaceBelow = window.innerHeight - rect.bottom - gap;
      const openUp = height > 0 && spaceBelow < height && rect.top > spaceBelow;
      popover.style.left = Math.round(
        Math.max(8, Math.min(rect.left, window.innerWidth - width - 8))
      ) + 'px';
      if (openUp) {
        popover.style.top = 'auto';
        popover.style.bottom = Math.round(window.innerHeight - rect.top + gap) + 'px';
      } else {
        popover.style.bottom = 'auto';
        popover.style.top = Math.round(rect.bottom + gap) + 'px';
      }
    }

    function onDocPointer(e) {
      if (root.contains(e.target) || popover.contains(e.target)) return;
      close();
    }

    function onFocusOut(e) {
      const next = e.relatedTarget;
      if (next && (popover.contains(next) || root.contains(next))) return;
      if (!next) return;
      close();
    }

    function isOpen() {
      return !popover.hidden;
    }

    function open() {
      if (isOpen() || input.disabled) return;
      cal.setValue(value);
      document.body.appendChild(popover);
      popover.hidden = false;
      root.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      trigger.setAttribute('aria-controls', popover.id);
      position();
      cal.focus();
      document.addEventListener('mousedown', onDocPointer, true);
      popover.addEventListener('focusout', onFocusOut);
      window.addEventListener('resize', position);
      window.addEventListener('scroll', position, true);
    }

    function close() {
      if (!isOpen()) return;
      popover.hidden = true;
      root.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.removeAttribute('aria-controls');
      document.removeEventListener('mousedown', onDocPointer, true);
      popover.removeEventListener('focusout', onFocusOut);
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
      if (popover.parentNode) popover.parentNode.removeChild(popover);
    }

    trigger.addEventListener('click', function () {
      if (isOpen()) close();
      else open();
    });

    return {
      root: root,
      input: input,
      calendar: cal,
      getValue: function () {
        return value;
      },
      setValue: function (ym) {
        value = toMonth(parseMonth(ym));
        input.value = formatMonthSlash(parseMonth(value));
        setInvalid(false);
        cal.setValue(value);
      },
      setRange: function (nextMin, nextMax) {
        min = nextMin || '';
        max = nextMax || '';
        cal.setRange(min, max);
        if (input.value.trim()) commitTyped();
      },
      setHelper: field.setHelper ? function (text) {
        externalMessage = text || '';
        if (!invalid) field.setHelper(externalMessage);
      } : function () {},
      setError: function (on, message) {
        externalError = !!on;
        if (message !== undefined) externalMessage = message || '';
        if (!invalid) field.setError(externalError, externalMessage);
      },
      setDisabled: function (on) {
        field.setDisabled(on);
        trigger.disabled = !!on;
        if (on) close();
      },
      open: open,
      close: close,
      focus: function () {
        input.focus();
      },
    };
  }

  /**
   * Filter-panel date range: named presets plus optional From / To date pickers.
   * Value: `{ mode, from, to }` with ISO dates. `mode` is a DATE_RANGE_PRESETS id.
   * Custom follows `customRangeLimits`; callers block Apply with
   * `isCustomRangeComplete` and rebuild with `showErrors: true` to flag the gap.
   */
  function dateRangeFilter(options) {
    const opts = options || {};
    const labels = opts.labels || {};
    const presets = opts.presets || DATE_RANGE_PRESETS;
    let mode = (opts.value && opts.value.mode) || '';
    let fromIso = (opts.value && opts.value.from) || '';
    let toIso = (opts.value && opts.value.to) || '';
    const name = opts.name || 'ds-drf-' + ++monthPickerSeq;

    const root = el('div', 'ds-drf' + (opts.className ? ' ' + opts.className : ''));

    function snapshot() {
      if (!mode) return { mode: '', from: '', to: '' };
      if (mode === 'custom') return { mode: 'custom', from: fromIso, to: toIso };
      const bounds = rangeFromPreset(mode) || { from: '', to: '' };
      return { mode: mode, from: bounds.from, to: bounds.to };
    }

    function emit() {
      if (opts.onChange) opts.onChange(snapshot());
    }

    let fromField = null;
    let toField = null;
    const customRow = el('div', 'ds-drf__custom');

    function syncCustom() {
      const on = mode === 'custom';
      customRow.hidden = !on;
      if (fromField && fromField.setDisabled) fromField.setDisabled(!on);
      if (toField && toField.setDisabled) toField.setDisabled(!on);
    }

    // Presets are one-or-none: clicking the selected preset again clears the
    // range, so there is no "All" row (decided 2026-10-08).
    function addRadio(id, label) {
      const row = el('label', 'ds-drf__option');
      row.appendChild(
        DS.deselectableRadio({
          name: name,
          value: id,
          getCurrent: function () {
            return mode;
          },
          onChange: function (next) {
            mode = next;
            syncCustom();
            emit();
          },
        })
      );
      row.appendChild(document.createTextNode(label));
      root.appendChild(row);
    }

    presets.forEach(function (preset) {
      addRadio(preset.id, labels[preset.id] || preset.label);
    });

    const requiredMessage = labels.required || 'Enter a date';

    function selectCustomRadio() {
      Array.prototype.forEach.call(root.querySelectorAll('input[type="radio"]'), function (radio) {
        radio.checked = radio.value === 'custom';
      });
    }

    /* Each pick narrows the other picker: no future days, the history floor,
       To on or after From, and the 12-month span. */
    function syncRanges() {
      if (!fromField || !toField) return;
      const limits = customRangeLimits(fromIso, toIso, opts.today ? parseIso(opts.today) : null);
      fromField.setRange(limits.fromMin, limits.fromMax);
      toField.setRange(limits.toMin, limits.toMax);
    }

    /** Custom needs both ends; flags each empty field. True when Apply may go. */
    function validate() {
      if (mode !== 'custom') return true;
      let ok = true;
      [[fromField, fromIso], [toField, toIso]].forEach(function (pair) {
        if (pair[1]) return;
        pair[0].setError(true, requiredMessage);
        ok = false;
      });
      return ok;
    }

    function onFieldChange(field, iso) {
      if (iso) field.setError(false, '');
      mode = 'custom';
      selectCustomRadio();
      syncRanges();
      emit();
    }

    fromField = DS.datePicker({
      label: labels.from || 'From',
      value: fromIso,
      size: opts.size || 'medium',
      disabled: mode !== 'custom',
      today: opts.today,
      onChange: function (iso) {
        fromIso = iso || '';
        onFieldChange(fromField, fromIso);
      },
    });
    toField = DS.datePicker({
      label: labels.to || 'To',
      value: toIso,
      size: opts.size || 'medium',
      disabled: mode !== 'custom',
      today: opts.today,
      onChange: function (iso) {
        toIso = iso || '';
        onFieldChange(toField, toIso);
      },
    });
    customRow.appendChild(fromField.root);
    customRow.appendChild(toField.root);
    root.appendChild(customRow);
    syncCustom();
    syncRanges();
    if (opts.showErrors) validate();

    return {
      root: root,
      getValue: snapshot,
      validate: validate,
      setValue: function (next) {
        const v = next || {};
        mode = v.mode || '';
        fromIso = v.from || '';
        toIso = v.to || '';
        Array.prototype.forEach.call(root.querySelectorAll('input[type="radio"]'), function (radio) {
          radio.checked = radio.value === mode;
        });
        if (fromField) fromField.setValue(fromIso);
        if (toField) toField.setValue(toIso);
        syncCustom();
        syncRanges();
      },
    };
  }

  DS.dateUtils = dateUtils;
  DS.calendar = calendar;
  DS.datePicker = datePicker;
  DS.monthCalendar = monthCalendar;
  DS.monthPicker = monthPicker;
  DS.dateRangeFilter = dateRangeFilter;
})(DS);
