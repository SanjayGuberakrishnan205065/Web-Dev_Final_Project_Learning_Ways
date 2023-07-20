
// import 
const mongoose = require("mongoose");
require("dotenv").config();


// create connection to data base & export it
exports.connection = ()=>{
    mongoose.connect(process.env.DATABASE_UERL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=> console.log("Database Connected Successfully"))
    .catch((error)=>{
        console.log("Database Connection Failed");
        console.log("Error Accure when DB connection : ",error);
        process.exit(1);
    })
}