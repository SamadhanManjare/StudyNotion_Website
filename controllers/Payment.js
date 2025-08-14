 const { default: mongoose } = require("mongoose");
const {instance} = require ("../config/razorpay");
 const Course = require ("../models/Course");
 const user = require ("../models/User");
 const mailSender = require ("../utils/mailSender");

 exports.capturPayment = async (req, res) => {

    const{course_id} = req.body;
    const user_id = req.user.id;

    //Validation 

    //valid course id
    if(!course_id){
        return res.json({
            success : false,
            message : "Please enter valid course id",
        })
    };
    //valid course detail
    let course;

    try{
        course = await Course.findById(course_id);
        if(!course){
            return res.json({
                success : false,
                message : "could not find the course"
            });
        }

        //user already pay for the same course
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success : false,
                message : "Student is already enrolled"
            });
        }


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    }

    //order create successfully
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount : amount * 100,
        currency,
        receipt : Math.random(Date.now()).toString(),
        notes :{
            courseId : course_id,
            userId,
        }
    };

    try{
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        //return response
        //return response updated after   
        return res.status(200).json({
            success : true,
            courseName : course.courseName,
            courseDescription : course.courseDescription,
            thumbnail : course.thumbnail,
            orderId : paymentResponse.id,
            currency : paymentResponse.currency,
            amount : paymentResponse.amount,
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Could not initiate  order"
        })

    }
    
 }

 //be updtaed in payent/ja  