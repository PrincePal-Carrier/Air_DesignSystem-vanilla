/**
 * Carrier product mock-up shell (config-driven nav + feature mount).
 * Product screens live in features/*; do not reimplement shell chrome there.
 */
(function () {
  'use strict';

  const NAV_COLLAPSED_KEY = 'air_mock_nav_collapsed';
  const LOAD_DELAY_MS = 250;
  const DEFAULT_ROUTE = 'example-screen';

  /** @type {Record<string, function(HTMLElement, object): void>} */
  const FEATURE_MOUNTERS = {
    'example-screen': function (root, ctx) {
      if (typeof ExampleFeature !== 'undefined' && ExampleFeature.mount) {
        ExampleFeature.mount(root, ctx);
        return;
      }
      root.appendChild(DS.underConstructionPanel({
        title: I18n.t('underConstructionTitle'),
        subtitle: I18n.t('navExample'),
        body: I18n.t('underConstructionBody'),
        goBackLabel: I18n.t('underConstructionGoBack'),
        onGoBack: ctx.onGoBack,
      }));
    },
    'settings': function (root, ctx) {
      root.appendChild(DS.underConstructionPanel({
        title: I18n.t('underConstructionTitle'),
        subtitle: I18n.t('navSettings'),
        body: I18n.t('underConstructionBody'),
        goBackLabel: I18n.t('underConstructionGoBack'),
        onGoBack: ctx.onGoBack,
      }));
    },
  };

  function navGroups() {
    return [
      {
        id: 'main',
        label: I18n.t('navOverview'),
        icon: 'dashboard',
        children: [
          { id: 'example-screen', label: I18n.t('navExample'), icon: 'pageTemplate' },
          { id: 'settings', label: I18n.t('navSettings'), icon: 'settings' },
        ],
      },
    ];
  }

  let shellApi = null;
  let previousRoute = null;
  let currentRoute = null;
  let routeMetaById = {};

  function indexRoutes(groups) {
    const map = {};
    groups.forEach(function (group) {
      if (group.children && group.children.length) {
        group.children.forEach(function (child) {
          map[child.id] = child;
        });
      } else {
        map[group.id] = group;
      }
    });
    return map;
  }

  function clearWorkspace(workspace) {
    while (workspace.firstChild) workspace.removeChild(workspace.firstChild);
  }

  function mountContext(onGoBack) {
    return { onGoBack: onGoBack, navigate: navigateTo };
  }

  function mountRoute(workspace, item) {
    clearWorkspace(workspace);
    const mount = FEATURE_MOUNTERS[item.id];
    if (mount) {
      mount(workspace, mountContext(function () {
        goBack(workspace);
      }));
      return;
    }
    workspace.appendChild(DS.underConstructionPanel({
      title: I18n.t('underConstructionTitle'),
      subtitle: item.label,
      body: I18n.t('underConstructionBody'),
      goBackLabel: I18n.t('underConstructionGoBack'),
      onGoBack: function () {
        goBack(workspace);
      },
    }));
  }

  function showHome(workspace) {
    currentRoute = null;
    if (workspace.dataset.route) delete workspace.dataset.route;
    clearWorkspace(workspace);
    if (shellApi && shellApi.nav) shellApi.nav.setActive(null);
    workspace.focus();
  }

  function goBack(workspace) {
    const targetId = previousRoute && routeMetaById[previousRoute] ? previousRoute : null;
    previousRoute = null;
    if (!targetId) {
      showHome(workspace);
      return;
    }
    const item = routeMetaById[targetId];
    currentRoute = targetId;
    workspace.dataset.route = targetId;
    if (shellApi && shellApi.nav) shellApi.nav.setActive(targetId);
    workspace.focus();
    if (item) mountRoute(workspace, item);
  }

  function handleSelect(item) {
    const workspace = document.getElementById('platform-workspace');
    if (!workspace) return;
    if (item.externalUrl) {
      window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    previousRoute = currentRoute;
    currentRoute = item.id;
    workspace.dataset.route = item.id;
    workspace.focus();
    mountRoute(workspace, item);
  }

  function navigateTo(routeId) {
    const item = routeMetaById[routeId];
    if (!item || item.externalUrl) return false;
    if (shellApi && shellApi.nav) shellApi.nav.setActive(routeId);
    handleSelect(item);
    return true;
  }

  window.MockNavigate = navigateTo;

  function buildShell(resumeRoute) {
    const groups = navGroups();
    routeMetaById = indexRoutes(groups);
    previousRoute = null;
    const resumeId =
      resumeRoute && routeMetaById[resumeRoute] && !routeMetaById[resumeRoute].externalUrl
        ? resumeRoute
        : DEFAULT_ROUTE;
    currentRoute = resumeId;

    const navCollapsed = localStorage.getItem(NAV_COLLAPSED_KEY) === 'true';
    const demoUser = {
      displayName: 'Demo User',
      initials: 'DU',
      email: 'designer@carrier.com',
    };

    return DS.platformShell({
      navCollapsed: navCollapsed,
      collapseNavLabel: I18n.t('platformCollapseNav'),
      expandNavLabel: I18n.t('platformExpandNav'),
      onNavCollapse: function (collapsed) {
        localStorage.setItem(NAV_COLLAPSED_KEY, collapsed ? 'true' : 'false');
      },
      appBar: {
        carrierAlt: I18n.t('platformCarrierLogo'),
        productName: I18n.t('platformProductName'),
        initials: demoUser.initials,
        avatarLabel: I18n.t('platformSignedInAs') + ' ' + demoUser.email,
        displayName: demoUser.displayName,
        email: demoUser.email,
        preferencesLabel: I18n.t('platformPreferences'),
        signOutLabel: I18n.t('platformSignOut'),
        privacyLabel: I18n.t('privacy'),
        termsLabel: I18n.t('terms'),
        onPreferences: function () {
          console.log('[mock] Preferences (prototype)');
        },
        onSignOut: function () {
          console.log('[mock] Sign out (prototype)');
        },
      },
      nav: {
        ariaLabel: I18n.t('platformNavigation'),
        items: groups,
        faqLabel: I18n.t('platformFaq'),
        settingsLabel: I18n.t('platformSettings'),
        carrierAlt: I18n.t('platformCarrierLogo'),
        activeId: resumeId,
        defaultOpenGroups: ['main'],
        onSettings: function () {
          navigateTo('settings');
        },
        onFaq: function () {
          console.log('[mock] FAQ (prototype)');
        },
        onSelect: handleSelect,
      },
      workspace: {
        ariaLabel: I18n.t('platformWorkspace'),
        route: resumeId,
      },
    });
  }

  function revealPlatform(root, loader) {
    shellApi = buildShell(DEFAULT_ROUTE);
    root.appendChild(shellApi.root);
    root.hidden = false;
    if (loader) loader.remove();
    document.body.classList.remove('is-platform-loading');

    const workspace = document.getElementById('platform-workspace');
    const item = routeMetaById[DEFAULT_ROUTE];
    if (workspace && item) mountRoute(workspace, item);
  }

  function init() {
    I18n.loadSavedLocale();
    document.title = I18n.t('platformDocumentTitle');
    document.body.classList.add('is-platform-loading');

    const root = document.getElementById('platform-root');
    let loader = document.getElementById('platform-loader');

    if (!loader) {
      loader = DS.pageLoader({
        id: 'platform-loader',
        label: I18n.t('loading'),
      });
      document.body.insertBefore(loader, root);
    }

    root.hidden = true;
    setTimeout(function () {
      revealPlatform(root, loader);
    }, LOAD_DELAY_MS);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
