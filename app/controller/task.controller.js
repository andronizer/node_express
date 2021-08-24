const { Task } = require("../db");

class TaskController {
  async createTask(req, res) {
    const { title } = req.body;
    try {
      const task = await Task.create({ title });
      return res.json(task);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  async getTasks(req, res) {
    try {
      const tasks = await Task.findAll();
      return res.json(tasks);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getOneTask(req, res) {
    const id = req.params.id;
    try {
      const task = await Task.findOne({
        where: { id },
      });

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
