import { ENV } from '../constants/env'

const apiConfig = {
    baseUrl: ENV.BASE_URL + '/api',
    paymentUrl: `${ENV.PAYMENT_URL}/order`,
}

export default apiConfig
