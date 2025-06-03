import { WebSocket, Server } from "ws";

const WebscoketConnect = async (websock: Server) => {

    websock.on('connection', (ws: WebSocket) => {
        ws.on('message', (message: string) => {
            console.log("Message =>", message)
            ws.send("Hello world!");
        })
    })
}

export {WebscoketConnect}