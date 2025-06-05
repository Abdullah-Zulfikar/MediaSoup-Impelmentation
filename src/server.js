import express from "express"
import http from 'http'
import socketIo from "socket.io"
import mediasoup from "mediasoup"

const app = express()
const server = http.createServer(app)
const io = socketIo(server)


// mediasoup server setup

const mediasoupServer = require('./mediasoup-config');

app.use(express.static('public'));


io.on('connection', (socket) => {
    console.log("New client conected")

    socket.on('joinRoom', (roomId, callback) => {
        // room joing logic
    })

    socket.on('disconnect', () => {
        console.log("Client disconnected")
    })
})

server.listen(3000, ()=> {
    console.log("Server is ruiing on port 3000")
})
