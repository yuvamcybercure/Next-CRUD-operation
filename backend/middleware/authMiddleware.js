const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: user._id, iat, exp }
     console.log("Authenticated user ID:", decoded.id);
    
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
};

module.exports = { authenticateToken };
