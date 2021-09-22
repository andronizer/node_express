const { Task } = require("../db");

class TaskController {
  async createTask(req, res) {
    const columnId = req.params.columnId;
    const { title } = req.body;
    try {
      const task = await Task.create({ title, columnId });
      return res.json(task);
    } catch (err) {
      console.log("err: ", err);
      return res.status(500).json({ error: "Column doesn't exist" });
    }
  }
  async getTasks(req, res) {
    try {
      const columnId = req.params.columnId;
      const tasks = await Task.findAll({ where: { columnId } });
      return res.json(tasks);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getOneTask(req, res) {
    const id = req.params.id;
    try {
      const task = await Task.findByPk(id);

      return res.json(task);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async deleteTask(req, res) {
    const id = req.params.id;
    try {
      const task = await Task.findOne({ where: { id } });

      await task.destroy();

      return res.json({ message: "Task deleted!" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}

module.exports = new TaskController();
