export type UkPlaceSuggestion = {
  id: string;
  primary: string;
  secondary: string;
};

// Core local coverage: Ellesmere Port, Wirral, Chester, Cheshire, Merseyside & North Wales
export const UK_COMMON_PLACES: Array<{ name: string; area: string; county: string; postcode?: string }> = [
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
