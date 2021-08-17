const { User } = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()

const jwtGenerator = (id, name, email, password) => {
    return jwt.sign({id, name, email, password}, process.env.SECRET_TOKEN, {expiresIn:'24h'})
}

class UserController {
    async createUser(req, res) {        
        const {name, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 8)
        try {
            const user = await User.create({ name, email, password: hashedPassword })  
            const token = jwtGenerator(user.id, user.name, user.email, user.password)
            return res.json({token}
          )
        } catch (err) {
            return res.status(500).json(err)
          }
    }
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
            where: { id }
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
