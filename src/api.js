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

export function fetchTest(musicId) {
  return sendRequest("/getTest", {
    musicId: musicId,
  });
}

export function fetchData(feature) {
  return sendRequest("/getData", {
    feature: feature,
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
