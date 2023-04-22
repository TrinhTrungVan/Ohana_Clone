import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
})

io.on('connection', (socket) => {
    // socket.on("join_room", (roomId) => {
    //     socket.join(roomId);
    // console.log(`User with ID : ${socket.id} joined a room : ${roomId}`);
    // });
    console.log(`User with ID : ${socket.id} joined a room`)

    socket.on('send-msg', (idConversation) => {
        socket.broadcast.emit('receive-msg', idConversation)
    })

    socket.on('close', () => {
        console.log(`User with ID : ${socket.id} disconnect`)
    })
})

server.listen(1904, () => {
    console.log('Server is running...')
})
