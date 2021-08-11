// const Pool = require('pg').Pool;
// const pool = new Pool( {
//     dialect: "postgres",
//     host: "127.0.0.1",
//     port: "5432",
//     username: "postgres",
//     password: "spasenie2021" ,
//     database: "todo"
//   });

// module.exports = pool

const Sequelize = require('sequelize');
const sequelize = new Sequelize( {
    dialect: "postgres",
    host: "127.0.0.1",
    port: "5432",
    username: "postgres",
    password: "spasenie2021" ,
    database: "todo",
  });

module.exports = sequelize