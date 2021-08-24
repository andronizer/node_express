const fs = require("fs")
const path = require("path")
const basename = path.basename(__filename)
const config = require("../../config/config")

const db = {}

const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "postgres",
  host: config.host,
  port: config.dbPort,
  username: config.username,
  password: config.password,
  database: config.database,
});

fs.readdirSync(__dirname)
  .filter(file => (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    ))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    )
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize;
module.exports = db
