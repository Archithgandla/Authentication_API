import express from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.js";

async function changeUserPassword(req,res){
    const {password,password_confirmation} = req.body;

    if(password && password_confirmation){
        if(password !== password_confirmation){
            res.json({"status":"Failed","message":"Password donot match"});
        }
    
        else{

            const salt = await bcrypt.genSalt(10);
            const HashedPassword = await bcrypt.hash(password,salt);

            await userModel.findByIdAndUpdate(req.user._id,{$set:{password:HashedPassword}});

            res.send({"status":"success","message":"password changes successfully"});
        }
    }
    else{
        res.json({"status":"Failed","message":"Password donot match"});
    }


}
export default changeUserPassword;
