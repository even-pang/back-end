const express = require('express');
const { Op } = require('sequelize');
const multer = require('multer');
const { Code } = require('../../models');
const router = express.Router();

router.route('/codeList')
    .get(async (req,res,next) => {
    try {
        const codes = await Code.findAll({
            where : {
                comm_cd : req.query.cd_type == undefined ? "*": {[Op.ne]: '*'},
                cd_type : req.query.cd_type == undefined ? {[Op.like]: '%'}:req.query.cd_type,
            },
            order: [['ord','asc']]
        });
        res.render('boffice/code/codeList', {
            title: '관리자 - 메뉴관리',
            querys: req.query,
            list: codes,
            menuList:res.app.get('menuList'),
            menuDetail:res.app.get('menuDetail'),
            returl: req.baseUrl+req.path,
            param : req.originalUrl.substring((req.baseUrl+req.path).length+1),
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});


module.exports = router;