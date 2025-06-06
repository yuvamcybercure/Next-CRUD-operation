const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// Import routes and middleware
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/crud");
const filteredProductRoutes = require("./routes/filteredProductRoutes");
const { authenticateToken } = require("./middleware/authMiddleware");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Public Auth Routes
app.use("/api/auth", authRoutes); // /api/auth/register, /api/auth/login

// Protected Routes (only accessible with valid token)
app.use("/api/products", authenticateToken, productRoutes);

// Optional: Public Filtered Route (change if needed)
app.use("/api/filtered", filteredProductRoutes);

//user information
app.use("/api/user", userRoutes);

// Start Server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
