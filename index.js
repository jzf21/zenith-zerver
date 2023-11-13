const WebSocket = require("ws");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });
const path = require("path");
const { processTranscription } = require("./processor");
process.env.GOOGLE_APPLICATION_CREDENTIALS =
  "C:/Users/jozef/Customate/googleauth.json";
let transcription = "";
//Include Google Speech to Text
const speech = require("@google-cloud/speech");
const client = new speech.SpeechClient();

//Configure Transcription Request
const request = {
  config: {
    encoding: "MULAW",
    sampleRateHertz: 8000,
    languageCode: "en-IN",
  },
  interimResults: true,
};
// Handle Web Socket Connection
wss.on("connection", function connection(ws) {
  console.log("New Connection Initiated");

  let recognizeStream = null;

  ws.on("message", function incoming(message) {
    const msg = JSON.parse(message);
    switch (msg.event) {
      case "connected":
        console.log(`A new call has connected.`);
        //Create Stream to the Google Speech to Text API
        recognizeStream = client
          .streamingRecognize(request)
          .on("error", console.error)
          .on("data", (data) => {
            console.log(data.results[0].alternatives[0].transcript);
            transcription = data.results[0].alternatives[0].transcript;
            wss.clients.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(
                  JSON.stringify({
                    event: "interim-transcription",
                    text: data.results[0].alternatives[0].transcript,
                  })
                );
              }
            });
          });

        break;
      case "start":
        console.log(`Starting Media Stream ${msg.streamSid}`);
        break;
      case "media":
        // Write Media Packets to the recognize stream
        recognizeStream.write(msg.media.payload);
        break;
      case "stop":
        console.log(`Call Has Ended`);
        recognizeStream.destroy();
        console.log(transcription);
        const processedText = processTranscription(transcription);
        console.log(processedText);
        break;
    }
  });
});

function sendCustomResponse() {
  // Send a custom message to the client
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          event: "custom-response",
          text: "This is a custom response during the call.",
        })
      );
    }
  });
}

//Handle HTTP Request
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));

app.post("/", (req, res) => {
  res.set("Content-Type", "text/xml");
  const setReq = req.headers.host;

  res.send(`
            <Response>
              <Start>
                <Stream url="wss://${req.headers.host}/"/>
              </Start>
              <Say>Hey Please State your problem</Say>
              <Pause length="40" />
              <Say>You will recieve an update on whatsapp</Say>
              
            </Response>
          `);
});

console.log("Listening at Port 8080");
server.listen(8080);
