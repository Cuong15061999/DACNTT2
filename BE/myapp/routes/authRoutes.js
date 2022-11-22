var express = require('express');
var router = express.Router();
var authService = require('../service/authService');
/* GET home page. */
const authMiddleware = require('../service/middlewares/authMiddlewares');
const isAuth = authMiddleware.isAuth;

router.get('/', isAuth, (req, res) => {
  res.render('index', { title: 'LOGIN PAGE'});
});

router.post ('/login', authService.login);
router.post ('/register', authService.register);
router.post('/refresh', authService.refreshToken);

module.exports = router;