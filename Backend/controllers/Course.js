
const { UploadStream } = require("cloudinary");
const Course = require("../models/Course");
const Category = require("../models/Category")
const User = require("../models/User")
const {imageUploader} = require("../utils/imageUploader");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");


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
       if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbNail || !category) 
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
         const categoryDetails = await Category.findById({_id:category});

         //check tag is present 
 
         if(!categoryDetails)
         {
             return res.status(404).json({
                 success:false,
                 message:"category Not Found"
             });
         }

         //upload the file on cloudinary 
         const thumbNailImage = await imageUploader(thumbNail,`${process.env.FOLDER_NAME}/ThumbNails`);

         //create the entry in Database 
         const newCourse = await Course.create({
            courseName,
            courseDescription,
            price,
            whatYouWillLearn:whatYouWillLearn,
            thumbNail:thumbNailImage.secure_url,
            instructor:instructorDetails._id,
            tag:tag,
            category:categoryDetails._id

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
            coursedata:newCourse,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Failed to create a course ",
          });
        
        
    }

}

//update course 

exports.UpdateCourse = async (req,res)=>{

/*
// Required steps for to uodate course 
  1. Fetch data from body 
  2. Validate data 
  3. By using findByIdAndUpdate() function update all data 
  4. return response 
 */


  try {
        //   1. Fetch data from body 
         const { courseName, 
            courseDescription, 
            whatYouWillLearn,
            price, 
            tag ,
            category,
            courseId} = req.body;

        const imageFile = req.files.imageFile;

            
        //   2. Validate data 
        if( !courseName || !courseDescription || !whatYouWillLearn || !price || !tag  || !category || !courseId || !imageFile)
        {

            return res.status(401).json({
                success: false,
                message: "All fildes required, please fill all.",
              });

        }
       //upload the file on cloudinary 
         const thumbNailImage = await imageUploader(imageFile,`${process.env.FOLDER_NAME}/ThumbNails`);

        //   3. By using findByIdAndUpdate() function update all data 
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{
            courseName:courseName,
            courseDescription:courseDescription,
            whatYouWillLearn:whatYouWillLearn,
            thumbNail:thumbNailImage.secure_url,
            price:price,
            tag :tag,
            category:category
    
        })

        res.status(200).json({
            success:true,
            message:"Course updated successfully",
            updatedCourse:updatedCourse,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Failed to upadte course ",
          });
        
        
    }

}


// get the all coursese 

exports.getAllCourse = async (req, res)=>
{
    /*To get the All courses the required steps are below,

     1. By using find() method get all course Details with send all parameter true and populate instructor
     2. Return positive response.
     3. Otherwise return negative response

     */


    try {

        // Get data from the course 

         const  coursedata = await Course.find({},{
            courseName:true,
            courceContent:true,
            price:true,   
            thumbNail:true,
            instructor:true,
            ratingAndReview:true,
            category:true,
            studentEnrolled:true

         }).populate("instructor").populate("courseContent")
         .populate("ratingAndReview").populate("category").
         populate("studentEnrolled").exec();

        res.status(200).json({
            success:true,
            message:" All Course fetched successfully",
            data:coursedata,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Failed to fetch all  a course ",
          });
        
        
    }

}
 
//get single course details 
exports.getCourseDetails = async (req, res) => {
    try {
            //get id
            const {courseId} = req.body;
            //find course details
            const courseDetails = await Course.findById(
                                        {_id:courseId}).populate("courseContent")
                                        .populate(
                                            {
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails",
                                                },
                                            }
                                        )
                                        .populate("category")
                                        //.populate("ratingAndreviews")
                                        .populate({
                                            path:"courseContent",
                                            model:Section,
                                            populate:{
                                                path:"subSection",
                                                model:SubSection
                                            },
                                        })
                                        .exec();

                //validation
                if(!courseDetails) {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the course with ${courseId}`,
                    });
                }
                 console.log(courseDetails.courseContent[0])
                const d1 =  await Section.findById(courseDetails.courseContent[0]);
                //return response
                return res.status(200).json({
                    success:true,
                    message:"Course Details fetched successfully",
                    data:courseDetails,
                    section:d1,
                })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

//delete course 
exports.deleteCourse = async (req, res) => {
    // try {
    //  /*  Rquired steps to delete section
  
    //         1. Fetch data from req.params. 
    //         2. Validate the fetched data.
    //         3. Delete course 
    //         4. Delete sections under thid course and delete subsection under all this subsection
    //         4. Send positive response.
    //         5. Otherwise send negative response.
    //   */
  
    //   //Fetch data from req.params.
    //      // here we consider the sectionId get by the request parameter 
    //   const { courseId } = req.body;
  
    //   //Validate the fetched data.
    //   if (!courseId) {
    //     return res.status(401).json({
    //       success: false,
    //       message: " Please fill all fields",
    //     });
    //   }
  
      
    //   const course = await Section.findById(courseId);
    //   if(!course)
    //   {
    //     return res.status(401).json({
    //       success: false,
    //       message: "course not found ",
    //     });
    //   }
      
      
    //   //Delete course 
      
      
    //   const deletedSection = await Section.findByIdAndDelete(sectionId)
  
  
    //   // update course
    //   const updatedCourse = await Course.findByIdAndUpdate(courseId,{
    //     $pull: { courseContent: sectionId} },
    //     { new: true } ).exec();
  
  
    //     //deleted all section under this course
    //     if(course.subSection)
    //     {
  
    //       await SubSection.deleteMany({ _id: { $in: section.subSection} });
    //     }
  
    //   // Send Positive response
    //   return res.status(200).json({
    //     success: true,
    //     message: "Section deleted successfully",
    //     deletedSection,
    //   });
    // } catch (error) {
    //   console.log(error);
    //   return res.status(401).json({
    //     success: false,
    //     message: "Failed to delete section",
    //     // updatedCourse:updatedCourse,
    //   });
    // }

        try {
            const {courseId}  =req.body;
          const course = await Course.findById(courseId);
      
          if (!course) {
            console.log('Course with the given ID not found.');
            return res.status(404).json({
                success:false,
                message:"course not found"
            });
          }
      
          // Delete all related sections and their subsections
          for (const sectionId of course.courseContent) {
            const section = await Section.findById(sectionId);
            if (section) {

              await SubSection.deleteMany({ _id: { $in: section.subSection} });
              await section.deleteOne();
            }
          }
      
          // Delete the course
          await course.deleteOne();
      
          console.log('Course and related sections/subsections deleted successfully!');
          res.status(404).json({
            success:true,
            message:"course deleted succesfully"})

        } catch (error) {
          console.error('Error deleting course and related data:', error);
          res.status(404).json({
            success:false,
            message:"Failed to delete course "});
        }
      
  };
  


