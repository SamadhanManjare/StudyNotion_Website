const Course = require ("../models/Course");
const Tags = require("../models/tags");
const User = require ("../models/User");
const {imageUploadtoCloudinary} = require("../utils/imageUploader");


exports.createCourse = async (req,res) => {

    try{

    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }
    
}