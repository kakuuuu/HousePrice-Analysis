var express = require('express');
var router = express.Router();
const db = require("../db/index.js");
const sqlQuery = db.sqlQuery;

/* GET users listing. */
router.get('/', function (req, res, next) {
  sqlQuery(`select * from encryption`).then(response => {
    res.send({
      status: 0,
      desc: "成功",
      data: response
    });
  }).catch(err => {
    res.send({
      status: 1,
      desc: "失败",
      data: err
    })
  })
});

module.exports = router;
