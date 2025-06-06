import express from "express"
import http from 'http'
import { Server } from "socket.io";
import { createWorker, worker, router } from "./mediasoup-config.mjs"

const app = express()
const server = http.createServer(app)
const io = new Server(server)


// mediasoup server setup



app.use(express.static('public'));


io.on('connection', (socket) => {
    console.log("New client conected")


    socket.on('joinRoom', async({ username, roomId }, callback) => {
        // room joing logic
        console.log(`${username} is joining room ${roomId}`);

        socket.join(roomId)
        io.to(roomId).emit('roomJoined', {username, roomId})

        socket.on("newParticipant", ({id, stream}) => {
            socket.to(roomId).emit('newParticipant', {id, stream})
        })

        socket.on('leaveRoom', ({ username, roomId}) => {
            socket.leave(roomId);
            socket.to(roomId).emit('participantLeft', username)
        })
        
        // Only try to use the callback if it's provided
        if (typeof callback === 'function') {
            if (!router) {
                return callback({ error: "Router not ready" });
            }

            const transport = await createWebRtcTransport(router)
            callback({ transport: transport})
        }

    })

    socket.on('disconnect', () => {
        console.log("Client disconnected")
    })
})

const createWebRtcTransport = async(router) => {
    const transport = await router.createWebRtcTransport({
        listenIps: [{ ip: '0.0.0.0', announcedIp: '127.0.0.1'}],
        enableUdp: true,
        enableTcp: true,
        preferUdp: true
    });


    transport.on('dtlsstatechange', dtlsState => {
        if(dtlsState === 'closed'){
            transport.close()
        }
    })

    transport.on('close', () => {
        console.log("Transport closed")
    })

    return transport
}

(async () => {
    await createWorker();
    server.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
})();
