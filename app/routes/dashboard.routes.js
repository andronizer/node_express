const Router = require("express");
const router = new Router();
const dashboardController = require("../controller/dashboard.controller");
const auth = require("../../middleware/auth.middleware");

router.post("/dashboard", auth, dashboardController.createDashboard);
router.get("/dashboard/all", auth, dashboardController.getDashboards);
router.post("/myDashboards/", auth, dashboardController.getMyDashboards);
router.get("/dashboard/:id", auth, dashboardController.getOneDashboard);
router.delete("/dashboard/:id", auth, dashboardController.deleteDashboard);

module.exports = router;
