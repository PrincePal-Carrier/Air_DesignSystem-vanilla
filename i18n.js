/**
 * Minimal i18n for Carrier product mock-ups (extend per product).
 */
const I18n = (function () {
  'use strict';

  const STRINGS = {
    loading: 'Loading',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    platformDocumentTitle: 'Carrier product mock-up',
    platformCarrierLogo: 'Carrier',
    platformProductName: 'Your product name',
    platformSignedInAs: 'Signed in as',
    platformNavigation: 'Main navigation',
    platformFaq: 'FAQ',
    platformSettings: 'Settings',
    platformCollapseNav: 'Collapse navigation',
    platformExpandNav: 'Expand navigation',
    platformWorkspace: 'Workspace',
    platformPreferences: 'Preferences',
    platformSignOut: 'Sign out',
    underConstructionTitle: 'Under Construction',
    underConstructionBody: 'This screen is not built yet. Add a feature module under features/.',
    underConstructionGoBack: 'Go back',
    navOverview: 'Overview',
    navSettings: 'Settings',
    navExample: 'Example screen',
    examplePageTitle: 'Example feature',
    examplePageBody: 'Duplicate features/_example to start a new screen.',
    amCancel: 'Cancel',
    amClose: 'Close',
  };

  function t(key) {
    return STRINGS[key] != null ? STRINGS[key] : key;
  }

  function loadSavedLocale() {
    /* Single-locale mock; extend if needed. */
  }

  return {
    t: t,
    loadSavedLocale: loadSavedLocale,
  };
})();
