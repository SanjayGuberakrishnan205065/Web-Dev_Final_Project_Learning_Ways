
const { UploadStream } = require("cloudinary");
const Course = require("../models/Course");
const Category = require("../models/Category")
const User = require("../models/User")
const imageUploader = require("../utils/imageUploader")


//create the new courses 

exports.createCourse = async (req, res)=>
{
    /*
     To create the course the required steps are below,

     1. Fetch the data from request body. 
     2. Get image file from request files for thumbNail.
     3. Validate Data.
     4. Find the instructor using req.use.id and validate it.
     5. Get category details and validate it.
     6. Uoload the image of thumbNail on cloudinary and get url.
     7. Create entry in Course Schema.
     8. Add this course id in instructor's courses arrray
     9. Similariy in Catagory  schema
     10. Return positive response.
     11. Otherwise return negative response
     */

    try {
        //get data from body 
        const {
            courseName, 
            courseDescription, 
            whatYouWillLearn,
            price, 
            tag ,
           category} =req.body;
        
        // get thumbnail
        const thumbNail = req.files.thumbNailImage;

       //validate the data 
       if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbNail,category) 
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

        if(!instructorDetails)
        {
            return res.status(404).json({
                success:false,
                message:"Instructor Not Found"
            });
        }

         //fetch the details of Catagory
         const categoryDetails = await User.findById(category);

         //check tag is present 
 
         if(!categoryDetails)
         {
             return res.status(404).json({
                 success:false,
                 message:"category Not Found"
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

        //update the Category Schema 
        await Category.findByIdAndUpdate({_id:category},
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
    /*To create the course the required steps are below,

     1. By using find() method get all course Details with send all parameter true and populate instructor
     2. Return positive response.
     3. Otherwise return negative response
     
     */


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