const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { User } = require("../app/db");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json();
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User doesn't exist" });
    }
    req.user = decoded;
  } catch (err) {
    return res.status(401).json();
  }
  return next();
};

module.exports = verifyToken;
