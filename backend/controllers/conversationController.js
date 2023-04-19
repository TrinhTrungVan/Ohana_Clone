import Conversation from "../models/conversationModel.js";
import User from "../models/userModel.js";

export const getAllConversationOfUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).populate("chatWith");
        if (!user) {
            return res.status(500).json({ error: "Lỗi" });
        }
        res.json(user.chatWith);
        // const existConversations = await Conversation.find({
        //     participants: { $in: id },
        // });
        // if (existConversations.length === 0) {
        //     return res.status(500).json({ error: "Lỗi" });
        // }
        // res.json(existConversations);
    } catch (e) {
        res.status(500).json({ status: "Failed", message: e.message, data: "" });
    }
};

export const getConversationDetail = async (req, res) => {
    try {
        const participants = req.body;
        const existConversation = await Conversation.find({
            participants: { $all: participants },
        });
        if (existConversation.length === 0) {
            return res.status(500).json({ error: "Đoạn chat không tồn tại", message: e.message });
        }
        res.json(existConversation[0]);
    } catch (e) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};

export const createConversation = async (req, res) => {
    try {
        const participants = req.body;

        const existConversation = await Conversation.find({ participants: { $all: participants } });
        // res.json(existConversation);
        if (existConversation.length !== 0) return res.json("Cuộc hội thoại đã tồn tại");

        const conversation = new Conversation({ participants });
        await conversation.save();
        await User.findByIdAndUpdate(participants[0], { $push: { chatWith: participants[1] } });
        await User.findByIdAndUpdate(participants[1], { $push: { chatWith: participants[0] } });
        res.json("Create Successfully!");
    } catch (e) {
        res.status(500).json({ error: "An error occurred!", message: e.message });
    }
};

export const deleteConversation = async (req, res) => {
    try {
        const { id } = req.params;
        const conversation = await Conversation.findById(id);
        const participants = conversation.participants;
        await User.findByIdAndUpdate(participants[0], { $pull: { chatWith: participants[1] } });
        await User.findByIdAndUpdate(participants[1], { $pull: { chatWith: participants[0] } });
        await conversation.delete();
        res.json({ message: "Delete Success!" });
    } catch (e) {
        res.json({ error: "An error occurred!" });
    }
};
