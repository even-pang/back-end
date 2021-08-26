const express = require('express');

const router = express.Router();
const boardRouter = require('./board');
const menuRouter = require('./menu');


router.use('/board'  ,boardRouter);
router.use('/menu'  ,menuRouter);

module.exports = router;