import { logoutFailed, logoutStart, logoutSuccess, loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "./slices/authSlice";
import { storeData } from "../utils/asyncStorage";
import { ENV } from '../constants/env'

const BASE_URL = ENV.BASE_URL + "/api"

export const registerUser = async (user, dispatch) => {
    dispatch(registerStart());
    try {
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: user.username,
                email: user.email,
                password: user.password
            })
        })
        const json = await res.json()
        console.log('register', JSON.stringify(json))
        dispatch(registerSuccess())
    }
    catch (e) {
        dispatch(registerFailed())
    }
};

export const loginUser = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        const json = await res.json()
        console.log('login', json)
        storeData("@statusLogin", res.status)
        storeData("@userLogin", json)
        dispatch(loginSuccess(json))
    }
    catch (e) {
        console.log("errorLoginUser", e)
        dispatch(loginFailed())
    }
};

export const logoutUser = async (dispatch, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        const res = await axiosJWT.post(`${BASE_URL}/auth/logout`,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Token: accessToken
                }
            })
        console.log('logout', res.data)
        dispatch(logoutSuccess())
        dispatch(loginSuccess())
    }
    catch (e) {
        console.log('errorLogout', e)
        dispatch(logoutFailed())
    }
};

export const updateUser = async (id, newUser, accessToken, dispatch, axiosJWT) => {
    dispatch(loginStart());
    try {
        const res = await axiosJWT.put(`${BASE_URL}/user/${id}`, newUser,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Token: accessToken
                }
            })
        console.log(JSON.stringify(res.data))
        dispatch(loginSuccess(newUser))
    }
    catch (e) {
        console.log("errorUpdate", e)
        dispatch(loginFailed())
    }
};
