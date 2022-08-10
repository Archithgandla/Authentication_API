import express from "express";
const userRouter = express.Router();
import userRegistration from "../controllers/userRegistration.js";
import userLogin from "../controllers/userLogin.js";
import changeUserPassword from "../controllers/changePassword.js";
import checkUserAuth from "../middlewares/authenticate.js";
import getUserData from "../controllers/userData.js";
import sendResetEmail from "../controllers/sendResetEmail.js";
import passwordReset from "../controllers/passwordReset.js";


//Route Level Middleware
userRouter.use("/changepassword",checkUserAuth);
userRouter.use("/getUserData",checkUserAuth);


//Public Routes
userRouter.post("/register",userRegistration);
userRouter.post("/login",userLogin);
userRouter.post("/sendResetEmail",sendResetEmail);
userRouter.post("/passwordReset/:id/:token",passwordReset);

//Protected Routes
userRouter.post("/changepassword",changeUserPassword);
userRouter.get("/getUserData",getUserData);

export default userRouter;