var express = require('express');
var router = express.Router();
var CrawlService = require('../service/crawlService')
var isLoggedIn = require('../service/authService')

/* GET home page. */
router.get('/', isLoggedIn, function(req, res, next) {
  // await CrawlService.CrawlInfo(req)
  res.render('index', { title: 'Express' });
});

module.exports = router;
