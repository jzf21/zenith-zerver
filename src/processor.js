// gptProcessor.js
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "", // Replace with your OpenAI API key
});

const { main } = require("./nw.js");
const { sendWhatsAppMessage } = require("./send.js");

async function processTranscription(transcription) {
  // Call the OpenAI API with the transcription
  const result = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: transcription,
    max_tokens: 250,
    temperature: 0,
  });

  // Extract and return the generated text
  const generatedText = result.choices[0].text.trim();
  console.log(generatedText);
  main(generatedText);
  sendWhatsAppMessage(generatedText);
  return generatedText;
}

module.exports = { processTranscription };
