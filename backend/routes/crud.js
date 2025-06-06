const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} = require("../Controllers/crud1");


router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
