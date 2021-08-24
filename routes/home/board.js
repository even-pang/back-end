const express = require('express');
const { Op } = require('sequelize');
const { Board, Image, Boardmgr } = require('../../models');
const multer = require('multer');
const router = express.Router();
const paging = require('./homePaging');
const moment = require('moment');
const { isLoggedIn, isNotLoggedIn } = require('./loginCheck');

router.route('/boardWrite')
    .get(async (req, res, next) => {
        try {
            const boardmgrDetail = await Boardmgr.findOne({
                where: {
                    brd_mgrno: req.query.brd_mgrno,
                }
            });
            res.json({
                boardmgrDetail: boardmgrDetail,
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    })

router.route('/boardView')
    .get(async (req, res, next) => {
        try {
            const boardDetail = await Board.findOne({
                where: { brd_no: req.query.brd_no },
                include: [{
                    model: Image,
                },],
            });
            const boardmgrDetail = await Boardmgr.findOne({
                where: {
                    brd_mgrno: req.query.brd_mgrno,
                }
            });
            res.json({
                detail: boardDetail,
                boardmgrDetail: boardmgrDetail,
            });
        } catch (error) {
            console.error(error);
            next(error);
        }
    })


const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads');
        },
        filename(req, file, done) { // 제로초.png
            const ext = path.extname(file.originalname); // 확장자 추출(.png)
            const basename = path.basename(file.originalname, ext); // 제로초
            done(null, basename + '_' + new Date().getTime() + ext); // 제로초15184712891.png
        },
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.route('/boardWork')
    .post(isLoggedIn, upload.none(), async (req, res, next) => {
        try {
            const board = await Board.create({
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
                ord: req.body.ord
            });
            if (req.body.image) {
                if (Array.isArray(req.body.image)) {
                    const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
                    await board.addImages(images);
                } else {
                    const image = await Image.create({ src: req.body.image });
                    await board.addImages(image);
                }
            }
            res.status(201).json({ result: 'SUCCESS' });
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .patch(isLoggedIn, upload.none(), async (req, res, next) => {
        try {
            boardDetail = await Board.findOne({ where: { brd_no: req.body.brd_no } });
            await Board.update({
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
            }, {
                where: { brd_no: req.body.brd_no },
            });
            const board = await Board.findOne({where: {brd_no : req.body.brd_no}});
            await Image.update({BoardBrdNo: null},{where:{BoardBrdNo: req.body.brd_no}});
            if (req.body.image) {
                if (Array.isArray(req.body.image)) {
                    const images = await Promise.all(req.body.image.map((image) => Image.create({ src: image })));
                    await board.addImages(images);
                } else {
                    const image = await Image.create({ src: req.body.image });
                    await board.addImages(image);
                }
            }
            res.status(201).json({ result: 'SUCCESS' });
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
            console.info(req.query.brd_no);
            const result = await Board.destroy({ where: { brd_no: req.query.brd_no } });
            res.send(result > 0 ? '삭제되었습니다.' : '삭제를 실패했습니다.');
        } catch (error) {
            console.error(error);
            next(error);
        }
    })


router.route('/:brd_mgrno')
    .get(async (req, res, next) => {
        try {
            let pageNum = req.query.page_now; // 요청 페이지 넘버
            let offset = 0;
            if (pageNum > 1) {
                offset = 10 * (pageNum - 1);
            }
            const boards = await Board.findAndCountAll({
                where: {
                    brd_mgrno: req.params.brd_mgrno === undefined ? { [Op.like]: '%' } : req.params.brd_mgrno,
                    reg_id: req.query.id === undefined || !req.user ? { [Op.like]: '%' } : req.user.user_id,
                },

                order: [['BRD_NO', 'DESC']],
                offset: offset,
                limit: 10
            });
            const boardmgrDetail = await Boardmgr.findOne({
                where: {
                    brd_mgrno: req.params.brd_mgrno,
                }
            });
            res.json({
                brd_nm: boardmgrDetail.brd_nm,
                list: boards.rows,
                count: boards.count,
                boardmgrDetail: boardmgrDetail,
                page_now: req.query.page_now ? req.query.page_now : 1,
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    });

module.exports = router;