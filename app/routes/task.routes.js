const Router = require("express");
const router = new Router();
const taskController = require("../controller/task.controller");

router.post("/:columnId/task", taskController.createTask);
router.get("/:columnId/task", taskController.getTasks);
router.get("/task/:id", taskController.getOneTask);
router.delete("/task/:id", taskController.deleteTask);

module.exports = router;
