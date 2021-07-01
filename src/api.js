async function sendRequest(path) {
  const request = await fetch(`/.netlify/functions${path}`);
  const data = request;
  //   console.log(data.json());
  //   console.log(data);
  return await request.json();
}

export function check() {
  return sendRequest("/hello");
}
