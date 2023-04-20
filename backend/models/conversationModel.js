import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        participants: [
            {
                type: String,
                required: true,
            },
        ],
        messages: [
            {
                senderId: {
                    type: String,
                },
                content: {
                    type: String,
                },
                timestamps: {
                    type: Number,
                },
            },
        ],
    },
    { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
