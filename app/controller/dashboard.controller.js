const { Dashboard } = require("../db");
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
    try {
      const dashboards = await Dashboard.findAll({
        order: [["createdAt", "DESC"]],
      });
      return res.json(dashboards);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getMyDashboards(req, res) {
    const boardId = req.body;
    const ownerId = req.user.id;
    try {
      const dashboards = await Dashboard.findAll({
        where: { [Op.or]: { ownerId, id: boardId } },
      });
      return res.json(dashboards);
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
