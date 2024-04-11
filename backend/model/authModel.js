const mongoose = require("mongoose");

const authModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  contact: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
    default: "",
  },
  jobTitle: {
    type: String,
    default: "",
  },
  experience: [],
  skill: [],
  project: [],
});

const authTable = mongoose.model("auth", authModel);

module.exports = authTable;
