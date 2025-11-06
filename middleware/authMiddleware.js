import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  //  Get token from header
  const token = req.header("Authorization")?.replace("Bearer ", "");

  //  If no token found
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    //  Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET); // or JWT_SECRET if you use that
    req.user = decoded; // decoded contains the payload from jwt.sign()
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};
