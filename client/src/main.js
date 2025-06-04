import WebSocket from "ws";
import { v4 as uuidv4 } from "uuid";
import { Device } from 'mediasoup-client';



let bntSub;
let bntCam;
let bntScreen;
let textPublish
let textWebcam;
let textScreen;
let textSubscribe;
let localVideo;
let remoteVideo;
let remoteStream;
let device;
let producer;
let consumeTransport;
let userId;
let isWebcam;
let produceCallback, produceErrback;
let consumerCallback, ConsumerErrback;
const websocketURL = "ws://localhost:8000/ws"

let socket;

document.addEventListener('DOMContentLoaded', function() {
    bntCam = document.getElementById('btn_webcam')
    bntScreen = document.getElementById('btn_screen')
    bntSub = document.getElementById('btn_sub')
    textWebcam = document.getElementById('webcam_status')
    textScreen = document.getElementById('screen_status')
    textSubscribe = document.getElementById('subscribe_status')
    localVideo = document.getElementById('localVideo')
    remoteVideo = document.getElementById('remoteViode')


    // button event listners
    bntCam.addEventListener('click', publish)
    bntScreen.addEventListener('click', publish)
    bntScreen.addEventListener('click', publish)
}) 

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


    socket.onmessage = (event) => {
        const jsonValidation = IsJsonString(message)
            if (!jsonValidation) {
                console.error("json error");
                return
            } 

            let resp = JSON.parse(event.data);
            switch (resp.type) {
                case "routerCapabilities":
                    onRouterCapabilities(resp)
                    break;
            
                default:
                    break;
            }
    }

    const publish = (e) => {
        isWebcam = (e.target.id === 'btn_webcam')
        textPublish = isWebcam ? textWebcam : textScreen;
        bntScreen.disable = true;
        bntCam.disable = true;


        const message = {
            type : 'createProducerTransport',
            forceTcp: false,
            rtpCapabilities: device.rtpCapabilities
        }

        const resp = JSON.stringify(message);
        socket.send(resp)
    }

    const onRouterCapabilities = (resp) => {
        loadDevice(resp.data);
        bntCam.disable = false
    }

    const IsJsonString= (str) => {
    try{
        JSON.parse(str)
    }catch(error) {
        return false;
    }
        return true
    }

    const loadDevice = async(routerRtpCapabilities) => {
        try {
            device = new Device()
        } catch (error) {
            if (error.name === 'UnsupportedError'){
                console.log("Browser Not supported!")
            }
        }
        await device.load({ routerRtpCapabilities});
    }
}

connect()