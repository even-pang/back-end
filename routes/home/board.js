const express = require('express');
const oracledb = require('oracledb');
const dbconfig = require('../../db/dbconfig');
const conn = oracledb.getConnection(dbconfig);
const multer = require('multer');
const router = express.Router();
const moment = require('moment');
const { isLoggedIn, isNotLoggedIn } = require('./loginCheck');

router.route('/boardWrite')
    .get(async (req, res, next) => {
        try {
          
        } catch (error) {
            console.error(error);
            next(error);
        }
    })

router.route('/boardView')
    .get(async (req, res, next) => {
        try {
           
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
           
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .patch(isLoggedIn, upload.none(), async (req, res, next) => {
        try {
           
        } catch (error) {
            console.error(error);
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
           
        } catch (error) {
            console.error(error);
            next(error);
        }
    })


router.route('/:brd_mgrno')
    .get(async (req, res, next) => {
        try {
      
        } catch (error) {
            console.log(error);
            next(error);
        }
    });

module.exports = router;