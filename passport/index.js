const passport = require('passport');
const local = require('./local');
const oracledb = require('oracledb');
const dbConfig = require('../db/dbconfig');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
let conn;

module.exports = () => {
    passport.serializeUser((user, done) => {
        console.log(user);
        done(null, user["USER_ID"]);
    });

    passport.deserializeUser(async (user_id,done) => {
        conn = await oracledb.getConnection(dbConfig);
        /*const exUser = await conn.execute(`select * from tb_user where user_id = ${user_id}`)
            .then(user => done(null, user))
            .catch(err => done(err));*/
    });

    local();
};