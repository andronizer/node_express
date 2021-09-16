const { Dashboard, JoinedUsers } = require("../db");
const { Op } = require("sequelize");

class DashboardController {
  async createDashboard(req, res) {
    const ownerId = req.user.id;
    const { title } = req.body;
    try {
      const dashboard = await Dashboard.create({ title, ownerId });
      return res.json(dashboard);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getDashboards(req, res) {
    const userId = req.user.id;
    try {
      const dashboards = await Dashboard.findAll({
        order: [["updatedAt", "DESC"]],
      });
      const userDashboards = await JoinedUsers.findAll({
        where: { UserId: userId },
      });
      const currentDashboards = dashboards.map((dashboard) => {
        const isJoined = userDashboards.find(
          (el) => el.DashboardId === dashboard.id
        );
        const result = { ...dashboard.toJSON(), joined: !!isJoined };
        return result;
      });
      return res.json(currentDashboards);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getOneDashboard(req, res) {
    const id = req.params.id;
    try {
      const dashboard = await Dashboard.findByPk(id);

      return res.json(dashboard);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async deleteDashboard(req, res) {
    const id = req.params.id;
    try {
      const dashboard = await Dashboard.findOne({ where: { id } });

      await dashboard.destroy();

      return res.json({ message: "Dashboard deleted!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}

module.exports = new DashboardController();
