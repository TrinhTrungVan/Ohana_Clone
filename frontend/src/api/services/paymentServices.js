import { ENV } from '../../constants/env'
import axiosPayment from '../axiosPayment'
import axios from 'axios'
export const createPayment = async (pay) => {
    try {
        const res = await fetch('http://10.0.2.2:8888/order/create_payment_url', 
        {   
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // Token: accessToken
            }, 
            body: JSON.stringify(pay)
        })
        const json = await res.json()
        return json
    }
    catch (e) {
        console.log('errorPayment', e)
    }
}