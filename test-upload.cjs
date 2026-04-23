import fetch, { FormData } from "node-fetch";

async function test() {
  const fd = new FormData();
  fd.append("test", "hello world");
  
  const res = await fetch("https://ais-dev-b5j5v73jip6datc23qadll-59405682842.us-west2.run.app/api/submit-form", {
    method: "POST",
    body: fd
  });
  const text = await res.text();
  console.log(res.status, text);
}
test();
