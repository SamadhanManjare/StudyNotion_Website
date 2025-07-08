const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName : {
        type : String,
    },
    courseDescription :{
        type : String,
    },
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    whatyouwilllearn : {
        type : String,
    },
    courseContent : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Section"
    }],
    ratingandreview : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "RatingandReview"
    }],
    thumbnail : {
        type : String,
    },
    price : {
        type : Number,
    },
    tag : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tag"
    },
    studentsEnrolled : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }]


});

module.exports = mongoose.model("Course", courseSchema);