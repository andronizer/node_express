const Router = require("express");
const router = new Router();
const columnController = require("../controller/column.controller");

router.post("/dashboard/:boardId/column", columnController.createColumn);
router.get("/dashboard/:boardId/column", columnController.getColumns);
router.get("/dashboard/:boardId/column/:id", columnController.getOneColumn);
router.put("/dashboard/:boardId/column/:id", columnController.updateColumn);

module.exports = router;
