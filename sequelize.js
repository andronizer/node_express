require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT,
  },
};
