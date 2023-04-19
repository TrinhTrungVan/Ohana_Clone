import express from "express";
import {
    getAllConversationOfUser,
    getConversationDetail,
    createConversation,
    deleteConversation,
} from "../controllers/conversationController.js";

const conversationRouter = express.Router();

conversationRouter.delete("/:id", deleteConversation);
conversationRouter.get("/user/:id", getAllConversationOfUser);
conversationRouter.post("/detail", getConversationDetail);
conversationRouter.post("/create", createConversation);

export default conversationRouter;
