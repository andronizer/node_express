const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401);
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401);
  }
  return next();
};

module.exports = verifyToken;
