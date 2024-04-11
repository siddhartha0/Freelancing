const { timeStamp } = require("console");
const mongoose = require("mongoose");

const table = new mongoose.Schema({
  postTitle: {
    type: String,
    require: true,
  },
  postDescription: {
    type: String,
    require: true,
  },
  salary: {
    type: String,
    default: "Negotiable",
  },
  salaryStatus: {
    type: String,
    require: true,
  },
  ownerId: {
    type: String,
    require: true,
  },

  skills: [],
  clientId: [],
  completed: {
    type: Boolean,
    default: false,
  },
  acceptedClientId: {
    type: String,
    default: "",
  },
  projectTaken: {
    type: Boolean,
    default: false,
  },
  deadlineDate: {
    type: String,
  },
  newToDos: [],
  finishedToDos: [],
  postedDate: {
    type: String,
    default: new Date().toISOString(),
  },
});

const PostModel = mongoose.model("JobPost", table);

module.exports = PostModel;
