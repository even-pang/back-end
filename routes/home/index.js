const express = require('express');

const router = express.Router();
const boardRouter = require('./board');
const menuRouter = require('./menu');

router.use('/board'  ,boardRouter);
router.use('/menu'  ,menuRouter);

router.get('/' ,(req,res) => {
    res.render('home/index', {title: 'ORDADATA'});
});

module.exports = router;