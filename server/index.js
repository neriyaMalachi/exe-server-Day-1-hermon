import express from "express";

const app = express();
app.use(express.json());
const PORT = 8000;
const time = new Date();

app.get("/greet", (req, res) => {
  res.json({ msg: `hi from get endpoint ${time.toISOString().split("T")[0]}` });
});

app.get("/greet/:name", (req, res) => {
  const { name } = req.params;
  res.json({ msg: `got name: ${name}` });
});

app.get("/test", async (req, res) => {
  const name = "neriya malachi";
  try {
    const check = await fetch(`http://localhost:8000/greet/${name}`);
    const data = await check.json();
    if (
      data &&
      typeof data.msg === "string" &&
      data.msg.includes("neriya malachi")
    ) {
      res.json({ results: "OK" });
    } else {
      res.json({ results: "fail" });
    }
  } catch (error) {
    res.json({ error: error, message: "error in thr route test" });
  }
});

app.post("/action", async (req, res) => {
  if (!req.body || typeof req.body !== "object")
   return res.status(400).json({ msg: "body is reqired" });
  const  action  = req.body.action;
  if (action == "joke") {
    const data = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const joke = await data.json();

    const jokeText = `${joke.setup} : ${joke.punchline}`.toUpperCase();
   return res.json({ joke: jokeText });
  }
  if (action == "cat fact") {
    const data = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=13",
      {
        headers: {
          "x-api-key": "live_rtEHt72tcjdQlt0n5t38Hs2triN6qOdDrFaLFP9pffX9EXtIKnk4dsjCGTE5WRAM",
        },
      }
    );
    const img = await data.json();
   return res.json({ length: String(img.length) });
  }
});

app.listen(PORT, () => {
  console.log("serer run to port 8000...");
});
