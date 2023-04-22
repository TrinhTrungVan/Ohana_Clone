import axiosClient from '../axiosClient'

const postServices = {
    getPosts: () => {
        return axiosClient.get('/post')
    },
    getPostDetail: (id) => {
        return axiosClient.get(`/post/${id}`)
    },
    getPostOfUser: (userId) => {
        return axiosClient.get(`/post/user/${userId}`)
    },
    createPost: (data) => {
        return axiosClient.post('/post/create', data)
    },
    updatePost: (id, data) => {
        return axiosClient.put(`/post/${id}`, data)
    },
    deletePost: (id) => {
        return axiosClient.delete(`/post/${id}`)
    },
    getLikedPost: (userId) => {
        return axiosClient.get(`/post/liked/${userId}`)
    },
    likePost: (postId, userId) => {
        return axiosClient.post(`/post/like/${postId}`, { userId })
    },
    unlikePost: (postId, userId) => {
        return axiosClient.post(`/post/unlike/${postId}`, { userId })
    },
    checkLikedPost: (postId, userId) => {
        return axiosClient.post(`/post/check-liked/${postId}`, { userId })
    },
    getPostSimilar: (id) => {
        return axiosClient.get(`/post/${id}/similar`)
    },
}

export default postServices
