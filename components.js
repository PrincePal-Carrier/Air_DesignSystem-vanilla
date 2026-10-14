/**
 * Design System - Platform shell components
 */
const DS = (function () {
  'use strict';

  const AIR_ICON_URLS = Object.freeze({
    chevronDown: 'https://air-icon-library.vercel.app/icons/outlined/navigation/chevron_down.svg',
    chevronRight: 'https://air-icon-library.vercel.app/icons/outlined/navigation/chevron_right.svg',
    dashboard: 'https://air-icon-library.vercel.app/icons/outlined/navigation/dashboard.svg',
    map: 'https://air-icon-library.vercel.app/icons/outlined/navigation/map.svg',
    pageTemplate: 'https://air-icon-library.vercel.app/icons/outlined/air/page_template.svg',
    placeholder: 'https://air-icon-library.vercel.app/icons/outlined/air/placeholder.svg',
    help: 'https://air-icon-library.vercel.app/icons/outlined/action/help.svg',
    settings: 'https://air-icon-library.vercel.app/icons/outlined/action/settings.svg',
    menu: 'https://air-icon-library.vercel.app/icons/outlined/navigation/menu.svg',
    remote: 'https://air-icon-library.vercel.app/icons/outlined/assets-and-devices/wall_controller.svg',
    settingsRemote: 'https://air-icon-library.vercel.app/icons/outlined/connection/settings_remote.svg',
    home: 'https://air-icon-library.vercel.app/icons/outlined/navigation/home.svg',
    deviceManager: 'https://air-icon-library.vercel.app/icons/outlined/assets-and-devices/device_manager.svg',
    office: 'https://air-icon-library.vercel.app/icons/outlined/navigation/office.svg',
    chart: 'https://air-icon-library.vercel.app/icons/outlined/action/analysis.svg',
    people: 'https://air-icon-library.vercel.app/icons/outlined/user/group.svg',
    tune: 'https://air-icon-library.vercel.app/icons/outlined/action/tune.svg',
    calendar: 'https://air-icon-library.vercel.app/icons/outlined/date-and-time/calendar.svg',
    thermometerAlert: 'https://air-icon-library.vercel.app/icons/outlined/climate/thermometer_alert.svg',
    heatPump: 'https://air-icon-library.vercel.app/icons/outlined/assets-and-devices/heat_pump.svg',
    airMonitor: 'https://air-icon-library.vercel.app/icons/outlined/assets-and-devices/air_monitor.svg',
    gateway: 'https://air-icon-library.vercel.app/icons/outlined/connection/gateway.svg',
    event: 'https://air-icon-library.vercel.app/icons/outlined/date-and-time/event_upcoming.svg',
    warningTriangle: 'https://air-icon-library.vercel.app/icons/outlined/notifications/warning_triangle.svg',
    trending: 'https://air-icon-library.vercel.app/icons/outlined/format/trending_up_chart.svg',
    history: 'https://air-icon-library.vercel.app/icons/outlined/date-and-time/time_clock_history.svg',
    listBulleted: 'https://air-icon-library.vercel.app/icons/outlined/format/format_list_bulleted.svg',
    documentation: 'https://air-icon-library.vercel.app/icons/outlined/format/documentation.svg',
    userCheck: 'https://air-icon-library.vercel.app/icons/outlined/user/user_check.svg',
    configure: 'https://air-icon-library.vercel.app/icons/outlined/action/run_configure.svg',
    userSettings: 'https://air-icon-library.vercel.app/icons/outlined/user/user_settings.svg',
    entryTier: 'https://air-icon-library.vercel.app/icons/outlined/assets-and-devices/entry_tier.svg',
    notifications: 'https://air-icon-library.vercel.app/icons/outlined/notifications/notifications.svg',
    search: 'https://air-icon-library.vercel.app/icons/outlined/action/search.svg',
    // Air library has no more_vert; use a local ⋮ so row/bulk action triggers always paint
    moreVert: 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">' +
      '<circle cx="12" cy="6" r="1.75" fill="#64686B"/>' +
      '<circle cx="12" cy="12" r="1.75" fill="#64686B"/>' +
      '<circle cx="12" cy="18" r="1.75" fill="#64686B"/>' +
      '</svg>'
    ),
    refresh: 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">' +
      '<path d="M17.65 6.35A7.95 7.95 0 0 0 12 4a8 8 0 1 0 7.75 10h-2.1A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35Z" fill="#64686B"/>' +
      '</svg>'
    ),
    // Local view-column glyph for table column picker
    columns: 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">' +
      '<rect x="4" y="5" width="4" height="14" rx="1" fill="#64686B"/>' +
      '<rect x="10" y="5" width="4" height="14" rx="1" fill="#64686B"/>' +
      '<rect x="16" y="5" width="4" height="14" rx="1" fill="#64686B"/>' +
      '</svg>'
    ),
    close: 'https://air-icon-library.vercel.app/icons/outlined/action/clear.svg',
    // TextField suffix adornments (Figma TextField examples 23562:207694)
    visibility: 'https://air-icon-library.vercel.app/icons/outlined/action/visibility.svg',
    visibilityOff: 'https://air-icon-library.vercel.app/icons/outlined/action/visibility_off.svg',
    email: 'https://air-icon-library.vercel.app/icons/outlined/action/email.svg',
    filter: 'https://air-icon-library.vercel.app/icons/outlined/action/tune.svg',
    chevronUp: 'https://air-icon-library.vercel.app/icons/outlined/navigation/chevron_up.svg',
    sort: 'https://air-icon-library.vercel.app/icons/outlined/action/swap_vert.svg',
    delete: 'https://air-icon-library.vercel.app/icons/outlined/action/delete.svg',
    restore: 'https://air-icon-library.vercel.app/icons/outlined/date-and-time/time_clock_restore.svg',
    download: 'https://air-icon-library.vercel.app/icons/outlined/action/download.svg',
    fileUpload: 'https://air-icon-library.vercel.app/icons/outlined/action/file_upload.svg',
    // Date suite (components-date.js). Figma's own arrow/caret instances are deprecated.
    arrowBack: 'https://air-icon-library.vercel.app/icons/outlined/navigation/arrow_back.svg',
    arrowForward: 'https://air-icon-library.vercel.app/icons/outlined/navigation/arrow_forward.svg',
    caretDown: 'https://air-icon-library.vercel.app/icons/outlined/navigation/caret_down.svg',
    calendarRange: 'https://air-icon-library.vercel.app/icons/outlined/date-and-time/calendar_daterange.svg',
    timeClock: 'https://air-icon-library.vercel.app/icons/outlined/date-and-time/time_clock.svg',
  });

  function el(tag, className, attrs) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        const val = attrs[key];
        if (val == null || val === '') return;
        if (key === 'text') node.textContent = val;
        else if (key === 'html') node.innerHTML = val;
        else node.setAttribute(key, val);
      });
    }
    return node;
  }

  function iconUrl(name) {
    return AIR_ICON_URLS[name] || AIR_ICON_URLS.placeholder;
  }

  /** Air Icon Library <img> */
  function icon(options) {
    const opts = options || {};
    return el('img', opts.className || 'platform-nav__icon', {
      src: iconUrl(opts.name || 'placeholder'),
      alt: opts.alt != null ? opts.alt : '',
      'aria-hidden': opts.ariaHidden === false ? undefined : 'true',
    });
  }

  /**
   * Air Tag for categorical table cells (status, online, power, HVAC mode).
   * Color + label; never color alone. Optional start icon name from AIR_ICON_URLS
   * or a compact local glyph (play, snowflake, sun, fan, droplet, warning).
   */
  function tag(options) {
    const opts = options || {};
    const color = opts.color || 'neutral';
    const size = opts.size || 'small';
    const root = el(
      'span',
      'ds-tag ds-tag--' + color + (size === 'medium' ? ' ds-tag--medium' : '')
    );
    if (opts.title) root.setAttribute('title', opts.title);
    if (opts.icon) {
      if (AIR_ICON_URLS[opts.icon]) {
        root.appendChild(
          icon({
            name: opts.icon,
            className: 'ds-tag__icon',
            alt: '',
          })
        );
      } else {
        const glyph = el('span', 'ds-tag__glyph ds-tag__glyph--' + opts.icon);
        glyph.setAttribute('aria-hidden', 'true');
        root.appendChild(glyph);
      }
    }
    root.appendChild(el('span', 'ds-tag__label', { text: opts.label || '' }));
    return root;
  }

  /** FAQ / Setting style pill in the nav footer */
  function navChip(options) {
    const opts = options || {};
    const classes = ['platform-nav__chip'];
    if (opts.className) classes.push(opts.className);
    const btn = el('button', classes.join(' '), {
      type: 'button',
      title: opts.label,
    });
    btn.appendChild(icon({
      name: opts.icon || 'placeholder',
      className: opts.iconClassName || 'platform-nav__chip-icon',
    }));
    btn.appendChild(el('span', 'platform-nav__chip-label', { text: opts.label }));
    if (opts.onClick) {
      btn.addEventListener('click', opts.onClick);
    }
    return btn;
  }

  /**
   * Nav row button.
   * variant: 'group' | 'child' | 'leaf'
   * Returns { root, chevron } (chevron only for group).
   */
  function navItem(options) {
    const opts = options || {};
    const variant = opts.variant || 'leaf';
    const btn = el('button', 'platform-nav__item platform-nav__item--' + variant, {
      type: 'button',
      title: opts.label,
      'data-route': opts.routeId || undefined,
      'aria-expanded': variant === 'group'
        ? (opts.expanded ? 'true' : 'false')
        : undefined,
      'aria-controls': variant === 'group' ? opts.controlsId : undefined,
    });

    const iconTile = el('span', 'platform-nav__icon-tile', { 'aria-hidden': 'true' });
    iconTile.appendChild(icon({
      name: opts.icon || 'placeholder',
      className: 'platform-nav__icon',
    }));
    btn.appendChild(iconTile);
    btn.appendChild(el('span', 'platform-nav__label', { text: opts.label }));

    let chevron = null;
    if (variant === 'group') {
      chevron = icon({
        name: opts.expanded ? 'chevronDown' : 'chevronRight',
        className: 'platform-nav__chevron',
      });
      btn.appendChild(chevron);
    }

    if (opts.onClick) {
      btn.addEventListener('click', opts.onClick);
    }

    return { root: btn, chevron: chevron };
  }

  /**
   * Air Button - Figma Air Components (node 22505:15481)
   *
   * @param {object} options
   * @param {'contained'|'outlined'|'text'|'primary'|'outline'|'ghost'} [options.variant='contained']
   *   Legacy: primary→contained+primary, outline→outlined+primary, ghost→text+secondary
   * @param {'primary'|'secondary'|'error'|'warning'|'info'|'success'} [options.color]
   * @param {'xlarge'|'large'|'medium'|'small'|'xsmall'|'xl'|'lg'|'md'|'sm'|'xs'} [options.size='medium']
   * @param {string} [options.text]
   * @param {string} [options.icon] start icon (legacy)
   * @param {string} [options.startIcon]
   * @param {string} [options.endIcon]
   * @param {boolean} [options.iconOnly]
   * @param {boolean} [options.fullWidth]
   * @param {boolean} [options.inline] legacy; width is auto unless fullWidth
   * @param {boolean} [options.loading]
   * @param {boolean} [options.disabled]
   */
  function button(options) {
    const opts = options || {};

    const VARIANT_ALIAS = {
      primary: { variant: 'contained', color: 'primary' },
      outline: { variant: 'outlined', color: 'primary' },
      ghost: { variant: 'text' },
      contained: { variant: 'contained' },
      outlined: { variant: 'outlined' },
      text: { variant: 'text' },
    };
    const SIZE_ALIAS = {
      xlarge: 'xlarge',
      large: 'large',
      medium: 'medium',
      small: 'small',
      xsmall: 'xsmall',
      xl: 'xlarge',
      lg: 'large',
      md: 'medium',
      sm: 'small',
      xs: 'xsmall',
    };
    const COLORS = {
      primary: true,
      secondary: true,
      error: true,
      warning: true,
      info: true,
      success: true,
    };

    const rawVariant = opts.variant || 'contained';
    const mapped = VARIANT_ALIAS[rawVariant] || { variant: 'contained' };
    const variant = mapped.variant;
    const color = opts.color || mapped.color || (variant === 'text' ? null : 'primary');
    const size = SIZE_ALIAS[opts.size] || (opts.size ? String(opts.size) : 'medium');
    const startIconName = opts.startIcon || opts.icon || null;
    const endIconName = opts.endIcon || null;
    const iconOnly = !!(opts.iconOnly || ((startIconName || endIconName) && !opts.text));

    const classes = ['ds-btn', 'ds-btn--' + variant, 'ds-btn--' + size];
    if (color && COLORS[color]) classes.push('ds-btn--' + color);
    if (opts.fullWidth || opts.block) classes.push('ds-btn--full-width');
    else if (opts.inline !== false) classes.push('ds-btn--inline');
    if (iconOnly) classes.push('ds-btn--icon-only');
    if (opts.loading) classes.push('is-loading');
    if (opts.className) classes.push(opts.className);

    const btn = el('button', classes.join(' '), {
      type: opts.type || 'button',
      id: opts.id || undefined,
      'aria-label': opts.ariaLabel || (iconOnly ? opts.text : undefined) || undefined,
      title: opts.title || undefined,
      'aria-busy': opts.loading ? 'true' : undefined,
    });

    if (startIconName) {
      btn.appendChild(icon({
        name: startIconName,
        className: 'ds-btn__icon ds-btn__icon--start',
      }));
    }
    if (opts.text && !iconOnly) {
      btn.appendChild(el('span', 'ds-btn__label', { text: opts.text }));
    }
    if (endIconName && !iconOnly) {
      btn.appendChild(icon({
        name: endIconName,
        className: 'ds-btn__icon ds-btn__icon--end',
      }));
    }
    if (opts.disabled || opts.loading) btn.disabled = true;
    if (opts.onClick) btn.addEventListener('click', opts.onClick);
    return btn;
  }

  function tabs(options) {
    const opts = options || {};
    const root = el('div', 'ds-tabs', { role: 'tablist' });
    const items = opts.items || [];
    let activeId = opts.activeId || (items[0] && items[0].id);

    function render() {
      root.innerHTML = '';
      items.forEach(function (item) {
        const btn = el('button', 'ds-tabs__tab' + (item.id === activeId ? ' is-active' : ''), {
          type: 'button',
          role: 'tab',
          id: 'tab-' + item.id,
          'aria-selected': item.id === activeId ? 'true' : 'false',
          text: item.label,
        });
        btn.addEventListener('click', function () {
          if (item.id === activeId) return;
          activeId = item.id;
          render();
          if (opts.onChange) opts.onChange(item.id);
        });
        root.appendChild(btn);
      });
    }

    render();
    return {
      root: root,
      setActive: function (id) {
        activeId = id;
        render();
      },
      getActive: function () {
        return activeId;
      },
    };
  }

  function searchField(options) {
    const opts = options || {};
    const root = el('label', 'ds-search');
    root.appendChild(icon({ name: 'search', className: 'ds-search__icon' }));
    const input = el('input', 'ds-search__input', {
      type: 'search',
      placeholder: opts.placeholder || 'Search',
      value: opts.value || '',
      'aria-label': opts.ariaLabel || opts.placeholder || 'Search',
    });
    if (opts.onInput) {
      input.addEventListener('input', function () {
        opts.onInput(input.value);
      });
    }
    root.appendChild(input);
    return {
      root: root,
      input: input,
      setValue: function (v) {
        input.value = v || '';
      },
      getValue: function () {
        return input.value;
      },
    };
  }

  function appendFieldHelper(root, text) {
    if (!text) return null;
    return root.appendChild(el('span', 'ds-field__helper', { text: text }));
  }

  function textField(options) {
    const opts = options || {};
    const root = el('label', 'ds-field');
    if (opts.label) {
      root.appendChild(el('span', 'ds-field__label', { text: opts.label }));
    }
    const input = el('input', 'ds-field__input', {
      type: opts.type || 'text',
      placeholder: opts.placeholder || '',
      value: opts.value || '',
      name: opts.name || undefined,
      required: opts.required ? 'required' : undefined,
    });
    if (opts.onInput) {
      input.addEventListener('input', function () {
        opts.onInput(input.value);
      });
    }
    root.appendChild(input);
    let helperEl = appendFieldHelper(root, opts.helper);

    function setHelper(text) {
      if (!text) {
        if (helperEl && helperEl.parentNode) helperEl.parentNode.removeChild(helperEl);
        helperEl = null;
        return;
      }
      if (!helperEl) helperEl = appendFieldHelper(root, text);
      else helperEl.textContent = text;
    }

    return {
      root: root,
      input: input,
      getValue: function () {
        return input.value;
      },
      setValue: function (v) {
        input.value = v || '';
      },
      setHelper: setHelper,
      /* Same shape as textInput's setError, so callers can treat the two alike. */
      setError: function (on, message) {
        root.classList.toggle('is-error', !!on);
        if (on) input.setAttribute('aria-invalid', 'true');
        else input.removeAttribute('aria-invalid');
        if (message !== undefined) setHelper(message);
      },
    };
  }

  let textInputSeq = 0;

  const TF_SIZE_ALIAS = {
    xlarge: 'xlarge',
    large: 'large',
    medium: 'medium',
    small: 'small',
    xl: 'xlarge',
    lg: 'large',
    md: 'medium',
    sm: 'small',
  };
  const TF_COLORS = {
    primary: true,
    error: true,
    warning: true,
    success: true,
    info: true,
  };

  /**
   * Air TextField - Figma Air Components (node 18128:89412)
   *
   * Floating-label input. Prefer this over the older stacked-label `textField`
   * for new screens; `textField` stays for the forms already built on it.
   *
   * The label floats at xlarge/large only - medium/small are too short to stack
   * a label over the value, so there the label fades out once the field is
   * filled, exactly as the Figma variant matrix does it.
   *
   * @param {object} options
   * @param {'xlarge'|'large'|'medium'|'small'|'xl'|'lg'|'md'|'sm'} [options.size='medium']
   * @param {'primary'|'error'|'warning'|'success'|'info'} [options.color='primary']
   * @param {string} [options.label]
   * @param {string} [options.placeholder] revealed once the label floats
   * @param {string} [options.value]
   * @param {string} [options.type='text']
   * @param {string} [options.helper] helper text under the box
   * @param {number} [options.maxLength] also drives the character counter
   * @param {boolean} [options.showCounter=true] when maxLength is set
   * @param {string} [options.prefix] static unit text, e.g. "Kg"
   * @param {string} [options.suffixIcon] Air icon name
   * @param {boolean} [options.clearable] clear button in the suffix
   * @param {boolean} [options.revealable] password show/hide toggle
   * @param {boolean} [options.filled] Figma `backgroundColor`
   * @param {boolean} [options.showBorder=true]
   * @param {boolean} [options.multiline] TextareaAutosize (Figma 18300:125928)
   * @param {boolean} [options.error]
   * @param {boolean} [options.disabled]
   * @param {boolean} [options.required]
   */
  function textInput(options) {
    const opts = options || {};
    const size = TF_SIZE_ALIAS[opts.size] || 'medium';
    const color = TF_COLORS[opts.color] ? opts.color : 'primary';
    const multiline = !!opts.multiline;
    const id = opts.id || 'ds-tf-' + ++textInputSeq;
    const helperId = id + '-helper';

    const classes = ['ds-tf', 'ds-tf--' + size, 'ds-tf--' + color];
    if (multiline) classes.push('ds-tf--multiline');
    if (multiline && opts.resizable) classes.push('ds-tf--resizable');
    if (opts.filled) classes.push('ds-tf--filled');
    if (opts.showBorder === false) classes.push('ds-tf--borderless');
    if (!opts.label) classes.push('ds-tf--no-label');
    if (opts.error) classes.push('is-error');
    if (opts.disabled) classes.push('is-disabled');
    if (opts.className) classes.push(opts.className);

    const root = el('div', classes.join(' '));
    const box = el('div', 'ds-tf__box');
    root.appendChild(box);

    if (opts.prefix) {
      box.appendChild(el('span', 'ds-tf__prefix', {
        text: opts.prefix,
        'aria-hidden': 'true',
      }));
    }

    const field = el('span', 'ds-tf__field');
    box.appendChild(field);

    /**
     * The input precedes the label so the float can key off
     * `:not(:placeholder-shown)` with an adjacent-sibling selector. A space is
     * used when no placeholder is given - the pseudo-class needs a non-empty
     * placeholder to mean "empty", and ::placeholder stays transparent until
     * the label is out of the way.
     */
    const input = el(multiline ? 'textarea' : 'input', 'ds-tf__input', {
      id: id,
      name: opts.name || undefined,
      type: multiline ? undefined : opts.type || 'text',
      placeholder: opts.placeholder || ' ',
      maxlength: opts.maxLength || undefined,
      rows: multiline ? opts.rows || 2 : undefined,
      inputmode: opts.inputMode || undefined,
      autocomplete: opts.autocomplete || undefined,
      'aria-describedby': opts.helper ? helperId : undefined,
      'aria-invalid': opts.error ? 'true' : undefined,
    });
    input.value = opts.value == null ? '' : String(opts.value);
    if (opts.disabled) input.disabled = true;
    if (opts.required) input.required = true;
    field.appendChild(input);

    if (opts.label) {
      const label = el('label', 'ds-tf__label', { for: id });
      label.appendChild(el('span', 'ds-tf__label-text', { text: opts.label }));
      if (opts.required) {
        label.appendChild(el('span', 'ds-tf__required', {
          text: '*',
          'aria-hidden': 'true',
        }));
      }
      field.appendChild(label);
    }

    // ── Suffix: clear / reveal actions, divider, then the trailing icon ──
    const suffix = el('span', 'ds-tf__suffix');
    let hasAction = false;

    if (opts.clearable) {
      const clearBtn = el('button', 'ds-tf__action', {
        type: 'button',
        'aria-label': opts.clearLabel || 'Clear',
      });
      clearBtn.appendChild(icon({ name: 'close', className: 'ds-tf__icon' }));
      if (opts.disabled) clearBtn.disabled = true;
      clearBtn.addEventListener('click', function () {
        input.value = '';
        sync();
        input.focus();
        if (opts.onInput) opts.onInput('');
        if (opts.onClear) opts.onClear();
      });
      suffix.appendChild(clearBtn);
      hasAction = true;
    }

    if (opts.revealable && !multiline) {
      const revealBtn = el('button', 'ds-tf__action', { type: 'button' });
      const revealIcon = icon({ className: 'ds-tf__icon' });
      revealBtn.appendChild(revealIcon);
      if (opts.disabled) revealBtn.disabled = true;

      /** The glyph reports the current state: open eye = value is readable. */
      function paintReveal() {
        const shown = input.type !== 'password';
        revealIcon.src = iconUrl(shown ? 'visibility' : 'visibilityOff');
        revealBtn.setAttribute('aria-pressed', shown ? 'true' : 'false');
        revealBtn.setAttribute(
          'aria-label',
          shown
            ? opts.hideLabel || 'Hide password'
            : opts.revealLabel || 'Show password'
        );
      }

      revealBtn.addEventListener('click', function () {
        input.type = input.type === 'password' ? 'text' : 'password';
        paintReveal();
      });
      paintReveal();
      suffix.appendChild(revealBtn);
      hasAction = true;
    }

    if (opts.suffixIcon) {
      if (hasAction && opts.divider !== false) {
        suffix.appendChild(el('span', 'ds-tf__divider', { 'aria-hidden': 'true' }));
      }
      suffix.appendChild(icon({ name: opts.suffixIcon, className: 'ds-tf__icon' }));
    }

    if (suffix.childNodes.length) box.appendChild(suffix);

    // ── Bottom labels: helper text + character counter ──
    const bottom = el('div', 'ds-tf__bottom');
    let helperEl = null;
    let counterEl = null;

    if (opts.helper) {
      helperEl = el('p', 'ds-tf__helper', { id: helperId, text: opts.helper });
      bottom.appendChild(helperEl);
    }
    if (opts.maxLength && opts.showCounter !== false) {
      counterEl = el('span', 'ds-tf__counter');
      bottom.appendChild(counterEl);
    }
    if (bottom.childNodes.length) root.appendChild(bottom);

    function sync() {
      if (counterEl) {
        counterEl.textContent = input.value.length + '/' + opts.maxLength;
      }
      if (multiline) {
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + 'px';
      }
    }

    // Clicking the padding around the input should still focus it.
    box.addEventListener('mousedown', function (e) {
      if (input.disabled) return;
      if (e.target !== box && e.target !== field) return;
      e.preventDefault();
      input.focus();
    });

    input.addEventListener('input', function () {
      sync();
      if (opts.onInput) opts.onInput(input.value);
    });
    if (opts.onChange) {
      input.addEventListener('change', function () {
        opts.onChange(input.value);
      });
    }

    function setHelper(text) {
      if (!text) {
        if (helperEl) helperEl.remove();
        helperEl = null;
        input.removeAttribute('aria-describedby');
        return;
      }
      if (!helperEl) {
        helperEl = el('p', 'ds-tf__helper', { id: helperId });
        bottom.insertBefore(helperEl, bottom.firstChild);
        if (!bottom.parentNode) root.appendChild(bottom);
        input.setAttribute('aria-describedby', helperId);
      }
      helperEl.textContent = text;
    }

    sync();

    return {
      root: root,
      input: input,
      getValue: function () {
        return input.value;
      },
      setValue: function (v) {
        input.value = v == null ? '' : String(v);
        sync();
      },
      focus: function () {
        input.focus();
      },
      setHelper: setHelper,
      setError: function (on, message) {
        root.classList.toggle('is-error', !!on);
        if (on) input.setAttribute('aria-invalid', 'true');
        else input.removeAttribute('aria-invalid');
        if (message !== undefined) setHelper(message);
      },
      setDisabled: function (on) {
        input.disabled = !!on;
        root.classList.toggle('is-disabled', !!on);
        Array.prototype.forEach.call(
          root.querySelectorAll('.ds-tf__action'),
          function (btn) {
            btn.disabled = !!on;
          }
        );
      },
    };
  }

  /** Air TextareaAutosize - Figma Air Components (node 18300:125928) */
  function textArea(options) {
    const opts = options || {};
    const merged = {};
    Object.keys(opts).forEach(function (key) {
      merged[key] = opts[key];
    });
    merged.multiline = true;
    return textInput(merged);
  }

  /**
   * Build one <option>. Assigns `value` as a property rather than an attribute:
   * an empty value ("Not linked", "Select Partner", "All …") must stay empty,
   * and a missing value attribute makes the DOM fall back to the label text.
   */
  function buildOption(opt, selectedValue) {
    const o = el('option', null, { text: opt.label });
    o.value = opt.value == null ? '' : String(opt.value);
    if (opt.value === selectedValue) o.selected = true;
    return o;
  }

  function selectField(options) {
    const opts = options || {};
    const root = el('label', 'ds-field');
    if (opts.label) {
      root.appendChild(el('span', 'ds-field__label', { text: opts.label }));
    }
    const select = el('select', 'ds-field__input ds-field__select', {
      name: opts.name || undefined,
    });
    (opts.options || []).forEach(function (opt) {
      select.appendChild(buildOption(opt, opts.value));
    });
    if (opts.onChange) {
      select.addEventListener('change', function () {
        opts.onChange(select.value);
      });
    }
    root.appendChild(select);
    appendFieldHelper(root, opts.helper);
    return {
      root: root,
      select: select,
      getValue: function () {
        return select.value;
      },
      setValue: function (v) {
        select.value = v;
      },
      setOptions: function (list, selected) {
        select.innerHTML = '';
        (list || []).forEach(function (opt) {
          select.appendChild(buildOption(opt, selected));
        });
      },
    };
  }

  /**
   * Searchable single-select. Closed state matches a field select; the open
   * panel has a search box so long catalogs (partners, customers) stay usable.
   */
  function searchSelect(options) {
    const opts = options || {};
    let value = opts.value != null ? String(opts.value) : '';
    let optionList = (opts.options || []).slice();
    let query = '';
    let open = false;
    let portaled = false;
    let highlightIndex = 0;

    const root = el('div', 'ds-field ds-search-select');
    if (opts.label) {
      root.appendChild(el('span', 'ds-field__label', { text: opts.label }));
    }

    const wrap = el('div', 'ds-search-select__wrap');
    const trigger = el('button', 'ds-search-select__trigger', {
      type: 'button',
      'aria-haspopup': 'listbox',
      'aria-expanded': 'false',
    });
    const triggerText = el('span', 'ds-search-select__value');
    trigger.appendChild(triggerText);
    trigger.appendChild(icon({ name: 'chevronDown', className: 'ds-search-select__chevron' }));

    const panel = el('div', 'ds-search-select__panel');
    panel.hidden = true;
    const search = searchField({
      placeholder: opts.searchPlaceholder || 'Search',
      ariaLabel: opts.searchPlaceholder || opts.label || 'Search',
      onInput: function (v) {
        query = v;
        highlightIndex = 0;
        renderList();
        positionPanel();
      },
    });
    search.root.classList.add('ds-search--compact', 'ds-search-select__search');
    const list = el('ul', 'ds-search-select__list', { role: 'listbox' });
    panel.appendChild(search.root);
    panel.appendChild(list);
    function submitCreate(label) {
      const trimmed = (label || '').trim();
      if (!trimmed || !opts.onCreate) return;
      const created = opts.onCreate(trimmed);
      if (!created || created.value == null) return;
      optionList.push(created);
      choose(created.value);
    }
    wrap.appendChild(trigger);
    root.appendChild(wrap);
    appendFieldHelper(root, opts.helper);

    function optionByValue(v) {
      return optionList.find(function (o) {
        return String(o.value) === String(v);
      });
    }

    function paintTrigger() {
      const found = optionByValue(value);
      triggerText.textContent = found ? found.label : opts.placeholder || '';
    }

    function filtered() {
      const q = (query || '').trim().toLowerCase();
      if (!q) return optionList;
      return optionList.filter(function (o) {
        const hay = (o.label || '') + ' ' + (o.keywords || '');
        return hay.toLowerCase().indexOf(q) !== -1;
      });
    }

    /**
     * Gates the create row on no EXACT match, not zero matches - so a partial match (e.g.
     * "Off" against "Corporate Office") still shows above it instead of hiding it. Appended
     * after real rows, not in place of them, since both can be true at once.
     */
    function visibleRows() {
      const rows = filtered();
      const q = (query || '').trim();
      if (!opts.allowCreate || !q) return rows;
      const qLower = q.toLowerCase();
      const exactMatch = rows.some(function (o) {
        return (o.label || '').trim().toLowerCase() === qLower;
      });
      if (exactMatch) return rows;
      return rows.concat([{ __create: true, value: null, label: q }]);
    }

    function renderList() {
      list.innerHTML = '';
      const rows = visibleRows();
      if (!rows.length) {
        list.appendChild(
          el('li', 'ds-search-select__empty', { text: opts.emptyLabel || 'No matches' })
        );
        return;
      }
      if (highlightIndex >= rows.length) highlightIndex = rows.length - 1;
      if (highlightIndex < 0) highlightIndex = 0;
      rows.forEach(function (opt, i) {
        if (opt.__create && i > 0) {
          list.appendChild(el('li', 'ds-search-select__separator', { role: 'separator' }));
        }
        const selected = !opt.__create && String(opt.value) === String(value);
        const cls =
          (opt.__create ? 'ds-search-select__option--create' : 'ds-search-select__option') +
          (selected ? ' is-selected' : '') +
          (i === highlightIndex ? ' is-active' : '');
        const text = opt.__create
          ? (opts.createButtonLabel || '+ Add') + ' "' + opt.label + '"'
          : opt.label;
        const li = el('li', cls, { role: 'option', text: text });
        li.setAttribute('aria-selected', selected ? 'true' : 'false');
        li.addEventListener('mousedown', function (e) {
          e.preventDefault();
        });
        li.addEventListener('click', function () {
          if (opt.__create) submitCreate(opt.label);
          else choose(opt.value);
        });
        list.appendChild(li);
      });
      const active = list.querySelector('.is-active');
      if (active && active.scrollIntoView) active.scrollIntoView({ block: 'nearest' });
    }

    function choose(v) {
      value = v != null ? String(v) : '';
      query = '';
      search.setValue('');
      paintTrigger();
      closePanel();
      if (opts.onChange) opts.onChange(value);
    }

    function positionPanel() {
      const rect = trigger.getBoundingClientRect();
      const gap = 4;
      panel.style.position = 'fixed';
      panel.style.zIndex = '1300';
      panel.style.left = Math.round(rect.left) + 'px';
      panel.style.width = Math.round(rect.width) + 'px';
      panel.style.right = 'auto';
      const h = panel.offsetHeight || 280;
      const spaceBelow = window.innerHeight - rect.bottom - gap;
      if (h > spaceBelow && rect.top > spaceBelow) {
        panel.style.top = 'auto';
        panel.style.bottom = Math.round(window.innerHeight - rect.top + gap) + 'px';
      } else {
        panel.style.bottom = 'auto';
        panel.style.top = Math.round(rect.bottom + gap) + 'px';
      }
    }

    function onDoc(e) {
      if (!open) return;
      if (wrap.contains(e.target) || panel.contains(e.target)) return;
      closePanel();
    }

    function onKey(e) {
      if (!open) return;
      if (e.key === 'Escape') {
        e.stopPropagation();
        e.preventDefault();
        closePanel();
        trigger.focus();
        return;
      }
      const rows = visibleRows();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlightIndex = Math.min(rows.length - 1, highlightIndex + 1);
        renderList();
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlightIndex = Math.max(0, highlightIndex - 1);
        renderList();
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const pick = rows[highlightIndex] || rows[0];
        if (!pick) return;
        if (pick.__create) submitCreate(pick.label);
        else choose(pick.value);
      }
    }

    function openPanel() {
      if (open) return;
      open = true;
      query = '';
      search.setValue('');
      const rows = filtered();
      const idx = rows.findIndex(function (o) {
        return String(o.value) === String(value);
      });
      highlightIndex = idx >= 0 ? idx : 0;
      if (!portaled) {
        document.body.appendChild(panel);
        portaled = true;
      }
      panel.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('is-open');
      renderList();
      positionPanel();
      document.addEventListener('mousedown', onDoc, true);
      document.addEventListener('keydown', onKey, true);
      window.addEventListener('resize', positionPanel);
      window.addEventListener('scroll', positionPanel, true);
      setTimeout(function () {
        if (search.input) search.input.focus();
        positionPanel();
      }, 0);
    }

    function closePanel() {
      if (!open) return;
      open = false;
      panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('is-open');
      document.removeEventListener('mousedown', onDoc, true);
      document.removeEventListener('keydown', onKey, true);
      window.removeEventListener('resize', positionPanel);
      window.removeEventListener('scroll', positionPanel, true);
      if (portaled && panel.parentNode) {
        panel.parentNode.removeChild(panel);
        portaled = false;
      }
    }

    trigger.addEventListener('click', function () {
      if (trigger.disabled) return;
      if (open) closePanel();
      else openPanel();
    });

    function setDisabled(on) {
      trigger.disabled = !!on;
      root.classList.toggle('is-disabled', !!on);
      if (on && open) closePanel();
    }
    if (opts.disabled) setDisabled(true);

    paintTrigger();

    return {
      root: root,
      getValue: function () {
        return value;
      },
      setValue: function (v) {
        value = v != null ? String(v) : '';
        paintTrigger();
        if (open) renderList();
      },
      setOptions: function (next, selected) {
        optionList = (next || []).slice();
        if (selected !== undefined) value = selected != null ? String(selected) : '';
        paintTrigger();
        if (open) renderList();
      },
      setDisabled: setDisabled,
      destroy: function () {
        closePanel();
      },
    };
  }

  function multiSelect(options) {
    const opts = options || {};
    const selected = new Set(opts.value || []);
    const root = el('div', 'ds-field');
    if (opts.label) {
      root.appendChild(el('span', 'ds-field__label', { text: opts.label }));
    }
    const list = el('div', 'ds-multi-select', { role: 'group' });

    function emit() {
      if (opts.onChange) opts.onChange(Array.from(selected));
    }

    function render() {
      list.innerHTML = '';
      (opts.options || []).forEach(function (opt) {
        const row = el('label', 'ds-multi-select__option');
        const cb = el('input', null, {
          type: 'checkbox',
          value: opt.value,
        });
        cb.checked = selected.has(opt.value);
        cb.addEventListener('change', function () {
          if (cb.checked) selected.add(opt.value);
          else selected.delete(opt.value);
          emit();
        });
        row.appendChild(cb);
        row.appendChild(el('span', null, { text: opt.label }));
        list.appendChild(row);
      });
    }

    render();
    root.appendChild(list);
    appendFieldHelper(root, opts.helper);
    return {
      root: root,
      getValue: function () {
        return Array.from(selected);
      },
      setValue: function (vals) {
        selected.clear();
        (vals || []).forEach(function (v) {
          selected.add(v);
        });
        render();
      },
    };
  }

  function radioGroup(options) {
    const opts = options || {};
    let value = opts.value != null ? String(opts.value) : '';
    const name = opts.name || 'ds-radio-' + Math.random().toString(36).slice(2, 8);
    const root = el('div', 'ds-field');
    if (opts.label) {
      root.appendChild(el('span', 'ds-field__label', { text: opts.label }));
    }
    const list = el('div', 'ds-radio-group', { role: 'radiogroup' });
    if (opts.label) list.setAttribute('aria-label', opts.label);

    function emit() {
      if (opts.onChange) opts.onChange(value);
    }

    function render() {
      list.innerHTML = '';
      (opts.options || []).forEach(function (opt) {
        const row = el('label', 'ds-radio-group__option' + (opt.value === value ? ' is-selected' : ''));
        const input = el('input', null, {
          type: 'radio',
          name: name,
          value: opt.value,
        });
        if (opt.value === value) input.checked = true;
        input.addEventListener('change', function () {
          if (!input.checked) return;
          value = opt.value;
          render();
          emit();
        });
        const copy = el('span', 'ds-radio-group__copy');
        copy.appendChild(el('span', 'ds-radio-group__label', { text: opt.label }));
        if (opt.description) {
          copy.appendChild(el('span', 'ds-radio-group__description', { text: opt.description }));
        }
        row.appendChild(input);
        row.appendChild(copy);
        list.appendChild(row);
      });
    }

    render();
    root.appendChild(list);
    appendFieldHelper(root, opts.helper);
    return {
      root: root,
      getValue: function () {
        return value;
      },
      setValue: function (v) {
        value = v != null ? String(v) : '';
        render();
      },
    };
  }

  function menu(options) {
    const opts = options || {};
    const root = el('div', 'ds-menu-wrap');
    const trigger = opts.trigger || button({
      variant: 'ghost',
      inline: true,
      icon: 'moreVert',
      ariaLabel: opts.triggerLabel || 'Actions',
      className: 'ds-menu__trigger',
    });
    const panel = el('div', 'ds-menu', {
      role: 'menu',
      hidden: 'hidden',
    });
    let portaled = false;

    function close() {
      panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      document.removeEventListener('click', onDocClick, true);
      window.removeEventListener('resize', positionPanel);
      window.removeEventListener('scroll', positionPanel, true);
      if (portaled && panel.parentNode === document.body) {
        document.body.removeChild(panel);
        portaled = false;
      }
    }

    function onDocClick(e) {
      if (root.contains(e.target) || panel.contains(e.target)) return;
      close();
    }

    function positionPanel() {
      const rect = trigger.getBoundingClientRect();
      const menuWidth = Math.max(panel.offsetWidth || 180, 160);
      const menuHeight = panel.offsetHeight || 0;
      const gap = 4;
      const spaceBelow = window.innerHeight - rect.bottom - gap;
      const openUp = menuHeight > 0 && spaceBelow < menuHeight && rect.top > spaceBelow;

      panel.style.position = 'fixed';
      panel.style.zIndex = '1300';
      panel.style.left = 'auto';
      panel.style.right = Math.max(8, Math.round(window.innerWidth - rect.right)) + 'px';
      if (openUp) {
        panel.style.top = 'auto';
        panel.style.bottom = Math.round(window.innerHeight - rect.top + gap) + 'px';
      } else {
        panel.style.bottom = 'auto';
        panel.style.top = Math.round(rect.bottom + gap) + 'px';
      }
      /* Keep menu from overflowing left edge */
      const rightEdge = window.innerWidth - parseFloat(panel.style.right);
      if (rightEdge - menuWidth < 8) {
        panel.style.right = Math.max(8, window.innerWidth - menuWidth - 8) + 'px';
      }
    }

    function open() {
      if (!portaled) {
        document.body.appendChild(panel);
        portaled = true;
      }
      panel.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      positionPanel();
      setTimeout(function () {
        positionPanel();
        document.addEventListener('click', onDocClick, true);
      }, 0);
      window.addEventListener('resize', positionPanel);
      window.addEventListener('scroll', positionPanel, true);
    }

    (opts.items || []).forEach(function (item) {
      if (item.separator) {
        panel.appendChild(el('div', 'ds-menu__separator', { role: 'separator' }));
        return;
      }
      const btn = el('button', 'ds-menu__item' + (item.danger ? ' ds-menu__item--danger' : ''), {
        type: 'button',
        role: 'menuitem',
        text: item.label,
        disabled: item.disabled ? 'disabled' : undefined,
        /* A disabled item that cannot say why reads as a bug. `el` forwards any attribute. */
        title: item.title || undefined,
      });
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        close();
        if (item.onClick) item.onClick();
      });
      panel.appendChild(btn);
    });

    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (panel.hidden) open();
      else close();
    });

    root.appendChild(trigger);
    return { root: root, close: close };
  }

  /**
   * Air SplitButton (Figma Air Components - node 37599:428636)
   *
   * A primary action button fused to a caret trigger; the caret opens a Menu
   * of secondary actions. Click the main segment to fire `onClick` directly -
   * click the caret (or its menu items) without touching the main action.
   *
   * @param {object} options
   * @param {string} options.text - main button label
   * @param {function} [options.onClick] - main button click handler
   * @param {Array<{label, onClick, disabled, danger, separator}>} options.items - caret Menu items
   * @param {'contained'|'outlined'} [options.variant='contained']
   * @param {'primary'|'secondary'} [options.color='primary']
   * @param {'xlarge'|'large'|'medium'|'small'|'xsmall'} [options.size='medium']
   * @param {string} [options.startIcon] main button start icon
   * @param {boolean} [options.disabled]
   * @param {string} [options.menuTriggerLabel] aria-label for the caret button
   * @param {string} [options.className]
   */
  function splitButton(options) {
    const opts = options || {};
    const variant = opts.variant === 'outlined' ? 'outlined' : 'contained';
    const color = opts.color || 'primary';
    const size = opts.size || 'medium';

    const root = el('div', 'ds-splitbtn ds-splitbtn--' + variant + (opts.className ? ' ' + opts.className : ''));

    const mainBtn = button({
      variant: variant,
      color: color,
      size: size,
      text: opts.text,
      startIcon: opts.startIcon,
      disabled: opts.disabled,
      onClick: opts.onClick,
      className: 'ds-splitbtn__main',
    });

    const toggleBtn = button({
      variant: variant,
      color: color,
      size: size,
      icon: 'chevronDown',
      ariaLabel: opts.menuTriggerLabel || 'More options',
      disabled: opts.disabled,
      className: 'ds-splitbtn__toggle',
    });

    const chevronImg = toggleBtn.querySelector('.ds-btn__icon');
    if (chevronImg && typeof MutationObserver !== 'undefined') {
      const syncChevron = function () {
        chevronImg.src = iconUrl(toggleBtn.getAttribute('aria-expanded') === 'true' ? 'chevronUp' : 'chevronDown');
      };
      new MutationObserver(syncChevron).observe(toggleBtn, { attributes: true, attributeFilter: ['aria-expanded'] });
    }

    const menuApi = menu({
      trigger: toggleBtn,
      items: opts.items || [],
    });
    menuApi.root.classList.add('ds-splitbtn__menu-wrap');

    root.appendChild(mainBtn);
    root.appendChild(menuApi.root);

    return { root: root, mainButton: mainBtn, toggleButton: toggleBtn, close: menuApi.close };
  }

  /**
   * Air Modal layout tokens (Figma VRF Infinity APAC Ph.2 · node 6683:123679).
   *
   * DS.modal options (mirror Figma component props):
   * - size: undefined | 'wide' (960px) | 'small' (360px). Default 600px.
   * - dividers: false | true | { header: bool, footer: bool } (showHeaderDivider / showFooterDivider).
   *   Default off. Product rule: confirms and simple forms stay off; scrollable/dense bodies
   *   (tables, assign lists, timelines, long multi-section forms) use `true` (both). Prefer
   *   not to pass partial { header } / { footer } unless Figma specs one side only.
   * - tags: [{ label, color?: 'base' | 'purple' }] optional title chips
   * - showClose: false hides the header close icon (default true)
   * - footerStart: leading actions slot (split footer)
   * - actions: trailing footer buttons
   * - body: string (wrapped in .ds-modal__message) or HTMLElement
   * - bodyPadding: 'default' | 'full' - full adds 24px vertical inset for form bodies (default follows Figma)
   */
  const MODAL_LAYOUT = Object.freeze({
    base: Object.freeze({
      width: '600px',
      headerPadding: '24px 24px 16px',
      bodyPaddingX: '24px',
      bodyPaddingTop: '0',
      bodyPaddingBottom: '0',
      bodyGap: '16px',
      bodyMaxHeight: '680px',
      bodyFlex: '1 1 auto',
      footerPadding: '24px',
      footerMarginTop: '0',
      dividerInset: '24px',
      titleFontSize: '20px',
      titleLineHeight: '28px',
      messageFontSize: '16px',
      messageLineHeight: '24px',
    }),
    /** Gap after header rule / before footer rule (Figma Divider Container spacing). */
    dividers: Object.freeze({
      bodyPaddingTop: '24px',
      footerMarginTop: '24px',
    }),
    size: Object.freeze({
      wide: Object.freeze({ width: '960px' }),
      small: Object.freeze({
        width: '360px',
        bodyGap: '0',
        bodyMaxHeight: 'none',
        bodyFlex: '0 0 auto',
      }),
    }),
  });

  function normalizeModalDividers(dividers) {
    if (!dividers) return { header: false, footer: false };
    if (dividers === true) return { header: true, footer: true };
    return {
      header: !!dividers.header,
      footer: !!dividers.footer,
    };
  }

  function modalLayoutForSize(size, dividerFlags, bodyPaddingMode) {
    const flags = dividerFlags || { header: false, footer: false };
    const layout = Object.assign({}, MODAL_LAYOUT.base);
    if (size === 'wide' || size === 'small') {
      Object.assign(layout, MODAL_LAYOUT.size[size]);
    }
    if (flags.header) {
      layout.bodyPaddingTop = MODAL_LAYOUT.dividers.bodyPaddingTop;
    }
    if (flags.footer) {
      layout.footerMarginTop = MODAL_LAYOUT.dividers.footerMarginTop;
    }
    if (bodyPaddingMode === 'full') {
      if (layout.bodyPaddingTop === '0') layout.bodyPaddingTop = '24px';
      if (!flags.footer) layout.bodyPaddingBottom = '24px';
    }
    return layout;
  }

  function applyModalLayoutVars(dialog, layout, dividerFlags) {
    const flags = dividerFlags || { header: false, footer: false };
    dialog.style.setProperty('--ds-modal-width', layout.width);
    dialog.style.setProperty('--ds-modal-header-padding', layout.headerPadding);
    dialog.style.setProperty(
      '--ds-modal-body-padding',
      layout.bodyPaddingTop + ' ' + layout.bodyPaddingX + ' ' + layout.bodyPaddingBottom
    );
    dialog.style.setProperty('--ds-modal-body-gap', layout.bodyGap);
    dialog.style.setProperty('--ds-modal-body-max-height', layout.bodyMaxHeight);
    dialog.style.setProperty('--ds-modal-body-flex', layout.bodyFlex);
    dialog.style.setProperty('--ds-modal-footer-padding', layout.footerPadding);
    dialog.style.setProperty('--ds-modal-footer-margin-top', layout.footerMarginTop);
    dialog.style.setProperty('--ds-modal-title-size', layout.titleFontSize);
    dialog.style.setProperty('--ds-modal-title-line-height', layout.titleLineHeight);
    dialog.style.setProperty('--ds-modal-message-size', layout.messageFontSize);
    dialog.style.setProperty('--ds-modal-message-line-height', layout.messageLineHeight);
    dialog.style.setProperty('--ds-modal-header-divider', flags.header ? '1px solid var(--ds-divider)' : 'none');
    dialog.style.setProperty('--ds-modal-footer-divider', flags.footer ? '1px solid var(--ds-divider)' : 'none');
  }

  function modalTagChip(tag) {
    const tone = tag.color === 'purple' ? 'ds-modal__tag--purple' : 'ds-modal__tag--base';
    return el('span', 'ds-modal__tag ' + tone, { text: tag.label || '' });
  }

  function modal(options) {
    const opts = options || {};
    const dividerFlags = normalizeModalDividers(opts.dividers);
    const bodyPaddingMode =
      opts.bodyPadding != null
        ? opts.bodyPadding
        : typeof opts.body === 'string' || !opts.body
          ? 'default'
          : 'full';
    const backdrop = el('div', 'ds-modal-backdrop', { role: 'presentation' });
    const dialog = el('div', 'ds-modal', {
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'ds-modal-title',
    });
    applyModalLayoutVars(
      dialog,
      modalLayoutForSize(opts.size, dividerFlags, bodyPaddingMode),
      dividerFlags
    );
    if (opts.size === 'wide') dialog.classList.add('ds-modal--wide');
    if (opts.size === 'small') dialog.classList.add('ds-modal--small');
    if (dividerFlags.header) dialog.classList.add('ds-modal--header-divider');
    if (dividerFlags.footer) dialog.classList.add('ds-modal--footer-divider');
    if (opts.className) dialog.classList.add(opts.className);

    const header = el('div', 'ds-modal__header');
    const headerRow = el('div', 'ds-modal__header-row');
    const titleEl = el('h2', 'ds-modal__title', {
      id: 'ds-modal-title',
      text: opts.title || '',
    });
    headerRow.appendChild(titleEl);
    const headerEnd = el('div', 'ds-modal__header-end');
    const tags = opts.tags || [];
    if (tags.length) {
      const tagsWrap = el('div', 'ds-modal__header-tags');
      tags.forEach(function (tag) {
        tagsWrap.appendChild(modalTagChip(tag));
      });
      headerEnd.appendChild(tagsWrap);
    }
    if (opts.showClose !== false) {
      headerEnd.appendChild(button({
        variant: 'ghost',
        color: 'secondary',
        size: 'xsmall',
        inline: true,
        iconOnly: true,
        icon: 'close',
        ariaLabel: opts.closeLabel || 'Close',
        className: 'ds-modal__close',
        onClick: function () {
          attemptClose('close');
        },
      }));
    }
    headerRow.appendChild(headerEnd);
    header.appendChild(headerRow);
    dialog.appendChild(header);

    const body = el('div', 'ds-modal__body');
    if (opts.body) {
      if (typeof opts.body === 'string') {
        body.appendChild(el('p', 'ds-modal__message', { text: opts.body }));
      } else {
        body.appendChild(opts.body);
      }
    }
    dialog.appendChild(body);

    const footer = el('div', 'ds-modal__footer');
    let footerStartEl = null;
    if (opts.footerStart) {
      footer.classList.add('ds-modal__footer--split');
      footerStartEl = el('div', 'ds-modal__footer-start');
      if (typeof opts.footerStart === 'string') footerStartEl.textContent = opts.footerStart;
      else footerStartEl.appendChild(opts.footerStart);
      footer.appendChild(footerStartEl);
    }
    const footerActions = el('div', 'ds-modal__footer-actions');
    function paintFooterActions(actions) {
      footerActions.innerHTML = '';
      (actions || []).forEach(function (action) {
        footerActions.appendChild(button({
          variant: action.variant || 'primary',
          color: action.color,
          size: action.size || 'medium',
          inline: true,
          text: action.label,
          disabled: !!action.disabled,
          onClick: function () {
            if (action.onClick) action.onClick(close);
            else if (action.close !== false) close();
          },
        }));
      });
    }
    paintFooterActions(opts.actions);
    footer.appendChild(footerActions);
    dialog.appendChild(footer);
    backdrop.appendChild(dialog);

    let backdropHits = 0;
    let requestCloseFn = opts.requestClose;
    let doubleBackdropClose = !!opts.doubleBackdropClose;
    let onBackdropNudge = opts.onBackdropNudge;

    function onKey(e) {
      if (e.key === 'Escape') attemptClose('escape');
    }

    function close() {
      document.removeEventListener('keydown', onKey);
      if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
      if (opts.onClose) opts.onClose();
    }

    /** Optional guard: requestClose(reason, doClose). Reasons: close | escape | backdrop. */
    function attemptClose(reason) {
      if (typeof requestCloseFn === 'function') {
        requestCloseFn(reason, close);
        return;
      }
      close();
    }

    backdrop.addEventListener('click', function (e) {
      if (e.target !== backdrop) return;
      if (doubleBackdropClose) {
        backdropHits += 1;
        if (backdropHits < 2) {
          if (typeof onBackdropNudge === 'function') onBackdropNudge();
          return;
        }
        backdropHits = 0;
      }
      attemptClose('backdrop');
    });

    document.addEventListener('keydown', onKey);
    document.body.appendChild(backdrop);

    return {
      root: backdrop,
      body: body,
      dialog: dialog,
      close: close,
      resetBackdropHits: function () {
        backdropHits = 0;
      },
      setTitle: function (text) {
        titleEl.textContent = text || '';
      },
      setActions: function (actions) {
        paintFooterActions(actions);
      },
      setFooterStart: function (nodeOrText) {
        if (nodeOrText == null || nodeOrText === false) {
          if (footerStartEl && footerStartEl.parentNode) {
            footerStartEl.parentNode.removeChild(footerStartEl);
          }
          footerStartEl = null;
          footer.classList.remove('ds-modal__footer--split');
          return;
        }
        if (!footerStartEl) {
          footerStartEl = el('div', 'ds-modal__footer-start');
          footer.insertBefore(footerStartEl, footerActions);
          footer.classList.add('ds-modal__footer--split');
        } else {
          footerStartEl.innerHTML = '';
        }
        if (typeof nodeOrText === 'string') footerStartEl.textContent = nodeOrText;
        else footerStartEl.appendChild(nodeOrText);
      },
      setRequestClose: function (fn) {
        requestCloseFn = fn;
      },
      setDoubleBackdropClose: function (on, nudgeFn) {
        doubleBackdropClose = !!on;
        onBackdropNudge = nudgeFn;
        backdropHits = 0;
      },
    };
  }

  /**
   * Right-edge slide-in panel for long-running, data-heavy tasks that don't fit a modal's
   * self-contained-and-short brief (e.g. Bulk Add's multi-stage upload/review/summary flow).
   * Returns the same API shape as modal() - {body, setTitle, setActions, close} - so callers
   * that already drive a modal through stage transitions can switch containers by changing
   * only the constructor call.
   */
  function drawer(options) {
    const opts = options || {};
    const backdrop = el('div', 'ds-drawer-backdrop', { role: 'presentation' });
    const panel = el('div', 'ds-drawer', {
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'ds-drawer-title',
    });
    if (opts.className) panel.classList.add(opts.className);
    if (opts.width) panel.style.setProperty('--ds-drawer-width', opts.width);

    const header = el('div', 'ds-drawer__header');
    const titleEl = el('h2', 'ds-drawer__title', { id: 'ds-drawer-title', text: opts.title || '' });
    header.appendChild(titleEl);
    if (opts.showClose !== false) {
      header.appendChild(button({
        variant: 'ghost',
        color: 'secondary',
        size: 'xsmall',
        inline: true,
        iconOnly: true,
        icon: 'close',
        ariaLabel: opts.closeLabel || 'Close',
        className: 'ds-drawer__close',
        onClick: function () {
          attemptClose('close');
        },
      }));
    }
    panel.appendChild(header);

    const body = el('div', 'ds-drawer__body');
    if (opts.body) {
      if (typeof opts.body === 'string') body.appendChild(el('p', 'ds-drawer__message', { text: opts.body }));
      else body.appendChild(opts.body);
    }
    panel.appendChild(body);

    const footer = el('div', 'ds-drawer__footer');
    const footerActions = el('div', 'ds-drawer__footer-actions');
    function paintFooterActions(actions) {
      footerActions.innerHTML = '';
      (actions || []).forEach(function (action) {
        footerActions.appendChild(button({
          variant: action.variant || 'primary',
          color: action.color,
          size: action.size || 'medium',
          inline: true,
          text: action.label,
          disabled: !!action.disabled,
          onClick: function () {
            if (action.onClick) action.onClick(close);
            else if (action.close !== false) close();
          },
        }));
      });
    }
    paintFooterActions(opts.actions);
    footer.appendChild(footerActions);
    panel.appendChild(footer);
    backdrop.appendChild(panel);

    let requestCloseFn = opts.requestClose;

    function onKey(e) {
      if (e.key === 'Escape') attemptClose('escape');
    }

    function close() {
      document.removeEventListener('keydown', onKey);
      panel.classList.remove('ds-drawer--open');
      backdrop.classList.remove('ds-drawer-backdrop--open');
      const remove = function () {
        if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
        if (opts.onClose) opts.onClose();
      };
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        remove();
      } else {
        panel.addEventListener('transitionend', remove, { once: true });
        setTimeout(remove, 300);
      }
    }

    /** Optional guard: requestClose(reason, doClose). Reasons: close | escape | backdrop. */
    function attemptClose(reason) {
      if (typeof requestCloseFn === 'function') {
        requestCloseFn(reason, close);
        return;
      }
      close();
    }

    backdrop.addEventListener('click', function (e) {
      if (e.target !== backdrop) return;
      attemptClose('backdrop');
    });

    document.addEventListener('keydown', onKey);
    document.body.appendChild(backdrop);
    requestAnimationFrame(function () {
      backdrop.classList.add('ds-drawer-backdrop--open');
      panel.classList.add('ds-drawer--open');
    });

    return {
      root: backdrop,
      body: body,
      dialog: panel,
      close: close,
      setTitle: function (text) {
        titleEl.textContent = text || '';
      },
      setActions: function (actions) {
        paintFooterActions(actions);
      },
      setRequestClose: function (fn) {
        requestCloseFn = fn;
      },
    };
  }

  /* ── Toast (Air, Figma node 34224:21740) ─────────────────────────────
     Announces the result of something the person already did. It never asks a
     question: confirmations stay modals, and anything the person can fix in a field
     they are looking at belongs on that field, not up here.

     Lives above every other layer (modal / drawer backdrops are 1200, menu panels
     1300) so a toast fired while a modal is still open is readable rather than
     buried behind it.
  ───────────────────────────────────────────────────────────────────── */

  const TOAST_SUCCESS_MS = 5000;
  const TOAST_WARNING_MS = 6000;
  const TOAST_MAX_VISIBLE = 3;
  let toastHost = null;

  /* Air icon paths, 20x20, taken from the Toast component's own icon slots:
     check_circle (38056:50674) and warning_circle (38045:107671), plus clear
     (38043:63729) for the dismiss button. Filled glyphs knocked out of a solid
     circle, not outlines. */
  const TOAST_GLYPH_PATHS = {
    success:
      'M10 1.66667C14.6 1.66667 18.3333 5.4 18.3333 10C18.3333 14.6 14.6 18.3333 10 18.3333C5.4 18.3333 1.66667 14.6 1.66667 10C1.66667 5.4 5.4 1.66667 10 1.66667ZM15.2482 6.07747C14.9229 5.74989 14.393 5.7486 14.0666 6.07503L8.33333 11.8083L5.92936 9.41162C5.60454 9.0877 5.0786 9.08806 4.75423 9.41243C4.43 9.73704 4.43 10.263 4.75423 10.5876L7.82145 13.6548C8.10424 13.9373 8.56243 13.9373 8.84521 13.6548L15.2458 7.25423C15.5705 6.92954 15.5715 6.40345 15.2482 6.07747Z',
    error:
      'M10 1.66667C11.1528 1.66667 12.2364 1.88509 13.2503 2.32259C14.2641 2.76008 15.146 3.35404 15.896 4.104C16.646 4.85397 17.2399 5.73585 17.6774 6.74967C18.1149 7.76356 18.3333 8.84722 18.3333 10C18.3333 11.1528 18.1149 12.2364 17.6774 13.2503C17.2399 14.2641 16.646 15.146 15.896 15.896C15.146 16.646 14.2641 17.2399 13.2503 17.6774C12.2364 18.1149 11.1528 18.3333 10 18.3333C8.84722 18.3333 7.76356 18.1149 6.74967 17.6774C5.73585 17.2399 4.85397 16.646 4.104 15.896C3.35404 15.146 2.76008 14.2641 2.32259 13.2503C1.88509 12.2364 1.66667 11.1528 1.66667 10C1.66667 8.84722 1.88509 7.76356 2.32259 6.74967C2.76008 5.73585 3.35404 4.85397 4.104 4.104C4.85397 3.35404 5.73585 2.76008 6.74967 2.32259C7.76356 1.88509 8.84722 1.66667 10 1.66667ZM10 12.4837C9.76389 12.4837 9.56565 12.5633 9.40592 12.723C9.2463 12.8827 9.16667 13.081 9.16667 13.3171C9.16673 13.5529 9.24644 13.7507 9.40592 13.9103C9.56565 14.07 9.76389 14.1504 10 14.1504C10.2361 14.1504 10.4344 14.07 10.5941 13.9103C10.7536 13.7507 10.8333 13.5529 10.8333 13.3171C10.8333 13.081 10.7537 12.8827 10.5941 12.723C10.4344 12.5633 10.2361 12.4837 10 12.4837ZM10 5.81706C9.76389 5.81706 9.56565 5.89659 9.40592 6.05631C9.2463 6.21601 9.16667 6.41435 9.16667 6.65039V9.98372C9.16673 10.2196 9.24644 10.4174 9.40592 10.577C9.56565 10.7367 9.76389 10.8171 10 10.8171C10.2361 10.8171 10.4344 10.7367 10.5941 10.577C10.7536 10.4174 10.8333 10.2196 10.8333 9.98372V6.65039C10.8333 6.41435 10.7537 6.21601 10.5941 6.05631C10.4344 5.89659 10.2361 5.81706 10 5.81706Z',
    clear:
      'M14.0706 4.75421C14.3951 4.42975 14.9213 4.42976 15.2457 4.75421C15.5702 5.07868 15.5702 5.60487 15.2457 5.92934L11.1751 9.99998L15.2457 14.0706C15.5702 14.3951 15.5702 14.9213 15.2457 15.2457C14.9213 15.5702 14.3951 15.5702 14.0706 15.2457L9.99998 11.1751L5.92934 15.2457C5.60487 15.5702 5.07868 15.5702 4.75421 15.2457C4.42976 14.9213 4.42975 14.3951 4.75421 14.0706L8.82485 9.99998L4.75421 5.92934C4.42974 5.60487 4.42974 5.07867 4.75421 4.75421C5.07867 4.42974 5.60487 4.42974 5.92934 4.75421L9.99998 8.82485L14.0706 4.75421Z',
  };

  function toastHostEl() {
    if (toastHost && toastHost.parentNode === document.body) return toastHost;
    toastHost = el('div', 'ds-toast-host');
    document.body.appendChild(toastHost);
    return toastHost;
  }

  /** One 20x20 Air glyph. currentColor so the variant's contrast token drives it. */
  function toastIcon(key, className) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', className);
    svg.setAttribute('width', '20');
    svg.setAttribute('height', '20');
    svg.setAttribute('viewBox', '0 0 20 20');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', TOAST_GLYPH_PATHS[key]);
    path.setAttribute('fill', 'currentColor');
    if (key !== 'clear') path.setAttribute('fill-rule', 'evenodd');
    if (key !== 'clear') path.setAttribute('clip-rule', 'evenodd');
    svg.appendChild(path);
    return svg;
  }

  /**
   * Air Toast, filled variant. Top-centre, 40px from the top of the viewport.
   *
   * @param {object} options
   * @param {string} options.message - the whole message; the title=true variant is not used
   * @param {'success'|'warning'|'error'} [options.variant='success'] - Air calls this `color`
   * @param {number} [options.duration] - ms before auto-dismiss. Defaults to 5000 for
   *   success, 6000 for warning, and 0 (stays until dismissed) for error, because an
   *   error usually carries something that has to be read.
   * @param {string} [options.closeLabel] - aria-label for the dismiss button
   * @returns {{ root: HTMLElement, close: function }}
   */
  function toast(options) {
    const opts = options || {};
    const variant =
      opts.variant === 'error' || opts.variant === 'warning' ? opts.variant : 'success';
    const host = toastHostEl();
    const duration =
      opts.duration != null
        ? Number(opts.duration)
        : variant === 'error'
          ? 0
          : variant === 'warning'
            ? TOAST_WARNING_MS
            : TOAST_SUCCESS_MS;

    const root = el('div', 'ds-toast ds-toast--' + variant, {
      /* assertive for an error: it reports something that did not happen. */
      role: variant === 'error' ? 'alert' : 'status',
      'aria-live': variant === 'error' ? 'assertive' : 'polite',
    });

    const container = el('div', 'ds-toast__container');

    const iconWrap = el('div', 'ds-toast__icon');
    /* Warning shares the warning_circle glyph with error; the fill tells them apart. */
    iconWrap.appendChild(toastIcon(variant === 'warning' ? 'error' : variant, 'ds-toast__glyph'));
    container.appendChild(iconWrap);

    const content = el('div', 'ds-toast__content');
    const text = el('div', 'ds-toast__text');
    text.appendChild(el('p', 'ds-toast__message', { text: opts.message || '' }));
    content.appendChild(text);
    container.appendChild(content);

    const closeWrap = el('div', 'ds-toast__close-wrap');
    const dismiss = el('button', 'ds-toast__close', {
      type: 'button',
      'aria-label': opts.closeLabel || 'Dismiss',
    });
    dismiss.appendChild(toastIcon('clear', 'ds-toast__close-glyph'));
    closeWrap.appendChild(dismiss);
    container.appendChild(closeWrap);

    root.appendChild(container);

    let timer = null;
    let closed = false;

    function close() {
      if (closed) return;
      closed = true;
      if (timer) clearTimeout(timer);
      root.classList.add('is-leaving');
      /* Remove on transition end, with a timeout fallback so a toast can never be
         stranded in the DOM when transitions are off (reduced motion, background tab). */
      let removed = false;
      function drop() {
        if (removed) return;
        removed = true;
        if (root.parentNode) root.parentNode.removeChild(root);
        if (toastHost && !toastHost.childNodes.length && toastHost.parentNode) {
          toastHost.parentNode.removeChild(toastHost);
          toastHost = null;
        }
      }
      root.addEventListener('transitionend', drop);
      setTimeout(drop, 400);
    }

    dismiss.addEventListener('click', close);

    /* Newest on top. */
    host.insertBefore(root, host.firstChild);
    while (host.childNodes.length > TOAST_MAX_VISIBLE) {
      host.removeChild(host.lastChild);
    }
    /* Next frame, so the enter transition has a start state to move from. */
    requestAnimationFrame(function () {
      root.classList.add('is-in');
    });

    if (duration > 0) timer = setTimeout(close, duration);

    return { root: root, close: close };
  }

  /**
   * Vertical event timeline. Pass entries newest-first (today at the top).
   * entry: { title, timestamp, actor, detail, tone }
   * tone: accent (blue), success (green), or omit for gray
   */
  function timeline(options) {
    const opts = options || {};
    const root = el('div', 'ds-timeline');
    const entries = opts.entries || [];

    if (!entries.length) {
      root.appendChild(el('p', 'ds-timeline__empty', { text: opts.emptyLabel || 'No activity yet.' }));
      return { root: root };
    }

    const list = el('ol', 'ds-timeline__list');
    entries.forEach(function (entry) {
      const item = el('li', 'ds-timeline__item' + (entry.tone ? ' ds-timeline__item--' + entry.tone : ''));
      item.appendChild(el('span', 'ds-timeline__marker', { 'aria-hidden': 'true' }));

      const content = el('div', 'ds-timeline__content');
      const head = el('div', 'ds-timeline__head');
      head.appendChild(el('span', 'ds-timeline__title', { text: entry.title || '' }));
      if (entry.timestamp) {
        head.appendChild(el('time', 'ds-timeline__time', { text: entry.timestamp }));
      }
      content.appendChild(head);

      if (entry.actor) {
        content.appendChild(el('p', 'ds-timeline__actor', { text: entry.actor }));
      }
      if (entry.detail) {
        content.appendChild(el('p', 'ds-timeline__detail', { text: entry.detail }));
      }
      item.appendChild(content);
      list.appendChild(item);
    });

    root.appendChild(list);
    return { root: root };
  }

  function regionSelect(options) {
    const opts = options || {};
    const countries = opts.countries || [];
    const selected = {
      all: false,
      countries: new Set(),
      states: {},
    };

    function hydrate(value) {
      selected.all = !!(value && value.all);
      selected.countries = new Set();
      selected.states = {};
      if (selected.all) return;

      ((value && value.countries) || []).forEach(function (code) {
        selected.countries.add(code);
      });

      if (opts.countriesOnly) return;

      const st = (value && value.states) || {};
      Object.keys(st).forEach(function (code) {
        selected.states[code] = new Set(st[code] || []);
      });

      ((value && value.countries) || []).forEach(function (code) {
        const country = countries.find(function (x) {
          return x.code === code;
        });
        if (!country) return;
        const ids = (country.states || []).map(function (s) {
          return s.id;
        });
        if (!ids.length) return;
        const existing = selected.states[code];
        if (existing && existing.size && existing.size < ids.length) {
          /* partial states already set - leave indeterminate */
          return;
        }
        selected.countries.add(code);
        selected.states[code] = new Set(ids);
      });
    }
    hydrate(opts.value);

    let openCountry = null;
    let panelsOpen = false;

    const root = el('div', 'ds-field ds-region-select');
    if (opts.label) {
      root.appendChild(el('span', 'ds-field__label', { text: opts.label }));
    }

    const trigger = el('div', 'ds-region-select__trigger', {
      role: 'combobox',
      tabindex: '0',
      'aria-haspopup': 'listbox',
      'aria-expanded': 'false',
    });
    const triggerMain = el('div', 'ds-region-select__trigger-main');
    const triggerActions = el('div', 'ds-region-select__trigger-actions');
    const clearBtn = el('button', 'ds-region-select__clear', {
      type: 'button',
      'aria-label': opts.clearLabel || 'Clear',
      hidden: 'hidden',
    });
    clearBtn.appendChild(icon({ name: 'close', className: 'ds-region-select__clear-icon' }));
    const chevron = icon({ name: 'chevronDown', className: 'ds-region-select__chevron' });
    triggerActions.appendChild(clearBtn);
    triggerActions.appendChild(chevron);
    trigger.appendChild(triggerMain);
    trigger.appendChild(triggerActions);

    const panels = el('div', 'ds-region-select__panels', { hidden: 'hidden' });
    const primary = el('div', 'ds-region-select__panel');
    const secondary = el('div', 'ds-region-select__panel ds-region-select__panel--secondary', {
      hidden: 'hidden',
    });
    panels.appendChild(primary);
    panels.appendChild(secondary);

    function countryMeta(code) {
      return countries.find(function (x) {
        return x.code === code;
      });
    }

    function ensureStateSet(code) {
      if (!selected.states[code]) selected.states[code] = new Set();
      return selected.states[code];
    }

    function allStateIds(country) {
      return (country.states || []).map(function (s) {
        return s.id;
      });
    }

    function countryCheckState(country) {
      if (selected.all) return 'checked';
      const ids = allStateIds(country);
      const set = selected.states[country.code] || new Set();
      if (!ids.length) {
        return selected.countries.has(country.code) ? 'checked' : 'unchecked';
      }
      if (selected.countries.has(country.code) || set.size === ids.length) return 'checked';
      if (set.size > 0) return 'indeterminate';
      return 'unchecked';
    }

    function selectWholeCountry(country) {
      selected.all = false;
      selected.countries.add(country.code);
      if (opts.countriesOnly) {
        delete selected.states[country.code];
        return;
      }
      const set = ensureStateSet(country.code);
      set.clear();
      allStateIds(country).forEach(function (id) {
        set.add(id);
      });
    }

    function clearCountry(country) {
      selected.countries.delete(country.code);
      delete selected.states[country.code];
    }

    function syncCountryFlag(country) {
      if (opts.countriesOnly) {
        if (!selected.countries.has(country.code)) delete selected.states[country.code];
        return;
      }
      const ids = allStateIds(country);
      const set = selected.states[country.code] || new Set();
      if (ids.length && set.size === ids.length) {
        selected.countries.add(country.code);
      } else {
        selected.countries.delete(country.code);
      }
      if (set.size === 0) delete selected.states[country.code];
    }

    function serialize() {
      if (opts.countriesOnly) {
        return {
          all: selected.all,
          countries: Array.from(selected.countries),
          states: {},
        };
      }
      const states = {};
      Object.keys(selected.states).forEach(function (code) {
        const country = countryMeta(code);
        const arr = Array.from(selected.states[code] || []);
        const ids = country ? allStateIds(country) : [];
        if (selected.countries.has(code) && ids.length && arr.length === ids.length) {
          /* whole country - omit state list for cleaner value */
          return;
        }
        if (arr.length) states[code] = arr;
      });
      return {
        all: selected.all,
        countries: Array.from(selected.countries),
        states: states,
      };
    }

    function selectionChips() {
      if (selected.all) {
        return [{ id: 'all', label: opts.allLabel || 'All', clear: function () {
          selected.all = false;
        } }];
      }
      const chips = [];
      countries.forEach(function (country) {
        const state = countryCheckState(country);
        if (state === 'checked') {
          chips.push({
            id: 'c:' + country.code,
            label: country.name,
            clear: function () {
              clearCountry(country);
            },
          });
          return;
        }
        if (state === 'indeterminate') {
          const set = selected.states[country.code] || new Set();
          Array.from(set).forEach(function (sid) {
            const st = (country.states || []).find(function (s) {
              return s.id === sid;
            });
            chips.push({
              id: 's:' + sid,
              label: st ? st.name : sid,
              clear: function () {
                set.delete(sid);
                syncCountryFlag(country);
              },
            });
          });
        }
      });
      return chips;
    }

    function hasValue() {
      if (selected.all) return true;
      if (selected.countries.size) return true;
      return Object.keys(selected.states).some(function (k) {
        return selected.states[k] && selected.states[k].size;
      });
    }

    function onChipMutate() {
      emit();
      if (panelsOpen) {
        renderPrimary();
        if (openCountry) {
          const c = countryMeta(openCountry);
          if (c) renderSecondary(c);
        }
      }
    }

    function makeChipNode(chipData) {
      const chip = el('span', 'ds-region-select__chip');
      chip.appendChild(el('span', 'ds-region-select__chip-label', { text: chipData.label }));
      const chipClear = el('button', 'ds-region-select__chip-clear', {
        type: 'button',
        'aria-label': 'Remove ' + chipData.label,
      });
      chipClear.appendChild(document.createTextNode('×'));
      chipClear.addEventListener('click', function (e) {
        e.stopPropagation();
        chipData.clear();
        onChipMutate();
      });
      chip.appendChild(chipClear);
      return chip;
    }

    function measureMoreWidth(chipRow, count) {
      if (count <= 0) return 0;
      const probe = el('span', 'ds-region-select__more', { text: '+' + count });
      chipRow.appendChild(probe);
      const w = probe.offsetWidth;
      chipRow.removeChild(probe);
      return w;
    }

    function layoutChips(chipRow, nodes) {
      const available = triggerMain.clientWidth;
      const gap = 6;
      if (!nodes.length || available <= 0) return;

      nodes.forEach(function (n) {
        chipRow.appendChild(n);
      });

      let visible = nodes.length;
      while (visible > 0) {
        const overflow = nodes.length - visible;
        let used = 0;
        for (let i = 0; i < visible; i += 1) {
          used += nodes[i].offsetWidth + (i > 0 ? gap : 0);
        }
        if (overflow > 0) used += gap + measureMoreWidth(chipRow, overflow);
        if (used <= available || visible === 1) break;
        visible -= 1;
      }

      while (chipRow.firstChild) chipRow.removeChild(chipRow.firstChild);
      for (let i = 0; i < visible; i += 1) {
        chipRow.appendChild(nodes[i]);
      }
      if (visible < nodes.length) {
        chipRow.appendChild(
          el('span', 'ds-region-select__more', {
            text: '+' + (nodes.length - visible),
          })
        );
      }
    }

    function paintTrigger() {
      triggerMain.innerHTML = '';
      const chips = selectionChips();
      if (!chips.length) {
        triggerMain.appendChild(
          el('span', 'ds-region-select__placeholder', {
            text: opts.placeholder || 'Select Managed Scope',
          })
        );
        trigger.classList.remove('has-value');
        clearBtn.hidden = true;
        return;
      }

      trigger.classList.add('has-value');
      clearBtn.hidden = false;
      const chipRow = el('div', 'ds-region-select__chips');
      triggerMain.appendChild(chipRow);
      const nodes = chips.map(makeChipNode);

      function runLayout() {
        if (!chipRow.isConnected) return;
        layoutChips(chipRow, nodes);
      }

      runLayout();
      requestAnimationFrame(runLayout);
    }

    function emit() {
      paintTrigger();
      if (opts.onChange) opts.onChange(serialize());
    }

    function positionPanels() {
      const rect = trigger.getBoundingClientRect();
      panels.style.position = 'fixed';
      panels.style.left = Math.max(8, rect.left) + 'px';
      panels.style.right = 'auto';
      panels.style.zIndex = '1300';

      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const openUp = spaceBelow < 280 && spaceAbove > spaceBelow;
      panels.classList.toggle('is-open-up', openUp);

      if (openUp) {
        panels.style.top = 'auto';
        panels.style.bottom = window.innerHeight - rect.top + 4 + 'px';
      } else {
        panels.style.bottom = 'auto';
        panels.style.top = rect.bottom + 4 + 'px';
      }

      // Prefer secondary to the right of primary; flip left if it would clip.
      panels.classList.remove('is-flip-x');
      requestAnimationFrame(function () {
        if (!panelsOpen || secondary.hidden) return;
        const secRect = secondary.getBoundingClientRect();
        if (secRect.right > window.innerWidth - 8) {
          panels.classList.add('is-flip-x');
        }
      });
    }

    function renderSecondary(country) {
      secondary.innerHTML = '';
      if (opts.countriesOnly || !country || !country.states || !country.states.length) {
        secondary.hidden = true;
        return;
      }
      secondary.hidden = false;
      const searchWrap = el('label', 'ds-search ds-search--compact');
      searchWrap.appendChild(icon({ name: 'search', className: 'ds-search__icon' }));
      const searchInput = el('input', 'ds-search__input', {
        type: 'search',
        placeholder: 'Search',
      });
      searchWrap.appendChild(searchInput);
      secondary.appendChild(searchWrap);
      const list = el('div', 'ds-region-select__list');
      secondary.appendChild(list);

      function paint(filter) {
        list.innerHTML = '';
        const q = (filter || '').toLowerCase();
        const set = ensureStateSet(country.code);
        country.states.forEach(function (st) {
          if (q && st.name.toLowerCase().indexOf(q) === -1) return;
          const row = el('label', 'ds-region-select__option');
          const cb = el('input', null, { type: 'checkbox', value: st.id });
          cb.checked = selected.all || set.has(st.id);
          cb.addEventListener('change', function (e) {
            e.stopPropagation();
            selected.all = false;
            if (cb.checked) set.add(st.id);
            else set.delete(st.id);
            syncCountryFlag(country);
            emit();
            renderPrimary();
            paint(searchInput.value);
          });
          row.appendChild(cb);
          row.appendChild(el('span', null, { text: st.name }));
          list.appendChild(row);
        });
      }

      searchInput.addEventListener('input', function () {
        paint(searchInput.value);
      });
      searchInput.addEventListener('click', function (e) {
        e.stopPropagation();
      });
      paint('');
    }

    function renderPrimary() {
      primary.innerHTML = '';
      const allRow = el('label', 'ds-region-select__option');
      const allCb = el('input', null, { type: 'checkbox', value: 'all' });
      allCb.checked = selected.all;
      allCb.addEventListener('change', function (e) {
        e.stopPropagation();
        selected.all = allCb.checked;
        if (selected.all) {
          selected.countries.clear();
          selected.states = {};
          openCountry = null;
          secondary.hidden = true;
        }
        emit();
        renderPrimary();
      });
      allRow.appendChild(allCb);
      allRow.appendChild(el('span', null, { text: opts.allLabel || 'All' }));
      primary.appendChild(allRow);

      countries.forEach(function (country) {
        const row = el('div', 'ds-region-select__option ds-region-select__option--branch' + (openCountry === country.code ? ' is-open' : ''));
        const cb = el('input', null, { type: 'checkbox', value: country.code });
        const checkState = countryCheckState(country);
        cb.checked = checkState === 'checked';
        cb.indeterminate = checkState === 'indeterminate';
        cb.addEventListener('click', function (e) {
          e.stopPropagation();
        });
        cb.addEventListener('change', function (e) {
          e.stopPropagation();
          selected.all = false;
          if (cb.checked) selectWholeCountry(country);
          else clearCountry(country);
          emit();
          renderPrimary();
          if (openCountry === country.code) renderSecondary(country);
        });
        const labelBtn = el('button', 'ds-region-select__branch-btn', { type: 'button' });
        labelBtn.appendChild(cb);
        labelBtn.appendChild(el('span', null, { text: country.name }));
        if (!opts.countriesOnly && country.states && country.states.length) {
          labelBtn.appendChild(icon({ name: 'chevronRight', className: 'ds-region-select__branch-chevron' }));
        }
        labelBtn.addEventListener('click', function (e) {
          if (e.target === cb) return;
          e.preventDefault();
          e.stopPropagation();
          if (opts.countriesOnly) {
            selected.all = false;
            if (selected.countries.has(country.code)) clearCountry(country);
            else selectWholeCountry(country);
            emit();
            renderPrimary();
            return;
          }
          openCountry = country.code;
          renderPrimary();
          renderSecondary(country);
          positionPanels();
        });
        row.appendChild(labelBtn);
        primary.appendChild(row);
      });
    }

    function closePanels() {
      panelsOpen = false;
      panels.hidden = true;
      panels.classList.remove('is-open-up', 'is-flip-x');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('is-open');
      document.removeEventListener('click', onDoc, true);
      window.removeEventListener('resize', positionPanels);
      window.removeEventListener('scroll', positionPanels, true);
      if (panels.parentNode === document.body) {
        document.body.removeChild(panels);
      }
    }

    function onDoc(e) {
      if (root.contains(e.target) || panels.contains(e.target)) return;
      closePanels();
    }

    function openPanels() {
      if (panelsOpen) return;
      panelsOpen = true;
      document.body.appendChild(panels);
      panels.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('is-open');
      renderPrimary();
      if (openCountry) {
        const c = countryMeta(openCountry);
        if (c) renderSecondary(c);
      }
      positionPanels();
      setTimeout(function () {
        document.addEventListener('click', onDoc, true);
      }, 0);
      window.addEventListener('resize', positionPanels);
      window.addEventListener('scroll', positionPanels, true);
    }

    trigger.addEventListener('click', function (e) {
      if (e.target.closest('.ds-region-select__clear') || e.target.closest('.ds-region-select__chip-clear')) {
        return;
      }
      if (panelsOpen) closePanels();
      else openPanels();
    });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (panelsOpen) closePanels();
        else openPanels();
      } else if (e.key === 'Escape' && panelsOpen) {
        closePanels();
      }
    });

    clearBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      selected.all = false;
      selected.countries.clear();
      selected.states = {};
      openCountry = null;
      secondary.hidden = true;
      emit();
      if (panelsOpen) renderPrimary();
    });

    root.appendChild(trigger);
    appendFieldHelper(root, opts.helper);
    paintTrigger();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(function () {
        paintTrigger();
      });
      ro.observe(trigger);
    }

    return {
      root: root,
      getValue: serialize,
      setValue: function (v) {
        hydrate(v);
        emit();
        if (panelsOpen) {
          renderPrimary();
          if (openCountry) {
            const c = countryMeta(openCountry);
            if (c) renderSecondary(c);
          }
        }
      },
      formatLabel: function () {
        const chips = selectionChips();
        if (!chips.length) return opts.placeholder || 'Select Managed Scope';
        if (chips.length === 1) return chips[0].label;
        return chips[0].label + ' +' + (chips.length - 1);
      },
    };
  }

  /**
   * Applied-filter chip row shared by every list page: one removable chip per
   * value, then a "Clear all" text button. `chips` is [{ label, onRemove }];
   * `onChange` runs after any removal (reset paging, selection, re-render).
   * Returns null when nothing is applied.
   */
  function filterChips(options) {
    const opts = options || {};
    const chips = opts.chips || [];
    if (!chips.length) return null;
    const row = document.createElement('div');
    row.className = 'am-filter-chips';
    chips.forEach(function (item) {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'am-filter-chip';
      chip.setAttribute('aria-label', (opts.removeLabel || 'Remove') + ': ' + item.label);
      chip.appendChild(document.createTextNode(item.label));
      const x = document.createElement('span');
      x.className = 'am-filter-chip__x';
      x.setAttribute('aria-hidden', 'true');
      x.textContent = '\u00d7';
      chip.appendChild(x);
      chip.addEventListener('click', function () {
        item.onRemove();
        if (opts.onChange) opts.onChange();
      });
      row.appendChild(chip);
    });
    if (opts.onClearAll) {
      row.appendChild(
        button({
          variant: 'text',
          color: 'primary',
          size: 'small',
          inline: true,
          text: opts.clearAllLabel || 'Clear all',
          onClick: function () {
            opts.onClearAll();
            if (opts.onChange) opts.onChange();
          },
        })
      );
    }
    return row;
  }

  function cloneFilterValue(value) {
    if (Object.prototype.toString.call(value) === '[object Set]') {
      return new Set(Array.from(value, cloneFilterValue));
    }
    if (Array.isArray(value)) return value.map(cloneFilterValue);
    if (value && typeof value === 'object') {
      const out = {};
      Object.keys(value).forEach(function (key) {
        out[key] = cloneFilterValue(value[key]);
      });
      return out;
    }
    return value;
  }

  /**
   * Draft model for a filter panel whose controls write straight into `state`.
   * `begin()` on open remembers the applied values of `keys`; while open,
   * `wrap(fn)` runs fn (row filter, badge count, chips) against those applied
   * values so the list does not follow unapplied ticks. Apply / Clear call
   * `commit()`; every other close calls `discard()`, which puts the applied
   * values back (decided 2026-10-08: closing without Apply drops the ticks).
   */
  function filterDraft(state, keys) {
    let applied = null;

    function take() {
      const snap = {};
      keys.forEach(function (key) {
        snap[key] = cloneFilterValue(state[key]);
      });
      return snap;
    }

    function put(snap) {
      keys.forEach(function (key) {
        state[key] = cloneFilterValue(snap[key]);
      });
    }

    // Puts the draft objects themselves back (not copies): open panel controls
    // hold references to them, e.g. the region panel's `filter` object.
    function withApplied(fn, self, args) {
      if (!applied) return fn.apply(self, args);
      const draft = {};
      keys.forEach(function (key) {
        draft[key] = state[key];
      });
      put(applied);
      try {
        return fn.apply(self, args);
      } finally {
        keys.forEach(function (key) {
          state[key] = draft[key];
        });
      }
    }

    return {
      begin: function () {
        applied = take();
      },
      commit: function () {
        applied = null;
      },
      discard: function () {
        if (applied) put(applied);
        applied = null;
      },
      isOpen: function () {
        return !!applied;
      },
      wrap: function (fn) {
        return function () {
          return withApplied(fn, this, arguments);
        };
      },
    };
  }

  /**
   * Filter-panel radio that a second click clears: single-select categories have
   * no "All" row, so nothing selected means no filter (decided 2026-10-08).
   * `getCurrent` reads the live value so re-renders never go stale; `onChange`
   * gets the option value, or '' when the selected option is clicked again.
   */
  function deselectableRadio(options) {
    const opts = options || {};
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = opts.name || '';
    radio.value = String(opts.value);
    radio.checked = String(opts.getCurrent() || '') === String(opts.value);
    // The browser has already ticked the radio by the time click fires, so the
    // pre-click value comes from getCurrent, not from radio.checked.
    radio.addEventListener('click', function (e) {
      e.stopPropagation();
      if (String(opts.getCurrent() || '') === String(opts.value)) {
        radio.checked = false;
        opts.onChange('');
      } else {
        opts.onChange(opts.value);
      }
    });
    return radio;
  }

  /**
   * Overlay scrollbar: hide the native bar (avoids classic-scrollbar layout shift)
   * and paint floating thumbs over the list while the user scrolls (Y and/or X).
   * Wraps scrollEl in .ds-overlay-scroll; returns { refresh, destroy }.
   * Each axis hides independently when that direction has no overflow.
   */
  function bindOverlayScroll(scrollEl, options) {
    const opts = options || {};
    if (!scrollEl || !scrollEl.parentNode) return null;
    if (scrollEl._dsOverlayScrollApi) return scrollEl._dsOverlayScrollApi;

    const parent = scrollEl.parentNode;
    const host = el('div', 'ds-overlay-scroll');
    parent.insertBefore(host, scrollEl);
    host.appendChild(scrollEl);
    scrollEl.classList.add('ds-overlay-scroll__viewport');

    const thumbY = el('div', 'ds-overlay-scroll__thumb ds-overlay-scroll__thumb--y');
    thumbY.setAttribute('aria-hidden', 'true');
    host.appendChild(thumbY);

    const thumbX = el('div', 'ds-overlay-scroll__thumb ds-overlay-scroll__thumb--x');
    thumbX.setAttribute('aria-hidden', 'true');
    host.appendChild(thumbX);

    const fadeMs = opts.fadeMs != null ? opts.fadeMs : 900;
    const CORNER = 8;
    let hideTimer = null;

    function paintThumbs() {
      const sh = scrollEl.scrollHeight;
      const ch = scrollEl.clientHeight;
      const sw = scrollEl.scrollWidth;
      const cw = scrollEl.clientWidth;
      const maxScrollY = Math.max(0, sh - ch);
      const maxScrollX = Math.max(0, sw - cw);
      const canY = maxScrollY > 1;
      const canX = maxScrollX > 1;

      if (!canY) {
        thumbY.hidden = true;
      } else {
        /* Keep the Y track below sticky headers (e.g. ds-table th). */
        let insetTop = opts.insetTop != null ? Number(opts.insetTop) : 0;
        if (opts.insetTop == null) {
          const sticky = scrollEl.querySelector(
            'thead th, thead .ds-table__check, [data-overlay-inset]'
          );
          if (sticky) {
            const hostBox = host.getBoundingClientRect();
            const stickyBox = sticky.getBoundingClientRect();
            insetTop = Math.max(0, Math.round(stickyBox.bottom - hostBox.top));
          }
        }
        const insetBottom = canX ? CORNER : 0;
        insetTop = Math.min(insetTop, Math.max(0, ch - 32 - insetBottom));

        const trackH = Math.max(32, ch - insetTop - insetBottom);
        const thumbH = Math.max(24, Math.round((ch / sh) * trackH));
        const maxTop = Math.max(0, trackH - thumbH);
        const top = insetTop + (scrollEl.scrollTop / maxScrollY) * maxTop;
        thumbY.hidden = false;
        thumbY.style.height = thumbH + 'px';
        thumbY.style.transform = 'translateY(' + Math.round(top) + 'px)';
      }

      if (!canX) {
        thumbX.hidden = true;
      } else {
        const hostBox = host.getBoundingClientRect();
        let insetLeft = opts.insetLeft != null ? Number(opts.insetLeft) : 0;
        let insetRight = opts.insetRight != null ? Number(opts.insetRight) : 0;
        if (opts.insetLeft == null) {
          const stickyL = scrollEl.querySelector(
            'thead .ds-table__check, .ds-table__check, [data-overlay-inset-left]'
          );
          if (stickyL) {
            const box = stickyL.getBoundingClientRect();
            insetLeft = Math.max(0, Math.round(box.right - hostBox.left));
          }
        }
        if (opts.insetRight == null) {
          const stickyR = scrollEl.querySelector(
            'thead .ds-table__actions-col, .ds-table__actions-col, [data-overlay-inset-right]'
          );
          if (stickyR) {
            const box = stickyR.getBoundingClientRect();
            insetRight = Math.max(0, Math.round(hostBox.right - box.left));
          }
        }
        if (canY) insetRight = Math.max(insetRight, CORNER);
        insetLeft = Math.min(insetLeft, Math.max(0, cw - 32 - insetRight));
        insetRight = Math.min(insetRight, Math.max(0, cw - 32 - insetLeft));

        const trackW = Math.max(32, cw - insetLeft - insetRight);
        const thumbW = Math.max(24, Math.round((cw / sw) * trackW));
        const maxLeft = Math.max(0, trackW - thumbW);
        const left = insetLeft + (scrollEl.scrollLeft / maxScrollX) * maxLeft;
        thumbX.hidden = false;
        thumbX.style.width = thumbW + 'px';
        thumbX.style.transform = 'translateX(' + Math.round(left) + 'px)';
      }

      if (!canY && !canX) {
        host.classList.remove('is-scrolling');
      }
    }

    function onScroll() {
      paintThumbs();
      if (thumbY.hidden && thumbX.hidden) return;
      host.classList.add('is-scrolling');
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        host.classList.remove('is-scrolling');
      }, fadeMs);
    }

    scrollEl.addEventListener('scroll', onScroll, { passive: true });

    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(function () {
        paintThumbs();
      });
      ro.observe(scrollEl);
    }

    const mo = new MutationObserver(function () {
      paintThumbs();
    });
    mo.observe(scrollEl, { childList: true, subtree: true });

    paintThumbs();

    const api = {
      refresh: paintThumbs,
      destroy: function () {
        scrollEl.removeEventListener('scroll', onScroll);
        if (hideTimer) clearTimeout(hideTimer);
        if (ro) ro.disconnect();
        mo.disconnect();
        if (thumbY.parentNode) thumbY.parentNode.removeChild(thumbY);
        if (thumbX.parentNode) thumbX.parentNode.removeChild(thumbX);
        if (host.parentNode) {
          host.parentNode.insertBefore(scrollEl, host);
          host.parentNode.removeChild(host);
        }
        scrollEl.classList.remove('ds-overlay-scroll__viewport');
        delete scrollEl._dsOverlayScrollApi;
      },
    };
    scrollEl._dsOverlayScrollApi = api;
    return api;
  }

  /* Apply width / minWidth / maxWidth from a column def. Flex columns may set
     minWidth only (no width) so they absorb leftover table space. */
  function applyColSizeStyles(node, col) {
    if (!col || (!col.width && !col.minWidth && !col.maxWidth)) return;
    if (col.width) node.style.width = col.width;
    if (col.minWidth) node.style.minWidth = col.minWidth;
    else if (col.width) node.style.minWidth = col.width;
    if (col.maxWidth) node.style.maxWidth = col.maxWidth;
  }

  /* ─── Column resize (session-only; never persisted to localStorage) ───
     Keyed by a caller-supplied tableId so multiple table instances (tabs,
     modals) don't clobber each other. Cleared on page reload by nature of
     being an in-memory object, and explicitly via resetColumnWidths(). */
  const columnWidthOverrides = Object.create(null);
  const COL_RESIZE_MIN_PX = 72;
  const COL_RESIZE_MAX_PX = 720;
  const CELL_HPAD_PX = 32; /* .ds-table th/td padding: 12px 16px -> 16px each side */

  /* Never let a column shrink past the point of clipping its own heading.
     scrollWidth is NOT usable for this: a label that isn't currently
     overflowing (the common case) just reports the cell's current full
     width back, which self-defeatingly floors every shrink attempt near
     wherever the column already is. Instead measure the label text in a
     throwaway, unconstrained probe (white-space: nowrap, no max-width) so
     its natural content width comes back regardless of the column's
     current size - accurate at any zoom/locale/font, no hand-picked
     per-column guess needed. Appended as a child of the <th> (not <body>)
     so it inherits the header's real computed font via normal cascade.
     Only callable once the <th> is attached to the live document. */
  function headerLabelMinWidth(thEl, col) {
    if (!thEl) return 0;
    const probe = el('span', null, { text: (col && col.label) || '' });
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.whiteSpace = 'nowrap';
    probe.style.left = '-99999px';
    probe.style.top = '-99999px';
    thEl.appendChild(probe);
    const textWidth = probe.getBoundingClientRect().width;
    thEl.removeChild(probe);
    const sortIndicatorBuffer = col && col.sortable ? 18 : 0;
    return textWidth + CELL_HPAD_PX + sortIndicatorBuffer;
  }

  function parseWidthPx(value) {
    const n = parseInt(String(value), 10);
    return isNaN(n) ? null : n;
  }

  /* Current live-resized px width for one column, or fallbackPx if the
     user hasn't dragged it this session. Lets a table's own "fills
     leftover space" column (e.g. AMColumnPrefs' Role Management
     Description) compute correctly against what its sibling columns are
     ACTUALLY rendered at right now rather than their stale defaults -
     without this, resizing a sibling wouldn't correctly grow/shrink the
     column that's supposed to absorb the difference. */
  function getColumnWidth(tableId, key, fallbackPx) {
    const overrides = tableId && columnWidthOverrides[tableId];
    const overridePx = overrides && overrides[key];
    return overridePx != null ? overridePx : fallbackPx;
  }

  function resetColumnWidths(tableId) {
    if (tableId) delete columnWidthOverrides[tableId];
  }

  /* Column def with any live width override applied, dropping the default
     maxWidth cap so a user-driven resize always wins over it. Returns the
     original col when there's no override (or no tableId) - no copy made. */
  function effectiveColDef(tableId, col) {
    if (!tableId || !col || !col.key) return col;
    const overrides = columnWidthOverrides[tableId];
    const overridePx = overrides && overrides[col.key];
    if (overridePx == null) return col;
    const merged = {};
    for (const k in col) {
      if (Object.prototype.hasOwnProperty.call(col, k)) merged[k] = col[k];
    }
    merged.width = overridePx + 'px';
    merged.maxWidth = null;
    return merged;
  }

  /* Builds the draggable grip appended to a resizable <th>. Drives the
     corresponding <colgroup> <col> element and the <th> itself (rows' <td>
     cells intentionally carry no inline width of their own - see the
     dataTable row loop - so those two are the only nodes a resize needs to
     touch), then commits the final px width into columnWidthOverrides on
     release. */
  function buildColResizeHandle(tableId, col, colEl, thEl, syncTableWidth) {
    const handle = el('span', 'ds-table__resize-handle', {
      role: 'separator',
      'aria-orientation': 'vertical',
      'aria-label': 'Resize column',
      tabindex: '-1',
    });
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startWidth = 0;
    let minPx = COL_RESIZE_MIN_PX;

    function onPointerMove(e) {
      if (!dragging) return;
      moved = true;
      let next = startWidth + (e.clientX - startX);
      if (next < minPx) next = minPx;
      if (next > COL_RESIZE_MAX_PX) next = COL_RESIZE_MAX_PX;
      const px = next + 'px';
      /* table-layout: fixed sizes the column from <col>, but the <th> still
         carries its own inline min-width (mirrored from the default width
         by applyColSizeStyles) which otherwise stays stuck at the original
         value and silently floors any attempt to shrink below it - keep
         both in lockstep for the whole drag. */
      colEl.style.width = px;
      colEl.style.minWidth = px;
      colEl.style.maxWidth = '';
      if (thEl) {
        thEl.style.width = px;
        thEl.style.minWidth = px;
        thEl.style.maxWidth = '';
      }
      if (syncTableWidth) syncTableWidth();
    }

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      handle.classList.remove('is-resizing');
      document.documentElement.classList.remove('ds-table-resizing');
      try {
        handle.releasePointerCapture(e.pointerId);
      } catch (err) {
        /* ignore */
      }
      /* A plain click (no pointermove) never touched colEl.style.width, which
         may still hold a non-px default (e.g. "22%") - only commit when an
         actual drag happened, so parseWidthPx never truncates a percentage
         into a bogus px override. */
      if (moved) {
        const finalWidth = parseWidthPx(colEl.style.width);
        if (finalWidth != null) {
          if (!columnWidthOverrides[tableId]) columnWidthOverrides[tableId] = {};
          columnWidthOverrides[tableId][col.key] = finalWidth;
        }
      }
      moved = false;
    }

    handle.addEventListener('pointerdown', function (e) {
      if (e.button != null && e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      /* <col> never generates a rendered box, so its getBoundingClientRect()
         is always a zero rect - the <th> is the reliable source of the
         column's actual current on-screen width. */
      startWidth = (thEl || colEl).getBoundingClientRect().width;
      /* Deliberately NOT using col.minWidth here: column-prefs modules set
         minWidth === the column's own default width for every "locked,
         non-flex" column (a pre-resize convention meaning "don't let
         content compress this"), which would floor the drag at exactly
         wherever the column already is - making it impossible to ever
         shrink. The header-label floor is the correct, universal one: it
         lets every column - locked or flex - shrink down to just past its
         own heading, and nothing more restrictive than that. */
      minPx = Math.max(COL_RESIZE_MIN_PX, headerLabelMinWidth(thEl, col));
      handle.classList.add('is-resizing');
      document.documentElement.classList.add('ds-table-resizing');
      try {
        handle.setPointerCapture(e.pointerId);
      } catch (err) {
        /* ignore */
      }
      e.preventDefault();
      e.stopPropagation();
    });
    handle.addEventListener('pointermove', onPointerMove);
    handle.addEventListener('pointerup', endDrag);
    handle.addEventListener('pointercancel', endDrag);
    handle.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    return handle;
  }

  function dataTable(options) {
    const opts = options || {};
    const tableId = opts.tableId || null;
    const root = el('div', 'ds-table-wrap' + (opts.className ? ' ' + opts.className : ''));
    const scroll = el('div', 'ds-table-scroll');
    const table = el('table', 'ds-table' + (tableId ? ' ds-table--resizable' : ''));
    const columns = opts.columns || [];
    /* rowActions is `position: sticky; right: 0`, which only pins within
       its own table's box. Every resizable column now always carries a
       real, computed px width (see syncTableWidth below), so once the user
       shrinks columns the table itself can end up narrower than its card,
       leaving the sticky actions column nothing to pin against - it just
       visually drifts left with the shrunk columns. A dedicated blank
       filler column (no declared width, so table-layout: fixed hands it
       100% of any leftover space and none of it) keeps a real right edge
       for it to stick to at all times, live during a drag, with no
       re-render needed - without that leftover space getting redistributed
       into the resizable data columns instead (which is the bug that
       motivated giving every column a real px width in the first place). */
    const needsFiller = !!(tableId && opts.rowActions);

    const colgroup = el('colgroup');
    const colElsByKey = {};
    if (opts.selectable) {
      colgroup.appendChild(el('col', 'ds-table__col ds-table__col--check'));
    }
    columns.forEach(function (col) {
      const colEl = el('col', 'ds-table__col');
      applyColSizeStyles(colEl, effectiveColDef(tableId, col));
      if (col.key) colElsByKey[col.key] = colEl;
      colgroup.appendChild(colEl);
    });
    if (needsFiller) {
      colgroup.appendChild(el('col', 'ds-table__col--filler'));
    }
    if (opts.rowActions) {
      colgroup.appendChild(el('col', 'ds-table__col ds-table__col--actions'));
    }
    table.appendChild(colgroup);

    /* For resizable tables, `width: max-content` on a table-layout: fixed
       table is NOT reliably "sum of the declared column widths" in Chromium
       - it can still be pulled wider by actual cell content (verified: a
       long description string stretched a 420px column to 574px). Only a
       definite inline width sidesteps that ambiguity entirely. A resizable
       table is therefore expected to give every real column (including any
       "fills the leftover space" column) a real, computed px width up
       front - see e.g. Product Tiers' description column, sized from the
       host's clientWidth the same way AMColumnPrefs already sizes Role
       Management's Description column - the filler <col> above is the only
       genuinely-unspecified column, dedicated to soaking up whatever's
       left. `hasFlexCol` here is only a defensive fallback for a data
       column that ends up with no width at all. */
    const CHECK_COL_PX = 44;
    const ACTIONS_COL_PX = 56;
    function syncTableWidth() {
      if (!tableId) return;
      let total = opts.selectable ? CHECK_COL_PX : 0;
      let hasFlexCol = false;
      columns.forEach(function (col) {
        const colEl = col.key && colElsByKey[col.key];
        const w = colEl ? parseWidthPx(colEl.style.width) : null;
        if (w == null) {
          hasFlexCol = true;
          return;
        }
        total += w;
      });
      if (opts.rowActions) total += ACTIONS_COL_PX;
      table.style.width = hasFlexCol ? '' : needsFiller ? 'max(' + total + 'px, 100%)' : total + 'px';
    }
    syncTableWidth();

    const thead = el('thead');
    const headRow = el('tr');

    if (opts.selectable) {
      const thCheck = el('th', 'ds-table__check');
      if (opts.hideSelectAll) {
        thCheck.setAttribute('aria-hidden', 'true');
      } else {
        const allCb = el('input', null, {
          type: 'checkbox',
          'aria-label': opts.selectAllLabel || 'Select all',
        });
        allCb.checked = !!opts.allSelected;
        allCb.indeterminate = !!opts.someSelected && !opts.allSelected;
        allCb.addEventListener('change', function () {
          if (opts.onToggleAll) opts.onToggleAll(allCb.checked);
        });
        thCheck.appendChild(allCb);
      }
      headRow.appendChild(thCheck);
    }

    columns.forEach(function (col) {
      const th = el('th', col.sortable ? 'ds-table__sortable' : null);
      applyColSizeStyles(th, effectiveColDef(tableId, col));
      if (col.align === 'right') th.classList.add('ds-table__num');
      if (col.sortable) {
        const btn = el('button', 'ds-table__sort-btn' + (opts.sortKey === col.key ? ' is-active' : ''), {
          type: 'button',
        });
        btn.appendChild(el('span', 'ds-table__sort-btn-label', { text: col.label }));
        if (opts.sortKey === col.key) {
          btn.setAttribute('aria-sort', opts.sortDir === 'desc' ? 'descending' : 'ascending');
          btn.appendChild(el('span', 'ds-table__sort-ind', {
            text: opts.sortDir === 'desc' ? ' ↓' : ' ↑',
          }));
        }
        btn.addEventListener('click', function () {
          if (opts.onSort) opts.onSort(col.key);
        });
        th.appendChild(btn);
      } else {
        th.appendChild(el('span', 'ds-table__cell', { text: col.label }));
      }
      if (tableId && col.key && col.resizable !== false && colElsByKey[col.key]) {
        th.appendChild(buildColResizeHandle(tableId, col, colElsByKey[col.key], th, syncTableWidth));
      }
      headRow.appendChild(th);
    });

    if (needsFiller) {
      headRow.appendChild(el('th', null, { 'aria-hidden': 'true' }));
    }
    if (opts.rowActions) {
      headRow.appendChild(el('th', 'ds-table__actions-col', { text: opts.actionsLabel || '' }));
    }

    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = el('tbody');
    const rows = opts.rows || [];
    if (!rows.length) {
      const empty = el('tr');
      const td = el('td', 'ds-table__empty', {
        colspan: String(
          columns.length + (opts.selectable ? 1 : 0) + (needsFiller ? 1 : 0) + (opts.rowActions ? 1 : 0)
        ),
        text: opts.emptyLabel || 'No results',
      });
      empty.appendChild(td);
      tbody.appendChild(empty);
    } else {
      rows.forEach(function (row) {
        const tr = el(
          'tr',
          (row.selected ? 'is-selected ' : '') + (opts.onRowClick ? 'ds-table__row--clickable' : '') || null
        );
        if (opts.selectable) {
          const td = el('td', 'ds-table__check');
          const cb = el('input', null, {
            type: 'checkbox',
            'aria-label': 'Select ' + (row.name || row.id || ''),
          });
          if (row.indeterminate) {
            cb.indeterminate = true;
            cb.checked = false;
          } else {
            cb.checked = !!row.selected;
          }
          cb.addEventListener('change', function () {
            if (opts.onToggleRow) opts.onToggleRow(row.id, cb.checked);
          });
          td.appendChild(cb);
          tr.appendChild(td);
        }
        columns.forEach(function (col) {
          const td = el('td');
          if (col.align === 'right') td.classList.add('ds-table__num');
          /* Deliberately no width/minWidth/maxWidth here. table-layout: fixed
             makes <colgroup> <col> (and, mirrored for it, the <th>) the sole
             authority on a column's rendered width; every row would need its
             own <td> kept in sync too if this carried its own inline width,
             which is exactly what silently pinned resized columns back to
             their default - see buildColResizeHandle. */
          const val = row.cells && row.cells[col.key] != null ? row.cells[col.key] : row[col.key];
          if (val && typeof val === 'object' && val.nodeType === 1) {
            td.appendChild(val);
            tr.appendChild(td);
            return;
          }
          let text = '';
          let title;
          if (val && typeof val === 'object' && val.text != null) {
            text = String(val.text);
            title = val.title != null ? String(val.title) : text;
          } else {
            text = val == null ? '' : String(val);
            title = text || undefined;
          }
          const truncate = col.truncate !== false;
          if (truncate) {
            const cell = el('span', 'ds-table__cell', {
              text: text,
              title: title || undefined,
            });
            td.appendChild(cell);
          } else {
            td.textContent = text;
            if (title) td.title = title;
          }
          tr.appendChild(td);
        });
        if (needsFiller) {
          tr.appendChild(el('td', null, { 'aria-hidden': 'true' }));
        }
        if (opts.rowActions) {
          const td = el('td', 'ds-table__actions-col');
          td.appendChild(opts.rowActions(row));
          tr.appendChild(td);
        }
        if (opts.onRowClick) {
          tr.addEventListener('click', function (e) {
            const target = e.target;
            if (
              target &&
              target.closest &&
              target.closest('input, button, a, .ds-menu, .ds-table__actions-col')
            ) {
              return;
            }
            opts.onRowClick(row);
          });
        }
        tbody.appendChild(tr);
      });
    }
    table.appendChild(tbody);
    scroll.appendChild(table);
    root.appendChild(scroll);
    bindOverlayScroll(scroll);

    if (opts.pagination) {
      const p = opts.pagination;
      const foot = el('div', 'ds-table__footer');
      foot.appendChild(el('span', 'ds-table__status', {
        text: p.statusText || '',
      }));
      const controls = el('div', 'ds-table__pager');
      const sizeLabel = el('label', 'ds-table__page-size');
      sizeLabel.appendChild(document.createTextNode(p.pageSizeLabel || 'Rows'));
      const sizeSelect = el('select', 'ds-field__input ds-field__select ds-table__page-size-select');
      (p.pageSizeOptions || [10, 20, 50]).forEach(function (n) {
        const o = el('option', null, { value: String(n), text: String(n) });
        if (n === p.pageSize) o.selected = true;
        sizeSelect.appendChild(o);
      });
      sizeSelect.addEventListener('change', function () {
        if (p.onPageSizeChange) p.onPageSizeChange(Number(sizeSelect.value));
      });
      sizeLabel.appendChild(sizeSelect);
      controls.appendChild(sizeLabel);
      const prev = button({
        variant: 'ghost',
        inline: true,
        text: '‹',
        ariaLabel: 'Previous page',
        disabled: p.page <= 1,
        onClick: function () {
          if (p.onPageChange) p.onPageChange(p.page - 1);
        },
      });
      const next = button({
        variant: 'ghost',
        inline: true,
        text: '›',
        ariaLabel: 'Next page',
        disabled: p.page >= p.pageCount,
        onClick: function () {
          if (p.onPageChange) p.onPageChange(p.page + 1);
        },
      });
      controls.appendChild(prev);
      controls.appendChild(next);
      foot.appendChild(controls);
      root.appendChild(foot);
    }

    return { root: root };
  }

  function spinner(options) {
    const size = (options && options.size) || 'md';
    return el('span', 'ds-spinner ds-spinner--' + size, { 'aria-hidden': 'true' });
  }

  function pageLoader(options) {
    const root = el('div', 'ds-page-loader', {
      id: options && options.id ? options.id : undefined,
      role: 'status',
      'aria-live': 'polite',
      'aria-busy': 'true',
      'aria-label': (options && options.label) || 'Loading',
    });
    if (options && options.hidden) root.hidden = true;
    root.appendChild(spinner({ size: 'lg' }));
    return root;
  }

  function platformUserMenu(options) {
    const wrap = el('div', 'platform-appbar__account');
    const trigger = el('button', 'platform-appbar__avatar', {
      type: 'button',
      id: options.id || 'platform-avatar',
      'aria-haspopup': 'menu',
      'aria-expanded': 'false',
      'aria-label': options.avatarLabel,
      text: options.initials,
    });
    const menuId = (options.id || 'platform-avatar') + '-menu';
    trigger.setAttribute('aria-controls', menuId);

    const menu = el('div', 'platform-user-menu', {
      id: menuId,
      role: 'menu',
      hidden: 'hidden',
    });

    const profile = el('div', 'platform-user-menu__profile');
    profile.appendChild(el('div', 'platform-user-menu__avatar', {
      text: options.initials,
      'aria-hidden': 'true',
    }));
    const meta = el('div', 'platform-user-menu__meta');
    meta.appendChild(el('p', 'platform-user-menu__name', { text: options.displayName }));
    const emailEl = options.onEmailClick
      ? el('button', 'platform-user-menu__email', {
          type: 'button',
          text: options.email,
          title: options.emailTitle || options.email,
          'aria-label': options.emailAriaLabel || options.email,
        })
      : el('p', 'platform-user-menu__email', { text: options.email });
    if (options.onEmailClick) {
      emailEl.addEventListener('click', function (e) {
        e.stopPropagation();
        closeMenu();
        options.onEmailClick();
      });
    }
    meta.appendChild(emailEl);
    profile.appendChild(meta);
    menu.appendChild(profile);

    menu.appendChild(el('div', 'platform-user-menu__divider', { role: 'separator' }));

    const preferences = el('button', 'platform-user-menu__item', {
      type: 'button',
      role: 'menuitem',
      text: options.preferencesLabel,
    });
    preferences.addEventListener('click', function (e) {
      e.stopPropagation();
      closeMenu();
      if (options.onPreferences) options.onPreferences();
    });
    menu.appendChild(preferences);

    menu.appendChild(el('div', 'platform-user-menu__divider', { role: 'separator' }));

    const actions = el('div', 'platform-user-menu__actions');
    const signOut = button({
      id: 'platform-sign-out',
      text: options.signOutLabel,
      variant: 'contained',
      color: 'primary',
      fullWidth: true,
      onClick: function (e) {
        e.stopPropagation();
        closeMenu();
        if (options.onSignOut) options.onSignOut();
      },
    });
    signOut.setAttribute('role', 'menuitem');
    signOut.classList.add('platform-user-menu__sign-out');
    actions.appendChild(signOut);

    const legal = el('div', 'platform-user-menu__legal');
    const privacy = el('a', 'platform-user-menu__legal-link', {
      href: options.privacyHref || '#',
      text: options.privacyLabel,
    });
    const terms = el('a', 'platform-user-menu__legal-link', {
      href: options.termsHref || '#',
      text: options.termsLabel,
    });
    privacy.addEventListener('click', function (e) {
      e.stopPropagation();
      if (options.onPrivacy) {
        e.preventDefault();
        options.onPrivacy();
      }
    });
    terms.addEventListener('click', function (e) {
      e.stopPropagation();
      if (options.onTerms) {
        e.preventDefault();
        options.onTerms();
      }
    });
    legal.appendChild(privacy);
    legal.appendChild(terms);
    actions.appendChild(legal);
    menu.appendChild(actions);

    function closeMenu() {
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      wrap.classList.remove('is-open');
    }

    function positionMenu() {
      const rect = trigger.getBoundingClientRect();
      menu.style.top = Math.round(rect.bottom + 8) + 'px';
      menu.style.right = Math.round(window.innerWidth - rect.right) + 'px';
      menu.style.left = 'auto';
    }

    function openMenu() {
      positionMenu();
      menu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
      wrap.classList.add('is-open');
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (menu.hidden) openMenu();
      else closeMenu();
    });

    menu.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    document.addEventListener('click', function () {
      if (!menu.hidden) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) {
        closeMenu();
        trigger.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (!menu.hidden) positionMenu();
    });

    wrap.appendChild(trigger);
    document.body.appendChild(menu);

    return {
      root: wrap,
      trigger: trigger,
      menu: menu,
      close: closeMenu,
    };
  }

  function platformAppBar(options) {
    const header = el('header', 'platform-appbar');
    const brand = el('div', 'platform-appbar__brand');

    let toggleBtn = null;
    if (options.onToggleNav) {
      toggleBtn = el('button', 'platform-appbar__nav-toggle', {
        type: 'button',
        id: 'platform-nav-toggle',
        'aria-controls': 'platform-nav',
        'aria-expanded': options.navExpanded === false ? 'false' : 'true',
        'aria-label': options.navToggleLabel || 'Toggle navigation',
      });
      toggleBtn.appendChild(icon({
        name: 'menu',
        className: 'platform-appbar__nav-toggle-icon',
      }));
      toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        options.onToggleNav();
      });
      brand.appendChild(toggleBtn);
    }

    brand.appendChild(el('img', 'platform-appbar__logo', {
      src: 'Assets/Carrier.svg',
      alt: options.carrierAlt,
    }));
    brand.appendChild(el('span', 'platform-appbar__product', { text: options.productName }));
    header.appendChild(brand);

    const account = platformUserMenu({
      id: options.avatarId,
      initials: options.initials,
      avatarLabel: options.avatarLabel,
      displayName: options.displayName,
      email: options.email,
      preferencesLabel: options.preferencesLabel,
      signOutLabel: options.signOutLabel,
      privacyLabel: options.privacyLabel,
      termsLabel: options.termsLabel,
      privacyHref: options.privacyHref,
      termsHref: options.termsHref,
      onPreferences: options.onPreferences,
      onSignOut: options.onSignOut,
      onPrivacy: options.onPrivacy,
      onTerms: options.onTerms,
      onEmailClick: options.onEmailClick,
      emailTitle: options.emailTitle,
      emailAriaLabel: options.emailAriaLabel,
    });
    header.appendChild(account.root);
    return { root: header, account: account, navToggle: toggleBtn };
  }

  /** Nested Level 1 / Level 2 platform navigation rail */
  function platformNav(options) {
    const nav = el('nav', 'platform-nav', {
      id: 'platform-nav',
      'aria-label': options.ariaLabel,
    });
    const content = el('div', 'platform-nav__content');

    const routeButtons = [];
    const groupState = {};
    const groupEls = {};

    function hasChildren(item) {
      return !!(item.children && item.children.length);
    }

    (options.items || []).forEach(function (group) {
      if (!hasChildren(group)) return;
      groupState[group.id] = false;
    });

    // Accordion: at most one nest open. Prefer the group with the active route.
    let initialOpenId = null;
    (options.items || []).forEach(function (group) {
      if (!hasChildren(group) || initialOpenId) return;
      const openByActive = group.children.some(function (child) {
        return child.id === options.activeId;
      });
      if (openByActive) initialOpenId = group.id;
    });
    if (!initialOpenId) {
      (options.defaultOpenGroups || []).some(function (id) {
        if (Object.prototype.hasOwnProperty.call(groupState, id)) {
          initialOpenId = id;
          return true;
        }
        return false;
      });
    }
    if (initialOpenId) groupState[initialOpenId] = true;

    function syncGroup(groupId) {
      const entry = groupEls[groupId];
      if (!entry) return;
      const open = !!groupState[groupId];
      entry.wrap.classList.toggle('is-expanded', open);
      entry.trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      entry.children.hidden = !open;
      if (entry.chevron) {
        entry.chevron.src = iconUrl(open ? 'chevronDown' : 'chevronRight');
      }
    }

    function collapseOthers(exceptId) {
      Object.keys(groupState).forEach(function (id) {
        if (id === exceptId || !groupState[id]) return;
        groupState[id] = false;
        syncGroup(id);
      });
    }

    function expandGroup(groupId) {
      collapseOthers(groupId);
      groupState[groupId] = true;
      syncGroup(groupId);
    }

    function toggleGroup(groupId) {
      if (groupState[groupId]) {
        groupState[groupId] = false;
        syncGroup(groupId);
        return;
      }
      expandGroup(groupId);
    }

    function setActive(id) {
      routeButtons.forEach(function (btn) {
        const active = id != null && btn.dataset.route === id;
        btn.classList.toggle('is-active', active);
        if (active) btn.setAttribute('aria-current', 'page');
        else btn.removeAttribute('aria-current');
      });

      if (id == null) return;

      (options.items || []).forEach(function (group) {
        if (!hasChildren(group)) return;
        const match = group.children.some(function (child) {
          return child.id === id;
        });
        if (match) expandGroup(group.id);
      });
    }

    function selectRoute(item) {
      if (item.externalUrl) {
        if (options.onSelect) options.onSelect(item);
        return;
      }
      setActive(item.id);
      if (options.onSelect) options.onSelect(item);
    }

    (options.items || []).forEach(function (group) {
      if (!hasChildren(group)) {
        const leaf = navItem({
          variant: 'leaf',
          routeId: group.id,
          label: group.label,
          icon: group.icon,
          onClick: function () {
            selectRoute(group);
          },
        });
        routeButtons.push(leaf.root);
        content.appendChild(leaf.root);
        return;
      }

      const wrap = el('div', 'platform-nav__group', { 'data-group': group.id });
      const groupItem = navItem({
        variant: 'group',
        label: group.label,
        icon: group.icon,
        expanded: !!groupState[group.id],
        controlsId: 'platform-nav-group-' + group.id,
        onClick: function () {
          toggleGroup(group.id);
        },
      });
      const trigger = groupItem.root;
      const chevron = groupItem.chevron;

      const children = el('div', 'platform-nav__children', {
        id: 'platform-nav-group-' + group.id,
        role: 'group',
        'aria-label': group.label,
      });
      if (!groupState[group.id]) children.hidden = true;

      group.children.forEach(function (child) {
        const childItem = navItem({
          variant: 'child',
          routeId: child.id,
          label: child.label,
          icon: child.icon,
          onClick: function () {
            selectRoute(child);
          },
        });
        routeButtons.push(childItem.root);
        children.appendChild(childItem.root);
      });

      wrap.appendChild(trigger);
      wrap.appendChild(children);
      content.appendChild(wrap);

      groupEls[group.id] = {
        wrap: wrap,
        trigger: trigger,
        children: children,
        chevron: chevron,
      };

      if (groupState[group.id]) wrap.classList.add('is-expanded');
    });

    nav.appendChild(content);

    const footer = el('div', 'platform-nav__footer');
    const actions = el('div', 'platform-nav__actions');

    actions.appendChild(navChip({
      className: 'platform-nav__faq',
      label: options.faqLabel,
      icon: 'help',
      iconClassName: 'platform-nav__chip-icon platform-nav__faq-icon',
      onClick: options.onFaq || undefined,
    }));

    if (options.settingsLabel) {
      actions.appendChild(navChip({
        label: options.settingsLabel,
        icon: 'settings',
        onClick: options.onSettings || undefined,
      }));
    }

    footer.appendChild(actions);

    const brand = el('div', 'platform-nav__brand');
    brand.appendChild(el('img', 'platform-nav__brand-logo', {
      src: 'Assets/Carrier.svg',
      alt: options.carrierAlt || 'Carrier',
    }));
    footer.appendChild(brand);
    nav.appendChild(footer);

    setActive(options.activeId);

    return {
      root: nav,
      setActive: setActive,
      expandGroup: expandGroup,
    };
  }

  function platformWorkspace(options) {
    const workspace = el('main', 'platform-workspace', {
      id: 'platform-workspace',
      'aria-label': options.ariaLabel,
      tabindex: '-1',
    });
    if (options.route) workspace.dataset.route = options.route;
    return workspace;
  }

  function underConstructionPanel(options) {
    const root = el('div', 'platform-under-construction');
    root.appendChild(el('h1', 'platform-under-construction__title', {
      text: options.title,
    }));
    if (options.subtitle) {
      root.appendChild(el('p', 'platform-under-construction__subtitle', {
        text: options.subtitle,
      }));
    }
    root.appendChild(el('p', 'platform-under-construction__body', {
      text: options.body,
    }));
    const actions = el('div', 'platform-under-construction__actions');
    actions.appendChild(button({
      text: options.goBackLabel,
      variant: 'contained',
      color: 'primary',
      fullWidth: true,
      onClick: options.onGoBack,
    }));
    root.appendChild(actions);
    return root;
  }

  function platformShell(options) {
    const shell = el('div', 'platform-shell');
    let collapsed = !!options.navCollapsed;

    function syncNavToggle(toggleBtn) {
      if (!toggleBtn) return;
      const expanded = !collapsed;
      toggleBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      toggleBtn.setAttribute(
        'aria-label',
        expanded
          ? (options.collapseNavLabel || 'Collapse navigation')
          : (options.expandNavLabel || 'Expand navigation')
      );
    }

    function applyCollapsed() {
      shell.classList.toggle('is-nav-collapsed', collapsed);
      syncNavToggle(appBar.navToggle);
      if (options.onNavCollapse) options.onNavCollapse(collapsed);
    }

    const appBar = platformAppBar(Object.assign({}, options.appBar, {
      navExpanded: !collapsed,
      navToggleLabel: collapsed
        ? (options.expandNavLabel || 'Expand navigation')
        : (options.collapseNavLabel || 'Collapse navigation'),
      onToggleNav: function () {
        collapsed = !collapsed;
        applyCollapsed();
      },
    }));
    shell.appendChild(appBar.root);

    const nav = platformNav(options.nav);
    shell.appendChild(nav.root);
    shell.appendChild(platformWorkspace(options.workspace));

    applyCollapsed();

    return {
      root: shell,
      nav: nav,
      appBar: appBar,
      setNavCollapsed: function (value) {
        collapsed = !!value;
        applyCollapsed();
      },
      isNavCollapsed: function () {
        return collapsed;
      },
    };
  }

  function phoneField(options) {
    const opts = options || {};
    const countries = (opts.countries && opts.countries.length
      ? opts.countries
      : PHONE_COUNTRIES
    ).slice();

    function flagEmoji(code) {
      const cc = String(code || '').toUpperCase();
      if (cc.length !== 2) return '🏳️';
      return String.fromCodePoint(
        0x1f1e6 + cc.charCodeAt(0) - 65,
        0x1f1e6 + cc.charCodeAt(1) - 65
      );
    }

    function findCountry(code) {
      return (
        countries.find(function (c) {
          return c.code === code;
        }) || countries[0]
      );
    }

    function parseInitial(value, preferredCode) {
      const raw = String(value || '').trim();
      if (preferredCode) {
        const preferred = findCountry(preferredCode);
        let national = raw;
        if (preferred && raw.indexOf(preferred.dial) === 0) {
          national = raw.slice(preferred.dial.length).trim();
        }
        return { country: preferred, national: national };
      }
      const sorted = countries.slice().sort(function (a, b) {
        return b.dial.length - a.dial.length;
      });
      for (let i = 0; i < sorted.length; i += 1) {
        const c = sorted[i];
        if (raw.indexOf(c.dial) === 0) {
          return { country: c, national: raw.slice(c.dial.length).trim() };
        }
      }
      return { country: findCountry(opts.countryCode || 'US'), national: raw };
    }

    const initial = parseInitial(opts.value, opts.countryCode);
    let country = initial.country;
    let expanded = false;
    let query = '';
    let error = !!opts.error;
    let disabled = !!opts.disabled;

    const size = opts.size || 'medium';
    const sizeClass =
      size === 'xlarge' || size === 'large' || size === 'small'
        ? 'ds-phone--' + size
        : 'ds-phone--medium';

    const root = el('div', 'ds-field ds-phone-field');
    if (opts.label) {
      root.appendChild(el('span', 'ds-field__label', { text: opts.label }));
    }

    const control = el('div', 'ds-phone ' + sizeClass);
    control.setAttribute('role', 'group');
    if (opts.name) control.setAttribute('data-name', opts.name);

    const countryBtn = el('button', 'ds-phone__country', {
      type: 'button',
      'aria-haspopup': 'listbox',
      'aria-expanded': 'false',
      'aria-label': opts.countryAriaLabel || 'Select country',
    });
    const flagEl = el('span', 'ds-phone__flag', { text: flagEmoji(country.code) });
    flagEl.setAttribute('aria-hidden', 'true');
    const chevron = icon({ name: 'chevronDown', className: 'ds-phone__chevron' });
    countryBtn.appendChild(flagEl);
    countryBtn.appendChild(chevron);

    const divider = el('span', 'ds-phone__divider');
    divider.setAttribute('aria-hidden', 'true');

    const dialEl = el('span', 'ds-phone__dial', { text: country.dial });
    const input = el('input', 'ds-phone__input', {
      type: 'tel',
      inputmode: 'tel',
      placeholder: opts.placeholder || '123-321-1234',
      value: initial.national,
      name: opts.name || undefined,
      required: opts.required ? 'required' : undefined,
      'aria-label': opts.ariaLabel || opts.label || 'Phone number',
    });

    const body = el('div', 'ds-phone__body');
    body.appendChild(dialEl);
    body.appendChild(input);

    control.appendChild(countryBtn);
    control.appendChild(divider);
    control.appendChild(body);

    const dropdown = el('div', 'ds-phone__dropdown');
    dropdown.hidden = true;
    const searchWrap = el('div', 'ds-phone__search');
    searchWrap.appendChild(icon({ name: 'search', className: 'ds-phone__search-icon' }));
    const searchInput = el('input', 'ds-phone__search-input', {
      type: 'search',
      placeholder: opts.searchPlaceholder || 'Search',
      'aria-label': opts.searchPlaceholder || 'Search countries',
    });
    searchWrap.appendChild(searchInput);
    const list = el('ul', 'ds-phone__list', { role: 'listbox' });
    dropdown.appendChild(searchWrap);
    dropdown.appendChild(list);

    const wrap = el('div', 'ds-phone__wrap');
    wrap.appendChild(control);
    wrap.appendChild(dropdown);
    root.appendChild(wrap);
    appendFieldHelper(root, opts.helper);

    function syncClasses() {
      const focusEl = document.activeElement;
      const focused =
        !disabled &&
        (expanded || focusEl === input || focusEl === searchInput || focusEl === countryBtn);
      control.classList.toggle('is-error', error);
      control.classList.toggle('is-disabled', disabled);
      control.classList.toggle('is-expanded', expanded);
      control.classList.toggle('is-focused', focused);
      countryBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      const chevronImg = countryBtn.querySelector('img');
      if (chevronImg) {
        chevronImg.src = iconUrl(expanded ? 'chevronUp' : 'chevronDown');
      }
      input.disabled = disabled;
      countryBtn.disabled = disabled;
      searchInput.disabled = disabled;
    }

    function filteredCountries() {
      const q = query.trim().toLowerCase();
      if (!q) return countries;
      return countries.filter(function (c) {
        return (
          c.name.toLowerCase().indexOf(q) !== -1 ||
          c.dial.indexOf(q) !== -1 ||
          c.code.toLowerCase().indexOf(q) !== -1
        );
      });
    }

    function renderList() {
      list.innerHTML = '';
      filteredCountries().forEach(function (c) {
        const item = el('li', 'ds-phone__option', { role: 'option' });
        if (c.code === country.code) item.classList.add('is-selected');
        item.setAttribute('aria-selected', c.code === country.code ? 'true' : 'false');
        item.appendChild(el('span', 'ds-phone__option-flag', { text: flagEmoji(c.code) }));
        item.appendChild(
          el('span', 'ds-phone__option-label', { text: c.name + ' ' + c.dial })
        );
        item.addEventListener('mousedown', function (e) {
          e.preventDefault();
        });
        item.addEventListener('click', function () {
          country = c;
          dialEl.textContent = c.dial;
          flagEl.textContent = flagEmoji(c.code);
          closeDropdown();
          input.focus();
          if (opts.onCountryChange) opts.onCountryChange(c);
          if (opts.onChange) opts.onChange(getValue());
        });
        list.appendChild(item);
      });
    }

    function onDocPointer(e) {
      if (!expanded) return;
      if (wrap.contains(e.target)) return;
      closeDropdown();
    }

    function openDropdown() {
      if (disabled) return;
      expanded = true;
      query = '';
      searchInput.value = '';
      dropdown.hidden = false;
      renderList();
      syncClasses();
      setTimeout(function () {
        searchInput.focus();
      }, 0);
      document.addEventListener('mousedown', onDocPointer, true);
    }

    function closeDropdown() {
      if (!expanded) return;
      expanded = false;
      dropdown.hidden = true;
      syncClasses();
      document.removeEventListener('mousedown', onDocPointer, true);
    }

    function getNational() {
      return input.value.trim();
    }

    function getValue() {
      const national = getNational();
      if (!national) return '';
      return country.dial + ' ' + national;
    }

    countryBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (disabled) return;
      if (expanded) closeDropdown();
      else openDropdown();
    });

    searchInput.addEventListener('input', function () {
      query = searchInput.value;
      renderList();
    });

    input.addEventListener('focus', function () {
      syncClasses();
    });
    input.addEventListener('blur', function () {
      syncClasses();
    });
    input.addEventListener('input', function () {
      if (opts.onInput) opts.onInput(getValue());
      if (opts.onChange) opts.onChange(getValue());
    });

    control.addEventListener('mouseenter', function () {
      control.classList.add('is-hover');
    });
    control.addEventListener('mouseleave', function () {
      control.classList.remove('is-hover');
    });

    if (disabled) syncClasses();
    else syncClasses();

    return {
      root: root,
      input: input,
      getValue: getValue,
      getNational: getNational,
      getCountry: function () {
        return country;
      },
      setValue: function (v, code) {
        const parsed = parseInitial(v, code);
        country = parsed.country;
        dialEl.textContent = country.dial;
        flagEl.textContent = flagEmoji(country.code);
        input.value = parsed.national;
        if (expanded) renderList();
      },
      setCountry: function (code) {
        country = findCountry(code);
        dialEl.textContent = country.dial;
        flagEl.textContent = flagEmoji(country.code);
        if (expanded) renderList();
      },
      setError: function (on) {
        error = !!on;
        syncClasses();
      },
      setDisabled: function (on) {
        disabled = !!on;
        if (disabled) closeDropdown();
        syncClasses();
      },
      destroy: function () {
        document.removeEventListener('mousedown', onDocPointer, true);
      },
    };
  }

  const PHONE_COUNTRIES = Object.freeze([
    { code: 'US', name: 'United States', dial: '+1' },
    { code: 'CA', name: 'Canada', dial: '+1' },
    { code: 'IN', name: 'India', dial: '+91' },
    { code: 'JP', name: 'Japan', dial: '+81' },
    { code: 'TH', name: 'Thailand', dial: '+66' },
    { code: 'CN', name: 'China', dial: '+86' },
    { code: 'KR', name: 'South Korea', dial: '+82' },
    { code: 'VN', name: 'Vietnam', dial: '+84' },
    { code: 'ID', name: 'Indonesia', dial: '+62' },
    { code: 'MY', name: 'Malaysia', dial: '+60' },
    { code: 'SG', name: 'Singapore', dial: '+65' },
    { code: 'PH', name: 'Philippines', dial: '+63' },
    { code: 'AU', name: 'Australia', dial: '+61' },
    { code: 'GB', name: 'United Kingdom', dial: '+44' },
    { code: 'DE', name: 'Germany', dial: '+49' },
    { code: 'FR', name: 'France', dial: '+33' },
    { code: 'ES', name: 'Spain', dial: '+34' },
    { code: 'AE', name: 'United Arab Emirates', dial: '+971' },
    { code: 'AL', name: 'Albania', dial: '+355' },
    { code: 'AM', name: 'Armenia', dial: '+374' },
    { code: 'AO', name: 'Angola', dial: '+244' },
  ]);

  function checkbox(options) {
    const opts = options || {};
    const wrap = document.createElement('label');
    wrap.className = 'ds-checkbox' + (opts.disabled ? ' is-disabled' : '');
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = !!opts.checked;
    input.disabled = !!opts.disabled;
    input.indeterminate = !!opts.indeterminate;
    if (opts.ariaLabel) input.setAttribute('aria-label', opts.ariaLabel);
    input.addEventListener('change', function () {
      if (typeof opts.onChange === 'function') {
        opts.onChange(!!input.checked, input);
      }
    });
    wrap.appendChild(input);
    if (opts.label != null && opts.label !== '') {
      const text = document.createElement('span');
      text.className = 'ds-checkbox__label';
      text.textContent = opts.label;
      wrap.appendChild(text);
    }
    return {
      el: wrap,
      input: input,
      setChecked: function (v) {
        input.checked = !!v;
      },
      setIndeterminate: function (v) {
        input.indeterminate = !!v;
      },
      setDisabled: function (v) {
        input.disabled = !!v;
        wrap.classList.toggle('is-disabled', !!v);
      },
    };
  }

  return {
    button: button,
    spinner: spinner,
    pageLoader: pageLoader,
    icon: icon,
    tag: tag,
    navChip: navChip,
    navItem: navItem,
    tabs: tabs,
    searchField: searchField,
    textField: textField,
    textInput: textInput,
    textArea: textArea,
    phoneField: phoneField,
    selectField: selectField,
    searchSelect: searchSelect,
    multiSelect: multiSelect,
    radioGroup: radioGroup,
    deselectableRadio: deselectableRadio,
    filterDraft: filterDraft,
    filterChips: filterChips,
    checkbox: checkbox,
    menu: menu,
    splitButton: splitButton,
    modal: modal,
    MODAL_LAYOUT: MODAL_LAYOUT,
    drawer: drawer,
    toast: toast,
    timeline: timeline,
    regionSelect: regionSelect,
    dataTable: dataTable,
    resetColumnWidths: resetColumnWidths,
    getColumnWidth: getColumnWidth,
    bindOverlayScroll: bindOverlayScroll,
    platformAppBar: platformAppBar,
    platformUserMenu: platformUserMenu,
    platformNav: platformNav,
    platformWorkspace: platformWorkspace,
    platformShell: platformShell,
    underConstructionPanel: underConstructionPanel,
    iconUrl: iconUrl,
    PHONE_COUNTRIES: PHONE_COUNTRIES,
  };
})();
