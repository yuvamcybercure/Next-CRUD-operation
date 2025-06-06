import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // ✅ Create Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9000/api/products", {
        name: name.trim(),
        price: Number(price),
      });

      if (res.data?.product) {
        toast.success("✅ Product created");
        setName("");
        setPrice("");
        fetchProducts();
      } else {
        toast.error("❌ Failed to create product");
      }
    } catch (err) {
      toast.error("❌ " + (err.response?.data?.message || "Error creating product"));
    }
  };

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/products");
      setProducts(res.data.products || []);
    } catch (err) {
      toast.error("❌ Failed to fetch products");
    }
  };

  // ✅ Delete Product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9000/api/products/${id}`);
      toast.success("🗑️ Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("❌ Error deleting product");
    }
  };

  // ✅ Start Editing
  const startEdit = (product) => {
    setEditingId(product._id);
    setEditName(product.name);
    setEditPrice(product.price);
  };

  // ✅ Cancel Editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditPrice("");
  };

  // ✅ Save Edited Product
  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`http://localhost:9000/api/products/${id}`, {
        name: editName.trim(),
        price: Number(editPrice),
      });

      if (res.data?.product) {
        toast.success("✏️ Product updated");
        cancelEdit();
        fetchProducts();
      } else {
        toast.error("❌ Update failed");
      }
    } catch (err) {
      toast.error("❌ " + (err.response?.data?.message || "Error updating product"));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div style={{ padding: "2rem" }}>
        <h1>Create Product</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label>Product Name:</label><br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Price:</label><br />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <button type="submit">Create</button>
        </form>

        <hr style={{ margin: "2rem 0" }} />

        <h2>All Products</h2>
        <ul>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <li key={product._id}>
                {editingId === product._id ? (
                  <>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                    />
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      required
                    />
                    <button onClick={() => handleUpdate(product._id)}>💾 Save</button>
                    <button onClick={cancelEdit}>❌ Cancel</button>
                  </>
                ) : (
                  <>
                    {product.name} - ₹{product.price}
                    <button onClick={() => startEdit(product)}>✏️ Edit</button>
                    <button onClick={() => handleDelete(product._id)}>🗑️ Delete</button>
                  </>
                )}
              </li>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </ul>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
