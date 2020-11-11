var express = require('express');
var router = express.Router();
const db = require("../db/index.js");
const sqlQuery = db.sqlQuery;
const updateData = require('../module/Update.js');
const deleteData =require("../module/Delete.js")

router.get('/', async function (req, res) {

  if (req.query.city) {
    if (req.query.username && req.query.password) {
      let strSql = `select * from users where user="${req.query.username}"`;
      let result = (await sqlQuery(strSql));
      console.log(result);
      if (result.length == 0) {
        res.send({
          status: 1,
          desc: "账号不存在",
          data: null
        })
      } else {
        result = result[0];
        if (result.pwd !== req.query.password) {
          res.send({
            status: 1,
            desc: "密码错误",
            data: null
          })
        } else {
          req.session.username = req.query.username;
          res.send({
            status: 0,
            desc: "正在处理中",
            data: null
          })
          deleteData(req.query.city).then(res=>{
            updateData(req.query.city);
          })
        }
      }
    } else {
      res.send({
        status: 1,
        desc: "参数错误",
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
