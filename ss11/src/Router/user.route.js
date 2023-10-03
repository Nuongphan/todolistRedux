const express = require("express");
const userRouter = express.Router();
userRouter.get("/", (req, res) => {
  res.send("welcomeee");
});
userRouter.post("/", (req, res) => {
  res.send("post");
});
userRouter.put("/:id", (req, res) => {
  res.status(200).send("updated user");
});
userRouter.delete("/:id", (req, res) => {
  res.status(200).send("deleted user");
});
userRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  res.status(200).send(`get user ${id} `);
});

module.exports = userRouter;

