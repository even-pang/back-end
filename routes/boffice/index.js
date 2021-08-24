const express = require('express');
const { sequelize } = require('../../models');
const { isLoggedIn, isNotLoggedIn } = require('./loginCheck');
const { Menu } = require('../../models');

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
        const menus = await sequelize.query("WITH recursive c_menu AS " +
        "(" +
        " SELECT *, 1 as CONN_LVL, convert(concat('<',menu_nm), char(100)) as MENU_TITLE_PATH,convert(ord, char(100)) as menu_ord" +
        "   FROM tb_menu " +
        "   WHERE menu_lvl = 1 and USE_YN = 'Y'" +
        "    AND MENU_GB = 'ADMIN'" +
        " UNION ALL" +
        " SELECT a.*, b.CONN_LVL + 1, concat(b.MENU_TITLE_PATH, '<', a.menu_nm),concat(b.menu_ord, '-', a.ord) " +
        "   FROM tb_menu AS a" +
        " INNER JOIN c_menu AS b ON a.up_menu_no = b.menu_no where a.USE_YN = 'Y'" +
        "    AND a.MENU_GB = 'ADMIN' " +
        ")" +
        "SELECT c_menu.*,if (menu_lvl=1,ord,(select ord from tb_menu where c_menu.top_menu_no=menu_no))qwe,( SELECT count(*)" +
        "        FROM TB_MENU D" +
        "        WHERE D.use_yn  ='Y'" +
        "        AND   D.menu_gb = 'ADMIN'" +
        "        AND   D.top_menu_no = c_menu.top_menu_no" +
        "        AND   D.up_menu_no = c_menu.MENU_NO  " +
        "        AND  EXISTS (" +
        "                     SELECT 'X'" +
        "                     FROM   TB_USERMENU C" +
        "                     WHERE  USER_ID =  'admin'" +
        "                     AND    D.MENU_NO = C.MENU_NO" +
        "                     UNION ALL" +
        "                     SELECT 'X'" +
        "                     FROM   DUAL" +
        "                     WHERE  'ADMIN' =  'ADMIN')" +
        "    ) as child_cnt  FROM c_menu order by qwe, menu_ord");
        const menuDetail = await Menu.findOne({
            where:{menu_no:req.query.menu_no==undefined?req.body.menu_no==undefined?"0":req.body.menu_no:req.query.menu_no},
        });
        res.app.set('menuList',menus);
        res.app.set('menuDetail',menuDetail);

        next();
    } catch (error) {
        console.log(error);
        next(error);
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