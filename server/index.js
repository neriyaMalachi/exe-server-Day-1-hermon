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
  res.json({"msg":`got name: ${name}`})
});

app.get("/test",(req,res)=>{
    
})

app.listen(PORT, () => {
  console.log("serer run to port 8000...");
});
