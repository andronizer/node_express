require('dotenv').config();

module.exports = {
    dialect: 'postgres',
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dbPort: process.env.DB_PORT,
    port: process.env.PORT,
    secret: process.env.SECRET_TOKEN,
};
