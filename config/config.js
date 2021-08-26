require('dotenv').config();
module.exports = {
  development: {
    username: 'ordadata',
    password: process.env.DB_PASSWORD,
    database: 'ordadata',
    host: 'ordadata.chrq8kiglo4q.ap-northeast-2.rds.amazonaws.com',
    dialect: 'oracle',
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