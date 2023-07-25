
// import 
const express = require("express");

const router = express.Router();

// import all handler 
const {sendOtp,signUp,login} =require("../controllers/Auth");
const {createCategory, getAllCategory,categoryPageDetails}=require("../controllers/Category");
const {contactUs}=require("../controllers/ContactUs");
const {createCourse,getAllCourse,getCourse}=require("../controllers/Course");
const {capturePayment,verifySignature}=require("../controllers/Payments");
const {updateProfile,deleteAccount,getAllUser, getEnrolledCourses, updateDisplayPicture}=require("../controllers/Profile");
const {createRating,averageRating,courseRating,getAllReating}=require("../controllers/Rating");
const {resetPasswordToken,resetPassword}=require("../controllers/ResetPassword");
const {createSection,UpdateSection,deleteSection}=require("../controllers/Section");
const {createSubSection,updateSubSection,deleteSubSection}=require("../controllers/SubSection");

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
router.post("/login",login);

//User signUp
router.post("/signup",signUp)

//Sendning otp to user mail
router.post.apply("sendotp",sendOtp);

//Change Password 

//********************************************************************************************************************
//                                             Reset Password 
//********************************************************************************************************************

//Geneteate password token 
router.post("reset-password-token",resetPasswordToken);

//Reset password 
router.post("reset-password",resetPassword);


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
router.post("/createCourse", auth, isInstructor, createCourse);

//Add section 
router.post("/addSection", auth, isInstructor,createSection);

//Update section 
router.post("/updateSection", auth, isInstructor, UpdateSection);

//Delete section
router.post("/deleteSection", auth, isInstructor,deleteSection);

//Edit subsection 
router.post("/updateSubSection", auth, isInstructor,updateSubSection);

//Delete SubSection
router.post("/deleteSubSection", auth, isInstructor,deleteSubSection);

//Add subsectin in to section 
router.post("/addSubSection", auth, isInstructor,createSubSection);


// Geting course details 
// Get all course 
router.get("/getAllCourses",getAllCourse);

// Get detail of perticularr course 
router.get("/getCourseDetails",getCourse);




//********************************************************************************************************************
//                                              Category Routes (only for Admin)
//********************************************************************************************************************

// category can only be created by Admin
//Create category 
router.post("/createCategory",createCategory);

//ShowAll category 
router.get("/showAllCourses", getAllCategory);

//Get categorypage details 
router.get("/getCategoryPageDetails",categoryPageDetails)




//********************************************************************************************************************
//                                               Rating and Review
//********************************************************************************************************************

//Create raeting 
router.post("/createRating", auth, isStudent, createRating)

//Get average rating 
router.get("/getAverageRating", averageRating)

// Get all reviews 
router.get("/getReviews", getAllReating)

//Get reatinh for perticular course 
router.get("getCourseRation",courseRating)



//********************************************************************************************************************
//                                               Profile Route
//********************************************************************************************************************

//Update profile
router.put("/updateProfile", auth,updateProfile)

//Get User datils 
router.get("/getUserDetails",getAllUser);

// Delete acount 
router.delete("/deleteProfile",deleteAccount)

// Get enrolled courses 
router.get("/getEnrolledCpourse",getEnrolledCourses);

//Updated display picture 
router.put("/updatedDisplyPicture",updateDisplayPicture)

//Contact Us 
router.post("/contactUs",contactUs)

//********************************************************************************************************************
//                                               Payment Route
//********************************************************************************************************************

//Capture Payment 
router.post("/capturePayment", auth, isStudent, capturePayment)

//Verify signiture 
router.post("/verifySignature", verifySignature)





module.exports = router




