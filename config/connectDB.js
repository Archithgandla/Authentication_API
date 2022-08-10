import mongoose from "mongoose";

async function connectDB(DATABASE_URL){
    try{
        const DB_OPTIONS = {
            dbName : "AUTH_PROJECT"
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log("Connected successfully");

    }
    catch(error){
        console.log(error);
    }
}

export default connectDB;
