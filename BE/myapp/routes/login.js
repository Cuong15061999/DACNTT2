var express = require('express');
var router = express.Router();

/* GET home page. */
router.post ('/', function(req, res, next) {
  console.log(req.body.username + '  ' + req.body.password)
  res.status(200).json({
    message: 'this is login function'
  })
});

module.exports = router;