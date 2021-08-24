const express = require('express');

const router = express.Router();
const boardRouter = require('./board');
const memberRouter = require('./member');
const artRouter = require('./art');
const companyRouter = require('./company');
const menuRouter = require('./menu');


router.use('/board'  ,boardRouter);
router.use('/member'  ,memberRouter);
router.use('/art'  ,artRouter);
router.use('/company'  ,companyRouter);
router.use('/menu'  ,menuRouter);

module.exports = router;