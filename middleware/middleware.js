const jwt = require("jsonwebtoken");
const authService = require("../services/authenticationService");

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  // If no token, redirect to login
  if (!token) {
    res.clearCookie("jwt");
    return res.redirect("/login"); // if there is not token fetched we redirect to login route
  }

  try {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    if (!decoded || !decoded.userId) {
      throw new Error("Invalid or expired token");
    }

    const user = await authService.getUserById(decoded.userId);
    if (!user) {
      throw new Error("User not found");
    }
    //here I set the user object to request
    req.user = user;
    return next();
  } catch (err) {
    console.error("Authentication error:", err.message);
    res.clearCookie("jwt");
    return res.redirect("/login");
  }
};

module.exports = requireAuth;