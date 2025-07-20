const Section = require("../models/Section");
const Course = require ("../models/Course");

exports.createSection = async (req,res) => {
    try{
        //data fetch
        //data validation
        //create section 
        //update course wwwith section update id
        //return response
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Section is not created ",
            error : error.message,
        })

    }
    
}