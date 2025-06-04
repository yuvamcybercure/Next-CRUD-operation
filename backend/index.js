const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const productRoutes = require("./routes/crud");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");


const app = express();
app.use(cors());
app.use(express.json());

app.use(logger);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB Error:", err));

app.use("/api/", productRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
