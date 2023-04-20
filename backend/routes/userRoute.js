import express from 'express'
import middlewareController from '../controllers/middlewareController.js'
import userController from '../controllers/userController.js'

const userRouter = express.Router()
userRouter.get('/', userController.getAllUser)
userRouter.get('/:id', userController.getUser)
userRouter.put('/updatePassword', userController.updatePassword)
userRouter.put('/:id', middlewareController.verifyToken, userController.updateUser)
userRouter.delete('/:id', middlewareController.verifyTokenAdmin, userController.deleteUser)

export default userRouter