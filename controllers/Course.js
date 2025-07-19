const Course = require ("../models/Course");
const Tags = require("../models/tags");
const User = require ("../models/User");
const {imageUploadtoCloudinary} = require("../utils/imageUploader");


exports.createCourse = async (req,res) => {

    try{

        const {courseName, courseDescription, Whatyouwilllearn, price, tag} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;

        //validation 
        if(!courseName || !courseDescription || !Whatyouwilllearn || !price || !tag){
            return res.status(400).json({
                success : false,
                message : "All fields are required",
            })
        }

        //check for instructor
        const userId = req.User.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details :", instructorDetails);


        if(!instructorDetails){
            return res.status(404).json({
                success : false,
                message : "Instructor Details are not found "
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
    
}