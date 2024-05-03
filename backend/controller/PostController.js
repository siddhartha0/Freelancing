const express = require("express");
const postModel = require("../model/PostModel");
const userModel = require("../model/authModel");
const router = express.Router();

router.post("/postJob", async (client, server) => {
  try {
    const jobDetails = client.body;
    const ownerId = client.body.ownerId;
    const checkUser = await userModel.findById(ownerId);

    if (checkUser) {
      const toSave = new postModel(jobDetails);
      const job = await toSave.save();
      console.log(job);
      server
        .status(200)
        .json({ msg: "Your Job has been posted", details: jobDetails });
    } else {
      server.status(400).json({ msg: "Sign in with us" });
    }
  } catch (error) {}
});

router.get("/getallPost", async (client, server) => {
  try {
    const getallPost = await postModel.find();
    server
      .status(200)
      .json({ msg: "Your Job has been posted", JobPost: getallPost });
  } catch (error) {}
});

router.get("/getPostById/:id", async (client, server) => {
  try {
    const jobId = client.params.id;
    const fetchDetails = await postModel.findById(jobId);

    server.status(200).json({ msg: "JobDetails", details: fetchDetails });
  } catch (error) {}
});

router.put("/updateJobPost", async (client, server) => {
  try {
    const jobDetails = client.body;

    await postModel.findByIdAndUpdate(jobDetails._id, jobDetails);

    server.status(200).json({ msg: "Changed your mind", details: jobDetails });
  } catch (error) {
    server.status(400).json({ msg: "This ain't your property" });
    console.log(error);
  }
});

router.delete("/deletePost", async (client, server) => {
  try {
    const ownerId = client.body.ownerId;
    const updatingBoi = client.body.updatingBoiId;

    const jobDetails = client.body;
    if (ownerId === updatingBoi) {
      const toSave = await postModel.findByIdAndDelete(jobDetails._id);

      server.status(200).json({ msg: "How much business did you do" });
    }
    server.status(400).json({ msg: "This ain't your property" });
  } catch (error) {}
});

module.exports = router;
