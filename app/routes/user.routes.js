const Router = require("express");
const router = new Router();
const userController = require("../controller/user.controller");

router.get("/user", userController.getUsers);
router.get("/user/:id", userController.getOneUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);
router.post("/signup", userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router;
