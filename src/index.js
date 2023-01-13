const express = require("express");
const mongoose = require("mongoose");
const ProductModel = require('./models/Product')
require("dotenv").config();

const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (e) => {
    if(e?.ok == 0){
      console.log("Something went wrong",e);
    }else{
      console.log("Connected to MongoDB");
    }
  }
);

const BACKEND_PORT = process.env.BACKEND_PORT || 3003;

app.use(express.json()); //Used to parse JSON bodies

// get, post, put, delete, patch
app.get("/", (req, res) => {
  res.send("Welcome to my api");
});

// get, post, put, delete, patch
app.get("/products", async (req, res) => {
  const products = await ProductModel.find({})
  res.json(products);
});

app.post("/products", async(req, res) => {
  // products = [...products, req.body];
  let response = await ProductModel.create(req.body)
  res.json(response);
});

app.listen(BACKEND_PORT, () => {
  console.log(`Listening http://localhost:${BACKEND_PORT}/`);
});
