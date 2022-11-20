var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.post ('/login', function(req, res, next) {
  console.log(req.body.username + '  ' + req.body.password)

  exports.login = async (req, res) => {
    const username = req.body.username.toLowerCase() || 'test';
    const password = req.body.password || '12345';
  
    const user = await userModel.getUser(username);
    if (!user) {
      return res.status(401).send('Tên đăng nhập không tồn tại.');
    }
  
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Mật khẩu không chính xác.');
    }
  
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  
    const dataForAccessToken = {
      username: user.username,
    };
    const accessToken = await authMethod.generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife,
    );
    if (!accessToken) {
      return res
        .status(401)
        .send('Đăng nhập không thành công, vui lòng thử lại.');
    }
  
    let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
    if (!user.refreshToken) {
      // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
      await userModel.updateRefreshToken(user.username, refreshToken);
    } else {
      // Nếu user này đã có refresh token thì lấy refresh token đó từ database
      refreshToken = user.refreshToken;
    }
  
    return res.json({
      msg: 'Đăng nhập thành công.',
      accessToken,
      refreshToken,
      user,
    });
  };


  res.status(200).json({
    message: 'this is login function'
  })
});

router.post ('/register', function(req, res, next) {
  console.log(req.body.username + '  ' + req.body.password)
  res.status(200).json({
    message: 'this is register function'
  })
});
module.exports = router;