import { configureStore } from "@reduxjs/toolkit";

import postSlice from "./slices/postSlice";

const store = configureStore({
    reducer: {
        postInfo: postSlice,
    },
});

export default store;
