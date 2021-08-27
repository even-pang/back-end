const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./loginCheck');
const oracledb = require('oracledb');
const dbconfig = require('../../db/dbconfig');
const conn = oracledb.getConnection(dbconfig);

const router = express.Router();

router.post('/login', isNotLoggedIn,(req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            return res.redirect(`/boffice?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if(loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/boffice/board/boardList?brd_mgrno=226&menu_no=740');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.user;
    console.info(req.user);
    req.logOut();
    req.session.destroy();
    console.info(req.user);
    res.redirect('/boffice?loginError=로그아웃 되었습니다.');
})

module.exports = router;