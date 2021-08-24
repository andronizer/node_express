const { Dashboard } = require("../db");

class DashboardController {
  async createDashboard(req, res) {
    const ownerId = req.user.id;
    const { title } = req.body;
    try {
      const dashboard = await Dashboard.create({ title, ownerId });
      return res.json(dashboard);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async getDashboards(req, res) {
    try {
      const dashboards = await Dashboard.findAll();
      return res.json(dashboards);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getOneDashboard(req, res) {
    const id = req.params.id;
    try {
      const dashboard = await Dashboard.findOne({
        where: { id },
      });

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
