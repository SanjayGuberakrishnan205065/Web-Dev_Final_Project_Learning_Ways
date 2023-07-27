
const { mongoose } = require("mongoose");
const Profile = require("../models/Profile");
const User = require("../models/User");
const {imageUploader} = require("../utils/imageUploader");



exports.updateProfile = async (req, res)=>{
    try{
  /*  Rquired steps to update section

          1. Fetch data from body. 
          2. Validate the fetched data.
          3. User detail from req.user
          4. Get profile id from userDetails. 
          5. Get profile details using profile id 
          4. Update the Profile.
          5. Send positive response.
          6. Otherwise send negative response.
    */

    //Fetch data from body.

        
    const {gender, DOB="", about="", contact} = req.body;
    const userId =req.user.id; 
    console.log(userId);

    //Validate the fetched data.
    if (!gender|| !contact || !userId) {
     return res.status(401).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    //Get User detail from req.user 
    const userDetails = await User.findById(userId) ;

    //Get profile details from userDetails 
     const profileId = userDetails.additionalDetails;
     const profileDetails = await Profile.findById(profileId);
 
    //Update Profile.
    profileDetails.gender=gender;
    profileDetails.DOB= DOB;
    profileDetails.about=about;
    profileDetails.contact=contact;

    await profileDetails.save();


    // Send Positive response
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
     profileDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Failed to update Profile ",
    });
  }
};


//delete the acount 
exports.deleteAccount = async (req, res)=>{
    try{ 

 /*  Rquired steps to delete section

          1. Get id from req.user.id
          2. Validate the fetched data.
          3. First of all delete the profile 
          4. Then delete count from total studend enrolled.
          5. Finaly delete the User acount 
          6. Send positive response.
          7. Otherwise send negative response.
    */

    //Fetch data from req.usr .
      
       const userId = req.user.id;
       console.log(userId);

    //    2. Validate the fetched data.
      const userDetails = await User.findById(userId);
      if(!userDetails)
      {
        return res.status(401).json({
            success:false,
            message:"user not found",
        })
      }

    //    3. First of all delete the profile 
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
    /////// HW    4. Then delete count from total student enrolled.

    //    5. Finaly delete the User acount 
      const daletedAccount=  await User.findByIdAndDelete({_id:userId});
   
       // Send Positive response
       return res.status(200).json({
         success: true,
         message: "Acount deleted successfully",
        deleteAccount:this.deleteAccount
       });
     } catch (error) {
       console.log(error);
       return res.status(401).json({
         success: false,
         message: "Failed to delete acount",
       });
     }
   };
   



   // get all User 

exports.getAllUser = async (req,res)=>{

    try {

        /*  Required Steps to get all users
        1. Get id
        2. Fetch databy id 
        3. return response
        */

        // 1. Get id
           const id = req.user.id;
        // 2. Fetch databy id 
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        
  // Send Positive response
  return res.status(200).json({
    success: true,
    message: "User data fetched successfully",
    data:userDetails
  
  });
} catch (error) {
  console.log(error);
  return res.status(401).json({
    success: false,
    message: "Failed Fetch user details",
  });
}
};


// the get ALL enrolled course 
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec()
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};


// when user update yhere profie picture 

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId =req.user.id; 
    // const userId= 4555
    console.log(userId)
    const image = await imageUploader(
      displayPicture,
      `${process.env.FOLDER_NAME}/Profile`,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};