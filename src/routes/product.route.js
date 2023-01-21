const express = require("express");
const router = express.Router();
const ProductModel = require("../models/Product");

router.get("/", async (req, res) => {
  const products = await ProductModel.find({});
  res.json(products);
});

router.post("/", async (req, res) => {
  let response = await ProductModel.create(req.body);
  res.json(response);
});

router.delete("/:id", async (req, res) => {
  ProductModel.findByIdAndDelete(req.params.id, function (err, docs) {
    if (!err) {
      console.log("asdasd", docs);
      let message;
      if (!docs) {
        message = "Could find this document.";
      } else {
        message = "Delete product successfuly.";
      }
      res.status(200).json({ message });
    } else {
      message = "Something went wrong.";
      return res.status(404).json({ message });
    }
  });
});

module.exports = router;
