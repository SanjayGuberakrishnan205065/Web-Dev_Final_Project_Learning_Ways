const Tags = require("../models/Tags");


exports.createTags = async (req, res) =>{
    try {
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

exports.getAllTags = async (req,res)=>{
    try {

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