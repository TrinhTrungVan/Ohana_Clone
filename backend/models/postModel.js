import mongoose from 'mongoose'
import User from './userModel.js'

const postSchema = new mongoose.Schema(
    {
        roomArea: {
            type: Number,
            require: true,
        },
        capacity: {
            type: Number,
            require: true,
        },
        expenses: {
            type: Number,
            require: true,
        },
        deposit: {
            type: Number,
            require: true,
        },
        electricityCost: {
            type: Number,
            require: true,
        },
        waterCost: {
            type: Number,
            require: true,
        },
        internetCost: {
            type: Number,
            require: true,
        },
        parkingAvailable: {
            type: Boolean,
            require: true,
        },
        parkingCost: {
            type: Number,
            require: true,
        },
        city: {
            type: String,
            require: true,
        },
        district: {
            type: String,
            require: true,
        },
        ward: {
            type: String,
            require: true,
        },
        streetName: {
            type: String,
            require: true,
        },
        houseNumber: {
            type: String,
            require: true,
        },
        images: [
            {
                type: String,
            },
        ],
        title: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        user: {
            type: String,
            ref: 'User',
            require: true,
        },
    },
    {
        timestamps: true,
    }
)

const Post = mongoose.model('Post', postSchema)

export default Post
