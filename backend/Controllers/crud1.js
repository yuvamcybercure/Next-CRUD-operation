const Product = require("../models/crud");

// Create
const createProduct = async (req, res) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      // Bulk insert
      const insertedProducts = await Product.insertMany(data);
      res.status(201).json({
        message: "Multiple products created",
        count: insertedProducts.length,
        products: insertedProducts,
      });
    } else {
      // Single product insert
      const product = new Product(data);
      const saved = await product.save();
      res.status(201).json({
        message: "Product created",
        product: saved,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error creating product(s)",
      error: error.message,
    });
  }
};

// Read All
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Products fetched", products });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Update
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated", updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted", deleted });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
};
