const express = require("express");

const app = express();
const cors = require("cors");
const authController = require("./controller/authController");
const userController = require("./controller/UserController");
const postController = require("./controller/PostController");
const uploadFile = require("./controller/FileController");
const mongoose = require("mongoose");
const applicationController = require("./controller/applicationController");
const env = require("dotenv");
// const json = require("json()");

app.use(express.json());
app.use(cors());
app.use("/auth", authController);
app.use("/user", userController);
app.use("/job", postController);
app.use("/upload", uploadFile);
app.use("/application", applicationController);

app.use(express.static("public"));
app.use("/cv", express.static("cv"));

env.config();

mongoose.connect(process.env.MONGO_USER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
