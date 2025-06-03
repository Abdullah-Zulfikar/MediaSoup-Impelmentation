import express from "express"
import * as http from "http"
import path from "path"
import * as WebSocket from "ws"

const main = () => {
    const app = express()
    const server = http.createServer(app)
    const webhook = new WebSocket.Server({server, path: '/ws'})
    const port = 8000;
    server.listen(port , () => {
        console.log("Server started on port 8000")
    })
}

export {main}