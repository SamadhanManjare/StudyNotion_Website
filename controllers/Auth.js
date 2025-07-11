 const User = require ("../models/User");
 const OTP = require ("../models/OTP");
 const otpGenerator = require ("otp-generator");
 // Send OTP Function

 exports.sendOTP = async (req , res) =>{
    try{
        //fetch email from request body
        const {email} = req.body;

            //check if user already exist
            const checkUserPresent = await User.findOne({email});

            //if user already exist , then return response
            if (checkUserPresent){
                return res.status(401).json({
                    success : false,
                    message : "User already exist",
                })
            }
            //Generate OTP

            var otp = otpGenerator.generate(6, {
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false,
            });
            console.log("otp generated : ", otp);

            //check unique otp or not 
            let result = await OTP.findOne({otp : otp});

            while(result){
                otp = otpGenerator(6, {
                upperCaseAlphabets : false,
                lowerCaseAlphabets : false,
                specialChars : false,
            }); 
            result = await OTP.findOne({otp : otp});
            }

            const otpPayload = {email, otp};

            //create entry for otp in DB
            const otpBody = await OTP.create(otpPayload);
            console.log(otpPayload);

            //return response successfull
            res.status(200).json ({
                success : true,
                message : "OTP send successfully",
                otp,
            })
            


    }
    catch(error){
        console.log(error);
        res.status(500).json ({
            success : false,
            message : error.message,
        })
    }
 };

 //SIGN UP Function

 