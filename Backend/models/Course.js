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

  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
  ],
  ratingAndReview: [
   {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rating",
    // required: true,
   }
],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  tag: {
    type:String,
  },

  studentEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
   
  ],
  instruction :{
      
    type:[String]
  }, 
  status:{
    type:String,
    enum :["Draft, Published"]

  }
});

module.exports = mongoose.model("Course", courseSchema);
