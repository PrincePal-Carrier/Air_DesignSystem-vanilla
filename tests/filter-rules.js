/* Filter panel rules (decided 2026-10-08): edits are a draft until Apply, the list keeps
   showing the applied set while the panel is open, and region chips are one per country.
   DS.filterDraft is pulled out of components.js on its own; the panel DOM is checked in
   the browser. */
const fs = require('fs'), vm = require('vm');
const BASE = require('path').join(__dirname, '..') + '/';
const src = fs.readFileSync(BASE + 'components.js', 'utf8');

function grab(name) {
  const m = src.indexOf('function ' + name + '(');
  if (m < 0) throw new Error('not found: ' + name);
  let i = src.indexOf('{', m), d = 0;
  for (let j = i; j < src.length; j++) {
    if (src[j] === '{') d++;
    else if (src[j] === '}') { d--; if (!d) return src.slice(m, j + 1); }
  }
}

const ctx = { console };
vm.createContext(ctx);
vm.runInContext(grab('cloneFilterValue') + '\n' + grab('filterDraft') + '\nthis.filterDraft = filterDraft;', ctx);
vm.runInContext(fs.readFileSync(BASE + 'tests/fixtures/regions.js', 'utf8') + '\nthis.AMRegions = AMRegions;', ctx);
const filterDraft = ctx.filterDraft;
const R = ctx.AMRegions;

let failed = 0;
function check(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) failed++;
  console.log((ok ? '  ok   ' : '  FAIL ') + name + (ok ? '' : '  got ' + JSON.stringify(got) + ' want ' + JSON.stringify(want)));
}

function newState() {
  return { brands: new Set(['Carrier']), region: { all: false, countries: [], states: { IN: ['IN-PB'] } }, online: '' };
}
const KEYS = ['brands', 'region', 'online'];
const brandsOf = s => Array.from(s.brands).sort();

// Discard: closing without Apply puts the applied values back
{
  const state = newState();
  const d = filterDraft(state, KEYS);
  d.begin();
  state.brands.add('Toshiba');
  state.online = 'offline';
  state.region.states.IN.push('IN-DL');
  d.discard();
  check('discard restores multi-select', brandsOf(state), ['Carrier']);
  check('discard restores single-select', state.online, '');
  check('discard restores nested region', state.region.states.IN, ['IN-PB']);
  check('discard leaves the draft closed', d.isOpen(), false);
}

// Commit: Apply keeps the edits
{
  const state = newState();
  const d = filterDraft(state, KEYS);
  d.begin();
  state.brands.add('Toshiba');
  d.commit();
  d.discard();
  check('commit keeps edits, later discard is a no-op', brandsOf(state), ['Carrier', 'Toshiba']);
}

// Wrap: list, badge, and chips read the applied set while the panel is open
{
  const state = newState();
  const d = filterDraft(state, KEYS);
  const count = d.wrap(function () { return state.brands.size; });
  d.begin();
  state.brands.add('Toshiba');
  check('wrapped reader sees applied values while open', count(), 1);
  check('draft is back after the wrapped call', brandsOf(state), ['Carrier', 'Toshiba']);
  d.commit();
  check('wrapped reader sees live values once closed', count(), 2);
}

// Wrap keeps object identity: open panel controls hold references to the draft
{
  const state = newState();
  const d = filterDraft(state, KEYS);
  const read = d.wrap(function () { return state.region.states.IN.length; });
  d.begin();
  const panelRef = state.region; // what the region panel captured at build time
  read();
  check('draft object identity survives a wrapped call', state.region === panelRef, true);
  panelRef.states.IN.push('IN-DL');
  check('panel edits after a re-render still reach state', state.region.states.IN, ['IN-PB', 'IN-DL']);
  check('applied snapshot is not touched by panel edits', read(), 1);
}

// Region chips: one per country, whole country by name, states in brackets
{
  const filter = { all: false, countries: ['JP'], states: { IN: ['IN-PB', 'IN-DL'], JP: ['x'] } };
  check('one chip per country', R.regionFilterChips(filter).map(c => c.label), ['India (Punjab, Delhi NCR)', 'Japan']);
  check('empty filter has no chips', R.regionFilterChips(R.emptyRegion()), []);
  const without = R.withoutCountry(filter, 'IN');
  check('withoutCountry drops that country only', without, { all: false, countries: ['JP'], states: { JP: ['x'] } });
  check('withoutCountry does not mutate the input', filter.states.IN, ['IN-PB', 'IN-DL']);
  check('whole country matches any of its properties', R.matchesPropertyRegionFilter({ countryCode: 'JP', state: 'Anything new' }, { countries: ['JP'], states: {} }), true);
}

if (failed) {
  console.log('\n' + failed + ' FAILED');
  process.exit(1);
}
console.log('\nall filter-rules checks pass');
