/* DS.dateUtils is pure date math, so this loads components-date.js against a bare DS stub
   and checks parsing, formatting, month grids, and range rules. The calendar and field
   are DOM and are checked in the browser via gallery or manual QA. */
const fs = require('fs'), vm = require('vm');
const BASE = require('path').join(__dirname, '..') + '/';

const ctx = { console, DS: {} };
ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(BASE + 'components-date.js', 'utf8'), ctx);
const U = ctx.DS.dateUtils;

let failed = 0;
function check(name, got, want) {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) failed++;
  console.log((ok ? '  ok   ' : '  FAIL ') + name + (ok ? '' : '  got ' + JSON.stringify(got) + ' want ' + JSON.stringify(want)));
}

// ISO round trip and rejection of impossible days
check('iso round trip', U.toIso(U.parseIso('2024-12-05')), '2024-12-05');
check('iso leap day', U.toIso(U.parseIso('2024-02-29')), '2024-02-29');
check('iso non-leap Feb 29 rejected', U.parseIso('2023-02-29'), null);
check('iso month 13 rejected', U.parseIso('2024-13-01'), null);
check('iso garbage rejected', U.parseIso('12/05/2024'), null);
check('iso empty rejected', U.parseIso(''), null);
check('iso year < 100 kept literal', U.toIso(U.parseIso('0050-01-01')), '0050-01-01');

// MM/DD/YYYY display format
check('display format pads', U.formatDisplay(U.parseIso('2024-03-07')), '03/07/2024');
check('display parse', U.toIso(U.parseDisplay('12/05/2023')), '2023-12-05');
check('display parse single digits', U.toIso(U.parseDisplay('3/7/2024')), '2024-03-07');
check('display parse dash and dot', [U.toIso(U.parseDisplay('3-7-2024')), U.toIso(U.parseDisplay('3.7.2024'))], ['2024-03-07', '2024-03-07']);
check('display Feb 30 rejected', U.parseDisplay('02/30/2024'), null);
check('display 2-digit year rejected', U.parseDisplay('02/03/24'), null);
check('display bare MMDDYYYY (numeric keypad)', U.toIso(U.parseDisplay('12052023')), '2023-12-05');
check('display bare digits still validated', U.parseDisplay('02302024'), null);
check('display 7 digits rejected', U.parseDisplay('1252023'), null);

// Month arithmetic clamps the day
check('Jan 31 + 1 month -> Feb 29 (leap)', U.toIso(U.addMonths(U.parseIso('2024-01-31'), 1)), '2024-02-29');
check('Mar 31 - 1 month -> Feb 28', U.toIso(U.addMonths(U.parseIso('2023-03-31'), -1)), '2023-02-28');
check('Dec + 1 month rolls the year', U.toIso(U.addMonths(U.parseIso('2024-12-15'), 1)), '2025-01-15');
check('addDays across month end', U.toIso(U.addDays(U.parseIso('2024-06-30'), 1)), '2024-07-01');

// Month matrix: Sunday first, empty cells outside the month (Figma hides them)
const dec2024 = U.monthMatrix(2024, 11);
check('Dec 2024 has 5 weeks', dec2024.length, 5);
check('Dec 2024 starts Sunday', dec2024[0].map(d => d && d.getDate()).slice(0, 2), [1, 2]);
const jun2024 = U.monthMatrix(2024, 5);
check('Jun 2024: six leading blanks then the 1st', jun2024[0].map(d => d && d.getDate()), [null, null, null, null, null, null, 1]);
check('Jun 2024 has 6 weeks', jun2024.length, 6);
check('every week has 7 cells', jun2024.every(w => w.length === 7), true);
check('Feb 2026 fits exactly 4 weeks', U.monthMatrix(2026, 1).length, 4);

// Range rules (inclusive both ends)
const d = U.parseIso('2024-06-15');
check('inside range', U.isOutOfRange(d, '2024-06-01', '2024-06-30'), false);
check('equal to min is inside', U.isOutOfRange(d, '2024-06-15', ''), false);
check('equal to max is inside', U.isOutOfRange(d, '', '2024-06-15'), false);
check('before min', U.isOutOfRange(d, '2024-06-16', ''), true);
check('after max', U.isOutOfRange(d, '', '2024-06-14'), true);
check('no bounds', U.isOutOfRange(d, '', ''), false);

check('isSameDay', [U.isSameDay(d, U.parseIso('2024-06-15')), U.isSameDay(d, null)], [true, false]);

// Month keys (YYYY-MM) for report-month filters
check('month round trip', U.toMonth(U.parseMonth('2025-03')), '2025-03');
check('month slash parse', U.toMonth(U.parseMonth('2025/03')), '2025-03');
check('month format slash', U.formatMonthSlash(U.parseMonth('2025-03')), '2025/03');
check('month 13 rejected', U.parseMonth('2025-13'), null);
check('month 00 rejected', U.parseMonth('2025-00'), null);

// Named date ranges (frozen on 2026-10-06)
const today = U.parseIso('2026-10-06');
check('last 7 days inclusive', U.rangeFromPreset('last_7_days', today), { from: '2026-09-30', to: '2026-10-06' });
check('month to date', U.rangeFromPreset('month_to_date', today), { from: '2026-10-01', to: '2026-10-06' });
check('last month', U.rangeFromPreset('last_month', today), { from: '2026-09-01', to: '2026-09-30' });
check('last 3 months starts Aug 1', U.rangeFromPreset('last_3_months', today), { from: '2026-08-01', to: '2026-10-06' });
check('last 6 months starts May 1', U.rangeFromPreset('last_6_months', today), { from: '2026-05-01', to: '2026-10-06' });
check('custom preset has no bounds', U.rangeFromPreset('custom', today), null);
check('resolve last_month', U.resolveDateRange({ mode: 'last_month' }, today), { from: '2026-09-01', to: '2026-09-30' });
check('resolve empty', U.resolveDateRange({ mode: '' }, today), null);
check('resolve custom partial', U.resolveDateRange({ mode: 'custom', from: '2026-01-01', to: '' }, today), { from: '2026-01-01', to: '' });

// Custom range rules (2026-10-08): no future, 24-month floor, To >= From, max 12 months
check('limits, nothing picked', U.customRangeLimits('', '', today), { fromMin: '2024-10-06', fromMax: '2026-10-06', toMin: '2024-10-06', toMax: '2026-10-06' });
check('limits, From caps To at 12 months', U.customRangeLimits('2025-01-01', '', today), { fromMin: '2024-10-06', fromMax: '2026-10-06', toMin: '2025-01-01', toMax: '2025-12-31' });
check('limits, To floors From at 12 months', U.customRangeLimits('', '2026-06-30', today), { fromMin: '2025-07-01', fromMax: '2026-06-30', toMin: '2024-10-06', toMax: '2026-10-06' });
check('limits, recent From keeps today as To max', U.customRangeLimits('2026-09-01', '', today).toMax, '2026-10-06');
check('limits, old To keeps history floor', U.customRangeLimits('', '2025-01-15', today).fromMin, '2024-10-06');
check('custom complete needs both ends', [
  U.isCustomRangeComplete({ mode: 'custom', from: '2026-01-01', to: '' }),
  U.isCustomRangeComplete({ mode: 'custom', from: '', to: '2026-01-01' }),
  U.isCustomRangeComplete({ mode: 'custom', from: '2026-01-01', to: '2026-02-01' }),
  U.isCustomRangeComplete({ mode: 'last_7_days' }),
  U.isCustomRangeComplete({ mode: '' }),
], [false, false, true, true, true]);

if (failed) {
  console.log('\n' + failed + ' FAILED');
  process.exit(1);
}
console.log('\nall date-picker checks pass');
