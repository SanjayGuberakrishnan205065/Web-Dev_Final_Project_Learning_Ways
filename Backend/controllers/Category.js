const Tags = require("../models/Category");


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
        const tag = await Tags.create({
            name:name,
            description:description,
        });
        console.log(tag);

        res.status(200).json({
            success:true,
            message:"Tag Entry Created Successfully",
        })

        
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Tag entry not created , please try again",
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

        //get data from tag module 

        const tags = await Tags.find({},{name:true, description:true}) 
        // data must have this name and the description parameter 

        res.status(200).json({
            success:true,
            message:"Data Get successfully ",
            tags,
        })


        
    } catch (error) {

        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Fail to fetch the data of tags",
          });
        
        
    }
}