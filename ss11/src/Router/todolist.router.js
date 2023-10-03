const express = require("express");
const controllers = require("../controllers/todolist.controller");
const todolistRouter = express.Router();
todolistRouter.route("/").get(controllers.getTodolist);
todolistRouter.route("/:id").get(controllers.getTodo);
todolistRouter.route("/").post(controllers.addTodo);
todolistRouter.route("/:id").delete(controllers.deleteTodo);
todolistRouter.route("/:id").put(controllers.updateTodo);
module.exports = todolistRouter;
