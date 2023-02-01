var express = require('express');
var newsService = require('../service/newsService');
var crawlService = require('../service/crawlService');
var router = express.Router();
/* Crawl all link*/
router.get('/crawl',async function(req, res, next) {
  try {
    const crawlNews = await crawlService.CrawlAllSite();
    if(crawlNews){
      res.status(200).json({
        data: crawlNews,
        message: 'Success crawl news form newspaper link: '
      })
    }else{
      res.status(404).json({
        message: 'Your link have a problem. pls check it '
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});
router.get('/trainModel',async function(req, res, next) {
  try {
    const getAllNews = await crawlService.getTrainTitle();
    if(getAllNews){
      res.status(200).json({
        data: getAllNews,
        message: 'Success get all news'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});
// Get Big modal data
router.get('/readModel',async function(req, res, next) {
  try {
    const traning = await crawlService.readModalAndStore();
    if(traning){
      res.status(200).json({
        message: 'Success'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});
// Prediction
router.post('/predict',async function(req, res, next) {
  try {
    const prediction = await crawlService.genrePrediction(req.body.title);
    if(prediction){
      res.status(200).json({
        genre: prediction,
        message: 'Success'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});
/* Crawl specific website. */
router.post('/crawl',async function(req, res, next) {
  try {
    const crawlNews = await crawlService.CrawlSpecificSite(req.body.rss, req.body.link);
    if(crawlNews === 'success'){
      res.status(200).json({
        data: crawlNews,
        message: 'Success crawl news form newspaper link: '
      })
    }else{
      res.status(404).json({
        message: 'Your link have a problem. pls check it '
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});
/* GET All News. */
router.get('/',async function(req, res, next) {
  try {
    const getAllNews = await newsService.getAllNews();
    if(getAllNews){
      res.status(200).json({
        data: getAllNews,
        message: 'Success get all news'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});
/* GET Specific News. */
router.get('/:id',async function(req, res, next) {
  try {
    const getNews = await newsService.getNews(req.params.id);
    if(getNews){
      res.status(200).json({
        data: getNews,
        message: 'Success get specific news with id: '+ req.params.id
      })
    }else{
      res.status(404).json({
        message: 'Can not find specific news with id: '+ req.params.id
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});
/* EDIT Specific News. */
router.put('/:id',async function(req, res, next) {
  try {
    const editNews = await newsService.editNews(req);
    if(editNews){
      res.status(200).json({
        data: editNews,
        message: 'Success edit specific news with id:'+ req.params.id
      })
    }else{
      res.status(404).json({
        message: 'Can not find specific news with id: '+ req.params.id
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});
/* DEL Specific News. */
router.delete('/:id',async function(req, res, next) {
  try {
    const delNews = await newsService.delNews(req.params.id);
    if(delNews){
      res.status(200).json({
        data: delNews,
        message: 'Success del specific news with id: '+ req.params.id
      })
    }else{
      res.status(404).json({
        message: 'Can not find specific news with id: '+ req.params.id
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
});

module.exports = router;