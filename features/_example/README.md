# Example feature

1. Copy this folder to `features/<your-screen>/`.
2. Rename the global (e.g. `ExampleFeature` → `UsersFeature`).
3. Register the route in `app.js` (`FEATURE_MOUNTERS` + nav group).
4. Implement `mount(root, ctx)` using `DS.*` only. Do not rebuild app bar or side nav.
