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
  console.log(`/.netlify/functions${path}?${query}`);
  const request = await fetch(`/.netlify/functions${path}?${query}`);
  return await request.json();
}

export function fetchData(startMonth, endMonth, feature, country, musicId) {
  console.log(startMonth, endMonth);
  //console.log(1);
  return sendRequest("/getData", {
    startMonth: startMonth,
    endMonth: endMonth,
    feature: feature,
    country: country,
    musicId: musicId,
  });
}
