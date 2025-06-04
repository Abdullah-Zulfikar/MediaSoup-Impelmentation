import WebSocket from "ws";

const websocketURL = "ws://localhost:8000/ws"

const connect = () => {
    const socket = new WebSocket(websocketURL);
    socket.onopen = () => {
        // start our socket request
        const msg = {
            type:"getRouterRtpCapabilities"
        }
        const resp = JSON.stringify(msg);
        socket.send(resp)
    }
}

connect()