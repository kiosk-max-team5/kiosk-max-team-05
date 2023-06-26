import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 8080;

app.use(cors());
app.get("/coffee", (req, res) => {
  const data = fs.readFileSync("./커피.json", "utf8");
  res.json(JSON.parse(data));
});

app.get("/latte", (req, res) => {
  const data = fs.readFileSync("./라떼.json", "utf8");
  res.json(JSON.parse(data));
});

app.get("/tea", (req, res) => {
  const data = fs.readFileSync("./티.json", "utf8");
  res.json(JSON.parse(data));
});

app.get("/juice", (req, res) => {
  const data = fs.readFileSync("./쥬스.json", "utf8");
  res.json(JSON.parse(data));
});

app.get("/decaf", (req, res) => {
  const data = fs.readFileSync("./디카페인.json", "utf8");
  res.json(JSON.parse(data));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
