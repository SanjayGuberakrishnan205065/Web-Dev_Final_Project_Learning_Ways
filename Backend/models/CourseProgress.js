// import
const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
 
  courses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },

  completedVideo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
      required: true,
    },
  ],
});


module.exports = mongoose.model("CourseProgress",courseProgressSchema);