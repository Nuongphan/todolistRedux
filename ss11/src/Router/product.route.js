const express = require("express");
const productRouter = express.Router();
productRouter.get("/", (req, res) => {
  res.render("product",{title: "Product"});
});
productRouter.post("/", (req, res) => {
  res.send("create product");
});
productRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`update product ${id}`);
});
productRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`delete product ${id}`);
});
productRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`get product ${id}`);
});
module.exports = productRouter;
