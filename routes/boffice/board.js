const express = require('express');
const oracledb = require('oracledb');
const dbconfig = require('../../db/dbconfig');
const conn = oracledb.getConnection(dbconfig);
const multer = require('multer');
const router = express.Router();
const paging = require('./adminPaging');
const moment = require('moment');


router.route('/boardList')
    .get(async (req, res, next) => {
        try {
            let pageNum = req.query.page_now; // 요청 페이지 넘버
            let offset = 0;
            if (pageNum > 1) {
                offset = 10 * (pageNum - 1);
            }

            const boards = await Board.findAndCountAll({
                where: {
                    brd_mgrno: req.query.brd_mgrno == undefined ? { [Op.like]: '%' } : req.query.brd_mgrno,
                },
                order: [['BRD_NO', 'DESC']],
                offset: offset,
                limit: 10
            });

            const boardmgrDetail = await Boardmgr.findOne({
                where: {
                    brd_mgrno: req.query.brd_mgrno,
                }
            });

            res.render('boffice/board/boardList', {
                title: '관리자 - ' + boardmgrDetail.brd_nm + ' 게시판관리',
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
            const boardDetail = await Board.findOne({ where: { brd_no: req.body.brd_no } });
            const boardmgrDetail = await Boardmgr.findOne({
                where: {
                    brd_mgrno: req.body.brd_mgrno,
                }
            });
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
            const boardDetail = await Board.findOne({ where: { brd_no: req.body.brd_no } });
            const boardmgrDetail = await Boardmgr.findOne({
                where: {
                    brd_mgrno: req.body.brd_mgrno,
                }
            });
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
            await Board.create({
                brd_kind: req.body.brd_kind,
                cate_cd: req.body.cate_cd,
                notice_yn: req.body.notice_yn,
                use_yn: req.body.use_yn,
                ttl: req.body.ttl,
                ctnt: req.body.ctnt,
                high_reg_no: req.body.high_reg_no,
                depth: req.body.depth,
                all_reg_no: req.body.all_reg_no,
                top_reg_no: req.body.top_reg_no,
                view_cnt: req.body.view_cnt,
                reg_id: req.user.user_id,
                reg_nm: req.user.user_nm,
                sdt: req.body.sdt,
                edt: req.body.edt,
                url: req.body.url,
                brd_mgrno: req.body.brd_mgrno,
                secret_yn: req.body.secret_yn,
                zip_cd: req.body.zip_cd,
                email: req.body.email,
                delflag_yn: req.body.delflag_yn,
                win_height: req.body.win_height,
                win_width: req.body.win_width,
                etc_field1: req.body.etc_field1,
                etc_field2: req.body.etc_field2,
                etc_field3: req.body.etc_field3,
                etc_field4: req.body.etc_field4,
                url_target: req.body.url_target,
                site_gb: req.body.site_gb,
                ord: req.body.ord,
                reg_dt: moment().add('9', 'h').format('YYYY-MM-DD HH:mm:ss'),
                mod_dt: null,
            });
            res.send('저장되었습니다');
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .patch(async (req, res, next) => {
        try {
            boardDetail = await Board.findOne({ where: { brd_no: req.body.brd_no } });
            const result = await Board.update({
                brd_kind: req.body.brd_kind,
                cate_cd: req.body.cate_cd,
                notice_yn: req.body.notice_yn,
                use_yn: req.body.use_yn,
                ttl: req.body.ttl,
                ctnt: req.body.ctnt,
                depth: req.body.depth,
                sdt: req.body.sdt,
                edt: req.body.edt,
                url: req.body.url,
                secret_yn: req.body.secret_yn,
                zip_cd: req.body.zip_cd,
                email: req.body.email,
                delflag_yn: req.body.delflag_yn,
                win_height: req.body.win_height,
                win_width: req.body.win_width,
                etc_field1: req.body.etc_field1,
                etc_field2: req.body.etc_field2,
                etc_field3: req.body.etc_field3,
                etc_field4: req.body.etc_field4,
                url_target: req.body.url_target,
                site_gb: req.body.site_gb,
                ord: req.body.ord,
                mod_dt: moment().add('9', 'h').format('YYYY-MM-DD HH:mm:ss'),
            }, {
                where: { brd_no: req.body.brd_no },
            });
            res.send(result[0] > 0 ? '수정되었습니다.' : '수정을 실패했습니다.');
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const result = await Board.destroy({ where: { brd_no: { [Op.in]: req.body.chk_brd_no } } });
            res.send(result > 0 ? '삭제되었습니다.' : '삭제를 실패했습니다.');
        } catch (error) {
            console.error(error);
            next(error);
        }
    })

module.exports = router;