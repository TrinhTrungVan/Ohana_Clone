import { io } from 'socket.io-client'
import { ENV } from '../constants/env'

const socket = io(ENV.IPCONFIG, {
    transports: ['websocket'],
})

export default socket
