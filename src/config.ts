import os from "os";

export const config = {
    listenIp: '0.0.0.0',
    listenPort: 3016,

    mediasoup: {
        numWorkers: Object.keys(os.cpus()).length,
        worker: {
            rtcMinPort : 10000,
            rtcMaxPort : 10100,
            logLevel: 'debug',
            logTags: [
                'info',
                'ice',
                'dtls',
                'rtp',
                'srtp',
                'rtcp',
            ] as ('info' | 'ice' | 'dtls' | 'rtp' | 'srtp' | 'rtcp')[],
        },
    }
}