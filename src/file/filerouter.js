const express = require("express");
const { fileController } = require("./filecontroller");

const fileRouter = express.Router();

fileRouter.post("/file", fileController);

module.exports = fileRouter;
