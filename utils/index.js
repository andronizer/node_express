const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const bcryptHash = async (password) => bcrypt.hash(password, 10);

const generateToken = (id, email) =>
  jwt.sign({ id, email }, config.secret, { expiresIn: "2h" });

module.exports = {
  bcryptHash,
  generateToken,
};
