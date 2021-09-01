const express = require('express');
const oracledb = require('oracledb');
const dbConfig = require('../../db/dbconfig');
let conn;
const multer = require('multer');
const router = express.Router();
const paging = require('./adminPaging');
const moment = require('moment');

router.route('/boardList')
    .get(async (req, res, next) => {
        try {
            conn = await oracledb.getConnection(dbConfig);
            let pageNum = req.query.page_now; // 요청 페이지 넘버
            let offset = 0;
            if (pageNum > 1) {
                offset = 10 * (pageNum - 1);
            }
            const boards = await conn.execute(`
                    SELECT A.*
                    from (
                        SELECT A.*
                        FROM (
                            SELECT A.*, rownum as pagingrow
                            FROM (	
                                SELECT  /*+index(A IDX_BOARD_01)*/ A.*,
                                (SELECT COUNT(*) FROM TB_BOARD WHERE BRD_MGRNO = ${req.query.brd_mgrno} AND DELFLAG_YN = 'N' AND USE_YN = 'Y' AND TOP_REG_NO = A.BRD_NO) REPLY_CNT
                                FROM TB_BOARD A  
                                WHERE DELFLAG_YN  = 'N'
                                AND A.brd_mgrno like ${req.query.brd_mgrno != undefined? req.query.brd_mgrno : '%'}
                                AND A.use_yn    = 'Y'
                            ) A	
                        where rownum <= ${req.query.page_end ? req.query.page_end : 10}
                        ) A
                    where 	pagingrow >= ${req.query.page_start ? req.query.page_start : 1}
                    ) A
            `);
            
            const boardmgrDetail = await conn.execute(`select * from tb_boardmgr where brd_mgrno = ${req.query.brd_mgrno}`);
            res.render('boffice/board/boardList', {
                title: '관리자 - ' + boardmgrDetail.rows[0].BRD_NM + ' 게시판관리',
                querys: req.query,
                list: boards.rows,
                count: boards.count,
                boardmgrDetail: boardmgrDetail,
                menuList: res.app.get('menuList'),
                menuDetail: res.app.get('menuDetail'),
                menu_no: res.app.get('menuDetail').menu_no,
                returl: req.baseUrl + req.path,
                param: req.originalUrl.substring((req.baseUrl + req.path).length + 1),
                paging: paging(req.baseUrl + req.path, boards.count, req.query.page_now == undefined ? '1' : req.query.page_now, req.originalUrl.substring((req.baseUrl + req.path).length + 1), 10, 10),
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    });

router.route('/boardWrite')
    .post(async (req, res, next) => {
        try {
            conn = await oracledb.getConnection(dbConfig);
            //const boardDetail = await Board.findOne({ where: { brd_no: req.body.brd_no } });
            const boardDetail = await conn.execute(`select * from tb_board where brd_no = ${req.body.brd_no}`);
            // const boardmgrDetail = await Boardmgr.findOne({
            //     where: {
            //         brd_mgrno: req.body.brd_mgrno,
            //     }
            // });
            const boardmgrDetail = await conn.execute(`select * from tb_boardmgr where brd_mgrno = ${req.body.brd_mgrno}`);
            let iflag = 'INSERT';
            if (boardDetail) iflag = 'UPDATE';
            console.info(req.query);
            res.render('boffice/board/boardWrite', {
                title: '관리자 - ' + boardmgrDetail.brd_nm + ' 게시판관리',
                detail: boardDetail,
                boardmgrDetail: boardmgrDetail,
                iflag: iflag,
                param: req.body.param,
                returl: req.body.returl,
                menu_no: res.app.get('menuDetail').menu_no,
                menuDetail: res.app.get('menuDetail'),
                menuList: res.app.get('menuList'),
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    })

router.route('/boardView')
    .post(async (req, res, next) => {
        try {
            conn = await oracledb.getConnection(dbConfig);
            //const boardDetail = await Board.findOne({ where: { brd_no: req.body.brd_no } });
            const boardDetail = await conn.execute(`select * from tb_board where brd_no = ${req.body.brd_no}`);
            // const boardmgrDetail = await Boardmgr.findOne({
            //     where: {
            //         brd_mgrno: req.body.brd_mgrno,
            //     }
            // });
            const boardmgrDetail = await conn.execute(`select * from tb_boardmgr where brd_mgrno = ${req.body.brd_mgrno}`);
            let iflag = 'INSERT';
            if (boardDetail) iflag = 'UPDATE';
            console.info(req.query);
            res.render('boffice/board/boardView', {
                title: '관리자 - ' + boardmgrDetail.brd_nm + ' 게시판관리',
                detail: boardDetail,
                boardmgrDetail: boardmgrDetail,
                iflag: iflag,
                param: req.body.param,
                returl: req.body.returl,
                menuDetail: res.app.get('menuDetail'),
                menu_no: res.app.get('menuDetail').menu_no,
                menuList: res.app.get('menuList'),
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    })

router.route('/boardWork')
    .post(async (req, res, next) => {
        try {
            conn = await oracledb.getConnection(dbConfig);
            conn.execute(`INSERT INTO TB_BOARD (
                brd_no,
                brd_kind,
                cate_cd,
                notice_yn,
                use_yn,
                ttl,
                ctnt,
                high_reg_no,
                depth,
                all_reg_no,
                top_reg_no,
                view_cnt,
                reg_id,
                reg_nm,
                sdt,
                edt,
                url,
                brd_mgrno,
                secret_yn,
                zip_cd,
                email,
                delflag_yn,
                win_height,
                win_width,
                etc_field1,
                etc_field2,
                etc_field3,
                etc_field4,
                url_target,
                site_gb,
                ord,
                reg_dt,
                mod_dt
            ) VALUES (
                SEQ_TB_BOARD.nextval(),
                ${req.body.brd_kind},
                ${req.body.cate_cd},
                ${req.body.notice_yn},
                ${req.body.use_yn},
                ${req.body.ttl},
                ${req.body.ctnt},
                ${req.body.high_reg_no},
                ${req.body.depth},
                ${req.body.all_reg_no},
                ${req.body.top_reg_no},
                ${req.body.view_cnt},
                ${req.user.user_id},
                ${req.user.user_nm},
                ${req.body.sdt},
                ${req.body.edt},
                ${req.body.url},
                ${req.body.brd_mgrno},
                ${req.body.secret_yn},
                ${req.body.zip_cd},
                ${req.body.email},
                ${req.body.delflag_yn},
                ${req.body.win_height},
                ${req.body.win_width},
                ${req.body.etc_field1},
                ${req.body.etc_field2},
                ${req.body.etc_field3},
                ${req.body.etc_field4},
                ${req.body.url_target},
                ${req.body.site_gb},
                ${req.body.ord},
                ${moment().add('9', 'h').format('YYYY-MM-DD HH:mm:ss')},
                null
            )`);
            // await Board.create({
            //     brd_kind: req.body.brd_kind,
            //     cate_cd: req.body.cate_cd,
            //     notice_yn: req.body.notice_yn,
            //     use_yn: req.body.use_yn,
            //     ttl: req.body.ttl,
            //     ctnt: req.body.ctnt,
            //     high_reg_no: req.body.high_reg_no,
            //     depth: req.body.depth,
            //     all_reg_no: req.body.all_reg_no,
            //     top_reg_no: req.body.top_reg_no,
            //     view_cnt: req.body.view_cnt,
            //     reg_id: req.user.user_id,
            //     reg_nm: req.user.user_nm,
            //     sdt: req.body.sdt,
            //     edt: req.body.edt,
            //     url: req.body.url,
            //     brd_mgrno: req.body.brd_mgrno,
            //     secret_yn: req.body.secret_yn,
            //     zip_cd: req.body.zip_cd,
            //     email: req.body.email,
            //     delflag_yn: req.body.delflag_yn,
            //     win_height: req.body.win_height,
            //     win_width: req.body.win_width,
            //     etc_field1: req.body.etc_field1,
            //     etc_field2: req.body.etc_field2,
            //     etc_field3: req.body.etc_field3,
            //     etc_field4: req.body.etc_field4,
            //     url_target: req.body.url_target,
            //     site_gb: req.body.site_gb,
            //     ord: req.body.ord,
            //     reg_dt: moment().add('9', 'h').format('YYYY-MM-DD HH:mm:ss'),
            //     mod_dt: null,
            // });
            res.send('저장되었습니다');
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .patch(async (req, res, next) => {
        try {
            conn = await oracledb.getConnection(dbConfig);
            //boardDetail = await Board.findOne({ where: { brd_no: req.body.brd_no } });
            boardDetail = await conn.execute(`select * from tb_board where brd_no = ${req.body.brd_no}}`);
            // const result = await Board.update({
            //     brd_kind: req.body.brd_kind,
            //     cate_cd: req.body.cate_cd,
            //     notice_yn: req.body.notice_yn,
            //     use_yn: req.body.use_yn,
            //     ttl: req.body.ttl,
            //     ctnt: req.body.ctnt,
            //     depth: req.body.depth,
            //     sdt: req.body.sdt,
            //     edt: req.body.edt,
            //     url: req.body.url,
            //     secret_yn: req.body.secret_yn,
            //     zip_cd: req.body.zip_cd,
            //     email: req.body.email,
            //     delflag_yn: req.body.delflag_yn,
            //     win_height: req.body.win_height,
            //     win_width: req.body.win_width,
            //     etc_field1: req.body.etc_field1,
            //     etc_field2: req.body.etc_field2,
            //     etc_field3: req.body.etc_field3,
            //     etc_field4: req.body.etc_field4,
            //     url_target: req.body.url_target,
            //     site_gb: req.body.site_gb,
            //     ord: req.body.ord,
            //     mod_dt: moment().add('9', 'h').format('YYYY-MM-DD HH:mm:ss'),
            // }, {
            //     where: { brd_no: req.body.brd_no },
            // });
            conn.execute(`UPDATE TB_BOARD SET 
                brd_kind= ${req.body.brd_kind},
                cate_cd= ${req.body.cate_cd},
                notice_yn= ${req.body.notice_yn},
                use_yn= ${req.body.use_yn},
                ttl= ${req.body.ttl},
                ctnt= ${req.body.ctnt},
                depth= ${req.body.depth},
                sdt= ${req.body.sdt},
                edt= ${req.body.edt},
                url= ${req.body.url},
                secret_yn= ${req.body.secret_yn},
                zip_cd= ${req.body.zip_cd},
                email= ${req.body.email},
                delflag_yn= ${req.body.delflag_yn},
                win_height= ${req.body.win_height},
                win_width= ${req.body.win_width},
                etc_field1= ${req.body.etc_field1},
                etc_field2= ${req.body.etc_field2},
                etc_field3= ${req.body.etc_field3},
                etc_field4= ${req.body.etc_field4},
                url_target= ${req.body.url_target},
                site_gb= ${req.body.site_gb},
                ord= ${req.body.ord},
                mod_dt= ${moment().add('9', 'h').format('YYYY-MM-DD HH=mm=ss')}
            WHERE BRD_NO = ${req.body.brd_no}`);
            res.send(result[0] > 0 ? '수정되었습니다.' : '수정을 실패했습니다.');
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
            conn = await oracledb.getConnection(dbConfig);
            //const result = await Board.destroy({ where: { brd_no: { [Op.in]: req.body.chk_brd_no } } });
            const result = await conn.execute(`delete from tb_board where brd_no in (${req.body.chk_brd_no})`);
            res.send(result > 0 ? '삭제되었습니다.' : '삭제를 실패했습니다.');
        } catch (error) {
            console.error(error);
            next(error);
        }
    })

module.exports = router;