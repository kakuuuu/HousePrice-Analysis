var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getHousePrice =require('./routes/gethouse');
var getSetKey=require('./routes/getkey');
var updateHouse=require('./routes/update');
const bodyParser=require('body-parser');
const expressJwt = require('express-jwt');
const config=require('./bin/config');

// Sentry错误监控
const Sentry = require("@sentry/node");
const Tracing  = require("@sentry/tracing");





var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 中间件

// 错误监控
Sentry.init({
  dsn: "https://4761c0fc83ae43b49eb9d863fefe64dd@o476253.ingest.sentry.io/5515663",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());



// cors
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,ContentType,authorization');
  // res.header('Access-Control-Allow-Credentials','true');
  next();
};

app.use(allowCrossDomain);

app.use(expressJwt({
  secret: config.secretOrPrivateKey,
  algorithms:['HS256']   
}).unless({
	path: ['/','/api/userLogin','/api/getHouseList']  //除了这个地址，其他的URL都需要验证
}));

// app.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {	
// 	  //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
//     res.status(401).send('invalid token...');
//   }
// });


// 日志
app.use(logger('dev'));

app.use(express.json());
// 解析post
app.use(express.urlencoded({ extended: false }));
// 静态文件
app.use(express.static(path.join(__dirname, 'public')));
// session
app.use(session({
  secret: "xzsagjasoigjasoi",
  resave:true,//强制保存session
  cookie:{
    maxAge:7*24*60*60*1000,//设置session的有效期为1周
  },
  saveUninitialized:true//是否保存初始化的session
}))
// cookie
app.use(cookieParser("xzsagjasoigjasoi"));

// post
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(Sentry.Handlers.tracingHandler());


app.get('/Sentry', function mainHandler(req, res) {
  throw new Error('Sentry Error!');
});


// 路由匹配
app.use('/', indexRouter);

app.use('/api/userLogin', usersRouter);

app.use('/api/getHouseList', getHousePrice);

app.use('/api/getSetKey',getSetKey);

app.use('/api/updateHouse',updateHouse);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(Sentry.Handlers.tracingHandler());

app.use(Sentry.Handlers.errorHandler());

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
