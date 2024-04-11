const express = require("express");
const authTable = require("../model/authModel");
const encrypt = require("bcrypt");
const token = require("jsonwebtoken");
const cookie = require("cookie-parser");

const controller = express.Router();
controller.post("/register", async (req, res) => {
  try {
    const userDetails = req.body;
    console.log(userDetails);

    if (userDetails.name !== null && userDetails.pwd !== null) {
      const pwd = userDetails.pwd;
      const encrypted = (await encrypt.hash(pwd, 10)).toString();
      const toSave = {
        ...userDetails,
        password: encrypted,
      };

      const newUser = new authTable(toSave);

      await newUser.save();
      res.status(200).json({ msg: "User has been registered successfully." });
    } else {
      res.status(401).json({ msg: "Please do enter the required field" });
    }
  } catch (error) {
    res.status(400).json({ msg: "Server has some issue" });
    console.log(error);
  }
});

controller.post("/login", async (req, res) => {
  try {
    const userDetails = req.body;

    if (userDetails.name !== null && userDetails.password !== null) {
      const searchUser = await authTable.findOne({ name: userDetails.name });

      if (searchUser) {
        const encrypted = await encrypt.compare(
          userDetails.password,
          searchUser.password
        );

        if (encrypted) {
          const accessToken = token.sign(
            {
              user: searchUser.name,
              pwd: userDetails.pwd,
            },
            "freelancing"
          );

          res.status(200).json({
            msg: "User has been logged in successfully.",
            token: accessToken,
            userId: searchUser._id.toString(),
          });
        } else {
          res.json({ msg: "You have entered incorrect password" });
        }
      } else {
        res.json({ msg: "You haven't registered yet" });
      }
    } else {
      res.json({ msg: "Please do enter the required field" });
    }
  } catch (error) {
    res.status(400).send("Server has some issue");
    console.log(error);
  }
});

module.exports = controller;
