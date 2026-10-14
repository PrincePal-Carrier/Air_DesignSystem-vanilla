/**
 * Account Management - geographic scope (IN / JP / TH prototype)
 */
const AMRegions = (function () {
  'use strict';

  const COUNTRIES = [
    {
      code: 'IN',
      name: 'India',
      states: [
        { id: 'IN-DL', name: 'Delhi NCR' },
        { id: 'IN-HR', name: 'Haryana' },
        { id: 'IN-PB', name: 'Punjab' },
        { id: 'IN-RJ', name: 'Rajasthan' },
        { id: 'IN-UP', name: 'Uttar Pradesh' },
        { id: 'IN-UK', name: 'Uttarakhand' },
        { id: 'IN-HP', name: 'Himachal Pradesh' },
        { id: 'IN-JK', name: 'Jammu and Kashmir' },
        { id: 'IN-GJ', name: 'Gujarat' },
        { id: 'IN-MH', name: 'Maharashtra' },
        { id: 'IN-MP', name: 'Madhya Pradesh' },
        { id: 'IN-CG', name: 'Chhattisgarh' },
        { id: 'IN-GA', name: 'Goa' },
        { id: 'IN-KA', name: 'Karnataka' },
        { id: 'IN-KL', name: 'Kerala' },
        { id: 'IN-TN', name: 'Tamil Nadu' },
        { id: 'IN-AP', name: 'Andhra Pradesh' },
        { id: 'IN-TG', name: 'Telangana' },
        { id: 'IN-WB', name: 'West Bengal' },
        { id: 'IN-OR', name: 'Odisha' },
        { id: 'IN-BR', name: 'Bihar' },
        { id: 'IN-JH', name: 'Jharkhand' },
        { id: 'IN-AS', name: 'Assam' },
      ],
    },
    {
      code: 'JP',
      name: 'Japan',
      states: [
        { id: 'JP-01', name: 'Hokkaido' },
        { id: 'JP-04', name: 'Miyagi' },
        { id: 'JP-11', name: 'Saitama' },
        { id: 'JP-12', name: 'Chiba' },
        { id: 'JP-13', name: 'Tokyo' },
        { id: 'JP-14', name: 'Kanagawa' },
        { id: 'JP-15', name: 'Niigata' },
        { id: 'JP-22', name: 'Shizuoka' },
        { id: 'JP-23', name: 'Aichi' },
        { id: 'JP-26', name: 'Kyoto' },
        { id: 'JP-27', name: 'Osaka' },
        { id: 'JP-28', name: 'Hyogo' },
        { id: 'JP-33', name: 'Okayama' },
        { id: 'JP-34', name: 'Hiroshima' },
        { id: 'JP-40', name: 'Fukuoka' },
        { id: 'JP-47', name: 'Okinawa' },
      ],
    },
    {
      code: 'TH',
      name: 'Thailand',
      states: [
        { id: 'TH-10', name: 'Bangkok' },
        { id: 'TH-12', name: 'Nonthaburi' },
        { id: 'TH-13', name: 'Pathum Thani' },
        { id: 'TH-11', name: 'Samut Prakan' },
        { id: 'TH-14', name: 'Ayutthaya' },
        { id: 'TH-20', name: 'Chonburi' },
        { id: 'TH-21', name: 'Rayong' },
        { id: 'TH-50', name: 'Chiang Mai' },
        { id: 'TH-57', name: 'Chiang Rai' },
        { id: 'TH-40', name: 'Khon Kaen' },
        { id: 'TH-30', name: 'Nakhon Ratchasima' },
        { id: 'TH-41', name: 'Udon Thani' },
        { id: 'TH-83', name: 'Phuket' },
        { id: 'TH-84', name: 'Surat Thani' },
        { id: 'TH-90', name: 'Songkhla' },
        { id: 'TH-80', name: 'Nakhon Si Thammarat' },
      ],
    },
  ];

  function countryName(code) {
    const c = COUNTRIES.find(function (x) {
      return x.code === code;
    });
    return c ? c.name : code;
  }

  function stateName(countryCode, stateId) {
    const c = COUNTRIES.find(function (x) {
      return x.code === countryCode;
    });
    if (!c) return stateId;
    const s = c.states.find(function (x) {
      return x.id === stateId;
    });
    return s ? s.name : stateId;
  }

  /**
   * Compact region label for table cells / chips.
   * Overflow standard: show the country and up to `maxVisibleStates` state
   * names, then `+N` for the remaining states (same idea as region-select chips).
   * Pass `{ maxVisibleStates: Infinity }` (or use formatRegionFull) for the full list.
   */
  function formatRegion(region, options) {
    if (!region) return '-';
    if (region.all) return 'All';
    const opts = options || {};
    const maxVisible =
      opts.maxVisibleStates == null ? 1 : opts.maxVisibleStates;
    const parts = [];
    const countries = region.countries || [];
    const states = region.states || {};

    function formatCountryStates(code, stateIds) {
      const names = (stateIds || []).map(function (id) {
        return stateName(code, id);
      });
      if (!names.length) return countryName(code);
      if (!isFinite(maxVisible) || maxVisible >= names.length) {
        return countryName(code) + ' · ' + names.join(', ');
      }
      const visible = Math.max(1, maxVisible);
      const shown = names.slice(0, visible).join(', ');
      const overflow = names.length - visible;
      return countryName(code) + ' · ' + shown + (overflow > 0 ? ' +' + overflow : '');
    }

    countries.forEach(function (code) {
      parts.push(formatCountryStates(code, states[code] || []));
    });

    Object.keys(states).forEach(function (code) {
      if (countries.indexOf(code) !== -1) return;
      const st = states[code] || [];
      if (!st.length) return;
      parts.push(formatCountryStates(code, st));
    });

    return parts.length ? parts.join('; ') : '-';
  }

  /** Full region label with every selected state (CSV, tooltips). */
  function formatRegionFull(region) {
    return formatRegion(region, { maxVisibleStates: Infinity });
  }

  function matchesCountryFilter(region, countryCodes) {
    if (!countryCodes || !countryCodes.length) return true;
    if (!region) return false;
    if (region.all) return true;
    const selected = new Set(region.countries || []);
    Object.keys(region.states || {}).forEach(function (code) {
      if ((region.states[code] || []).length) selected.add(code);
    });
    return countryCodes.some(function (code) {
      return selected.has(code);
    });
  }

  /** Match user region against a filter shaped like regionSelect serialize(). */
  function matchesRegionFilter(region, filter) {
    if (!filter || filter.all || isRegionFilterEmpty(filter)) return true;
    if (!region) return false;
    if (region.all) return true;

    const userCountryFull = new Set();
    const userStateKeys = new Set();

    function ingest(code, stateIds) {
      const ids = stateIds || [];
      if (!ids.length) {
        userCountryFull.add(code);
        return;
      }
      ids.forEach(function (sid) {
        userStateKeys.add(code + ':' + sid);
      });
    }

    (region.countries || []).forEach(function (code) {
      ingest(code, (region.states || {})[code] || []);
    });
    Object.keys(region.states || {}).forEach(function (code) {
      if ((region.countries || []).indexOf(code) !== -1) return;
      ingest(code, region.states[code] || []);
    });

    const fCountries = filter.countries || [];
    for (let i = 0; i < fCountries.length; i += 1) {
      const code = fCountries[i];
      if (userCountryFull.has(code)) return true;
      const prefix = code + ':';
      let hit = false;
      userStateKeys.forEach(function (key) {
        if (key.indexOf(prefix) === 0) hit = true;
      });
      if (hit) return true;
    }

    const fStates = filter.states || {};
    const codes = Object.keys(fStates);
    for (let j = 0; j < codes.length; j += 1) {
      const code = codes[j];
      const ids = fStates[code] || [];
      if (userCountryFull.has(code)) return true;
      for (let k = 0; k < ids.length; k += 1) {
        if (userStateKeys.has(code + ':' + ids[k])) return true;
      }
    }
    return false;
  }

  /**
   * Applied-filter chips for a region filter: one per country (decided
   * 2026-10-08). A whole country reads "India"; picked states read
   * "India (Punjab, Delhi NCR)". Order follows COUNTRIES.
   */
  function regionFilterChips(filter) {
    if (!filter || filter.all || isRegionFilterEmpty(filter)) return [];
    const countries = filter.countries || [];
    const states = filter.states || {};
    const chips = [];
    COUNTRIES.forEach(function (country) {
      if (countries.indexOf(country.code) !== -1) {
        chips.push({ code: country.code, label: country.name });
        return;
      }
      const ids = states[country.code] || [];
      if (!ids.length) return;
      const names = ids.map(function (id) {
        return stateName(country.code, id);
      });
      chips.push({ code: country.code, label: country.name + ' (' + names.join(', ') + ')' });
    });
    return chips;
  }

  /** Copy of the filter with one country (and its states) removed. */
  function withoutCountry(filter, code) {
    const states = {};
    Object.keys((filter && filter.states) || {}).forEach(function (key) {
      if (key !== code) states[key] = filter.states[key].slice();
    });
    return {
      all: false,
      countries: ((filter && filter.countries) || []).filter(function (c) {
        return c !== code;
      }),
      states: states,
    };
  }

  function emptyRegion() {
    return { all: false, countries: [], states: {} };
  }

  function isRegionFilterEmpty(filter) {
    if (!filter || filter.all) return true;
    if ((filter.countries || []).length) return false;
    const st = filter.states || {};
    return !Object.keys(st).some(function (code) {
      return (st[code] || []).length > 0;
    });
  }

  /**
   * Match a property address (countryCode + state name) against a region filter
   * shaped like regionSelect serialize() / UM Filters → Managed Scope.
   */
  function matchesPropertyRegionFilter(property, filter) {
    if (!filter || isRegionFilterEmpty(filter)) return true;
    if (!property) return false;
    const code = property.countryCode || '';
    if (!code) return false;
    if ((filter.countries || []).indexOf(code) !== -1) return true;
    const stateIds = (filter.states && filter.states[code]) || [];
    if (!stateIds.length) return false;
    const propState = String(property.state || '')
      .trim()
      .toLowerCase();
    if (!propState) return false;
    return stateIds.some(function (id) {
      return stateName(code, id).toLowerCase() === propState;
    });
  }

  return {
    COUNTRIES: COUNTRIES,
    formatRegion: formatRegion,
    formatRegionFull: formatRegionFull,
    matchesCountryFilter: matchesCountryFilter,
    matchesRegionFilter: matchesRegionFilter,
    matchesPropertyRegionFilter: matchesPropertyRegionFilter,
    isRegionFilterEmpty: isRegionFilterEmpty,
    emptyRegion: emptyRegion,
    regionFilterChips: regionFilterChips,
    withoutCountry: withoutCountry,
    countryName: countryName,
  };
})();
