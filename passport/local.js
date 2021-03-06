const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const oracledb = require('oracledb');
const dbConfig = require('../db/dbconfig');
let conn;

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'user_id',
        passwordField: 'user_pw',
    }, async (user_id, user_pw, done) => {
        try {
            conn = await oracledb.getConnection(dbConfig);
            const exUser = await conn.execute(`select * from tb_user where user_id = '${user_id}'`);
            if(exUser.rows[0]) {
                const result = await bcrypt.compare(user_pw, exUser.rows[0]["PWD"]);
                if(result) done(null, exUser.rows[0]);
                else done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
            } else {
                done(null, false, {message: '가입되지 않은 회원입니다.'});
            }
        } catch (error) {
            console.error(error);
            done(error);       
        }
    }))
}