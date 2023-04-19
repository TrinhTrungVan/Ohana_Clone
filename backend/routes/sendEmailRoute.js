import express from 'express'
import sendEmail from '../controllers/sendEmail.js'

const sendEmailRouter = express.Router()

sendEmailRouter.post('/send', sendEmail)

export default sendEmailRouter