const express = require('express');
const multer = require('multer');
const connection = require('../../db');
const router = express.Router();
const paging = require('./adminPaging');


router.route('/menuList')
    .get(async (req,res,next) => {
    try {
        let pageNum = req.query.page_now; // 요청 페이지 넘버
        let offset = 0;

        if(pageNum > 1){
            offset = 10 * (pageNum - 1);
        }

        const menus = await Menu.findAndCountAll({
            where : {
                up_menu_no : req.query.up_menu_no == undefined? '0':req.query.up_menu_no, 
                menu_gb : req.query.menu_gb == undefined? 'ADMIN':req.query.menu_gb,
            },
            order: [['ORD', 'ASC']],
            // pagination
            offset: offset,
            limit: 10
        });
        res.render('boffice/menu/menuList', {
            title: '관리자 - 메뉴관리',
            querys: req.query,
            list: menus.rows,
            count: menus.count,
            menuList:res.app.get('menuList'),
            menuDetail:res.app.get('menuDetail'),
            menu_no:res.app.get('menuDetail').menu_no,
            returl: req.baseUrl+req.path,
            param : req.originalUrl.substring((req.baseUrl+req.path).length+1),
            paging: paging(req.baseUrl+req.path, menus.count, req.query.page_now==undefined?'1':req.query.page_now, req.originalUrl.substring((req.baseUrl+req.path).length+1), 10, 10),
        });
        console.log(req.query);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.route('/menuWrite')
.post(async (req,res,next) => {
    try {
        const menuDetail = await Menu.findOne({where:{menu_no: req.body.menu_no}});
        const boardMgrList = await Boardmgr.findAll({
            attributes: ['brd_mgrno', 'brd_nm'], 
            where: {use_yn : 'Y'},
        });
        let iflag = 'INSERT';
        if(menuDetail) iflag = 'UPDATE';
        res.render('boffice/menu/menuWrite', {
            title: '관리자 - 메뉴관리',
            detail : menuDetail,
            boardMgrList : boardMgrList,
            iflag : iflag,
            querys : req.body,
            param : req.body.param,
            returl : req.body.returl,
            menuList:res.app.get('menuList'),
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
})

const upload = multer();

router.route('/menuWork')
.post(upload.none(), async (req,res,next) => {
    try {
        const menuDetail = await Menu.findOne({where:{menu_no: req.body.up_menu_no}});
        const nextNum = await sequelize.query('select max(menu_no)+1 as next from tb_menu');
        const result = Menu.create({
            menu_no : nextNum[0][0].next,
            menu_nm : req.body.menu_nm ,
            menu_gb : req.body.menu_gb ,
            menu_url : req.body.menu_url ,
            use_yn : req.body.use_yn ,
            ord : req.body.ord ,
            menu_lvl : menuDetail == undefined ? 1 : menuDetail.menu_lvl + 1 ,
            top_menu_no : menuDetail == undefined ? nextNum[0][0].next : menuDetail.top_menu_no ,
            full_menu_no : (menuDetail == undefined ? '' : menuDetail.full_menu_no) + nextNum[0][0].next + ',' ,
            up_menu_no : req.body.up_menu_no == '' ? 0 : req.body.up_menu_no,
            menu_fmt_cd : req.body.menu_fmt_cd ,
            url_target : req.body.url_target ,
            brd_mgrno : req.body.brd_mgrno | null,
            menu_desc : req.body.menu_desc ,
        });
        res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
})
.patch(upload.none(), async (req,res,next) => {
    try {
        //menuDetail = await Menu.findOne({where:{menu_no: req.body.menu_no}});
        const result = Menu.update({
            menu_nm : req.body.menu_nm ,
            menu_url : req.body.menu_url ,
            use_yn : req.body.use_yn ,
            ord : req.body.ord ,
            url_target : req.body.url_target ,
            brd_mgrno : req.body.brd_mgrno | null,
            menu_desc : req.body.menu_desc ,
            //reg_dt : menuDetail.reg_dt,
        },{
            where : {menu_no :req.body.menu_no},
        });
        res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
})
.delete(async (req, res, next) => {
    try {
        const result1 = await Menu.destroy({where:{up_menu_no:req.body.menu_no}});
        const result2 = await Menu.destroy({where:{menu_no:req.body.menu_no}});
        res.send((result1 + result2) == 1 ? 'delete complete':'error');
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;