const express = require("express");
const router = express.Router();
const ProductModel = require("../models/Product");
const cartRouter = require('./cart.route')

router.use('/cart', cartRouter);

router.get("/", async (req, res) => {
  const products = await ProductModel.find({});
  res.json(products);
});

router.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const products = await ProductModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } }
      ]
    });

    res.json(products);
  } catch (err) {
    console.error('ERROR ->', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  ProductModel.findById(id)
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    });
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

// router.use('/cart', cartRouter)


module.exports = router;
