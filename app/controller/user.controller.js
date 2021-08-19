const { User } = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')

class UserController {
  async registerUser(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!(email && password && name)) {
        res.status(400).send('All input is required');
      }

      const oldUser = await User.findOne({
        where: { email },
      })
      if (oldUser) {
        return res.status(409).send('User Already Exist. Please Login');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      config.secret,
      {
        expiresIn: '2h',
      },
    );
    user.token = token;

    console.log(user.token)

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};
    async loginUser(req, res) {
      try {
        const { email, password } = req.body;
        if (!(email && password)) {
          res.status(400).send('All input is required');
        }

        const user = await User.findOne({
          where: { email },
        })

        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, email },
            config.secret,
            {
              expiresIn: '2h',
            },
          );

          user.token = token;

          res.status(200).json(user);
        }
        res.status(400).send('Invalid Credentials');
      } catch (err) {
        console.log(err);
      }
    };

    async getUsers(req, res) {
        try {
            const users = await User.findAll()
            return res.json(users)
          } catch (err) {
            return res.status(500).json({ error: 'Something went wrong' })
          }
    }
    async getOneUser(req, res) {
        const id = req.params.id
        try {
          const user = await User.findOne({
            where: { id },
          })

          return res.json(user)
        } catch (err) {
          return res.status(500).json({ error: 'Something went wrong' })
        }
    }
    async updateUser(req, res) {
        const id = req.params.id
        const { name, email, password } = req.body
        try {
          const user = await User.findOne({ where: { id } })

          Object.assign(user, { name, email, password })

          await user.save()

          return res.json(user)
        } catch (err) {
          return res.status(500).json({ error: 'Something went wrong' })
        }
    }
    async deleteUser(req, res) {
        const id = req.params.id
        try {
          const user = await User.findOne({ where: { id } })

          await user.destroy()

          return res.json({ message: 'User deleted!' })
        } catch (err) {
          console.log(err)
          return res.status(500).json({ error: 'Something went wrong' })
        }
    }
}

module.exports = new UserController()
