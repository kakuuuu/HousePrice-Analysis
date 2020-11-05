var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.cookie("name",'zhangsan',{maxAge: 900000, httpOnly: true});
  res.render('index', { title: 'HousePriceAPi' });
});

module.exports = router;
