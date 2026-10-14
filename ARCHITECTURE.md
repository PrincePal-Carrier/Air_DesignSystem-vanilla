# Carrier Air mock-up architecture (agent source of truth)

Agents: read this file before structural or feature work. Humans: see [README.md](README.md). Product history: [PROGRESS.md](PROGRESS.md). DS releases: [CHANGELOG.md](CHANGELOG.md).

---

## How this repo works

Three layers:

| Layer | Files | Responsibility |
|-------|--------|----------------|
| **Design system** | `components.js`, `components-date.js`, `css/`, `styles.css` | Reusable Air UI (`DS.*`) |
| **Shell** | `index.html`, `app.js`, `i18n.js` | Carrier app bar, nav, workspace mount |
| **Product mock** | `features/<name>/` | Screens, flows, mock data for one Carrier product |

Shell chrome (app bar, side nav) is owned by `DS.platformShell` + `app.js`. Features must **not** reimplement the shell.

---

## Template boundaries

**DS-owned (do not edit in product repos):** `css/**`, `components.js`, `components-date.js`, `styles.css`, `gallery/**`, `CHANGELOG.md`.

**Product-owned:** `features/**`, `docs/PRODUCT-VOICE.md`, `app.js` (nav + mount map), `i18n.js`, `PROGRESS.md`.

Extend via `features/shared/` wrappers. Request new shared APIs from the template maintainer, then merge `upstream` ([docs/UPSTREAM.md](docs/UPSTREAM.md)).

Do not add non-Cursor agent desktop config to this repo.

---

## Living file structure

```text
Air_DesignSystem-vanilla/
├── ARCHITECTURE.md      # This file
├── app.js               # Nav config + FEATURE_MOUNTERS
├── components.js        # DS (IIFE → global DS)
├── components-date.js   # Extends DS (load after components.js)
├── i18n.js              # Product strings
├── index.html           # Shell entry
├── styles.css           # @import css/*
├── css/                 # tokens, components, date-picker, layout
├── features/            # Product screens
├── gallery/             # Component showcase
└── tests/               # Node DS suites
```

**Script order in `index.html`:** `i18n.js` → `components.js` → `components-date.js` → feature scripts → `app.js`.

---

## `DS` catalog (components.js)

| Area | API |
|------|-----|
| Actions | `button`, `splitButton`, `menu`, `checkbox`, `spinner`, `pageLoader` |
| Display | `icon`, `tag`, `tabs`, `timeline`, `toast` |
| Forms | `textField`, `textInput`, `textArea`, `phoneField`, `selectField`, `searchSelect`, `multiSelect`, `radioGroup`, `deselectableRadio`, `searchField`, `regionSelect` |
| Filters | `filterDraft`, `filterChips` |
| Overlays | `modal`, `drawer`, `MODAL_LAYOUT`, `bindOverlayScroll` |
| Data | `dataTable`, `resetColumnWidths`, `getColumnWidth` |
| Shell | `platformAppBar`, `platformNav`, `platformWorkspace`, `platformShell`, `platformUserMenu`, `underConstructionPanel` |

**Date suite** (`components-date.js`, after `components.js`): `DS.dateUtils`, `calendar`, `datePicker`, `monthCalendar`, `monthPicker`, `dateRangeFilter`.

Icons resolve through `DS.icon` / `AIR_ICON_URLS` (Air Icon Library CDN).

---

## Feature module contract

```js
// features/my-screen/index.js
var MyScreen = (function () {
  'use strict';
  function mount(root, ctx) {
    root.innerHTML = '';
    // Build with DS.* only. ctx.navigate(routeId), ctx.onGoBack().
  }
  return { mount: mount };
})();
```

Register in `app.js`:

- Add nav item under `navGroups()`.
- Add `FEATURE_MOUNTERS['route-id'] = function (root, ctx) { MyScreen.mount(root, ctx); }`.
- Load script in `index.html` before `app.js`.

---

## Air Modal dividers

`DS.modal({ dividers })` defaults to **off**.

| Modal type | Dividers |
|------------|----------|
| Short confirm / alert | Off |
| Simple form | Off |
| Scrollable or dense body | `dividers: true` |

See `.cursor/rules/modal-dividers.mdc`.

---

## Air Modal CTAs

Footer order: **dismiss (`outline`) · tertiary (optional) · commit (`primary`)**. Form commits start disabled until valid; sync via `modalApi.setActions`. See `.cursor/rules/modal-ctas.mdc`.

---

## Scrollbars

Native scrollbars hidden globally. Use `DS.bindOverlayScroll` on long panels/tables. See `.cursor/rules/scrollbars.mdc`.

---

## Toasts vs inline errors

| Situation | Shape |
|-----------|--------|
| Fix in visible field | Inline error on that field |
| Success | Close overlay first, then `DS.toast({ variant: 'success' })` |
| Failure with no field target | `DS.toast({ variant: 'error' })` |
| Needs a decision | Modal |

---

## Product voice

Follow `.cursor/rules/product-voice.mdc` and [docs/PRODUCT-VOICE.md](docs/PRODUCT-VOICE.md) for this mock. Categorical cells use `DS.tag` (color + text).

---

## Figma MCP (Cursor)

When implementing from Figma: map to existing `--ds-*` tokens and `DS.*` before inventing new CSS. Prefer promoting repeated patterns to the maintainer for upstream `DS` APIs.

---

## Tests

`node tests/run.js` runs DS-focused suites (toast, date-picker, filter-rules). No browser required.
