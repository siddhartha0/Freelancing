const express = require("express");
const model = require("../model/applicationModel");

const router = express.Router();

router.post("/sendCv", async (client, server) => {
  try {
    const toSave = new model(client.body);
    await toSave.save();
    server.status(200).json({ msg: "Uploaded successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/showapplication", async (client, server) => {
  try {
    const getapplication = await model.find();
    server.status(200).json({ body: getapplication });
  } catch (error) {}
});

router.delete("/rejectapplication/:id", async (client, server) => {
  try {
    const id = client.params.id;
    const check = await model.findById(id);
    if (check) {
      await model.findByIdAndDelete(id);
      server.status(200).send("Rejected");
    }
  } catch (error) {}
});

router.post("/acceptApplication/:id", async (client, server) => {
  try {
  } catch (err) {}
});

module.exports = router;
