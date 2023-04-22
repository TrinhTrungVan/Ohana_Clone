import { loginFailed, loginStart, loginSuccess } from '../../redux/slices/authSlice'
import { ENV } from '../../constants/env'
import axiosClient from '../axiosClient'

const BASE_URL = ENV.BASE_URL + '/api'

export const updateUser = async (id, newUser, accessToken, dispatch, axiosJWT) => {
    dispatch(loginStart())
    try {
        const res = await axiosJWT.put(`${BASE_URL}/user/${id}`, newUser, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Token: accessToken,
            },
        })
        console.log(JSON.stringify(res.data))
        dispatch(loginSuccess(newUser))
    } catch (e) {
        console.log('errorUpdate', e)
        dispatch(loginFailed())
    }
}

export const updatePassword = async (user) => {
    try {
        const res = await fetch(`${BASE_URL}/user/updatePassword`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password,
            }),
        })
        const json = await res.json()
        console.log(json)
    } catch (e) {
        console.log(e)
    }
}

export const getUser = (id) => {
    return axiosClient.get(`/user/${id}`)
}
