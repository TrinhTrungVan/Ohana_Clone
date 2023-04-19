import axiosClient from "../axiosClient";

const postServices = {
    getPosts: () => {
        return axiosClient.get("/post");
    },
    getPostDetail: (id) => {
        return axiosClient.get(`/post/${id}`);
    },
    createPost: (data) => {
        return axiosClient.post("/post/create", data);
    },
    getPostSimilar: (id) => {
        return axiosClient.get(`/post/${id}/similar`);
    },
};

export default postServices;
