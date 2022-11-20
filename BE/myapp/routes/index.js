var express = require('express');
var router = express.Router();
var CrawlService = require('../service/crawlService')

/* GET home page. */
router.get('/', function(req, res, next) {
  // await CrawlService.CrawlInfo(req)
  res.render('index', { title: 'Express' });
});

module.exports = router;
