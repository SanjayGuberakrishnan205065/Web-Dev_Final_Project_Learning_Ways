// import
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  whatYouWillLearn :{
    type:String,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbNail: {
    type: String,
    required: true,
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  courceContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
  ],
  ratingAndReview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rating",
    required: true,
  },

  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tags",
    required: true,
  },

  studentEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
