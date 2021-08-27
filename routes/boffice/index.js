const express = require('express');
const oracledb = require('oracledb');
const dbConfig = require('../../db/dbconfig');
const { menuList } = require('../../db/boffice/menu');
const { isLoggedIn, isNotLoggedIn } = require('./loginCheck');
let conn;

const router = express.Router();

const menuRouter = require('./menu');
const authRouter = require('./auth');
const codeRouter = require('./code');
const memberRouter = require('./member');
const boardRouter = require('./board');
const boardMgrRouter = require('./boardMgr');
router.use('/auth' ,authRouter);

router.use('/', async (req,res,next) => {
    try {
        conn = await oracledb.getConnection(dbConfig);
        const menus = await conn.execute(menuList);
        const menuDetail = await conn.execute("select * from tb_menu where menu_no = 22");
        console.log(menus);
        res.app.set('menuList',menus);
        res.app.set('menuDetail',menuDetail);
        
        next();
    } catch (error) {
        console.log(error);
        next(error);
    } finally {
        if (conn) {
            await conn.close();
        }
    }
});

router.use('/menu' ,isLoggedIn ,menuRouter);
router.use('/code' ,isLoggedIn ,codeRouter);
router.use('/member' ,isLoggedIn ,memberRouter);
router.use('/board' ,isLoggedIn ,boardRouter);
router.use('/boardMgr' ,isLoggedIn ,boardMgrRouter);

router.get('/' ,isNotLoggedIn ,(req,res) => {
    res.render('boffice/index', {title: '관리자 - 로그인'});
});

module.exports = router;