var express = require('express');
var router = express.Router();
const db = require("../db/index.js");
const sqlQuery = db.sqlQuery;

/* GET users listing. */
router.get('/', function (req, res, next) {
  let city = req.query.city;
  if (city) {
    sqlQuery(`select * from house where city="${city}"`).then(response => {
      res.send({
        status: 0,
        desc: "成功",
        data: response
      });
    })
  } else {
    res.send({
      status: 1,
      desc: "失败",
      data:null
    });
  }
});

module.exports = router;
