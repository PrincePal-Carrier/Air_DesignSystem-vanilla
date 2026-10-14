/**
 * Example in-shell feature. Duplicate this folder for new screens.
 */
var ExampleFeature = (function () {
  'use strict';

  function mount(root, ctx) {
    root.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'mock-feature-page';

    const title = document.createElement('h1');
    title.className = 'mock-feature-page__title';
    title.textContent = I18n.t('examplePageTitle');
    page.appendChild(title);

    const body = document.createElement('p');
    body.className = 'mock-feature-page__body';
    body.textContent = I18n.t('examplePageBody');
    page.appendChild(body);

    page.appendChild(DS.button({
      text: 'Primary action',
      variant: 'contained',
      color: 'primary',
      onClick: function () {
        DS.toast({ message: 'Prototype action.', variant: 'success' });
      },
    }));

    root.appendChild(page);
  }

  return { mount: mount };
})();
