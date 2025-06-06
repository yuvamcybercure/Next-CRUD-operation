const express = require("express");
const router = express.Router();
const { getProductsWithValidName } = require("../Controllers/filteredProductController1");

router.get("/products/valid", getProductsWithValidName);

module.exports = router;
