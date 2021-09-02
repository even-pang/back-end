const express = require('express');
const oracledb = require('oracledb');
const dbconfig = require('../../db/dbconfig');
const multer = require('multer');
const bcrypt = require('bcrypt');
const paging = require('./adminPaging');
const router = express.Router();

router.route('/memberList')
    .get(async (req,res,next) => {
    try {
        conn = await oracledb.getConnection(dbConfig);
        let pageNum = req.query.page_now; // 요청 페이지 넘버
        let offset = 0;

        if(pageNum > 1){
            offset = 10 * (pageNum - 1);
        }
        
        const users = await conn.execute(`
                    SELECT A.*
                    from (
                        SELECT A.*
                        FROM (
                            SELECT A.*, rownum as pagingrow
                            FROM (	
                                SELECT  /*+index(A IDX_BOARD_01)*/ A.*
                                FROM TB_USER A  
                                WHERE Duse_yn = 'Y'
                                order by reg_dt asc
                            ) A	
                        where rownum <= ${req.query.page_end ? req.query.page_end : 10}
                        ) A
                    where 	pagingrow >= ${req.query.page_start ? req.query.page_start : 1}
                    ) A
        `);

        res.render('boffice/member/memberList', {
            title: '관리자 - 회원리스트',
            querys: req.query,
            list: users.rows,
            count: users.count,
            menuList:res.app.get('menuList'),
            menuDetail:res.app.get('menuDetail'),
            menu_no: res.app.get('menuDetail').menu_no,
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
        const userDetail = await conn.execute(`select * from tb_user where user_id = ${req.body.user_id}`);
        let iflag = 'INSERT';
        if(userDetail) iflag = 'UPDATE';
        res.render('boffice/member/memberWrite', {
            title: '관리자 - 회원수정',
            detail : userDetail,
            iflag : iflag,
            querys : req.body.param,
            returl : req.body.returl,
            menu_no: res.app.get('menuDetail').menu_no,
            menuDetail: res.app.get('menuDetail'),
            menuList: res.app.get('menuList'),
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

router.route('/memberWork')
    .post(async (req, res, next) => {
        try {
            conn = await oracledb.getConnection(dbConfig);
            conn.execute(`INSERT INTO TB_USER (
                USER_ID            
                PWD               
                USER_NM            
                USER_TYPE          
                USE_YN                 
                REG_DT             
                USER_NICK               
                TELNO              
                USER_GPIN          
                USE_AGREE_DT       
                PERSON_AGREE_DT               
            ) VALUES (
                ${req.body.user_id},
                ${req.body.pwd},
                ${req.body.user_nm},
                ${req.body.user_type},
                ${req.body.use_yn},
                ${req.body.user_nm},
                to_date(sysdate ,'yyy-mm-dd hh24:mi:ss'),
                ${req.body.user_nick},
                ${req.body.telno},
                ${req.body.user_gpin},
                ${req.body.use_agree_dt},
                ${req.body.person_agee_dt},
            )`);
            res.send('저장되었습니다');
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .patch(async (req, res, next) => {
        try {
            conn = await oracledb.getConnection(dbConfig);
            userDetail = await conn.execute(`select * from tb_user where user_id = ${req.body.user_id}}`);
            conn.execute(`UPDATE TB_USER SET 
            PWD= ${req.body.pwd},
            USER_TYPE=${req.body.user_type},
            USE_YN=${req.body.use_yn},
            USER_NICK=${req.body.user_nick},
            TELNO=${req.body.telno},
            MOD_DT= to_date(sysdate ,'yyy-mm-dd hh24:mi:ss')
            WHERE USER_ID = ${req.body.user_Id}`);
            res.send(result[0] > 0 ? '수정되었습니다.' : '수정을 실패했습니다.');
        } catch (error) {
            console.error(error);
            next(error);
        }
    })

    .delete(async (req, res, next) => {
        try {
            conn = await oracledb.getConnection(dbConfig);
            const result = await conn.execute(`delete from TB_USER where user_id=${req.body.user_id}`);
            res.send(result > 0 ? '삭제되었습니다.' : '삭제를 실패했습니다.');
        } catch (error) {
            console.error(error);
            next(error);
        }
    })



module.exports = router;