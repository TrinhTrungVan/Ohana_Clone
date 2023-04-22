import Post from '../models/postModel.js'
import User from '../models/userModel.js'

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('user')
        res.json(posts)
    } catch (e) {
        res.status(500).json({ status: 'Failed', message: e.message, data: '' })
    }
}

export const getPostDetail = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id).populate('user')

        if (!post) {
            return res.status(500).json({ error: 'Post does not exist!' })
        }
        res.json(post)
    } catch (e) {
        res.status(500).json({ error: 'An error occurred!', message: e.message })
    }
}

export const getPostOfUser = async (req, res) => {
    try {
        const { id } = req.params
        const posts = await Post.find({ user: id })
        // const data = posts.map((item) => {
        //     return item._id
        // })
        res.json(posts)
    } catch (e) {
        res.json({ error: 'An error occurred!' })
    }
}

export const createPost = async (req, res) => {
    try {
        const data = req.body
        // console.log("Data", data);
        const newPost = new Post(data)
        await newPost.save()
        res.json({ message: 'Create Success!' })
    } catch (e) {
        res.json({ error: 'An error occurred!' })
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        // console.log("Data", data);
        const post = await Post.findById(id)
        const authorId = post.user
        await User.findByIdAndUpdate(authorId, { $pull: { posts: id } })
        await post.delete()
        res.json({ message: 'Delete Success!' })
    } catch (e) {
        res.json({ error: 'An error occurred!' })
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        await Post.findByIdAndUpdate(id, data)
        res.json({ message: 'Update Success!' })
    } catch (e) {
        res.json({ error: 'An error occurred!' })
    }
}

export const getLikedPost = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id).populate('liked_posts')
        if (!user) {
            res.json({ error: 'An error occurred!' })
        }
        res.status(200).json(user.liked_posts)
    } catch (e) {
        res.json({ error: 'An error occurred!' })
    }
}

export const likePost = async (req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        console.log(id, userId)
        await User.findByIdAndUpdate(userId, { $push: { liked_posts: id } })
        // const liked_posts = await User.findById(userId).liked_posts
        res.status(200).json({ message: 'Like successfully' })
    } catch (e) {
        res.json({ error: 'An error occurred!' })
    }
}

export const unlikePost = async (req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        console.log(id, userId)
        await User.findByIdAndUpdate(userId, { $pull: { liked_posts: id } })
        // const liked_posts = await User.findById(userId).liked_posts
        res.status(200).json({ message: 'Unlike successfully' })
    } catch (e) {
        res.json({ error: 'An error occurred!' })
    }
}

export const checkLikedPost = async (req, res) => {
    try {
        const { id } = req.params
        const { userId } = req.body
        const user = await User.findById(userId)
        const result = user.liked_posts.includes(id)
        res.status(200).json({ result })
    } catch (e) {
        res.json({ error: 'An error occurred!' })
    }
}
