import express from "express"
import * as http from "http"
import path from "path"
import * as WebSocket from "ws"
import { WebscoketConnect } from "./lib/ws"

const main = () => {
    const app = express()
    const server = http.createServer(app)
    const websocket = new WebSocket.Server({server, path: '/ws'})
    const port = 8000;
    WebscoketConnect(websocket)

    server.listen(port , () => {
        console.log("Server started on port 8000")
    })
}

export {main}