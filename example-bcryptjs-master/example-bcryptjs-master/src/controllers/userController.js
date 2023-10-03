const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const sendForgotPassword = require("./mail");
const crypto = require("crypto");
class UserController {
  async handleRegister(req, res) {
    const { password, email } = req.body;
    console.log(111111, req.body);
    try {
      const checkUser = await User.findOne({ where: { email: email } });
      console.log("1", checkUser);
      if (checkUser) {
        return res.status(409).json({ msg: "email already existed" });
      }
      const salt = 10; //số lần lặp để mã hoá => thường là 10-12
      const genSalt = await bcrypt.genSalt(salt);
      const newPassword = await bcrypt.hash(password, genSalt);
      console.log(newPassword);
      await User.create({
        fullName: req.body.fullName,
        role: req.body.role,
        userName: req.body.username,
        password: newPassword,
        email: email,
      });
      res.status(201).json({ msg: "Register successfully" });
    } catch (error) {
      // console.log(222222222, error);
      res.status(400).json({ msg: "Error" });
    }
  }

  async handleLogin(req, res) {
    const { email, password } = req.body;
    try {
      //check U sơ có đúng không
      const checkUser = await User.findOne({ where: { email: email } });
      if (!checkUser) {
        return res.status(409).json({ msg: "Wrong email" });
      }
      //sau khi check U sơ thành công sẽ check password gửi lên đúng không
      const checkPass = await bcrypt.compare(password, checkUser.password); // 2 tham số (password gửi lên,password trong db)
      if (checkPass) {
        // console.log(checkUser);
        const { password, ...data } = checkUser.dataValues;
        const jwtData = jwt.sign(data, process.env.ACCESS_TOKEN_SCERET);
        return res
          .status(200)
          .json({
            msg: "login successfully",
            accessToken: jwtData,
            data: data,
          });
      } else {
        return res.status(401).json("wrong password");
      }
    } catch (error) {
      res.status(400).json({ msg: "Error" });
    }
  }
  async getAllUser(req, res) {
    try {
      console.log(req.infor);
      const data = await User.findAll();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json("error");
    }
  }
  async showForgotPassword(req, res) {
    try {
      res.status(200).json({ msg: "Forgot password" });
    } catch (error) {
      res.status(400).json("error");
    }
  }
  async forgotPassword(req, res) {
    const { email } = req.body;
    // Độ dài của chuỗi ngẫu nhiên bạn muốn tạo
    const length = 10;
    // Sử dụng crypto.randomBytes để tạo buffer ngẫu nhiên
    const randomBytes = crypto.randomBytes(length);
    // Chuyển buffer thành chuỗi hex
    const randomString = randomBytes.toString("hex");
    // kiểm tra xem email có tồn tại không
    // nếu tồn tại thì gửi email, thông báo thành công
    // nếu không có thì thông báo email không tồn tại
    const checkUser = await User.findOne({ where: { email: email } });
    if (checkUser) {
      // Lưu mã reset password vào session
      req.session = randomString;
      await sendForgotPassword(checkUser, randomString)
        .then((result) => {
          console.log("okkkkkkk");
          return res.status(200).json({ msg: "Email sent successfully" });
        })
        .catch((err) => {
          console.log( err);
        });
    } else {
      return res.json({ msg: "email does not exist" });
    }
  }
  async showResetPassword(req, res) {
    res.json("okkkk");
  }
  async resetPassword(req, res) {
    const codeReset = req.session;
    const codeInput = req.body.code;
    const checkUser = await User.findOne({ where: { email: email } });
    if (checkUser && codeReset == codeInput) {
      const password = req.body.password;
      const salt = 10; //số lần lặp để mã hoá => thường là 10-12
      const genSalt = await bcrypt.genSalt(salt);
      const newPassword = await bcrypt.hash(password, genSalt);
      await User.update({ password: newPassword });
      return res.status(201).json({ msg: "update successfully" });
    }
  }
}

module.exports = new UserController();
