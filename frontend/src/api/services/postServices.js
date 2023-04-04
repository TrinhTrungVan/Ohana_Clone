import axiosClient from "../axiosClient";

const postServices = {
    getPosts: () => {
        return axiosClient.get("/post");
    },
    getPostDetail: (id) => {
        return axiosClient.get(`/post/${id}`);
    },
};

export default postServices;
