const db = require('../db')

class UserController {
    async createUser(req, res) {
        const {name, description} = req.body
        const newPerson = await db.query(`INSERT INTO users (id, name, description) values (DEFAULT, '${name}', '${description}') RETURNING *`, {type: db.QueryTypes.INSERT})        
        res.json(newPerson[0][0])
    }
    async getUsers(req, res) {        
        const users = await db.query('SELECT * from users')      
        res.json(users[0])
    }
    async getOneUser(req, res) {
        
    }
    async updateUser(req, res) {
        
    }
    async deleteUser(req, res) {
        
    }
}

module.exports = new UserController()
