const Sequelize = require('sequelize');
const Art = require('./art');
const Board = require('./board');
const Code = require('./code');
const Menu = require('./menu');
const User = require('./user');
const Boardmgr = require('./boardmgr');
const UserMenu = require('./usermenu');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Art = Art;
db.Board = Board;
db.Code = Code;
db.Menu = Menu;
db.User = User;
db.Boardmgr = Boardmgr;
db.UserMenu = UserMenu;

Object.keys(db).forEach(modelName => {
    db[modelName].init(sequelize);
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;