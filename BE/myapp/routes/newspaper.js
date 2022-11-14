var express = require('express');
var router = express.Router();

/* GET All NewsPaper. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: 'Get all newspaper',
  });
});

/* GET Specific NewsPaper. */
router.get('/:id', function(req, res, next) {
  res.status(200).json({
    message: 'Get newspaper with id: '+ req.params.id,
  });
});

/* ADD NewsPaper. */
router.post('/', function(req, res, next) {
  res.status(200).json({
    message: 'Add newspaper',
  });
});

/* Edit Newspaper. */
router.put('/:id', function(req, res, next) {
  res.status(200).json({
    message: 'Edit newspaper with id:'+ req.params.id,
  });
});

/* Delete Newspaper. */
router.delete('/:id', function(req, res, next) {
  res.status(200).json({
    message: 'Del newspaper with id: '+ req.params.id,
  });
});

module.exports = router;