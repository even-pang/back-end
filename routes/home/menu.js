const express = require('express');
const oracledb = require('oracledb');
const dbconfig = require('../../db/dbconfig');
const conn = oracledb.getConnection(dbconfig);
const router = express.Router();


module.exports = router;