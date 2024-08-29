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
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },

  skills: [],
  clientId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
  ],
  completed: {
    type: Boolean,
    default: false,
  },

  acceptedClientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
  },

  projectDuration: {
    type: String,
    default: "1",
  },

  clientRecivedSalary: {
    type: Number,
  },

  moneySentPerSalaryStatus: {
    type: Number,
  },

  projectTaken: {
    type: Boolean,
    default: false,
  },

  deadlineDate: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  newToDos: [],
  finishedToDos: [],
  postedDate: {
    type: String,
    default: new Date().toISOString(),
  },
  task: {
    type: String,
  },
  taskCompletion: [],
});

const PostModel = mongoose.model("JobPost", table);

module.exports = PostModel;
