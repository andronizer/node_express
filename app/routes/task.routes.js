const Router = require("express");
const router = new Router();
const taskController = require("../controller/task.controller");

router.post("/task", taskController.createTask);
router.get("/task", taskController.getTasks);
router.get("/task/:id", taskController.getOneTask);
router.delete("/task/:id", taskController.deleteTask);

module.exports = router;
