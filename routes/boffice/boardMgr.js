const express = require('express');
const oracledb = require('oracledb');
const dbconfig = require('../../db/dbconfig');
const conn = oracledb.getConnection(dbconfig);
const multer = require('multer');
const router = express.Router();
const paging = require('./adminPaging');
const moment = require('moment');


router.route('/boardMgrList')
    .get(async (req,res,next) => {
    try {
        let pageNum = req.query.page_now; // 요청 페이지 넘버
        let offset = 0;

        if(pageNum > 1){
            offset = 10 * (pageNum - 1);
        }

        const boardMgr = await Boardmgr.findAndCountAll({
            where : {
                //up_menu_no : req.query.up_menu_no == undefined? '0':req.query.up_menu_no, 
                //menu_gb : req.query.menu_gb == undefined? 'ADMIN':req.query.menu_gb,
            },
            order: [['brd_mgrno', 'ASC']],
            offset: offset,
            limit: 10
        });
        res.render('boffice/boardmgr/boardMgrList', {
            title: '관리자 - 게시판관리',
            querys: req.query,
            list: boardMgr.rows,
            count: boardMgr.count,
            menuList:res.app.get('menuList'),
            menuDetail:res.app.get('menuDetail'),
            menu_no:res.app.get('menuDetail').menu_no,
            returl: req.baseUrl+req.path,
            param : req.originalUrl.substring((req.baseUrl+req.path).length+1),
            paging: paging(req.baseUrl+req.path, boardMgr.count, req.query.page_now==undefined?'1':req.query.page_now, req.originalUrl.substring((req.baseUrl+req.path).length+1), 10, 10),
        });
        console.log(req.query);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.route('/boardMgrWrite')
.post(async (req,res,next) => {
    try {
        const boardMgrDetail = await Boardmgr.findOne({where:{brd_mgrno: req.body.brd_mgrno}});
        let iflag = 'INSERT';
        if(boardMgrDetail) iflag = 'UPDATE'; 
        res.render('boffice/boardmgr/boardMgrWrite', {
            title: '관리자 - 게시판관리',
            detail : boardMgrDetail, 
            codeList : await Code.findAll({where : {comm_cd : '*',},order: [['ord','asc']]}),
            skinCodeList : await Code.findAll({where : {cd_type : 'SKIN' , comm_cd : {[Op.ne]: '*'},},order: [['ord','asc']]}),
            menuCodeList : await Code.findAll({where : {cd_type : 'MENU' , comm_cd : {[Op.ne]: '*'},},order: [['ord','asc']]}),
            wauthCodeList : await Code.findAll({where : {cd_type : 'WAUTH' , comm_cd : {[Op.ne]: '*'},},order: [['ord','asc']]}),
            iflag : iflag,
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

router.route('/boardMgrWork')
.post(upload.none(), async (req,res,next) => {
    try {
        const result = Boardmgr.create({
            brd_nm : req.body.brd_nm,
            brd_snm : req.body.brd_snm,
            brd_skin_cd : req.body.brd_skin_cd,
            use_yn : req.body.use_yn,
            list_cnt : req.body.list_cnt == undefined || req.body.list_cnt == ''? 10:req.body.list_cnt,
            delflag : req.body.delflag,
            write_auth_cd : req.body.write_auth_cd,
            attach_file_cnt : req.body.attach_file_cnt == undefined || req.body.attach_file_cnt == ''? 0:req.body.attach_file_cnt,
            writer_use_yn : req.body.writer_use_yn,
            email_use_yn : req.body.email_use_yn,
            term_use_yn : req.body.term_use_yn,
            secret_use_yn : req.body.secret_use_yn,
            reply_use_yn : req.body.reply_use_yn,
            regdt_use_yn : req.body.regdt_use_yn,
            cmt_use_yn : req.body.cmt_use_yn,
            thm_width_size : req.body.thm_width_size,
            thm_height_size : req.body.thm_height_size,
            brd_desc : req.body.brd_desc,
            reg_ip : req.body.reg_ip,
            brd_reg_cnt : req.body.brd_reg_cnt,
            date_use_yn : req.body.date_use_yn,
            date_title : req.body.date_title == undefined || req.body.date_title == ''? '날짜':req.body.date_title,
            term_sdt_title : req.body.term_sdt_title == undefined || req.body.term_sdt_title == ''? '시작일':req.body.term_sdt_title,
            term_edt_title : req.body.term_edt_title == undefined || req.body.term_edt_title == ''? '종료일':req.body.term_edt_title,
            etc_field1_use_yn : req.body.etc_field1_use_yn,
            etc_field1_title : req.body.etc_field1_title,
            etc_field2_use_yn : req.body.etc_field2_use_yn,
            etc_field2_title : req.body.etc_field2_title,
            etc_field3_use_yn : req.body.etc_field3_use_yn,
            etc_field3_title : req.body.etc_field3_title,
            etc_field4_use_yn : req.body.etc_field4_use_yn,
            etc_field4_title : req.body.etc_field4_title,
            url_use_yn : req.body.url_use_yn,
            popsize_use_yn : req.body.popsize_use_yn,
            direct_url_use_yn : req.body.direct_url_use_yn,
            cate_cd_use_yn : req.body.cate_cd_use_yn,
            cate_cd : req.body.cate_cd,
            top_fix_use_yn : req.body.top_fix_use_yn,
            cate_cd_title : req.body.cate_cd_title == undefined || req.body.cate_cd_title == ''? '카테고리':req.body.cate_cd_title,
            site_gb : req.body.site_gb,
            site_share_yn : req.body.site_share_yn,
            total_search_use_yn : req.body.total_search_use_yn,
            ord_use_yn : req.body.ord_use_yn,
            ctnt_use_yn : req.body.ctnt_use_yn,
            reg_dt: moment().add('9','h').format('YYYY-MM-DD HH:mm:ss'),
        });
        res.send(result? '저장되었습니다':'저장 실패');
    } catch (error) {
        console.error(error);
        next(error);
    }
})
.patch(upload.none(), async (req,res,next) => {
    try {
        const result = Boardmgr.update({
            brd_nm : req.body.brd_nm,
            brd_snm : req.body.brd_snm,
            brd_skin_cd : req.body.brd_skin_cd,
            use_yn : req.body.use_yn,
            list_cnt : req.body.list_cnt == undefined || req.body.list_cnt == ''? 10:req.body.list_cnt,
            delflag : req.body.delflag,
            write_auth_cd : req.body.write_auth_cd,
            attach_file_cnt : req.body.attach_file_cnt == undefined || req.body.attach_file_cnt == ''? 0:req.body.attach_file_cnt,
            writer_use_yn : req.body.writer_use_yn,
            email_use_yn : req.body.email_use_yn,
            term_use_yn : req.body.term_use_yn,
            secret_use_yn : req.body.secret_use_yn,
            reply_use_yn : req.body.reply_use_yn,
            regdt_use_yn : req.body.regdt_use_yn,
            cmt_use_yn : req.body.cmt_use_yn,
            thm_width_size : req.body.thm_width_size,
            thm_height_size : req.body.thm_height_size,
            brd_desc : req.body.brd_desc,
            reg_ip : req.body.reg_ip,
            brd_reg_cnt : req.body.brd_reg_cnt,
            date_use_yn : req.body.date_use_yn,
            date_title : req.body.date_title == undefined || req.body.date_title == ''? '날짜':req.body.date_title,
            term_sdt_title : req.body.term_sdt_title == undefined || req.body.term_sdt_title == ''? '시작일':req.body.term_sdt_title,
            term_edt_title : req.body.term_edt_title == undefined || req.body.term_edt_title == ''? '종료일':req.body.term_edt_title,
            etc_field1_use_yn : req.body.etc_field1_use_yn,
            etc_field1_title : req.body.etc_field1_title,
            etc_field2_use_yn : req.body.etc_field2_use_yn,
            etc_field2_title : req.body.etc_field2_title,
            etc_field3_use_yn : req.body.etc_field3_use_yn,
            etc_field3_title : req.body.etc_field3_title,
            etc_field4_use_yn : req.body.etc_field4_use_yn,
            etc_field4_title : req.body.etc_field4_title,
            url_use_yn : req.body.url_use_yn,
            popsize_use_yn : req.body.popsize_use_yn,
            direct_url_use_yn : req.body.direct_url_use_yn,
            cate_cd_use_yn : req.body.cate_cd_use_yn,
            cate_cd : req.body.cate_cd,
            top_fix_use_yn : req.body.top_fix_use_yn,
            cate_cd_title : req.body.cate_cd_title == undefined || req.body.cate_cd_title == ''? '카테고리':req.body.cate_cd_title,
            site_gb : req.body.site_gb,
            site_share_yn : req.body.site_share_yn,
            total_search_use_yn : req.body.total_search_use_yn,
            ord_use_yn : req.body.ord_use_yn,
            ctnt_use_yn : req.body.ctnt_use_yn,
            reg_dt: moment().add('9','h').format('YYYY-MM-DD HH:mm:ss'),
        },{
            where : {brd_mgrno :req.body.brd_mgrno},
        });
        res.send(result? '저장되었습니다':'저장 실패');
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;