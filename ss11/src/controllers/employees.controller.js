const connection = require("../config/db.config");
const AppError = require("../utils/appError");
let dataEmployees = [];
function getAllEmployeesData() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM employees", function (err, data, fields) {
      if (err) {
        reject(err);
      } else {
        dataEmployees = data;
        resolve();
      }
    });
  });
}
exports.getAllTodos = (req, res, next) => {
  connection.query("SELECT * FROM employees", function (err, data, fields) {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
};
exports.getTodo = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No todo id found", 404));
  }
  connection.query(
    "SELECT * FROM employees WHERE id=?",
    [req.params.id],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(200).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    }
  );
};
exports.createTodo = (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  const values = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.hire_name,
  ];
  connection.query(
    `INSERT INTO employees (first_name, last_name,email,hire_name) VALUES(?,?,?,?)`,
    values,
    function (err, data, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "todo created!",
      });
    }
  );
};
exports.deleteTodo = (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No todo id found", 404));
  }
  connection.query(
    "DELETE FROM employees WHERE id=?",
    [req.params.id],
    function (err, fields) {
      if (err) return next(new AppError(err, 500));
      res.status(201).json({
        status: "success",
        message: "todo deleted!",
      });
    }
  );
};
exports.updateTodo = async (req, res, next) => {
  await getAllEmployeesData();
  console.log(1111111, dataEmployees);
  const { first_name, last_name, email, hire_name } = req.body;
  if (!req.params.id) {
    return next(new AppError("No todo id found", 404));
  }
  const ids = dataEmployees.map(employee => employee.id)
  console.log(2222222, ids);
  const idInput = ids.find(id => id == req.params.id)
  if (idInput) {
 connection.query(
   `UPDATE employees SET first_name=?, last_name=?,email=?,hire_name=? WHERE id=?`,
   [first_name, last_name, email, hire_name, req.params.id],
   function (err, data, fields) {
     if (err) return next(new AppError(err, 500));
     res.status(201).json({
       status: "success",
       message: "todo updated!",
     });
   }
 );
  } else {
    res.status(404).send("id not found")
  }
   
};
