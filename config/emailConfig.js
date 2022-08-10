import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();


let transporter = nodemailer.createTransport({
    service:"gmail", 
    auth: {
      user: process.env.USER_EMAIL, // generated ethereal user
      pass: process.env.USER_PASSWORD, // generated ethereal password
    },
    port:465,
    host:"smtp.gmail.com"
  });

  export default transporter;
