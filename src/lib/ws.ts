import { WebSocket, Server } from "ws";
import { createWorker } from "./worker";

const WebscoketConnect = async (websock: Server) => {
    try{
        const mediasoupRouter = await createWorker();
    }catch(error) {
        throw error;
    }
    websock.on('connection', (ws: WebSocket) => {
        ws.on('message', (message: string) => {
            console.log("Message =>", message)
            ws.send("Hello world!");
        })
    })
}

export {WebscoketConnect}