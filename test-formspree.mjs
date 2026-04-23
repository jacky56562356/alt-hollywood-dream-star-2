import fetch from "node-fetch";
import FormData from "form-data";

async function test() {
  const fd = new FormData();
  fd.append("test", "hello world");
  // using a random formspree endpoint or just ANY formspree endpoint with multipart
  const url = "https://formspree.io/f/mqkrvyov"; // Random one
  const res = await fetch(url, {
    method: "POST",
    headers: { "Accept": "application/json" },
    body: fd
  });
  console.log(await res.text());
}
test();
