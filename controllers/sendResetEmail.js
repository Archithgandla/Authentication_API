
import express from "express";
import userModel from "../models/user.js";
import jwt from 'jsonwebtoken';
import transporter from "../config/emailConfig.js";
import dotenv from "dotenv";
dotenv.config(); 

async function sendResetEmail(req,res){

    const {email} = req.body;
    console.log(email);
    if(email){
        const user = await userModel.findOne({email:email});
        
        if(user){
            
            const secret = user._id+process.env.JWT_KEY;
            const token = jwt.sign({userID:user._id},secret,{expiresIn:'2d'});

            // console.log(secret);
            const link = `http://127.0.0.1:4000/api/user/reset/${user._id}/${token}`;


            //sending email
            let info = await transporter.sendMail({
                from: process.env.USER_EMAIL, // sender address
                to: user.email, // list of receivers
                subject: "Password Reset", // Subject line
                text: "Click the below link to change password", // plain text body
                html: `<a href = ${link}>Click here to change password</a>`, // html body
              });

            console.log(link);
            res.send({"status":"success","message":"Mail Has been sent"});
        }else{
            res.send({"status":"failed","message":"User Not registered"});
        }
    }
    else{
        res.send({"status":failed,"message":"Email not given"});
    }

}

export default sendResetEmail;

