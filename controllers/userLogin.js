import express from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


async function userLogin(req,res){
    const {email,password} = req.body;

    if(email && password){
        try{
            const user = await userModel.findOne({email:email});

            if(user != null){
                const isMatch = await bcrypt.compare(password,user.password);

                if(user.email === email && isMatch === true){

                    const token = jwt.sign({userID:user._id},process.env.JWT_KEY,{expiresIn : '2d'});


                    res.json({"status":"Suceess","message":"Logged in succesfully","token":token});
                }
                else{
                    res.json({"status":"Failed","message":"Login Failed"});
                }

    
            }
            else{
                res.json({"status":"Failed","message":"User Not registered"});
            }
        }
        catch(error){

        }
    }
    else{
        res.json({"status":"Failed","message":"All Fields are required"});
    }
}

export default userLogin;
