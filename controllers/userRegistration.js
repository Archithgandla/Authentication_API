import userModel from "../models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

async function userRegistration(req,res){
    const {name,email,password,password_confirmation,tc} = req.body;

    const user = await userModel.findOne({email:email});

    if(user){
        res.json({"status":"failed","message":"Email Already registered" });
    }
    else{
        if(name && email && password && password_confirmation && tc){

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt);

            if(password === password_confirmation){
                try{
                    const doc = new userModel({
                        name:name,
                        email:email,
                        password:hashPassword,
                        tc:tc
                    });

                    await doc.save();

                    //console.log(email);
                    
                    const saved_user = await userModel.findOne({email:email});


                    //Creating JWT Token
                    const token = jwt.sign({userID:saved_user._id},process.env.JWT_KEY,{expiresIn : '2d'});




                    res.json({"status":"Success","message":"User Registered succesfully","token":token});
                }
                catch(error){
                   console.log(error);
                   res.json({"status":"failed","message":"Failed to register"});
                }

            }
            else{
                res.json({"status":"failed","message":"Password and confirmed password doesnot match"});
            }
        }
        else{
            res.json({"status":"failed","message":"All fields are required"});
        }
    }

}

export default userRegistration;