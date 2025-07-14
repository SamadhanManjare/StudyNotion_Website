 const jwt = require("jsonwebtoken");
 require ("dotenv").config();
 const User = require ('../models/User');

 exports.auth = async (req, res) => {
    try {
      // Extract token
      const token = req.cookies.token
                     || req.body.token
                     || req.header('Authorisation').replace('Bearer','');


                     if(!token) {
                        return res.status(401).json({
                           success : false,
                           message : "Token is missing"
                        })
                     }

         // Verify token
         try{
               const decode = jwt.verify(token, process.env.JWT_SECRET);
               console.log(decode);
               req.User =decode;
         }
         catch(error){
               return res.status(401).json({
                  success : false,
                  message : "toke invalid",
               }) 
         }
         next();
    }
    catch (error){
        return res.status(401).json({
         success : false,
         message : "something went wrong while validating the token"
        })
    }
 }