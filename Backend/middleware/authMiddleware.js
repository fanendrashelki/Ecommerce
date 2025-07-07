import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  let token = req.cookies.token;

  // Fallback to Authorization header if no token in cookies
  const authHeader = req.headers.authorization;

  if (!token && authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // Extract token
  }

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
        error: true,
        success: false,
      });
    }
    next();
  };
};
