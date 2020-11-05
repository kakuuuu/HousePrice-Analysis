var express = require('express');
var router = express.Router();
const db = require("../db/index.js");
// const sqlQuery = db.sqlQuery;
const updateData = require('../module/Update.js');


router.post('/', async function (req, res) {

  if (req.body.city) {
    if (req.session.username) {
      updateData(req.body.city);
      res.send({
        status: 0,
        desc: "正在处理中",
        data: null
      })
    } else {
      res.send({
        status: 1,
        desc: "未登录",
        data: null
      })
    }
  } else {
    res.send({
      status: 1,
      desc: "参数错误",
      data: null
    })
  }
})

module.exports = router;
