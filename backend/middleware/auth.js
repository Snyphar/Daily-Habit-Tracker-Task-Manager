const jwt = require("jsonwebtoken");

const JWT_SECRET = "supersecretkey";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Remove "Bearer " prefix
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
