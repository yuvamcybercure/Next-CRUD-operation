// import { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function CreateProduct() {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [products, setProducts] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [editPrice, setEditPrice] = useState("");

//   // ✅ Create Product
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:9000/api/products", {
//         name: name.trim(),
//         price: Number(price),
//       });

//       if (res.data?.product) {
//         toast.success("✅ Product created");
//         setName("");
//         setPrice("");
//         fetchProducts();
//       } else {
//         toast.error("❌ Failed to create product");
//       }
//     } catch (err) {
//       toast.error("❌ " + (err.response?.data?.message || "Error creating product"));
//     }
//   };

//   // ✅ Fetch all products
//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:9000/api/products");
//       setProducts(res.data.products || []);
//     } catch (err) {
//       toast.error("❌ Failed to fetch products");
//     }
//   };

//   // ✅ Delete Product
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:9000/api/products/${id}`);
//       toast.success("🗑️ Product deleted");
//       fetchProducts();
//     } catch (err) {
//       toast.error("❌ Error deleting product");
//     }
//   };

//   // ✅ Start Editing
//   const startEdit = (product) => {
//     setEditingId(product._id);
//     setEditName(product.name);
//     setEditPrice(product.price);
//   };

//   // ✅ Cancel Editing
//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditName("");
//     setEditPrice("");
//   };

//   // ✅ Save Edited Product
//   const handleUpdate = async (id) => {
//     try {
//       const res = await axios.put(`http://localhost:9000/api/products/${id}`, {
//         name: editName.trim(),
//         price: Number(editPrice),
//       });

//       if (res.data?.product) {
//         toast.success("✏️ Product updated");
//         cancelEdit();
//         fetchProducts();
//       } else {
//         toast.error("❌ Update failed");
//       }
//     } catch (err) {
//       toast.error("❌ " + (err.response?.data?.message || "Error updating product"));
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <>
//       <div style={{ padding: "2rem" }}>
//         <h1>Create Product</h1>
//         <form onSubmit={handleSubmit}>
//           <div style={{ marginBottom: "1rem" }}>
//             <label>Product Name:</label><br />
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           <div style={{ marginBottom: "1rem" }}>
//             <label>Price:</label><br />
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//             />
//           </div>

//           <button type="submit">Create</button>
//         </form>

//         <hr style={{ margin: "2rem 0" }} />

//         <h2>All Products</h2>
//         <ul>
//           {Array.isArray(products) && products.length > 0 ? (
//             products.map((product) => (
//               <li key={product._id}>
//                 {editingId === product._id ? (
//                   <>
//                     <input
//                       type="text"
//                       value={editName}
//                       onChange={(e) => setEditName(e.target.value)}
//                       required
//                     />
//                     <input
//                       type="number"
//                       value={editPrice}
//                       onChange={(e) => setEditPrice(e.target.value)}
//                       required
//                     />
//                     <button onClick={() => handleUpdate(product._id)}>💾 Save</button>
//                     <button onClick={cancelEdit}>❌ Cancel</button>
//                   </>
//                 ) : (
//                   <>
//                     {product.name} - ₹{product.price}
//                     <button onClick={() => startEdit(product)}>✏️ Edit</button>
//                     <button onClick={() => handleDelete(product._id)}>🗑️ Delete</button>
//                   </>
//                 )}
//               </li>
//             ))
//           ) : (
//             <p>No products available.</p>
//           )}
//         </ul>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </>
//   );
// }


//REGISTER THE USER 
// import { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function RegisterUser() {
//   const [formData, setFormData] = useState({
//     name: "",
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:9000/api/auth/register", formData);
//       toast.success(res.data.message || "✅ Registered successfully");

//       // Clear form
//       setFormData({ name: "", username: "", email: "", password: "" });
//     } catch (err) {
//       toast.error(err.response?.data?.error || "❌ Failed to register user");
//     }
//   };

//   return (
//     <>
//       <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
//         <h2>Register</h2>
//         <form onSubmit={handleRegister}>
//           <div style={{ marginBottom: "1rem" }}>
//             <label>Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div style={{ marginBottom: "1rem" }}>
//             <label>Username:</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div style={{ marginBottom: "1rem" }}>
//             <label>Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div style={{ marginBottom: "1rem" }}>
//             <label>Password:</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button type="submit">Register</button>
//         </form>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </>
//   );
// }

//LOGIN THE USER 
// import { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function AuthPage() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     username: "",
//     email: "",
//     password: "",
//   });

//   const [loginData, setLoginData] = useState({
//     identifier: "",
//     password: "",
//   });

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:9000/api/auth/register", formData);
//       toast.success(res.data.message || "User registered successfully");
//       setFormData({ name: "", username: "", email: "", password: "" });
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Failed to register user");
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:9000/api/auth/login", loginData);
//       toast.success(res.data.message || "Login successful");
//       localStorage.setItem("token", res.data.token); // Save token if needed
//     } catch (err) {
//       toast.error(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>{showLogin ? "Login" : "Register"}</h1>

//       {showLogin ? (
//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Email or Username"
//             value={loginData.identifier}
//             onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
//             required
//           />
//           <br />
//           <input
//             type="password"
//             placeholder="Password"
//             value={loginData.password}
//             onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//             required
//           />
//           <br />
//           <button type="submit">Login</button>
//         </form>
//       ) : (
//         <form onSubmit={handleRegister}>
//           <input
//             type="text"
//             placeholder="Name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             required
//           />
//           <br />
//           <input
//             type="text"
//             placeholder="Username"
//             value={formData.username}
//             onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//             required
//           />
//           <br />
//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             required
//           />
//           <br />
//           <input
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             required
//           />
//           <br />
//           <button type="submit">Register</button>
//         </form>
//       )}

//       <br />
//       <button onClick={() => setShowLogin(!showLogin)}>
//         {showLogin ? "Switch to Register" : "Switch to Login"}
//       </button>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }


//STORE THE TOKEN LOCALY AND CHECK WITH MIDDLEWARE
import { useState, useEffect } from "react";
import axios from "axios";

export default function AuthPage() {
  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); // to store user info
  const [token, setToken] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:9000/api/auth/login", {
        identifier,
        password,
      });

      const jwtToken = res.data.token;

      localStorage.setItem("token", jwtToken);
      setToken(jwtToken);

      fetchUserInfo(jwtToken);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed: " + (err.response?.data?.error || err.message));
    }
  };

  const fetchUserInfo = async (jwtToken) => {
    try {
      const res = await axios.get("http://localhost:9000/api/user/me", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      setUser(res.data.user);
    } catch (err) {
      console.error("Failed to fetch user info", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchUserInfo(savedToken);
    }
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Username or Email:</label><br />
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {user && (
        <div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
          <h2>Welcome, {user.name}!</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}
    </div>
  );
}
