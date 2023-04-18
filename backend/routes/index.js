import postRouter from "./postRouter.js";
import authRouter from './authRoute.js';
import userRouter from "./userRoute.js";
import sendEmailRouter from "./sendEmailRoute.js";

const route = (app) => {
    app.use("/api/auth", authRouter);
    app.use("/api/user", userRouter);
    app.use("/api/post", postRouter);
    app.use("/api/email", sendEmailRouter)
};

export default route;
