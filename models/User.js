const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    firstName :{
        type : String,
        required : true,
        trim : true,
    },
    lastName :{
        type : String,
        required : true,
        trim : true,
    },
    password :{
        type : String,
        required : true,
        
    },
    email:{
        type : String,
        required : true,
        trim : true,
    },
    accountType : {
        type : String,
        required : true,
        enum :["Admin", "Student", "Instructor"],
    },
    additionalDetails : [{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "profile"
    }
    ],
    courses:[{
        type : mongoose.Schema.Types.ObjectId,
        ref:"course"
    }
    ],
    image : {
        type : String,
        required :true
    },
    token : {
        type : String,
    },
    resetPasswordExpires : {
        type : Date,
    },
    courseProgress :[ {
        type : mongoose.Schema.Types.ObjectId,
        ref : "CourseProgress"
    }
    ],
});

module.exports = mongoose.model("User", userschema);