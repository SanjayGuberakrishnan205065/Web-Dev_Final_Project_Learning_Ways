//import
const User = require("../models/User");
const Course = require("../models/Course");
const { instance } = require("../config/razorpay");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../config/database");
const mongoose = require("mongoose");

//Cpture payment
exports.capturePayment = async (req, res) => {
  try {
    /* Requird steps to create the payment 
        
        1. Get course and user id 
        2. Vaidation , vaild course id , valid course details 
        3. User alrady paid or not for this course 
        4. Order create
        5. response 

        */

    // 1. Get course and user id
    const { course_id } = req.body;
    const userId = req.userId;

    // 2. Vaidation , vaild course id , valid course details
    if (!course_id) {
      return res.status(401).json({
        success: false,
        message: "Invaild course id ",
      });
    }

    let course;

    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res.status(401).json({
          success: false,
          message: "Could not found course",
        });
      }
      // 3. User alrady paid or not for this course
      // convert the user id into the object id because
      // in course model the studenenrolled section have obj is as user
      const uid = new mongoose.Types.ObjectId(userId);

      // check for already exist
      if (course.studentEnrolled.includes(uid)) {
        return res.status(401).json({
          success: false,
          message: "This Student already exist in course ",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // 4. Order create
    const amount = course.price;
    const currency = "INR";

    const options = {
      amount: amount,
      currency,
      recepit: Math.random(Date.now()).toString(),
      notes: {
        courseId: course_id,
        userId,
      },
    };

    try {
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);
      return res.status(200).json({
        success: true,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbNail: course.thumbNail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
        message: "Payment capture successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    // 5. response
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// verify Signature of razorpay and server

exports.verifySignature = async (req, res) => {
  /* Requird steps to create the payment 
        
        1. Get course and user id 
        2. Vaidation , vaild course id , valid course details 
        3. User alrady paid or not for this course 
        4. Order create
        5. response 

        */

  const signature = req.headers["x-razorpay-signature"]; // this is signature comming from razorpay in header
  // This signature is in hashed format

  const webhookSecret = "160802"; // this is webhookSecret on server
  const algorithm = "sha256"; //this is hashing algorithm
  // Create the Hmac object
  const shasum = crypto.createHmac(algorithm, webhookSecret);

  // Convert this in string format
  shasum.update(JSON.stringify(req.body));

  //Convert in hexa decimal format
  const digest = shasum.digest("hex");

  // finaly we got this digest similar type of signature
  // The all above steps create the hashed kay
  // that matches with provides signature from razorpay

  // Check signature and digest both are same

  if (signature === digest) {
    console.log("Payment is Authorized");

    //Payment is successfull So you need to play some action
    // 1. Create entry in course schema of studenEnrolled
    // 2. create the entry of course in student (user)

    // you need the userId and courseId to do this action
    //  this two id can get from notes that paset when create the payment

    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      // full fill actions
      // 1. Create entry in course schema of studenEnrolled
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        { $push: { studentEnrolled: userId } },
        { new: true }
      );

      // Check enroller is there
      if (!enrolledCourse) {
        return res.status(401).json({
          success: false,
          message: "Enrolled course not found ",
        });
      }

      // 2. create the entry of course in student (user)
      const enrolledStudent = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { courses: enrolledCourse._id } },
        { new: true }
      );

      //All done succesfully
      // Send mail of course registration confirmation
      const mailresponse = await mailSender(
        enrolledStudent.email,
        "Congratulation to join xyz course",
        "Congratulation, you are onborarded in to new Learning Ways Course"
      );

      console.log(mailresponse);
      return res.status(200).json({
        success: true,
        message: "Signature verified and course added successfully",
      });
      
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            success:false,
            message:error.message,
        })
    }
  }
  else{
    console.log(error);
    return res.status(401).json({
        success:false,
        message:error.message})
  }
};
