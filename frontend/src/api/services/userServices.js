import { loginFailed, loginStart, loginSuccess } from "../../redux/slices/authSlice";
import { ENV } from '../../constants/env'

const BASE_URL = ENV.BASE_URL + "/api"

export const updateUser = async (id, newUser, accessToken, dispatch, axiosJWT) => {
    dispatch(loginStart())
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
}