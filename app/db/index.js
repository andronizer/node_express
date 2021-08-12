const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)

const db = {}

const Sequelize = require('sequelize');
const sequelize = new Sequelize( {
  dialect: "postgres",
  host: "127.0.0.1",
  port: "5432",
  username: "postgres",
  password: "spasenie2021" ,
  database: "todo",
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    )
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize;
module.exports = db
console.log(db)