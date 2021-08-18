const Router = require('express')
const router = new Router()
const dashboardController = require('../controller/dashboard.controller')

router.post('/dashboard/', dashboardController.createDashboard)
router.get('/dashboard', dashboardController.getDashboards)
router.get('/dashboard/:id', dashboardController.getOneDashboard)
router.delete('/dashboard/:id', dashboardController.deleteDashboard)

module.exports = router
