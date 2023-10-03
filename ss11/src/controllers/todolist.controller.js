const connection = require("../config/db.config");
const AppError = require("../utils/appError");
let todolist = [];
function getAllData() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM todos", function (err, data, fields) {
      if (err) {
        reject(err);
      } else {
        todolist = data;
        resolve();
      }
    });
  });
}
exports.getTodolist = (req, res, next) => {
  connection.query("select*from todos", (err, data) => {
    if (err) return next(new AppError(err));
    res.status(200).json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
};
exports.getTodo = async (req, res, next) => {
  await getAllData();
  const ids = todolist.map((todo) => todo.id);
  const idInput = ids.find((id) => id == req.params.id);
  if (!req.params.id) {
    return next(new AppError("No todo id found", 404));
  }
  if (idInput) {
    connection.query(
      "SELECT * FROM todos WHERE id=?",
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
  } else {
    res.status(404).send("id not found");
  }
};
exports.addTodo = (req, res, next) => {
  if (!req.body) return next(new AppError("No form data found", 404));
  const values = [req.body.name];
  connection.query(
    `INSERT INTO todos (name) VALUES(?)`,
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
exports.deleteTodo = async (req, res, next) => {
  await getAllData();
  const ids = todolist.map((todo) => todo.id);
  const idInput = ids.find((id) => id == req.params.id);
  if (!req.params.id) {
    return next(new AppError("No todo id found", 404));
  }
  if (idInput) {
    connection.query(
      "DELETE FROM todos WHERE id=?",
      [req.params.id],
      function (err, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "todo deleted!",
        });
      }
    );
  } else {
    res.status(404).send("idnotfound");
  }
};
exports.updateTodo = async (req, res, next) => {
  await getAllData();
  const ids = todolist.map((todo) => todo.id);
  const idInput = ids.find((id) => id == req.params.id);
  if (!req.params.id) {
    return next(new AppError("No todo id found", 404));
  }
  if (idInput) {
    connection.query(
      `UPDATE todos SET  completed=1 WHERE id=?`,
      [req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "todo updated!",
        });
      }
    );
  } else {
    res.status(404).send("id not found");
  }
};
