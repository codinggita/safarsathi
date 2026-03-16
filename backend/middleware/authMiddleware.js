const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, user not found");
    }

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      res.status(401);
      return next(new Error("Not authorized, invalid token"));
    }
    if (error.name === "TokenExpiredError") {
      res.status(401);
      return next(new Error("Not authorized, token expired"));
    }
    next(error);
  }
};

module.exports = protect;
