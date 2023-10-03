const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { Sequelize } = require("sequelize");
require("dotenv").config();
app.set("view engine", "ejs");
app.set("views", "src/views");
const port = process.env.APP_PORT;
const todolistRouter = require("./src/Router/todolist.router");
const userRouter = require("./src/Router/user.route");
const productRouter = require("./src/Router/product.route");
const employeesRouter = require("./src/Router/employees.router");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);
// thêm câu lệnh sau vào mới lấy dduwocjduwx liệu và chuyển thành json để post lên api 
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/todolist", todolistRouter);
app.use("/employees", employeesRouter);
app.use("/products", productRouter);
app.use("/user", userRouter);
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
