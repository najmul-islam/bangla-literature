const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Token validation function
const verifyToken = async (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select("-password");
    return user;
  }
  throw new Error("Not authorized, no token");
};

// Role-based access control middleware
const authorizeRole = (roles) =>
  asyncHandler(async (req, res, next) => {
    try {
      const user = await verifyToken(req);
      if (user && roles.includes(user.role)) {
        req.user = user;
        next();
      } else {
        res.status(401);
        throw new Error(
          "You do not have the permission to perform this action"
        );
      }
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  });

// Middleware functions for different roles
const isUser = authorizeRole(["user", "subscriber", "moderator", "admin"]);
const isSubscriber = authorizeRole(["subscriber", "moderator", "admin"]);
const isModerator = authorizeRole(["moderator", "admin"]);
const isAdmin = authorizeRole(["admin"]);

module.exports = { isUser, isSubscriber, isModerator, isAdmin };
