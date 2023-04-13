import express from "express";
import authController from "../controllers/authController.js";
import middlewareController from "../controllers/middlewareController.js";

const authRouter = express.Router()
//middlewareController.verifyToken, 
authRouter.post('/register', authController.registerUser)
authRouter.post('/login', authController.loginUser)
authRouter.post('/refresh', authController.refreshToken)
authRouter.post('/logout', authController.userLoggout)
// authRouter.post('/sendEmail', authController.sendEmail)

export default authRouter