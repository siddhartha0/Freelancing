const mongoose = require("mongoose");

const table = new mongoose.Schema({
  userId: {
    type: String,

    required: true,
  },
  name: {
    type: String,
  },
  jobId: {
    type: String,
  },
  userName: {
    type: String,
  },
});

const applicationModel = mongoose.model("application", table);

module.exports = applicationModel;
