const Router = require("express");
const router = new Router();
const dashboardController = require("../controller/dashboard.controller");
const auth = require("../../middleware/auth.middleware");

router.post("/dashboard", auth, dashboardController.createDashboard);
router.get("/dashboard/all", auth, dashboardController.getDashboards);
router.get("/dashboard/:id", auth, dashboardController.getOneDashboard);
router.delete("/dashboard/:id", auth, dashboardController.deleteDashboard);

router.post(
  "/dashboard/:id/user",
  auth,
  dashboardController.addUserToDashboard
);
router.delete(
  "/dashboard/:id/user",
  auth,
  dashboardController.deleteUserFromDashboard
);

module.exports = router;
