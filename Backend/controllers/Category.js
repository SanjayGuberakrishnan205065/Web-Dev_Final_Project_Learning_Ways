const Category = require("../models/Category");
const Course =require("../models/Course");



exports.createCategory = async (req, res) =>{
    try {
        /*
        To create the category required steps 

        1. Fetch Data 
        2. validate 
        3. Create Entry in Database
        4. Return positive response.
        5. Otherwise return negative response
        
         */

        //fetch Data 
        const {name ,description} = req.body;
        //validate 
        if(!name || !description){
            return res.status(401).json({
                success: false,
                message: "Please fill all fields",
              });
            

        }

        //Create Entry in DB
        const category = await Category.create({
            name:name,
            description:description,
        });
        console.log(category);

        res.status(200).json({
            success:true,
            message:"category Entry Created Successfully",
        })

        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "category entry not created , please try again",
          });
        
        
    }
}

exports.getAllCategory = async (req,res)=>{
    try {
        /*To get all Category, The required steps are below,

     1. By using find() method get all course Details with send all parameter true and populate instructor
     2. Return positive response.
     3. Otherwise return negative response
     
     */

        //get data from category module 

        const  cataegory= await Category.find({},{name:true, description:true}) 
        // data must have this name and the description parameter 

        res.status(200).json({
            success:true,
            message:"Data Get successfully ",
            cataegory,
        })


        
    } catch (error) {

        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Fail to fetch the data of cataegory",
          });
        
        
    }
}



//category Page details 

exports.categoryPageDetails = async (req,res)=>{
    try {
        /*
        Required steps to Get the category page details 

        1. Get categoryId 
        2. Get courses for perticular category 
        3. validation
        4. Get course for different category 
        5. Get top selling courses 
        6. return responce.

         */

        // 1. Get categoryId 
        const {categoryId}= req.body;

        // 2. Get courses for perticular category 
        const selectedCategory = await Category.findById(categoryId)
                                                       .populate("course").exec();
        // 3. validation
        if(!selectedCategory)
        {
            return res.status(404).json({
                success:false,
                message:"Category data not found "
            })
        }

        // 4. Get course for different category 
        const differentCategories = await Category.findById({_id:{$ne:categoryId}})  // not equal to category id
                                                                .populate("course").exec();

        if(!differentCategories)
        {
            return res.status(404).json({
                success:false,
                message:"Different Category data not found "
            })
        }
        // 5. Get top selling courses 
        const topSelling = Course.aggregate([
            // Unwind the studentEnrolled array to create separate documents for each student ID
            { $unwind: "$studentEnrolled" },
            // Group the documents by courseId and count the number of occurrences for each courseId
            { $group: { _id: "$_id", studentEnrolled: { $sum: 1 } } },
            // Sort the courses in descending order based on the studentEnrolled
            { $sort: { studentEnrolled: -1 } },
            // Limit the output to the top 10 courses
            { $limit: 10 }
          ])

        // 6. return responce.
        
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories,
                topSelling,
            },
            message:"All category data send successfully "
        })
        

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to fetch category data."
        })
        
    }
}