const WebSocket = require("ws");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });
const path = require("path");
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'D:/Harin/Projects/Customate/customate-404808-746ea5c70c80.json';
let transcription = "";
//Include Google Speech to Text
const speech = require("@google-cloud/speech");
const client = new speech.SpeechClient();

//Configure Transcription Request
const request = {
  config: {
    encoding: "MULAW",
    sampleRateHertz: 8000,
    languageCode: "en-GB"
  },
  interimResults: true
};

