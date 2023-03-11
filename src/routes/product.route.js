const express = require("express");
const router = express.Router();
const ProductModel = require("../models/Product");

router.get("/", async (req, res) => {
  const products = await ProductModel.find({});
  res.json(products);
});

router.post("/", async (req, res) => {
  try {
    let response = await ProductModel.create(req.body);
    res.json(response);
  } catch (error) {
    // checking validation
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map((value) => value.message);
      return res.status(400).json({
        error: message,
      });
    }
    res.status(400).json(error.message);
  }
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

router.put("/:id", async (req, res) => {
  ProductModel.findOneAndUpdate({ _id: req.params.id }, req.body).exec(
    function (err, product) {
      if (err) return res.status(500).json({ err: err.message });
      res.json({ product, message: "Successfully updated" });
    }
  );
});

router.patch("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!blog) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Update only the provided fields in the request body
    const update = req.body;
    Object.keys(update).forEach((key) => {
      product[key] = update[key];
    });

    await product.save();

    res.send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

module.exports = router;
