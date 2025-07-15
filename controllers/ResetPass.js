 const User = require("../models/User");
 const mailSender = require("../utils/mailSender");


//reset Password
 exports.resetPassword = async (req, res) => {
    //get email from request body

    const url =`https://localhost:3000/update-password/${token}`
    
 }