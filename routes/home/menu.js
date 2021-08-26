const express = require('express');
const connection = require('../../db');
const router = express.Router();

router.get('/', async (req,res,next) => {
    try {
        const menus = await sequelize.query("WITH recursive c_menu AS " +
        "(" +
        " SELECT *, 1 as CONN_LVL, convert(concat('<',menu_nm), char(100)) as MENU_TITLE_PATH,convert(ord, char(100)) as menu_ord,convert(concat(menu_nm), char(100)) as MENU_NAME" +
        "   FROM tb_menu " +
        "   WHERE menu_lvl = 1 and USE_YN = 'Y'" +
        "    AND MENU_GB = 'HOME'" +
        " UNION ALL" +
        " SELECT a.*, b.CONN_LVL + 1, concat(b.MENU_TITLE_PATH, '<', a.menu_nm),concat(b.menu_ord, '-', a.ord),b.MENU_NAME " +
        "   FROM tb_menu AS a" +
        " INNER JOIN c_menu AS b ON a.up_menu_no = b.menu_no where a.USE_YN = 'Y'" +
        "    AND a.MENU_GB = 'HOME' " +
        ")" +
        "SELECT c_menu.*,if (menu_lvl=1,ord,(select ord from tb_menu where c_menu.top_menu_no=menu_no))qwe,( SELECT count(*)" +
        "        FROM TB_MENU D" +
        "        WHERE D.use_yn  ='Y'" +
        "        AND   D.menu_gb = 'HOME'" +
        "        AND   D.top_menu_no = c_menu.top_menu_no" +
        "        AND   D.up_menu_no = c_menu.MENU_NO  " +
        "        AND  EXISTS (" +
        "                     SELECT 'X'" +
        "                     FROM   TB_USERMENU C" +
        "                     WHERE " +
        "                      D.MENU_NO = C.MENU_NO" +
        "                     UNION ALL" +
        "                     SELECT 'X'" +
        "                     FROM   DUAL" +
        "                     )" +
        "    ) as child_cnt  FROM c_menu order by  qwe, menu_ord");
        res.status(200).json(menus);
    } catch (error) {
        console.log(error);
        next(error);
    }
});
module.exports = router;