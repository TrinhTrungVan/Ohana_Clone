import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        updateUser: {
            success: false,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        updateUserStart: (state) => {
            state.updateUser.isFetching = true
        },
        updateUserSuccess: (state) => {
            state.updateUser.isFetching = false,
            state.user.error = false,
            state.user.success = true
        },
        updateUserFailed: (state) => {
            state.updateUser.error = true
            state.updateUser.isFetching = false
            state.updateUser.success = false
        }
    }
})

export const {
    updateUserStart,
    updateUserSuccess,
    updateUserFailed
} = userSlice.actions

export default userSlice.reducer