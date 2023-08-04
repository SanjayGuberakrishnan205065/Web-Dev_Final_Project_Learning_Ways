
// import 
const express = require("express");
const router = express.Router();

// import all handler 
const {sendOTP,signUp,login} =require("../controllers/Auth");
const {createCategory, getAllCategory,categoryPageDetails}=require("../controllers/Category");
const {contactUs}=require("../controllers/ContactUs");
const {createCourse,getAllCourse,getCourseDetails, UpdateCourse, deleteCourse}=require("../controllers/Course");
const {capturePayment,verifySignature}=require("../controllers/Payments");
const {updateProfile,deleteAccount,getAllUser, getEnrolledCourses, updateDisplayPicture}=require("../controllers/Profile");
const {createRating,averageRating,courseRating,getAllReating}=require("../controllers/Rating");
const {resetPasswordToken,resetPassword}=require("../controllers/ResetPassword");
const {createSection,UpdateSection,deleteSection}=require("../controllers/Section");
const {createSubSection,updateSubSection,deleteSubSection}=require("../controllers/SubSection");
const {testing} =require("../utils/testing");


//testing
router.post("/testing",testing);



// import middleware 
const {auth, isStudent, isInstructor, isAdmin} = require("../middlewares/auth");

//********************************************************************************************************************
//********************************************************************************************************************
//                                              USER ROUTER
//********************************************************************************************************************
//********************************************************************************************************************



//********************************************************************************************************************
//                                            Authentication routes
//********************************************************************************************************************

//User login 
router.post("/auth/login",login);

//User signUp
router.post("/auth/signup",signUp)

//Sendning otp to user mail
router.post("/auth/sendotp",sendOTP);

//Change Password 

//********************************************************************************************************************
//                                             Reset Password 
//********************************************************************************************************************

//Geneteate password token 
router.post("/auth/reset-password-token",resetPasswordToken);

//Reset password 
router.post("/auth/reset-password",resetPassword);


//********************************************************************************************************************
//********************************************************************************************************************
//                                              COURSE ROUTER 
//********************************************************************************************************************
//********************************************************************************************************************



//********************************************************************************************************************
//                                              Course Routes 
//********************************************************************************************************************

//This route only for instructor 

//Create course 
router.post("/course/createCourse", auth, isInstructor, createCourse);

//update course 
router.post("/course/updateCourse", auth, isInstructor, UpdateCourse);

// Geting course details 
// Get all course 
router.get("/course/getAllCourses",getAllCourse);

// Get detail of perticularr course 
router.get("/course/getCourseDetails",getCourseDetails);


// delete course 
router.delete("/course/deleteCourse",deleteCourse);


//********************************************************************************************************************
//                                              Section And Subsection 
//********************************************************************************************************************

//Add section 
router.post("/course/addSection", auth, isInstructor,createSection);

//Update section 
router.post("/course/updateSection", auth, isInstructor, UpdateSection);

//Delete section
router.post("/course/deleteSection", auth, isInstructor,deleteSection);


//Add subsectin in to section 
router.post("/course/addSubSection", auth, isInstructor,createSubSection);

//Edit subsection 
router.post("/course/updateSubSection", auth, isInstructor,updateSubSection);

//Delete SubSection
router.post("/course/deleteSubSection", auth, isInstructor,deleteSubSection);






//********************************************************************************************************************
//                                              Category Routes (only for Admin)
//********************************************************************************************************************

// category can only be created by Admin
//Create category 
router.post("/course/createCategory",auth,isAdmin,createCategory);

//ShowAll category 
router.get("/course/showALLCategories", getAllCategory);

//Get categorypage details 
router.get("/course/getCategoryPageDetails",categoryPageDetails)




//********************************************************************************************************************
//                                               Rating and Review
//********************************************************************************************************************

//Create raeting 
router.post("/course/createRating", auth, isStudent, createRating)

//Get average rating 
router.get("/course/getAverageRating", averageRating)

// Get all reviews 
router.get("/course/getReviews", getAllReating)

//Get reating for perticular course 
router.get("/course/getCourseRating",courseRating)



//********************************************************************************************************************
//                                               Profile Route
//********************************************************************************************************************

//Update profile
router.put("/profile/updateProfile", auth,updateProfile)

//Get User datils 
router.get("/profile/getUserDetails", auth,getAllUser);

// Delete acount 
router.delete("/profile/deleteProfile",auth,deleteAccount)

// Get enrolled courses 
router.get("/profile/getEnrolledCpourse", auth,getEnrolledCourses);

//Updated display picture 
router.put("/profile/updatedDisplyPicture", auth,updateDisplayPicture)

//Contact Us 
router.post("/profile/contactUs",contactUs)

//********************************************************************************************************************
//                                               Payment Route
//********************************************************************************************************************

//Capture Payment 
router.post("/payment/capturePayment", auth, isStudent, capturePayment)

//Verify signiture 
router.post("/payment/verifySignature", verifySignature)





module.exports = router




