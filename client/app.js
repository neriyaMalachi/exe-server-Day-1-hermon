async function getData() {
  const name = "neriya malachi";
  const res = await fetch(`http://localhost:8000/greet/${name}`);
  const data = await res.json();
  console.log(data);
}
getData()