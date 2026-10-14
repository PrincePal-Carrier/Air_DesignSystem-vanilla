# Carrier Air mock-up starter (vanilla HTML/CSS/JS)

Internal **Carrier** prototype kit: Air design system, platform shell, and empty `features/` for product screens. Static files only, no build step.

**Not production code.** For designers and PMs iterating with Cursor + optional Figma MCP.

Icons: [air-icon-library.vercel.app](https://air-icon-library.vercel.app/)

---

## Start a new product mock

1. Clone this template from GitHub.
2. Create **your own** private repo and point `origin` at it (do not push product work to the template).
3. One time: `git remote add upstream <template-repo-url>` (see [docs/UPSTREAM.md](docs/UPSTREAM.md)).
4. Set product name in [i18n.js](i18n.js) (`platformProductName`, `platformDocumentTitle`).
5. Fill [docs/PRODUCT-VOICE.md](docs/PRODUCT-VOICE.md).
6. Run locally:

```bash
cd Air_DesignSystem-vanilla
python3 -m http.server 8010
```

Open [http://localhost:8010/](http://localhost:8010/) for the shell, or [http://localhost:8010/gallery/](http://localhost:8010/gallery/) for components.

## Add screens

1. Copy [features/_example/](features/_example/) to `features/<your-screen>/`.
2. Register the route in [app.js](app.js) (`FEATURE_MOUNTERS` + `navGroups()`).
3. Implement `mount(root, ctx)` using `DS.*` only. Shell chrome stays in `app.js`.

## Prompting in Cursor

Example:

> Read ARCHITECTURE.md and `.cursor/rules`. Build the screen described below in `features/orders/` using DS only. Carrier branding. Do not edit `components.js` or `css/`.

Attach PRD sections or Figma links as needed.

## Update the shared DS library

When the maintainer ships new components:

```bash
git fetch upstream
git merge upstream/main
```

Read [CHANGELOG.md](CHANGELOG.md). Details: [docs/UPSTREAM.md](docs/UPSTREAM.md).

Missing reusable component? See [CONTRIBUTING.md](CONTRIBUTING.md). One-off: Figma MCP under `features/`.

## Maintainer: sync from `05_Platform`

Manually copy when Platform DS changes:

| Target | Source (05_Platform) |
|--------|----------------------|
| `css/` | `css/` |
| `styles.css` | `styles.css` |
| `components.js` | `components.js` |
| `components-date.js` | `components-date.js` |

Then update `CHANGELOG.md`, commit, and tag a release.

## Tests

```bash
node tests/run.js
```

## Docs map

| File | Audience |
|------|----------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Cursor agents (SSOT) |
| [docs/UPSTREAM.md](docs/UPSTREAM.md) | Git upstream merges |
| [docs/PRODUCT-VOICE.md](docs/PRODUCT-VOICE.md) | Your product glossary |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Maintainer vs designer roles |
| [PROGRESS.md](PROGRESS.md) | Your mock changelog |
