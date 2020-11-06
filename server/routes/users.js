var express = require('express');
var router = express.Router();
const db = require("../db/index.js");
const sqlQuery = db.sqlQuery;

router.get('/',async function(req,res){

  if(req.query.username&&req.query.password){
    let strSql = `select * from users where user="${req.query.username}"`;
    let result = (await sqlQuery(strSql));

    if(result.length==0){
      res.send({
        status: 1,
        desc: "账号不存在",
        data:null
      })
    }else{
      result=result[0];
      if(result.pwd!==req.query.password){
        res.send({
          status: 1,
          desc: "密码错误",
          data:null
        })
      }else{
        req.session.username = req.query.username;
        res.send({
          status: 0,
          desc: "登录成功",
          data:null
        })
      }
    }

    
  }else{
    res.send({
      status: 1,
      desc: "参数错误",
      data:null
    })
  }
})



router.post('/',async function(req,res){

  if(req.body.username&&req.body.password){
    let strSql = `select * from users where user="${req.body.username}"`;
    let result = (await sqlQuery(strSql));

    if(result.length==0){
      res.send({
        status: 1,
        desc: "账号不存在",
        data:null
      })
    }else{
      result=result[0];
      if(result.pwd!==req.body.password){
        res.send({
          status: 1,
          desc: "密码错误",
          data:null
        })
      }else{
        req.session.username = req.body.username;
        res.send({
          status: 0,
          desc: "登录成功",
          data:null
        })
      }
    }

    
  }else{
    res.send({
      status: 1,
      desc: "参数错误",
      data:null
    })
  }
})

module.exports = router;
