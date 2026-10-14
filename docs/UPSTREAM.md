# Updating from the template (upstream)

Use this when the maintainer adds components to the **canonical template repo**. Your product work in `features/` should stay intact if you never edited DS-owned files.

## One-time setup

After cloning the template into **your own** GitHub repo:

```bash
git remote add upstream https://github.com/PrincePal-Carrier/Air_DesignSystem-vanilla.git
git remote -v
```

- `origin` → your product mock repo  
- `upstream` → template (maintainer only)

## Pull DS updates

```bash
git fetch upstream
git merge upstream/main
```

Or merge a tagged release:

```bash
git fetch upstream tag v2026.04.1
git merge v2026.04.1
```

Read [CHANGELOG.md](../CHANGELOG.md) for new `DS.*` APIs.

## If Git reports conflicts

Almost always someone edited a **DS-owned** file locally. Prefer:

```bash
git checkout --theirs -- components.js components-date.js styles.css css/
# or restore from upstream for the specific conflicted file
git merge --continue
```

Do not keep local edits to `components.js` or `css/`; ask the maintainer to add the API upstream.

## DS-owned vs product-owned

See [ARCHITECTURE.md](../ARCHITECTURE.md#template-boundaries) and `.cursor/rules/ds-boundaries.mdc`.

## Optional: submodule layout

Advanced teams may vendor the template as `air-ds/` submodule. Update with:

```bash
git submodule update --remote air-ds
```

Default onboarding uses a **flat repo + upstream merge** (simpler).
