import Post from "../models/postModel.js";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (e) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};

export const getPostDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(500).json({ error: "Post does not exist!" });
        }
        res.json(post);
    } catch (e) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const data = req.body;
        const newPost = new Post(data);
        await newPost.save();
        res.json({ message: "Create Success!" });
    } catch (e) {
        res.json({ error: "An error occurred!" });
    }
};
