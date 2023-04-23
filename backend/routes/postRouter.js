import express from 'express'
import {
    createPost,
    getPosts,
    getPostDetail,
    likePost,
    unlikePost,
    checkLikedPost,
    getLikedPost,
    getPostOfUser,
    deletePost,
    updatePost,
} from '../controllers/postController.js'

const postRouter = express.Router()

postRouter.post('/check-liked/:id', checkLikedPost)
postRouter.get('/liked/:id', getLikedPost)
postRouter.get('/user/:id', getPostOfUser)
postRouter.post('/unlike/:id', unlikePost)
postRouter.post('/like/:id', likePost)
postRouter.post('/create', createPost)
postRouter.put('/:id', updatePost)
postRouter.delete('/:id', deletePost)
postRouter.get('/:id', getPostDetail)
postRouter.get('/', getPosts)

export default postRouter
