
const Section = require("../models/Section");
const SubSection = require("../models/SubSection")
const {imageUploader} = require("../utils/imageUploader");
require("dotenv").config();


//create SubSection
exports.createSubSection = async (req, res) => {
  try {
    /*  Rquired steps to create Subsection

          1. Fetch data from body. 
          2. Validate the fetched data.
          3. Upload the video file on clodinary and get link for videoUrl.
          4. Create new Subsection.
          5. Add this SubSection id in Section sehema. 
          6. Send positive response.
          7. Otherwise send negative response.
    */

    //Fetch data from body.
    const { title , duration, description, sectionId } = req.body;
    const videoFile = req.files.videoFile;

    //Validate the fetched data.
    if (!title || !duration|| !description|| !sectionId || !videoFile) {
     return res.status(401).json({
        success: false,
        message: "Please Fill all Fields",
      });
    }

    // upload the file on cloudinary and get link for videoUrl
    const video = await imageUploader(videoFile,`${process.env.FOLDER_NAME}/Videos`);
    if(!video)
    {
       return res.status(404).json({
            success:false,
            message:"Video url not found"
        })
    }

    //Create new Subsection.
    const subsectionData = await SubSection.create({ 
        title,
        duration,
        description,
        videoUrl:video.secure_url,
 });

    // Add this sectoin id in Section sehema.

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
         subSection:subsectionData._id,
        },
      },{new:true}
    );

    ///// HW : log updatdsection here , after populate query 
    // Send Positive response
     res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      subsectionData,
      updatedSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Failed to create a Subsection ",
    });
  }
};




// update the Subsection 
exports.updateSubSection = async (req, res) => {
  try {
    /*  Rquired steps to update Subsection

          1. Fetch data from body. 
          2. Validate the fetched data.
          3. Update the SubSection
          4. Send positive response.
          5. Otherwise send negative response.
    */

    //Fetch data from body.

        
    const {title,duration,description,subSectionId} = req.body;
    const videoFile = req.files.videoFile;
    //Validate the fetched data.
    if (!title || !duration || !description||!videoFile||!subSectionId) {
    return  res.status(401).json({
        success: false,
        message: "Invalid Subsection, Please try again",
      });
    }
    
    
    //Update Subsection.

    //upload video
    const video = await imageUploader(videoFile,`${process.env.FOLDER_NAME}/Videos`);

    if(!video)
    {  
       return res.status(401).json({
            success:false,
            message:"Video url not found"
        })
    }



    const UpdatedSubSection = await SubSection.findByIdAndUpdate({_id:subSectionId},{
        title:title,
        duration:duration,
        description:description,
        video:video.secure_url,
    },{new:true})

    // Send Positive response
    res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      UpdatedSubSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Failed to update Subsection ",
    });
  }
};





// Delete the Subsection 
exports.deleteSubSection = async (req, res) => {
  try {
   /*  Rquired steps to delete Subsection

          1. Fetch data from req.params. 
          2. Validate the fetched data.
          3. Delete Subsection. 
          4. Send positive response.
          5. Otherwise send negative response.
    */

    //Fetch data from req.params.
       // here we consider the SubsectionId get by the request parameter 
    const { subSectionId ,sectionId} = req.body;

    //Validate the fetched data.
    if (!subSectionId ||!sectionId) {
      return res.status(401).json({
        success: false,
        message: " Please fill all fields",
      });
    }

    //Delete Subsection.
    const subsection = await SubSection.findById(subSectionId)
    // const deletedSubSection = await SubSection.findByIdAndDelete({SubsectionId})
    if(!subsection){
      return res.status(401).json({
        success: false,
        message: "Subsection is not present",
      });
    }


    // delete subsection 
    subsection.deleteOne();

    // delete this Subsection from section 
     const updatedSection = await Section.findByIdAndUpdate(sectionId,
                                                       {$pull:{subSection:subSectionId}},{new:true}).exec();


    // Send Positive response
    res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      deletedSubSection : subsection,
      updatedSection :updatedSection,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Failed to delete Subsection",
    });
  }
};
