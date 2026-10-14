# Contributing

## Template repo (this repository on GitHub)

**Maintainer only.** Branch protection should allow merges from the template owner only.

- DS changes: `css/`, `components.js`, `components-date.js`, `gallery/`, `CHANGELOG.md`
- Do not accept PRs that modify DS-owned paths from product teams

## Requesting a new shared component

Designers working in **their own** repos:

1. Check [gallery/index.html](gallery/index.html) and `DS.*` in [ARCHITECTURE.md](ARCHITECTURE.md).
2. For a one-off screen, use Figma MCP and build under `features/` with existing tokens.
3. For a **reusable** Air component, contact the maintainer with:
   - Figma link (file + node)
   - Expected `DS.method` name or behavior
   - Which Carrier products will use it

Maintainer adds it here, updates `CHANGELOG.md`, tags a release, teams merge `upstream`.

## Product repos

Each designer commits only to their own repository. Never push product features to the template repo.
