require('dotenv').config();



module.exports = {
  development: {
    username: 'dolee',
    password: process.env.DB_PASSWORD,
    database: 'tatooCok',
    host: '125.180.255.26',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'tatooCok',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'tatooCok',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};