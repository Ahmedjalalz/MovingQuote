export type UkPlaceSuggestion = {
  id: string;
  primary: string;
  secondary: string;
};

// Core local coverage: Cambridgeshire (Cambridge, Waterbeach, Ely, etc.), Cheshire, Wirral, and UK Nationwide
export const UK_COMMON_PLACES: Array<{ name: string; area: string; county: string; postcode?: string }> = [
  // West Midlands (Frontline Transport home region)
  { name: "Brownhills", area: "Walsall", county: "West Midlands", postcode: "WS8" },
  { name: "Walsall Town Centre", area: "Walsall", county: "West Midlands", postcode: "WS1" },
  { name: "Aldridge", area: "Walsall", county: "West Midlands", postcode: "WS9" },
  { name: "Bloxwich", area: "Walsall", county: "West Midlands", postcode: "WS3" },
  { name: "Lichfield City Centre", area: "Lichfield", county: "Staffordshire", postcode: "WS13 / WS14" },
  { name: "Cannock", area: "Cannock Chase", county: "Staffordshire", postcode: "WS11" },
  { name: "Burntwood", area: "Burntwood", county: "Staffordshire", postcode: "WS7" },
  { name: "Rugeley", area: "Rugeley", county: "Staffordshire", postcode: "WS15" },
  { name: "Tamworth", area: "Tamworth", county: "Staffordshire", postcode: "B77 / B79" },
  { name: "Sutton Coldfield", area: "Birmingham", county: "West Midlands", postcode: "B72 / B73" },
  { name: "Birmingham City Centre", area: "Birmingham", county: "West Midlands", postcode: "B1 / B2 / B3" },
  { name: "Wolverhampton City Centre", area: "Wolverhampton", county: "West Midlands", postcode: "WV1" },
  { name: "Dudley", area: "Dudley", county: "West Midlands", postcode: "DY1" },
  { name: "West Bromwich", area: "Sandwell", county: "West Midlands", postcode: "B70" },
  { name: "Smethwick", area: "Sandwell", county: "West Midlands", postcode: "B66" },
  { name: "Solihull", area: "Solihull", county: "West Midlands", postcode: "B91" },
  // Coventry & Warwickshire (Budget Skips Coventry home region)
  { name: "Coventry City Centre", area: "Coventry", county: "West Midlands", postcode: "CV1" },
  { name: "Exhall / Bayton Road", area: "Exhall, Coventry", county: "Warwickshire", postcode: "CV7" },
  { name: "Radford", area: "Coventry", county: "West Midlands", postcode: "CV6" },
  { name: "Coundon", area: "Coventry", county: "West Midlands", postcode: "CV6" },
  { name: "Foleshill", area: "Coventry", county: "West Midlands", postcode: "CV6" },
  { name: "Holbrooks", area: "Coventry", county: "West Midlands", postcode: "CV6" },
  { name: "Longford", area: "Coventry", county: "West Midlands", postcode: "CV6" },
  { name: "Bedworth", area: "Bedworth", county: "Warwickshire", postcode: "CV12" },
  { name: "Bulkington", area: "Bulkington", county: "Warwickshire", postcode: "CV12" },
  { name: "Nuneaton", area: "Nuneaton", county: "Warwickshire", postcode: "CV10 / CV11" },
  { name: "Kenilworth", area: "Kenilworth", county: "Warwickshire", postcode: "CV8" },
  { name: "Leamington Spa", area: "Royal Leamington Spa", county: "Warwickshire", postcode: "CV31 / CV32" },
  { name: "Warwick", area: "Warwick", county: "Warwickshire", postcode: "CV34" },
  { name: "Rugby", area: "Rugby", county: "Warwickshire", postcode: "CV21 / CV22" },
  { name: "Atherstone", area: "Atherstone", county: "Warwickshire", postcode: "CV9" },
  { name: "Tile Hill", area: "Coventry", county: "West Midlands", postcode: "CV4" },
  { name: "Canley", area: "Coventry", county: "West Midlands", postcode: "CV4" },
  { name: "Earlsdon", area: "Coventry", county: "West Midlands", postcode: "CV5" },
  { name: "Allesley", area: "Coventry", county: "West Midlands", postcode: "CV5" },
  { name: "Cheylesmore", area: "Coventry", county: "West Midlands", postcode: "CV3" },
  { name: "Finham", area: "Coventry", county: "West Midlands", postcode: "CV3" },
  { name: "Stivichall", area: "Coventry", county: "West Midlands", postcode: "CV3" },
  { name: "Binley", area: "Coventry", county: "West Midlands", postcode: "CV3" },
  { name: "Walsgrave", area: "Coventry", county: "West Midlands", postcode: "CV2" },
  { name: "Wyken", area: "Coventry", county: "West Midlands", postcode: "CV2" },
  { name: "Bell Green", area: "Coventry", county: "West Midlands", postcode: "CV2" },
  { name: "Stoke", area: "Coventry", county: "West Midlands", postcode: "CV2 / CV3" },
  { name: "Keresley", area: "Coventry", county: "West Midlands", postcode: "CV6 / CV7" },
  { name: "Balsall Common", area: "Solihull / Coventry", county: "West Midlands", postcode: "CV7" },
  { name: "Telford", area: "Telford", county: "Shropshire", postcode: "TF1" },
  { name: "Stafford", area: "Stafford", county: "Staffordshire", postcode: "ST16" },
  { name: "Stourbridge", area: "Dudley", county: "West Midlands", postcode: "DY8" },
  { name: "Kidderminster", area: "Wyre Forest", county: "Worcestershire", postcode: "DY10" },
  { name: "Redditch", area: "Redditch", county: "Worcestershire", postcode: "B97" },
  { name: "Burton-upon-Trent", area: "Burton", county: "Staffordshire", postcode: "DE14" },

  // Cambridge & Cambridgeshire (Aldhouse & Smith home region)
  { name: "Waterbeach", area: "Waterbeach", county: "Cambridgeshire", postcode: "CB25" },
  { name: "Cambridge City Centre", area: "Cambridge", county: "Cambridgeshire", postcode: "CB1 / CB2" },
  { name: "Chesterton", area: "Cambridge", county: "Cambridgeshire", postcode: "CB4" },
  { name: "Cherry Hinton", area: "Cambridge", county: "Cambridgeshire", postcode: "CB1" },
  { name: "Trumpington", area: "Cambridge", county: "Cambridgeshire", postcode: "CB2" },
  { name: "Newnham", area: "Cambridge", county: "Cambridgeshire", postcode: "CB3" },
  { name: "Girton", area: "Cambridge", county: "Cambridgeshire", postcode: "CB3" },
  { name: "Histon & Impington", area: "Histon", county: "Cambridgeshire", postcode: "CB24" },
  { name: "Milton", area: "Cambridge", county: "Cambridgeshire", postcode: "CB24" },
  { name: "Cottenham", area: "Cottenham", county: "Cambridgeshire", postcode: "CB24" },
  { name: "Ely", area: "Ely", county: "Cambridgeshire", postcode: "CB6" },
  { name: "Newmarket", area: "Newmarket", county: "Suffolk / Cambridgeshire", postcode: "CB8" },
  { name: "Huntingdon", area: "Huntingdon", county: "Cambridgeshire", postcode: "PE29" },
  { name: "St Neots", area: "St Neots", county: "Cambridgeshire", postcode: "PE19" },
  { name: "St Ives", area: "St Ives", county: "Cambridgeshire", postcode: "PE27" },
  { name: "Royston", area: "Royston", county: "Hertfordshire", postcode: "SG8" },
  { name: "Saffron Walden", area: "Saffron Walden", county: "Essex", postcode: "CB10" },
  { name: "Great Shelford", area: "Shelford", county: "Cambridgeshire", postcode: "CB22" },
  { name: "Sawston", area: "Sawston", county: "Cambridgeshire", postcode: "CB22" },
  { name: "Fulbourn", area: "Fulbourn", county: "Cambridgeshire", postcode: "CB21" },
  { name: "Cambourne", area: "Cambourne", county: "Cambridgeshire", postcode: "CB23" },
  { name: "Bar Hill", area: "Bar Hill", county: "Cambridgeshire", postcode: "CB23" },
  { name: "Bury St Edmunds", area: "Bury St Edmunds", county: "Suffolk", postcode: "IP33" },
  { name: "Haverhill", area: "Haverhill", county: "Suffolk", postcode: "CB9" },
  { name: "Peterborough", area: "Peterborough", county: "Cambridgeshire", postcode: "PE1" },
  { name: "London", area: "Greater London", county: "London", postcode: "WC / EC / SW" },
  { name: "Oxford", area: "Oxford", county: "Oxfordshire", postcode: "OX1" },

  // Ellesmere Port & South Wirral
  { name: "Great Sutton", area: "Ellesmere Port", county: "Cheshire West", postcode: "CH66" },
  { name: "Whitby", area: "Ellesmere Port", county: "Cheshire West", postcode: "CH65" },
  { name: "Little Sutton", area: "Ellesmere Port", county: "Cheshire West", postcode: "CH66" },
  { name: "Overpool", area: "Ellesmere Port", county: "Cheshire West", postcode: "CH66" },
  { name: "Stanlow", area: "Ellesmere Port", county: "Cheshire West", postcode: "CH65" },
  { name: "Hooton", area: "Ellesmere Port", county: "Cheshire West", postcode: "CH66" },
  { name: "Neston", area: "Neston", county: "Cheshire West", postcode: "CH64" },
  { name: "Parkgate", area: "Neston", county: "Cheshire West", postcode: "CH64" },
  { name: "Willaston", area: "Neston", county: "Cheshire West", postcode: "CH64" },

  // Chester & surrounding
  { name: "Chester City Centre", area: "Chester", county: "Cheshire", postcode: "CH1" },
  { name: "Hoole", area: "Chester", county: "Cheshire", postcode: "CH2" },
  { name: "Upton", area: "Chester", county: "Cheshire", postcode: "CH2" },
  { name: "Boughton", area: "Chester", county: "Cheshire", postcode: "CH3" },
  { name: "Handbridge", area: "Chester", county: "Cheshire", postcode: "CH4" },
  { name: "Saltney", area: "Chester", county: "Flintshire / Cheshire", postcode: "CH4" },
  { name: "Blacon", area: "Chester", county: "Cheshire", postcode: "CH1" },
  { name: "Christleton", area: "Chester", county: "Cheshire", postcode: "CH3" },

  // The Wirral
  { name: "Birkenhead", area: "Wirral", county: "Merseyside", postcode: "CH41" },
  { name: "Wallasey", area: "Wirral", county: "Merseyside", postcode: "CH44" },
  { name: "Heswall", area: "Wirral", county: "Merseyside", postcode: "CH60" },
  { name: "West Kirby", area: "Wirral", county: "Merseyside", postcode: "CH48" },
  { name: "Hoylake", area: "Wirral", county: "Merseyside", postcode: "CH47" },
  { name: "Bebington", area: "Wirral", county: "Merseyside", postcode: "CH63" },
  { name: "Bromborough", area: "Wirral", county: "Merseyside", postcode: "CH62" },
  { name: "Moreton", area: "Wirral", county: "Merseyside", postcode: "CH46" },
  { name: "Prenton", area: "Wirral", county: "Merseyside", postcode: "CH43" },
  { name: "Claughton", area: "Wirral", county: "Merseyside", postcode: "CH43" },
  { name: "Oxton", area: "Wirral", county: "Merseyside", postcode: "CH43" },
  { name: "New Brighton", area: "Wirral", county: "Merseyside", postcode: "CH45" },

  // Cheshire & Merseyside
  { name: "Frodsham", area: "Frodsham", county: "Cheshire", postcode: "WA6" },
  { name: "Helsby", area: "Helsby", county: "Cheshire", postcode: "WA6" },
  { name: "Runcorn", area: "Halton", county: "Cheshire", postcode: "WA7" },
  { name: "Widnes", area: "Halton", county: "Cheshire", postcode: "WA8" },
  { name: "Warrington", area: "Warrington", county: "Cheshire", postcode: "WA1" },
  { name: "Northwich", area: "Northwich", county: "Cheshire", postcode: "CW9" },
  { name: "Liverpool City Centre", area: "Liverpool", county: "Merseyside", postcode: "L1" },

  // North Wales borders
  { name: "Deeside", area: "Deeside", county: "Flintshire", postcode: "CH5" },
  { name: "Connah's Quay", area: "Deeside", county: "Flintshire", postcode: "CH5" },
  { name: "Mold", area: "Mold", county: "Flintshire", postcode: "CH7" },
  { name: "Wrexham", area: "Wrexham", county: "Wrexham", postcode: "LL11" },
];

const cache = new Map<string, UkPlaceSuggestion[]>();

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 1200): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export async function searchUkPlacesClient(queryInput: string): Promise<UkPlaceSuggestion[]> {
  const rawQuery = queryInput.trim();
  if (rawQuery.length < 2) return [];

  const lowerQuery = rawQuery.toLowerCase();
  if (cache.has(lowerQuery)) {
    return cache.get(lowerQuery)!;
  }

  const results: UkPlaceSuggestion[] = [];
  const seen = new Set<string>();

  const addSuggestion = (s: UkPlaceSuggestion) => {
    const key = `${s.primary.toLowerCase()}|${s.secondary.toLowerCase()}`;
    if (!seen.has(key)) {
      seen.add(key);
      results.push(s);
    }
  };

  // 1. Try fast photon search with countrycode=gb
  try {
    const photonUrl = new URL("https://photon.komoot.io/api/");
    photonUrl.searchParams.set("q", rawQuery);
    photonUrl.searchParams.set("countrycode", "gb");
    photonUrl.searchParams.set("limit", "5");

    const res = await fetchWithTimeout(photonUrl.toString(), {
      headers: { Accept: "application/json" },
    }, 1100);

    if (res.ok) {
      const payload = await res.json() as {
        features?: Array<{
          properties?: {
            osm_id?: number | string;
            name?: string;
            housenumber?: string;
            street?: string;
            locality?: string;
            district?: string;
            city?: string;
            state?: string;
            postcode?: string;
          };
        }>;
      };

      for (const feature of payload.features ?? []) {
        const p = feature.properties;
        if (!p) continue;
        let primary = "";
        if (p.housenumber && p.street) {
          primary = `${p.housenumber} ${p.street}`;
        } else if (p.housenumber && p.name && !p.name.includes(p.housenumber)) {
          primary = `${p.housenumber} ${p.name}`;
        } else if (p.name) {
          primary = p.name;
        } else if (p.street) {
          primary = p.street;
        }
        if (!primary) continue;

        const parts: string[] = [];
        const area = p.district || p.locality;
        if (area && area.toLowerCase() !== primary.toLowerCase()) parts.push(area);
        if (p.city && p.city.toLowerCase() !== primary.toLowerCase() && p.city.toLowerCase() !== area?.toLowerCase()) {
          parts.push(p.city);
        }
        if (p.postcode) parts.push(p.postcode);
        parts.push("UK");

        addSuggestion({
          id: `uk-${p.osm_id ?? primary}-${results.length}`,
          primary,
          secondary: parts.join(", "),
        });
      }
    }
  } catch {
    // ignore network timeout
  }

  // 2. Instant local matching against Cheshire, Wirral & Ellesmere Port coverage
  const localMatches = UK_COMMON_PLACES.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      lowerQuery.includes(item.name.toLowerCase()) ||
      item.area.toLowerCase().includes(lowerQuery) ||
      (item.postcode && item.postcode.toLowerCase().includes(lowerQuery)),
  ).slice(0, 6);

  for (const local of localMatches) {
    addSuggestion({
      id: `loc-${local.name}-${results.length}`,
      primary: `${local.name}${local.postcode ? ` (${local.postcode})` : ""}`,
      secondary: `${local.area}, ${local.county}, United Kingdom`,
    });
  }

  const finalResults = results.slice(0, 8);
  if (cache.size > 200) cache.clear();
  cache.set(lowerQuery, finalResults);
  return finalResults;
}
