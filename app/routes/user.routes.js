const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')
const { Dashboard } = require('../db')
const { Task } = require('../db')

router.post('/signup', userController.createUser)
router.get('/user', userController.getUsers)
router.get('/user/:id', userController.getOneUser)
router.put('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)

router.post('/dashboard', async (req, res) => {
    const {title, tasks} = req.body
    try {
        const dashboards = await Dashboard.create({ title, tasks, 'ownerId': 1 })        
        return res.json(dashboards)
      } catch (err) {
        return res.status(500).json(err)
      }
})

router.post('/task', async (req, res) => {
  const {title, contents} = req.body
  try {
      const tasks = await Task.create({ title, contents, 'ownerId': 1 })        
      return res.json(tasks)
    } catch (err) {
      return res.status(500).json(err)
    }
})

module.exports = router