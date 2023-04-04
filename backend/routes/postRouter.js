import express from "express";
import { createPost, getPosts, getPostDetail } from "../controllers/postController.js";

const postRouter = express.Router();

// postRouter.delete("/:id", deleteTodo);
// postRouter.put("/:id", updateTodo);
postRouter.post("/create", createPost);
postRouter.get("/:id", getPostDetail);
postRouter.get("/", getPosts);

export default postRouter;
