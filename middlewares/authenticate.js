import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();


async function checkUserAuth(req,res,next){

    const {authorization} = req.headers;

    if(authorization && authorization.startsWith('Bearer')){
        try{
            let token = authorization.split(" ")[1];

            //Verify the token
            const {userID} = jwt.verify(token,process.env.JWT_KEY);
            
            req.user = await userModel.findById(userID).select('-password');
            next();
        }
        catch(error){
            res.json({"status":"failed","message":"Unauthorized User"});
        }
    }
    else{
        res.json({"status":"failed","message":"Unauthorized User"});
    }
}

export default checkUserAuth;  