import { createSlice } from "@reduxjs/toolkit";
import { getData } from "../../utils/asyncStorage";

const initialState = {
    roomArea: 0,
    capacity: 0,
    expenses: 0,
    deposit: 0,
    electricityCost: 0,
    waterCost: 0,
    internetCost: 0,
    parkingAvailable: false,
    parkingCost: 0,
    city: "",
    district: "",
    ward: "",
    streetName: "",
    houseNumber: "",
    images: [],
    phone: "",
    title: "",
    description: "",
    loading: false,
    error: "",
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addInfomation: (state, action) => {
            const data = action.payload;
            // console.log("DATA", data);
            const newState = { ...state, ...data };
            state = newState;
            console.log(state);
            // console.log("STATE", state);
        },
    },
});

export const { addInfomation } = postSlice.actions;
export default postSlice.reducer;
