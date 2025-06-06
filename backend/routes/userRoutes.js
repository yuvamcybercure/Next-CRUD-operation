// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { getUserInfo } = require("../Controllers/userController2");
const { authenticateToken } = require("../middleware/authMiddleware");

router.get("/me", authenticateToken, getUserInfo);

module.exports = router;
