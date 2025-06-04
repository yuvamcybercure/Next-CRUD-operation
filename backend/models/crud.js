const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String},
  price: { type: Number},
  inStock: { type: Boolean}
});

module.exports = mongoose.model("Product", productSchema);
