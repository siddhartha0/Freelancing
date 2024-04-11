const multer = require("multer");
const express = require("express");

const router = express.Router();
const model = require("../model/applicationModel");

const storage = multer.diskStorage({
  destination: (client, file, cb) => {
    cb(null, "./public/cv");
  },
  filename: (client, file, cb) => {
    cb(null, client.body.name);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/document/",
  upload.single("file", (client, server) => {
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
