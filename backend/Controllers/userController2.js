// controllers/userAuthController.js
const User = require("../models/userModel");

const getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name username email");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user info" });
  }
};

module.exports = { getUserInfo };
