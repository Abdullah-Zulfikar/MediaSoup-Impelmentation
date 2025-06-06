// mediasoupSetup.js
import mediasoup from "mediasoup"

const workerSettings = {
  logLevel: 'debug',
  rtcMinPort: 10000,
  rtcMaxPort: 10100,
   logTags: [
                'info',
                'ice',
                'dtls',
                'rtp',
                'srtp',
                'rtcp',
            ]
};

const mediaCodecs = [
  {
    kind: 'audio',
    mimeType: 'audio/opus',
    clockRate: 48000,
    channels: 2,
  },
  {
    kind: 'video',
    mimeType: 'video/VP8',
    clockRate: 90000,
  },
];

let worker;
let router;

const createWorker = async () => {
  worker = await mediasoup.createWorker(workerSettings);
  worker.on('died', () => {
    console.error("MediaSoup Worker has died");
    process.exit(1);
  });

  router = await worker.createRouter({ mediaCodecs });
};

export { createWorker, worker, router };
