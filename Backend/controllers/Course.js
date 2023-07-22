
const { UploadStream } = require("cloudinary");
const Course = require("../models/Course");
const Tags = require("../models/Category")
const User = require("../models/User")
const imageUploader = require("../utils/imageUploader")


//create the new courses 

exports.createCourse = async (req, res)=>
{

    try {
        //get data from body 
        const {
            courseName, 
            courseDescription, 
            whatYouWillLearn,
            price, 
            tag } =req.body;
        
        // get thumbnail
        const thumbNail = req.files.thumbNailImage;

       //validate the data 
       if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbNail) 
       {
        return res.status(401).json({
            success: false,
            message: "All fildes required, please fill all.",
          });

       }   

       ///////TODO is user id and insrtructorDetail._id same 

       //check the inctructor or to store the instructor info in course 
       const userId = req.user.id;     // this is comes from the previous middele ware (auth->isInstructor->...)
        //fetch the details of instructor 
        const instructorDetails = await User.findById(userId);

        //check instructor is present 

        if(instructorDetails)
        {
            return res.status(404).json({
                success:false,
                message:"Instructor Not Found"
            });
        }

         //fetch the details of tag 
         const tagDetails = await User.findById(tag);

         //check tag is present 
 
         if(tagDetails)
         {
             return res.status(404).json({
                 success:false,
                 message:"tag Not Found"
             });
         }

         //upload the file on cloudinary 
         const thumbNailImage = await imageUploader(thumbNail,process.env.FOLDER_NAME);

         //create the entry in Database 
         const newCourse = await Course.create({
            courseName,
            courseDescription,
            price,
            whatYouWillLearn:whatYouWillLearn,
            thumbNail:thumbNailImage.secure_url,
            instructor:instructorDetails._id,
            tag:tagDetails._id
         })


         // add the new course in users instructor course list 
         await User.findByIdAndUpdate({_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },{new:true})

        //update the tag Schema 
        await Tags.findByIdAndUpdate({_id:tag},
            {
                $push:{

                    course:newCourse._id,
                }

        }, {new:true})

        res.status(200).json({
            success:true,
            message:"Course created successfully",
            coursedata,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Failed to create a course ",
          });
        
        
    }

}




// get the all coursere 

exports.getAllCourse = async (req, res)=>
{

    try {

        // get data from the course 

         const  coursedata = await Course.find({},{
            courseName:true,
            price:true,   
            thumbNail:true,
            instructor:true,
            ratingAndReview:true,
            studentEnrolled:true

         }).populate("instructor").exec();

        res.status(200).json({
            success:true,
            message:"Course created successfully",
            data:coursedata,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Failed to create a course ",
          });
        
        
    }

}