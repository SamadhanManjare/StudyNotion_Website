 const User = require ("../models/User");
 const OTP = require ("../models/OTP");
 const otpGenerator = require ("otp-generator");
const User = require("../models/User");
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

 exports.signUp = async (req, res) => {

    const {firstName,
    lastName,
    email,
    password, 
    confirmPassword,
    accountType,
    contactNumber, 
    otp} = req.body;

        // Validate Data
    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
    return res.status(403).json({
        success : false,
        message : "All fields are required",
    })
 }

 // Match 2 Passwords

    if (password !== confirmPassword){
        return res.status(400).json({
        success : false,
        message : "password and confirm password donot match, please try again",
    })
 
    }
    // Check user already exist
    const existingUser = await User.findOne({email});
    if (existingUser){
        return res.status(400).json({
        success : false,
        message : "User is already registered",
        });
    }

    // Find most recent otp stored for user
    const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
    console.log(recentOtp);

    if(recentOtp.length == 0){
        return res.status(400).json({
        success : false,
        message : "OTP found",
    })
}
    else if(otp !== recentOtp.otp){
        return res.status(400).json({
        success : false,
        message : "Invalid OTP",
    })
    }

    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    // Entry create in DB
    const profileDetail = await Profile.create({
            gender : null,
            dateOfBirth : null,
            about : null,
            contactNumber : null,

    })

    const User = await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword, 
        
        accountType,
         additionalDetails:profileDetails._id,
         image : `https://api.dicebar.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
    })
 };

 
 




 