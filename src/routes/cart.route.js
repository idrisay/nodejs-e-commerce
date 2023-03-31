const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const cart = await Cart.findOne({ userId });

    // if (cart) {
      res.status(200).json({ cart });
    // } else {
    //   res.status(200).json({message: "Do not have any product in this cart"});
    // }
  } catch (error) {
    res.status(500).json({ message: "Error getting product to cart.", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if cart exists for this user
    let cart = await Cart.findOne({ userId });

    // // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    } else {
      // If cart exists, check if the product already exists in the cart
      const productIndex = cart.products.findIndex(
        (p) => p.productId === productId
      );
      if (productIndex > -1) {
        // If the product exists, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // If the product doesn't exist, add it to the cart
        cart.products.push({ productId, quantity });
      }
    }

    // // Save the cart
    await cart.save();

    res.status(200).json({ message: "Product added to cart.", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding product to cart.", error });
  }
});

router.delete("/", async (req, res) => {
  //     const userId = req.userId;
  //    const productId = req.productId;
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    const productIndex = cart.products.findIndex(
      (item) => item.productId == productId
    );

    if (productIndex > -1) {
      let item = cart.products[productIndex];

      cart.products.splice(productIndex, 1);
      cart = await cart.save();

      res.status(200).json({cart});
    } else {
      res.status(404).json({message: "item not found"});
    }
  } catch (error) {
    res.status(400).json({message: 'Something went wrong', error});
  }
});


module.exports = router;
