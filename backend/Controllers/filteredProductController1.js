const Product = require("../models/crud");

const getProductsWithValidName = async (req, res) => {
  try {
    const products = await Product.find({
      name: { $exists: true, $ne: null }
    });

    const filtered = products.filter(
      p => typeof p.name === "string" && p.name.trim() !== ""
    );

    res.status(200).json(filtered);
  } catch (error) {
    console.error("Error in getProductsWithValidName:", error);
    res.status(500).json({ error: "Failed to fetch valid products." });
  }
};

module.exports = { getProductsWithValidName };
