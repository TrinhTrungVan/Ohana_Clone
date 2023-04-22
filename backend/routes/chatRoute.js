import express from 'express'
import { addMessage } from '../controllers/chatController.js'
// import {
//     getAllConversationOfUser,
//     getConversationDetail,
//     createConversation,
//     deleteConversation,
// } from "../controllers/conversationController.js";

const chatRouter = express.Router()
chatRouter.post('/:id', addMessage)

export default chatRouter
