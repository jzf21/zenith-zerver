const path = require("path");
const fs = require("fs");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "",
});

const speechFile = path.resolve("./speech.mp3");

async function main(transcription) {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: transcription,
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}

module.exports = { main };

