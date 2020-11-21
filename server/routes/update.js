var express = require('express');
var router = express.Router();
const db = require("../db/index.js");
const sqlQuery = db.sqlQuery;
const bodyParser = require('body-parser');
const updateData = require('../module/Update.js');
const deleteData = require("../module/Delete.js");


router.get('/', async function (req, res) {
  if (req.query.city) {
    updateData(req.query.city);
    res.send({
      status: 0,
      desc: "正在处理中",
      data: null
    })
  } else {
    res.send({
      status: 1,
      desc: "参数错误",
      data: null
    })
  }
})


router.post('/', async function (req, res) {
  if (req.body.city) {
    updateData(req.body.city);
    res.send({
      status: 0,
      desc: "正在处理中",
      data: null

    })
  } else {
    res.send({
      status: 1,
      desc: "参数错误",
      data: null
    })
  }
})

module.exports = router;
