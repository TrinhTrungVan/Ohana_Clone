import { ENV } from '../../constants/env'
import axiosPayment from '../axiosPayment'
import axios from 'axios'
export const createPayment = async (pay) => {
    try {
        const res = await axios.post('http://10.0.2.2:2001/api/payment/create_payment_url', pay,
        {   
            // method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // Token: accessToken
            }, 
            // body: JSON.stringify(pay)
        })
        console.log(res.data)
        return res.data
        // const json = await res.json()
        // return json
    }
    catch (e) {
        console.log('errorPayment', e)
    }
}