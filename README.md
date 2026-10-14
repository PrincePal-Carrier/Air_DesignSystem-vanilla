# Carrier Air mock-up starter (vanilla HTML/CSS/JS)

Internal **Carrier** prototype kit: Air design system, platform shell, and empty `features/` for product screens. Static files only, no build step.

**Template repo:** [github.com/PrincePal-Carrier/Air_DesignSystem-vanilla](https://github.com/PrincePal-Carrier/Air_DesignSystem-vanilla)

**Not production code.** For designers and PMs iterating with Cursor + optional Figma MCP.

Icons: [air-icon-library.vercel.app](https://air-icon-library.vercel.app/)

---

## Quick start (designers)

### 1. Copy the template to your machine

```bash
git clone https://github.com/PrincePal-Carrier/Air_DesignSystem-vanilla.git
```

### 2. Rename the folder to your product (optional but recommended)

```bash
mv Air_DesignSystem-vanilla my-carrier-product-mock
cd my-carrier-product-mock
```

The app does not depend on the folder name. Renaming helps you tell mocks apart on disk.

### 3. Point Git at **your** product repo (do not push PRDs to the template)

Create an empty private repo on GitHub for your mock, then:

```bash
git remote rename origin upstream
git remote add origin git@github.com:YOUR_ORG/your-product-mock.git
git push -u origin main
```

You keep `upstream` on this template to pull new `DS.*` components later. See [docs/UPSTREAM.md](docs/UPSTREAM.md).

### 4. Set your product name

Edit [i18n.js](i18n.js): `platformProductName`, `platformDocumentTitle`.

Fill [docs/PRODUCT-VOICE.md](docs/PRODUCT-VOICE.md) for your product terms.

### 5. Open **this folder** in Cursor

Use **File → Open Folder** and choose the renamed folder (e.g. `my-carrier-product-mock`).

Open the **kit folder only**, not the parent `VRF` directory. Otherwise Git may show every file with a blue **U** (untracked) because a different repo is active.

In Source Control, confirm the repository root is your mock folder and that files are committed (not all **U**). Reload the window if needed.

### 6. Run the mock locally

```bash
python3 -m http.server 8010
```

- Shell: [http://localhost:8010/](http://localhost:8010/)
- Component gallery: [http://localhost:8010/gallery/](http://localhost:8010/gallery/)

### 7. First prompt in Cursor (send once per project)

Paste this before your PRD:

```text
This is a Carrier HTML/CSS/JS product mock using the Air design system.

Before writing code:
1. Read ARCHITECTURE.md completely.
2. Read every rule in .cursor/rules/ (especially ds-boundaries.mdc).
3. Never edit DS-owned files: css/, components.js, components-date.js, styles.css, gallery/.
4. Build screens only under features/ using DS.* APIs. Do not rebuild the app bar or side nav.

Reply with a short confirmation that you understand the boundaries, then wait for my requirements.
```

### 8. Prompt with your requirement or PRD

Example follow-up:

```text
Build the user list screen described below in features/users/. Use DS.dataTable, DS.modal, and DS.tag where appropriate. Carrier branding. Match docs/PRODUCT-VOICE.md.

[paste PRD or Figma link]
```

---

## Add screens

1. Copy [features/_example/](features/_example/) to `features/<your-screen>/`.
2. Register the route in [app.js](app.js) (`FEATURE_MOUNTERS` + `navGroups()`).
3. Implement `mount(root, ctx)` using `DS.*` only. Shell chrome stays in `app.js`.

---

## Update the shared DS library

When the maintainer ships new components:

```bash
git fetch upstream
git merge upstream/main
```

Read [CHANGELOG.md](CHANGELOG.md). Details: [docs/UPSTREAM.md](docs/UPSTREAM.md).

Missing reusable component? See [CONTRIBUTING.md](CONTRIBUTING.md). One-off: Figma MCP under `features/`.

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

---

## Why do I see blue **U** on every file?

In Cursor/VS Code, **U** means **Untracked** in Git (not committed in the repo Git is using).

Common causes:

1. **Wrong Git root** – You opened the parent `VRF` folder (or a parent that has its own `.git` with no commits). Open only this kit folder so Git uses `Air_DesignSystem-vanilla/.git` (or your renamed copy).
2. **Fresh clone before first commit** – After clone, files should show as tracked on `main`. If not, run `git status` in the terminal inside your mock folder.
3. **Stale UI** – Run **Developer: Reload Window** after cloning.

If `git status` inside your mock folder says `nothing to commit, working tree clean`, you can ignore stale **U** badges or reload the editor.
