
// import 
const express = require("express");

const router = express.Router();

// import all handler 
const {sendOtp,signUp,login} =require("../controllers/Auth");
const {createCategory, getAllCategory,categoryPageDetails}=require("../controllers/Category");
const {aboutUs}=require("../controllers/ContactUs");
const {createCourse,getAllCourse,getCourse}=require("../controllers/Course");
const {capturePayment,verifySignature}=require("../controllers/Payments");
const {updateProfile,deleteAccount,getAllUser}=require("../controllers/Profile");
const {crerateRating,averageRating,courseRating,getAllReating}=require("../controllers/Rating");
const {resetPasswordToken,resetPassword}=require("../controllers/ResetPassword");
const {createSection,UpdateSection,deleteSection}=require("../controllers/Section");
const {createSubSection,updateSubSection,deleteSubSection}=require("../controllers/SubSection");

// import middleware 
const {auth, isStudent, isInstructor, isAdmin} = require("../middlewares/auth");


// create routes 
router.post("",);
router.post("",);
router.post("",);
router.post("",);
router.post("",);
router.post("",);
router.post("",);
router.post("",);
router.post("",);
router.post("",);
router.post("",);
router.post("",);
router.post("",);


router.put("",);
router.put("",);
router.put("",);


router.get("",);
router.get("",);
router.get("",);
router.get("",);
router.get("",);
router.get("",);
router.get("",);
router.get("",);
router.get("",);


router.delete("",);


