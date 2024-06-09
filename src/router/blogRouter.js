const express = require("express");
const { createBlog } = require("../controller/blogController");
const { authMiddleware } = require("../middleware/middleware");

const blogRouter = express.Router();

blogRouter.post("/create/blog", authMiddleware, createBlog);

module.exports = blogRouter;
