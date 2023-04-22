import postRouter from './postRouter.js'
import authRouter from './authRoute.js'
import userRouter from './userRoute.js'
import conversationRouter from './conversationRouter.js'
import sendEmailRouter from './sendEmailRoute.js'
import chatRouter from './chatRoute.js'

const route = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)
    app.use('/api/post', postRouter)
    app.use('/api/conversation', conversationRouter)
    app.use('/api/email', sendEmailRouter)
    app.use('/api/chat', chatRouter)
}

export default route
