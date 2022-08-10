import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/userRoutes.js";


const app = express()
//port = process.env.PORT;

//CORS POLICY
//app.use(cors());


//MiddleWares
app.use(express.json());


//Database connection
connectDB(process.env.DB_URL);


//Routes
app.use("/api/user",userRouter);


app.listen(process.env.PORT,function(){
    console.log("Server started Running")
})
