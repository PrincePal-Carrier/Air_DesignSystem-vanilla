# Carrier Air mock-up starter (vanilla HTML/CSS/JS)

Internal **Carrier** prototype kit: Air design system, platform shell, and empty `features/` for product screens. Static files only, no build step.

**Template repo:** [github.com/PrincePal-Carrier/Air_DesignSystem-vanilla](https://github.com/PrincePal-Carrier/Air_DesignSystem-vanilla)

**Not production code.** For designers and PMs iterating with Cursor + optional Figma MCP.

Icons: [air-icon-library.vercel.app](https://air-icon-library.vercel.app/)

---

## Quick start (designers)

Template (maintainer updates shared components here):  
https://github.com/PrincePal-Carrier/Air_DesignSystem-vanilla

**You do not need GitHub or Terminal knowledge.** Create a folder, open Cursor, paste one prompt. Cursor copies the kit, configures the project, and starts the preview server for you.

### Steps

1. Create a **new empty folder** named after your product (example: `Carrier Fleet Portal Mock`).
2. **File → Open Folder** in Cursor and select that folder.
3. Copy the **entire** [Project setup prompt](#project-setup-prompt) below into Cursor Chat (change the product name on the last line). Send it and wait until Cursor says you are ready.
4. Paste your **PRD or product requirements** in chat and ask Cursor to build the screens.

That is the full workflow.

---

### Project setup prompt

Copy everything inside the box into Cursor Chat. Replace the product name on the last line.

```text
Set up a Carrier product mock in this empty workspace.

Template (copy the full vanilla starter from here):
https://github.com/PrincePal-Carrier/Air_DesignSystem-vanilla

Do all of the following yourself (run commands in the terminal; do not ask me to copy commands):

1. Copy the full starter into this folder: design system (components.js, components-date.js, css/, styles.css), shell (index.html, app.js, i18n.js), Assets/, gallery/, tests/, docs/, features/_example, features/shared, and all files under .cursor/rules/.

2. Git: initialize if needed. Add a remote named upstream pointing to the template URL above. Never push to the template repo.

3. Set platformProductName and platformDocumentTitle in i18n.js from my product name below. Add my product name to docs/PRODUCT-VOICE.md.

4. Read ARCHITECTURE.md and .cursor/rules/ so you are ready to build screens later (features/ only; never edit components.js or css/).

5. Start the local preview server on port 8010 (python3 -m http.server 8010) in the background and tell me when I can open http://localhost:8010/ in my browser.

My product name: YOUR PRODUCT NAME HERE
```

---

### After setup: build your product

Paste your PRD, user stories, or a Figma link. Example:

```text
Build the screens described below in this Air mock. Use DS.* under features/ only. Carrier branding.

[paste requirements]
```

Ask Cursor to preview or change screens anytime in chat. Shell: http://localhost:8010/ · Component gallery: http://localhost:8010/gallery/

---

## Update the shared design system later

When the maintainer adds components, paste in Cursor:

```text
Merge design-system updates from upstream https://github.com/PrincePal-Carrier/Air_DesignSystem-vanilla into this project. Do not change features/. Summarize new DS.* APIs from CHANGELOG.md.
```

Missing a reusable component? Ask the maintainer ([CONTRIBUTING.md](CONTRIBUTING.md)) or use Figma MCP for a one-off in `features/`. Details: [docs/UPSTREAM.md](docs/UPSTREAM.md).

---

## Maintainer: sync from `05_Platform`

Manually copy when Platform DS changes:

| Target | Source (05_Platform) |
|--------|----------------------|
| `css/` | `css/` |
| `styles.css` | `styles.css` |
| `components.js` | `components.js` |
| `components-date.js` | `components-date.js` |

Then update `CHANGELOG.md`, commit, and tag a release on [Air_DesignSystem-vanilla](https://github.com/PrincePal-Carrier/Air_DesignSystem-vanilla).

---

## Tests

```bash
node tests/run.js
```

---

## Docs map

| File | Audience |
|------|----------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Cursor agents (SSOT) |
| [docs/UPSTREAM.md](docs/UPSTREAM.md) | Git upstream merges |
| [docs/PRODUCT-VOICE.md](docs/PRODUCT-VOICE.md) | Your product glossary |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Maintainer vs designer roles |
| [PROGRESS.md](PROGRESS.md) | Your mock changelog |
