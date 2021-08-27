const express = require('express');
const oracledb = require('oracledb');
const dbconfig = require('../../db/dbconfig');
const conn = oracledb.getConnection(dbconfig);
const multer = require('multer');
const bcrypt = require('bcrypt');
const paging = require('./adminPaging');
const router = express.Router();

router.route('/memberList')
    .get(async (req,res,next) => {
    try {
        let pageNum = req.query.page_now; // 요청 페이지 넘버
        let offset = 0;

        if(pageNum > 1){
            offset = 10 * (pageNum - 1);
        }

        const users = await User.findAndCountAll({
            where :{use_yn :'Y'},
            order: [['reg_dt','asc']],
            offset: offset,
            limit: 10
        });
        res.render('boffice/member/memberList', {
            title: '관리자 - 회원리스트',
            querys: req.query,
            list: users.rows,
            count: users.count,
            menuList:res.app.get('menuList'),
            menuDetail:res.app.get('menuDetail'),
            returl: req.baseUrl+req.path,
            param : req.originalUrl.substring((req.baseUrl+req.path).length+1),
            paging: paging(req.baseUrl+req.path, users.count, req.query.page_now==undefined?'1':req.query.page_now, req.originalUrl.substring((req.baseUrl+req.path).length+1), 10, 10),
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});


router.route('/memberWrite')
.post(async (req,res,next) => {
    try {
        const userDetail = await User.findOne({where:{user_id: req.body.user_id}});
        let iflag = 'INSERT';
        if(userDetail) iflag = 'UPDATE';
        res.render('boffice/member/memberWrite', {
            title: '관리자 - 회원수정',
            detail : userDetail,
            iflag : iflag,
            querys : req.body.param,
            returl : req.body.returl,
            menuList:res.app.get('menuList'),
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
})

const upload = multer();

router.route('/memberWork')
.patch(upload.none(), async (req,res,next) => {
    try {
        let chpwd= req.body.pwd;
        let target = {
            telno : req.body.telno ,
            user_type : req.body.user_type ,
            use_yn : req.body.use_yn ,
            nick_nm : req.body.nick_nm ,
            gender : req.body.gender_mw,
            mod_dt : moment().add('9','h').format('YYYY-MM-DD HH:mm:ss'),
        }
        chpwd == undefined || chpwd == ''?'' :  target.pwd = await bcrypt.hash(req.body.pwd, 12) ;

        
        const result = User.update(target,{
            where : {user_id :req.body.user_id},
        });
        res.send(result);
    } catch (error) {
        console.error(error);
        next(error);
    }
})


router.route('/studioList')
    .get(async (req,res,next) => {
    try {
        let pageNum = req.query.page_now; // 요청 페이지 넘버
        let offset = 0;

        if(pageNum > 1){
            offset = 10 * (pageNum - 1);
        }
        const users = await Customer.findAll({
            where : {use_yn : 'Y'},
            include :{
                model : User,
                where : {use_yn : 'Y'}        
        },
            order: [['reg_dt','asc']],
            offset: offset,
            limit: 10
        });
        res.render('boffice/member/studioList', {
            title: '관리자 - 스튜디오리스트',
            querys: req.query,
            list: users.rows,
            count: users.count,
            menuList:res.app.get('menuList'),
            menuDetail:res.app.get('menuDetail'),
            returl: req.baseUrl+req.path,
            param : req.originalUrl.substring((req.baseUrl+req.path).length+1),
            paging: paging(req.baseUrl+req.path, users.count, req.query.page_now==undefined?'1':req.query.page_now, req.originalUrl.substring((req.baseUrl+req.path).length+1), 10, 10),
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});




module.exports = router;