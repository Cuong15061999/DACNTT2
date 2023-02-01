var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connect = require('./config/mongoConnect');
var cron = require('node-cron');
var moment = require('moment');

var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");

var indexRouter = require('./routes/index');
var auth = require('./routes/authRoutes')
var newsRouter = require('./routes/news');
var newsPaperRouter = require('./routes/newspaper');
var usersRouter = require('./routes/users');

var CrawlService = require('./service/crawlService');
var newsPaperModel = require('./model/NewsSitesModel');
var userModel = require('./model/userModel');

var app = express();
//
var cors = require('cors');
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Connect to Mongodb compass
connect.connectDB()
//crawl link that failed
const runFailedLink = async () => {
  const repeat = cron.schedule('* * * * *', async () => {
    const failedLink = await newsPaperModel.find({ crawl_process: "failed" });
    if (failedLink.length !== 0) {
      console.log('crawl the failed link again');
      failedLink.forEach(async link => {
        const repeatCrawl = await CrawlService.CrawlSpecificSite(link.rss_url, link.domain_name);
        console.log(repeatCrawl)
      } )
    } else {
      console.log('stop crawling failed link')
      repeat.stop();
    }
  })
}
//daily crawling news will run on 00:00 every day
//node-cron document https://www.npmjs.com/package/node-cron
cron.schedule('0 0 * * *', () => {
  console.log('Daily Crawling News ; ' + moment().format('MMMM Do YYYY, h:mm:ss a'));
  CrawlService.CrawlAllSite();
  runFailedLink()
}, {
  scheduled: true,
  timezone: "Asia/Ho_Chi_Minh"
});

app.use('/', indexRouter);
app.use('/auth', auth);
app.use('/news', newsRouter);
app.use('/newspaper', newsPaperRouter);
app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
