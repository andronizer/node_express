const { JoinedUsers } = require("../db");

class JoinedUsersController {
  async getJoinedUsers(req, res) {
    try {
      const joinedUsers = await JoinedUsers.findAll();
      return res.json(joinedUsers);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async createJoinedUsers(req, res) {
    const DashboardId = req.body.DashboardId;
    const UserId = req.user.id;
    try {
      const joinedUsers = await JoinedUsers.count({
        where: { DashboardId: DashboardId, UserId: UserId },
      });
      if (joinedUsers > 0) {
        return res.json(true);
      }
      const newJoinedUsers = await JoinedUsers.create({ DashboardId, UserId });
      return res.json(newJoinedUsers);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async verifyJoinedUser(req, res) {
    const DashboardId = req.body.DashboardId;
    const UserId = req.user.id;
    const DashboardOwnerId = req.body.DashboardOwnerId;
    if (UserId === DashboardOwnerId) {
      return res.json(true);
    }
    try {
      const joinedUsers = await JoinedUsers.count({
        where: { DashboardId: DashboardId, UserId: UserId },
      });
      return res.json(joinedUsers);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async deleteJoinedUser(req, res) {
    const DashboardId = req.body.DashboardId;
    const UserId = req.user.id;
    try {
      const joinedUser = await JoinedUsers.count({
        where: { DashboardId: DashboardId, UserId: UserId },
      });
      if (joinedUser > 0) {
        JoinedUsers.destroy({
          where: { DashboardId: DashboardId, UserId: UserId },
        });
        return res.json({ message: "Unjoined!" });
      }
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}

module.exports = new JoinedUsersController();
