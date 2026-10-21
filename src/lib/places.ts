export type PlaceSuggestion = {
  id: string;
  primary: string;
  secondary: string;
};

// Top Auckland & NZ Suburbs / Localities for 0ms instant matching
export const NZ_COMMON_PLACES: Array<{ name: string; city: string; region: string; postcode?: string }> = [
  // Auckland South & Manukau
  { name: "Wattle Downs", city: "Auckland", region: "Auckland", postcode: "2103" },
  { name: "Wattle Cove", city: "Auckland", region: "Auckland", postcode: "2103" },
  { name: "Manurewa", city: "Auckland", region: "Auckland", postcode: "2102" },
  { name: "Manukau Central", city: "Auckland", region: "Auckland", postcode: "2104" },
  { name: "Papakura", city: "Auckland", region: "Auckland", postcode: "2110" },
  { name: "Takanini", city: "Auckland", region: "Auckland", postcode: "2112" },
  { name: "Papatoetoe", city: "Auckland", region: "Auckland", postcode: "2025" },
  { name: "Mangere", city: "Auckland", region: "Auckland", postcode: "2022" },
  { name: "Mangere Bridge", city: "Auckland", region: "Auckland", postcode: "2022" },
  { name: "Otara", city: "Auckland", region: "Auckland", postcode: "2023" },
  { name: "Clendon Park", city: "Auckland", region: "Auckland", postcode: "2103" },
  { name: "Weymouth", city: "Auckland", region: "Auckland", postcode: "2103" },
  { name: "Karaka", city: "Auckland", region: "Auckland", postcode: "2580" },
  { name: "Drury", city: "Auckland", region: "Auckland", postcode: "2113" },
  { name: "Pukekohe", city: "Auckland", region: "Auckland", postcode: "2120" },
  { name: "Waiuku", city: "Auckland", region: "Auckland", postcode: "2123" },
  { name: "The Gardens", city: "Auckland", region: "Auckland", postcode: "2105" },
  { name: "Hill Park", city: "Auckland", region: "Auckland", postcode: "2102" },
  { name: "Alfriston", city: "Auckland", region: "Auckland", postcode: "2105" },
  { name: "Conifer Grove", city: "Auckland", region: "Auckland", postcode: "2112" },

  // Auckland Central & City
  { name: "Auckland Central", city: "Auckland", region: "Auckland", postcode: "1010" },
  { name: "Ponsonby", city: "Auckland", region: "Auckland", postcode: "1011" },
  { name: "Grey Lynn", city: "Auckland", region: "Auckland", postcode: "1021" },
  { name: "Mount Eden", city: "Auckland", region: "Auckland", postcode: "1024" },
  { name: "Mount Albert", city: "Auckland", region: "Auckland", postcode: "1025" },
  { name: "Mount Roskill", city: "Auckland", region: "Auckland", postcode: "1041" },
  { name: "Kingsland", city: "Auckland", region: "Auckland", postcode: "1021" },
  { name: "Epsom", city: "Auckland", region: "Auckland", postcode: "1023" },
  { name: "Newmarket", city: "Auckland", region: "Auckland", postcode: "1023" },
  { name: "Parnell", city: "Auckland", region: "Auckland", postcode: "1052" },
  { name: "Remuera", city: "Auckland", region: "Auckland", postcode: "1050" },
  { name: "Orakei", city: "Auckland", region: "Auckland", postcode: "1071" },
  { name: "Mission Bay", city: "Auckland", region: "Auckland", postcode: "1071" },
  { name: "St Heliers", city: "Auckland", region: "Auckland", postcode: "1071" },
  { name: "Ellerslie", city: "Auckland", region: "Auckland", postcode: "1051" },
  { name: "Onehunga", city: "Auckland", region: "Auckland", postcode: "1061" },
  { name: "Royal Oak", city: "Auckland", region: "Auckland", postcode: "1023" },
  { name: "Point Chevalier", city: "Auckland", region: "Auckland", postcode: "1022" },
  { name: "Herne Bay", city: "Auckland", region: "Auckland", postcode: "1011" },
  { name: "Freemans Bay", city: "Auckland", region: "Auckland", postcode: "1011" },
  { name: "Saint Marys Bay", city: "Auckland", region: "Auckland", postcode: "1011" },
  { name: "Eden Terrace", city: "Auckland", region: "Auckland", postcode: "1010" },
  { name: "Sandringham", city: "Auckland", region: "Auckland", postcode: "1025" },
  { name: "Avondale", city: "Auckland", region: "Auckland", postcode: "1026" },
  { name: "Mount Wellington", city: "Auckland", region: "Auckland", postcode: "1060" },
  { name: "Panmure", city: "Auckland", region: "Auckland", postcode: "1072" },
  { name: "Glen Innes", city: "Auckland", region: "Auckland", postcode: "1072" },
  { name: "Penrose", city: "Auckland", region: "Auckland", postcode: "1061" },
  { name: "Otahuhu", city: "Auckland", region: "Auckland", postcode: "1062" },

  // Auckland East
  { name: "Howick", city: "Auckland", region: "Auckland", postcode: "2014" },
  { name: "Pakuranga", city: "Auckland", region: "Auckland", postcode: "2010" },
  { name: "Half Moon Bay", city: "Auckland", region: "Auckland", postcode: "2012" },
  { name: "Bucklands Beach", city: "Auckland", region: "Auckland", postcode: "2012" },
  { name: "Botany Downs", city: "Auckland", region: "Auckland", postcode: "2010" },
  { name: "Dannemora", city: "Auckland", region: "Auckland", postcode: "2016" },
  { name: "Flat Bush", city: "Auckland", region: "Auckland", postcode: "2019" },
  { name: "Ormiston", city: "Auckland", region: "Auckland", postcode: "2019" },
  { name: "East Tamaki", city: "Auckland", region: "Auckland", postcode: "2013" },
  { name: "Beachlands", city: "Auckland", region: "Auckland", postcode: "2018" },
  { name: "Maraetai", city: "Auckland", region: "Auckland", postcode: "2018" },
  { name: "Whitford", city: "Auckland", region: "Auckland", postcode: "2571" },
  { name: "Clevedon", city: "Auckland", region: "Auckland", postcode: "2582" },

  // Auckland North Shore & Hibiscus Coast
  { name: "Takapuna", city: "Auckland", region: "Auckland", postcode: "0622" },
  { name: "Devonport", city: "Auckland", region: "Auckland", postcode: "0624" },
  { name: "Milford", city: "Auckland", region: "Auckland", postcode: "0620" },
  { name: "Mairangi Bay", city: "Auckland", region: "Auckland", postcode: "0630" },
  { name: "Browns Bay", city: "Auckland", region: "Auckland", postcode: "0630" },
  { name: "Torbay", city: "Auckland", region: "Auckland", postcode: "0630" },
  { name: "Albany", city: "Auckland", region: "Auckland", postcode: "0632" },
  { name: "Glenfield", city: "Auckland", region: "Auckland", postcode: "0629" },
  { name: "Northcote", city: "Auckland", region: "Auckland", postcode: "0627" },
  { name: "Birkenhead", city: "Auckland", region: "Auckland", postcode: "0626" },
  { name: "Beach Haven", city: "Auckland", region: "Auckland", postcode: "0626" },
  { name: "Greenhithe", city: "Auckland", region: "Auckland", postcode: "0632" },
  { name: "Silverdale", city: "Auckland", region: "Auckland", postcode: "0932" },
  { name: "Orewa", city: "Auckland", region: "Auckland", postcode: "0931" },
  { name: "Whangaparaoa", city: "Auckland", region: "Auckland", postcode: "0930" },
  { name: "Millwater", city: "Auckland", region: "Auckland", postcode: "0932" },
  { name: "Milldale", city: "Auckland", region: "Auckland", postcode: "0992" },

  // Auckland West
  { name: "Henderson", city: "Auckland", region: "Auckland", postcode: "0612" },
  { name: "Te Atatu Peninsula", city: "Auckland", region: "Auckland", postcode: "0610" },
  { name: "Te Atatu South", city: "Auckland", region: "Auckland", postcode: "0610" },
  { name: "Massey", city: "Auckland", region: "Auckland", postcode: "0614" },
  { name: "Westgate", city: "Auckland", region: "Auckland", postcode: "0814" },
  { name: "Hobsonville", city: "Auckland", region: "Auckland", postcode: "0616" },
  { name: "Whenuapai", city: "Auckland", region: "Auckland", postcode: "0618" },
  { name: "Kumeu", city: "Auckland", region: "Auckland", postcode: "0810" },
  { name: "Huapai", city: "Auckland", region: "Auckland", postcode: "0810" },
  { name: "Ranui", city: "Auckland", region: "Auckland", postcode: "0612" },
  { name: "Swanson", city: "Auckland", region: "Auckland", postcode: "0612" },
  { name: "New Lynn", city: "Auckland", region: "Auckland", postcode: "0600" },
  { name: "Titirangi", city: "Auckland", region: "Auckland", postcode: "0604" },
  { name: "Glen Eden", city: "Auckland", region: "Auckland", postcode: "0602" },

  // Waikato & Regions
  { name: "Hamilton Central", city: "Hamilton", region: "Waikato", postcode: "3204" },
  { name: "Rototuna", city: "Hamilton", region: "Waikato", postcode: "3210" },
  { name: "Chartwell", city: "Hamilton", region: "Waikato", postcode: "3210" },
  { name: "Cambridge", city: "Waipa", region: "Waikato", postcode: "3434" },
  { name: "Tauranga Central", city: "Tauranga", region: "Bay of Plenty", postcode: "3110" },
  { name: "Mount Maunganui", city: "Tauranga", region: "Bay of Plenty", postcode: "3116" },
  { name: "Papamoa Beach", city: "Tauranga", region: "Bay of Plenty", postcode: "3118" },
  { name: "Wellington Central", city: "Wellington", region: "Wellington", postcode: "6011" },
  { name: "Christchurch Central", city: "Christchurch", region: "Canterbury", postcode: "8011" },
];

function normalizeNzQuery(q: string): string {
  const map: Record<string, string> = {
    "\\brd\\b": "Road",
    "\\bst\\b": "Street",
    "\\bave\\b": "Avenue",
    "\\bdr\\b": "Drive",
    "\\bcres\\b": "Crescent",
    "\\bpl\\b": "Place",
    "\\bct\\b": "Court",
    "\\bhwy\\b": "Highway",
    "\\bpde\\b": "Parade",
    "\\btce\\b": "Terrace",
    "\\bcl\\b": "Close",
    "\\bgrv\\b": "Grove",
    "\\bln\\b": "Lane",
    "\\bblvd\\b": "Boulevard",
    "\\bmt\\b": "Mount",
  };
  let res = q;
  for (const [k, v] of Object.entries(map)) {
    res = res.replace(new RegExp(k, "gi"), v);
  }
  return res;
}

const cache = new Map<string, PlaceSuggestion[]>();

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

export async function searchNzPlacesClient(queryInput: string): Promise<PlaceSuggestion[]> {
  const rawQuery = queryInput.trim();
  if (rawQuery.length < 2) return [];

  const query = normalizeNzQuery(rawQuery);
  const lowerQuery = rawQuery.toLowerCase();
  if (cache.has(lowerQuery)) {
    return cache.get(lowerQuery)!;
  }

  const results: PlaceSuggestion[] = [];
  const seen = new Set<string>();

  const addSuggestion = (s: PlaceSuggestion) => {
    const key = `${s.primary.toLowerCase()}|${s.secondary.toLowerCase()}`;
    if (!seen.has(key)) {
      seen.add(key);
      results.push(s);
    }
  };

  // Try fast photon / nominatim online lookup
  try {
    const photonUrl = new URL("https://photon.komoot.io/api/");
    photonUrl.searchParams.set("q", query);
    photonUrl.searchParams.set("countrycode", "nz");
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
        if (p.state && !parts.some((pt) => pt.toLowerCase() === p.state?.toLowerCase())) {
          parts.push(p.state);
        }
        parts.push("New Zealand");
        addSuggestion({
          id: `ph-${p.osm_id ?? primary}-${results.length}`,
          primary,
          secondary: parts.join(", "),
        });
      }
    }
  } catch {
    // ignore network timeouts, proceed to local matching
  }

  // Instant local matching against NZ localities & suburbs
  const localMatches = NZ_COMMON_PLACES.filter(
    (item) =>
      item.name.toLowerCase().includes(lowerQuery) ||
      lowerQuery.includes(item.name.toLowerCase()) ||
      item.city.toLowerCase().includes(lowerQuery),
  ).slice(0, 6);

  for (const local of localMatches) {
    addSuggestion({
      id: `loc-${local.name}-${results.length}`,
      primary: local.name,
      secondary: `${local.city}, ${local.region}, New Zealand`,
    });
  }

  const finalResults = results.slice(0, 8);
  if (cache.size > 200) cache.clear();
  cache.set(lowerQuery, finalResults);
  return finalResults;
}
