import {
    loginFailed,
    loginStart,
    loginSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from "./authSlice";
import { logoutFailed, logoutStart, logoutSuccess } from "./slices/authSlice";
import { updateUserSuccess } from "./userSlice";
import { clearData, storeData } from "../utils/asyncStorage";
import { getData } from "../utils/asyncStorage";

// const BASE_URL = "http://10.0.2.2:2001/api" // android studio
const BASE_URL = "http://10.0.3.2:2001/api"; // genymotion

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
                password: user.password,
            }),
        });
        const json = await res.json();
        console.log("register", JSON.stringify(json));
        dispatch(registerSuccess());
    } catch (e) {
        dispatch(registerFailed);
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
            body: JSON.stringify({
                username: user.username,
                password: user.password,
            }),
        });
        const json = await res.json();
        storeData("@statusLogin", res.status);
        storeData("@userLogin", json);
        dispatch(loginSuccess(json));
    } catch (e) {
        console.log(e);
        dispatch(loginFailed());
    }
};

export const logoutUser = async (dispatch, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        const res = await axiosJWT.post(`${BASE_URL}/auth/logout`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Token: accessToken,
            },
        });
        const json = res.json();
        console.log(json);
        dispatch(logoutSuccess());
        clearData();
    } catch (e) {
        dispatch(logoutFailed());
    }
};

export const updateUser = async (id, newUser, accessToken, dispatch, axiosJWT) => {
    dispatch(loginStart());
    try {
        const res = await axiosJWT.put(`${BASE_URL}/user/${id}`, newUser, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Token: accessToken,
            },
        });
        const json = await res.json();
        console.log(JSON.stringify(json));
        dispatch(loginSuccess(newUser));
        dispatch(updateUserSuccess());
    } catch (e) {
        console.log("4");
        dispatch(loginFailed());
    }
};
