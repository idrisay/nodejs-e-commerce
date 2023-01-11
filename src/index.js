const express = require("express");

const app = express();

let users = [
  { id: 1, name: "idris", role: "admin" },
  { id: 2, name: "yusuf", role: "user" },
];

let products = [
  { id: 1, name: "iphone", price: 1000 },
  { id: 2, name: "samsung", price: 900 },
];

app.use(express.json()); //Used to parse JSON bodies

// get, post, put, delete, patch
app.get("/", (req, res) => {
  res.send("Welcome to my api");
});

// get, post, put, delete, patch
app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  products = [...products, req.body];
  res.json(products);
});

app.listen(5001, () => {
  console.log("listening on port 5001");
});
