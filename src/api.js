async function sendRequest(path) {
  const request = await fetch(`/.netlify/functions${path}`);
<<<<<<< HEAD
  const data = request;
  //   console.log(data.json());
  //   console.log(data);
=======
  console.log(request.status);
>>>>>>> f4a210d0b0b73b2cf34895cbc5b5a3173f57ce09
  return await request.json();
}

export function check() {
  return sendRequest("/hello");
}
