import mongoose from 'mongoose'
import Post from './postModel.js'

const userSchema = new mongoose.Schema(
    {
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
        phoneNumber: {
            type: String,
            length: 10,
        },
        admin: {
            type: Boolean,
            default: false,
        },
        posts: [
            {
                type: String,
                ref: 'Post',
            },
        ],
        liked_posts: [
            {
                type: String,
                ref: 'Post',
            },
        ],
        chatWith: [
            {
                type: String,
                ref: 'User',
            },
        ],
        avatar_url: {
            type: String,
            required: true,
            default:
                'https://res.cloudinary.com/trungvan1904/image/upload/v1666843620/image/default_avatar_pzvbqf.jpg',
        },
    },
    { timestamps: true }
) // cho biet user dc tao va update khi nao

const User = mongoose.model('User', userSchema)
export default User
