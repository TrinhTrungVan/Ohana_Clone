import postRouter from "./postRouter.js";
import authRouter from './authRoute.js';
import userRouter from "./userRoute.js";
import sendEmailRouter from "./sendEmailRoute.js";
import paymentRouter from "./paymentRoute.js";

const route = (app) => {
    app.use("/api/auth", authRouter);
    app.use("/api/user", userRouter);
    app.use("/api/post", postRouter);
    app.use("/api/email", sendEmailRouter);
    app.use("/api/payment", paymentRouter);
};

export default route;
