import axiosClient from "../axiosClient";

const conversationServices = {
    getAllConversationOfUser: (id) => {
        return axiosClient.get(`conversation/user/${id}`);
    },
    getConversationDetail: (data) => {
        return axiosClient.post(`/conversation/detail`, data);
    },
    createConversation: (data) => {
        return axiosClient.post("/conversation/create", data);
    },
    deleteConversation: (id) => {
        return axiosClient.delete(`/conversation/${id}`);
    },
};

export default conversationServices;
