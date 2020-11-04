const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const WildersController = require("./controllers/WildersController");

mongoose
  .connect("mongodb://127.0.0.1:27017/wildersdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch(() => {
    console.error("Mongoose failed");
  });

const app = express();

const asyncErrorHandler = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res);
    } catch ({ code, message, status }) {
      res.status(status || 500).json({
        code,
        message,
      });
    }
  };
};

app.use(bodyParser.json());

app.get("/api/wilders", asyncErrorHandler(WildersController.getAll));
app.post("/api/wilder", WildersController.create);
app.put("/api/wilder/:wilderId", asyncErrorHandler(WildersController.update));
app.delete("/api/wilders", WildersController.removeAll);
// app.delete('/api/wilders/:wilderId', WildersController.remove);

app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

app.listen(3001, (error) => {
  if (error) {
    console.error(error);
    return;
  }
});