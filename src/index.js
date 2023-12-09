const WebSocket = require("ws");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });
const path = require("path");
const { processTranscription } = require("./processor");

// fcacc1e4.664b3e079f5445a991389485b98459de

const lighthouse = require("@lighthouse-web3/sdk");

const axios = require("axios").default;
const FormData = require("form-data");

/*Sample response
{
  data: {
    Name: 'wow.jpg',
    Hash: 'QmUHDKv3NNL1mrg4NTW4WwJqetzwZbGNitdjr2G6Z5Xe6s',
    Size: '31735'
  }
}
*/

// process.env.GOOGLE_APPLICATION_CREDENTIALS =
//   "C:/Users/jozef/Customate/googleauth.json";

// let transcription = "";
// //Include Google Speech to Text
// const speech = require("@google-cloud/speech");
// const client = new speech.SpeechClient();

// //Configure Transcription Request
// const request = {
//   config: {
//     encoding: "MULAW",
//     sampleRateHertz: 8000,
//     languageCode: "en-IN",
//   },
//   interimResults: true,
// };
// // Handle Web Socket Connection
// wss.on("connection", function connection(ws) {
//   console.log("New Connection Initiated");

//   let recognizeStream = null;

//   ws.on("message", function incoming(message) {
//     const msg = JSON.parse(message);
//     switch (msg.event) {
//       case "connected":
//         console.log(`A new call has connected.`);
//         //Create Stream to the Google Speech to Text API
//         recognizeStream = client
//           .streamingRecognize(request)
//           .on("error", console.error)
//           .on("data", (data) => {
//             console.log(data.results[0].alternatives[0].transcript);
//             transcription = data.results[0].alternatives[0].transcript;
//             wss.clients.forEach((client) => {
//               if (client.readyState === WebSocket.OPEN) {
//                 client.send(
//                   JSON.stringify({
//                     event: "interim-transcription",
//                     text: data.results[0].alternatives[0].transcript,
//                   })
//                 );
//               }
//             });
//           });

//         break;
//       case "start":
//         console.log(`Starting Media Stream ${msg.streamSid}`);
//         break;
//       case "media":
//         // Write Media Packets to the recognize stream
//         recognizeStream.write(msg.media.payload);
//         break;
//       case "stop":
//         console.log(`Call Has Ended`);
//         recognizeStream.destroy();
//         console.log(transcription);
//         const processedText = processTranscription(transcription);
//         console.log(processedText);
//         break;
//     }
//   });
// });

// function sendCustomResponse() {
//   // Send a custom message to the client
//   wss.clients.forEach((client) => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(
//         JSON.stringify({
//           event: "custom-response",
//           text: "This is a custom response during the call.",
//         })
//       );
//     }
//   });
// }

// //Handle HTTP Request
// app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));

app.get("/", async (req, res) => {
  /**
   * This function allows you to upload a file or a folder to Lighthouse.
   *
   * @param {string} path - The location of your file or folder.
   * @param {string} apiKey - Your personal API key for Lighthouse.
   * @param {boolean} multi - Specify if you are uploading multiple files or folders.
   * @param {object} dealParameters - Custom parameters for file storage deals(check FVM section).
   * @return {object} - Returns details about the uploaded file.
   */
  const uploadResponse = await lighthouse.upload(
    "C:\\Users\\jozef\\Customate\\src\\speech.mp3",
    "fcacc1e4.664b3e079f5445a991389485b98459de"
  );

  const uploadedLink =
    "https://gateway.lighthouse.storage/ipfs/" + uploadResponse.data.Hash;

  console.log(uploadedLink);

  const form = new FormData();
  form.append("audio_url", uploadedLink);
  form.append("toggle_diarization", "true");

  const response = await axios.post(
    "https://api.gladia.io/audio/text/audio-transcription/",
    form,
    {
      headers: {
        ...form.getHeaders(),
        "x-gladia-key": "404b3198-852b-45fa-bd27-cd06c29be377",
      },
    }
  );

  console.log(response.data);

  return res.status(200).json({ bruh: response.data });
});

console.log("Listening at Port 8080");
server.listen(8080);
