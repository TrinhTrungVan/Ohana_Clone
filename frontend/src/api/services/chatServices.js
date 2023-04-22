import axiosClient from '../axiosClient'

const chatServices = {
    addMessage: (id, message) => {
        return axiosClient.post(`chat/${id}`, message)
    },
}

export default chatServices
