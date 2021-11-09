function buildParams(args) {
  const params = new URLSearchParams();
  for (const key in args) {
    if (args[key]) {
      params.append(key, args[key]);
    }
  }
  return params.toString();
}

async function sendRequest(path, args) {
  const query = buildParams(args);
  const request = await fetch(`/.netlify/functions${path}?${query}`);
  return await request.json();
}

export function fetchSwarmplt(startMonth, endMonth, feature, country) {
  return sendRequest("/getSwarmplt", {
    startMonth: startMonth,
    endMonth: endMonth,
    feature: feature,
    country: country,
  });
}

export function fetchSongData(startMonth, endMonth, feature, country, musicId) {
  return sendRequest("/getSongData", {
    startMonth: startMonth,
    endMonth: endMonth,
    feature: feature,
    country: country,
    musicId: musicId,
  });
}

export function fetchData(feature, startmonth, region) {
  return sendRequest("/getData", {
    feature: feature,
    startmonth: startmonth,
    region: region,
  });
}

export function fetchCountries(musicId) {
  return sendRequest("/getRanking", {
    musicId: musicId,
  });
}

export function fetchGLtop() {
  return sendRequest("/getGLtop", {});
}

export function fetchJPtop() {
  return sendRequest("/getJPtop", {});
}

export function fetchDectop() {
  return sendRequest("/getDectop", {});
}

export function fetchWorldMapData(feature, startmonth) {
  return sendRequest("/getWorldmapData", {
    feature: feature,
    startmonth: startmonth,
  });
}

export function fetchBarData(feature, startmonth, regionId) {
  return sendRequest("/getBarData", {
    feature: feature,
    startmonth: startmonth,
    regionId: regionId,
  });
}

export function fetchRegionHeatMapData(feature, startmonth) {
  return sendRequest("/getRegionHeatmapData", {
    feature: feature,
    startmonth: startmonth,
  });
}

export function fetchJPGLTopStreamCountry(musicId) {
  return sendRequest("/getJPGLTopStreamCountry", {
    musicId: musicId,
  });
}

export function fetchgetDECStreamCountry(musicId) {
  return sendRequest("/getDECStreamCountry", {
    musicId: musicId,
  });
}