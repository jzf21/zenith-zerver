const WebSocket = require("ws");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });
const path = require("path");
process.env.GOOGLE_APPLICATION_CREDENTIALS = 'D:/Harin/Projects/Customate/customate-404808-746ea5c70c80.json';
let transcription = "";
