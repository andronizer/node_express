const { User } = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')

class UserController {
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
    async userRegistration(req, res) {
      const { name, email, password } = req.body;

      const userAlreadyExists = await User.findOne({ where: { email } })
        .catch(err => console.log('Error', err));

      if (userAlreadyExists) {
        return res.json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      console.log(newUser);
      if (newUser) {
        return res.json({ message: 'Registered' });
      }
      return res.json(newUser);
    }
    async userLogin(req, res) {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } })
        .catch(err => console.log('Error', err));
      if (!user) {
        return res.json({ message: 'Email or password doesn\'t match' });
      }
      if (await bcrypt.compare(password, user.password)) {
        const jwtToken = jwt.sign({
          id: user.id,
          email: user.email,
        }, config.secret, { expiresIn: '2h' });
        return res.json({ message: 'Welcome!', token: jwtToken });
      }
      return res.send('Try again');
    }
}

module.exports = new UserController()
