const express = require('express');
const router = express.Router();

const fileRouter = require('./file');
const ckeditorRouter = require('./ckeditor_file');

router.use('/file'  ,fileRouter);
router.use('/ckeditor_file'  ,ckeditorRouter);

router.get('/',(req,res) => {
    res.render('home/index', {
        title: 'TatooCok',
        user : req.user,
        menuList:res.app.get('menuList'),});
});

module.exports = router;