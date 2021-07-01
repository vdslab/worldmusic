async function sendRequest(path) {
  const request = await fetch(`/.netlify/functions${path}`);
  console.log(request.status);
  return await request.json();
}

export function check() {
  return sendRequest("/hello");
}
