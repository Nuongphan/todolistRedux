const express = require("express");
const controllers = require("../controllers/employees.controller");
const employeesRouter = express.Router();
employeesRouter.route("/").get(controllers.getAllTodos);
employeesRouter.route("/:id").get(controllers.getTodo);
employeesRouter.route("/").post(controllers.createTodo);
employeesRouter.route("/:id").delete(controllers.deleteTodo);
employeesRouter.route("/:id").put(controllers.updateTodo);
module.exports = employeesRouter;
