const multer = require("multer");
const express = require("express");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (client, file, cb) => {
    cb(null, "./public/cv");
  },
  filename: (client, file, cb) => {
    cb(null, client.body.name);
  },
});

const taskStorage = multer.diskStorage({
  destination: (client, file, cb) => {
    cb(null, "./public/task");
  },
  filename: (client, file, cb) => {
    cb(null, client.body.name);
  },
});

const testStorage = multer.diskStorage({
  destination: (client, file, cb) => {
    cb(null, "./public/completedTask");
  },
  filename: (client, file, cb) => {
    cb(null, client.body.name);
  },
});

const upload = multer({ storage: storage });
const taskUpload = multer({ storage: taskStorage });
const testUpload = multer({ storage: testStorage });

router.post(
  "/document/",
  upload.single("file", (client, server) => {
    try {
      const name = client.name;
      console.log(name);
      return server.status(200).send("Success");
    } catch (error) {
      console.log(error);
    }
  })
);

router.post(
  "/task/",
  taskUpload.single("file", (client, server) => {
    try {
      const name = client.name;
      console.log("task", name);

      return server.status(200).send("Success");
    } catch (error) {
      console.log(error);
    }
  })
);

router.post(
  "/completedTask/",
  testUpload.single("file", (client, server) => {
    try {
      const name = client.name;
      console.log(name);

      // const toSave = new model();

      return server.status(200).send("Success");
    } catch (error) {
      console.log(error);
    }
  })
);

module.exports = router;
