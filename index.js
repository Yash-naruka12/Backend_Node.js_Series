const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnection = require("./src/db/db");
const authRouter = require("./src/router/authRouter");
const expressFileupload = require("express-fileupload");
const fileRouter = require("./src/file/filerouter");

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to nodejs series</h1>`);
});

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

// auth router
app.use("/api/v1/user", authRouter);

app.use(expressFileupload());

// file router
app.use("/public", express.static("./src/public"));
app.use("/", fileRouter);

app.listen(PORT, () => {
  console.log(`Server is started on port : ${PORT}`);
});

dbConnection();
