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

export function fetchData(year, period, feature) {
  return sendRequest("/getData", {
    year: year,
    period: period,
    feature: feature,
  });
}
