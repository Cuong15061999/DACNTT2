var express = require('express');
var router = express.Router();
var userModel = require('../model/userModel');
var authService = require('../service/authService');
/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'LOGIN PAGE'});
});

router.post ('/login', authService.login);

router.post ('/register', authService.register);
module.exports = router;