// import
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
   
  },
  review: {
    type: String,
    required: true,

  },

  user: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  
});


module.exports = mongoose.model("User",userSchema);