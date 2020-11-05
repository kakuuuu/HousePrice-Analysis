var express = require('express');
var router = express.Router();
const db = require("../db/index.js");
const sqlQuery = db.sqlQuery;


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
  
  // if(result.length!=0){
  //     //登陆成功
  //     user = result[0];
  //     req.session.username = user.username;
      
  // }else{
  //     res.render('info',{
  //         title:"登陆失败",
  //         content:"账号或密码不正确，即将进入登录页",
  //         href:"/login",
  //         hrefTxt:"登录页"
  //     })
  // }
})

module.exports = router;
