// Runs DS-focused suites in tests/ (plain Node, no build step).
//
//   node tests/run.js            all suites
//   node tests/run.js toast      filter by substring
const path = require('path');
const { spawnSync } = require('child_process');

const SUITES = [
  ['toast', 'toast structure, variant contract, stacking, dismissal'],
  ['date-picker', 'ISO dates, YYYY-MM months, named range presets, month grids'],
  ['filter-rules', 'filter draft until Apply, applied-set reads while open, region chips'],
];

const filter = process.argv[2];
const suites = filter ? SUITES.filter(function (s) { return s[0].includes(filter); }) : SUITES;
if (!suites.length) {
  console.log('no suite matches "' + filter + '"');
  process.exit(1);
}

const failed = [];
suites.forEach(function (entry) {
  const name = entry[0];
  const covers = entry[1];
  console.log('\n--- ' + name + '   ' + covers + '\n');
  const run = spawnSync(process.execPath, [path.join(__dirname, name + '.js')], { stdio: 'inherit' });
  if (run.status !== 0) failed.push(name);
});

console.log('\n' + '='.repeat(72));
if (failed.length) {
  console.log(failed.length + ' of ' + suites.length + ' suites FAILING: ' + failed.join(', '));
  process.exit(1);
}
console.log('all ' + suites.length + ' suites green');
