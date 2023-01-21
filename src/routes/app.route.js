const express = require("express");
const router = express.Router();

// get, post, put, delete, patch
router.get("/", (req, res) => {
  res.send("Welcome to my api...");
});

module.exports = router;
