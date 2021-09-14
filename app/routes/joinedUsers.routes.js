const Router = require("express");
const router = new Router();
const joinedUsersController = require("../controller/joinedUsers.controller");
const auth = require("../../middleware/auth.middleware");

router.post("/joinedUsers", auth, joinedUsersController.createJoinedUsers);
router.post("/verifyJoinedUser", auth, joinedUsersController.verifyJoinedUser);
router.get("/joinedUsers", auth, joinedUsersController.getJoinedUsers);
router.get("/joinedUser", auth, joinedUsersController.getJoinedUser);
router.get("/myJoinedBoards", auth, joinedUsersController.getMyJoinedBoards);
router.delete("/unjoinUser", auth, joinedUsersController.deleteJoinedUser);

module.exports = router;
