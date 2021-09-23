const { Dashboard, UserDashboard, Column, Task } = require("../db");

class DashboardController {
  async createDashboard(req, res) {
    const ownerId = req.user.id;
    const { title } = req.body;
    try {
      const dashboard = await Dashboard.create({ title, ownerId });
      await UserDashboard.create({
        DashboardId: dashboard.id,
        UserId: ownerId,
      });
      return res.json({ ...dashboard.toJSON(), joined: true, isOwner: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getDashboards(req, res) {
    const userId = req.user.id;
    try {
      const dashboards = await Dashboard.findAll({
        order: [["updatedAt", "DESC"]],
        include: {
          model: Column,
          as: "columns",
          include: {
            model: Task,
            as: "tasks",
          },
        },
      });

      const userDashboards = await UserDashboard.findAll({
        where: { UserId: userId },
      });

      const currentDashboards = dashboards.map((dashboard) => {
        const isJoined = userDashboards.find(
          (el) => el.DashboardId === dashboard.id
        );
        const result = {
          ...dashboard.toJSON(),
          joined: !!isJoined,
          isOwner: dashboard.ownerId === userId,
        };
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
  async addUserToDashboard(req, res) {
    const dashboardId = req.params.id;
    const userId = req.user.id;
    try {
      const userDashboard = await UserDashboard.count({
        where: { DashboardId: dashboardId, UserId: userId },
      });
      if (userDashboard > 0) {
        return res.json(true);
      }
      const newUserDashboard = await UserDashboard.create({
        DashboardId: dashboardId,
        UserId: userId,
      });
      return res.json(newUserDashboard);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async deleteUserFromDashboard(req, res) {
    const dashboardId = req.params.id;
    const userId = req.user.id;
    try {
      const joinedUser = await UserDashboard.count({
        where: { DashboardId: dashboardId, UserId: userId },
      });

      if (joinedUser > 0) {
        UserDashboard.destroy({
          where: { DashboardId: dashboardId, UserId: userId },
        });
      }
      return res.json({ message: "Unjoined!" });
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}

module.exports = new DashboardController();
