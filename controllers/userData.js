import express from "express";


async function getUserData(req,res){
    console.log("Hi");
    res.send(req.user);
}

export default getUserData;
