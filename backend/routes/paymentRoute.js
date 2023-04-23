import express from 'express'
import paymentController from '../controllers/paymentController.js'

const paymentRouter = express.Router()

paymentRouter.post('/create_payment_url', paymentController.createPayment)
paymentRouter.get('/vnpay_return', paymentController.vnpayReturn)
paymentRouter.get('/vnpay_ipn', paymentController.vnpayIpn)

export default paymentRouter