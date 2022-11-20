// route middleware để kiểm tra một user đã đăng nhập hay chưa?
const userModel = require('../model/userModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);
const randToken = require('rand-token');

require('dotenv').config();

class authService {
  async register(req, res) {
    const username = req.body.email.toLowerCase();
    const checkUser = await userModel.find(username);
    if (checkUser) {
      return res.status(409).send('Tên tài khoản đã tồn tại.');
    }
    else {
      const hashPassword = bcrypt.hashSync(req.body.password, saltRounds);
      const newUser = {
        username: username,
        password: hashPassword,
        email: req.body.email
      };
      const createUser = userModel.insert(newUser);
      if (!createUser) {
        return res
          .status(500)
          .send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
      }
      return res.send({
        username,
      });
    }
  }
  async login(req, res, next) {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;
    const userCheck = await userModel.find(username);
    if (!userCheck) {
      return res.status(401).send('Tên đăng nhập không tồn tại.');
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Mật khẩu không chính xác.');
    }

    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const dataForAccessToken = {
      username: userCheck.username
    };
    const accessToken = await generateToken(
      dataForAccessToken,
      accessTokenSecret,
      accessTokenLife,
    );

    if (!accessToken) {
      return res
        .status(401)
        .send('Đăng nhập không thành công, vui lòng thử lại.');
    }

    let refreshToken = randToken.generate(jwtVariable.refreshTokenSize);
    if (!userCheck.refreshToken) {
      // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
      await userModel.updateOne(userCheck.username, refreshToken);
    } else {
      // Nếu user này đã có refresh token thì lấy refresh token đó từ database
      refreshToken = userCheck.refreshToken;
    }
    return res.json({
      msg: 'Đăng nhập thành công.',
      accessToken,
      refreshToken,
      userCheck,
    });
  }

  async generateToken(payload, secretSignature, tokenLife) {
    try {
      return await sign({
        payload,
      },
      secretSignature,
      {
        algorithm: 'HS256',
				expiresIn: tokenLife
      });
    } catch (error) {
      console.log(`Error in generate access token:  + ${error}`);
      return null;
    }
  }
}


module.exports = new authService();

