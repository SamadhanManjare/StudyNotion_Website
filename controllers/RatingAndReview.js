 const RatingandReview = require("../models/RatingandReview");
 const Course = require("../models/Course");
const e = require("express");

 //create rating
 exports.createRating = async (req,res) => {
    try{
        //get user id
        const userId = req.user.id;

        //fetch data from requet body
        const {courseId, rating, review} = req.body;
        //check if user is enrolled or not
        const course = await Course.findOne({_id : courseId, studentsEnrolled : {$eleMatch : { $eq : userId}}});
        if(!course){
            return res.status(404).json({
                success : false,
                message : "Student is not enrolled in this course",
            });
        }
        //check user has already given review or not
        const alreadyReviewed = await RatingandReview.findOne({user : userId, course : courseId});
        if(alreadyReviewed){
            return res.status(400).json({
                success : false,
                message : "You have already reviewed this course",
            });
        }
        //create rating and review
        const ratingReview = await RatingandReview.create({
            user : userId,
            course : courseId,
            rating,
            review
        });
        return res.status(201).json({
            success : true,
            message : "Rating and review created successfully",
            data : ratingReview
        });

        //update course rating
        await Course.findByIdAndUpdate({_id : courseId}, 
           {
            $push : {RatingandReview : ratingReview._id},

           },
         {new : true});

         //return response
         return res.status(200).json({
             success : true,
             message : "Course rating updated successfully",
             ratingReview,
         });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Failed to create rating",
            error : error.message,
        })
    }
}