import { configureStore } from "@reduxjs/toolkit";
<<<<<<< Updated upstream

import postSlice from "./slices/postSlice";

const store = configureStore({
    reducer: {
        postInfo: postSlice,
    },
});

export default store;
=======
import authReducer from './authSlice.js'
import userReducer from './userSlice.js'

export default configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    }
})
>>>>>>> Stashed changes
