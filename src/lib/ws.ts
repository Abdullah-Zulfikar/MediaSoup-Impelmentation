import { WebSocket, Server } from "ws";
import { createWorker } from "./worker";
import { Router } from "mediasoup/node/lib/RouterTypes";

let mediasoupRouter : Router

const WebscoketConnect = async (websock: Server) => {
    try{
        mediasoupRouter = await createWorker();
    }catch(error) {
        throw error;
    }
    websock.on('connection', (ws: WebSocket) => {
        ws.on('message', (message: string) => {
            const jsonValidation = IsJsonString(message)
            if (!jsonValidation) {
                console.error("json error");
                return
            }

            const event = JSON.parse(message)
            switch(event.type){
                case 'getRouterRtpCapabilities':
                    onRouterRtpCapabilities(event, ws)
                    break;

                default:
                    break;
            }
        });
    })
    // on router fucntion
    const onRouterRtpCapabilities = (event: String, ws: WebSocket) => {
        send(ws, "routerCapabilities", mediasoupRouter.rtpCapabilities);
    }
    const IsJsonString= (str:string) => {
        try{
            JSON.parse(str)
        }catch(error) {
            return false;
        }
        return true
    }

    // send function
    const send = (ws: WebSocket, type:string, msg:any) => {
        const message = {
            type,
            data:msg
        }

        const resp = JSON.stringify(message)
        ws.send(resp)
    }
}

export {WebscoketConnect}