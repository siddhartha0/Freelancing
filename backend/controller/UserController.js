const express = require("express");
const authTable = require("../model/authModel");

const controller = express.Router();
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectID;

controller.get("/getall", async (req, res) => {
  try {
    const userDetails = await authTable.find();
    res.status(200).send(userDetails);
  } catch (error) {
    console.log(error);
    res.send("Server has some issue");
  }
});

controller.get("/getById/:id", async (get, send) => {
  try {
    // const _id = ObjectId(get.params.id);
    // console.log(_id).type;
    const user = await authTable.findById(get.params.id);
    const toSend = {
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
      address: user.address,
      jotTitle: user.jobTitle,
      skill: user.skill,
      project: user.project,
      experience: user.experience,
    };

    if (user) {
      send.status(200).json({ user: toSend });
    } else {
      send.status(401).send("You are not authoriged to do such shit");
    }
  } catch (error) {
    console.log(error);
  }
});

controller.put("/update/:id", async (req, res) => {
  try {
    const searchUser = await authTable.findById(req.params.id);
    console.log(req.body);
    if (searchUser) {
      const newUserDetails = req.body;
      if (req.body.password) {
        const hashedPwd = (
          await bcrypt.hash(newUserDetails.password, 10)
        ).toString();
        const updatedUser = { ...newUserDetails, password: hashedPwd };
        await authTable.findByIdAndUpdate(req.params.id, updatedUser);
        res.status(200).json({ msg: "User has been updated", newUserDetails });
      } else {
        await authTable.findByIdAndUpdate(req.params.id, newUserDetails);
        res.status(200).json({ msg: "User has been updated", newUserDetails });
      }
    } else {
      res.status(401).send("Sorry you don't have that authority");
    }
  } catch (error) {
    console.log(error);
    res.send("Server has crashed");
  }
});

controller.delete("/del/:id", async (req, res) => {
  try {
    const searchUser = await authTable.findById(req.params.id);
    console.log(req.params.id);

    if (searchUser) {
      await authTable.deleteOne(searchUser);
      res.status(200).send("User has been deleted successfully");
    } else {
      res.status(401).send("Sorry the user doesnot exists");
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = controller;
