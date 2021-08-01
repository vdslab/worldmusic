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

export function fetchData(startMonth, endMonth, feature, country) {
  return sendRequest("/getData", {
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

export function fetchTest(startMonth, endMonth, feature, country) {
  return sendRequest("/getTest", {
    startMonth: startMonth,
    endMonth: endMonth,
    feature: feature,
    country: country,
  });
}

export function fetchHeatmapData(feature, country) {
  return sendRequest("/getHeatmapData", {
    feature: feature,
  });
}
