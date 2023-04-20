import User from "../models/userModel.js"
import bcrypt from "bcrypt"

const userController = {
    getAllUser: async (req, res) => {
        try{
            const users = await User.find().populate('chatWith')
            res.status(200).json(users)
        }catch(e) {
            res.status(500).json(e)
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('posts')
            res.status(200).json(user)
        }
        catch(e) {
            res.status(500).json(e)
        }
    },

    updateUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            await user.updateOne({ $set: req.body })
            res.status(200).json("Update successfull!")
        }
        catch(e) {
            console.log(e)
            // res.status(500).json(e)
        }
    },

    updatePassword: async (req, res) => {
        try {
            const { email, password } = req.body
            
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt)

            const user = await User.findOne({ email: email })
            await user.updateOne({ password: hashed })
            res.status(200).json('Update password successful!')
        }
        catch (e) {
            console.log(e)
        }
    },

    deleteUser: async (req, res) => {
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Delete successfully!")
        }catch(e) {
            res.status(500).json(e)
        }
    }

}

export default userController