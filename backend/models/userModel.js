import mongoose from "mongoose";
import Post from "./postModel.js";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 20,
            unnique: true,
        },
        email: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 25,
            unnique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        fullname: {
            type: String,
            maxlength: 30,
        },
        address: {
            type: String,
        },
        phoneNumber: {
            type: String,
            length: 10,
        },
        bankAcount: {
            bankName: {
                type: String,
                maxlength: 30,
            },
            acountNumber: {
                type: Number,
                minlength: 8,
            },
            acountName: {
                type: String,
                maxlength: 30,
            },
        },
        admin: {
            type: Boolean,
            default: false,
        },
        posts: [
            {
                type: String,
                ref: "Post",
            },
        ],
    },
    { timestamps: true }
); // cho biet user dc tao va update khi nao

const User = mongoose.model("User", userSchema);
export default User;
