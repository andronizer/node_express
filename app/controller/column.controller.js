const { Column } = require("../db");

class ColumnController {
  async createColumn(req, res) {
    const boardId = req.params.boardId;
    const { title } = req.body;
    try {
      const column = await Column.create({ title, boardId });
      return res.json(column);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getColumns(req, res) {
    try {
      const boardId = req.params.boardId;
      const columns = await Column.findAll({ where: { boardId } });
      return res.json(columns);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async getOneColumn(req, res) {
    const id = req.params.id;
    try {
      const column = await Column.findOne({
        where: { id },
      });

      return res.json(column);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  async updateColumn(req, res) {
    const id = req.params.id;
    const { title } = req.body;
    try {
      const column = await Column.findOne({ where: { id } });

      Object.assign(column, { title });

      await column.save();

      return res.json(column);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}

module.exports = new ColumnController();
