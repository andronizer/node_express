const { User } = require("../db");
const bcrypt = require("bcrypt");
const { bcryptHash, generateToken } = require("../../utils");

class UserController {
  async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({
        where: { email },
      });
      if (existingUser) {
        return res
          .status(409)
          .json({ error: "User with such email already exists" });
      }

      const hashedPassword = await bcryptHash(password);

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      });

      const token = generateToken(user.id, user.email);

      res.status(201).json({ user, token });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({ message: "Incorrect" });
      }

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user.id, user.email);

        return res.status(201).json({ token });
      }
      return res.status(400).json();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getOneUser(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findByPk(id);

      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }

  async updateUser(req, res) {
    const id = req.params.id;
    const { name, email, password } = req.body;
    try {
      const user = await User.findOne({ where: { id } });

      Object.assign(user, { name, email, password });

      await user.save();

      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findOne({ where: { id } });

      await user.destroy();

      return res.json({ message: "User deleted!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}

module.exports = new UserController();
